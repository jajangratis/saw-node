let h = require('../../../helper/helper')
let topsis = require('./topsis')
const _ = require('lodash')
// let pairwise = [
//     [1,2,'p1/p2'],
//     [1,3,'p1/p4']
// ]

describe('test', () => {
    it('should test', () => {
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
                "Kandungan Zat Didalam Tanah": 0.183787934879913, 
                "Kondisi Geografi Dan Geologi": 0.450186661335649, 
                "Akses Jalan": 0.259915390107716, 
                "Jarak Tempuh": 0.106110013676723,
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
        let rule = dataTest.rule
        let normalData = []
        let keys = []
        for (let index = 0; index < dataTest.data.length; index++) {
            const data = dataTest.data[index];
            let key = Object.keys(data)
            keys.push(...key)
        }
        keys = h.uniq(keys)
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            let data = dataTest.data.map(x => x[key])
            normalData.push({
                parameter: key,
                bobot: dataTest.bobot[key],
                criteria: rule.filter(x => x.parameter == key).length > 0 ? rule[0].rule : undefined,
                data:topsis.normalize(data)
            })
            
        }

        // CLEAN AND TRANSPOSE
        // let normalDataClean = normalData.filter(x => !h.checkNullQueryAll(x.bobot) && !h.checkNullQueryAll(x.criteria))
        // let normalData2 = []
        // for (let index = 0; index < normalDataClean.length; index++) {
        //     const normal1 = normalDataClean[index];
        //     let baris = []
        //     for (let index = 0; index < normal1.data.length; index++) {
        //         const data = normal1.data[index];
        //         baris.push(data * normal1.bobot)
        //     }
        //     normalData2.push(baris)
        // }
        // let transposeNormalData2 = _.zip(...normalData2)
        // console.log({normalData, normalData2, transposeNormalData2});
        normalData = normalData.map(x => {
            x.isp = 0
            x.isn = 0
            x.dataxbobot = x.data.map(y => y*x.bobot)
            x.data = x.data.map(y => y*x.bobot)
            if (x.criteria == 'cost') {
                x.isn = x.dataxbobot.sort((a,b) => b-a)[0]
                x.isp = x.dataxbobot.sort((a,b) => a-b)[0]
            } else {
                x.isp = x.dataxbobot.sort((a,b) => b-a)[0]
                x.isn = x.dataxbobot.sort((a,b) => a-b)[0]
            }
            return x
        })
        for (let index = 0; index < dataTest.data.length; index++) {
            let data = dataTest.data[index];
            for (let indexb = 0; indexb < normalData.length; indexb++) {
                const normal = normalData[indexb];
                if (!h.checkNullQueryAll(normal.bobot) && !h.checkNullQueryAll(normal.criteria)) {
                    data[normal.parameter]=normal.data[index]
                }
            }
        }
        for (let index = 0; index < dataTest.data.length; index++) {
            let data = dataTest.data[index];
            
            data['DMin'] = 0
            data['DPlus'] = 0
            data['V'] = 0
            let keys = Object.keys(data)
            for (let index = 0; index < keys.length; index++) {
                const key = keys[index];
                let normalDataFilter = normalData.filter(x => x.parameter == key)[0]
                if (!h.checkNullQueryAll(normalDataFilter)) {
                    // if (!h.checkNullQueryAll(normalDataFilter.criteria)&&!h.checkNullQueryAll(normalDataFilter.bobot)) {
                    //     data[`D${key}Min`] = Math.sqrt(Math.pow(data[key] - normalDataFilter.isn,2))
                    //     data[`D${key}Plus`] = Math.sqrt(Math.pow(data[key] - normalDataFilter.isp,2))
                    //     data[`V${key}`] = data[`D${key}Min`] / (data[`D${key}Min`] + data[`D${key}Plus`])
                    //     data['VTOTAL'] = data['VTOTAL'] + data[`V${key}`]
                    // }
                    if (!h.checkNullQueryAll(normalDataFilter.criteria)&&!h.checkNullQueryAll(normalDataFilter.bobot)) {
                        data['DMin'] = data['DMin'] + Math.pow(data[key] - normalDataFilter.isn,2)
                        data['DPlus'] = data['DPlus'] + Math.pow(data[key] - normalDataFilter.isp,2)
                    }
                }
            }
            data['DMin'] = Math.sqrt(data['DMin'])
            data['DPlus'] = Math.sqrt(data['DPlus'])
            data['V'] = data['DMin'] / (data['DMin'] + data['DPlus'])
        }
        // dataTest.data = dataTest.data.sort((a, b) => b['V']-a['V'])
    });
})
