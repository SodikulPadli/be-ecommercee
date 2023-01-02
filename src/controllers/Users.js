const { User } = require("../../models")
exports.addUser = async (req, res) => {
    try {
        await User.create(req.body);
        res.send({
            status: "success",
            message:"Add User Finished"
        })
    } catch (error) {
        res.send({
            status: "failed",
            message:"Server Error",
        })
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ["password", "createdAt", "updatedAt"]
            }
        });
        res.send({
            status: "success",
            data: {
                users,
            }
        });
    } catch (error) {
        res.send({
            status: "failed",
            message: "server error"
        });
    }
}

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await User.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["password", "createdAt", "updatedAt"]
            }
        });
        res.send({
            status: "success",
            data: {
                user: data,
            },
        });
    } catch (error) {
        res.send({
            status: "failed",
            message: "server error"
        });
    }
}


exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.update(req.body, {
            where: {
                id,
            },
        });
        res.send({
            status: "success",
            message: `update user id :${id} finished`,
            data: req.body,
        });
    } catch (error) {
        res.send({
            status: "failed",
            message: "server error"
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
         const { id } = req.params;
    await User.destroy({
        where: {
            id,
        }
    });
    res.send({
        status: "success",
        message: `Delete User id :${id} finished`,
    });
    } catch (error) {
        res.send({
            status: "failed",
            message: "server error",
        });
    }
   
}