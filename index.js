const express = require("express");
const app = express();
const router = require("./src/routes");
const port = 5000;
require('dotenv').config();

app.use(express.json());
// Route Path
app.use("/api/v1", router);
// Middleware Path
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
    res.send("sodikul Ajib");
});

app.listen(port, () => console.log(`Listening on port ${port}`));