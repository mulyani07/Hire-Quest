import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-10">
                <div className="mb-8">
                    <h1 className="font-bold text-3xl text-[#6300B3] mb-2">Your Company Name</h1>
                    <p className="text-gray-600 text-sm max-w-lg">
                        What would you like to give your company name? You can change this later.
                    </p>
                </div>

                <Label htmlFor="company-name" className="font-semibold mb-1 block">Company Name</Label>
                <Input
                    id="company-name"
                    type="text"
                    className="my-2"
                    placeholder="Job Hunt, Microsoft etc."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />

                <div className="flex items-center gap-4 mt-12">
                    <Button
                        variant="outline"
                        onClick={() => navigate("/admin/companies")}
                        className="px-6 py-2 rounded-md border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={registerNewCompany}
                        className="bg-[#6300B3] hover:bg-[#5b30a6] text-white px-6 py-2 rounded-md transition-colors duration-300"
                        disabled={!companyName.trim()}
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate
