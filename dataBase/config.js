import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_CONNECT_URL)
  .then(() => {
    console.log("connected with DataBase");
  })
  .catch((err) => {
    console.log(err);
  });
