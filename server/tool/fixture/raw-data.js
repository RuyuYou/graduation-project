module.exports = {
  Train: [
    {
      "_id": "591686df707c543076c0eec6",
      "trainId": "G211",
      "startPlace": "西安",
      "startTime": {"year": 2017, "month": 5, "day": 29, "hour": 8, "minute": 25},
      "endPlace": "郑州",
      "endTime": {"year": 2017, "month": 5, "day": 30, "hour": 8, "minute": 25},
      "createPeople": "admin1"
    }, {
      "_id": "591686df707c543076c0efc6",
      "trainId": "G212",
      "startPlace": "西安",
      "startTime": {"year": 2017, "month": 5, "day": 27, "hour": 8, "minute": 25},
      "endPlace": "郑州",
      "endTime": {"year": 2017, "month": 5, "day": 28, "hour": 8, "minute": 25},
      "createPeople": "admin2"
    }, {
      "_id": "591686df707c543576c0eec6",
      "trainId": "G213",
      "startPlace": "西安",
      "startTime": {"year": 2017, "month": 5, "day": 27, "hour": 8, "minute": 25},
      "endPlace": "郑州",
      "endTime": {"year": 2017, "month": 5, "day": 28, "hour": 8, "minute": 25},
      "createPeople": "admin3"
    }
  ],
  Station: [
    {
      "_id": "59279ea142421728965c8f5e",
      "trainId": "G211",
      "createPeople": "ADMIN1",
      "stations": [
        {
          "leaveTime": {"minute": 7, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "arriveTime": {"minute": 1, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "station": "1"
        },
        {
          "leaveTime": {"minute": 9, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "arriveTime": {"minute": 8, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "station": "2"
        },
        {
          "leaveTime": {"minute": 20, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "arriveTime": {"minute": 10, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "station": "3"
        }
      ],
    },
    {
      "_id": "59279ea142421758965c8f5e",
      "trainId": "G212",
      "createPeople": "ADMIN2",
      "stations": [
        {
          "leaveTime": {"minute": 7, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "arriveTime": {"minute": 1, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "station": "1"
        },
        {
          "leaveTime": {"minute": 9, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "arriveTime": {"minute": 8, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "station": "2"
        },
        {
          "leaveTime": {"minute": 20, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "arriveTime": {"minute": 10, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "station": "3"
        }
      ],
    }
  ],
  Ticker: [
    {
      "_id": "5928949ff981700d878017b4",
      "trainId": "1",
      "cabinNumber": 18,
      "sleeperNumber": 10,
      "seatNumber": 8
    }, {
      "_id": "5928949ff981f00d878017b4",
      "trainId": "2",
      "cabinNumber": 20,
      "sleeperNumber": 10,
      "seatNumber": 10
    }
  ],
  Seat: [
    {
      "_id": "59289ca5a428d11520a0372e",
      "trainId": "G21",
      "position": "A",
      "price": 123.4,
      "createPeople": "admin"
    },
    {
      "_id": "59289ca5af28d11520a0372e",
      "trainId": "G21",
      "position": "B",
      "price": 124.4,
      "createPeople": "admin"
    },
    {
      "_id": "59289fa5a428d11520a0372e",
      "trainId": "G21",
      "position": "C",
      "price": 125.4,
      "createPeople": "admin"
    }
  ],
  Sleeper: [
    {
      "_id": "5928ad7a9831eb2b16b30a88",
      "trainId": "G21",
      "type": "软卧",
      "position": "上",
      "price": 255.4,
      "createPeople": "赵思"
    },
    {
      "_id": "5928dd7a9831eb2b16b30a88",
      "trainId": "G21",
      "type": "软卧",
      "position": "中",
      "price": 155.4,
      "createPeople": "赵思"

    },
    {
      "_id": "5928ad7a9831eb2b19b30a88",
      "trainId": "G22",
      "type": "硬卧",
      "position": "下",
      "price": 255.4,
      "createPeople": "赵思"

    }
  ]
};