# Logistic Progressor

A utility library to create an infinitely advancing progress bar.

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
