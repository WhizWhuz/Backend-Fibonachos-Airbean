const About = require("../models/About");

// GET /api/v1/about
exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res
        .status(404)
        .json({ success: false, message: "About content not found" });
    }

    res.status(200).json({ success: true, data: about });
  } catch (err) {
    console.error("GET /about error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// PUT /api/v1/about
exports.updateAbout = async (req, res) => {
  try {
    const { title, description } = req.body;

    let about = await About.findOne();

    if (about) {
      // update existing
      about.title = title;
      about.description = description;
      await about.save();
    } else {
      // create new if not exist
      about = await About.create({ title, description });
    }

    res.status(200).json({ success: true, data: about });
  } catch (err) {
    console.error("PUT /about error:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "Could not update About content",
        error_message: err.message,
      });
  }
};
