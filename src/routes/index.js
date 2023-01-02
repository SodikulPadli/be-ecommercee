const express = require("express");
const router = express.Router();

// Controller User
const { addUser, getUser, getUsers, updateUser, deleteUser } = require("../controllers/Users");

// Controller Auth
const {register,login,checkAuth } =require("../controllers/Auth")
// Controller Products
const { addProduct, getProduct, getProducts, updateProduct, deleteProduct } = require("../controllers/Products");

// Controller Order
const { addOrder, getOrder, updateOrder, deleteOrder, getOrders } = require("../controllers/Order");

// Controller Transaction
const { addTransaction,getTransactions} = require("../controllers/Transactions");

// Middlewares
const { uploadFile } = require("../middlewares/uploadFile");
const { auth} = require("../middlewares/auth");

// Routes User
router.post("/user", addUser);
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

// Routes Auth
// Controller Auth
router.post('/register', register);
router.post('/login', login);
router.get('/check-auth', auth, checkAuth);

// Routes Product
router.post("/product",auth,uploadFile("image"),addProduct);
router.get("/product/:id",auth, getProduct);
router.get("/products", getProducts);
router.patch("/product/:id",auth,uploadFile("image"), updateProduct);
router.delete("/product/:id",auth, deleteProduct);

// Routes Order
router.post("/order",auth, addOrder);
router.get("/order",auth, getOrder);
router.get("/orders",auth, getOrders);
router.patch("/order/:id",auth, updateOrder);
router.delete("/order/:id",auth, deleteOrder);

// Routes Transactions
router.post("/transaction",auth, addTransaction);
router.get("/transactions",auth, getTransactions);
module.exports = router;