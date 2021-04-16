import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

const FilterOption = ({ filterOption, filterKey }) => {
    let colorClass = "text-black-500";
    let active = false;
    const router = useRouter();
    const routerQuery = router.query;
    if (routerQuery[filterKey] && routerQuery[filterKey].split(",").includes(filterOption.key)) {
        colorClass = "text-purple-500";
        active = true;
    }

    const onClickFilterOption = () => {
        if (routerQuery[filterKey]) {
            let currentFilterValue = router.query[filterKey].split(",");
            if (active) {
                const newValue = currentFilterValue.filter(function (e) {
                    return e !== filterOption.key;
                });
                if (newValue.length > 0) {
                    router.query[filterKey] = newValue.join(",");
                } else {
                    delete router.query[filterKey];
                }
            } else {
                currentFilterValue.push(filterOption.key);
                router.query[filterKey] = currentFilterValue.join(",");
            }
        } else {
            router.query[filterKey] = filterOption.key;
        }
        router.push(router);
    };
    return (
        <div className="my-2 items-center w-full flex sm:block sm:my-3 md:flex">
            <a className={"cursor-pointer " + colorClass} onClick={onClickFilterOption}>
                {filterOption.key}
            </a>
            &nbsp;
            <div className="text-gray-400">({filterOption.doc_count})</div>
        </div>
    );
};

const Filter = ({ filterDetails, index }) => {
    const [showMore, setShowMore] = React.useState(false);
    const renderFilterOption = (filterOption, innerIndex) => {
        return (
            <FilterOption
                filterOption={filterOption}
                key={"filter_option_" + index + "_" + innerIndex}
                filterKey={filterDetails.name}
            />
        );
    };
    return (
        <div className="p-4 bg-white shadow overflow-auto sm:rounded-lg">
            <div className="font-bold text-lg mb-2">{filterDetails.name}</div>
            <div>
                {filterDetails &&
                    filterDetails.options &&
                    filterDetails.options
                        .slice(0, showMore ? -1 : 10)
                        .map((filterOption, innerIndex) =>
                            renderFilterOption(filterOption, innerIndex)
                        )}
            </div>
            {filterDetails.options.length > 10 && (
                <div
                    className="text-purple-500 cursor-pointer flex items-center"
                    onClick={() => setShowMore(!showMore)}
                >
                    {showMore ? (
                        <>
                            <div> Show Less</div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 ml-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 15l7-7 7 7"
                                />
                            </svg>
                        </>
                    ) : (
                        <>
                            <div> Show More</div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 ml-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default function Filters(props) {
    return (
        <div className="container mx-auto hidden sm:block w-11/12">
            {props.filtersData.map((filterDetails, index) => (
                <div className="mb-4" key={"filters_" + index}>
                    <Filter filterDetails={filterDetails} index={index} />
                </div>
            ))}
        </div>
    );
}

Filters.propTypes = {
    filtersData: PropTypes.array.isRequired,
};
