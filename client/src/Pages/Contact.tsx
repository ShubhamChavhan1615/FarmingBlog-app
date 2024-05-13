// // import React from 'react';
// import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import Footer from '../Components/Footer';
// import Navbar from '../Components/Navbar';

// interface contactUsData {
//   name: string;
//   phoneNumber: number;
//   email: string;
//   company: string;
//   subject: string;
//   question: string;
// }

// function Contact() {
//   const navigate = useNavigate()
//   const handleSubmit = (data: contactUsData) => {
//     const jsonData = JSON.stringify(data);
//     // Define fetch options
//     const requestOptions = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: jsonData
//     };
//     // Perform POST request to the specified endpoint
//     fetch('http://localhost:4000/contact', requestOptions)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         // Redirect to home page
//         console.log(data);
//         navigate("/Contact");
//       })
//       .catch(error => {
//         // Handle errors
//         console.error('There was a problem with the request:', error);
//       });

//   }
//   return (
//     <>
//       <Navbar />
//       <div className="bg-gray-100 min-h-screen">
//         <div className="container mx-auto py-6">
//           <h1 className="text-4xl font-bold text-center mb-5 bg-cover p-3 bg-[url('https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D')] bg-no-repeat">Contact Us</h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="bg-white rounded-lg shadow-md p-8">
//               <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
//               <p className="text-gray-700 mb-6">We'd love to hear from you. Please fill out the form below and we will get back to you as soon as possible.</p>
//               <form onSubmit={(data) => handleSubmit(data)}>
//                 <div className="mb-4">
//                   <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name *</label>
//                   <input type="text" id="name" name="name" placeholder="Your Name" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" required />
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">Phone Number</label>
//                   <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="Your Phone Number" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Your Email *</label>
//                   <input type="email" id="email" name="email" placeholder="Your Email" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" required />
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="company" className="block text-gray-700 font-medium mb-2">Your Company</label>
//                   <input type="text" id="company" name="company" placeholder="Your Company" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject *</label>
//                   <input type="text" id="subject" name="subject" placeholder="Subject" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" required />
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="question" className="block text-gray-700 font-medium mb-2">Your Question *</label>
//                   <textarea id="question" name="question" placeholder="Your Question" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" required></textarea>
//                 </div>
//                 <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300">Submit</button>
//               </form>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-8 flex items-center">
//               <div className="w-full">
//                 <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
//                 <p className="text-gray-700 mb-2"><span className="font-medium">Address:</span> 123 Farming Street, Farmville</p>
//                 <p className="text-gray-700 mb-2"><span className="font-medium">Phone:</span> +91 9359720973</p>
//                 <p className="text-gray-700 mb-2"><span className="font-medium">Email:</span> info@example.com</p>
//                 <p className="text-gray-700 mb-2"><span className="font-medium">Hours:</span> Mon - Fri, 9:00 AM - 5:00 PM</p>
//                 <div className="flex gap-4 mt-4">
//                   {/* Social Media Icons */}
//                   <a href="https://facebook.com" className="text-gray-700 hover:text-blue-500"><FaFacebookF /></a>
//                   <a href="https://twitter.com" className="text-gray-700 hover:text-blue-500"><FaTwitter /></a>
//                   <a href="https://instagram.com" className="text-gray-700 hover:text-blue-500"><FaInstagram /></a>
//                   <a href="https://linkedin.com" className="text-gray-700 hover:text-blue-500"><FaLinkedinIn /></a>
//                   <a href="https://youtube.com" className="text-gray-700 hover:text-blue-500"><FaYoutube /></a>
//                 </div>
//                 {/* Useful Links */}
//                 <div className="mt-6">
//                   <h2 className="text-2xl font-semibold mb-4">Useful Links</h2>
//                   <ul className="list-disc pl-4">
//                     <li className="text-gray-700 mb-2"><a href="/farming-resources" className="text-blue-500 hover:underline">Farming Resources</a></li>
//                     <li className="text-gray-700 mb-2"><a href="/agriculture-organizations" className="text-blue-500 hover:underline">Agriculture Organizations</a></li>
//                     <li className="text-gray-700 mb-2"><a href="/farming-events" className="text-blue-500 hover:underline">Farming Events</a></li>
//                     <li className="text-gray-700 mb-2"><a href="/farming-forums" className="text-blue-500 hover:underline">Farming Forums</a></li>
//                     <li className="text-gray-700 mb-2"><a href="/farming-tools-and-equipment" className="text-blue-500 hover:underline">Farming Tools and Equipment</a></li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Contact;

