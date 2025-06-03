import React from 'react'
import LatestJobsCards from './LatestJobsCards'
import { useSelector } from 'react-redux'

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold mb-8 text-left">
          <span className="text-[#6300B3]">Latest & Top</span>{' '}
          <span className="text-black">Job Openings</span>
        </h2>

        {allJobs.length <= 0 ? (
          <p className="text-center text-gray-500">No Job Available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {allJobs.slice(0, 6).map((job) => (
              <div
                key={job._id}
                className="h-full transform transition duration-300 hover:scale-105 hover:shadow-lg"
              >
                <LatestJobsCards job={job} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default LatestJobs
