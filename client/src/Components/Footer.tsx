// import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <div className="bg-slate-900 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col px-8 gap-4">
          <h1 className="text-2xl font-bold mb-4">Important Links</h1>
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
          <Link to="/gallery" className="text-gray-300 hover:text-white">Gallery</Link>
          <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
          <Link to="/privacy-policy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
          <Link to="/terms-of-use" className="text-gray-300 hover:text-white">Terms of Use</Link>
        </div>

        <div className="flex flex-col px-8 gap-4">
          <h1 className="text-2xl font-bold mt-1 mb-4">Useful Links</h1>
          <Link to="/farming-resources" className="text-gray-300 hover:text-white">Farming Resources</Link>
          <Link to="/agriculture-organizations" className="text-gray-300 hover:text-white">Agriculture Organizations</Link>
          <Link to="/farming-events" className="text-gray-300 hover:text-white">Farming Events</Link>
          <Link to="/farming-forums" className="text-gray-300 hover:text-white">Farming Forums</Link>
          <Link to="/farming-tools-and-equipment" className="text-gray-300 hover:text-white">Farming Tools and Equipment</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold mb-4">Social Media</h1>
          <div className="flex gap-4">
            <a href="https://facebook.com" className="text-gray-300 hover:text-white"><FaFacebookF /></a>
            <a href="https://twitter.com" className="text-gray-300 hover:text-white"><FaTwitter /></a>
            <a href="https://instagram.com" className="text-gray-300 hover:text-white"><FaInstagram /></a>
            <a href="https://linkedin.com" className="text-gray-300 hover:text-white"><FaLinkedinIn /></a>
            <a href="https://youtube.com" className="text-gray-300 hover:text-white"><FaYoutube /></a>
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-4">Send a Newsletter</h1>
          <p className="text-gray-300 mb-4">Stay updated with our latest news and articles by subscribing to our newsletter.</p>
          <form>
            <input type="email" placeholder="Your email" className="bg-gray-800 text-white rounded-md px-4 py-2 mt-2" />
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white rounded-md px-5 ml-1 py-2 mt-2">Send Mail</button>
          </form>
        </div>
      </div>
      <div className="text-center bg-slate-700 mt-8">
        <p className="text-gray-400">&copy; {new Date().getFullYear()} Your Farming Blog. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
