'use strict';

const _ = require('lodash');
const got = require('got');

function slackHelper(opts) {
  if (!(this instanceof slackHelper)) {
    return new slackHelper(opts);
  }

  if (!_.has(opts, 'url')) {
    throw new Error('Need slack webhook url');
  } else if (!_.has(opts, 'token')) {
    throw new Error('Need slack api token');
  }
}

slackHelper.prototype = {
  send: function(message) {

  }
};

module.exports = slackHelper;
module.exports.default = module.exports;
