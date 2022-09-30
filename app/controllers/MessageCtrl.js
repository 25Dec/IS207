//our component
const MessageManager = require('../manager/MessageManager.js');
const Rest = require('../utils/Restware');

module.exports = {
    create: function (req, res){
        let data = req.body || '';

        MessageManager.create(data, function (errorCode, errorMessage, httpCode, errorDescription, result){
            if(errorCode){
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            let resData = {};
            resData.id = result.id;
            return Rest.sendSuccessOne(res, resData, httpCode);
        });
    },
    getOne: function (req, res){
        let id = req.params.id || '';

        MessageManager.getOne(id, function (errorCode, errorMessage, httpCode, errorDescription, result){
            if(errorCode){
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            return Rest.sendSuccessOne(res, result, httpCode);
        });
    },
    getAll: function (req, res){
        let query = req.query || '';

        MessageManager.getAll(query, function (errorCode, errorMessage, httpCode, errorDescription, results){
            if(errorCode){
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            return Rest.sendSuccessMany(res, results, httpCode);
        });
    },
    update: function (req, res){
        let id = req.params.id || '';
        let data = req.body || '';

        MessageManager.update(id, data, function (errorCode, errorMessage, httpCode, errorDescription, result){
            if(errorCode){
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            let resData = {};
            resData.id = result;
            return Rest.sendSuccessOne(res, resData, httpCode);
            }
        );
    },
    delete: function (req, res){
        let id = req.params.id || '';

        MessageManager.delete(id, function (errorCode, errorMessage, httpCode, errorDescription){
            if(errorCode){
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            let resData = {};
            resData.id = id;
            return Rest.sendSuccessOne(res, resData, httpCode);
        });
    }
};