import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import getRelativeTimeString from "../utils/get-relative-time-string";
import { useRouter } from "next/router";

const getIcon = (open) => {
    return open ? (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
    ) : (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    );
};

const JobCard = ({ jobDetails, index }) => {
    const [open, setOpen] = React.useState(false);
    const salaryRangeString =
        (jobDetails.salary_range &&
            jobDetails.salary_range.length > 0 &&
            `$${jobDetails.salary_range[0]} - $${jobDetails.salary_range[1]}`) ||
        "";
    const router = useRouter();
    const onClickViewJob = () => {
        router.query = { id: jobDetails._id };
        router.pathname = "/jobs/[id]";
        router.push(router);
    };
    return (
        <div
            className="border-t border-gray-200"
            key={"internal_job_" + jobDetails.hospital_id + "__" + index}
        >
            <div
                className="cursor-pointer flex justify-between px-4 py-5 sm:px-6"
                onClick={() => setOpen(!open)}
            >
                <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {jobDetails.job_title}
                    </h3>
                    <h5 className="text-sm text-gray-900">
                        {`${jobDetails.job_type} | ${salaryRangeString} | ${jobDetails.city}`}
                    </h5>
                    <h5 className="text-sm text-gray-900 sm:hidden">
                        {getRelativeTimeString(jobDetails.created)}
                    </h5>
                </div>
                <div className="text-black-500 text-right">
                    <h5 className="hidden sm:block text-sm text-gray-900">
                        {getRelativeTimeString(jobDetails.created)}
                    </h5>
                    <div className="mt-2 flex justify-end">{getIcon(open)}</div>
                </div>
            </div>
            {open && (
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Department</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {jobDetails.department.join(", ")}
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Hours / Shift</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {`${jobDetails.hours.join(", ")} / ${jobDetails.work_schedule}`}
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Summary</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {jobDetails.description}
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Actions</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={onClickViewJob}
                            >
                                View Job
                            </button>
                            <button
                                disabled
                                className=" ml-8 bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
                            >
                                Save Job
                            </button>
                        </dd>
                    </div>
                </dl>
            )}
        </div>
    );
};

export default function DataCard(props) {
    const [open, setOpen] = React.useState(false);
    return (
        <div className="bg-white overflow-hidden">
            <div
                className="cursor-pointer flex justify-between px-4 py-5 sm:px-6"
                onClick={() => setOpen(!open)}
            >
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {props.total_jobs_in_hospital + " Job(s) for " + props.name}
                </h3>
                <div className="text-black-500">{getIcon(open)}</div>
            </div>
            {open &&
                props.jobs &&
                props.jobs.length > 0 &&
                props.jobs.map((jobDetails, index) => (
                    <div
                        className="mx-auto px-4 sm:px-8"
                        key={`job__${props.main_job_posting}_${index}`}
                    >
                        <JobCard index={index} jobDetails={jobDetails} />
                    </div>
                ))}
        </div>
    );
}

DataCard.propTypes = {
    jobs: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    total_jobs_in_hospital: PropTypes.number.isRequired,
};
