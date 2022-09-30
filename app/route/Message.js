const MessageCtrl = require('../controllers/MessageCtrl');

module.exports = function (app){
    app.post('/v1/messages/', MessageCtrl.create);
    app.get('/v1/messages/:id',MessageCtrl.getOne);
    app.get('/v1/messages/', MessageCtrl.getAll);
    app.delete('/v1/message/:id', MessageCtrl.delete);
};
