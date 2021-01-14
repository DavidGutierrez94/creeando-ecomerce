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
  } = req.body;
  const searchUser= {
    name: email.split("@")[0]
  }


  const user = await User.findOneAndUpdate(
    { email },
    searchUser,
    { new: true }
  );
  let newUser= user;
  if (user) {
    console.log("USER UPDATED", user);
  } else {
    newUser = await new User({
      email,
      name: email.split("@")[0],
      logo,
      role: 'brand',
    }).save();
    console.log("USER CREATED", newUser);
  }
  const searchBrand = {
    name: brandName
  }
  if(logo){
    searchBrand.logo = logo
  }
  const brand = await Brand.findOneAndUpdate(
    { email },
    searchBrand,
    { new: true }
  );
  let newBrand = brand;
  if (brand) {
    console.log("BRAND UPDATED", Brand);
    res.json(Brand);
  } else {
    newBrand = await new Brand({
      repName,
      idUser: newUser._id,
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
  await newUser.update({brandId: newBrand._id});
};
exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
