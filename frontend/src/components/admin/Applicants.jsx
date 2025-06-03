import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const { applicants } = useSelector(store => store.application)

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true })
                dispatch(setAllApplicants(res.data.job))
            } catch (error) {
                console.error(error)
            }
        }
        fetchAllApplicants()
    }, [dispatch, params.id])

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="max-w-7xl mx-auto my-12 p-8 bg-white rounded-xl shadow-lg border border-gray-300">
                <header className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        Applicants <span className="text-indigo-600">({applicants?.applications?.length || 0})</span>
                    </h1>
                </header>
                <section>
                    <ApplicantsTable />
                </section>
            </main>
        </div>
    )
}

export default Applicants
