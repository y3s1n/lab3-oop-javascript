import { describe, it } from 'node:test';
import assert from 'node:assert';
import { DiceSet } from '../../src/domain/DiceSet.js';

describe('DiceSet', () => {
    describe('constructor', () => {
        it('should create a set with default 1 die of 6 sides', () => {
            const set = new DiceSet();
            assert.strictEqual(set.getCount(), 1);
            assert.strictEqual(set.getSides(), 6);
        });

        it('should create a set withh specified count and sides', () => {
            const set = new DiceSet(3, 20);
            assert.strictEqual(set.getCount(), 3);
            assert.strictEqual(set.getSides(), 20);
        });

        it('should throw error for count less than 1', () => {
            assert.throws(() => new DiceSet(0), /DiceSet must contain at least 1 die/);
            assert.throws(() => new DiceSet(-1), /DiceSet must contain at least 1 die/);
        });
    });


    describe('rollAll', () => {
        it('should return array of rolled values', () => {
            const set = new DiceSet(3, 6);
            const results = set.rollAll();

            assert.strictEqual(results.length, 3);
            results.forEach(value => {
                assert(value >= 1, 'Value should be at least 1');
                assert(value <= 6, 'value should be at most 6');
                assert(Number.isInteger(value), 'Value should be an integer');
            });
        });

        it('should update all die values', () => {
            const set = new DiceSet(2, 6);
            assert.deepStrictEqual(set.getValues(), [null, null]);

            const results = set.rollAll();
            assert.deepStrictEqual(set.getValues(), results);
        });
    });

    describe('getValues', () => {
        it('should return null values before rolling', () => {
            const set = new DiceSet(3);
            assert.deepStrictEqual(set.getValues(), [null, null, null]);
        });

        it('should return current values after rolling', () => {
            const set = new DiceSet(2);
            const rolled = set.rollAll();
            assert.deepStrictEqual(set.getValues(), rolled);
        });
    });

    describe('getTotal', () => {
        it('should return null if any die not rolled', () => {
            const set = new DiceSet(3);
            assert.strictEqual(set.getTotal(), null);
        });

        it('should return sum of all dice after rolling', () => {
            const set = new DiceSet(3, 6);
            const results = set.rollAll();
            const expectedTotal = results.reduce((sum, val) => sum + val, 0);
            assert.strictEqual(set.getTotal(), expectedTotal);
        });

        it('should calculate correct total for various rolls', () => {
            const set = new DiceSet(2, 6);

            //test multiple times to ensure consistency
            for (let i=0; i<10; i++) {
                const results = set.rollAll();
                const expectedTotal = results[0] + results[1];
                assert.strictEqual(set.getTotal(), expectedTotal);
            }
        });
    });

    describe('hasBeenRolled', () => {
        it('should return false before rolling', () => {
            const set = new DiceSet(3);
            assert.strictEqual(set.hasBeenRolled(), false);
        });

        it('should return true after rolling all dice', () => {
            const set = new DiceSet(3);
            set.rollAll();
            assert.strictEqual(set.hasBeenRolled(), true);
        });
    });

    describe('reset', () => {
        it('should reset all dice to unrolled state', () => {
            const set = new DiceSet(3);
            set.rollAll();
            assert.strictEqual(set.hasBeenRolled(), true);
            assert(set.getTotal() !== null);

            set.reset();
            assert.strictEqual(set.hasBeenRolled(), false);
            assert.strictEqual(set.getTotal(), null);
            assert.deepStrictEqual(set.getValues(), [null, null, null]);
        });
    });

    describe('getMinTotal and getMaxTotal', () => {
        it('should return correct min and max for d6', () => {
            const set = new DiceSet(3, 6);
            assert.strictEqual(set.getMinTotal(), 3); // 3 dice x 1
            assert.strictEqual(set.getMaxTotal(), 18); // 3 dice x 20
        });

        it('should return correct min and max for d20', () => {
            const set = new DiceSet(2, 20);
            assert.strictEqual(set.getMinTotal(), 2); // 2 dice x 1
            assert.strictEqual(set.getMaxTotal(), 40); // 2 dice x 20
        });
    });

    describe('rolled values range', () => {
        it('should always roll within min and max bounds', () => {
            const set = new DiceSet(3, 8);
            const min = set.getMinTotal();
            const max = set.getMaxTotal();

            for (let i=0; i<50; i++) {
                set.rollAll();
                const total = set.getTotal();
                assert(total >= min, 'Total ${total} should be >= ${min}');
                assert(total <= max, 'Total ${total} should be <= ${max}');
            }
        });
    });
});