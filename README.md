# Seeded Random Utils

A seeded random utility library with functions for common random logic.

## Who is this for?

Anyone who needs a seeded RNG or wants more random logic that reads more intuitively and contains less boilerplate.

## Installation

```shell
$ npm install seeded-random-utils
```

## Usage

Generate an instance of a seeded random number generator by instantiating `Random` with a seed.

```js
const { Random } = require('seeded-random-utils');
const random = new Random(1000);
const arbitraryList = [1, 2, 3, 4, 5];
const item = random.listItem(arbitraryList);
```

## API

### `random.int(min, max)`

Generate a random integer between min and max, inclusive.

- min: number, default 0
- max: number, default Number.MAX_SAFE_INTEGER

#### `oddInt(min, max)`

Generate a random odd integer between min and max, inclusive.

- min: number, default 0
- max: number, default Number.MAX_SAFE_INTEGER

#### `evenInt(min, max)`

Generate a random even integer between min and max, inclusive.

- min: number, default 0
- max: number, default Number.MAX_SAFE_INTEGER

#### `float(min, max)`

Generate a random decimal number between min and max.

- min: number, default 0
- max: number, default 1

#### `decision(probability, decision)`

Make a decision with a `probability` chance of happening, e.g.

```js
Random.decision(0.25, () => {
  console.log('I have a 25% chance of logging this');
});
```

- probability: number
- decision: function

#### `listItem(list)`

Returns a random item from `list`

- probability: number
- decision: function

#### `oneIn(num)`

Returns a boolean that has a one in `num` chance of being true.

```js
if (Random.oneIn(10)) {
  showTreasureChest();
}
```

- num: number, no default.

#### `string(length = 10, alphabet = /* A-Za-z0-9 */)`

Returns a random string of length `length` using the characters from `alphabet`. The default `alphabet` is capital letters A-Z, lowercase letters a-z, and numbers 0-9.

- length: number, default `10`
- alphabet: string, default = `'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'`

#### `character(string)`

Returns a random character from `string`

- string: string, no default.
