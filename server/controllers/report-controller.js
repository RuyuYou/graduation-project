const Train = require('../models/train');
const constant = require('../../config/constant');

class ReportController {
  getAll(req, res, next) {
    let content = '';
    Train.find({}, (err, doc)=> {
      if (err) {
        return next(err);
      }
      content += '列车号,总时长,发车时间,始发站,终点站,中间站\n';
      for (var i = 0; i < doc.length; i++) {
        const lastedTime = `${doc[i].lastedTime.hour}时${doc[i].lastedTime.minutes}分`;
        const startTime = `${doc[i].startTime.year}年${doc[i].startTime.month}月${doc[i].startTime.day}日${doc[i].startTime.hour}时${doc[i].startTime.minutes}分`;
        let middleText = '';
        const middlePlace = doc[i].middlePlace.map((item, index)=> {
          if (index === 0) {
            middleText += item;
          } else {
            middleText += `、${item}`;
          }
        });
        content += doc[i].trainId + ',';
        content += lastedTime + ',';
        content += startTime + ',';
        content += doc[i].startPlace + ',';
        content += doc[i].endPlace + ',';
        content += middleText + '\n';
      }
      var filename = 'train.csv';

      res.setHeader('Content-disposition', 'attachment; filename=' + filename + '');
      res.setHeader('Content-Type', 'train/csv');

      res.send(content);
    });
  }
}

module.exports = ReportController;