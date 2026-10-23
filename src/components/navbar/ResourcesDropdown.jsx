import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, HelpCircle, MessageCircle, FileText, Shield } from 'lucide-react';

const ResourcesDropdown = () => {
  return (
    <div className="md:w-screen   bg-[#0a0b2e] md:p-8 shadow-lg z-50">
      <div className="md:grid flex flex-col gap-6  md:grid-cols-3 md:gap-0 md:p-6">
        {/* Learn Column */}
        <div className="md:border-r  pr-8">
          <h3 className="text-lg font-medium text-white mb-6">Learn</h3>
          <ul className="space-y-6">
            <li>
              <Link to="/about-us" className="flex items-center text-sm text-gray-300 hover:text-white">
                <BookOpen className="mr-3 text-gray-400" size={20} />
                <span>About Us</span>
              </Link>
            </li>
            <li>
              <Link to="/testimonies" className="flex items-center text-sm text-gray-300 hover:text-white">
                <Users className="mr-3 text-gray-400" size={20} />
                <span>Customer Testimonies</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Column */}
        <div className="md:border-r   md:px-8">
          <h3 className="text-lg font-medium text-white mb-6">Support</h3>
          <ul className="space-y-6">
            <li>
              <Link to="/faq" className="flex items-center text-sm text-gray-300 hover:text-white">
                <HelpCircle className="mr-3 text-gray-400" size={20} />
                <span>Frequently Asked Questions</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" className="flex items-center text-sm text-gray-300 hover:text-white">
                <MessageCircle className="mr-3 text-gray-400" size={20} />
                <span>Contact Us</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Security Column */}
        <div className="md:pl-8 ">
          <h3 className="text-lg font-medium text-white mb-6">Security</h3>
          <ul className="space-y-6">
            <li>
              <Link to="/terms" className="flex items-center text-sm text-gray-300 hover:text-white">
                <FileText className="mr-3 text-gray-400" size={20} />
                <span>Terms and Conditions</span>
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="flex items-center text-sm text-gray-300 hover:text-white">
                <Shield className="mr-3 text-gray-400" size={20} />
                <span>Privacy Policy</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResourcesDropdown;
