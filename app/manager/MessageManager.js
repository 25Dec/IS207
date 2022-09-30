// third party component
const Validator = require('validator');
const Sequelize = require('sequelize');

// our components
const Constant = require('../utils/Constant');
const Pieces = require('../utils/Pieces');

const Message = require('../models/Message');
//const constants = require("constants");
//const {ca} = require("apidoc/template/src/locales/ca.mjs");

module.exports = {
    create: function (data, callback){
        try{
            if(!Pieces.ValidTypeCheck(data.title, 'string')){
                return callback(1, 'invalid_message_title', 400, 'title of message is not a string', null);
            }

            if(!Pieces.ValidTypeCheck(data.content, 'string')){
                return callback(1, 'invalid_message_content', 400, 'content of message is not a string', null);
            }

            let messageData = {};

            messageData.title = data.title;
            messageData.content = data.content;

            Message.create(messageData).then(result=>{
                "use strict";
                return callback(null, null, 200, null, result);
            }).catch(function (error){
                'use strict';
                return callback(1, 'create_message_fail', 420, error, null);
            });
        } catch (error){
            return callback(1, 'create_message_fail', 400, error, null);
        }
    },

    getOne: function (id, callback){
        try{
            if( !(Pieces.ValidTypeCheck(id, 'string') && Validator.isInt(id))
            && !Pieces.ValidTypeCheck(id, 'number')){
                return callback(1, 'invalid_message_id', 400, 'message id is incorrect', null);
            }

            let where = {id: id};
            let attributes = ['id', 'title', 'content', 'createdAt', 'updatedAt'];

            Message.findOne({
                where: where,
                attributes: attributes
            }).then(result=>{
                "use strict";
                if(result){
                    return callback(null, null, 200, null, result);
                }else{
                    return callback(1, 'invalid_message', 403, null, null);
                }
            });
        } catch(error){
            return callback(1, 'get_one_message_fail', 400, error,null);
        }
    },
    getAll: function (query, callback){
        try{
            let where = {};
            let page = 1;
            let perPage = Constant.DEFAULT_PAGING_SIZE;

            if(Pieces.ValidTypeCheck(query.q, 'string')){
                where.title = {[Sequelize.Op.like]: query.q};
            }

            if((Pieces.ValidTypeCheck(query['page'], 'string') && Validator.isInt(query['page']))
            || (Pieces.ValidTypeCheck(query['page'], 'number'))){
                page = parseInt(query['page']);
                if(page===0)
                    page = 1;
            }
            if((Pieces.ValidTypeCheck(query['perPage'], 'string') && Validator.isInt(query['perPage']))
            || (Pieces.ValidTypeCheck(query['perPage'], 'number'))) {
                perPage = parseInt(query['perPage']);
                if(perPage<=0){
                    perPage = Constant.DEFAULT_PAGING_SIZE;
                }
            }
            let offset = perPage * (page - 1);
            Message.findAndCountAll({
                where: where,
                limit: perPage,
                offset: offset
            })
                .then((data)=>{
                    let page = Math.ceil(data.count/perPage);
                    let message = data.rows;
                    let output = {
                        data: message,
                        page :{
                            current: page,
                            prev: page - 1,
                            hasPrev: false,
                            next: (page+1) > page? 0: (page + 1),
                            hasNext: false,
                            total: page
                        },
                        items:{
                            begin: ((page * perPage) - perPage)+ 1,
                            end: page * perPage,
                            total:data.count
                        },

                    };
                    output.pages.hasNext = (output.page.next !== 0);
                    output.pages.hasPrev = (output.pages.prev!==0);
                    return callback(null, null, 200, null, output);
                }).catch(function (error){
                    return callback(1, 'find_and_message_all_user_fail', 420, error, null);
            });
        }catch (error){
            return callback(1, 'get_all_message_fail', 400, error, null);
        }
    },

    getAll: function (query, callback){
        try{
            let where = {};
            let page = 1;
            let perPage = Constant.DEFAULT_PAGING_SIZE;

            if(Pieces.ValidTypeCheck(query.q,'string')){
                where.title = {[Sequelize.Op.like]: query.q};
            }

            if((Pieces.ValidTypeCheck(query['page'], 'string') && Validator.isInt(query['page']))
            || (Pieces.ValidTypeCheck(query['page'],'number'))){
                page = parseInt(query['page']);
                if(page === 0){
                    page = 1;
                }
            }

            if((Pieces.ValidTypeCheck(query['perPage'], 'string') && Validator.isInt(query['perPage']))
            || (Pieces.ValidTypeCheck(query['perPage'],'number'))){
                perPage = parseInt(query['perPage']);
                if(perPage <= 0){
                    perPage = Constant.DEFAULT_PAGING_SIZE;
                }
            }

            let offset = perPage * (page-1);
            Message.findAndCountAll({
                where: where,
                limit: perPage,
                offset: offset
            })
                .then((data)=>{
                    let pages = Math.ceil(data.count/perPage);
                    let messages = data.rows;
                    let output = {
                        data: messages,
                        pages: {
                            current: page,
                            prev: page - 1,
                            hasPrev: false,
                            next: (page + 1) > page ? 0 : (page+1),
                            hasNext: false,
                            total: pages
                        },
                        items: {
                            begin: ((page * perPage) - perPage) + 1,
                            end: page * perPage,
                            total: data.count
                        }
                    };
                    output.pages.hasNext = (output.pages.next !== 0);
                    output.pages.hasPrev = (output.pages.prev !== 0);
                    return callback(null, null, 200, null, output);
                }).catch(function (error){
                    return callback(1, 'find_and_message_all_user_fail', 420, error, null);
            });

        }catch (error){
            return callback(1, 'get_all_message_fail', 400, error, null);
        }
    },

    update: function (id, data, callback){
        try{
            let update = {};
            let where = {};

            if(!(Pieces.ValidTypeCheck(id,'string')
                && Validator.isInt(id))
                && !Pieces.ValidTypeCheck(id,'number')){
                return callback(1, 'invalid_message_id', 400, 'message id is incorrect', null);
            }
            where.id = id;

            if(Pieces.ValidTypeCheck(data.title, 'string')){
                update.title = data.title;
            }

            if(Pieces.ValidTypeCheck(data.content, 'string')){
                update.content = data.content;
            }

            update.updatedAt = new Date();

            Message.update(
                update,
                {where: where}).then(result=>{
                    "use strict";
                    if((result !== null) && (result.length > 0) && (result[0] > 0)){
                        return callback(null, null, 200, null, id );
                    }else {
                        return callback(1, 'update_message_fail', 400, '', null);
                    }
            }).catch(function (error){
                "use strict";
                return callback(1, 'update_message_fail', 420, error, null);
            });
        }catch (error){
            return callback(1,'update_message_fail', 400, error, null);
        }
    },
    delete: function (id, callback){
        try {
            if(!(Pieces.ValidTypeCheck(id, 'string') && Validator.isInt(id)) && !Pieces.ValidTypeCheck(id, 'number')){
                return callback(1, 'invalid_message_id', 400, 'message id is incorrect', null);
            }

            let where = {id: id};

            Message.destroy({where: where}).then(result =>{
                return callback(null, null, 200, null);
            }).catch(function (error){
                return callback(1, 'delete_account_fail', 420, error);
            });
        }catch (error){
            return callback(1, 'delete_account_fail', 400, error);
        }
    }
}
