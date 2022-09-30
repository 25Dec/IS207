const ValidTypeCheck = function (value, type, length)
{
    let bResult;
    let minLength = 0;
    if(length !== null && length !== undefined){
        minLength = length;
    }
    bResult = !(typeof value !== type || value == null || value.length <= minLength);
    return bResult;
};

const ValidObjectEnum = function (value, object)
{
    let result = false;
    for(const propertyName in object){
        if(value === object[propertyName]){
            result = true;
            break;
        }
    }
    return result;
};

module.exports = {
  ValidTypeCheck,
    ValidObjectEnum
};