
exports.checkNullQueryAll = (object) => {
    if (object == undefined || object == '' || (Array.isArray(object)&& object.length == 0) ) {
        return true;
    };
    return false;
}

exports.templateResponse = (status, success, msg, data) => {
    return {
        status,
        success,
        msg,
        data
    }
}

exports.uniq = (a) => {
    return Array.from(new Set(a));
}