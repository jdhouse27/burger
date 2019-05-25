const express = require("express");

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    burger.seletAll(function(data) {
      let hbsObject = {
        burger: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

 //verify that we need this . 
  router.post("/api/burger", function(req, res) {
    burger.insertOne([
      "name", "sleepy"
    ], [
      //req.body.name, req.body.sleepy
    ], function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });
  
  router.put("/api/burger/:id", function(req, res) {
    let condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burger.updateOne({
      //sleepy: req.body.sleepy
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  
  // Export routes for server.js to use.
  module.exports = router;