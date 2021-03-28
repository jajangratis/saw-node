const _ = require('lodash');
const h = require('../../../helper/helper')

exports.normalize = (data) => {
    let result = []
    let pembagi = 0
    for (let index = 0; index < data.length; index++) {
        const nilai = data[index];
        pembagi = pembagi + Math.pow(nilai, 2)
    }
    pembagi = Math.sqrt(pembagi)
    for (let index = 0; index < data.length; index++) {
        const nilai = data[index];
        result.push(nilai / pembagi)
        
    }
    return result
}