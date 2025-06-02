# Recommendation Service API

## Overview

The **Recommendation Service API** is a backend application designed to provide personalized product recommendations for users in an e-commerce-like scenario. It combines **collaborative filtering** (based on user ratings) and **content-based filtering** (based on user preferences and product tags/categories) to generate tailored recommendations.

## Features

- **Personalized Recommendations**: Generates product recommendations for users using a hybrid approach:
  - Collaborative filtering via cosine similarity of user ratings.
  - Content-based filtering based on matching user preferences with product tags and categories.
  - Fallback to popular products for sparse data scenarios.
- **RESTful API Endpoint**:
  - `GET /api/recommendations/:userId`: Returns recommended products for a given user.
- **Realistic Data**: Mock data simulates an e-commerce platform with detailed user profiles (ratings, preferences, purchase history) and products (price, tags, stock, etc.).
- **Error Handling**: Centralized error handling middleware ensures consistent error responses.
- **Unit Testing**: Comprehensive tests for the recommendation logic and error handling using Jest.
- **Type Safety**: Built with TypeScript for robust type checking and maintainability.

## Technology Stack

- **Node.js**: Runtime environment for running the server.
- **Express.js**: Web framework for building the RESTful API.
- **TypeScript**: Adds static typing for improved code quality and developer experience.
- **Jest**: Testing framework for unit tests.
- **Supertest**: Used for testing API endpoints.
- **ESLint & Prettier** (optional, but recommended): For code linting and formatting.
- **NPM**: Package manager for dependencies.

## Project Structure

```
recommendation-service/
├── src/
│   ├── data/
│   │   └── mock-data.ts                    # Mock data for users and products
│   ├── models/
│   │   └── index.ts                        # TypeScript interfaces for User and Product
│   ├── routes/
│   │   └── recommendation-routes.ts        # API routes for recommendations, ratings, and products
│   ├── services/
│   │   └── recommendation-service.ts       # Recommendation logic (collaborative and content-based)
│   ├── tests/
│   │   ├── recommendation-service.test.ts  # Unit tests for RecommendationService
│   │   ├── error-handler.test.ts           # Unit tests for error handling middleware
│   │   └── recommendation-routes.test.ts   # Tests for API endpoints
│   ├── middleware/
│   │   └── errorHandler.ts                 # Centralized error handling middleware
│   └── app.ts                              # Main application entry point
├── requests.http                           # HTTP requests for testing API endpoints
├── jest.config.js                          # Jest configuration for testing
├── package.json                            # Project dependencies and scripts
├── tsconfig.json                           # TypeScript configuration
└── README.md                               # Project documentation
```

## Setup and Installation

### Prerequisites

- **Node.js**: Version 18.x or higher.
- **NPM**: Version 8.x or higher.
- **Git**: For cloning the repository.

### Installation Steps

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd recommendation-service
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Build the Project**:
   Compile TypeScript to JavaScript:

   ```bash
   npm run build
   ```

4. **Start the Server**:
   Run the application:
   ```bash
   npm start
   ```
   The server will start on `http://localhost:3000`.

### Environment Variables

The application uses a default port (`3000`) but can be configured via environment variables. Create a `.env` file if needed:

```env
PORT=3000
```

## Usage

### API Endpoint

- **GET /api/recommendations/:userId**

  - **Description**: Retrieves personalized product recommendations for a user.
  - **Parameters**:
    - `userId` (path, string): ID of the user (e.g., '1' for Ana).
  - **Example Request**:
    ```http
    GET http://localhost:3000/api/recommendations/1
    ```
  - **Example Response** (200 OK):
    ```json
    [
      {
        "id": "5",
        "name": "Smartphone Ultra 12",
        "category": "electronics",
        "price": 5999.0,
        "description": "Smartphone com câmera de 108MP e 5G.",
        "tags": ["smartphone", "5g", "camera", "electronics"],
        "stock": 15
      }
    ]
    ```
  - **Error Response** (400 Bad Request):

    ```json
    {
      "error": {
        "message": "User not found",
        "status": 400
      }
    }
    ```

- **GET /api/products**
  - **Description**: Lists all available products.
  - **Example Request**:
    ```http
    GET http://localhost:3000/api/products
    ```
  - **Example Response** (200 OK):
    ```json
    [
      {
        "id": "1",
        "name": "Laptop Gamer XPro",
        "category": "electronics",
        "price": 4999.99,
        "description": "Laptop com processador i7, 16GB RAM, e GPU RTX 3060.",
        "tags": ["gaming", "laptop", "high-performance", "electronics"],
        "stock": 10
      },
      ...
    ]
    ```

### Testing the API

A `request.http` file is provided for testing endpoints using tools like the VS Code REST Client extension. Example:

```http
GET http://localhost:3000/api/recommendations/1
Content-Type: application/json
```

### Running Tests

Unit tests are implemented using Jest to cover the recommendation logic, error handling, and API endpoints.

1. Run all tests:
   ```bash
   npm test
   ```
2. Run tests with coverage:
   ```bash
   npm test -- --coverage
   ```
   Coverage reports are generated in the `coverage/` directory.

## Testing

The project includes unit tests for:

- **RecommendationService**: Verifies that recommendations are generated correctly and align with user preferences or categories.
- **errorHandler**: Ensures consistent error formatting for various scenarios.
- **API Endpoints**: Tests endpoint responses using Supertest.

### Example Test Output

```bash
PASS  src/tests/recommendation-service.test.ts
PASS  src/tests/error-handler.test.ts
PASS  src/tests/recommendation-routes.test.ts
Test Suites: 3 passed, 3 total
Tests:       6 passed, 6 total
```

## Future Improvements

- **Database Integration**: Replace mock data with a database (e.g., SQLite, MongoDB) for scalability.
- **Advanced Recommendation Algorithms**: Implement matrix factorization or machine learning models (e.g., using TensorFlow.js).
- **Data Generation**: Use `faker.js` to generate larger, dynamic datasets for testing scalability.
- **Input Validation**: Add `express-validator` for robust input validation on the `/ratings` endpoint.
- **Authentication**: Integrate JWT or OAuth for secure user access.
- **API Documentation**: Reintroduce Swagger/OpenAPI for interactive documentation if needed.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License.
