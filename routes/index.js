var express = require('express');
var router = express.Router();
var fs = require('fs');
var spawn = require('child_process').spawn;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.post('/', function(req, res, next) {
    var base64 = req.body['base64'];
    try {
        getTextFromBase64(base64, function(text) {
            res.json({
                text: text
            });
        });
    } catch (e) {
        console.log(e);
    }
});

function getTextFromBase64(base64, callback) {
    base64 = base64.replace(/^data:image\/\w+;base64,/, "")
    var bitmap = new Buffer(base64, 'base64');
    fs.writeFileSync('code.png', bitmap);

    var tesseract = spawn('tesseract', ['code.png', 'stdout', '-l eng', '-psm 7', 'digits']);
    tesseract.stdout.setEncoding('utf8');
    var result = '';
    tesseract.stdout.on('data', function(data) {
        console.log(data);
        if (data) {
            result += data;
        }
    });
    tesseract.stdout.on('end', function(data) {
        if (data) {
            result += data;
        }
        callback && callback(result.trim() || '');
    });

    tesseract.on('error', function(e) {
        console.log(e);
    });
}

module.exports = router;