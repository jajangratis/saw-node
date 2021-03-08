
exports.checkNullQueryAll = (object) => {
    if (object == undefined || object == '' || (Array.isArray(object)&& object.length == 0) ) {
        return true;
    };
    return false;
}