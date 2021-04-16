import constants from "../constants";

export async function getJobs(query) {
    let jobs = [];
    let url = constants.apiURL + "/jobs";
    const queryParams = new URLSearchParams(query);
    if (queryParams) {
        url += "?" + queryParams.toString();
    }
    const response = await fetch(url);
    const result = await response.json();
    if (result.success && result.data) {
        let data = result.data.reduce(function (r, a) {
            r[a.hospital_id] = r[a.hospital_id] || [];
            r[a.hospital_id].push(a);
            return r;
        }, Object.create(null));
        for (const [key, value] of Object.entries(data)) {
            jobs.push({
                items: value,
                name: value[0].hospital_name,
                job_title: value[0].main_job_title,
                total_jobs_in_hospital: value.length,
                hospital_id: value[0].hospital_id,
            });
        }
    }
    return jobs;
}

export async function getFilters() {
    let filters = [];
    let url = constants.apiURL + "/filters";
    const response = await fetch(url);
    const result = await response.json();
    if (result.success && result.data) {
        filters = result.data;
    }
    return filters;
}

export async function getJob(job_id) {
    let job = {};
    let url = constants.apiURL + `/jobs/${job_id}`;
    const response = await fetch(url);
    const result = await response.json();
    if (result.success && result.data) {
        job = result.data;
    }
    return job;
}
