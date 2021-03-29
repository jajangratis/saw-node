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
                "Nama":"BalikPapan",
                "Kandungan Zat Didalam Tanah": 3,
                "Kondisi Geografi Dan Geologi":250,
                "Akses Jalan":9,
                "Jarak Tempuh":3
            },
            {
                "Nama":"Samarinda",
                "Kandungan Zat Didalam Tanah": 2,
                "Kondisi Geografi Dan Geologi":350,
                "Akses Jalan":3,
                "Jarak Tempuh":11
            },
            {
                "Nama":"Banjarmasin",
                "Kandungan Zat Didalam Tanah": 7,
                "Kondisi Geografi Dan Geologi":300,
                "Akses Jalan":8,
                "Jarak Tempuh":10
            },
            {
                "Nama":"Pontianak",
                "Kandungan Zat Didalam Tanah": 1,
                "Kondisi Geografi Dan Geologi":200,
                "Akses Jalan":7,
                "Jarak Tempuh":4
            },
        ],
        "bobot": {
            "Kandungan Zat Didalam Tanah": 0.184, 
            "Kondisi Geografi Dan Geologi": 0.451, 
            "Akses Jalan": 0.162, 
            "Jarak Tempuh": 0.204,
        },
        "rule": [
            {
                "parameter": "Kandungan Zat Didalam Tanah",
                "rule": "benefit"
            },
            {
                "parameter": "Kondisi Geografi Dan Geologi",
                "rule": "benefit"
            },
            {
                "parameter": "Akses Jalan",
                "rule": "benefit"
            },
            {
                "parameter": "Jarak Tempuh",
                "rule": "cost"
            }
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
    // console.log({normalData, minmax});
})
