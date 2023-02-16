# Calculator

## Table of contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Local Setup](#local-setup)
- [Docker Compose](#docker-compose)

## Overview

The purpose of this project is to build a basic calculator that can handle the basic arithmetic operations such as addition, subtraction, division, and multiplication. The calculator will be created using NestJS as the backend framework, React for the frontend, Nx Workspace as the development platform, and Jest for testing purposes.

## Technologies

This project is created with the following technologies:

- NestJs - A progressive Node.js framework
- React
- Nx Workspace
- Jest

## Local Setup

To run this project locally using npm, follow these steps:

1. Download the source code.
2. Open a terminal and navigate to the "calculator" directory.
3. Run `npm install` to install the project dependencies.
4. Run `npm start` to start the project.

```
$ git clone git@github.com:Bharath19/calculator.git
$ cd calculator
$ npm install
$ npm start
```

5. Access the application by visiting http://localhost:4200 in your web browser.
6. To lint the project, run `npm run lint`.
7. To run the tests for this project, run `npm run test`.

## Docker Compose

To build and run this project using docker:

1. Download the source code
2. Navigate to the `calculator` directory
3. Run `docker compose up` to start the project.

```
$ git clone git@github.com:Bharath19/calculator.git
$ cd calculator
$ docker compose up
```

4. Access the application by going to http://localhost:8080/ in your web browser.

## Docker Setup

1. Download the source code.
2. Open a terminal and navigate to the "calculator" directory.
3. Run `docker build -t 'api' -f "apps/api-app/Dockerfile.backend" .` to build the backend image.
4. Run `docker run api -p 3333:3333` to start the backend container.
5. Run `docker build -t 'frontend' -f "apps/frontend-app/Dockerfile.frontend" .` to build the frontend image.
6. Run `docker run -p 8080:8080` frontend to start the frontend container.

```
$ git clone git@github.com:Bharath19/calculator.git
$ cd calculator

$ docker build -t 'api' -f "apps/api-app/Dockerfile.backend" .
$ docker run api -p 3333:3333

$ docker build -t 'frontend' -f "apps/frontend-app/Dockerfile.frontend" .
$ docker run -p 8080:8080 frontend
```

7. Access the application by visiting http://localhost:8080 in your web browser.
