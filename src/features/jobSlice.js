import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Asynchronous thunk for fetching jobs
export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async ({ offset,filters }, { getState }) => {
        //creating headers for fetching Apis 
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const body = JSON.stringify({
            "limit": 10,
            "offset": offset,
            ...filters

        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body
        };
        //calling Api by using REACT_APP_API_BASE from .env file to not show actual api
        const apiUrl = process.env.REACT_APP_API_BASE;
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        return data.jdList;
    }
);

const initialState = {
    //create initial states to store the data and state while calling in jobList.jsx
    allJobs: [],
    visibleJobs: [],
    isLoading: false,
    hasMore: true,
    filter: {
        location: '',
        jobRole: '',
        minExp: null,
        minJdSalary: null,
        workType: '',
        companyName:''
    }
};

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    //creation of Reducers for filtering
    reducers: {
        setFilteredJobs: (state, action) => {
            //getting data from filters which is disspatched from jobList.jsx
            const { location, jobRole, minExp, minJdSalary, workType,companyName } = action.payload;
            // getting all the data passed into state for filtering
            state.filter = { location: location.toLowerCase(), jobRole: jobRole.toLowerCase(), minExp: minExp, minJdSalary: minJdSalary, workType: workType,companyName: companyName.toLowerCase() }
            state.visibleJobs = state.allJobs.filter(job => {// matching all the condtions for filtering
                const jobLocationMatches = job.location.toLowerCase().includes(state.filter.location);
                const jobRoleMatches = job.jobRole.toLowerCase().includes(state.filter.jobRole);
                //matching the minExp and null case
                const minExpMatches = state.filter.minExp ? job.minExp >= state.filter.minExp : true;
                //handling the minimumSalary and null case
                const minSalaryMatches = state.filter.minJdSalary ? job.minJdSalary >= state.filter.minJdSalary : true;
                const nameOfCompanyMatches =job.companyName.toLowerCase().includes(state.filter.companyName);
                let workTypeMatches = true; // Assume all jobs match initially
                if (state.filter.workType === 'remote') {
                    workTypeMatches = job.location.toLowerCase() === 'remote';
                } else if (state.filter.workType === 'onsite') {
                    workTypeMatches = job.location.toLowerCase() !== 'remote';
                }
                return jobLocationMatches && jobRoleMatches && minExpMatches && minSalaryMatches && workTypeMatches  && nameOfCompanyMatches;

            });
        },

    },
    extraReducers: (builder) => {
        builder
            //adding extra reducers ,
            //pending for if no data is loaded till now or during firstTime rendering of Project or onRefreshing
            .addCase(fetchJobs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => { //fetching data when givendata is whole rendered so new data can be fetched
                state.allJobs = [...state.allJobs, ...action.payload];
                state.visibleJobs = state.allJobs.filter(job => {// matching all the condtions for filtering as above reducers
                    const jobLocationMatches = job.location.toLowerCase().includes(state.filter.location);
                    const jobRoleMatches = job.jobRole.toLowerCase().includes(state.filter.jobRole);
                    const minExpMatches = state.filter.minExp ? job.minExp >= state.filter.minExp : true;
                    const minSalaryMatches = state.filter.minJdSalary ? job.minJdSalary >= state.filter.minJdSalary : true;
                    const nameOfCompanyMatches =job.companyName.toLowerCase().includes(state.filter.companyName);
                    let workTypeMatches = true; // Assume all jobs match initially
                    if (state.filter.workType === 'remote') {
                        workTypeMatches = job.location.toLowerCase() === 'remote';
                    } else if (state.filter.workType === 'onsite') {
                        workTypeMatches = job.location.toLowerCase() !== 'remote';
                    }
                    return jobLocationMatches && jobRoleMatches && minExpMatches && minSalaryMatches && workTypeMatches && nameOfCompanyMatches; 

                }
                );
                state.hasMore = action.payload.length > 0;
                state.isLoading = false;
            })
            .addCase(fetchJobs.rejected, (state) => {
                state.isLoading = false;
            });
    },
});
//exporting the reducers for use
export const { setFilteredJobs } = jobsSlice.actions;
export default jobsSlice.reducer;
