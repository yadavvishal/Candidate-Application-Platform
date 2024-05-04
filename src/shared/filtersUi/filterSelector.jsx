import React from 'react';
import { FormControl, FormLabel, MenuItem, Select } from '@mui/material';

/**
 * FilterSelector provides a dropdown menu for selecting different job filters.
 * It is designed to be reusable and configurable based on the filter options provided.
 * 
 * @param {Object} props - Component props
 * @param {string} props.selectedFilter - Currently selected filter type
 * @param {Function} props.handleFilterTypeChange - Handler function to update the selected filter type
 * @param {Array} props.filterOptions - Array of filter options to display
 */
const FilterSelector = ({ selectedFilter, handleFilterTypeChange, filterOptions }) => {
  return (
    // FormControl component used for full-width form control with proper margin and padding
    <FormControl fullWidth>
      {/* FormLabel for accessibility and usability, providing a label for the dropdown */}
      <FormLabel>Filter by:</FormLabel>
      {/* Select component for choosing from available filter options */}
      <Select
        value={selectedFilter} // Currently selected value
        onChange={handleFilterTypeChange} // Function to call when the selected value changes
        displayEmpty // Allows the display of a placeholder or empty selection option
        inputProps={{ 'aria-label': 'Without label' }} // Accessibility label for screen readers
      >
        {/* MenuItem for 'no selection' state with emphasis */}
        <MenuItem value="">
          <em>Select a filter</em>
        </MenuItem>
        {/* Dynamic generation of MenuItem components for each filter option */}
        {filterOptions.map(option => (
          <MenuItem key={option.key} value={option.key}>{option.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterSelector;
