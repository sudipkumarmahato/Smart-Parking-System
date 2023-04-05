const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

let port = process.env.PORT;
const db = process.env.MONGO_URI;


if (port == null || port == "") {
    port = process.env.DEFAULT_PORT;
}
mongoose.set('strictQuery', true);

exports.connectDB = () => {
    mongoose
        .connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('Database Connected Sucessfully');
        })
        .catch((error) => {
            console.log('Database Connection failed. Try Again !!');
            console.error(error);
            process.exit(1);
        });
};