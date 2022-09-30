// COR related how to allow cors in express node js
module.exports = function (req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, HEAD, PATCH, OPTIONS');
    res.header('Access-Control-Expose-Headers', 'Content-Length, X-Access-Token');
    res.header('Access-Control-Expose-Headers', 'Accept, Authorization, Content-Type, Content-Length, Content-Language, X-requested-With, Range, Origin, X-Access-Token');
    if(req.method === 'OPTIONS'){
        return res.sendStatus(200);
    } else{
        return next();
    }
};