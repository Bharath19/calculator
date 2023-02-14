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

## Setup

To run this project locally using npm:

```
 download the sourcecode
$ cd calculator
$ npm install
$ npm start
```

## Docker Setup

To run this project using docker:

```
 download the sourcecode
$ cd calculator
$ docker build -t 'api' -f "apps/api-app/Dockerfile.backend" .
$ docker run api -p 3333:3333
```
