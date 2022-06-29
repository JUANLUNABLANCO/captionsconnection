const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4200;

app.use(express.static(__dirname + "/dist"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
});

const server = app.listen(PORT, () => {
    console.log("Aplicación de angular iniciada en el puerto: " + PORT);
});
