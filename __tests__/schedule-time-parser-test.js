/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

jest
  .dontMock('../scheduleTimeParser.js')
  .dontMock('minimatch');

var timeParser: (delayTime: string) => Date = require('../scheduleTimeParser.js');
var currentTime;

describe('Schedule Time Parser', function() {
  beforeEach(function(){
    currentTime = new Date()
  });

  it('Parses "3 days" as 3 days from now', function() {
    var parsed: Date = timeParser('3 days');
    var future: Date = new Date();
    future.setDate(currentTime.getDate() + 3);
    future.setSeconds(0);
    future.setMilliseconds(0);
    expect(parsed.toDateString()).toEqual(future.toDateString())
  });

  it('Parses "1 hour" as 1 hour from now', function() {
    var parsed: Date = timeParser('1 hour');
    var future: Date = new Date();
    future.setHours(currentTime.getHours() + 1);
    future.setSeconds(0);
    future.setMilliseconds(0);
    expect(parsed.toDateString()).toEqual(future.toDateString())
  });

  it('Parses "45 minutes" as 45 minutes from now', function() {
    var parsed: Date = timeParser('45 minutes');
    var future: Date = new Date();
    future.setMinutes(currentTime.getMinutes() + 45);
    future.setSeconds(0);
    future.setMilliseconds(0);
    expect(parsed.toDateString()).toEqual(future.toDateString())
  });

  describe('valid arguments', function() {
    it('accepts "3m" as arg', function() {
      expect(function() {
        timeParser('3m')
      }).not.toThrow()
    });
    it('accepts "3 m" as arg', function() {
      expect(function() {
        timeParser('3 m')
      }).not.toThrow()
    });
    it('accepts "3h" as arg', function() {
      expect(function() {
        timeParser('3h')
      }).not.toThrow()
    });
    it('accepts "3 h" as arg', function() {
      expect(function() {
        timeParser('3 h')
      }).not.toThrow()
    });
    it('accepts "3d" as arg', function() {
      expect(function() {
        timeParser('3d')
      }).not.toThrow()
    });
    it('accepts "3 d" as arg', function() {
      expect(function() {
        timeParser('3 d')
      }).not.toThrow()
    });
  });

  describe('invalid arguments', function() {
    it('Throws error if argument is "3 dyas', function() {
      expect(function() {
        timeParser('3 dyas')
      }).toThrow();
    });

    it('Throws error if argument is "3dyas', function() {
      expect(function() {
        timeParser('3dyas')
      }).toThrow();
    });

    it('Throws error if argument is "3w', function() {
      expect(function() {
        timeParser('3w')
      }).toThrow();
    });

    it('Throws error if argument is "3 w', function() {
      expect(function() {
        timeParser('3 w')
      }).toThrow();
    });
  })
});
