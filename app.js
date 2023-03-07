const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/f8_education_dev", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const contactSchema = {
    hoten: String,
    sdt: String,
    kv: String,
    sotienvay: String,
    incomeType: String,
};

const Contact = mongoose.model("Contact", contactSchema);

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/images', express.static(__dirname + 'public/images'))

app.get("/contact", function (req, res) {
    res.render("contact");
});

app.post("/contact", function (req, res) {
    console.log(req.body.hoten);
    const contact = new Contact({
        hoten: req.body.hoten,
        sdt: req.body.sdt,
        kv: req.body.kv,
        sotienvay: req.body.sotienvay,
        incomeType: req.body.incomeType,
    });
    contact.save(function (err) {
        if (err) {
            throw err;
        } else {
            res.render("contact");
        }
    });
});

app.listen(3000, function () {
    console.log("App is running on Port 3000");
});
