const Train = require('../models/train');
const Ticker = require('../models/ticker');
const Station = require('../models/station');
const constant = require('../../config/constant');

function judgeDays(days) {
  if (days == 0) {
    return '当日';
  } else {
    return `${days + 1}日`
  }
}

class ReportController {
  getTrain(req, res, next) {
    let content = '';
    content += '站名,日期,到达时间,开车时间,停车时间,里程\n';
    const trainId = req.params.trainId;
    Train.findOne({trainId}, (err, doc)=> {
      if (err) {
        return next(err);
      }
      const startTime = `${doc.startTime.hour}时${doc.startTime.minute}分`;
      content += doc.startPlace + ',当日,' + '-,' + startTime + ',-,0\n';
      Station.findOne({trainId}, (err, result)=> {
        if (err) {
          return next(err);
        }
        const stations = result.stations;
        for (let i = 0; i < stations.length; i++) {
          const endTime = `${stations[i].endTime.hour}时${stations[i].endTime.minute}分`;
          const leaveTime = `${stations[i].leaveTime.hour}时${stations[i].leaveTime.minute}分`;
          content += stations[i].name + ',';
          content += judgeDays(stations[i].days) + ',';
          content += endTime + ',';
          content += leaveTime + ',';
          content += stations[i].parkTime + ',';
          content += stations[i].mile + '\n';
        }

        const endTimes = `${doc.endTime.hour}时${doc.startTime.minute}分`
        content += doc.endPlace + ',' + judgeDays(doc.endTime.days) + ',' + endTimes + ',-,-,' + doc.mile + '\n';

        var filename = `${trainId}.csv`;
        res.setHeader('Content-disposition', 'attachment; filename=' + filename + '');
        res.setHeader('Content-Type', 'train/csv');

        res.send(content);
      });


    });
  }

  getTickers(req, res, next) {
    let content = '';
    Ticker.find({}, (err, doc)=> {
      if (err) {
        return next(err);
      }
      content += '列车号,车厢个数,卧铺个数,硬座个数\n';
      for (var i = 0; i < doc.length; i++) {
        content += doc[i].trainId + ',';
        content += doc[i].cabinNumber + ',';
        content += doc[i].sleeperNumber + ',';
        content += doc[i].seatNumber + '\n';
      }
      var filename = 'tickers.csv';

      res.setHeader('Content-disposition', 'attachment; filename=' + filename + '');
      res.setHeader('Content-Type', 'tickers/csv');

      res.send(content);
    });
  }
}

module.exports = ReportController;