let saw = require('./saw')
let data = require('../../../criteria')

describe('Normalisasi Test', () => {
    it('get max min value', () => {
        let testData = [
            data,
            data
        ]
        let result = saw.getMinMax(testData)
    });
    it('normalize', () => {
        let testData = [
            data,
            data
        ]
        let result = saw.getMinMax(testData)
        let result2 = saw.normalisasi(data, result, [
            {
                criteria: 'harga',
                rule: 'cost'
            },
            {
                criteria: 'ram',
                rule: 'feature'
            },
            {
                criteria: 'memory',
                rule: 'feature'
            },
            {
                criteria: 'processor',
                rule: 'feature'
            },
            {
                criteria: 'camera',
                rule: 'feature'
            },
        ])
    });
    it('peringkat', () => {
        let criteria = data
        let testData = {
            "nama":"S10",
            "ram": 4,
            "harga":2500000,
            "memory":32,
            "processor":16,
            "camera":8
        }
        let result2 = saw.hitungPeringkat(testData, criteria)
    });
});