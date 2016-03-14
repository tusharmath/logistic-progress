# Logistic Progressor

[![Build Status](https://travis-ci.org/tusharmath/logistic-progressor.svg?branch=master)](https://travis-ci.org/tusharmath/logistic-progressor)
[![npm](https://img.shields.io/npm/v/logistic-progressor.svg)](https://www.npmjs.com/package/logistic-progressor)

[jQuery and bootstrap]:      http://getbootstrap.com/components/#progress
[gauge]:          https://github.com/iarna/gauge
[react]:          https://facebook.github.io/react

A utility library to create an infinitely advancing progress bars. The module only implements the logic, the styling is totally up to how you want to implement it, you can  create your own progress-bar using [jQuery and bootstrap] or maybe using [react] or something simple on the console using [gauge].

[demo-gif]: http://res.cloudinary.com/tusharmath/image/upload/v1457934350/Logistic-Loader-Demo_iu9cnh.gif
![Demo][demo-gif]

The library exposes a stream, which emits values starting from 0 and *logistically* increasing up until 100. The closer the value gets to 100, the smaller jumps it takes to get the next value, thus never actually reaching 100.



# Install

```bash
npm i logistic-progressor --save
```

# Usage

```javascript
const Rx = require('rx')
const create = require('logistic-progressor')
var value = false
const input = new Rx.BehaviorSubject(value)

create(input).subscribe(x => console.log(x))

setInterval(() => {
  value = ! value
  input.onNext(value)
}, 1000)
```
