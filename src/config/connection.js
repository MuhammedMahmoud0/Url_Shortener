import mongoose from "mongoose";

mongoose.set("debug", true);
const connectDB = async () => {
  await mongoose.connect(process.env.DATABASE_URI).then((conn) => {
    console.log(`DB Connected: ${conn.connection.host}`);
  });
  // .catch((err) => {
  //   console.error(err);
  //   process.exit(0);
  // });
};

const disconnectDB = async () => {
  await mongoose.disconnect().then(() => {
    console.log("Database disconnected successfully");
  });
};

export { connectDB, disconnectDB };
