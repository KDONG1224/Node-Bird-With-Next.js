module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define('Hashtag', {  // MySQL에는 users 테이블 생성
    // 엑셇을 만든다고 생각하고 만든다.
    // id는 MySQL에서 기본적으로 생성해준다.
    // id: {},
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    // 유저 모델에 대한 셋팅
    chartset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 한글, 이모티콘 저장
  });
  
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
  };
  return Hashtag;
}