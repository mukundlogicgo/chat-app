import { __dirname } from "../index.js"

export const uploadFile = async (req, res) => {
    try {

        const files = req.files
        console.log("files", files);
        if (!files) return res.status(400).json("File is required.")

        const paths = files.map(file => {
            return {
                filename: file.originalname,
                fileURL: `${process.env.SERVER_BASE_URL}/${file.filename}`
            }
        })

        return res.status(200).json({
            message: "Files uploaded successfully.",
            data: paths
        })
    } catch (error) {
        console.log("[ERROR]", error.message)
        return res.status(500).json(error.message)
    }

}