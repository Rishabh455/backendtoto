const { response } = require("express");
const express = require("express");
const router = express.Router();
const mongoDB = require("../db");
const { db } = require("../Modals/UserData");
const User = require("../Modals/UserData");
router.get("/userData", async (req, res) => {
  try {
    const users = await User.find({});
    res.send([users]);
    // res.send([global.users])
  } catch (error) {
    console.log(error);
    res.send("server error");
  }
});
router.get("/todos/count-by-date", async (req, res) => {
  try {
    const result = await db
      .collection("users")
      .aggregate([
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$date" },
            },
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
