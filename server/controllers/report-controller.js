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

        const endTimes = `${doc.endTime.hour}时${doc.startTime.minute}分`;
        content += doc.endPlace + ',' + judgeDays(doc.endTime.days) + ',' + endTimes + ',-,-,' + doc.mile + '\n';

        var filename = `${trainId}-train.csv`;
        res.setHeader('Content-disposition', 'attachment; filename=' + filename + '');
        res.setHeader('Content-Type', 'train/csv');

        res.send(content);
      });


    });
  }

  getTickers(req, res, next) {
    const trainId = req.params.trainId;
    let content = '';
    content += '站名,硬座票价,硬卧上铺票价,硬卧中铺票价,硬卧下铺票价,软卧上铺票价,软卧下铺票价\n';
    Ticker.findOne({trainId}, (err, doc)=> {
      if (err) {
        return next(err);
      }
      const tickers = doc.tickers;
      for (var i = 0; i < tickers.length; i++) {
        content += tickers[i].name + ',';
        content += tickers[i].seat + ',';
        content += tickers[i].hard.up + ',';
        content += tickers[i].hard.middle + ',';
        content += tickers[i].hard.down + ',';
        content += tickers[i].soft.up + ',';
        content += tickers[i].soft.down + '\n';
      }


      var filename = `${trainId}-ticker.csv`;

      res.setHeader('Content-disposition', 'attachment; filename=' + filename + '');
      res.setHeader('Content-Type', 'tickers/csv');

      res.send(content);
    });
  }
}

module.exports = ReportController;