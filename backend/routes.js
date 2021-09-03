const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const registerMD = require("./registerSchema");

const keys = "secretjwtkeysecret";

router.post("/register", async (req, res) => {
  const saltRounds = await bcrypt.genSalt(10);
  console.log(req.body);
  try {
    const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
    registerMD.findOne({ email: req.body.email }, (err, users) => {
      if (users) {
        res.send({ message: "User Already Exists" });
      } else {
        const insertResult = new registerMD({
          name: req.body.name,
          email: req.body.email,
          password: hashedPwd,
        });
        insertResult.save((err) => {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: "Successfully Register" });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server error Occured" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await registerMD.findOne({ username: req.body.username });
    console.log(user);
    if (user) {
      const cmp = await bcrypt.compare(req.body.password, user.password);
      if (cmp) {
        // Create JWT Payload
        const payload = {
          name: user.name,
        };

        // Sign token
        const token = jwt.sign(payload, keys, {
          expiresIn: 31556926, // 1 year in seconds
        });
        res.json({
          message: `Auth Successfull ${token}`,
          auth: true,
          token: token,
        });
      } else {
        res.send({ message: "Wrong username or password." });
      }
    } else {
      res.send({ message: "Wrong username or password." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server error Occured" });
  }
});

module.exports = router;
