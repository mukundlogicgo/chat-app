import mongoose from "mongoose";

const GroupChatSchema = new mongoose.Schema(
    {
        name: String,
        members: {
            type: Array,
        },
        isGroupChat: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
    },
);

const GroupChatModel = mongoose.model("GroupChat", GroupChatSchema);
export default GroupChatModel;
