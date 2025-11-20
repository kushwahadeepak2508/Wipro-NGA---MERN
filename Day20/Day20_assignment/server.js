const express = require("express");
const app = express();
const PORT = 4000;

const courseRoutes = require("./routes/courses");

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to SkillSphere LMS API");
});

// Use course routes
app.use("/courses", courseRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
