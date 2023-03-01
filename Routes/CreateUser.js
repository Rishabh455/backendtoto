const express = require("express");
const router = express.Router();
const User = require("../Modals/UserData");
const { body, validationResult } = require("express-validator");
router.post("/createuser", async (req, res) => {
  try {
    await User.create({
      name: req.body.name,
      iconurl: req.body.iconurl,
      siteurl: req.body.siteurl,
      note: req.body.note,
      date: req.body.date,
      // siteurl: req.body.siteurl,
      // note: req.body.note,
    });
    console.log("data inserted..");
    res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false });
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteuser = await User.findByIdAndDelete({ _id: id });
    res.status(201).json(deleteuser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.post("/userEdit/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      iconurl: req.body.iconurl,
      siteurl: req.body.siteurl,
      note: req.body.note,
    });
    res.json({ success: true });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.get("/userEdit/:id", async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    res.send([users]);
    // res.send([global.users])
  } catch (error) {
    console.log(error);
    res.send("server error");
  }
});
module.exports = router;
