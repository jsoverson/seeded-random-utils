import seedrandom from 'seedrandom';

export class Random {
  seed: number;
  rng: seedrandom.prng;

  static rng = new Random(0);

  static globalSeed(seed: number): void {
    Random.rng = new Random(seed);
  }

  constructor(seed?: number) {
    if (!seed) seed = seedrandom().int32();
    this.seed = seed;
    this.rng = seedrandom(seed.toString());
  }

  int(min = 0, max = Number.MAX_SAFE_INTEGER): number {
    return Math.floor(this.rng() * (max - min)) + min;
  }

  oddInt(min = 0, max = Number.MAX_SAFE_INTEGER): number {
    min = min % 2 === 0 ? min + 1 : min;
    max = max % 2 === 0 ? max - 1 : max;
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
