'use strict';

const _ = require('lodash');
const got = require('got');
const debug = require('debug')('slack-helper');

const SLACK_API = 'https://slack.com/api/';

/**
 * slack-helper class
 *
 * @param String Slack API Token
 */
function slackHelper(token) {
  if (!(this instanceof slackHelper)) {
    return new slackHelper(token);
  }

  if (!_.isString(token)) {
    throw new Error('Need an valid slack api token');
  }

  this.token = token;
}

slackHelper.prototype = {
  send: function(channel, message, opts) {
    let self = this;
    let reqUrl = `${SLACK_API}/chat.postMessage`;

    return new Promise(function(resolve, reject) {
      got.post(reqUrl, {
        json: true,
        body: {
          token : self.token,
          channel: channel,
          text: message
        }
      }).then((resp) => {
        let result = resp.body;

        return (result.ok !== true)
          ? reject(new Error(result.error))
          : resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }
};

module.exports = slackHelper;
module.exports.default = module.exports;
