module.exports = {
  Train: [
    {
      "trainId": "K84",
      "type": "快速",
      "startPlace": "西安",
      "endPlace": "广州",
      "startTime": {"hour": "10", "minute": "04"},
      "endTime": {"hour": "13", "minute": "09", "days": "1"},
      "lastedTime": {"hour": "27", "minute": "05"},
      "mile": 2093,
      "createPeople": "赵思"
    },
    {
      "trainId": "K214",
      "type": "快速",
      "startPlace": "西安",
      "endPlace": "天津",
      "startTime": {"hour": "11", "minute": "33"},
      "endTime": {"hour": "07", "minute": "33", "days": "1"},
      "lastedTime": {"hour": "20", "minute": "0"},
      "mile": 1283,
      "createPeople": "赵思"
    },
    {
      "trainId": "3028",
      "type": "普快",
      "startPlace": "乌鲁木齐南",
      "endPlace": "郑州",
      "mile": 2936,
      "createPeople": "赵思",
      "lastedTime": {"hour": "15", "minute": "25"},
      "endTime": {"hour": "20", "minute": "50", "days": "2"},
      "startTime": {"hour": "15", "minute": "25"},
    }
  ],
  Ticker: [
    {
      "trainId": "K84",
      "tickers": [
        {
          "number": -1,
          "seat": 399,
          "soft": {"up": 688, "down": 728},
          "hard": {"up": 226, "middle": 236, "down": 246}
        },
        {
          "number": 1,
          "seat": 11,
          "soft": {"up": 61, "down": 71},
          "hard": {"up": 87, "middle": 92, "down": 97}
        },
        {
          "number": 2,
          "seat": 21.5,
          "soft": {"up": 70, "down": 86},
          "hard": {"up": 101, "middle": 109, "down": 117}
        },
        {
          "number": 3,
          "seat": 45,
          "soft": {"up": 149, "down": 165},
          "hard": {"up": 92, "middle": 100, "down": 108}
        }
      ]
    },
    {
      "trainId": "3028",
      "tickers":[
        {
          "number":-1,
          "seat": 399,
          "soft": {"up": 688, "down": 728},
          "hard": {"up": 226, "middle": 236, "down": 246}
        }
      ]
    }
  ],
  Station: [
    {
      "trainId": "K84",
      "stations": [
        {
          "number": 1,
          "name": "渭南",
          "endTime": {"hour": "10", "minute": "43"},
          "leaveTime": {"hour": "10", "minute": "46"},
          "days": "0",
          "parkTime": "3",
          "lastedTime": {"hour": "0", "minute": "39"},
          "mile": 56
        }, {
          "number": 2,
          "name": "潼关",
          "endTime": {"hour": "11", "minute": "46"},
          "leaveTime": {"hour": "11", "minute": "59"},
          "days": "0",
          "parkTime": "3",
          "lastedTime": {"hour": "1", "minute": "52"},
          "mile": 135
        },
        {
          "number": 3,
          "name": "渑池",
          "days": "0",
          "parkTime": "3",
          "mile": 318,
          "leaveTime": {"hour": "14", "minute": "28"},
          "endTime": {"hour": "14", "minute": "25"},
          "lastedTime": {"hour": "0", "minute": "39"}
        },
      ]
    },
    {
      "trainId": "K214",
      "stations": [
        {
          "number": 1,
          "name": "张桥",
          "endTime": {"hour": "12", "minute": "25"},
          "leaveTime": {"hour": "12", "minute": "29"},
          "days": "0",
          "parkTime": "4",
          "lastedTime": {"hour": "0", "minute": "52"},
          "mile": 76
        }
      ]
    }
  ]
};