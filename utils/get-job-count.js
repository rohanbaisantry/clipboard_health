export default function getJobCount(jobs) {
    if (jobs && jobs.length) {
        let total = 0;
        jobs.forEach((job) => {
            if (job.items && job.items.length) total += job.items.length;
        });
        return total;
    } else return 0;
}
