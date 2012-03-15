#!/bin/bash
cd test
kanso push "$1"
phantomjs run-jasmine.js "$1/_design/dashboard-core-test/spec/SpecRunner.html"
