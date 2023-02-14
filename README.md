# Calculator

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

The purpose of this project is to build a basic calculator that can handle the basic arithmetic operations such as addition, subtraction, division, and multiplication. The calculator will be created using NestJS as the backend framework, React for the frontend, Nx Workspace as the development platform, and Jest for testing purposes.

## Technologies

Project is created with:

- NestJs - A progressive Node.js framework
- React
- Nx Workspace
- Jest

## Docker Compose

To run this project locally using docker compose

```
 download the sourcecode
$ cd calculator
$ docker compose up
```

Access the application by http://localhost:8080/ URL

## Setup

To run this project locally using npm:

```
 download the sourcecode
$ cd calculator
$ npm install
$ npm start
```

## Docker Setup

To build and run this project using docker:

```
 download the sourcecode
$ cd calculator
$ docker build -t 'api' -f "apps/api-app/Dockerfile.backend" .
$ docker run api -p 3333:3333

$ docker build -t 'frontend' -f "apps/frontend-app/Dockerfile.frontend" .
$ docker run -p 8080:8080 frontend
```
