const Train = require('../models/train');
const constant = require('../../config/constant');

class ReportController {
  getTrain(req, res, next) {
    let content = '';
    Train.find({}, (err, doc)=> {
      if (err) {
        return next(err);
      }
      content += '列车号,起点站,发车时间,终点站,到达时间\n';
      for (var i = 0; i < doc.length; i++) {
        const startTime = `${doc[i].startTime.year}年${doc[i].startTime.month}月${doc[i].startTime.day}日${doc[i].startTime.hour}时${doc[i].startTime.minutes}分`;
        const endTime = `${doc[i].endTime.year}年${doc[i].endTime.month}月${doc[i].endTime.day}日${doc[i].endTime.hour}时${doc[i].startTime.minutes}分`;
        let middleText = '';
        content += doc[i].trainId + ',';
        content += doc[i].startPlace + ',';
        content += startTime + ',';
        content += doc[i].endPlace + ',';
        content += endTime + '\n';

      }
      var filename = 'train.csv';

      res.setHeader('Content-disposition', 'attachment; filename=' + filename + '');
      res.setHeader('Content-Type', 'train/csv');

      res.send(content);
    });
  }
}

module.exports = ReportController;