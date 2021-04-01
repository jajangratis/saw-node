const _ = require('lodash');
const h = require('../../../helper/helper')

exports.getMinMax = (value) => {
    const minBy = (arr, fn) => Math.min(...arr.map(typeof fn === 'function' ? fn : val => val[fn]));
    const maxBy = (arr, fn) => Math.max(...arr.map(typeof fn === 'function' ? fn : val => val[fn]));
    let keys = value.map(x => {
        return Object.keys(x)
    })
    let result = []
    let result2 = []
    result = keys.flat().map(x => {
        let data = Object.create({
            key: x
        })
        data[x+'Min'] = minBy(value, o => o[x]) 
        data[x+'Max'] = maxBy(value, o => o[x])
        result2.push(data)
        return x 
    })
    result2 = result2.reduce(function(result, current) {
        return Object.assign(result, current);
    }, {})
	return result2
}

exports.normalisasi = (matrix, maxmin, rule) => {
	let keyMatrix = Object.keys(matrix)
	let keyMaxmin = Object.keys(maxmin)
    for (let index = 0; index < keyMatrix.length; index++) {
        const x = keyMatrix[index];
        let mx = keyMaxmin.filter(y=> y == x)
        let ruleData = rule.filter(y => y.parameter == x)
        if (!h.checkNullQueryAll(ruleData)) {
            if (ruleData[0].rule == 'cost') {
                if (Number.isNaN(maxmin[x+'Min'] / matrix[x] )) {
                    matrix[x] = matrix[x]
                } else {
                    matrix[x] = maxmin[x+'Min'] / matrix[x] 
                }
            } else {
                matrix[x] = matrix[x] / maxmin[x+'Max']
            }
        } else {
            matrix[x] = matrix[x]
        }
    }

	return matrix;
}

exports.hitungPeringkat = (nilai, criteria) => {
    let nilai2 = nilai
    let nilaiKey = Object.keys(nilai)

    nilaiKey = nilaiKey.filter (x => x != 'nama')
    let total = 0
    for (let index = 0; index < nilaiKey.length; index++) {
        const key = nilaiKey[index];
        const criteriaData = criteria[key]
        total = total + (nilai[key] * criteriaData)
    }
	// const total = (nilai.harga * criteria.harga) + (nilai.ram * criteria.ram) + (nilai.memory * criteria.memory) + (nilai.processor * criteria.processor) + (nilai.camera * criteria.camera); 
	const result = {
		data: nilai2,
		total: parseFloat(total.toPrecision(4))
	}
	return result;
}

exports.interpolate = (rmin, rmax, dmin, dmax, value) => {
    let result = ((value - dmin) / (dmax - dmin)) * (rmax - rmin) + 1
    return result
}

exports.normalizeWithInterpolate = (datas, minmax, criteria) => {
    for (let index = 0; index < datas.length; index++) {
        let data = datas[index];
        let keys = Object.keys(data)
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            if (Number.isInteger(data[key])) {
                let rule = criteria.filter(x => x.parameter == key)
                let benefitKey = criteria.filter(x => x.rule == 'benefit')
                let costKey = criteria.filter(x => x.rule == 'cost')
                if (rule[0]['rule'] == 'benefit') {
                    data[key] = this.interpolate(1, criteria.length, minmax[key+'Min'], minmax[key+'Max'], data[key])
                } else {
                    data[key] = this.interpolate(1, criteria.length, minmax[key+'Max'], minmax[key+'Min'], data[key])
                }
            } else {
                data[key] = data[key]
            }
        }
    }
    return datas
}

