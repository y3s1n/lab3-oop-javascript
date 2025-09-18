# lab3-oop-javascript

## Overview
This project will implement a simple simulation of dice rolling to demonstrate
software engineering principles, including:
- Clean architecture and separation of concerns
- Introduction to dependency injection for testability
- Living documentation that stays synchronized with code
- Test-driven development practices
- Progressive enhancement through iterative development

## Project Goals
By the end of this lab, we will have:
1. A dice simulation with clear separation between logic and presentation that allows
you to roll various numbers and types of dice in support of games
2. Comprehensive unit tests demonstrating proper testing techniques
3. Multiple user interfaces (CLI with text and JSON and an optional TUI) using the
same core logic
4. Documentation that updates alongside the code using JSDoc and Mermaid diagrams
5. A complete development workflow with linting, testing, and documentation generation

## Dice Details
Our dice simulation will support:
- Individual dice with configurable number of sides (d4, d6, d8, d10, d12, d20, d100,
etc.)
- Collections of dice that can be rolled together (e.g., 3d6, 2d20+1d8)
- Statistical tracking of roll results
- Different rendering strategies for displaying results
- Deterministic testing through dependency injection

## Development Approach
This project follows a step-by-step development approach:
1. Project setup and documentation structure
2. Domain layer - Basic game entities (Die, DiceSet) and JS OOP introduction with tests
3. Quality refactor - using linting, formatting, and living docs
4. View Layer Step 1 - CLI
5. View Layer Step 2 - TUI (optional)
## Repository Structure (Planned)
` ``
lab3-js-oop-dice-docs-and-design/
├── docs/
│ ├── adr/ # Architecture Decision Records
│ └── architecture.md # System architecture overview
├── src/ # Source code (to be added)
├── test/ # Test files (to be added)
├── .gitignore # Git ignore configuration
├── package.json # Node.js project configuration
├── README.md # This file
├── CHANGELOG.md # Version history
└── LICENSE.md # MIT License
` ``
## Design Decisions
Key architectural decisions are documented in the Architecture Decision Records
(ADRs):
- [ADR-001: Dependency Injection](docs/adr/001-dependency-injection.md) - Why we chose
constructor-based DI
- [ADR-002: Documentation as Code](docs/adr/002-documentation-as-code.md) - Living
documentation approach

## Next Steps
## License
This project is licensed under the MIT License - see [LICENSE.md](LICENSE.md) for
details.

## Author
Yesin Qasem
