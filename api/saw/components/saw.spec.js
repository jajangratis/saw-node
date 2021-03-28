let saw = require('./saw')

describe('interpolated test', () => {
    it('should count', () => {
        let test = saw.interpolate(1, 4, 25, 100, 70)
    });
})

describe('test', () => {
    let dataTest = 
    {   
        "data":[
            {
                "nama":"S1",
                "ram": 2,
                "harga":500000,
                "memory":16,
                "processor":4,
                "camera":3,
                "build":6
            },
            {
                "nama":"S10",
                "ram": 4,
                "harga":2500000,
                "memory":32,
                "processor":16,
                "camera":8,
                "build":10
            },
            {
                "nama":"S2",
                "ram": 2,
                "harga":250000,
                "memory":8,
                "processor":2,
                "camera":2,
                "build":7
            }
        ],
        "bobot": {
            "harga": 0.3, 
            "ram": 0.3, 
            "memory": 0.15, 
            "processor": 0.15, 
            "camera": 0.1,
            "build":0.4
        },
        "rule": [
            {
                "parameter": "harga",
                "rule": "cost"
            },
            {
                "parameter": "ram",
                "rule": "feature"
            },
            {
                "parameter": "memory",
                "rule": "feature"
            },
            {
                "parameter": "processor",
                "rule": "feature"
            },
            {
                "parameter": "camera",
                "rule": "feature"
            },
            {
                "parameter": "build",
                "rule": "feature"
            },
        ]
    }
    let minmax = saw.getMinMax(dataTest.data)
    let normalData = saw.normalizeWithInterpolate(dataTest.data, minmax, dataTest.rule)
    
    for (let index = 0; index < normalData.length; index++) {
        let data = normalData[index];
        let keys = Object.keys(data)
        data.total = 0
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            if (typeof data[key] == 'number') {
                data[key] = data[key] * dataTest.bobot[key]
                data.total = data.total + data[key]
            }
        }
    }
    normalData = normalData.sort((a,b) => {return b.total - a.total})
    // console.log({normalData});
})
