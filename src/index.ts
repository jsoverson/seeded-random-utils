import seedrandom from 'seedrandom';

function isEven(num: number) {
  return num % 2 === 0;
}

export class Random {
  seed: number;
  rng: seedrandom.prng;

  constructor(seed?: number) {
    if (!seed) seed = seedrandom().int32();
    this.seed = seed;
    this.rng = seedrandom(seed.toString());
  }

  int(min = 0, max = Number.MAX_SAFE_INTEGER): number {
    return Math.floor(this.rng() * (max - min)) + min;
  }

  oddInt(min = 0, max = Number.MAX_SAFE_INTEGER): number {
    min = isEven(min) ? min + 1 : min;
    max = isEven(max) ? max - 1 : max;
    const delta = max - min;
    const rand = this.int(0, delta / 2);
    return min + rand * 2;
  }

  evenInt(min = 0, max = Number.MAX_SAFE_INTEGER): number {
    min = !isEven(min) ? min + 1 : min;
    max = !isEven(max) ? max - 1 : max;
    const delta = max - min;
    const rand = this.int(0, delta / 2);
    return min + rand * 2;
  }

  float(min = 0, max = 1): number {
    return this.rng() * max - min;
  }

  decision(probability: number, decision: () => void): void {
    if (this.float() < probability) decision();
  }

  listItem<T>(list: T[]): T {
    return list[this.int(0, list.length)];
  }

  character(string: string): string {
    return string[this.int(0, string.length)];
  }

  oneIn(num: number): boolean {
    return this.float() < 1 / num;
  }

  string(length = 10, alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
    const randomChar = () => this.character(alphabet);
    return new Array(length).fill(0).map(randomChar).join('');
  }
}
