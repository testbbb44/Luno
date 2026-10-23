"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRightIcon, CheckIcon } from "lucide-react";

const ProductsDropdown = () => {
  const [activeTab, setActiveTab] = useState("capabilities");

  const navigate = useNavigate();

  return (
    <div className="md:w-screen  md:p-8 bg-[#0a0b2e]  shadow-lg z-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="max-w-56 hidden md:block flex-1 border-gray-700">
          <button
            onClick={() => setActiveTab("capabilities")}
            className={`flex items-center rounded-md mb-4 justify-between w-full px-4 py-3 text-sm font-medium text-left transition-colors ${
              activeTab === "capabilities"
                ? "text-gray-800  bg-white"
                : "text-gray-300 hover:bg-white hover:text-black"
            }`}
          >
            <div className="flex items-center">
              <span className="mr-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 8.5C22 12.09 19.09 15 15.5 15C15.33 15 15.15 14.99 14.98 14.98C14.73 11.81 12.19 9.26 9.02 9.01C9.01 8.85 9 8.67 9 8.5C9 4.91 11.91 2 15.5 2C19.09 2 22 4.91 22 8.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 15.5C15 19.09 12.09 22 8.5 22C4.91 22 2 19.09 2 15.5C2 11.91 4.91 9 8.5 9C8.67 9 8.85 9.01 9.02 9.02C12.19 9.27 14.73 11.82 14.98 14.98C14.99 15.15 15 15.33 15 15.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Capabilities
            </div>
            <ChevronRightIcon size={16} />
          </button>

          <button
            onClick={() => setActiveTab("features")}
            className={`flex items-center rounded-md mb-4 justify-between w-full px-4 py-3 text-sm font-medium text-left transition-colors ${
              activeTab === "features"
                ? "text-gray-800  bg-white"
                : "text-gray-300 hover:bg-white hover:text-black"
            }`}
          >
            <div className="flex items-center">
              <span className="mr-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.67 18.95L7.6 15.64C8.39 15.11 9.53 15.17 10.24 15.78L10.57 16.07C11.35 16.74 12.61 16.74 13.39 16.07L17.55 12.5C18.33 11.83 19.59 11.83 20.37 12.5L22 13.9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Features
            </div>
            <ChevronRightIcon size={16} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1  md:border-l md:ml-10  md:p-6">
          {activeTab === "capabilities" ? (
            <div className="  flex flex-wrap md:grid md:grid-cols-4 gap-8">
              {/* AI Contract Generation */}
              <div className=" w-full">
                <h3 className="text-lg font-medium text-white mb-4">
                  AI Contract Generation
                </h3>
                <ul className="space-y-4">
                  <li>
                    <div
                      onClick={() => navigate("/contract-builder")}
                      // to="/contract-builder"
                      className="flex items-center text-sm text-gray-300 hover:text-white"
                    >
                      <span className="mr-3 text-gray-400">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      Smart Contract Builder 
                    </div>
                  </li>
                  <li>
                    <Link
                      to="/contract-generation"
                      className="flex items-center text-sm text-gray-300 hover:text-white"
                    >
                      <span className="mr-3 text-gray-400">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.99998 3H8.99998C7.04998 8.84 7.04998 15.16 8.99998 21H7.99998"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15 3C16.95 8.84 16.95 15.16 15 21"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3 9.0001C8.84 7.0501 15.16 7.0501 21 9.0001"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      E-Signature Integration
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/templates"
                      className="flex items-center text-sm text-gray-300 hover:text-white"
                    >
                      <span className="mr-3 text-gray-400">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7 13H13"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7 17H11"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      Template Library
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Payment Management */}
              <div className=" w-full">
                <h3 className="text-lg font-medium text-white mb-4">
                  Payment Management
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="/payment-management"
                      className="flex items-center text-sm text-gray-300 hover:text-white"
                    >
                      <span className="mr-3 text-gray-400">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 8.5H14.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6 16.5H8"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10.5 16.5H14.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 11.03V16.11C22 19.62 21.11 20.5 17.56 20.5H6.44C2.89 20.5 2 19.62 2 16.11V7.89C2 4.38 2.89 3.5 6.44 3.5H14.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M20 8V3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17.5 5.5L20 3L22.5 5.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      Automated Invoicing
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/payment-tracking"
                      className="flex items-center text-sm text-gray-300 hover:text-white"
                    >
                      <span className="mr-3 text-gray-400">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.5 13.75C9.5 14.72 10.25 15.5 11.17 15.5H13.05C13.85 15.5 14.5 14.82 14.5 13.97C14.5 13.06 14.1 12.73 13.51 12.52L10.5 11.47C9.91 11.26 9.51001 10.94 9.51001 10.02C9.51001 9.18 10.16 8.49001 10.96 8.49001H12.84C13.76 8.49001 14.51 9.27001 14.51 10.24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 7.5V16.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17 3V7H21"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 2L17 7"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      Payment Tracking
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/recurring-billing"
                      className="flex items-center text-sm text-gray-300 hover:text-white"
                    >
                      <span className="mr-3 text-gray-400">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 8.5H14.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6 16.5H8"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10.5 16.5H14.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 14.03V16.11C22 19.62 21.11 20.5 17.56 20.5H6.44C2.89 20.5 2 19.62 2 16.11V7.89C2 4.38 2.89 3.5 6.44 3.5H14.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M20 3V11"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17 6L20 3L23 6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      Recurring Billing
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Project Management */}
              <div className=" w-full">
                <h3 className="text-lg font-medium text-white mb-4">
                  Project Management
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="/project_management"
                      className="flex items-center text-sm text-gray-300 hover:text-white"
                    >
                      <span className="mr-3 text-gray-400">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.9 13.5H4.1C2.6 13.5 2 14.14 2 15.73V19.77C2 21.36 2.6 22 4.1 22H19.9C21.4 22 22 21.36 22 19.77V15.73C22 14.14 21.4 13.5 19.9 13.5Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19.9 2H4.1C2.6 2 2 2.64 2 4.23V8.27C2 9.86 2.6 10.5 4.1 10.5H19.9C21.4 10.5 22 9.86 22 8.27V4.23C22 2.64 21.4 2 19.9 2Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      Task & Project Board
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/time-tracking"
                      className="flex items-center text-sm text-gray-300 hover:text-white"
                    >
                      <span className="mr-3 text-gray-400">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.71 15.18L12.61 13.33C12.07 13.01 11.63 12.24 11.63 11.61V7.51001"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      Time Tracking
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/reminders"
                      className="flex items-center text-sm text-gray-300 hover:text-white"
                    >
                      <span className="mr-3 text-gray-400">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.02 2.91C8.71 2.91 6.02 5.6 6.02 8.91V11.8C6.02 12.41 5.76 13.34 5.45 13.86L4.3 15.77C3.59 16.95 4.08 18.26 5.38 18.7C9.69 20.14 14.34 20.14 18.65 18.7C19.86 18.3 20.39 16.87 19.73 15.77L18.58 13.86C18.28 13.34 18.02 12.41 18.02 11.8V8.91C18.02 5.61 15.32 2.91 12.02 2.91Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                          />
                          <path
                            d="M13.87 3.2C13.56 3.11 13.24 3.04 12.91 3C11.95 2.88 11.03 2.95 10.17 3.2C10.46 2.46 11.18 1.94 12.02 1.94C12.86 1.94 13.58 2.46 13.87 3.2Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.02 19.06C15.02 20.71 13.67 22.06 12.02 22.06C11.2 22.06 10.44 21.72 9.9 21.18C9.36 20.64 9.02 19.88 9.02 19.06"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                          />
                        </svg>
                      </span>
                      Automated Reminders
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Quick Actions */}
              <div className=" w-full">
                <h3 className="text-lg font-medium text-white mb-4">
                  Quick Actions
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="/resources"
                      className="flex items-center text-sm text-gray-300 hover:text-white"
                    >
                      <span className="mr-3 text-gray-400">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22 16.7399V4.66994C22 3.46994 21.02 2.57994 19.83 2.67994H19.77C17.67 2.85994 14.48 3.92994 12.7 5.04994L12.53 5.15994C12.24 5.33994 11.76 5.33994 11.47 5.15994L11.22 5.00994C9.44 3.89994 6.26 2.83994 4.16 2.66994C2.97 2.56994 2 3.46994 2 4.65994V16.7399C2 17.6999 2.78 18.5999 3.74 18.7199L4.03 18.7599C6.2 19.0499 9.55 20.1499 11.47 21.1999L11.51 21.2199C11.78 21.3699 12.21 21.3699 12.47 21.2199C14.39 20.1599 17.75 19.0499 19.93 18.7599L20.26 18.7199C21.22 18.5999 22 17.6999 22 16.7399Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 5.48999V20.49"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.75 8.48999H5.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.5 11.49H5.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      Resources
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/whats-new"
                      className="flex items-center text-sm text-gray-300 hover:text-white"
                    >
                      <span className="mr-3 text-gray-400">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 10.74V13.94"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 9V15.68"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17 10.74V13.94"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      What's New
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/demo"
                      className="flex items-center text-sm text-gray-300 hover:text-white"
                    >
                      <span className="mr-3 text-gray-400">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.53 20.4201H6.21C3.05 20.4201 2 18.3201 2 16.2101V7.79008C2 4.63008 3.05 3.58008 6.21 3.58008H12.53C15.69 3.58008 16.74 4.63008 16.74 7.79008V16.2101C16.74 19.3701 15.68 20.4201 12.53 20.4201Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19.52 17.0999L16.74 15.1499V8.83989L19.52 6.88989C20.88 5.93989 22 6.51989 22 8.18989V15.8099C22 17.4799 20.88 18.0599 19.52 17.0999Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11.5 11C12.3284 11 13 10.3284 13 9.5C13 8.67157 12.3284 8 11.5 8C10.6716 8 10 8.67157 10 9.5C10 10.3284 10.6716 11 11.5 11Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      Watch A Demo
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <Link
                    to="/features/contract-automation"
                    className="flex items-center text-sm text-gray-300 hover:text-white mb-4"
                  >
                    <CheckIcon size={18} className="mr-2 text-cyan-400" />
                    Contract Automation
                  </Link>
                  <Link
                    to="/features/invoice-generation"
                    className="flex items-center text-sm text-gray-300 hover:text-white mb-4"
                  >
                    <CheckIcon size={18} className="mr-2 text-cyan-400" />
                    Invoice Generation
                  </Link>
                  <Link
                    to="/features/assign-tasks"
                    className="flex items-center text-sm text-gray-300 hover:text-white mb-4"
                  >
                    <CheckIcon size={18} className="mr-2 text-cyan-400" />
                    Assign tasks
                  </Link>
                  <Link
                    to="/features/third-party-integrations"
                    className="flex items-center text-sm text-gray-300 hover:text-white mb-4"
                  >
                    <CheckIcon size={18} className="mr-2 text-cyan-400" />
                    Third-Party Integrations
                  </Link>
                </div>

                <div>
                  <Link
                    to="/features/contract-generation"
                    className="flex items-center text-sm text-gray-300 hover:text-white mb-4"
                  >
                    <CheckIcon size={18} className="mr-2 text-cyan-400" />
                    E-Signature
                  </Link>
                  <Link
                    to="/features/payment-tracking"
                    className="flex items-center text-sm text-gray-300 hover:text-white mb-4"
                  >
                    <CheckIcon size={18} className="mr-2 text-cyan-400" />
                    Payment Tracking
                  </Link>
                  <Link
                    to="/features/project-tracking"
                    className="flex items-center text-sm text-gray-300 hover:text-white mb-4"
                  >
                    <CheckIcon size={18} className="mr-2 text-cyan-400" />
                    Project Tracking
                  </Link>
                  <Link
                    to="/features/data-security"
                    className="flex items-center text-sm text-gray-300 hover:text-white mb-4"
                  >
                    <CheckIcon size={18} className="mr-2 text-cyan-400" />
                    Data Security
                  </Link>
                </div>

                <div>
                  <Link
                    to="/features/payment-reminders"
                    className="flex items-center text-sm text-gray-300 hover:text-white mb-4"
                  >
                    <CheckIcon size={18} className="mr-2 text-cyan-400" />
                    Payment Reminders
                  </Link>
                  <Link
                    to="/features/payment-requests"
                    className="flex items-center text-sm text-gray-300 hover:text-white mb-4"
                  >
                    <CheckIcon size={18} className="mr-2 text-cyan-400" />
                    Payment Requests
                  </Link>
                  <Link
                    to="/features/productivity-tracking"
                    className="flex items-center text-sm text-gray-300 hover:text-white mb-4"
                  >
                    <CheckIcon size={18} className="mr-2 text-cyan-400" />
                    Productivity Tracking
                  </Link>
                  <Link
                    to="/features/legal-compliance"
                    className="flex items-center text-sm text-gray-300 hover:text-white mb-4"
                  >
                    <CheckIcon size={18} className="mr-2 text-cyan-400" />
                    Legal Compliance
                  </Link>
                </div>

                <div>
                  <Link
                    to="/features/document-storage"
                    className="flex items-center text-sm text-gray-300 hover:text-white mb-4"
                  >
                    <CheckIcon size={18} className="mr-2 text-cyan-400" />
                    Document Storage
                  </Link>
                  <Link
                    to="/features/client-collaboration"
                    className="flex items-center text-sm text-gray-300 hover:text-white mb-4"
                  >
                    <CheckIcon size={18} className="mr-2 text-cyan-400" />
                    Client & Project Collaboration
                  </Link>
                  <Link
                    to="/features/multi-currency"
                    className="flex items-center text-sm text-gray-300 hover:text-white mb-4"
                  >
                    <CheckIcon size={18} className="mr-2 text-cyan-400" />
                    Multi-Currency Support
                  </Link>
                  <Link
                    to="/features/soft-cloud"
                    className="flex items-center text-sm text-gray-300 hover:text-white mb-4"
                  >
                    <CheckIcon size={18} className="mr-2 text-cyan-400" />
                    Soft Cloud
                  </Link>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Link
                  to="/features"
                  className="inline-flex items-center justify-center px-4 py-2 bg-white text-[#0a0b2e] text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
                >
                  See All Features
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsDropdown;
