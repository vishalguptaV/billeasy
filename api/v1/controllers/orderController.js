const Order = require('../models/order');
const User = require('../models/user');

exports.createOrder = async (req, res) => {
  try {

   
    const user = await User.findById(req.id);

    console.log(user)
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

   
   let orderDetails= await Order.create({ userId:user._id, totalAmount:req.body.totalAmount });

   console.log(orderDetails)
    user.orders.push(orderDetails._id);
    await user.save();

    res.status(201).send({
      success:true,
      message:"Order Created Successfully"
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllOrdersForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { totalAmount } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { totalAmount },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    await Order.findByIdAndDelete(orderId);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.getTotalRevenue = async (req, res) => {   
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' },
        },
      },
    ]);

    const totalRevenue = result.length ? result[0].totalRevenue : 0;
    res.json({ totalRevenue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};