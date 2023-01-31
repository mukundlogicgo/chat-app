import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    isGroupChat: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  },
);

const ChatModel = mongoose.model("Chat", ChatSchema);
export default ChatModel;
