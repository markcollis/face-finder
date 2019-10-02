## Face-finder

# Introduction

Face-finder is a simple application that enables users to upload a picture, or enter a URL for a picture, and then detect any faces that are visible. Users must register and the app keeps track of how many pictures they have analysed.

Face recognition is carried out in the browser, using [face-api.js](https://github.com/justadudewhohacks/face-api.js). There is a simple back-end which manages user registration and also provides a CORS proxy that is used automatically if a URL fails to load an image due to CORS restrictions.

# History

This app is based on SmartBrain from Andrei Neagoie's [Complete Web Developer](https://www.udemy.com/the-complete-web-developer-zero-to-mastery) Udemy course. However, this relies on a commercial API for the face recognition. I decided that it would be more interesting to investigate an [open source face recognition library](https://github.com/justadudewhohacks/face-api.js) with a wider range of analysis options.

# Usage

Install dependencies:
```
yarn install
```
Configure a PostgreSQL or MySQL database with two tables:
```
login (
    id integer NOT NULL,
    hash character varying(100) NOT NULL,
    email text NOT NULL
);
users (
    id integer NOT NULL,
    name character varying(100),
    email text NOT NULL,
    entries bigint DEFAULT 0,
    joined timestamp without time zone NOT NULL
);
```
Create a file server/.env populated with the following:
```
CORS_PROXY_HOST="xxx" (default "127.0.0.1")
CORS_PROXY_PORT=n (default 8080)
API_PORT=n (default 3001)
DB_TYPE="xxx" (default "pg")
DB_HOST="xxx" (default "127.0.0.1")
DB_NAME="xxx" (default "face-finder")
DB_USER="xxx"
DB_PW="xxx"
```

Finally start first the server, then the front end:
```
yarn start-server
yarn start
```
