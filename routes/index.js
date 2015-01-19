var express = require('express');
var router = express.Router();
var fs = require('fs');
var spawn = require('child_process').spawn;

var cmd = 'tesseract';
var imgPath = 'code.png';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.post('/', function(req, res, next) {
    var base64 = req.body['base64'];
    getTextFromBase64(base64, function(text) {
        res.json({
            text: text
        });
    });
});

function getTextFromBase64(base64, callback) {
    base64 = base64.replace(/^data:image\/\w+;base64,/, "")
    var bitmap = new Buffer(base64, 'base64');
    fs.writeFileSync(imgPath, bitmap);

    var tesseract = spawn(cmd, [imgPath, 'stdout', '-l eng', '-psm 7', 'digits']);
    tesseract.stdout.setEncoding('utf8');
    var result = '';
    tesseract.stdout.on('data', function(data) {
        console.log(data);
        result += data;
    });
    tesseract.stdout.on('end', function(data) {
        callback && callback(result);
    });

    tesseract.on('error', function(e) {
        console.log(e);
    });
}

module.exports = router;