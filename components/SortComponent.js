import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import sortByOptions from "../data/sort-by.json";
import { getSortByQueryKey } from "../utils/sort-query-key";

const getIcon = (optionValue) => {
    if (optionValue === 1) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                />
            </svg>
        );
    } else if (optionValue === -1) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                />
            </svg>
        );
    } else {
        return null;
    }
};

const SortOption = ({ optionDetail }) => {
    const router = useRouter();

    let nextValue = 1;
    let colorClass = "text-black-50";
    const key = getSortByQueryKey(optionDetail.key);

    let optionValue = router.query[key];
    optionValue = optionValue === undefined ? 0 : Number(optionValue);

    if (optionValue === 1) {
        nextValue = -1;
        colorClass = "text-purple-500";
    } else if (optionValue === -1) {
        nextValue = 0;
        colorClass = "text-purple-500";
    }

    const onClickOption = () => {
        if (nextValue === 0) {
            delete router.query[key];
        } else {
            router.query[key] = nextValue;
        }
        router.push(router);
    };
    return (
        <div
            className={"flex items-center cursor-pointer mx-2 " + colorClass}
            onClick={onClickOption}
        >
            {optionDetail.label}
            {optionValue !== 0}
            <div className={"ml-1 " + colorClass}>{getIcon(optionValue)}</div>
        </div>
    );
};

export default function SortComponent(props) {
    return (
        <div className="w-full flex justify-between sm:block lg:flex">
            <div className="flex items-center mb-4 lg:mb-0">
                <div className="mr-1">{props.loading ? "... " : props.jobCount}</div>
                <div>Job postings</div>
            </div>
            <div className="hidden sm:flex">
                <div className="text-black-800 mr-2"> Sort By: </div>
                <div className="flex">
                    {sortByOptions.map((option, index) => (
                        <SortOption optionDetail={option} key={"sort_" + index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

SortComponent.propTypes = {
    jobCount: PropTypes.number.isRequired,
    loading: PropTypes.bool,
};
SortComponent.defaultProps = {
    loading: false,
};
