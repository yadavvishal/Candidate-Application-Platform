import React from "react";
import { Typography, Box } from '@mui/material';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';

/**
 * Component that displays basic job information including the company name,
 * job role, and location.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.companyName - The name of the company posting the job.
 * @param {string} props.jobRole - The role being offered.
 * @param {string} props.location - The location of the job.
 */
const JobInfo = ({ companyName, jobRole, location, imageUrl }) => {
    return (
        // Container box for layout, margin top is set for spacing from the previous elements.
        <Box sx={{ mt: 2 }} display={'flex'} flexDirection={"row"}>
            {/* Display the company name in a slightly larger and bold typography to make it stand out. */}
            <Box sx={{ width: '23%',height:'75%' }}>
                <img src={imageUrl} alt="Company Logo" style={{ width: '100%', height: '100%' ,borderRadius:3}} />
            </Box>
            <Box sx={{ width: '80%',marginLeft:1 }}>
                <Typography variant="h5" component="div" sx={{ fontSize: '1.2rem', color: "#7f8280", fontWeight: "700" }}>
                    {companyName}
                </Typography>
                {/* Display the job role, ensuring the first letter is capitalized and adding "Developer" if the role isn't "tech lead". */}
                <Typography component="div" sx={{ fontSize: '1rem', color: "#393b39", fontWeight: "500" }}>
                    {jobRole.charAt(0).toUpperCase() + jobRole.slice(1).toLowerCase()}  {jobRole.toLowerCase() !== "tech lead" ? "Developer" : ""}
                </Typography>
                {/* Location information is shown with an icon for visual emphasis. */}
                <Box display={"flex"} flexDirection={'row'} sx={{ alignItems: "center", fontSize: "0.8rem", marginLeft: '-2px' }}>
                    <RoomOutlinedIcon /> {/* Icon indicating the location. */}
                    <Typography
                        variant="body1"
                        color="#5e615f"
                        fontWeight={600}
                        sx={{ marginRight: '10px', fontSize: '0.9rem', marginLeft: '2px' }} // Correct margin to align text properly with the icon.
                    >
                        {location.charAt(0).toUpperCase() + location.slice(1).toLowerCase()} {/* Capitalizes the first letter of the location. */}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default JobInfo;  // Exporting JobInfo component for use in other parts of the application.
