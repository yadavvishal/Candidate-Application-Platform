import React from 'react';
import { Box, TextField, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@mui/material';

/**
 * FilterInput Component: 
 * Renders a dynamic filter input based on the selected filter type.
 * 
 * Props:
 *  - selectedFilter (string): The currently selected filter key.
 *  - filters (object): The current filter state object.
 *  - handleFilterValueChange (function): Function to handle changes in text input filters.
 *  - handleWorkTypeChange (function): Function to handle changes in work type radio buttons.
 *  - filterOptions (array): An array of objects defining available filter options with key and name properties.
 */
const FilterInput = ({ selectedFilter, filters, handleFilterValueChange, handleWorkTypeChange, filterOptions }) => {
  // Render different input types based on the selected filter
  return (
    <Box sx={{ mb: 2 }}> {/* Add margin bottom for spacing */}
      {selectedFilter === 'workType' ? (
        <FormControl component="fieldset"> {/* Group radio buttons */}
          <FormLabel component="legend">Work Type</FormLabel> {/* Label for work type selection */}
          <RadioGroup
            row // Arrange radio buttons horizontally
            name="workType" // Name attribute for radio buttons
            value={filters.workType || ''} // Set initial value based on filter state
            onChange={handleWorkTypeChange} // Function to handle radio button changes
          >
            <FormControlLabel value="remote" control={<Radio />} label="Remote" /> {/* Remote option */}
            <FormControlLabel value="onsite" control={<Radio />} label="On-site" /> {/* On-site option */}
          </RadioGroup>
        </FormControl>
      ) : (
        <TextField
          fullWidth // Occupy full width of container
          type="text" // Text input field
          name={selectedFilter} // Name attribute for text field
          value={filters[selectedFilter] || ''} // Set initial value based on filter state
          onChange={handleFilterValueChange} // Function to handle text input changes
          label={`Enter ${filterOptions.find(opt => opt.key === selectedFilter)?.name}`} // Dynamic label based on filter option name
          variant="outlined" // Outlined text field style
        />
      )}
    </Box>
  );
};

export default FilterInput;
