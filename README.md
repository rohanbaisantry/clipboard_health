## This is a NextJS App which uses TailwindCSS, Mongoose and MongoDB

```

To start your local mongo db server:

- docker-compose up


To run the development server:

- npm install
- npm run dev
Open http://localhost:3000 with your browser to see the result.


To run the production server locally:

- export apiURL=http://localhost:3000/api
- export MONGODB_URI=mongodb://0.0.0.0:27017/clipboard_health
- npm install
- npm run build
- npm run start
Open http://localhost:3000 with your browser to see the result.


To run the tests:

- npm install
- npm run test
Test results will be show in the same terminal.

```

#### Client URLs:

-   "/" -> GET -> Job Search
-   "/jobs/[id] -> GET -> Specific Job Details

#### APIs:

-   "/api/filters" -> GET -> Get all filters
-   "/api/jobs" -> GET -> Get all jobs satisfying the filter & search criteria and return a sorted list of jobs based on the sort parameters passed.
-   "/api/jobs/[id]" -> GET -> get specific job details using the job's ID
-   "/api/reset-db" -> POST -> This will reset your MongoDB using the files in "/data"

#### Notes

I am using Mongo's text search for the search option in the application, and hence, if you you search for "Urology Nurse Practitioner" it will match jobs which contain the words "Urology", "Nurse" & "Practitioner" in full in the respect fields which have "text" indexes.

For mocking mongoose in testing I have used the package "mockingoose"
