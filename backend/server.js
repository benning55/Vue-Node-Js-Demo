const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var bcrypt = require("bcryptjs");

const app = express();

var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//**  Database Section **//
const db = require("./models");
const { mongoose } = require("./models");
const User = db.user
const Beef = db.beef
const Cut = db.cut

db.mongoose
  .connect(`mongodb://benning:benning55@mongodb:27017/main_db?authSource=admin`, {
    userNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.")
    initial();
  })
  .catch(err => {
    console.log("Connection error", err)
    process.exit()
  })

// Add 1 user if User collection is empty
async function initial() {
    try {
      let userCount = await User.estimatedDocumentCount();
      let cutCount = await Cut.estimatedDocumentCount()
      let beefCount = await Beef.estimatedDocumentCount()
  
      if (userCount === 0) {
        try {
          var user = await new User({
            email: "admin@dg.com",
            password: bcrypt.hashSync("12345678", 8),
            name: "P'Benning",
            image:
              "https://res.cloudinary.com/dmtmyh1hg/image/upload/v1611223674/marvel/iron_man_artwork_4k-wide_eksmfh.jpg",
          }).save();

          console.log("Added User to collections");
        } catch (err) {
          console.log(err);
        }
      }

      if (cutCount === 0 && beefCount === 0) {
        try {
          let cut1 = await new Cut({
            name: "Loin",
            cook: ["grilled", "fried"]
          }).save()

          let cut2 = await new Cut({
            name: "Sirloin cuts",
            cook: ["grilled", "stir-fry"]
          }).save()

          let cut3 = await new Cut({
            name: "Rib cuts",
            cook: ["grilled", "fried"]
          }).save()

          let beef1 = await new Beef({
            name: "Tenderloin Filet",
            description: "These are usually leaner cuts of beef, best grilled or fried, and work better with high heat. It’s the T-Bone and Porterhouse Steaks, the Tenderloins, cuts of meat that respond better to dry heat cooking.",
            price: 345,
            cutId: mongoose.Types.ObjectId(cut1._id)
          }).save()

          let beef2 = await new Beef({
            name: "Sirloin Steak",
            description: "Filet mignon, bavette, tri-tips, strip steak and roasts - coming from the rear of the animal, these are also leaner cuts, and certainly not the best beef choice if you want to slow cook. The sirloin family is best for grilling, skillet and stir-fry, with high, dry heats.",
            price: 450,
            cutId: mongoose.Types.ObjectId(cut2._id)
          }).save()

          let beef3 = await new Beef({
            name: "Ribeye Steak",
            description: "Ribeye filet, ribeye cap, ribeye steak. These cuts are getting fattier, meaning some of them are better for slow cooking and roasting. Not all the cuts in the rib family work well with slow cooking methods: Ribeye steak, for example, will always kick better grilled or fried in a skillet.",
            price: 600,
            cutId: mongoose.Types.ObjectId(cut3._id)
          }).save()

          console.log("Added Cut, Beef to collections");
        } catch (err) {
          console.log(err);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

// Static Image File
app.use("/public", express.static(__dirname + "/public"));

// Declare Path Section
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Data Guardian api endpoint",
  });
});

require("./routes/index.routes")(app);
