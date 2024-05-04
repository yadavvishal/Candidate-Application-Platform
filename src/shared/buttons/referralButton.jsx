import React from "react";
import { Button, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

/**
 * ReferralButton renders a button designed for initiating referral requests.
 * It emphasizes the referral action through the use of dual AccountCircle icons.
 */
const ReferralButton = () => {
    return (
        // Button container with centered alignment and top margin for spacing
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            {/* Primary-colored button with custom purple background and rounded corners */}
            <Button variant="contained" color="primary" 
                style={{ backgroundColor: '#3e13eb', width: '100%', borderRadius: '10px' }}>
                {/* Inline flex container to align icons and text within the button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Container for AccountCircle icons, emphasizing the referral feature */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                        <AccountCircleIcon style={{ fontSize: '2rem' }} />
                        <AccountCircleIcon style={{ fontSize: '2rem' }} />
                    </div>
                    {/* Typography for button text, styled for visibility and non-capitalized text */}
                    <Typography style={{ fontSize: '0.8rem', color: 'white', textTransform: 'none' }}>
                        Unlock referral asks
                    </Typography>
                </div>
            </Button>
        </div>
    )
}

export default ReferralButton;
