module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {  // MySQL에는 users 테이블 생성
    // 엑셇을 만든다고 생각하고 만든다.
    // id는 MySQL에서 기본적으로 생성해준다.
    // id: {},
    src: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  }, {
    // 유저 모델에 대한 셋팅
    chartset: 'utf8',
    collate: 'utf8_general_ci', // 한글 저장
  });
  
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
}