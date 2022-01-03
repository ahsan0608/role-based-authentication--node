const router = require("express").Router();
// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser,
} = require("../utils/Auth");

// Users Registeration Route
router.post("/signup", async (req, res) => {
  await userRegister(req.body, res);
});

// Users Login Route
router.post("/login", async (req, res) => {
  await userLogin(req.body, res);
});

// Profile Route
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

// // Users Registeration Route
// router.post("/create-event", async (req, res) => {
//   await createEvent(req.body, res);
// });

// Users Registeration Route
// router.post("/signup-test", async (req, res) => {
//   await userRegisterTest(req.body, res);
// });

module.exports = router;
