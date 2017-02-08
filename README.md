Duck frontend
=============

Frontend for the Vincit [Duck backend](https://github.com/jaakkoyl/duck-be).

Basically this just uses the server.js and parts of the README from it.

## Requirements

Requires [Node.js](https://nodejs.org/) installed with npm. [Git](https://git-scm.com/) is used for cloning repository.

Tested with Node.js version 6.0.0 and npm v3.8.6.

## Install

```
$ git clone https://github.com/4llu/duck-fe.git
$ cd duck-fe
$ npm install
```

## Developing
Compile Sass with
```
$ gulp sass
```
or optionally compile Sass after each change to styles with just
```
$ gulp
```

## Run

To start server run

```
$ npm start
```

or if you want to run server in some other port than default 8081

```
$ PORT=<port> node server.js
```

where you should replace `<port>` with wanted port number i.e. 3000.
