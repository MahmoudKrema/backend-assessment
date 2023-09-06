# Backend Assessment

This project is an uptime monitoring RESTful API server that allows authenticated users to monitor URLs and obtain detailed uptime reports about their availability, average response time, and total uptime/downtime.

## Overview

The API server provides the following features:

- User signup with email verification.
- CRUD operations for URL checks, where GET, PUT, and DELETE requests can only be made by the user who created the check.
- Notifications for authenticated users whenever one of their URLs goes down or up again, through email and an optional webhook.
- Detailed uptime reports for authenticated users, including URL availability, average response time, and total uptime/downtime.
- Grouping of checks by tags, enabling users to obtain reports by tag.

## Project Setup

To set up the project, follow these steps:

1. Clone the repository.
2. Install the dependencies listed in the `package.json` file using `npm install`.
3. Configure the environment variables in a `.env` file. and the project will not work properly if no email, email app password and email service are added.
4. Start the server using `npm start`.
5. After signing up, you need to verify the user from the mail that is sent to his email
6. Sign in and copy the token and use it with the routes that need it
7. Now you can add checks and use the API endpoints

## Dependencies

The project utilizes the following dependencies:

- axios: ^1.5.0
- babel-register: ^6.26.0
- bcryptjs: ^2.4.3
- cors: ^2.8.5
- cron: ^2.4.3
- dotenv: ^16.3.1
- express: ^4.18.2
- express-validator: ^7.0.1
- jsonwebtoken: ^9.0.2
- mongoose: ^7.5.0
- mysql2: ^3.6.0
- node-cron: ^3.0.2
- nodemailer: ^6.9.4
- nodemon: ^3.0.1
- sequelize: ^6.32.1

## Incomplete Features

Due to time constraints (4 Days), the following were not implemented in this version of the project:

- **Unit Testing**
- **Refactoring**
- **Error Handling**: need to work more on error handling


## API Documentation Link

- https://documenter.getpostman.com/view/19926442/2s9YBz1ZvY#54df8f4e-14d1-4807-b6df-1f2e9a770a98

## Conclusion

This project aims to provide a robust and scalable uptime monitoring RESTful API server. It offers authentication, URL check management, notifications, detailed reports.