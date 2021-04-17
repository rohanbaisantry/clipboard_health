import mongoose from "mongoose";
let Schema = mongoose.Schema;

let job = new Schema({
    hospital_name: String,
    main_job_title: String,
    required_skills: [String],
    county: String,
    zip: Number,
    location: String,
    nurse_patient_ratio: String,
    job_id: Number,
    type: String,
    work_schedule: String,
    hospital_id: Number,
    name: String,
    state: String,
    created: Date,
    required_credentials: [String],
    department: [String],
    address: String,
    experience: String,
    city: String,
    description: String,
    job_title: String,
    hours: [Number],
    salary_range: [Number],
    job_type: String,
});

job.index({
    hospital_name: "text",
    main_job_title: "text",
    required_skills: "text",
    type: "text",
    work_schedule: "text",
    name: "text",
    required_credentials: "text",
    department: "text",
    address: "text",
    experience: "text",
    city: "text",
    description: "text",
    job_title: "text",
});

const model = mongoose.models.jobs || mongoose.model("jobs", job);
export default model;
