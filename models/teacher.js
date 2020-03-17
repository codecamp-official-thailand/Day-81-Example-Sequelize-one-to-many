module.exports = (sequelize, DataTypes) => {
  let teacher = sequelize.define('teacher', {  // 'teacher' คือชื่อของตาราง
    name: {
      type: DataTypes.STRING(100)
    },
    age: {
      type: DataTypes.INTEGER
    }
  })

  teacher.associate = models => {
    teacher.hasMany(models.student)
  }

  return teacher;
}