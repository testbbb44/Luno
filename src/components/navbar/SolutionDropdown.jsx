"use client";

import { useState } from "react";
import { ChevronRightIcon, UserIcon, BriefcaseIcon } from "lucide-react";
import { Link } from "react-router-dom";

const SolutionsDropdown = () => {
  const [activeTab, setActiveTab] = useState("user-type");

  return (
    <div className="md:w-screen md:p-10 bg-[#0a0b2e] shadow-lg z-50">
      <div className="flex ">
        {/* Sidebar */}
        <div className="max-w-56 hidden md:block flex-1 border-gray-700">
          <button
            onClick={() => setActiveTab("user-type")}
            className={`flex items-center rounded-md mb-4 justify-between w-full px-4 py-3 text-sm font-medium text-left transition-colors ${
              activeTab === "user-type"
               ? "text-gray-800  bg-white"
                  : "text-gray-300 hover:bg-white hover:text-black"
            }`}
          >
            <div className="flex items-center">
              <UserIcon className="mr-3" size={18} />
              User Type
            </div>
            <ChevronRightIcon size={16} />
          </button>

          <button
            onClick={() => setActiveTab("use-cases")}
            className={`flex items-center rounded-md justify-between w-full px-4 py-3 text-sm font-medium text-left transition-colors ${
              activeTab === "use-cases"
             ? "text-gray-800  bg-white"
                  : "text-gray-300 hover:bg-white hover:text-black"
            }`}
          >
            <div className="flex items-center">
              <BriefcaseIcon className="mr-3" size={18} />
              Use Cases
            </div>
            <ChevronRightIcon size={16} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 hidden md:block md:pr-6 md:border-l md:ml-6 md:px-6">
          {activeTab === "user-type" ? (
            <div className="grid grid-cols-3 gap-6">
              {/* Freelancers */}
              <Link to="freelancer-solutions" className="bg-[#0a0b2e] border border-gray-700 rounded-lg p-6 cursor-pointer">
                <h3 className="text-xl font-medium text-white mb-4">
                  Freelancers
                </h3>
                <p className="text-gray-300 mb-6">
                  Manage all work contracts, generate invoices, track time and
                  projects, and get paid faster
                </p>
              </Link>

              {/* Agencies & Small Teams */}
              <Link to="agencies-solutions" className="bg-[#0a0b2e] border border-gray-700 rounded-lg p-6 cursor-pointer">
                <h3 className="text-xl font-medium text-white mb-4">
                  Agencies & Small Teams
                </h3>
                <p className="text-gray-300 mb-6">
                  Collaborate efficiently, manage multiple projects and clients,
                  and streamline all payments.
                </p>
              </Link>

              {/* Individuals & Clients */}
              <Link to="individuals-solutions" className="bg-[#0a0b2e] border border-gray-700 rounded-lg p-6 cursor-pointer">
                <h3 className="text-xl font-medium text-white mb-4">
                  Individuals & Clients
                </h3>
                <p className="text-gray-300 mb-6">
                  Use Fivani for one-time contracts, project tracking, or
                  payment management
                </p>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {/* Contract & Legal Management */}
              <div className="bg-[#0a0b2e] border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-medium text-white mb-4">
                  Contract & Legal Management
                </h3>
                <p className="text-gray-300 mb-6">
                  Create, sign, and store legally binding contracts.
                </p>
              </div>

              {/* Project & Task Management */}
              <div className="bg-[#0a0b2e] border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-medium text-white mb-4">
                  Project & Task Management
                </h3>
                <p className="text-gray-300 mb-6">
                  Organize workflows, assign tasks, and track real-time
                  progress.
                </p>
              </div>

              {/* Time Tracking & Productivity */}
              <div className="bg-[#0a0b2e] border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-medium text-white mb-4">
                  Time Tracking & Productivity
                </h3>
                <p className="text-gray-300 mb-6">
                  Log hours, set billable rates, and generate invoices
                  seamlessly.
                </p>
              </div>

              {/* Payments & Financial Control */}
              <div className="bg-[#0a0b2e] border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-medium text-white mb-4">
                  Payments & Financial Control
                </h3>
                <p className="text-gray-300 mb-6">
                  Send invoices, request payments, and track transactions
                  effortlessly.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className=" block md:hidden flex-1  md:pr-6 md:border-l md:ml-6 md:px-6">
         
            <div className=" flex mb-4 flex-col gap-4">
              {/* Freelancers */}
              <Link to="freelancer-solutions" className="bg-[#0a0b2e] border border-gray-700 rounded-lg p-6 cursor-pointer">
                <h3 className="text-xl font-medium text-white mb-4">
                  Freelancers
                </h3>
                <p className="text-gray-300 mb-6">
                  Manage all work contracts, generate invoices, track time and
                  projects, and get paid faster
                </p>
              </Link>

              {/* Agencies & Small Teams */}
              <Link to="agencies-solutions" className="bg-[#0a0b2e] border border-gray-700 rounded-lg p-6 cursor-pointer">
                <h3 className="text-xl font-medium text-white mb-4">
                  Agencies & Small Teams
                </h3>
                <p className="text-gray-300 mb-6">
                  Collaborate efficiently, manage multiple projects and clients,
                  and streamline all payments.
                </p>
              </Link>

              {/* Individuals & Clients */}
              <Link to="individuals-solutions" className="bg-[#0a0b2e] border border-gray-700 rounded-lg p-6 cursor-pointer">
                <h3 className="text-xl font-medium text-white mb-4">
                  Individuals & Clients
                </h3>
                <p className="text-gray-300 mb-6">
                  Use Fivani for one-time contracts, project tracking, or
                  payment management
                </p>
              </Link>
            </div>
         
            <div className="flex flex-col gap-4">
              {/* Contract & Legal Management */}
              <div className="bg-[#0a0b2e] border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-medium text-white mb-4">
                  Contract & Legal Management
                </h3>
                <p className="text-gray-300 mb-6">
                  Create, sign, and store legally binding contracts.
                </p>
              </div>

              {/* Project & Task Management */}
              <div className="bg-[#0a0b2e] border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-medium text-white mb-4">
                  Project & Task Management
                </h3>
                <p className="text-gray-300 mb-6">
                  Organize workflows, assign tasks, and track real-time
                  progress.
                </p>
              </div>

              {/* Time Tracking & Productivity */}
              <div className="bg-[#0a0b2e] border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-medium text-white mb-4">
                  Time Tracking & Productivity
                </h3>
                <p className="text-gray-300 mb-6">
                  Log hours, set billable rates, and generate invoices
                  seamlessly.
                </p>
              </div>

              {/* Payments & Financial Control */}
              <div className="bg-[#0a0b2e] border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-medium text-white mb-4">
                  Payments & Financial Control
                </h3>
                <p className="text-gray-300 mb-6">
                  Send invoices, request payments, and track transactions
                  effortlessly.
                </p>
              </div>
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default SolutionsDropdown;
