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
                    "rule": "benefit"
                },
                {
                    "parameter": "memory",
                    "rule": "benefit"
                },
                {
                    "parameter": "processor",
                    "rule": "benefit"
                },
                {
                    "parameter": "camera",
                    "rule": "benefit"
                },
                {
                    "parameter": "build",
                    "rule": "benefit"
                },
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
            data['VTOTAL'] = 0
            let keys = Object.keys(data)
            for (let index = 0; index < keys.length; index++) {
                const key = keys[index];
                let normalDataFilter = normalData.filter(x => x.parameter == key)[0]
                if (!h.checkNullQueryAll(normalDataFilter)) {
                    if (!h.checkNullQueryAll(normalDataFilter.criteria)&&!h.checkNullQueryAll(normalDataFilter.bobot)) {
                        data[`D${key}Min`] = Math.sqrt(Math.pow(data[key] - normalDataFilter.isn,2))
                        data[`D${key}Plus`] = Math.sqrt(Math.pow(data[key] - normalDataFilter.isp,2))
                        data[`V${key}`] = data[`D${key}Min`] / (data[`D${key}Min`] + data[`D${key}Plus`])
                        data['VTOTAL'] = data['VTOTAL'] + data[`V${key}`]
                    }
                }
            }
        }
        dataTest.data = dataTest.data.sort((a, b) => b['VTOTAL']-a['VTOTAL'])
        // console.log({normalData, data:dataTest.data});
    });
})
