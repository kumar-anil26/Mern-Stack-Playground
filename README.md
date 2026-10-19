<<<<<<< HEAD
# mern_playground
My personal workspace for MERN stack practice and code snippets.
<br/>
<h1>This is made by Anil </h1>
=======
# Mern-Stack-Playground
This is my personal MERN STACK DEVELOPMENT Playground
# MERN Backend API — Product Management & Authentication

A backend application built with **Node.js, Express.js, and MongoDB** that demonstrates RESTful API development, CRUD operations, secure authentication, role-based authorization, data validation, and automated testing.

The project follows a modular architecture with separate controllers, services, models, routes, utilities, and configuration files to keep the code organized, maintainable, and scalable.

## Features

- **RESTful API:** Build and manage APIs using Express.js and Express Router.
- **Product CRUD Operations:** Create, read, update, and delete products.
- **Authentication:** Secure user authentication using JSON Web Tokens (JWT).
- **Access & Refresh Tokens:** Use access tokens for API authentication and refresh tokens to obtain new access tokens.
- **Password Hashing:** Protect user passwords using bcrypt instead of storing plain-text passwords.
- **Role-Based Authorization:** Restrict access to specific operations based on user roles.
- **Data Validation:** Validate incoming data using Zod to improve data consistency and handle invalid requests.
- **Email Verification:** Verify registered email addresses by sending verification links through Nodemailer.
- **Secure Verification Links:** Generate cryptographically secure verification tokens using Node.js's `crypto` module.
- **Automated Testing:** Test API endpoints and application behavior using Vitest and Supertest.
- **Modular Architecture:** Separate application logic into controllers, services, models, routes, utilities, and configuration files.
- **Environment Configuration:** Use environment variables for application settings and sensitive credentials.

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework and API routing |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling |
| Zod | Request data validation |
| bcrypt | Password hashing |
| JSON Web Token (JWT) | Token-based authentication |
| Nodemailer | Sending verification emails |
| Node.js `crypto` | Generating secure verification tokens |
| Vitest | Test runner and assertions |
| Supertest | HTTP API testing |

## Project Architecture

The application uses a modular structure to separate responsibilities and make the code easier to understand, test, and maintain.

```text
project/
├── src/
│   ├── config/          # Database and application configuration
│   ├── controllers/     # Handle requests and responses
│   ├── services/        # Business logic
│   ├── models/          # Database schemas and models
│   ├── routes/          # API route definitions
│   ├── middlewares/     # Authentication, authorization, validation
│   ├── schemas/      # Zod validation schemas
│   ├── utils/           # Reusable helper functions
│   ├── tests/           # Automated tests
│   ├── app.js           # Express application setup
│   └── server.js        # Start the server
├── .env.example         # Example environment variables
├── .gitignore
├── package.json
└── README.md
```
*Note: This is an example structure. Adjust the folders and filenames to match the actual project.*

## Authentication & Authorization

The application implements authentication and authorization to protect API endpoints and control access to resources.

### Authentication

Authentication verifies the identity of a user.

- Passwords are hashed using bcrypt before being stored.
- JWT access tokens are used to authenticate requests to protected endpoints.
- Refresh tokens support obtaining new access tokens according to the application's token lifecycle.
- Authentication middleware verifies tokens before allowing access to protected routes.

### Role-Based Authorization

Authorization determines what an authenticated user is allowed to do.

- Users must have the required role to access restricted endpoints.
- Authorization middleware checks user permissions before executing protected operations.
- This helps prevent unauthorized users from performing restricted actions.

### Email Verification

The application includes an email verification workflow for newly registered users.

1. A user registers with an email address and password.
2. The password is hashed using bcrypt.
3. A secure verification token is generated using Node.js `crypto`.
4. Nodemailer sends a verification link to the registered email address.
5. The user opens the link to verify their email address.
6. The backend validates the verification token and updates the user's verification status.

This workflow helps confirm ownership of an email address before enabling any features that require a verified account.

## Product CRUD Operations

The product API demonstrates the four fundamental CRUD operations:

| Operation | HTTP Method | Description |
|---|---|---|
| Create | POST | Add a new product |
| Read | GET | Retrieve one or more products |
| Update | PATCH or PUT | Modify an existing product |
| Delete | DELETE | Remove a product |

The exact endpoints depend on the application's route configuration.

## Data Validation with Zod

Zod is used to validate incoming request data against defined schemas.

Validation helps ensure that:

- Required fields are provided.
- Values have the expected data types.
- Invalid input is rejected before business logic runs.
- Validation errors can be returned in a consistent response format.

This improves API reliability and reduces unexpected errors caused by invalid input.

## Testing with Vitest and Supertest

Automated testing helps verify that the backend behaves as expected.

- **Vitest:** Runs tests and provides assertions for checking application behavior.
- **Supertest:** Sends HTTP requests to the Express application and checks API responses.

Tests can cover successful requests, validation failures, authentication requirements, authorization rules, and error handling.

## Getting Started

### Prerequisites

Install the following before running the application:

- Node.js
- npm
- MongoDB, either locally or through MongoDB Atlas
- Git

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

Replace the placeholders with your actual repository URL and project folder name.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and configure the variables required by your application.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
EMAIL_HOST=your_smtp_host
EMAIL_PORT=your_smtp_port
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password_or_app_password
CLIENT_URL=http://localhost:3000
```

The variable names above are examples. Use the exact names expected by your code.

**Security:** Never commit your `.env` file, real passwords, database credentials, or JWT secrets to GitHub. Keep `.env` in `.gitignore` and provide safe placeholder values in `.env.example`.

### 4. Start the application

Use the development or start command defined in your `package.json`. For example:

```bash
npm run dev
```

Or, if your project uses a start script:

```bash
npm start
```

### 5. Run tests

If your `package.json` defines a test script, run:

```bash
npm test
```

Check `package.json` for the exact available scripts.

## API Testing

You can test the endpoints using tools such as Postman, Insomnia, or automated tests written with Supertest.

Test scenarios may include:

- User registration and login.
- Email verification.
- Access token validation and refresh.
- Access to protected routes.
- Role-based permissions.
- Product creation, retrieval, updating, and deletion.
- Invalid request data and error responses.

## Learning Objectives

This project demonstrates practical backend development concepts, including:

- Designing RESTful APIs.
- Organizing a backend using modular architecture.
- Implementing authentication and role-based authorization.
- Handling passwords and token-based authentication securely.
- Validating request data using Zod.
- Implementing email verification.
- Writing automated API tests.
- Separating business logic from HTTP request handling.
- Managing configuration through environment variables.

## Future Improvements

Possible improvements include:

- API documentation with Swagger or OpenAPI.
- Pagination, filtering, and sorting for product endpoints.
- Centralized error handling and structured logging.
- Rate limiting for authentication endpoints.
- Improved test coverage and continuous integration.
- Token revocation and refresh-token rotation, if not already implemented.

## Author

**Anil Ray**

---

*This project is intended for learning and demonstrating backend development practices using the MERN ecosystem.*

