[TOC]
# API   "SPK NODE JS"  (Version 1.0.0/v1_0_0)

API SPK using Node js

Source : https://medium.com/skyshidigital/sistem-pengambilan-keputusan-dengan-algoritma-saw-simple-additive-weighting-524a43ef316, Catetan Dosen

***
# A. AHP
## A.1. ENDPOINT (METHOD : POST)  

1. Description : This endpoint is used for ahp method.
2. Endpoint : `/api/ahp`
3. Sample endpoint : `http://localhost:7777/api/ahp`

## A.2.BODY

* Type : **application/json**
* Input Parameter :
	* `parameter` : Array input | array
    * `pairwise` : Array input | array
* Sample of input format : 

```
{
    "parameter":[
        "Test Tulis",
        "Sertifikasi",
        "Wawancara",
        "Kompentensi Sosial",
        "Kehadiran"
    ],
    "pairwise":[
        [5,1,"Test Tulis/Sertifikasi"],
        [3,1,"Test Tulis/Wawancara"],
        [3,1,"Test Tulis/Kompentensi Sosial"],
        [3,1,"Test Tulis/Kehadiran"],
        [2,1,"Sertifikasi/Wawancara"],
        [2,1,"Sertifikasi/Kompentensi Sosial"],
        [2,1,"Sertifikasi/Kehadiran"],
        [1,1,"Wawancara/Kompentensi Sosial"],
        [2,1,"Wawancara/Kehadiran"],
        [1,1,"Kompentensi Sosial/Kehadiran"]
    ]
}
```

* Output Parameter :

* Sample of output format :

```
{
    "status": 200,
    "success": true,
    "msg": "ok",
    "data": {
        "data": [
            [
                1,
                5,
                3,
                3,
                3
            ],
            [
                0.2,
                1,
                2,
                2,
                2
            ],
            [
                0.3333333333333333,
                0.5,
                1,
                1,
                2
            ],
            [
                0.3333333333333333,
                0.5,
                1,
                1,
                1
            ],
            [
                0.3333333333333333,
                0.5,
                0.5,
                1,
                1
            ]
        ],
        "product": [
            135,
            1.6,
            0.3333333333333333,
            0.16666666666666666,
            0.08333333333333333
        ],
        "akar": [
            2.6672686083966,
            1.0985605433061179,
            0.8027415617602307,
            0.6988271187715792,
            0.6083643418932058
        ],
        "sumAkar": 5.8757621741277335,
        "bobot": [
            0.4539442763938213,
            0.18696477337754075,
            0.13661913773414408,
            0.11893386731148989,
            0.10353794518300402
        ],
        "sum": [
            2.1999999999999997,
            7.5,
            7.5,
            8,
            9
        ],
        "sumxbobot": [
            0.9986774080664067,
            1.4022358003315556,
            1.0246435330060806,
            0.9514709384919191,
            0.9318415066470362
        ],
        "imax": 5.3088691865429976,
        "ci": 0.07721729663574939,
        "ri": 1.12,
        "cr": 0.06894401485334767,
        "conclusion": "consisten",
        "zipParamBobot": [
            {
                "parameter": "Test Tulis",
                "bobot": "0.45"
            },
            {
                "parameter": "Sertifikasi",
                "bobot": "0.19"
            },
            {
                "parameter": "Wawancara",
                "bobot": "0.14"
            },
            {
                "parameter": "Kompentensi Sosial",
                "bobot": "0.12"
            },
            {
                "parameter": "Kehadiran",
                "bobot": "0.10"
            }
        ]
    }
}
```
# B. SAW INTERPOLATED
## B.1. ENDPOINT (METHOD : POST)  

1. Description : This endpoint is used for saw method.
2. Endpoint : `/api/saw-interpolated`
3. Sample endpoint : `http://localhost:7777/api/saw-interpolated`

## B.2.BODY

* Type : **application/json**
* Input Parameter :
	* `data` : Array input | array
    * `bobot` : Array input | array
    * `rule` : Array input | array
* Sample of input format : 

```
{
    "data": [
        {
            "nama": "S1",
            "ram": 2,
            "harga": 500000,
            "memory": 16,
            "processor": 4,
            "camera": 3,
            "build": 6
        },
        {
            "nama": "S10",
            "ram": 4,
            "harga": 2500000,
            "memory": 32,
            "processor": 16,
            "camera": 8,
            "build": 10
        },
        {
            "nama": "S2",
            "ram": 2,
            "harga": 250000,
            "memory": 8,
            "processor": 2,
            "camera": 2,
            "build": 7
        }
    ],
    "bobot": {
        "harga": 0.3,
        "ram": 0.3,
        "memory": 0.15,
        "processor": 0.15,
        "camera": 0.1,
        "build": 0.4
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
        }
    ]
}
```

* Output Parameter :

* Sample of output format :
```
{
    "status": 200,
    "success": true,
    "msg": "ok",
    "data": [
        {
            "nama": "S10",
            "ram": 2.1,
            "harga": 0.3,
            "memory": 1.05,
            "processor": 1.05,
            "camera": 0.7000000000000001,
            "build": 2.8000000000000003,
            "total": 8
        },
        {
            "nama": "S2",
            "ram": 0.3,
            "harga": 2.1,
            "memory": 0.15,
            "processor": 0.15,
            "camera": 0.1,
            "build": 1,
            "total": 3.8
        },
        {
            "nama": "S1",
            "ram": 0.3,
            "harga": 1.9,
            "memory": 0.44999999999999996,
            "processor": 0.2785714285714286,
            "camera": 0.2,
            "build": 0.4,
            "total": 3.528571428571428
        }
    ]
}
```

```