import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import HourglassFullTwoToneIcon from '@mui/icons-material/HourglassFullTwoTone';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import JobInfo from './jobInfo';
import ApplyButton from '../shared/buttons/applyButton';
import ReferralButton from '../shared/buttons/referralButton';
import ScrollableComponent from '../shared/description/scrollableComponent';

// JobCard component renders details of a single job, intended to be used within a list of jobs.
const JobCard = ({ job }) => {
    // Calculate the number of days since the job posting, using job salary maximum as a random generator seed.
    const postedday = job.maxJdSalary % 30;
    // Calculate estimated salary range based on available data, providing different formats based on data availability.
    //basically using some basic techniques so that data can be distributed random and specific for posteddays and company
    
    // estimated_salary has some values as null . so depending upon data rendering salary 
    const estimated_salary = job.minJdSalary && job.maxJdSalary 
        ? `${job.minJdSalary}k - ${job.maxJdSalary}k ${job.salaryCurrencyCode}`
        : job.minJdSalary 
        ? `${job.minJdSalary}k ${job.salaryCurrencyCode} +`
        : job.maxJdSalary 
        ? `upto ${job.maxJdSalary}k ${job.salaryCurrencyCode}`
        : "As per industry Standards";
    
    return (
        <Card sx={{ margin: 2, boxShadow: 2, border: "1px solid #d7dbd8", borderRadius: 5 }}>  {/* Styling for the card with shadow, margin, and border. */}
            <CardContent>
                {/* Icon and text indicating how many days ago the job was posted. */}
                <Box sx={{ border: "2px solid #d7dbd8", borderRadius: 4, display: 'flex', flexDirection: 'row', alignItems: 'center', width: '50%', pl: 1 }} md={{ width: '40%' }}  xs={{width:'33%'}} >
                    <HourglassFullTwoToneIcon sx={{ fontSize: 13 }} />
                    <Typography sx={{ fontSize: 13 }}>Posted {postedday} days ago</Typography>
                </Box>
                {/* Job information component displaying company name, location, and role. */}
                <JobInfo companyName={job.companyName} location={job.location} jobRole={job.jobRole} imageUrl={job.logoUrl}/>
                {/* Box for salary information and verified icon. */}
                <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: 1,alignItems:"center" }}>
                    <Typography variant="body1" fontWeight={600} color="#5e615f" sx={{ backgroundColor: '#fff', fontSize: '1rem' }}>
                        Estimated Salary: {estimated_salary}
                    </Typography>
                    <VerifiedOutlinedIcon sx={{ fontSize: '1.2rem' }} />
                </Box>
                {/* Section for additional details about the company. */}
                <Typography variant="body2" sx={{ fontWeight: "550" }}>
                    About Company:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight:"800"}}>
                    About Us
                </Typography>
                {/* Scrollable text component for job details. */}
                <ScrollableComponent content={job.jobDetailsFromCompany}/>
                {/* Display minimum experience required for the job. */}
                <div sx={{ marginBottom: 2 }}>
                    <Typography variant="body1" fontWeight={600} color="#5e615f" sx={{ backgroundColor: '#fff', fontSize: '0.8rem' }}>
                        Minimum Experience
                    </Typography>
                    <Typography variant="body1" color="#fffff" sx={{ backgroundColor: '#fff', fontSize: '0.8rem', marginBottom: 2 }}>
                        {job.minExp ? job.minExp + " years" : "1+years"}
                    </Typography>
                </div>
                {/* Custom button components for applying to the job and seeking referrals. */}
                <ApplyButton />
                <ReferralButton />
            </CardContent>
        </Card>
    );
};

export default JobCard;
