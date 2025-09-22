import { describe, it } from 'node:test';
import assert from 'node:assert';
import { TextRenderer } from '../../src/application/TextRenderer.js';
describe('TextRenderer', () => {
  describe('render', () => {
    it('should render simple dice roll', () => {
      const renderer = new TextRenderer();
      const result = {
        total: 10,
        dice: [
          {
            notation: '3d6',
            rolls: [3, 4, 3],
            subtotal: 10
          }
        ],
        modifiers: []
      };
      const output = renderer.render(result);
      assert(output.includes('3d6: [3, 4, 3] = 10'));
      assert(output.includes('Total: 10'));
    });
    it('should render roll with modifiers', () => {
      const renderer = new TextRenderer();
      const result = {
        total: 15,
        dice: [
          {
            notation: '2d6',
            rolls: [4, 6],
            subtotal: 10
          }
        ],
        modifiers: [5]
      };
      const output = renderer.render(result);
      assert(output.includes('2d6: [4, 6] = 10'));
      assert(output.includes('+5'));
      assert(output.includes('Total: 15'));
    });
    it('should render negative modifiers', () => {
      const renderer = new TextRenderer();
      const result = {
        total: 5,
        dice: [
          {
            notation: '1d20',
            rolls: [8],
            subtotal: 8
          }
        ],
        modifiers: [-3]
      };
      const output = renderer.render(result);
      assert(output.includes('1d20: [8] = 8'));
      assert(output.includes('-3'));
      assert(output.includes('Total: 5'));
    });
  });
  describe('renderStatistics', () => {
    it('should render statistics for multiple rolls', () => {
      const renderer = new TextRenderer();
      const rolls = [3, 6, 4, 5, 2, 6];
      const output = renderer.renderStatistics(rolls, '1d6');
      assert(output.includes('Statistics for 1d6:'));
      assert(output.includes('Rolls: 6'));
      assert(output.includes('Average: 4.33'));
      assert(output.includes('Min: 2'));
      assert(output.includes('Max: 6'));
      assert(output.includes('Total: 26'));
    });
    it('should handle empty rolls array', () => {
      const renderer = new TextRenderer();
      const output = renderer.renderStatistics([], '1d6');
      assert.strictEqual(output, 'No rolls to analyze');
    });
  });
});
