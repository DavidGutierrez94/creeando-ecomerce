const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const brandSchema = new mongoose.Schema(
  {
    repName: {
      type:String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    idUser:{
      type: ObjectId,
      ref: "User",
    },
    categories: [
      {
      type: ObjectId,
      ref: "Category",
    },
  ],
    subs: [
      {
        type: ObjectId,
        ref: "Sub",
      },
    ],
    repId: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    brandName: {
      type:String,
      required: true,
    },
    city: {
      type:String,
      required: true
    },
    description: {
      type:String,
      required: true,
    },
    address: {
      type:String,
      required: true,
    },
    logo:{
        type: Array,
        default: [],
        required:true,
    },
    products: {
      type: Array,
      default: [{ type: ObjectId, ref: "Product" }],
    },
    role: {
      type: String,
      default: "brand",
    },
    token:{
      type:String,
      enum: [
          "2qa67QwvqHfJWnNVDBLY",
          "FQjBjjhjk4xQmgwRwfVA",
          "V24MpMy7xhTJUj2EVeqj",
          "jwgCNDSq5g5yMfJfyjvA",
          "xcU2mmqDmLyTtnHxBDgD",
          "nWbsvnP9ZXq3qvaUqrsc",
          "uwAAxDqUA7MvNAZTJUDS",
          "nYPJu2qRD8vKUCxE9YvR",
          "XyGPDrEB6XrzkmK3RVSv",
          "aBFHeeXGQ5tx7cfrrZ5E",
          "6k4XhyNs4ACExJLshTCK",
          "xJVMCeSJ5JAWymTErc2K",
          "KDeasXj3FwQERB3J7pan",
          "2F3dSHdpNfGhjQXq2mN9",
          "Hvfx98adTzxDmdyQmEN8",
          "3ZUtrdrtgJf22LGw6XKC",
          "mFfuPah9kLa5XZePxXEU",
          "2tv6DcHBTHU88YkMQQbL",
          "aeBpX3YnErq5vtE7d8d9",
          "Ff23agBhQLyy9Fc7hWmL",
          "y8wT7VsUHeyxYCHzT5dn",
          "dfdBRHsTy4Qz9sEpdCf2",
          "kTzG6bR9PTSfenpfAkTn",
          "VEv8gfDb8JaUyFsKFz2k",
          "USyveNe5LJ8E7vwh85Yp",
          "y8Mz6CR8hMDSTKeyxK6M",
          "TbtFEpyY5QbxgtYJUK3b",
          "dRLvPcaz5t4USYF7s8Sa",
          "sgLQTSvaynLEqc97W2nC",
          "j3yhEVrwLU6yZmyXyA3T",
          "ejyeddLDw5v4ntG2mEwN",
          "RQcyTKRsXuZkuRxw7ASu",
          "qRYXC46t6ce8vBZZnRz3",
          "3QYpgTgT4GuZqWVZVPeM",
          "9NarFCX9JmEMkgDG8EV8",
          "EUgtk5MYSFh6KQvJhtda",
          "3gAcXv5ED7psdQvBLRHR",
          "8zQ5rPzZL3XejhAgPrcL",
          "u9vNggfxFTK9xnjbfASL",
          "EWBLRUU7d8X9hQ3Rcukq",
          "r3VyLdQk3zdHVVeXkNtR",
          "Gd4KznKvGqa5z7Z8SGzy",
          "45JwcMsGtmgaqSKfBUJ9",
          "cvKEgKbLWemRAAysbDcL",
          "p7xTepxRYKLGcn9VfESf",
          "fBMSgU8PkEse9hgEUxhj",
          "ePqq5SECxZ99Uhp86N65",
          "W3rER7wPHsESdDmfwZXz",
          "RrfRU5WeYjRC2FEHp44u",
          "yzCeTEdVN3qHV3qzWLTH",

      ],
    },

    //wishlist: [{ type: ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);