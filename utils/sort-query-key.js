export function getSortByQueryKey(key) {
    return "sort_by__" + key;
}

export function getKeyFromQuery(key) {
    return key.replace("sort_by__", "");
}
