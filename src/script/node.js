const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Serve the comment page
app.use(express.static("public"));

// Serve the comments.json file
app.get("/comments.json", (req, res) => {
  fs.readFile(path.join(__dirname, "comments.json"), "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading comments");
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Handle comment submission
app.post("/submit-comment", (req, res) => {
  const newComment = req.body;

  // Read the existing comments
  fs.readFile(path.join(__dirname, "comments.json"), "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading comments");
      return;
    }

    const comments = JSON.parse(data);
    comments.push(newComment);

    // Save the updated comments back to the file
    fs.writeFile(
      path.join(__dirname, "comments.json"),
      JSON.stringify(comments, null, 2),
      (err) => {
        if (err) {
          res.status(500).send("Error saving comment");
          return;
        }
        res.status(200).send("Comment saved");
      }
    );
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
