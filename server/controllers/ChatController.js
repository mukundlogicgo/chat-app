import ChatModel from "../models/chatModel.js";
import GroupChatModel from "../models/groupChatModel.js";

export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
};

export const createChat = async (req, res) => {
  const { senderId, receiverId } = req.body
  const chat = await ChatModel.findOne({
    members: { $all: [senderId, receiverId] },
  });


  if (chat) {
    return res.status(409).json("User already added.")
  }

  const newChat = new ChatModel({
    members: [senderId, receiverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createGroupChat = async (req, res) => {
  const { name } = req.body
  try {
    const group = await GroupChatModel.findOne({
      name: name
    });

    if (group) {
      return res.status(409).json(`Group with name '${name}' already created`)
    }

    const newGroup = await GroupChatModel.create({
      name: name,
    });

    return res.status(200).json(newGroup);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getGroupById = async (req, res) => {
  const { id } = req.params
  try {
    const group = await GroupChatModel.findById(id);

    if (!group) {
      return res.status(404).json(`Group with name '${name}' not found`)
    }

    return res.status(200).json(group);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getGroupByname = async (req, res) => {
  const { name } = req.params
  try {
    const group = await GroupChatModel.findOne({
      name: name
    });

    if (!group) {
      return res.status(404).json(`Group with name '${name}' not found`)
    }

    return res.status(200).json(group);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const addUserToGroup = async (req, res) => {
  const { name, userId } = req.body

  try {
    if (!name || !userId) {
      return res.status(400).json("All field are required.")
    }
    const groupExist = await GroupChatModel.findOne({ name })
    if (!groupExist) return res.status(404).json(`Group '${name} is not exist provide valid group name'`)

    const userExist = await GroupChatModel.findOne({
      name,
      members: {
        $in: [userId]
      }
    })

    if (userExist) {
      return res.status(409).json("User already joined in group.")
    }

    const group = await GroupChatModel.findOneAndUpdate({ name }, {
      $push: {
        members: userId
      }
    },
      { new: true })
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const userGroupChats = async (req, res) => {
  try {
    const group = await GroupChatModel.find({
      members: { $in: [req.params.id] },
    });
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json(error);
  }
};

