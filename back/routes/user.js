const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Post } = require('../models')

const router = express.Router();

// POST /user/login
// 미들웨어 확장
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (info) {
      // 401 허가되지 않음
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      })
      return res.status(200).json(fullUserWithoutPassword);
    })
  })(req, res, next);
})

// POST /user/
router.post('/', async (req, res, next) => { 
  try {
    // 이메일 중복체크
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 이메일 입니다.');
    }

    // 비밀번호 암호화 - bcrybt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });

    // cors에러 처리 ( 모든 서버 허용 - *)
    // 또는 미들웨어 이용 npm i cors -> app.js셋팅
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3060');

    res.status(200).send('Ok');
    // 200 성공 -> 생략가능하지만 하지 않는게 좋음
    // 201 잘 생성됨
    // 300 리다이렉트
    // 400 클라이언트 에러
    // 500 서버 에러
  } catch (error){
    // 에러처리
    console.error(error);
    next(error);  // next - 500 서버에러
  }
});

router.post('/user/logout', (req, res) => {
  req.logOut();
  req.session.destroy();
  res.send('Ok')
})

module.exports = router;