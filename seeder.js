const { Video } = require("./models/video");
const { Product } = require("./models/product");
const { Comment } = require("./models/comment");

const mongoose = require("mongoose");

require("./config/db");
require('dotenv').config();
//create your array. i inserted only 1 object here
const videos =    
  new Video({
    "title": "Video_default",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "url": "https://www.youtube.com/watch?v=xylvxZFCedc&ab_channel=GoToImpactFoundation%28previouslyYABB%29",
    "thumbnailUrl": "google.com"
  })


const products = 
  new Product({
      "title": "GoPay",
      "description": "Super App",
      "url": "gopay.co.id",
      "price": 25000000  
  })

const comments = 
  new Comment({
    "username": "user1",
    "post": "Video ini sangat inspiratif dan menarik!!!"
  })

//save your data. this is an async operation
//after you make sure you seeded all the models, disconnect automatically
async function seed() {
  await videos.save()
    .then(async function(saved_video) {
      await products.save()
        .then(async function(saved_product) {
          await comments.save()
            .then(async function(saved_comment) {
              await Video.updateOne(
                {_id: saved_video.id},
                {
                  $push: { 
                    products: new mongoose.Types.ObjectId(saved_product.id),
                    comments: new mongoose.Types.ObjectId(saved_comment.id),
                  } 
                }
              )
              console.log("DONE!");
              mongoose.disconnect();
            })
        })
  });
}

seed()
