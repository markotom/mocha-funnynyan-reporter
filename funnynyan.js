'use strict';

var fs = require('fs');
var Reader = require('wav').Reader;
var Speaker = require('speaker');
var mocha = require('mocha');
var Nyan = mocha.reporters.Nyan;

var file = fs.createReadStream(__dirname + '/vendor/nyan.wav');
var reader = new Reader();
var speaker = new Speaker();

reader.on('format', function () {
  reader.pipe(speaker);
});

function FunnyNyan (runner) {
  Nyan.call(this, runner);

  runner.on('start', function () {
    file.pipe(reader);
  });

  runner.on('end', function () {
    file.unpipe();
    speaker.close();
  });

}

exports = module.exports = FunnyNyan;
FunnyNyan.prototype.__proto__ = Nyan.prototype;
