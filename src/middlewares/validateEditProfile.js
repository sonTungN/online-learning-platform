const validateEditProfile = async (req, res, next) => {
  try {
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {validateEditProfile}