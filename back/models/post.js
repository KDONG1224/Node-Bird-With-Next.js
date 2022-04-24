module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {  // MySQL에는 users 테이블 생성
    // 엑셇을 만든다고 생각하고 만든다.
    // id는 MySQL에서 기본적으로 생성해준다.
    // id: {},
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    // 유저 모델에 대한 셋팅
    chartset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 한글, 이모티콘 저장
  });
  
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // 어떤 게시글은 유저한테 속해있다.
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User, 
      { through: 'Like', as: 'Likers' } // 중간테이블 이름
    );
    db.Post.belongsTo(db.Post, { as: 'Retweet' });
  };
  return Post;
}