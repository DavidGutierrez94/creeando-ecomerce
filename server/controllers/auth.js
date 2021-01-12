const User = require("../models/user");
const Brand = require("../models/brand");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  );
  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    console.log("USER CREATED", newUser);
    res.json(newUser);
  }
};

exports.createOrUpdateBrand = async (req, res) => {
  const {
    repName,
    email,
    categories,
    subs,
    repId,
    phone,
    brandName,
    description,
    address,
    logo,
    token,
  } = req.brand;


  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  );
  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      logo,
      role,
    }).save();
    console.log("USER CREATED", newUser);
    res.json(newUser);
  }

  const brand = await Brand.findOneAndUpdate(
    { email },
    { name: brandName, logo },
    { new: true }
  );
  if (brand) {
    console.log("BRAND UPDATED", Brand);
    res.json(Brand);
  } else {
    const newBrand = await new Brand({
      repName,
      email,
      repId,
      phone,
      brandName,
      description,
      address,
      logo,
      token,
    }).save();
    console.log("BRAND CREATED", newBrand);
    res.json(newBrand);
  }
};
exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
