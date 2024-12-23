const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
/*const Listing = require("../models/Listing.js");*/ 

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}
/*
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
*/
const initDB =  async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ 
        ...obj, 
        owner: "66bd09b5339effcef060f84b",

    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};



initDB();