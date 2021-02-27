
const {generatePaymentLink} = require("../service/wenjoy");
const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const coupon = require("../models/coupon");


exports.paymentLink = async (req, res) => {

    try {
        const { couponApplied } = req.body;

        // later apply coupon
        // later calculate price
      
        // 1 find user
        const user = await User.findOne({ email: req.user.email }).exec();
        // 2 get user cart total
        const { cartTotal, totalAfterDiscount } = await Cart.findOne({
          orderdBy: user._id,
        }).exec();
        // console.log("CART TOTAL", cartTotal, "AFTER DIS%", totalAfterDiscount);
      
        let finalAmount = 0;
      
        if (couponApplied && totalAfterDiscount) {
          finalAmount = totalAfterDiscount;
        } else {
          finalAmount = cartTotal;
        }
      const {header,body} = req
  
      const response = await generatePaymentLink(header.authtoken, body, finalAmount);
      res.json(response);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        err: err.message,
      });
    }
  };