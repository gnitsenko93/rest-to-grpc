/* global __dirname */
'use strict';

const fs = require('fs');

const Service = require('./src/service');

const config = JSON.parse(fs.readFileSync(__dirname + '/config/default.json').toString());

const service = new Service(config);

service.start();
