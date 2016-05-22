/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

'use strict';


var minimatch = require('minimatch');

module.exports = function(delayTime: string): Date {
  var
    moment: Array<string> = [
      'm', 'min', 'mins', 'minute', 'minutes',
      'h', 'hour', 'hours',
      'd', 'day', 'days'
    ];
  var invalidTimeMsg: string = 'Invalid delay time setting, it should in following format:\n' +
    '3m, 3 m, of 3 min\naccepted moments are: ' + moment.join(', ') + '\n instead got ' + delayTime + '\n';

  if(!minimatch(delayTime, "*+(" + moment.join('|') + ")")) {
    throw new Error(invalidTimeMsg);
  }

  var
    curTime: Date = new Date(),
    minutes: number = curTime.getMinutes(),
    hours: number = curTime.getHours(),
    day: number = curTime.getDate(),
    month: number = curTime.getMonth(),
    year: number = curTime.getFullYear();

  var parsedTime: ?Array<string> = delayTime.match(/(\d+)\s?(\w*)/);
  var time: number = parseInt(parsedTime[1]);

  if(!parsedTime){
    throw new Error(invalidTimeMsg);
  }

  switch (parsedTime[2][0]) {
    case 'm':
      minutes += time;
      break;
    case 'h':
      hours += time;
      break;
    case 'd':
      day += time;
      break;
    default:
      throw new Error(invalidTimeMsg);
  }

  return new Date(year, month, day, hours, minutes, curTime.getSeconds(), 0);
};

