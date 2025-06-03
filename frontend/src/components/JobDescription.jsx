import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { setSingleJob } from '../redux/jobSlice';
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-5xl mx-auto my-10 px-4'>
            <div className='bg-white p-6 rounded-xl shadow-md'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
                    <div>
                        <h1 className='text-2xl font-bold text-gray-800'>{singleJob?.title}</h1>
                        <div className='flex flex-wrap items-center gap-2 mt-3'>
                            <Badge className='text-blue-700 font-semibold' variant="outline">{singleJob?.position} Positions</Badge>
                            <Badge className='text-[#F83002] font-semibold' variant="outline">{singleJob?.jobType}</Badge>
                            <Badge className='text-[#7209B7] font-semibold' variant="outline">${singleJob?.salary} </Badge>
                        </div>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`w-full md:w-auto rounded-lg text-white font-semibold px-6 py-2 transition-all ${isApplied
                            ? 'bg-gray-500 cursor-not-allowed'
                            : 'bg-[#7209B7] hover:bg-[#5f3aad] cursor-pointer'
                            }`}>
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>

                <div className='mt-6'>
                    <h2 className='text-lg font-semibold text-gray-700 border-b pb-2 border-gray-200 mb-4'>
                        Job Description
                    </h2>
                    <div className='space-y-3 text-sm text-gray-800'>
                        <div><span className='font-medium'>Role:</span> <span className='pl-2'>{singleJob?.title}</span></div>
                        <div><span className='font-medium'>Location:</span> <span className='pl-2'>{singleJob?.location}</span></div>
                        <div>
                            <span className='font-medium'>Description:</span>
                            <p className='pl-2 mt-1 whitespace-pre-line'>{singleJob?.description}</p>
                        </div>
                        <div><span className='font-medium'>Experience Level:</span> <span className='pl-2'>{singleJob?.experienceLevel} years</span></div>
                        <div><span className='font-medium'>Salary:</span> <span className='pl-2'>${singleJob?.salary} </span></div>
                        <div><span className='font-medium'>Total Applicants:</span> <span className='pl-2'>{singleJob?.applications?.length}</span></div>
                        <div><span className='font-medium'>Posted Date:</span> <span className='pl-2'>{singleJob?.createdAt?.split("T")[0]}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobDescription;
