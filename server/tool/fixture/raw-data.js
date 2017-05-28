module.exports = {
  Train: [
    {
      "_id": "591686df707c543076c0eec6",
      "trainId": "K48",
      "type": "新空快速",
      "startPlace": "西安",
      "endPlace": "广州",
      "startTime": {"hour": '10', "minute": '04'},
      "endTime": {"hour": '13', "minute": '09', "days": "1"},
      "lastedTime": {"hour": "27", "minute": "05"},
      "mile": 2093,
      "createPeople": "赵思"
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
          "station": "郑州"
        },
        {
          "leaveTime": {"minute": 9, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "arriveTime": {"minute": 8, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "station": "石家庄"
        },
        {
          "leaveTime": {"minute": 20, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "arriveTime": {"minute": 10, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "station": "宝鸡"
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
          "station": "洛阳"
        },
        {
          "leaveTime": {"minute": 9, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "arriveTime": {"minute": 8, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "station": "天津"
        },
        {
          "leaveTime": {"minute": 20, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "arriveTime": {"minute": 10, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "station": "郑州"
        }
      ],
    }
  ],
  Ticker: [
    {
      "_id": "5928949ff981700d878017b4",
      "trainId": "G21",
      "cabinNumber": 18,
      "sleeperNumber": 10,
      "seatNumber": 8
    }, {
      "_id": "5928949ff981f00d878017b4",
      "trainId": "G21",
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
  ],
  User: [
    {
      "_id": "58ea4b9d4fa41b33bb4f07d3",
      "userId": 140,
      "userName": "赵思",
      "password": "12345678",
      "email": "admin@10.com",
      "mobilePhone": "13112345678"
    },
    {
      "_id": "58ea4b9d4fa44b33bb4f07d3",
      "userId": 123,
      "userName": "张三",
      "password": "12345678",
      "email": "admin@12.com",
      "mobilePhone": "13212345678"
    },
    {
      "_id": "58ea4b9d4fa41b33bb4e07d3",
      "userId": 126,
      "userName": "陈有",
      "password": "12345678",
      "email": "chen@26.com",
      "mobilePhone": "13312345678"
    },
    {
      "_id": "58ea4b9d4fa41b33bb4f00d3",
      "userId": 32,
      "userName": "孙衵",
      "password": "12345678",
      "email": "sun@32.com",
      "mobilePhone": "13412345678"
    }
  ]
};