const { Router } = require('express'); // с помощью него можно создавать различные инстансы роутов
const Todo = require('../models/todo'); // подключаем модель для TODO
const router = Router();  // создание роутера

// обработка get запросов на главную страницу
router.get('/', async (req, res) => {
    const todos = await Todo.find({});

    res.render('index', {
        title: 'Todos list',
        isindex: true,
        todos
    });
});
// обработка get запроса на страницу create
router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create todo',
        isCreate: true
    });
});
// обработка создание заметок через метод POST кек
router.post('/create', async (req, res) => {
    // создание новой Todo
    const todo = new Todo({
        title: req.body.title
    });

    await todo.save();
    res.redirect('/');
});

router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.id);

    todo.completed = !!req.body.completed; // двойное отрицание превращает строку в boolean
    await todo.save();

    res.redirect('/');
});

module.exports = router;