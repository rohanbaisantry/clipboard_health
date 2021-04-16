import dbConnect from "../../utils/dbConnect";
import Filter from "../../models/filter";
import Job from "../../models/job";

import filtersData from "../../data/filters.json";
import jobsData from "../../data/jobs.json";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            await dbConnect();
            await Filter.deleteMany({});
            await Job.deleteMany({});

            let filtersDataToBeInserted = [];
            for (const [key, value] of Object.entries(filtersData)) {
                filtersDataToBeInserted.push({
                    name: key,
                    options: value,
                });
            }
            await Filter.insertMany(filtersDataToBeInserted);

            let jobsDataToBeInserted = [];
            jobsData.forEach((data) => {
                data.items.forEach((item) => {
                    jobsDataToBeInserted.push({
                        ...item,
                        hospital_name: data.name,
                        main_job_title: data.job_title,
                    });
                });
            });
            await Job.insertMany(jobsDataToBeInserted);
            res.status(200).json({
                success: true,
                message: "Database has been reset using 'jobs.json' and 'filters.json'",
            });
        } catch (error) {
            console.log("Error while running /api/reset-db: ", error);
            res.status(500).json({ success: false, message: "internal Server Error" });
        }
    } else {
        res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
}
