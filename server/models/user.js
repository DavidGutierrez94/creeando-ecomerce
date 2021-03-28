const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    first_name: String,
    last_name: String,
    document_type: String,
    document_number: String,
    cellphone: String,

    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    city: String,
    ind: String,
    wishlist: [{ type: ObjectId, ref: "Product" }],
    brandId: { type: ObjectId, ref: "Brand" },
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
