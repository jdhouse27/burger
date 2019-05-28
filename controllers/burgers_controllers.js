const express = require("express");

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger.js");

// Root route displaying available burgers
  router.get("/", function(req, res) {
    burger.selectAll(function(data) {
      let hbsObject = { burger: data };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

 // Create new burger 
  router.post("/api/burger", function(req, res) {
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, devoured = false
    ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});
  
// Devour Da Burger
  router.post("/api/burger/:id", function(req, res) {
    let condition = "id = " + req.params.id;

    burger.updateOne(condition, function() {
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