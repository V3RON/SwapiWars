import { getRandomInt } from './random.util';

describe('RandomUtil', () => {
  [[0, 1], [12, 24], [13, 14], [-12, 12]].forEach(data => {
    it(`should return random number between ${data[0]}  and ${data[1]} (inclusive)`, () => {
      const randomInt = getRandomInt(data[0], data[1]);

      expect(randomInt).toBeGreaterThanOrEqual(data[0]);
      expect(randomInt).toBeLessThanOrEqual(data[1]);
    });
  });
});
