const Brand = require('../models/brand');

exports.list = async (req, res) =>
  res.json(await Brand.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  const {brandId} = req.body;
  let brand = await Brand.findOne({_id: req.params.brandId}).exec();
   res.json(brand);

};
