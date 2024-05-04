import React from 'react';
import JobsList from './jobComponents/jobList';
import Filters from './jobComponents/filters';
import { useState } from 'react';
function App() {
 // create filters so that any changes in filtering Text  we can pass them as props and according state mangement and filtering is done by reducers
  const [filters, setFilters] = useState({ location: '' ,jobRole:'',minExp:'',minJdSalary:'',workType:'',companyName:''});

  return (
    <div className="App">
      <Filters filters={filters} setFilters={setFilters} />
      <JobsList filters={filters} />
    </div>
  );
}

export default App;
