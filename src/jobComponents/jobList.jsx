import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobs, setFilteredJobs } from '../features/jobSlice.js';
import JobCard from './jobCard.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Grid, Box } from '@mui/material';

// Component to display a list of jobs with infinite scrolling capability.
const JobsList = ({ filters }) => {
    // Accessing state from the Redux store.
    const { visibleJobs, isLoading, hasMore } = useSelector(state => state.jobs);
    // Initializing dispatch to invoke Redux actions.
    const dispatch = useDispatch();
    // useRef to hold the reference to the scrollable container for infinite scrolling.
    const scrollRef = useRef(null);

    // Fetch jobs based on current filters whenever the component mounts or filters change.
    useEffect(() => {
        //console.log(visibleJobs); // Log current visible jobs for debugging.
        dispatch(fetchJobs({ offset: 0, ...filters })); // Fetch initial jobs with offset as 0.
        console.log(visibleJobs);
        dispatch(setFilteredJobs(filters)); // Set filtered jobs based on provided filters.
    }, [dispatch, filters]);

    // Function to fetch more jobs when user reaches the end of the scroll.
    const fetchMoreJobs = () => {
        // Check if there are more jobs to load and if not currently loading.
        if (hasMore && !isLoading) {
            
            dispatch(fetchJobs({ offset: visibleJobs.length, ...filters })); // Fetch additional jobs.
        }
    };

    // Render the jobs list with infinite scrolling.
    return (
        <div ref={scrollRef}> {/* Attach ref to the div to monitor its scroll position */}
            {isLoading && visibleJobs.length === 0 ? ( // Display loading message when fetching initial jobs.
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <h4>Loading...</h4>
                </Box>
            ) : (
                <InfiniteScroll
                    dataLength={visibleJobs.length} // Number of items currently loaded.
                    next={fetchMoreJobs} // Function to load more items.
                    hasMore={hasMore} // Boolean to indicate if there are more items to load.
                    loader={<Box textAlign="center"><h4>Loading more...</h4></Box>} // Loader to show while loading more items.
                    scrollableTarget={scrollRef} // Reference to the scrollable container.
                    endMessage={ // Message to display when all items have been loaded.
                        <p style={{ textAlign: 'center' }}>
                            <b>You have seen it all</b>
                        </p>
                    }
                >
                  {/* //Container to wrap the grid layout. */}
                    <Container sx={{ mt: 3, mb: 3 }}> 
                        <Grid container spacing={3}> 
                            {visibleJobs.map((job, index) => ( // Map through visible jobs and render JobCard for each.
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <JobCard job={job} />
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </InfiniteScroll>
            )}
        </div>
    );
};

export default JobsList;
