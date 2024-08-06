const mongoose = require("mongoose");

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected");
    } catch (error) {
        console.error("DB connection Error:", error.message); // Log the error message
    }
}


module.exports = db; // Export the function directly
