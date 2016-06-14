'use strict';

const _ = require('lodash');
const got = require('got');

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
  getUserList: function() {
    let self = this;
    let reqUrl = `${SLACK_API}/users.list`;

    return new Promise(function (resolve, reject) {
      got.get(reqUrl, {
        json: true,
        query: {
          token: self.token
        }
      }).then(resp => {
        let result = resp.body;

        return (result.ok !== true)
          ? reject(new Error(result.error))
          : resolve(result);
      }).catch(error => {
        reject(error);
      });
    });
  },
  getGroup: function(groupName) {
    let self = this;
    let reqUrl = `${SLACK_API}/groups.list`;

    return new Promise((resolve, reject) => {
      got.get(reqUrl, {
        json: true,
        query: {
          token: self.token
        }
      }).then(resp => {
        let result;
        if (!groupName) {
          result = resp.body.groups;
        } else {
          console.log(resp.body)
          let ret = _.find(resp.body.groups, {'name': groupName});

          if (!ret) {
            reject(new Error(`Can not find ${groupName}`));
          } else {
            result = ret;
          }
        }

        resolve(result);
      }).catch(error => {
        reject(error);
      })
    });
  },
  send: function(channel, message, opts) {
    let self = this;
    let reqUrl = `${SLACK_API}/chat.postMessage`;

    return new Promise(function (resolve, reject) {
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
  },
  sendToUsers: function(users, channel, message, opts) {
  }
};

module.exports = slackHelper;
module.exports.default = module.exports;
