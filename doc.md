Source : https://medium.com/skyshidigital/sistem-pengambilan-keputusan-dengan-algoritma-saw-simple-additive-weighting-524a43ef316
how to Access: <host>:7777/api/saw (POST)
Body:
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
        }
    ],
    "criteria": {
        "harga": 0.3, 
        "ram": 0.3, 
        "memory": 0.15, 
        "processor": 0.15, 
        "camera": 0.1,
        "build":0.4
    },
    "rule": [
        {
            "criteria": "harga",
            "rule": "cost"
        },
        {
            "criteria": "ram",
            "rule": "feature"
        },
        {
            "criteria": "memory",
            "rule": "feature"
        },
        {
            "criteria": "processor",
            "rule": "feature"
        },
        {
            "criteria": "camera",
            "rule": "feature"
        },
        {
            "criteria": "build",
            "rule": "feature"
        },
    ]
}

Result Example:
[
    {
        "data": {
            "nama": "S10",
            "ram": 1,
            "harga": 0.2,
            "memory": 1,
            "processor": 1,
            "camera": 1,
            "build": 1
        },
        "total": 1.16
    },
    {
        "data": {
            "nama": "S1",
            "ram": 0.5,
            "harga": 1,
            "memory": 0.5,
            "processor": 0.25,
            "camera": 0.375,
            "build": 0.6
        },
        "total": 0.84
    }
]