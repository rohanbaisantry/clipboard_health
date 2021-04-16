import { createMocks } from "node-mocks-http";
import handlerFilter from "../../api/filters";

describe("/api/filters", () => {
    test("Get request returns 200 with success=true", async () => {
        const { req, res } = createMocks({
            method: "GET",
            query: {},
        });

        await handlerFilter(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(JSON.parse(res._getData())).toEqual(
            expect.objectContaining({
                success: true,
            })
        );
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
