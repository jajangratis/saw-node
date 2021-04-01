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
            "Nama": "Selamet",
            "Test Tulis": 95,
            "Sertifikasi": 5,
            "Wawancara": 4,
            "Kompetensi Sosial": 2,
            "Kehadiran": 3
        },
        {
            "Nama": "Andriawan",
            "Test Tulis": 85,
            "Sertifikasi": 3,
            "Wawancara": 3,
            "Kompetensi Sosial": 2,
            "Kehadiran": 2
        },
        {
            "Nama": "Juti",
            "Test Tulis": 85,
            "Sertifikasi": 5,
            "Wawancara": 3,
            "Kompetensi Sosial": 2,
            "Kehadiran": 3
        },
        {
            "Nama": "Herman",
            "Test Tulis": 80,
            "Sertifikasi": 5,
            "Wawancara": 4,
            "Kompetensi Sosial": 3,
            "Kehadiran": 3
        },
        {
            "Nama": "Joni",
            "Test Tulis": 75,
            "Sertifikasi": 3,
            "Wawancara": 1,
            "Kompetensi Sosial": 3,
            "Kehadiran": 3
        }
    ],
    "bobot": {
        "Test Tulis": 0.45,
        "Sertifikasi": 0.19,
        "Wawancara": 0.14,
        "Kompetensi Sosial": 0.12,
        "Kehadiran": 0.10
    },
    "rule": [
        {
            "parameter": "Test Tulis",
            "rule": "benefit"
        },
        {
            "parameter": "Sertifikasi",
            "rule": "benefit"
        },
        {
            "parameter": "Wawancara",
            "rule": "benefit"
        },
        {
            "parameter": "Kompetensi Sosial",
            "rule": "benefit"
        },
        {
            "parameter": "Kehadiran",
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
            "Nama": "Selamet",
            "Test Tulis": 2.7,
            "Sertifikasi": 1.1400000000000001,
            "Wawancara": 0.8400000000000001,
            "Kompetensi Sosial": 0.12,
            "Kehadiran": 0.6000000000000001,
            "total": 5.4
        },
        {
            "Nama": "Herman",
            "Test Tulis": 1.0125,
            "Sertifikasi": 1.1400000000000001,
            "Wawancara": 0.8400000000000001,
            "Kompetensi Sosial": 0.72,
            "Kehadiran": 0.6000000000000001,
            "total": 4.3125
        },
        {
            "Nama": "Juti",
            "Test Tulis": 1.575,
            "Sertifikasi": 1.1400000000000001,
            "Wawancara": 0.6066666666666667,
            "Kompetensi Sosial": 0.12,
            "Kehadiran": 0.6000000000000001,
            "total": 4.041666666666666
        },
        {
            "Nama": "Andriawan",
            "Test Tulis": 1.575,
            "Sertifikasi": 0.19,
            "Wawancara": 0.6066666666666667,
            "Kompetensi Sosial": 0.12,
            "Kehadiran": 0.1,
            "total": 2.591666666666667
        },
        {
            "Nama": "Joni",
            "Test Tulis": 0.45,
            "Sertifikasi": 0.19,
            "Wawancara": 0.14,
            "Kompetensi Sosial": 0.72,
            "Kehadiran": 0.6000000000000001,
            "total": 2.1
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
            "Nama": "Selamet",
            "Test Tulis": 95,
            "Sertifikasi": 5,
            "Wawancara": 4,
            "Kompetensi Sosial": 2,
            "Kehadiran": 3
        },
        {
            "Nama": "Andriawan",
            "Test Tulis": 85,
            "Sertifikasi": 3,
            "Wawancara": 3,
            "Kompetensi Sosial": 2,
            "Kehadiran": 2
        },
        {
            "Nama": "Juti",
            "Test Tulis": 85,
            "Sertifikasi": 5,
            "Wawancara": 3,
            "Kompetensi Sosial": 2,
            "Kehadiran": 3
        },
        {
            "Nama": "Herman",
            "Test Tulis": 80,
            "Sertifikasi": 5,
            "Wawancara": 4,
            "Kompetensi Sosial": 3,
            "Kehadiran": 3
        },
        {
            "Nama": "Joni",
            "Test Tulis": 75,
            "Sertifikasi": 3,
            "Wawancara": 1,
            "Kompetensi Sosial": 3,
            "Kehadiran": 3
        }
    ],
    "bobot": {
        "Test Tulis": 0.45,
        "Sertifikasi": 0.19,
        "Wawancara": 0.14,
        "Kompetensi Sosial": 0.12,
        "Kehadiran": 0.10
    },
    "rule": [
        {
            "parameter": "Test Tulis",
            "rule": "benefit"
        },
        {
            "parameter": "Sertifikasi",
            "rule": "benefit"
        },
        {
            "parameter": "Wawancara",
            "rule": "benefit"
        },
        {
            "parameter": "Kompetensi Sosial",
            "rule": "benefit"
        },
        {
            "parameter": "Kehadiran",
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
            "Nama": "Selamet",
            "Test Tulis": 0.22689344151565272,
            "Sertifikasi": 0.09851041099939041,
            "Wawancara": 0.07841568470556855,
            "Kompetensi Sosial": 0.04381780460041328,
            "Kehadiran": 0.047434164902525694,
            "DMin": 0.08685160817336575,
            "DPlus": 0.021908902300206638,
            "V": 0.798558298367584
        },
        {
            "Nama": "Herman",
            "Test Tulis": 0.1910681612763391,
            "Sertifikasi": 0.09851041099939041,
            "Wawancara": 0.07841568470556855,
            "Kompetensi Sosial": 0.06572670690061992,
            "Kehadiran": 0.047434164902525694,
            "DMin": 0.07670800046447303,
            "DPlus": 0.03582528023931361,
            "V": 0.6816472423512299
        },
        {
            "Nama": "Juti",
            "Test Tulis": 0.2030099213561103,
            "Sertifikasi": 0.09851041099939041,
            "Wawancara": 0.058811763529176414,
            "Kompetensi Sosial": 0.04381780460041328,
            "Kehadiran": 0.047434164902525694,
            "DMin": 0.06253291620590763,
            "DPlus": 0.03787791257053991,
            "V": 0.6227706410543582
        },
        {
            "Nama": "Andriawan",
            "Test Tulis": 0.2030099213561103,
            "Sertifikasi": 0.05910624659963424,
            "Wawancara": 0.058811763529176414,
            "Kompetensi Sosial": 0.04381780460041328,
            "Kehadiran": 0.0316227766016838,
            "DMin": 0.04590944823423663,
            "DPlus": 0.05689836933291214,
            "V": 0.44655600440356535
        },
        {
            "Nama": "Joni",
            "Test Tulis": 0.1791264011965679,
            "Sertifikasi": 0.05910624659963424,
            "Wawancara": 0.019603921176392137,
            "Kompetensi Sosial": 0.06572670690061992,
            "Kehadiran": 0.047434164902525694,
            "DMin": 0.027018512172212586,
            "DPlus": 0.085400244977985,
            "V": 0.24033811489406862
        }
    ]
}
```

```