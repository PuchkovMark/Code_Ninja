const {Schema, model} = require('mongoose');

const schema = new Schema({
    title: {
        type: String,
        required: true // если не передал заголовок то Todo не может быть создана
    },
    completed: {
        type: Boolean,
        default: false // если создаем Todo то по умолчанию она не завершена
    }
});

module.exports = model('Todo', schema); // схема формирования модели Todo