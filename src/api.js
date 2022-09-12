const express = require('express');

const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const categoryRouter = require('./routers/categoryRouter');

const app = express();

app.use(express.json());

// Login route
app.use('/user', userRouter);
app.use('/login', authRouter);
app.use('/categories', categoryRouter);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
