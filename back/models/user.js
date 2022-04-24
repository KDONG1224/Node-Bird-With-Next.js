module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {  // MySQL에는 users 테이블 생성
    // 엑셇을 만든다고 생각하고 만든다.
    // id는 MySQL에서 기본적으로 생성해준다.
    // id: {},
    email: {
      type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATATIME
      allowNull: false, // false - 필수
      unique: true, // 고유한 값
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false, // false - 필수, true - 선택
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false, // false - 필수
    },
  }, {
    // 유저 모델에 대한 셋팅
    chartset: 'utf8',
    collate: 'utf8_general_ci', // 한글저장
  });
  
  User.associate = (db) => {
    db.User.hasMany(db.Post); // 유저는 게시글을 많이 가진다.
    db.User.hasMany(db.Comment); // 유저는 댓글 많이 가진다.
    db.User.belongsToMany(db.Post, 
      { through: 'Like', as: 'Liked' } // 중간테이블 이름, as는 별칭
    );
    db.User.belongsToMany(db.User, 
      { through: 'Follow', as: 'Followers', foreingKey: 'FollowingId' } // foreingKey 이름이 헷갈리니까 변경해준다.
    );
    db.User.belongsToMany(db.User, 
      { through: 'Follow', as: 'Followings', foreingKey: 'FollowerId' }
    );
  };
  return User;
}