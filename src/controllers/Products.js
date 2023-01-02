const { Product, User } = require("../../models");

exports.addProduct = async (req, res) => {
    try {
     
      const data = {
      name: req.body.name,
      price: req.body.price,
      qty: req.body.qty,
      image: req.file.filename, 
      id_User: req.user.id, 
    };
      const userStatus = await User.findOne({
        where: {
          id: req.user.id
        }
      });
      if (userStatus.status ==="admin") {
      const newProduct = await Product.create(data); 
        let productData = await Product.findOne({
            where: {
                id: newProduct.id,
            },
            include: {
                model: User,
                as: "Users",
                attributes: {
                    exclude: ["createdAt","updatedAt", "password"]
                },
            },
            attributes: {
                exclude: ["createdAt","updatedAt"]
            },
        });
       
        productData = JSON.parse(JSON.stringify(productData));
        res.send({
            status: "sucess",
            data: {
                productData,
                image: process.env.PATH_FILE + productData.image
            },
        });
      } else {
        res.send({
          status: 'failed',
          message: 'Access denied! only admin add to product',
        });
        }
    } catch (error) {
        res.send({
            status: "failed",
            message: "server error"
        });
    }
}


exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await Product.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'id_User'],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
      image: process.env.PATH_FILE + data.image,
    };

    res.send({
      status: 'success...',
      data,
    });
  } catch (error) {
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    let productData = await Product.findAll({
      include: {
        model: User,
        as: 'Users',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'id_User'],
      },
    });

    productData = JSON.parse(JSON.stringify(productData));

    productData = productData.map((item) => {
      return {
        ...item,
    image: process.env.PATH_FILE + item.image,
      };
    });

    res.send({
      status: 'Success',
      message: 'Product Data Found',
      data: productData,
    });
  } catch (error) {
    console.log(error)
    res.send({
      status: 'Error',
      message: 'Server error',
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
      const data = {
      name: req?.body?.name,
      price: req?.body?.price,
      qty: req?.body?.qty,
      image: req?.file?.filename,
      id_User: req.user.id,
    };

        const { id } = req.params;
         await Product.update(data, {
          where: {
          id,
          },
        });
        res.send({
        status: "success",
        message: `update user id :${id} finished`,
        data: {
        id,
        data,
        image: req?.file?.filename,
      },
        });
    } catch (error) {
        res.send({
            status: "failed",
            message: "server error"
        });
    }
}

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({
      where: {
        id,
      }
    });
    res.send({
      status: "success",
      data: {
        id,
      }
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "server error"
    });
  }
}