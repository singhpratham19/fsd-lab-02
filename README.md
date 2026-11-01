# FSD Lab Assignment 2

Name: Pratham Singh  
PRN: 1032211384

- `problem-1`: Student registration form with external JavaScript validation
- `problem-2`: Dynamic web page using JavaScript, DOM and jQuery

## Problem 1: run with MySQL

Inside the `problem-1` folder, start MySQL and create the database (only needed once):

```bash
brew services run mysql
mysql -u root < database.sql
```

Install the packages and start the server:

```bash
npm install
npm start
```

Then open http://localhost:3001

The form validates in the browser and again on the server. Students are saved in the `students` table of MySQL with hashed passwords. Logging in creates a server session, stored in the browser with a cookie.

## Problem 2

Open `problem-2/index.html` in a browser. An internet connection is needed for jQuery and the fonts.

Photos in Problem 2 by Michael D Beckwith (CC0) and Carol M. Highsmith (public domain) on Wikimedia Commons.
