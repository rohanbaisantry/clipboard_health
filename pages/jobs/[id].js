import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

import { getJob } from "../../utils/actions";
import getRelativeTimeString from "../../utils/relative-string-string";

export default function SpecificJob(props) {
    const salaryRangeString =
        (props.salary_range &&
            props.salary_range.length > 0 &&
            `$${props.salary_range[0]} - $${props.salary_range[1]}`) ||
        "";
    return (
        <>
            <Head>
                <title>{props.jobData.job_title} | Explore Health</title>
            </Head>
            <div className="px-5 pb-10 sm:pt-10">
                <div className="cursor-pointer flex justify-between px-4 py-5 sm:px-6">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            {props.jobData.job_title}
                        </h3>
                        <h5 className="text-sm text-gray-900">
                            {`${props.jobData.job_type} | ${salaryRangeString} | ${props.jobData.city}`}
                        </h5>
                        <h5 className="text-sm text-gray-900 sm:hidden">
                            {getRelativeTimeString(props.jobData.created)}
                        </h5>
                    </div>
                    <div className="text-black-500 text-right">
                        <h5 className="hidden sm:block text-sm text-gray-900">
                            {getRelativeTimeString(props.jobData.created)}
                        </h5>
                    </div>
                </div>

                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Department</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {props.jobData.department && props.jobData.department.join(", ")}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Hours / Shift</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {`${props.jobData.hours && props.jobData.hours.join(", ")} / ${
                                props.jobData.work_schedule && props.jobData.work_schedule
                            }`}
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Summary</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {props.jobData.description}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Type</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {props.jobData.type}
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Required Skills</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {props.jobData.required_skills}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Required Credentials</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {props.jobData.required_credentials &&
                                props.jobData.required_credentials.join(", ")}
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Nurse - Patent Ratio</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {props.jobData.nurse_patient_ratio}
                        </dd>
                    </div>
                </dl>
            </div>
        </>
    );
}

export async function getServerSideProps(ctx) {
    const jobData = await getJob(ctx.query.id);
    return { props: { jobData } };
}

SpecificJob.propTypes = {
    jobData: PropTypes.object.isRequired,
};
