import dbConnect from "../../../utils/dbConnect";
import { getSortByQueryKey, getKeyFromQuery } from "../../../utils/sort-query-key";
import Job from "../../../models/job";
import Filter from "../../../models/filter";
import sortByData from "../../../data/sort-by.json";

const getSortByParamsFromAllowedSortKeys = (query) => {
    const allowedSortFilters = sortByData.map((data) => {
        return getSortByQueryKey(data.key);
    });
    let sortQuery = query.search ? { score: { $meta: "textScore" } } : {};
    allowedSortFilters.forEach((filter) => {
        if ([-1, 1].includes(Number(query[filter])))
            sortQuery[getKeyFromQuery(filter)] = Number(query[filter]);
    });
    return sortQuery;
};

const getValueFromAllowedFilters = async (query) => {
    // Can also directly get the data from the file or define the allowed filters here
    // const allowedFilters = ["job_type", "work_schedule", "experience", "department"];
    const filters = await Filter.find({});
    const allowedFilters = filters.map((filter) => {
        return filter.name;
    });
    let filterQuery = {};
    allowedFilters.forEach((filter) => {
        if (query[filter]) filterQuery[filter] = { $in: query[filter].split(",") };
    });
    if (query.search) {
        filterQuery["$text"] = { $search: query.search };
    }
    return filterQuery;
};

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            await dbConnect();
            const filterQuery = await getValueFromAllowedFilters(req.query);
            const sortQuery = getSortByParamsFromAllowedSortKeys(req.query);
            const jobs = await Job.find(filterQuery).sort(sortQuery);
            await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()));
            res.status(200).json({ success: true, data: jobs });
        } catch (error) {
            console.log(
                "Error in /api/jobs with query params: ",
                req.query,
                "\n Error is: \n",
                error
            );
            res.status(500).json({ success: false, message: "internal Server Error" });
        }
    } else {
        res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
}
