const { User, Product, Order, Transaction } = require("../../models");

// Add Transaction
exports.addTransaction = async (req, res) => {
    try {
        const data = {
            id_Order: req.body.id_Order,
            id_User: req.user.id,
            id_Product: req.body.id_Product,
            total_amount_transaction:req.body.total_amount_transaction,
        }
       const newTransaction= await Transaction.create(data);
        let transactionData = await Transaction.findOne({
            where: {
                id:newTransaction.id,
            },
            attributes: {
                exclude: ["updatedAt"]
            },
            include: [
                {
                    model: Order,
                     as: 'Orders',
                      attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
                {
                    model: User,
                    as: 'Users',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'status'],
                    },
                },
                {
                    model: Product,
                   as: 'Products',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
            ],
        });
      transactionData = JSON.parse(JSON.stringify(transactionData));
       const totalAmount = {
          total_amount_transaction:transactionData.Orders.order_Qty * transactionData.Products.price
      }
      await Transaction.update(totalAmount, {
        where: {
          id: transactionData.id
        }
      });
      
      const updateProduct = await Product.findOne({
        where: {
            id: transactionData.id_Product
          }   
        });
      if (updateProduct) {
         const updateQty = {
          qty: updateProduct.qty - transactionData.Orders.order_Qty,
        }
        await Product.update(updateQty, {
          where: {
            id: transactionData.id_Product
          }
        });
      }
       const updateOrder = await Order.findOne({
          id: transactionData.id_Order,
        });
      if (updateOrder) {
        const updateStatus = {
          status: "Success"
        }
        await Order.update(updateStatus, {
          where: {
            id: transactionData.id_Order
          }
        }); 
      }
        res.send({
            status: "success",
          message: "add transaction finished",
            data:transactionData,
        });
    } catch (error) {
        res.send({
            status: "failed",
            message:"server error"
       }) 
    }
};
// Show All Transaction
exports.getTransactions = async (req, res) => {
    try {
        let transactionData = await Transaction.findAll({
          include: [
                {
                    model: Order,
                    as: 'Orders',
                      attributes: {
                        exclude: ['createdAt', 'updatedAt','id_User',"id","id_Product","order_Qty"],
                    },
                },
            {
              model: User,
              as: 'Users',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password', 'status', "email","id"],
                    },
                },
                {
                    model: Product,
                  as: 'Products',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt',"image","price","id","id_User"],
                    },
                },
            ],
      attributes: {
        exclude: [ 'updatedAt', 'id_User',"id_Order","id_Product"],
      },
    });

    transactionData = JSON.parse(JSON.stringify(transactionData));

    transactionData = transactionData.map((item) => {
      return {
        ...item,
      };
    });

    res.send({
      status: 'Success',
      message: 'Product Data Found',
      data: transactionData,
    });
    } catch (error) {
        res.send({
            status: "failed",
            message:"server error",
       }) 
    }
}