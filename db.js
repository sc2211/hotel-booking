const mongoose = require("mongoose");
require('dotenv').config();
dbConnect();
async function dbConnect() {
  try {
    await mongoose.connect(
      `mongodb+srv://1:1@cluster0.deklgfj.mongodb.net/`,
    
        
      { useNewUrlParser: true ,useUnifiedTopology: true }
    );
    console.log("MongoDb connected successfully");
  } catch (error) {
    console.log("MongoDb connection failed");
  }
}

module.exports = mongoose;
