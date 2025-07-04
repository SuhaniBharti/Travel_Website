


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    filename: {
      type: String,
      default: "default-image",
    },
    url: {
      type: String,
      default:
        "https://wallup.net/wp-content/uploads/2016/02/18/286966-nature-photography.jpg",
      set: (v) =>
        v === ""
          ? "https://wallup.net/wp-content/uploads/2016/02/18/286966-nature-photography.jpg"
          : v,
    },
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
