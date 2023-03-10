import MessageModel from "../models/messageModel.js";

export const addMessage = async (req, res) => {
  const message = new MessageModel(req.body);
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await MessageModel.find({ chatId }).sort({ createdAt: 1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
