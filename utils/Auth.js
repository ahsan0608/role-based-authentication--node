const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/Users");

const { SECRET } = require("../config");

/**
 * Register the user
 */
const userRegister = async (userDets, res) => {
  try {
    const { role, email, password, username, name } = userDets;

    // Validate the username
    let usernameNotTaken = await validateUsername(username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: `Username is already taken.`,
        success: false,
      });
    }

    // validate the email
    let emailNotRegistered = await validateEmail(email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already registered.`,
        success: false,
      });
    }

    // Get the hashed password
    const hashedpassword = await bcrypt.hash(password, 12);

    // create a new user
    const newUser = new User({
      name,
      email,
      role: role || "user",
      username,
      password: hashedpassword,
    });

    await newUser.save();
    return res.status(201).json({
      message: "You are successfully registred. Please now login.",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable to create your account.",
      success: false,
    });
  }
};

//*******************TEST************************/
// const userRegisterTest = async (userDets, res) => {
//   try {
//     const { role, email, password, username, name, userId } = userDets;

//     // Validate the username
//     let usernameNotTaken = await validateUsername(username);
//     if (!usernameNotTaken) {
//       return res.status(400).json({
//         message: `Username is already taken.`,
//         success: false,
//       });
//     }

//     // validate the email
//     let emailNotRegistered = await validateEmail(email);
//     if (!emailNotRegistered) {
//       return res.status(400).json({
//         message: `Email is already registered.`,
//         success: false,
//       });
//     }

//     // Get the hashed password
//     const hashedpassword = await bcrypt.hash(password, 12);

//     const getId = userId[0];

//     console.log("GET ID: " + getId);

//     if ("nid" in getId) {
//       const NidNum = getId.nid.NidNum;
//       const NidIssuer = getId.nid.NidIssuer;
//       const newUserTestNid = new UsersTestNid({
//         name,
//         email,
//         role: role || "user",
//         username,
//         password: hashedpassword,
//         userId: getId,
//         NidNum,
//         NidIssuer,
//       });

//       // create a new user
//       await newUserTestNid.save();
//       return res.status(201).json({
//         message: "You are successfully registred. Please now login.",
//         success: true,
//       });
//     } else {
//       console.log("HERE IN ELSE");
//       const BidNum = getId.bid.BidNum;
//       const BirthDate = getId.bid.BirthDate;
//       const BidIssuer = getId.bid.BidIssuer;
//       const newUserTestBid = new UsersTestBid({
//         name,
//         email,
//         role: role || "user",
//         username,
//         password: hashedpassword,
//         userId: getId,
//         BidNum,
//         BirthDate,
//         BidIssuer,
//       });

//       //create a new user
//       await newUserTestBid.save();
//       return res.status(201).json({
//         message: "You are successfully registred. Please now login.",
//         success: true,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       message: "Unable to create your account.",
//       success: false,
//     });
//   }
// };

//***********************TEST END**************************** */

// const createEvent = async (eventDets, res) => {
//   try {
//     const { eventName, summary, location } = eventDets;
//     // create a new user
//     const newUser = new User({
//       name,
//       email,
//       role: role || "user",
//       username,
//       password: hashedpassword,
//     });
//     await newUser.save();
//     return res.status(201).json({
//       message: "You are successfully registred. Please now login.",
//       success: true,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: "Unable to create your account.",
//       success: false,
//     });
//   }
// };

/**
 * Login the user
 */
const userLogin = async (userCreds, res) => {
  let { username, password } = userCreds;
  // First Check if the username is in the database
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({
      message: "Username is not found. Invalid login credentials.",
      success: false,
    });
  }

  // Now check for the password
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // Sign in the token and issue it to the user
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        username: user.username,
        email: user.email,
      },
      SECRET,
      { expiresIn: "7 days" }
    );

    let result = {
      id: user._id,
      username: user.username,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };

    return res.status(200).json({
      ...result,
      message: "You are now logged in.",
      success: true,
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false,
    });
  }
};

const validateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

/**
 * Passport middleware
 */
const userAuth = passport.authenticate("jwt", { session: false });

/**
 * Check Role Middleware
 */
const checkRole = (roles) => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const serializeUser = (user) => {
  return {
    username: user.username,
    email: user.email,
    name: user.name,
    _id: user._id,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
  };
};

module.exports = {
  userAuth,
  checkRole,
  userRegister,
  userLogin,
  serializeUser,
};
