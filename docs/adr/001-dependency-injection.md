# ADR-001: Use Constructor-Based Dependency Injection
## Status
Accepted
## Context
We need a way to manage dependencies between components while maintaining:
- Testability
- Loose coupling
- Clear dependency relationships
- No external framework dependencies
## Decision
We will use constructor-based dependency injection where all dependencies are passed
as constructor parameters.
## Consequences
### Positive
- Dependencies are explicit and visible
- Works naturally with JavaScript's approach to OOP
- Easy to mock for testing
### Negative
- Manual wiring of dependencies
- Constructor parameter lists can grow
- Dependencies still need to be well considered
## Example

```javascript
// Dice roller with injected renderer dependency
class DiceRoller {
constructor(renderer) {
this.renderer = renderer; // Injected display strategy
}
roll(notation) {
const result = /* rolling logic */;
return this.renderer.render(result); // Use injected renderer
}
}
// Usage with different renderers
const textRenderer = new TextRenderer();
const asciiRenderer = new AsciiRenderer();
const textRoller = new DiceRoller(textRenderer);
const visualRoller = new DiceRoller(asciiRenderer);
// Same logic, different output
textRoller.roll("2d6"); // Output: "You rolled 7 (3, 4)"
visualRoller.roll("2d6"); // Output: ASCII art of dice faces

```
## Alternatives Considered
1. DI Framework - Additional complexity and dependencies. Always avoid adopting
complexity until we understand basics
2. Factory Pattern - Could be used, but rather keep the concept of DI clear before
introducing more specific coding patterns
Create docs/adr/002-documentation-as-code.md :
