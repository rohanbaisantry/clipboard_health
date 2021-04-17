const mockingoose = require("mockingoose");
import { createMocks } from "node-mocks-http";

import Job from "../../models/job";
import handleJob from "../../pages/api/jobs/[id]";

const jobMockedValue = {
    _id: "607acf7874309575ce7f80b0",
    hospital_name: "Mammoth Hospital",
    main_job_title: "LPN Charge Nurse",
    required_skills: [
        "Nutritional Assessment",
        "Safe disposal of waste, sharps, linen and equipment",
        "Ear Drops – Instillation",
        "Medication Administration: Intramuscular Injection (Child)",
        "Communication Skills in Mental Health Nursing",
    ],
    county: "Mono",
    zip: 93546,
    location: "37.64,-118.96",
    nurse_patient_ratio: "1:6",
    job_id: 3864,
    type: "General Acute Care",
    work_schedule: "Night shift",
    hospital_id: 757,
    name: "Mammoth Hospital",
    state: "CA",
    created: "2020-11-01T14:34:15.504Z",
    required_credentials: ["CNA - Certified Nursing Assistant", "CNM - Certified Nurse-Midwife"],
    department: [
        "Surgery",
        "Pathology & Laboratory Medicine",
        "Family Medicine",
        "Neurology",
        "Head and Neck Surgery",
    ],
    address: "85 Sierra Park Road",
    experience: "Junior",
    city: "Mammoth Lakes, CA",
    description: "Within the c",
    job_title: "RN Intensive Care Unit",
    hours: [8],
    salary_range: [39.09, 55.43],
    job_type: "Traveler",
};

describe("/api/jobs/[id]", () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });

    test("Get request returns 200 with success=true", async () => {
        const { req, res } = createMocks({
            method: "GET",
            query: {
                id: "607acf7874309575ce7f80b0",
            },
        });

        mockingoose(Job).toReturn(jobMockedValue, "findOne");
        await handleJob(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getData()).toBeDefined();
        expect(JSON.parse(res._getData())).toEqual({
            success: true,
            data: jobMockedValue,
        });
    });

    test("POST request returns 405 with success=false", async () => {
        const { req, res } = createMocks({
            method: "POST",
            query: {},
        });

        await handleJob(req, res);

        expect(res._getStatusCode()).toBe(405);
        expect(res._getData()).toBeDefined();
        expect(JSON.parse(res._getData())).toEqual(
            expect.objectContaining({
                success: false,
            })
        );
    });
});
