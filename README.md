# Tweening Counter

[![Build Status](https://travis-ci.org/tanem/tweening-counter.png?branch=master)](https://travis-ci.org/tanem/tweening-counter)

A JavaScript counter that uses timing functions to move towards it's destination.

## Example

Check out the demo on [CodePen](http://codepen.io/tanem/details/AaxDd), or open `example/index.html` in a browser.

## Development

### Dependencies

Ensure the following are installed:

 * [Node.js](http://nodejs.org/)
 * [PhantomJS](http://phantomjs.org/)

Install global dependencies:

    $ npm install -g grunt-cli

Install local dependencies:
    
    $ npm install

### Grunt Tasks

#### Start

To run the unit tests with code coverage, then watch the required files for changes:

    $ grunt start

#### Unit Testing

[Karma](http://karma-runner.github.io/0.10/index.html) is used to run the unit tests against various browsers and to provide code coverage via [Istanbul](https://github.com/gotwarlost/istanbul). Check the `karma` task config in `Gruntfile.js` for details on browsers covered.

To run unit tests only:

    $ grunt test

To run with code coverage:

    $ grunt cover

The code coverage report is output to `_coverage`.

#### Dist

A minified version of the source file is output to `_dist` via:

    $ grunt dist
