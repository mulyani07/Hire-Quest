import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto my-12 px-4">
        <div className="flex items-center gap-2 mb-8">
          <Input
            className="flex-grow rounded-md border border-gray-300 shadow-sm focus:border-[#6300B3] focus:ring focus:ring-[#6300B3]/40 transition"
            placeholder="Filter by name, role"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-[#6300B3] hover:bg-[#5b30a6] text-white px-5 py-2 rounded-md shadow-md transition-colors duration-300"
          >
            New Jobs
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  )
}

export default AdminJobs
