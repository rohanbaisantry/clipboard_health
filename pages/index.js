import React from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";

import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import SortComponent from "../components/SortComponent";
const Filters = dynamic(() => import("../components/Filters"), { ssr: false });
const DataCard = dynamic(() => import("../components/DataCard"), { ssr: false });

import { getJobs, getFilters } from "../utils/actions";
import getJobCount from "../utils/get-job-count";

export default function Index(props) {
    const router = useRouter();
    const [loading, setLoading] = React.useState(true);
    const [jobs, setJobs] = React.useState([]);

    React.useEffect(async () => {
        setLoading(true);
        getJobs(router.query).then((result) => {
            setJobs(result);
            setLoading(false);
        });
    }, [router.query]);

    return (
        <>
            <Head>
                <title>Search Nurse Jobs | Explore Health</title>
            </Head>
            <div className="mx-4 grid grid-cols-4 gap-0">
                <div className=" mb-4 col-span-4">
                    <SearchBar />
                </div>
                <div className="hidden sm:block col-span-1">
                    <div className="sticky top-20 overflow-y-scroll filters-container">
                        <Filters filtersData={props.filters} />
                    </div>
                </div>
                <div className="py-8 px-4 col-span-4 sm:col-span-3 bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="mb-8">
                        <SortComponent jobCount={getJobCount(jobs)} loading={loading} />
                    </div>
                    {loading ? (
                        <div className="flex items-center justify-center w-full mt-8 h-96">
                            <Loader />
                        </div>
                    ) : jobs && jobs.length ? (
                        jobs.map((job, index) => (
                            <div
                                className="mx-auto w-11/12 sm: w-full border-b-2 border-black-400"
                                key={"job_" + index}
                            >
                                <DataCard
                                    jobs={job.items}
                                    name={job.name}
                                    total_jobs_in_hospital={job.total_jobs_in_hospital}
                                    id={job._id}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="my-10 py-10 flex justify-center font-bold text-lg">
                            No Jobs Found!
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(ctx) {
    const filters = await getFilters();
    return { props: { filters: filters } };
}

Index.propTypes = {
    filters: PropTypes.array.isRequired,
};