import { FormEvent, useState } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

interface contactUsData {
  name: string;
  phoneNumber?: number; // Make phoneNumber optional since it's not required in the interface
  email: string;
  company?: string; // Make company optional since it's not required in the interface
  subject: string;
  question: string;
}

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<contactUsData>({
    name: '',
    email: '',
    subject: '',
    question: ''
  });

  const handleSubmit = async (data: contactUsData) => {
    try {
      const jsonData = JSON.stringify(data);
      // Define fetch options
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData
      };
      // Perform POST request to the specified endpoint
      const response = await fetch('http://localhost:4000/contact', requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log(responseData);
      // Redirect to home page or any other page after successful submission
      navigate("/Contact");
    } catch (error) {
      console.error('There was a problem with the request:', error);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(formData);
    navigate("/")
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto py-6">
          <h1 className="text-4xl font-bold text-center mb-5 bg-cover p-3 bg-[url('https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D')] bg-no-repeat">Contact Us</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <p className="text-gray-700 mb-6">We'd love to hear from you. Please fill out the form below and we will get back to you as soon as possible.</p>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name *</label>
                  <input type="text" id="name" name="name" placeholder="Your Name" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                  <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                  <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="Your Phone Number" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" value={formData.phoneNumber} onChange={handleChange} />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Your Email *</label>
                  <input type="email" id="email" name="email" placeholder="Your Email" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                  <label htmlFor="company" className="block text-gray-700 font-medium mb-2">Your Company</label>
                  <input type="text" id="company" name="company" placeholder="Your Company" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" value={formData.company} onChange={handleChange} />
                </div>
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject *</label>
                  <input type="text" id="subject" name="subject" placeholder="Subject" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" value={formData.subject} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                  <label htmlFor="question" className="block text-gray-700 font-medium mb-2">Your Question *</label>
                  <textarea id="question" name="question" placeholder="Your Question" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" value={formData.question} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300">Submit</button>
              </form>
            </div>
            {/* Add contact information section */}
            <div className="bg-white rounded-lg shadow-md p-8 flex items-center">
              <div className="w-full">
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <p className="text-gray-700 mb-2"><span className="font-medium">Address:</span> 123 Farming Street, Farmville</p>
                <p className="text-gray-700 mb-2"><span className="font-medium">Phone:</span> +91 9359720973</p>
                <p className="text-gray-700 mb-2"><span className="font-medium">Email:</span> info@example.com</p>
                <p className="text-gray-700 mb-2"><span className="font-medium">Hours:</span> Mon - Fri, 9:00 AM - 5:00 PM</p>
                <div className="flex gap-4 mt-4">
                  {/* Social Media Icons */}
                  <a href="https://facebook.com" className="text-gray-700 hover:text-blue-500"><FaFacebookF /></a>
                  <a href="https://twitter.com" className="text-gray-700 hover:text-blue-500"><FaTwitter /></a>
                  <a href="https://instagram.com" className="text-gray-700 hover:text-blue-500"><FaInstagram /></a>
                  <a href="https://linkedin.com" className="text-gray-700 hover:text-blue-500"><FaLinkedinIn /></a>
                  <a href="https://youtube.com" className="text-gray-700 hover:text-blue-500"><FaYoutube /></a>
                </div>
                {/* Useful Links */}
                <div className="mt-6">
                  <h2 className="text-2xl font-semibold mb-4">Useful Links</h2>
                  <ul className="list-disc pl-4">
                    <li className="text-gray-700 mb-2"><a href="/farming-resources" className="text-blue-500 hover:underline">Farming Resources</a></li>
                    <li className="text-gray-700 mb-2"><a href="/agriculture-organizations" className="text-blue-500 hover:underline">Agriculture Organizations</a></li>
                    <li className="text-gray-700 mb-2"><a href="/farming-events" className="text-blue-500 hover:underline">Farming Events</a></li>
                    <li className="text-gray-700 mb-2"><a href="/farming-forums" className="text-blue-500 hover:underline">Farming Forums</a></li>
                    <li className="text-gray-700 mb-2"><a href="/farming-tools-and-equipment" className="text-blue-500 hover:underline">Farming Tools and Equipment</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
