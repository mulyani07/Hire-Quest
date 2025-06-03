import React from 'react';
import { FaUserPlus, FaSearch, FaFileUpload, FaBriefcase } from 'react-icons/fa';

const steps = [
  {
    title: "Create an Account",
    description: "Sign up for the job applicant profile, mention your qualifications, past experiences, and expertise, and scope your interests. Voilà! You're all set to find your dream jobs.",
    icon: <FaUserPlus className="text-orange-500 text-4xl mb-4" />
  },
  {
    title: "Search Job",
    description: "Once you set your job hunting parameters, you'll find many openings related to your career interest on the home page and even filter out some of the best job openings.",
    icon: <FaSearch className="text-purple-600 text-4xl mb-4" />
  },
  {
    title: "Upload CV/Resume",
    description: "From numerous job openings, shortlist the right-match vacancy to your profile and apply right after by uploading your CV/Resume and answering a couple of questions, if any.",
    icon: <FaFileUpload className="text-teal-500 text-4xl mb-4" />
  },
  {
    title: "Get Job",
    description: "After applying, wait for some time, schedule an interview, and if everything goes right, then get hired more quickly than traditional hiring methods.",
    icon: <FaBriefcase className="text-yellow-500 text-4xl mb-4" />
  }
];

const GetHiredSteps = () => {
  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-3xl font-bold mb-4">
        Get Hired in <span style={{ color: '#4B0082' }} className="font-bold">4 Quick Easy Steps</span>
      </h2>
      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        The quickest and most effective way to get hired by the top firm working in your career interest areas.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-16">
        {steps.map((step, index) => {
          const offsetClass =
            index % 2 === 0 ? "md:-translate-y-4" : "md:translate-y-4";

          return (
            <div
              key={index}
              className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 transform transition duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg ${offsetClass}`}
            >
              {step.icon}
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GetHiredSteps;
