import UserModel from "../models/userModel.js";

// Get a User
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such User");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getUserByName = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json("User not found");
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createUser = async (req, res) => {
  const { username } = req.body

  try {
    const existUser = await UserModel.findOne({ username })

    if (!existUser) {
      const user = await UserModel.create({ username });
      return res.status(200).json(user)
    }

    return res.status(200).json(existUser)

  } catch (error) {
    res.status(500).json(error);
  }

}




