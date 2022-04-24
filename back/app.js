// npx sequelize db:create

const express = require("express");
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');

const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require('./models');
const passportConfig = require('./passport')

dotenv.config();
const app = express();

db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공')
  })
  .catch(console.error)
passportConfig();

app.use(cors({
  origin: '*',
  credentials: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello kdong");
});

app.get("/", (req, res) => {
  res.send("hello api");
});

app.get("/posts", (req, res) => {
  res.json([
    {
      id: 1,
      content: "kdong1",
    },
    {
      id: 2,
      content: "kdong2",
    },
    {
      id: 3,
      content: "kdong3",
    },
  ]);
});

app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("서버 실행 중,,,,");
});

// 응답을 보낼때 -> res
// 응답이 뭔지 -> req

// 주로 자주 사용하는 것
// app.get -> 가져오다
// app.post -> 생성하다
// app.put -> 전체 수정
// app.delete -> 제거
// app.patch -> 부분 수정
// app.options -> 찔러보기( 나 요청 보낼 수 있어? )
// app.head -> 헤더만 가져오기(헤더/바디)