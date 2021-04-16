import dbConnect from "../../utils/dbConnect";
import Filter from "../../models/filter";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            await dbConnect();
            const filters = await Filter.find({});
            res.status(200).json({ success: true, data: filters });
        } catch (error) {
            console.log("Error in /api/filters: \n", error);
            res.status(500).json({ success: false, message: "internal Server Error" });
        }
    } else {
        res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
}
