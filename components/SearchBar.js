import React from "react";
import { useRouter } from "next/router";

export default function SearchBar() {
    const router = useRouter();
    const [searchText, setSearchText] = React.useState(router.query.search || "");
    const onClickSearch = () => {
        if (searchText) {
            router.query.search = searchText;
        } else {
            delete router.query["search"];
        }
        router.push(router);
    };

    React.useEffect(() => {
        setSearchText(router.query.search || "");
    }, [router.query]);

    return (
        <div className="bg-white shadow p-4 flex items-center">
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
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
            <input
                className="w-full rounded p-2"
                type="text"
                placeholder="Search for any job, title, keywords or company"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onClickSearch()}
            />
            <button
                className="bg-blue-400 hover:bg-blue-300 rounded text-white p-2 pl-4 pr-4"
                onClick={onClickSearch}
            >
                <p className="font-semibold text-xs">Search</p>
            </button>
        </div>
    );
}
