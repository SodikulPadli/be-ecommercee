const { Product, User, Order } = require("../../models");

exports.addOrder = async (req, res) => {
    try {
        const data = {
            id_User: req.user.id,
            id_Product: req.body.id_Product,
            order_Qty: 1,
            status:"Add Cart"
        };
        let orderExist = await Order.findOne({
            where: {
                id_User: req.user.id,
                id_Product: req.body.id_Product,
                status:"Add Cart"
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            include: [
                {
                    model: Product,
                    as: 'Products',
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
            ],
        });
        orderExist = JSON.parse(JSON.stringify(orderExist));
        if (orderExist) {
            const addQty = {
                order_Qty:orderExist.order_Qty + 1, 
            }
            await Order.update(addQty, {
                where: {
                    id: orderExist.id
                }
            });
        } else {
            await Order.create(data);
            }
        res.send({
            status: "Success",
            message: "Add Cart"
        });

    } catch (error) {
        console.log(error)
        res.send({
            status: "failed",
            message: "server error"
        });
    }
}

exports.getOrder = async (req, res) => {
    try {
        let data = await Order.findAll({
            where: {
                id_User:req.user.id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            include: [
                {
                    model: Product,
                    as: "Products",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }
            ]
        });

        data = JSON.parse(JSON.stringify(data));
        data = data.map((item) => {
            return {
                ...item,
                Products: {
                    name: item.Products.name,
                    price: item.Products.price,
                    image: process.env.PATH_FILE + item.Products.image,
                    
                }
            }
        });
        res.send({
            status: "success",
            data,
        });
    } catch (error) {
        res.send({
            status: "failed",
            message: "server error"
        });
    }
}

exports.getOrders = async (req, res) => {
    try {
        let orderData = await Order.findAll({
            include: [
        {
          model: User,
          as: 'Users',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password', 'status',"email"],
          },
        },
        {
          model: Product,
          as: 'Products',
          attributes: {
            exclude: ['createdAt', 'updatedAt',"id_User"],
          },
        },
       
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'id_User',"Order_Qty","id_Product"],
      },
    });

    orderData = JSON.parse(JSON.stringify(orderData));

    orderData = orderData.map((item) => {
      return {
        ...item,
      };
    });

    res.send({
      status: 'Success',
      message: 'Product Data Found',
      data: orderData,
    });
    } catch (error) {
        res.send({
            status: "failed",
            message:"server error",
       }) 
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const orderExist = {
        id_User: req.user.id,
        id_Product: req?.body?.id_Product,
        order_Qty: req?.body?.order_Qty,
        };
        await Order.update(orderExist, {
            where: {
                id,
            },
        });

     
        res.send({
            status: "success",
            message:"update Order Finished",
        });
   
        } catch (error) {
        res.send({
            status: "failed",
            message: "server error"
        });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        await Order.destroy({
            where: {
                id,
            }
        });
        res.send({
            status: "success",
            message:"Delete finished"
        })
    } catch (error) {
        res.send({
            status: "success",
            message:"server error"
      })  
    }
}

