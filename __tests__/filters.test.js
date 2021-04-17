const mockingoose = require("mockingoose");
import { createMocks } from "node-mocks-http";

import handlerFilter from "../pages/api/filters";
import Filter from "../models/filter";

describe("/api/filters", () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });

    test("Get request returns 200 with success=true", async () => {
        const { req, res } = createMocks({
            method: "GET",
            query: {},
        });

        const mockedValue = [
            {
                _id: "607acf7874309575ce7f80b0",
                name: "new",
                options: [{ key: "filter1", doc_count: 20 }],
            },
        ];
        mockingoose(Filter).toReturn(mockedValue, "find");
        await handlerFilter(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getData()).toBeDefined();
        expect(JSON.parse(res._getData())).toEqual({
            success: true,
            data: mockedValue,
        });
    });
});
test("POST request returns 405 with success=false", async () => {
    const { req, res } = createMocks({
        method: "POST",
        query: {},
    });

    await handlerFilter(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
            success: false,
        })
    );
});
