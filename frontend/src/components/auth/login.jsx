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
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  })
  const { loading, user } = useSelector(store => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto min-h-[calc(100vh-64px)] px-4'>
        <form
          onSubmit={submitHandler}
          className='w-full max-w-md border border-gray-300 rounded-lg p-8 my-10 bg-white shadow-md'
          noValidate
        >
          <h1 className='font-extrabold text-2xl mb-6 text-center text-[#6300B3] cursor-pointer'>Login</h1>

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

          <div className='my-6'>
            <RadioGroup className="flex gap-6">
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
          </div>

          {loading ? (
            <Button
              disabled
              className="w-full py-3 flex justify-center items-center gap-2 bg-[#6300B3]/80 cursor-pointer"
            >
              <Loader2 className='h-5 w-5 animate-spin' /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full py-3 bg-[#6300B3] hover:bg-[#5b30a6] text-white font-semibold transition-colors cursor-pointer"
            >
              Login
            </Button>
          )}

          <p className='mt-6 text-center text-sm text-gray-600'>
            Don't have an account?{' '}
            <Link to="/signup" className='text-[#6300B3] hover:underline'>
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
