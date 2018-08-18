# lazy-transform-js

[![Build Status](https://travis-ci.org/nieltg/lazy-transform-js.svg?branch=master)](https://travis-ci.org/nieltg/lazy-transform-js)
[![Coverage Status](https://coveralls.io/repos/github/nieltg/lazy-transform-js/badge.svg?branch=master)](https://coveralls.io/github/nieltg/lazy-transform-js?branch=master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

> Ever wanted to use async functions in [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)? This library may help you to do that.

```ts
import { transform } from "lazy-transform"

const iterable = transform([1, 2, 3])
  .mapAwait(async value => {
    // Some API calls here
    // ...

    return valueFromApi
  })

for await (const value of iterable) {
  console.log(value)
}
```

## Installation

```
$ yarn add lazy-transform
```

## API

### transform(iterable)

Wrap an `Iterable` or `AsyncIterable` so library methods can be called to them. The wrapper itself is also an iterable.

```ts
const iterable = transform([1, 2, 3])
```
```ts
function* generator() {
  yield* [1, 2, 3]
}

const iterable = transform(generator())

for (const value of iterable) {
  // ...
}
```
```ts
async function* asyncGenerator() {
  yield* [1, 2, 3]
}

const asyncIterable = transform(asyncGenerator())

for await (const value of asyncIterable) {
  // ...
}
```

### Wrapper.map(func) or .mapAwait(asyncFunc)

Create a new iterable with the results of calling `func` or `asyncFunc`on every item in the previous iterable.

```ts
const iterable = transform([1, 2, 3]).map(value => value + 5)
```
```ts
const asyncIterable = transform([1, 2, 3]).mapAwait(async value => value + 5)
```

## Improvements

- Add `.collect` method which returns an array or something.
- Add more methods, like `.reduce`, `.peek`, etc.
- Add `Scheduler` concept for every awaiters so passed async functions can be called not just in serial.

## License

[MIT](LICENSE)
