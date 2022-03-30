const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 8000;

// import library passport yang sudah dibuat
const passport = require('./src/lib/passport');

// gunakan middleware json untuk membaca request body bertipe json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// gunakan library passport yang telah dibuat
app.use(passport.initialize());


const router = require('./src/routers');
app.use(router);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
