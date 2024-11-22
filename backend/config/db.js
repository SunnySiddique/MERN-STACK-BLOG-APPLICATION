const { default: mongoose } = require("mongoose");

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");
  } catch (error) {
    process.exit(1);
  }
};

module.exports = connectionDB;
