import mongoose, { mongo } from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      require: true,
      unique: true,
    },
    alias: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
);

const Url = mongoose.model("Url", urlSchema);

export default Url;
