'use strict';

const express = require('express');

function addJsonBody(req, res, next) {
    return express.json()(req, res, next);
}

module.exports = addJsonBody;
