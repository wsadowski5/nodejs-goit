const app = require("./app");

const mongoose = require("mongoose");
const DB_URL = "mongodb+srv://wsadowski5:konik12qw@cluster0.wmoty6x.mongodb.net/db-contacts"

const dbConnection = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Database connection successful");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
dbConnection();


app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
