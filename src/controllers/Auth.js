const { User } = require("../../models");
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const schema = Joi.object({
    user: Joi.string().min(5).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
    status: Joi.string().required()
  });
  const { error } = schema.validate(req.body);
  if (error)
    return res.send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await User.create({
      user: req.body.user,
      email: req.body.email,
      password: hashedPassword,
      status: req.body.status,
    });
    const token = jwt.sign({ id: User.id }, process.env.SECRET_KEY);

    res.send({
      status: 'success',
      data: {
        user: {
          user: newUser.user,
          email: newUser.email,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error)
    return res.send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const userExist = await User.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    const isValid = await bcrypt.compare(req.body.password, userExist.password);
    if (!isValid) {
      return res.send({
        status: 'failed',
        message: 'credential is invalid',
      });
    }
    const token = jwt.sign({ id: userExist.id }, process.env.SECRET_KEY);
    res.send({
      status: 'success',
      data: {
        user: {
          user: userExist.user,
          email: userExist.email,
          status: userExist.status,
          token,
        },
      },
    });
  } catch (error) {
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;
    const dataUser = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    });
    if (!dataUser) {
      return res.send({
        status: 'failed',
      });
    }
    res.send({
      status: 'success',
      data: {
        user: {
          id: dataUser.id,
          user: dataUser.user,
          email: dataUser.email,
          status: dataUser.status,
        },
      },
    });
  } catch (error) {
    res.status({
      status: 'failed',
      message: 'Server Error',
    });
  }
};