# Node.js CRUD Project with Express.js, MongoDB, and Mongoose

This project is a basic CRUD (Create, Read, Update, Delete) application built using Node.js, Express.js, MongoDB, and Mongoose. It allows users to perform CRUD operations on a MongoDB database through a RESTful API.

## API Endpoints

- **Create a Todo:**
  - **POST** `/todos`
  - Request Body:
    ```json
    {
      "title": "Todo Name",
      "description": "Todo Description",
      "status": "active/inactive"
    }
    ```
- **Get All Items:**

  - **GET** `/todos`

- **Get a Single Item:**

  - **GET** `/todo/:id`

- **Update an Item:**

  - **PUT** `/todos/:id`
  - Request Body (fields to be updated):
    ```json
    {
      "title": "Todo Name",
      "description": "Todo Description",
      "status": "active/inactive"
    }
    ```

- **Delete an Item:**
  - **DELETE** `/todos/:id`

## Dependencies

- **Express.js**: Minimalist web framework for Node.js.
- **Mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **Nodemon (devDependency)**: Utility that automatically restarts the server when changes are made to the source code during development.

## Development

- **Start the server with nodemon:**

  ```bash
  npm run dev
  ```
