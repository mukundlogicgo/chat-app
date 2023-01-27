import UserModel from "../models/userModel.js";

// Register new user
export const registerUser = async (req, res) => {

  const newUser = new UserModel(req.body);
  const { username } = req.body
  try {
    // addition new
    const oldUser = await UserModel.findOne({ username });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    // changed
    const user = await newUser.save();

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User

// Changed
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });

    if (user) {
      const validity = user.password == password

      if (!validity) {
        res.status(400).json("wrong password");
      } else {
        res.status(200).json({ user });
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
