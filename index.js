const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars'); // html движок
const todoRoutes = require('./routes/todos'); // кастомный сценарий с обработкой get запросов
// если есть системная переменная PORT то брать там, если нет, то порт 3000
const PORT = process.env.PORT || 3000;

const app = express();
// кастомный движок для express
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs' // изменение дефолтного расширения файлов на hbs
});

app.engine('hbs', hbs.engine); // регистрация движка по ключу hbs

app.set('view engine', 'hbs'); // по умолчанию используем handlebars
app.set('views', 'views'); // папка в которой хранятся все виды сайта

app.use(express.urlencoded({extended: true})); // middleware для того чтобы express мог парсить body
app.use(express.static(path.join(__dirname, 'public'))); // указываем экспресу что из этой папки можно брать стили

app.use(todoRoutes); // используем новый middleware

// создаю асинхронную функцию чтобы можно было использовать оператор await
async function start () {
    try {
        // 1. подключаюсь к базе данных
        await mongoose.connect('mongodb://localhost/node-app', {
            // чтобы небыло различных предупреждений в консоли
            useNewUrlParser: true,
            useFindAndModify: false
        });
        // 2. запускаю сервер с сообщением в консоль после старта сервера
        app.listen(PORT, () => {
            console.log('Server has been started');
        });
    } catch (err) {
        console.log(err);  // обработка (вывод) ошибки в консоль
    }
}
module.exports = app;
// чтобы все работало вызываем функцию старт
start();
