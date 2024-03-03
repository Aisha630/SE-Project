# Second Time Around

## Introduction

This project is a multi-vendor e-commerce platform designed to be minamalistic and LUMS-exclusive to seamlessly direct shopping and selling traffic from LUMS facebook pages to a dedicated space with the added functionality of donations and auctions.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (v4 or later)

### Set-up Instructions

1. Clone the repository: `git clone https://github.com/Aisha630/SE-Project.git`
2. Navigate to the `backend` directory
3. Install packages using `npm i`
4. Start the server by running `node app.js`
5. Navigate to the `frontend` directory
6. Install packages using `npm i`
7. Run `npm start` to open the website on your browser.

### Description of Directories and Files
#### Backend
- `app.js` - The main entry point for the application for initializing express app, connecting to db, and starting the server.
- `config.js` - Contains configuration settings like defining categories for products.
- `env.js` - Manages environment variables loaded from .env files. It's used to securely store API keys, database URLs, email app password, and port number.
- `models/` - Contains Joigoose/Mongoose models to define schemas for products, user, verification token etc.
- `controllers/` - Houses controller files that contain logic to handle requests and responses. 
- `routes/` - Defines the routes of out application.
- `middleware/` - Contains middleware functions such as authentication and file upload middleware, that are run for every request to our application.

#### Frontend

## Authors

- **Aysha**
- **Bilal**
- **Hadeed**
- **Hafsa**
- **Danish**
