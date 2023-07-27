require("./config/db");
require('dotenv').config();
const express = require("express");

const app = express();

app.use(express.json());

// fix CORS
app.use((req, res, next) => {
  res.setHeader('Acces-Control-Allow-Origin', '*');
  res.setHeader('Acces-Control-Allow-Methods', '*');
  res.setHeader('Acces-Control-Allow-Headers', '*');
  next();
});

// import router
const videoRoutes = require('./routes/video')
const commentRoutes = require('./routes/comment')
const productRoutes = require('./routes/product')

// redirect /api to router
app.use('/api', videoRoutes, commentRoutes, productRoutes);

app.get("/", async (req, res) => {
  return res.json({ message: "Hello, World ✌️" });
});

const start = async () => {
  try {
    app.listen(process.env.PORT || 3000, () => console.log(`Server started on port ${process.env.PORT || 3000}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();