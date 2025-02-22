import mongoose from "mongoose";
import { MONGO_URI } from "#/utils/variables";

mongoose.set("strictQuery", true);
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("DB is connected");
  })
  .catch((error) => {
    console.log("DB connection failed: " + error);
  });
