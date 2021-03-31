const Order = require("../models/order");
// const User = require("../models/user");
const nodemailer = require('nodemailer');


exports.orders = async (req, res) => {

  let allOrders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .exec();

  res.json(allOrders);
};

exports.orderStatus = async (req, res) => {
  // console.log(req.body);
  // return;
  const { orderId, orderStatus } = req.body;

  let updated = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();

  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_TP,
        pass: process.env.PASSWORD_TP
    }
});

let mailDetails = {
    from: process.env.EMAIL_TP,
    to: req.user.email,
    subject: 'Orden entregada',
    html: `Gracias ${res.user.name} por creer en Cree-Ando, tu órden ha sido entregada, valoramos mucho cualquier feedback que nos puedas otorgar dando click <a href="${process.env.FEEDBACK_LINK}">aquí</a>.`
};

mailTransporter.sendMail(mailDetails)

  res.json(updated);
};
