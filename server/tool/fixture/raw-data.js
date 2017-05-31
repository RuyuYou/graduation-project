module.exports = {
  Train: [
    {
      "_id": "591686df707c543076c0eec6",
      "trainId": "K84",
      "type": "新空快速",
      "startPlace": "西安",
      "endPlace": "广州",
      "startTime": {"hour": "10", "minute": "04"},
      "endTime": {"hour": "13", "minute": "09", "days": "1"},
      "lastedTime": {"hour": "27", "minute": "05"},
      "mile": 2093,
      "createPeople": "赵思"
    },
    {
      "_id": "591686df707c543076f0eec6",
      "trainId": "K214",
      "type": "新空快速",
      "startPlace": "西安",
      "endPlace": "天津",
      "startTime": {"hour": "11", "minute": "33"},
      "endTime": {"hour": "07", "minute": "33", "days": "1"},
      "lastedTime": {"hour": "20", "minute": "0"},
      "mile": 1283,
      "createPeople": "赵思"
    }
  ],
  Ticker: [
    {
      "_id": "5928949ff981700d878017b4",
      "trainId": "K84",
      "seat": 399,
      "soft": {
        "up": 688,
        "middle": 708,
        "down": 728
      },
      "hard": {
        "up": 226,
        "middle": 236,
        "down": 246
      }
    }
  ],
  // Station: [
  //   {
  //     "trainId": "K84",
  //     "stations": [
  //       {
  //         "number": 1,
  //         "name": "渭南",
  //         "endTime": {
  //           "hour": "10",
  //           "minute": "43"
  //         },
  //         "leaveTime": {
  //           "hour": "10",
  //           "minute": "46",
  //           "days": "0"
  //         },
  //         "parkTime": "3",
  //         "lastedTime": {
  //           "hour": "0",
  //           "minute": "39"
  //         },
  //         "mile": 56
  //       }
  //     ]
  //   }
  // ],
  K84: [
    {
      "number": 1,
      "name": "渭南",
      "endTime": {
        "hour": "10",
        "minute": "43"
      },
      "leaveTime": {
        "hour": "10",
        "minute": "46",
        "days": "0"
      },
      "parkTime": "3",
      "lastedTime": {
        "hour": "0",
        "minute": "39"
      },
      "mile": 56
    }
  ],
  K214: [
    {
      "number": 1,
      "name": "张桥",
      "endTime": {"hour": "12", "minute": "25"},
      "leaveTime": {"hour": "12", "minute": "29", "days": 0},
      "parkTime": "4",
      "lastedTime": {"hour": "0", "minute": "52"},
      "mile": 76
    }
  ]
};