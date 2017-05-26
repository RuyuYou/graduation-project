module.exports = {
  // Admin: [
  //   {
  //     "_id": "58ea4b9dffa41b33bb4f07d3",
  //     "userName": "ADMIN",
  //     "password": "12345678",
  //     "email": "admin@admin.com",
  //     "mobilePhone": "13112345678",
  //   }
  // ],
  // Train: [
  //   {
  //     "_id": "591686df707c543076c0eec6",
  //     "trainId": "1",
  //     "startPlace": "西安",
  //     "endPlace": "郑州",
  //     "startTime": {"year": 2017, "month": 5, "day": 20, "hour": 8, "minutes": 25},
  //     "lastedTime": {"hour": 8, "minutes": 5},
  //     "middlePlace": ["新封镇", "华山", "洛阳"]
  //   },
  //   {
  //     "_id": "591686e2707c543076c0eec7",
  //     "trainId": "2",
  //     "startPlace": "西安",
  //     "endPlace": "北京",
  //     "startTime": {"year": 2017, "month": 5, "day": 25, "hour": 12, "minutes": 35},
  //     "lastedTime": {"hour": 13, "minutes": 5},
  //     "middlePlace": ["新封镇", "华山", "洛阳", "郑州", "石家庄", "保定"]
  //   },
  //   {
  //     "_id": "591686e6707c543076c0eec8",
  //     "trainId": "3",
  //     "startPlace": "太原",
  //     "endPlace": "北京",
  //     "startTime": {"year": 2017, "month": 5, "day": 26, "hour": 12, "minutes": 35},
  //     "lastedTime": {"hour": 7, "minutes": 5},
  //     "middlePlace": ["石家庄", "保定"]
  //   },
  //   {
  //     "_id": "591686e8707c543076c0eec9",
  //     "trainId": "4",
  //     "startPlace": "西安",
  //     "endPlace": "重庆",
  //     "startTime": {"year": 2017, "month": 5, "day": 16, "hour": 12, "minutes": 35},
  //     "lastedTime": {"hour": 13, "minutes": 5},
  //     "middlePlace": ["安康", "达州"]
  //   }
  // ],
  // Ticker: [
  //   {
  //     "_id": "59169f8c36262d47f8383ae4",
  //     "trainId": "1",
  //     "specialInformation": {"specialPrice": 200, "specialSeat": 100},
  //     "secondInformation": {"secondPrice": 100, "secondSeat": 300},
  //     "firstInformation": {"firstPrice": 150, "firstSeat": 200}
  //   },
  //   {
  //     "_id": "59169f8c36262d47f8383af5",
  //     "trainId": "2",
  //     "specialInformation": {"specialPrice": 500, "specialSeat": 100},
  //     "secondInformation": {"secondPrice": 300, "secondSeat": 300},
  //     "firstInformation": {"firstPrice": 400, "firstSeat": 200}
  //   },
  //   {
  //     "_id": "59169f8c36245d47f8383ae4",
  //     "trainId": "3",
  //     "specialInformation": {"specialPrice": 400, "specialSeat": 100},
  //     "secondInformation": {"secondPrice": 200, "secondSeat": 300},
  //     "firstInformation": {"firstPrice": 300, "firstSeat": 200}
  //   }
  // ],
  // User: [
  //   {
  //     '_id': '58ea4b9d4fa41b33bb4f07d3',
  //     'userId': 10,
  //     'userName': '赵思',
  //     'password': '12345678',
  //     'email': 'admin@10.com',
  //     'mobilePhone': '13112345678'
  //   }, {
  //     '_id': '58ea4b9d4fa44b33bb4f07d3',
  //     'userId': 12,
  //     'userName': '张三',
  //     'password': '12345678',
  //     'email': 'admin@12.com',
  //     'mobilePhone': '13212345678'
  //   }, {
  //     '_id': '58ea4b9d4fa41b33bb4e07d3',
  //     'userId': 26,
  //     'userName': '陈有',
  //     'password': '12345678',
  //     'email': 'chen@26.com',
  //     'mobilePhone': '13312345678'
  //   }, {
  //     '_id': '58ea4b9d4fa41b33bb4f00d3',
  //     'userId': 32,
  //     'userName': '孙衵',
  //     'password': '12345678',
  //     'email': 'sun@32.com',
  //     'mobilePhone': '13412345678'
  //   }, {
  //     '_id': '58ea4b9d4fa41b33bb4f00d3',
  //     'userId': 47,
  //     'userName': '马红',
  //     'password': '12345678',
  //     'email': 'ma@47.com',
  //     'mobilePhone': '13512345678'
  //   }
  // ]

  Train: [
    {
      "_id": "591686df707c543076c0eec6",
      "trainId": "1",
      "startPlace": "西安",
      "startTime": {"year": 2017, "month": 5, "day": 29, "hour": 8, "minute": 25},
      "endPlace": "郑州",
      "endTime": {"year": 2017, "month": 5, "day": 30, "hour": 8, "minute": 25},
      "createPeople": "admin1"
    }, {
      "_id": "591686df707c543076c0efc6",
      "trainId": "2",
      "startPlace": "西安",
      "startTime": {"year": 2017, "month": 5, "day": 27, "hour": 8, "minute": 25},
      "endPlace": "郑州",
      "endTime": {"year": 2017, "month": 5, "day": 28, "hour": 8, "minute": 25},
      "createPeople": "admin2"
    },{
      "_id": "591686df707c543576c0eec6",
      "trainId": "3",
      "startPlace": "西安",
      "startTime": {"year": 2017, "month": 5, "day": 27, "hour": 8, "minute": 25},
      "endPlace": "郑州",
      "endTime": {"year": 2017, "month": 5, "day": 28, "hour": 8, "minute": 25},
      "createPeople":"admin3"
    }
  ]
};