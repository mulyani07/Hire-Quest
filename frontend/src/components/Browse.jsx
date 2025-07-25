import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto my-10 px-4">
        <h1 className="font-bold text-2xl mb-8 text-[#4B0082]">
          Search Results ({allJobs.length})
        </h1>

        <div
          className="bg-white rounded-2xl shadow-md border border-gray-200 p-6"
          style={{ minHeight: '60vh' }}
        >
          {
            allJobs.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">No jobs found.</p>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {allJobs.map((job) => (
                  <Job key={job._id} job={job} />
                ))}
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Browse;
