# Seeded Random Utils

A seeded random utility library with functions for common random logic.

## Who is this for?

Anyone who needs a seeded RNG or wants more random logic that reads more intuitively and contains less boilerplate.

## Installation

```shell
$ npm install seeded-random-utils
```

## Usage

Generate an instance of a seeded random number generator by instantiatating `Random` with a seed.

```js
const { Random } = require('seeded-random-utils');
const random = new Random(1000);
const arbitraryList = [1, 2, 3, 4, 5];
const item = random.listItem(arbitraryList);
```

## API

### int(min = 0, max = Number.MAX_SAFE_INTEGER)

Generate a random integer, optionally between min and max.

### oddInt(min = 0, max = Number.MAX_SAFE_INTEGER)

Generate a random odd integer, optionally between min and max.

### float(min = 0, max = 1)

Generate a random decimal number between min and max.

### decision(probability: number, decision: () => void)

Make a decision with a `probability` chance of happening, e.g.

```js
Random.decision(0.25, () => {
  console.log('I have a 25% chance of logging this');
});
```

### listItem(list)

Returns a random item from `list`

### oneIn(num)

Returns a boolean that has a one in `num` chance of being true.

```js
if (Random.oneIn(10)) {
  showTreasureChest();
}
```

### string(length = 10, alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')

Returns a random string of length `length` using the characters from `alphabet`

### character(string)

Returns a random character from `string`
