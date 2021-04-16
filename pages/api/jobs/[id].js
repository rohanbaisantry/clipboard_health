import dbConnect from "../../../utils/dbConnect";
import Job from "../../../models/job";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            await dbConnect();
            const job = await Job.findOne({ _id: req.query.id });
            await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()));
            res.status(200).json({ success: true, data: job });
        } catch (error) {
            console.log(
                "Error in /api/jobs/[id] with id: ",
                req.query.id,
                "\n Error is: \n",
                error
            );
            res.status(500).json({ success: false, message: "internal Server Error" });
        }
    } else {
        res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
}
