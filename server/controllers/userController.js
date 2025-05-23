import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import createJWT from "../utils/index.js";
import Notice from "../models/notis.js";

// POST - Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ status: false, message: "Invalid email or password." });
  }

  if (!user?.isActive) {
    return res.status(401).json({
      status: false,
      message: "User account has been deactivated, contact the administrator",
    });
  }

  const isMatch = await user.matchPassword(password);

  if (user && isMatch) {
    createJWT(res, user._id);
    const safeUser = user.toObject();
    delete safeUser.password;
    res.status(200).json(safeUser);
  } else {
    return res.status(401).json({ status: false, message: "Invalid email or password" });
  }
});

// POST - Register new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin, role, title } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ status: false, message: "Email address already exists" });
  }

  const user = await User.create({ name, email, password, isAdmin, role, title });

  if (user) {
    if (isAdmin) createJWT(res, user._id);
    const safeUser = user.toObject();
    delete safeUser.password;
    res.status(201).json(safeUser);
  } else {
    res.status(400).json({ status: false, message: "Invalid user data" });
  }
});

// POST - Logout user
const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// GET - Team list (with optional search)
const getTeamList = asyncHandler(async (req, res) => {
  const { search } = req.query;
  let query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { name: { $regex: search, $options: "i" } },
      { role: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const users = await User.find(query).select("name title role email isActive");
  res.status(200).json(users);
});

// GET - Notifications list for a user
const getNotificationsList = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const notices = await Notice.find({
    team: userId,
    isRead: { $nin: [userId] },
  })
    .populate("task", "title")
    .sort({ _id: -1 });

  res.status(200).json(notices);
});

// PUT - Mark one or all notifications as read
const markNotificationRead = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { isReadType, id } = req.query;

  if (isReadType === "all") {
    await Notice.updateMany(
      { team: userId, isRead: { $nin: [userId] } },
      { $push: { isRead: userId } }
    );
  } else {
    await Notice.findOneAndUpdate(
      { _id: id, isRead: { $nin: [userId] } },
      { $push: { isRead: userId } }
    );
  }

  res.status(200).json({ status: true, message: "Done" });
});

// PUT - Update user profile (admin or self)
const updateUserProfile = asyncHandler(async (req, res) => {
  const { userId, isAdmin } = req.user;
  const { _id } = req.body;

  const id = isAdmin && userId !== _id ? _id : userId;
  const user = await User.findById(id);

  if (user) {
    user.name = req.body.name || user.name;
    user.title = req.body.title || user.title;
    user.role = req.body.role || user.role;

    const updatedUser = await user.save();
    const safeUser = updatedUser.toObject();
    delete safeUser.password;

    res.status(200).json({
      status: true,
      message: "Profile Updated Successfully.",
      user: safeUser,
    });
  } else {
    res.status(404).json({ status: false, message: "User not found" });
  }
});

// PUT - Activate or deactivate a user account
const activateUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (user) {
    user.isActive = req.body.isActive;
    await user.save();
    res.status(200).json({
      status: true,
      message: `User account has been ${user.isActive ? "activated" : "disabled"}`,
    });
  } else {
    res.status(404).json({ status: false, message: "User not found" });
  }
});

// PUT - Change password
const changeUserPassword = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  if (userId === "65ff94c7bb2de638d0c73f63") {
    return res.status(403).json({
      status: false,
      message: "This is a test user. You cannot change the password. Thank you!",
    });
  }

  const user = await User.findById(userId);

  if (user) {
    user.password = req.body.password;
    await user.save();
    res.status(200).json({
      status: true,
      message: "Password changed successfully.",
    });
  } else {
    res.status(404).json({ status: false, message: "User not found" });
  }
});

// DELETE - Delete user account
const deleteUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(200).json({ status: true, message: "User deleted successfully" });
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getTeamList,
  getNotificationsList,
  markNotificationRead,
  updateUserProfile,
  activateUserProfile,
  changeUserPassword,
  deleteUserProfile,
};
