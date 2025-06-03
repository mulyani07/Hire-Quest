import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
  console.log("Current searchedQuery:", searchedQuery);
  console.log("All Jobs:", allJobs.length);

  if (searchedQuery && searchedQuery !== "All Jobs") {
    const filteredJobs = allJobs.filter((job) => {
      return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.jobType.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        (job.general && job.general.toLowerCase().includes(searchedQuery.toLowerCase()))
    });
    setFilterJobs(filteredJobs);
  } else {
    setFilterJobs(allJobs); // inilah bagian yang akan jalan untuk "All Jobs"
  }
}, [allJobs, searchedQuery]);


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5 px-4'>
        <div className='flex gap-5'>
          {/* Filter Section */}
          <div className='w-[20%]'>
            <FilterCard />
          </div>

          {/* Jobs List Section */}
          {
            filterJobs.length === 0 ? (
              <img
  src="./src/images/notfound.png"  // Ganti path ini sesuai lokasi gambarmu
  alt="Job not found"
  className=" h-auto mx-auto"
/>

            ) : (
              <div 
                className='flex-1 h-[88vh] overflow-y-auto pb-5
                           bg-white rounded-2xl shadow-md border border-gray-200 p-6'
              >
                <div className='grid grid-cols-3 gap-6'>
                  {
                    filterJobs.map((job) => (
                      <motion.div
                        key={job._id}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Job job={job} />
                      </motion.div>
                    ))
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Jobs;
