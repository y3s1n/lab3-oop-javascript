import { describe, it } from 'node:test';
import assert from 'node:assert';
import { Die } from '../../src/domain/Die.js';

describe('Die', () => {
  describe('constructor', () => {
    it('should create a die with default 6 sides', () => {
      const die = new Die();
      assert.strictEqual(die.getSides(), 6);
    });

    it('should create a die with specified number of sides', () => {
      const die = new Die(20);
      assert.strictEqual(die.getSides(), 20);
    });

    it('should throw error for less than 2 sides', () => {
      assert.throws(() => new Die(1), /Die must have at least 2 sides/);
      assert.throws(() => new Die(0), /Die must have at least 2 sides/);
      assert.throws(() => new Die(-1), /Die must have at least 2 sides/);
    });
  });

  describe('roll', () => {
    it('should return a value between 1 and sides', () => {
      const die = new Die(6);
      for (let i = 0; i < 100; i++) {
        const value = die.roll();
        assert(value >= 1, 'Value should be at least 1');
        assert(value <= 6, 'Value should be at most 6');
        assert(Number.isInteger(value), 'Value should be an integer');
      }
    });

    it('should update current value', () => {
      const die = new Die();
      assert.strictEqual(die.getValue(), null);
      const rolled = die.roll();
      assert.strictEqual(die.getValue(), rolled);
    });

    it('should generate different values (statistical test)', () => {
      const die = new Die(6);
      const values = new Set();
      // Roll many times to likely see all faces
      for (let i = 0; i < 100; i++) {
        values.add(die.roll());
      }
      // With 100 rolls of a d6, we should see multiple different values
      assert(values.size > 1, 'Should generate different values');
    });
  });

  describe('getValue', () => {
    it('should return null before rolling', () => {
      const die = new Die();
      assert.strictEqual(die.getValue(), null);
    });

    it('should return the last rolled value', () => {
      const die = new Die();
      const value1 = die.roll();
      assert.strictEqual(die.getValue(), value1);
      const value2 = die.roll();
      assert.strictEqual(die.getValue(), value2);
    });
  });

  describe('hasBeenRolled', () => {
    it('should return false before rolling', () => {
      const die = new Die();
      assert.strictEqual(die.hasBeenRolled(), false);
    });

    it('should return true after rolling', () => {
      const die = new Die();
      die.roll();
      assert.strictEqual(die.hasBeenRolled(), true);
    });
  });

  describe('reset', () => {
    it('should reset die to unrolled state', () => {
      const die = new Die();
      die.roll();
      assert.strictEqual(die.hasBeenRolled(), true);
      assert(die.getValue() !== null);
      die.reset();
      assert.strictEqual(die.hasBeenRolled(), false);
      assert.strictEqual(die.getValue(), null);
    });
  });
});
