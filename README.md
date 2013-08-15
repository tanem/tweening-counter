# Counter

[![Build Status](https://travis-ci.org/tanem/counter.png?branch=master)](https://travis-ci.org/tanem/counter)

An animated JavaScript counter.

## Dependencies

 * [Node.js](http://nodejs.org/)
 * [npm](https://npmjs.org/)

Install global dependencies:

    $ npm install -g grunt-cli

Install local dependencies:
    
    $ npm install

## Demo

    $ open demo/index.html

## Dev Start

To run the unit tests with code coverage, then watch the required files for changes:

    $ grunt start

## Unit Testing

[Karma](http://karma-runner.github.io/0.8/index.html) is used to run the unit tests against various browsers and to provide code coverage via [Istanbul](https://github.com/gotwarlost/istanbul). Check the `karma` task config in `Gruntfile.js` for details on browsers covered.

To run unit tests only:

    $ grunt test

To run with code coverage:

    $ grunt cover

The code coverage report is output to `_coverage`.

## Dist

A minified version of the source file is output to `_dist` via:

    $ grunt dist