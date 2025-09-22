import { describe, it } from 'node:test';
import assert from 'node:assert';
import { DiceNotation } from '../../src/domain/DiceNotation.js';

describe('DiceNotation', () => {
    describe('parse', () => {
        it('should parse simple dice notation', () => {
            const parsed = DiceNotation.parse('3d6');
            assert.strictEqual(parsed.notation, '3d6');
            assert.strictEqual(parsed.components.length, 1);
            assert.deepStrictEqual(parsed.components[0], {
                type: 'dice',
                count: 3,
                sides: 6,
                sign: 1
            });
        });

        it('should parse dice with modifier', () => {
            const parsed = DiceNotation.parse('2d8+3');
            assert.strictEqual(parsed.notation, '2d8+3');
            assert.strictEqual(parsed.components.length, 2);
            assert.deepStrictEqual(parsed.components[0], {
                type: 'dice',
                count: 2,
                sides: 8,
                sign: 1
            });

            assert.deepStrictEqual(parsed.components[1], {
                type: 'modifier',
                value: 3
            });
        });

        it('should parse multiple dice sets', () => {
            const parsed = DiceNotation.parse('1d20+2d6');
            assert.strictEqual(parsed.components.length, 2);
            assert.strictEqual(parsed.components[0].type, 'dice');
            assert.strictEqual(parsed.components[0].count, 1);
            assert.strictEqual(parsed.components[0].sides, 20);
            assert.strictEqual(parsed.components[1].type, 'dice');
            assert.strictEqual(parsed.components[1].count, 2);
            assert.strictEqual(parsed.components[1].sides, 6);
        });

        it('should parse negative modifiers', () => {
            const parsed = DiceNotation.parse('1d20-2');
            assert.strictEqual(parsed.components.length, 2);
            assert.strictEqual(parsed.components[1].value, -2);
        });

        it('should parse notation with spaces', () => {
            const parsed = DiceNotation.parse(' 2d6 + 3 ');
            assert.strictEqual(parsed.notation, '2d6+3');
        });

        it('should parse notation with capital letters', () => {
            const parsed = DiceNotation.parse('2D6');
            assert.strictEqual(parsed.notation, '2d6');
        });

        it('should default to 1 die if count not specified', () => {
            const parsed = DiceNotation.parse('d20');
            assert.strictEqual(parsed.components[0].count, 1);
        });

        it('should throw error for invalid notation', () => {
            assert.throws(() => DiceNotation.parse(''), /Invalid notation/);
            assert.throws(() => DiceNotation.parse(null), /Invalid notation/);
            assert.throws(() => DiceNotation.parse('abc'), /Invalid notation/);
            assert.throws(() => DiceNotation.parse('3x6'), /Invalid notation/);
        });

        it('should throw error for invalid dice counts', () => {
            assert.throws(() => DiceNotation.parse('0d6'), /Invalid dice count/);
        });

        it('should throw error for invalid dice sides', () => {
            assert.throws(() => DiceNotation.parse('3d1'), /Invalid dice sides/);
            assert.throws(() => DiceNotation.parse('3d0'), /Invalid dice sides/);
        });
    });

    describe('roll functionality', () => {
        it('should roll within expected range', () => {
            const parsed = DiceNotation.parse('3d6');

            for (let i = 0; i < 50; i++) {
                const result = parsed.roll();
                assert(result.total >= 3, 'Total should be at least 3');
                assert(result.total <= 18, 'Total should be at most 18');
            }
        });

        it('should include dice details in roll result', () => {
            const parsed = DiceNotation.parse('2d6');
            const result = parsed.roll();
            assert.strictEqual(result.dice.length, 1);
            assert.strictEqual(result.dice[0].notation, '2d6');
            assert.strictEqual(result.dice[0].rolls.length, 2);
            result.dice[0].rolls.forEach(roll => {
                assert(roll >= 1 && roll <= 6);
            });
        });

        it('should apply modifiers correctly', () => {
            const parsed = DiceNotation.parse('1d6+5');

            for (let i = 0; i < 20; i++) {
                const result = parsed.roll();
                assert(result.total >= 6, 'Total should be at least 6 (1+5)');
                assert(result.total <= 11, 'Total should be at most 11 (6+5)');
                assert.strictEqual(result.modifiers[0], 5);
            }
        });

        it('should handle negative modifiers', () => {
            const parsed = DiceNotation.parse('1d6-2');

            for (let i = 0; i < 20; i++) {
                const result = parsed.roll();
                assert(result.total >= -1, 'Total should be at least -1 (1-2)');
                assert(result.total <= 4, 'Total should be at most 4 (6-2)');
            }
        });

        it('should combine multiple dice sets', () => {
            const parsed = DiceNotation.parse('1d4+1d6');

            for (let i = 0; i < 20; i++) {
                const result = parsed.roll();
                assert(result.total >= 2, 'Total should be at least 2');
                assert(result.total <= 10, 'Total should be at most 10');
                assert.strictEqual(result.dice.length, 2);
            }
        });
    });

    describe('getMin and getMax', () => {

        it('should calculate correct min and max for simple notation', () => {
            const parsed = DiceNotation.parse('3d6');
            assert.strictEqual(parsed.getMin(), 3);
            assert.strictEqual(parsed.getMax(), 18);
        });

        it('should calculate correct min and max with positive modifier', () => {
            const parsed = DiceNotation.parse('2d8+5');
            assert.strictEqual(parsed.getMin(), 7); // 2×1 + 5
            assert.strictEqual(parsed.getMax(), 21); // 2×8 + 5
        });

        it('should calculate correct min and max with negative modifier', () => {
            const parsed = DiceNotation.parse('1d20-3');
            assert.strictEqual(parsed.getMin(), -2); // 1 - 3
            assert.strictEqual(parsed.getMax(), 17); // 20 - 3
        });

        it('should calculate correct min and max for complex notation', () => {
            const parsed = DiceNotation.parse('2d6+1d8+3');
            assert.strictEqual(parsed.getMin(), 6); // 2 + 1 + 3
            assert.strictEqual(parsed.getMax(), 23); // 12 + 8 + 3
        });
    });

    describe('static roll method', () => {
        it('should provide quick roll functionality', () => {
            for (let i = 0; i < 20; i++) {
                const total = DiceNotation.roll('2d6');
                assert(total >= 2, 'Total should be at least 2');
                assert(total <= 12, 'Total should be at most 12');
                assert(Number.isInteger(total), 'Total should be an integer');
            }
        });

        it('should work with modifiers', () => {
            for (let i = 0; i < 20; i++) {
                const total = DiceNotation.roll('1d4+2');
                assert(total >= 3, 'Total should be at least 3');
                assert(total <= 6, 'Total should be at most 6');
            }
        });
    });
});