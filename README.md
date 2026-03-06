# Full Practices – JavaScript Backend & Algorithms

This repository contains small JavaScript exercises and backend architecture experiments.

The goal of this project is to practice:
- JavaScript fundamentals
- Clean architecture
- Domain Driven Design (DDD)
- Command Query Responsibility Segregation (CQRS)
- Behavior Driven Development (BDD) with Cucumber
- SQLite persistence

---

# 1️ FizzBuzz (Algorithm practice)

FizzBuzz is a classic programming exercise used to practice.

The goal is to iterate through a sequence of numbers and apply the following rules:

- If a number is divisible by 3, return "Fizz"
- If a number is divisible by 5 return "Buzz"
- If a number is divisible by both 3 and 5**, return "FizzBuzz"
- Otherwise, return the number itself

--------------------------------------------------------------

# 2️ Fleet Management Backend

This project also contains a small backend system that manages:

- fleet
- vehicles
- vehicle locations

The project follows DDD principles and uses CQRS commands.

Main features:

- Register a vehicle in a fleet
- Prevent duplicate vehicle registration
- Park a vehicle at a specific location

## Code Quality

To maintain a clean and maintainable codebase, several tools can be integrated into the project.

### ESLint

The project uses ESLint to enforce consistent coding standards and detect potential issues in the JavaScript codebase.  
ESLint helps identify common mistakes early and ensures that the code remains readable and maintainable across the project.

### Possible Improvements

Although not currently implemented, additional tools could further improve code quality.

#### SonarQube / SonarCloud

A tool such as SonarQube could be integrated to perform deeper static code analysis.  
This would help maintain high code quality as the project grows.

#### Test Coverage

Another improvement would be to measure test coverage using a tool like Jest.

Code coverage help understand which parts of the application are tested and which are not. This ensures that critical business logic is properly validated by automated tests.

Integrating coverage reports into a CI pipeline would allow automatic verification of test completeness.

### Continuous Integration (CI)

A CI pipeline (for example using Jenkins) could run the following steps automatically on each commit:

1 - Install dependencies.
2 - Run ESLint.
3 - Execute BDD tests (Cucumber).
4 - Generate coverage reports

### Docker & Deployment

To simplify deployment, the application could be containerized using Docker.

A Docker image could be automatically built during the CI pipeline (via Jenkins).  
This image would package the application and its runtime environment.
The image could then be deployed using Portainer, a Docker stack orchestrator.

Usage :
# Create fleet
node cli.js create-fleet user1
# Create vehicle
node cli.js create-vehicle fleet-1234 AA123BB
# Register vehicle
node cli.js register-vehicle fleet-1234 AA123BB
# Park vehicle
node cli.js localize-vehicle fleet-1234 AA123BB 48.8566 2.3522
