import { expect } from 'chai';
import 'mocha';
import { Random } from '../src/';

class Counter {
  map = new Map();
  count(item: any) {
    if (this.map.has(item)) {
      const count = this.map.get(item) + 1;
      this.map.set(item, count);
    } else {
      this.map.set(item, 0);
    }
  }
  values() {
    return this.map.values();
  }
  entries() {
    return this.map.entries();
  }
}

describe('random', () => {
  it('should be predictable with a seed', () => {
    const r1 = new Random(100);
    const r2 = new Random(100);
    expect(r1.int()).to.equal(r2.int());
    expect(r1.float()).to.equal(r2.float());
    expect(r1.oneIn(100)).to.equal(r2.oneIn(100));
  });
  it('int should have an even distribution', () => {
    const r1 = new Random(100);
    const counter = new Counter();
    const total = 1000000;
    const max = 100;
    for (let i = 0; i < total; i++) {
      counter.count(r1.int(0, max));
    }
    const counts = Array.from(counter.entries());
    counts.forEach(([num, count]) =>
      expect(count).to.be.closeTo(total / max, (total / max) * 0.05, `num ${num} came up ${count} times`),
    );
    expect(counts.length).to.equal(100);
  });
  it('odd should have an even distribution', () => {
    const r1 = new Random(1000);
    const counter = new Counter();
    const total = 1000000;
    const max = 100;
    let remainders = 0;
    for (let i = 0; i < total; i++) {
      const num = r1.oddInt(0, max);
      remainders += num % 2;
      counter.count(num);
    }
    expect(remainders).to.equal(total);
    const counts = Array.from(counter.entries());
    counts.forEach(([num, count]) =>
      expect(count).to.be.closeTo((total / max) * 2, (total / max) * 0.1, `num ${num} came up ${count} times`),
    );
    expect(counts.length).to.equal(49);
  });

  it('even should have an even distribution', () => {
    const r1 = new Random(1000);
    const counter = new Counter();
    const total = 1000000;
    const max = 100;
    let remainders = 0;

    for (let i = 0; i < total; i++) {
      const num = r1.evenInt(0, max);
      remainders += num % 2;
      counter.count(num);
    }
    expect(remainders).to.equal(0);
    const counts = Array.from(counter.entries());
    counts.forEach(([num, count]) =>
      expect(count).to.be.closeTo((total / max) * 2, (total / max) * 0.1, `num ${num} came up ${count} times`),
    );
    expect(counts.length).to.equal(50);
  });

  it('listItem should grab items from lists', () => {
    const random = new Random(1000);
    const list = new Array(100000).fill(0).map(() => Math.random());
    const [i1, i2] = [random.listItem(list), random.listItem(list)];
    expect(i1).to.not.equal(i2);
  });

  it('string should generate random strings', () => {
    const random = new Random(1000);
    expect(random.string()).to.not.equal(random.string());
    expect(random.string(10, 'a')).to.equal(random.string(10, 'a'));
  });
});
