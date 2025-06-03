import React from 'react';
import { FaLaptopCode, FaPaintBrush, FaChartLine, FaBullhorn, FaServer, FaDatabase, FaMobileAlt, FaShieldAlt } from 'react-icons/fa';

const careers = [
  {
    title: "Frontend Developer",
    description: "Designing and developing responsive user interfaces for web applications.",
    icon: <FaLaptopCode className="text-indigo-600 text-4xl mb-4" />
  },
  {
    title: "UI/UX Designer",
    description: "Crafting user-friendly interfaces and improving user experiences.",
    icon: <FaPaintBrush className="text-pink-500 text-4xl mb-4" />
  },
  {
    title: "Digital Marketer",
    description: "Promoting products through SEO, social media, and paid ads.",
    icon: <FaBullhorn className="text-orange-500 text-4xl mb-4" />
  },
  {
    title: "Data Analyst",
    description: "Analyzing data to extract insights and support decision making.",
    icon: <FaChartLine className="text-green-500 text-4xl mb-4" />
  },
  {
    title: "Backend Developer",
    description: "Building robust server-side logic and database interactions.",
    icon: <FaServer className="text-blue-500 text-4xl mb-4" />
  },
  {
    title: "Database Administrator",
    description: "Managing and maintaining database systems for performance.",
    icon: <FaDatabase className="text-red-500 text-4xl mb-4" />
  },
  {
    title: "Mobile Developer",
    description: "Creating mobile applications for Android and iOS platforms.",
    icon: <FaMobileAlt className="text-yellow-500 text-4xl mb-4" />
  },
  {
    title: "Cybersecurity Analyst",
    description: "Securing systems and protecting data from threats.",
    icon: <FaShieldAlt className="text-teal-500 text-4xl mb-4" />
  }
];

const CareerOptions = () => {
  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-3xl font-bold text-center mb-6">
  <span style={{ color: '#4B0082' }}>Find the Right Career</span>{' '} <br/>
  <span className="text-black">Path That Matches Your Skills</span>
</h2>
      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        Discover a variety of career paths in tech and creative industries.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-16">
        {careers.map((career, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-left transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div>{career.icon}</div>
            <h3 className="text-lg font-semibold mb-2 mt-2">{career.title}</h3>
            <p className="text-gray-600 text-sm">{career.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareerOptions;
