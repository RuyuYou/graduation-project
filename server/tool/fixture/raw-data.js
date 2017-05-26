module.exports = {
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
    }, {
      "_id": "591686df707c543576c0eec6",
      "trainId": "3",
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
      "trainId": "1",
      "createPeople": "ADMIN1",
      "stations": [
        {
          "leaveTime": {"minute": 7, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "endTime": {"minute": 1, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "station": "1"
        },
        {
          "leaveTime": {"minute": 9, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "endTime": {"minute": 8, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "station": "2"
        },
        {
          "leaveTime": {"minute": 20, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "endTime": {"minute": 10, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "station": "3"
        }
      ],
    },
    {
      "_id": "59279ea142421758965c8f5e",
      "trainId": "2",
      "createPeople": "ADMIN2",
      "stations": [
        {
          "leaveTime": {"minute": 7, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "endTime": {"minute": 1, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "station": "1"
        },
        {
          "leaveTime": {"minute": 9, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "endTime": {"minute": 8, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "station": "2"
        },
        {
          "leaveTime": {"minute": 20, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "endTime": {"minute": 10, "hour": 4, "day": 29, "month": 5, "year": 2017},
          "station": "3"
        }
      ],
    }
  ]
};