import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[user,navigate])

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto min-h-[calc(100vh-64px)] px-4'>
                <form 
                    onSubmit={submitHandler} 
                    className='w-full max-w-md border border-gray-300 rounded-lg p-8 my-10 bg-white shadow-md'
                    noValidate
                >
                    <h1 className='font-extrabold text-2xl mb-6 text-center text-[#6300B3] cursor-pointer'>Sign Up</h1>

                    <div className='my-4'>
                        <Label className="block mb-2 font-medium text-gray-700">Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Enter Your Fullname"
                            required
                            className="border border-gray-300 focus:border-[#6300B3] focus:ring-2 focus:ring-[#6300B3]"
                        />
                    </div>

                    <div className='my-4'>
                        <Label className="block mb-2 font-medium text-gray-700">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter Your Email"
                            required
                            className="border border-gray-300 focus:border-[#6300B3] focus:ring-2 focus:ring-[#6300B3]"
                        />
                    </div>

                    <div className='my-4'>
                        <Label className="block mb-2 font-medium text-gray-700">Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="Enter Your Phone Number"
                            required
                            className="border border-gray-300 focus:border-[#6300B3] focus:ring-2 focus:ring-[#6300B3]"
                        />
                    </div>

                    <div className='my-4'>
                        <Label className="block mb-2 font-medium text-gray-700">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Minimum 8 characters"
                            required
                            className="border border-gray-300 focus:border-[#6300B3] focus:ring-2 focus:ring-[#6300B3]"
                        />
                    </div>

                    <div className='my-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6'>
                        <RadioGroup className="flex items-center gap-6">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    id="student"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                    required
                                />
                                <Label htmlFor="student" className="cursor-pointer select-none">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    id="recruiter"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="recruiter" className="cursor-pointer select-none">Recruiter</Label>
                            </div>
                        </RadioGroup>

                        <div className='flex items-center gap-3'>
                            <Label className="font-medium">Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer border border-gray-300 rounded px-2 py-1"
                            />
                        </div>
                    </div>

                    {
                        loading ? (
                            <Button
                                disabled
                                className="w-full py-3 flex justify-center items-center gap-2 bg-[#6300B3]/80 cursor-not-allowed"
                            >
                                <Loader2 className='h-5 w-5 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full py-3 bg-[#6300B3] hover:bg-[#5b30a6] text-white font-semibold transition-colors cursor-pointer"
                            >
                                Signup
                            </Button>
                        )
                    }
                    <p className='mt-6 text-center text-sm text-gray-600'>
                        Already have an account?{' '}
                        <Link to="/login" className='text-[#6300B3] hover:underline'>
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup
