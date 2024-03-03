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
-  `index.js` - The main entry point of the application. This file includes the root component and renders it to the DOM.
-  `App.js` - Acts as the root component from which all other page components are rendered.
-  `public/` - This directory contains static assets such as HTML files, images, and any other files that should be served directly by the web server. 
-  `src/` - The source directory where most of the application's code resides. It's the root for all the JavaScript and component files that make up the application.
-  `src/components/` - Contains reusable UI components. 
-  `src/pages/` - Stores the components that represent entire pages in the application. These components often use many of the smaller components defined in src/components/
-  `src/context/` - Contains context definitions. Context provides a way to pass data through the component tree without having to pass props down manually at every level.
-  `src/themes/` - This folder contains theming information, such as color schemes, font settings, and any other design tokens that help maintain visual consistency across the app.
-  `src/css/` - Contains Cascading Style Sheets (CSS) files for styling the application. 
-  `src/hooks/` - This directory includes custom React hooks that encapsulate reusable logic.
-  `src/stores/` - Files for Redux store configuration for global state management.

## Authors

- **Aysha**
- **Bilal**
- **Hadeed**
- **Hafsa**
- **Danish**
