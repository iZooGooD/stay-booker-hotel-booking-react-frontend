# Stay Booker Pro

Stay Booker Pro is a production-ready hotel booking website built with modern web technologies. It is designed to be a fully functional and responsive web application for hotel booking services.

## Key Features

- **Production-Ready**: Crafted with production requirements in mind.
- **Modern Tech Stack**: Built using React, Tailwind CSS, MirageJS for mocking APIs, and Cypress for end-to-end testing.
- **Skeleton Loading**: Implements skeleton screens for an enhanced user experience during data loading.
- **Responsive Design**: Fully responsive interface built purely with Tailwind CSS.
- **Comprehensive Test Coverage**: Extensive test cases using Cypress to cover every functionality, ensuring robust and reliable code.
- **Future Backend Integration**: Planned integration with a backend built using Express.js.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm or yarn

### Installing

1. Clone the repository:

   ```bash
   git clone https://github.com/iZooGooD/stay-booker-pro.git
   ```

2. Navigate to the project directory:

   ```bash
   cd stay-booker-pro
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

The application should now be running on [http://localhost:3000](http://localhost:3000).

## Running the Tests

To ensure the reliability and stability of the application, comprehensive test suites have been written using Cypress.

To run the tests:

```bash
npm test
# or
npx cypress open
```

This command will open the Cypress test runner, where you can execute specific tests or the entire test suite.

## Code Quality and Workflow

### Husky for Pre-Commit Hooks

Stay Booker Pro uses Husky to manage pre-commit hooks, ensuring that code quality and formatting standards are maintained. Before each commit, Husky runs various checks to make sure that the committed code adheres to defined standards.

### GitHub Workflow

The project is equipped with a GitHub Actions workflow to automate the testing, building, and code quality checks. The workflow consists of three primary jobs:

1. **Build**: Ensures that the application builds correctly on each push and pull request to the `master` branch.

2. **Code Quality - Prettier**: Checks code formatting using Prettier. This step helps maintain a consistent coding style and format across the project.

3. **Run Tests**: Executes the test suites to ensure all tests pass. This step is crucial for identifying issues early and maintaining the reliability of the application.

#### Workflow Details

- **Trigger**: The workflow is triggered on push and pull requests to the `master` branch.
- **Environment**: Runs on the latest Ubuntu environment.
- **Node.js Version**: Uses Node.js version 18.x.
- **Caching**: Caches node modules for faster build and test execution.
- **Steps**:
  - Checks out the code.
  - Caches dependencies based on the `package-lock.json` file.
  - Installs dependencies using `npm ci` for a clean, reproducible build.
  - In the Code Quality job, runs Prettier to check code formatting.
  - In the Test job, runs the test suite using `npm test`.

### Continuous Integration and Code Quality

This automated workflow ensures that each change to the codebase is built, tested, and checked for code quality, thereby maintaining the overall health and reliability of the application. It encourages a culture of continuous integration and frequent, reliable delivery of high-quality software.

## Contributing

We welcome contributions to Stay Booker Pro! If you have suggestions or would like to contribute code, please feel free to create issues or submit pull requests.

## Future Scope

- Backend integration with Express.js for a complete full-stack experience.
- Additional features and improvements to the booking process.

