import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto my-8 px-4">
        {/* Profile Card */}
        <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-8 space-y-6">
          
          {/* Header: Avatar + Name + Bio */}
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24 ring-4 ring-[#4B0082]">
                <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-[#4B0082]">{user?.fullname}</h1>
                <p className="text-sm text-gray-600 mt-1">
                  {user?.profile?.bio || 'No bio available'}
                </p>
              </div>
            </div>
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="border-[#4B0082] text-[#4B0082] hover:bg-[#4B0082]/10"
            >
              <Pen className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#4B0082]" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Contact className="h-4 w-4 text-[#4B0082]" />
              <span>{user?.phoneNumber}</span>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-md font-semibold text-gray-800 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {
                user?.profile?.skills?.length > 0
                  ? user.profile.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      className="bg-[#32CD32]/10 text-[#32CD32] border-[#32CD32]/20"
                    >
                      {skill}
                    </Badge>
                  ))
                  : <span className="text-sm text-gray-500">NA</span>
              }
            </div>
          </div>

          {/* Resume */}
          <div>
            <Label className="text-md font-semibold text-gray-800">Resume</Label>
            <div className="mt-1">
              {
                isResume && user?.profile?.resume
                  ? <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={user.profile.resume}
                      className="text-[#4B0082] text-sm hover:underline break-all"
                    >
                      {user.profile.resumeOriginalName || 'View Resume'}
                    </a>
                  : <span className="text-sm text-gray-500">NA</span>
              }
            </div>
          </div>
        </div>

        {/* Applied Jobs */}
        <div className="mt-10 bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <h2 className="text-lg font-bold text-[#4B0082] mb-4">Applied Jobs</h2>
          <AppliedJobTable />
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
