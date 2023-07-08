const auth = require("../middlewares/auth");
const { File } = require("../models/file");

const router = require("express").Router();

router.get("/", auth, async (req, res) => {
    try {
        const files = await File.find({ user: req.user._id, type: req.query.type })
        res.send(files)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

module.exports = router;
