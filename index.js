const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const { Op } = require("sequelize");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/student', function (req, res) {
  let newStudent = {
    name: req.body.name,
    year: Number(req.body.year)
  }
  // CREATE
  db.student.create(newStudent)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(400).send(err))
})

app.get('/get-all-student', async function (req, res) {
  // READ
  const students = await db.student.findAll({ where: { point: { [Op.lt]: 16 } } })
  res.send(students);
})

app.delete('/delete-student/:id', async function (req, res) {
  // Delete
  await db.student.destroy({ where: { id: Number(req.params.id) } });
  res.status(204).send();
})

app.put('/update-students', async function (req, res) {
  await db.student.update({ name: 'Nat' }, { where: { id: 2 } });
  res.send();
})

app.put('/change-name/:from/:to', async function (req, res) {
  const targetStudent = await db.student.findOne({ where: { name: req.params.from } })
  targetStudent.update({ name: req.params.to })
  res.send(targetStudent);
})

app.delete('/delete-by-name/:name', async function (req, res) {
  const targetStudent = await db.student.findOne({ where: { name: req.params.name } })
  targetStudent.destroy();
  res.send(targetStudent);
})

app.post('/add-teacher-with-many-students', async function (req, res) {
  const newTeacher = await db.teacher.create({
    name: 'Tuk',
    age: 18,
    students: [
      {
        name: 'X',
        year: 1886,
        point: 124
      }, {
        name: 'Tobtab',
        year: 2007,
        point: 100
      }, {
        name: 'Kla',
        year: 1995,
        point: 123
      }, {
        name: 'ISA',
        year: 1994,
        point: 112
      },
    ]
  }, {
    include: [db.student]
  })

  res.status(201).send(newTeacher)
})

db.sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log("Server is running on port 8000")
  })
})
