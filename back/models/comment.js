module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {  // MySQL에는 users 테이블 생성
    // 엑셇을 만든다고 생각하고 만든다.
    // id는 MySQL에서 기본적으로 생성해준다.
    // id: {},
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // belongsTo 를 사용하면 아래의 컬럼이 생성된다.
    // UserId: {},
    // PostId: {}
  }, {
    // 유저 모델에 대한 셋팅
    chartset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 한글, 이모티콘 저장
  });
  
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User); // 어떤 댓글은 유저한테 속해있다.
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
}