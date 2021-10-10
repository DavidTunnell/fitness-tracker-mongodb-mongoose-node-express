const router = require("express").Router();
const path = require("path");

//get api routes for server
const apiRoutes = require("./api");
router.use("/api", apiRoutes);

//add routes for html pages in public folder
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "../../public/index.html"));
});

router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "../../public/exercise.html"));
});

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "../../public/stats.html"));
});

module.exports = router;
