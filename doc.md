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

# B. TOPSIS
## B.1. ENDPOINT (METHOD : POST)  

1. Description : This endpoint is used for saw method.
2. Endpoint : `/api/topsis`
3. Sample endpoint : `http://localhost:7777/api/topsis`

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
            "ram": 0.8164965809277261,
            "harga": 0.9759000729485332,
            "memory": 0.8728715609439696,
            "processor": 0.9630868246861536,
            "camera": 0.9116846116771036,
            "build": 0.7352146220938077,
            "VTOTAL": 2.725080390227725,
            "DramMin": 0.5715476066494083,
            "DramPlus": 0.6940220937885673,
            "Vram": 0.45161290322580644,
            "DhargaMin": 0.6831300510639733,
            "DhargaPlus": 0.9466230707600772,
            "Vharga": 0.4191616766467066,
            "DmemoryMin": 0.7419408268023742,
            "DmemoryPlus": 0.8401388774085707,
            "Vmemory": 0.4689655172413793,
            "DprocessorMin": 0.8186238009832305,
            "DprocessorPlus": 0.9450289467232882,
            "Vprocessor": 0.46416382252559724,
            "DcameraMin": 0.8205161505093932,
            "DcameraPlus": 0.888892496385176,
            "Vcamera": 0.48,
            "DbuildMin": 0.44112877325628463,
            "DbuildPlus": 0.5587631127912939,
            "Vbuild": 0.4411764705882353
        },
        {
            "nama": "S2",
            "ram": 0.4082482904638631,
            "harga": 0.09759000729485331,
            "memory": 0.2182178902359924,
            "processor": 0.1203858530857692,
            "camera": 0.2279211529192759,
            "build": 0.5146502354656654,
            "VTOTAL": 2.4095901369585584,
            "DramMin": 0.16329931618554525,
            "DramPlus": 0.28577380332470415,
            "Vram": 0.36363636363636365,
            "DhargaMin": 0.19518001458970666,
            "DhargaPlus": 0.06831300510639732,
            "Vharga": 0.7407407407407408,
            "DmemoryMin": 0.08728715609439697,
            "DmemoryPlus": 0.18548520670059354,
            "Vmemory": 0.32,
            "DprocessorMin": 0.024077170617153823,
            "DprocessorPlus": 0.10232797512290381,
            "Vprocessor": 0.1904761904761904,
            "DcameraMin": 0.1367526917515655,
            "DcameraPlus": 0.2051290376273483,
            "Vcamera": 0.39999999999999997,
            "DbuildMin": 0.22056438662814226,
            "DbuildPlus": 0.3381987261631515,
            "Vbuild": 0.39473684210526316
        },
        {
            "nama": "S1",
            "ram": 0.4082482904638631,
            "harga": 0.19518001458970663,
            "memory": 0.4364357804719848,
            "processor": 0.2407717061715384,
            "camera": 0.3418817293789138,
            "build": 0.44112877325628463,
            "VTOTAL": 2.2638056143716523,
            "DramMin": 0.16329931618554525,
            "DramPlus": 0.28577380332470415,
            "Vram": 0.36363636363636365,
            "DhargaMin": 0.09759000729485334,
            "DhargaPlus": 0.16590301240125063,
            "Vharga": 0.37037037037037046,
            "DmemoryMin": 0.30550504633038933,
            "DmemoryPlus": 0.4037030969365859,
            "Vmemory": 0.4307692307692308,
            "DprocessorMin": 0.09630868246861538,
            "DprocessorPlus": 0.22271382820867303,
            "Vprocessor": 0.30188679245283023,
            "DcameraMin": 0.25071326821120343,
            "DcameraPlus": 0.3190896140869862,
            "Vcamera": 0.44,
            "DbuildMin": 0.14704292441876154,
            "DbuildPlus": 0.2646772639537708,
            "Vbuild": 0.35714285714285715
        }
    ]
}
```

```