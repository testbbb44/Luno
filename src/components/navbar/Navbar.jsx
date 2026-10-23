// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { ChevronDown } from "../../components/icons/Icons";
// import { Link, useLocation } from "react-router-dom";
// import ProductsDropdown from "./ProductDropdown";
// import SolutionsDropdown from "./SolutionDropdown";
// import ResourcesDropdown from "./ResourcesDropdown";
// import BigLogo from "../../assets/white-logo.svg";
// import { Close } from "@mui/icons-material";

// const Navbar = ({ data }) => {
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   const [openMobileNav, setOpenMobileNav] = useState(false);
//   const dropdownRef = useRef(null);
//   const location = useLocation();

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setActiveDropdown(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Close dropdown when route changes
//   useEffect(() => {
//     setActiveDropdown(null);
//   }, [location]);

//   const toggleDropdown = (dropdown) => {
//     if (activeDropdown === dropdown) {
//       setActiveDropdown(null);
//     } else {
//       setActiveDropdown(dropdown);
//     }
//   };

//   const openMobileNavFunc = () => {
//     setOpenMobileNav(!openMobileNav);
//   };

//   return (
//     <header className="fixed border-b border-dashed top-0 left-0 right-0 z-50 bg-[#04042fc7] text-white shadow-md">
//       <div className=" mx-auto  w-full px-6 md:px-16">
//         <div className="flex items-center justify-between h-24 ">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link to="/" className="flex items-center">
//               <span className="text-2xl font-bold text-white">
//                 <img src={BigLogo} alt="" className="w-[80px] md:w-fit" />
//               </span>
//             </Link>
//           </div>

//           {/* Navigation */}
//           <nav className="hidden md:flex space-x-8" ref={dropdownRef}>
//             {data.mainNav.map((item, index) => (
//               <div key={item.name} className="">
//                 {item.href ? (
//                   <Link
//                     to={item.href}
//                     className={`flex items-center px-2 py-1 text-sm font-medium rounded-md hover:text-cyan-400 transition-colors ${
//                       location.pathname === item.href
//                         ? "text-cyan-400"
//                         : "text-white"
//                     }`}
//                   >
//                     {item.name}
//                   </Link>
//                 ) : (
//                   <>
//                     <button
//                       onClick={() => toggleDropdown(item.name)}
//                       className={`flex items-center px-2 py-1 text-sm font-medium rounded-md hover:text-cyan-400 transition-colors ${
//                         activeDropdown === item.name
//                           ? "text-cyan-400"
//                           : "text-white"
//                       }`}
//                     >
//                       {item.name}
//                       <ChevronDown className="ml-1 h-4 w-4" />
//                     </button>

//                     {activeDropdown === item.name && (
//                       <div className="absolute  left-0 mt-9">
//                         {item.name === "Products" ? (
//                           <ProductsDropdown />
//                         ) : item.name === "Solutions" ? (
//                           <SolutionsDropdown />
//                         ) : item.name === "Resources" ? (
//                           <ResourcesDropdown />
//                         ) : (
//                           <div className="w-screen bg-[#0a0b2e] border border-gray-700 rounded-md shadow-lg z-50">
//                             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
//                               {/* Left sidebar for subcategories if present */}
//                               {item.subcategories && (
//                                 <div className="border-r border-gray-700 pr-4">
//                                   {item.subcategories.map((subcat) => (
//                                     <div key={subcat.name} className="mb-4">
//                                       <button className="flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-left hover:bg-gray-800 transition-colors">
//                                         {subcat.icon && (
//                                           <span className="mr-2">
//                                             {React.createElement(subcat.icon, {
//                                               size: 18,
//                                             })}
//                                           </span>
//                                         )}
//                                         {subcat.name}
//                                         <ChevronDown className="ml-auto h-4 w-4" />
//                                       </button>
//                                     </div>
//                                   ))}
//                                 </div>
//                               )}

//                               {/* Main content area */}
//                               <div
//                                 className={`col-span-${
//                                   item.subcategories ? "3" : "4"
//                                 } grid grid-cols-1 md:grid-cols-${
//                                   item.columns || 3
//                                 } gap-6`}
//                               >
//                                 {item.sections &&
//                                   item.sections.map((section) => (
//                                     <div
//                                       key={section.title}
//                                       className="space-y-4"
//                                     >
//                                       <h3 className="text-lg font-medium text-white">
//                                         {section.title}
//                                       </h3>
//                                       <ul className="space-y-4">
//                                         {section.items.map((subItem) => (
//                                           <li key={subItem.name}>
//                                             <Link
//                                               to={subItem.href || "#"}
//                                               className="flex items-center text-sm text-gray-300 hover:text-white"
//                                             >
//                                               {subItem.icon && (
//                                                 <span className="mr-2 text-gray-400">
//                                                   {React.createElement(
//                                                     subItem.icon,
//                                                     { size: 18 }
//                                                   )}
//                                                 </span>
//                                               )}
//                                               <span>{subItem.name}</span>
//                                             </Link>
//                                             {subItem.description && (
//                                               <p className="mt-1 text-xs text-gray-400">
//                                                 {subItem.description}
//                                               </p>
//                                             )}
//                                           </li>
//                                         ))}
//                                       </ul>
//                                     </div>
//                                   ))}

//                                 {item.cards && (
//                                   <div
//                                     className={`col-span-${
//                                       item.columns || 3
//                                     } grid grid-cols-1 md:grid-cols-3 gap-4 mt-4`}
//                                   >
//                                     {item.cards.map((card) => (
//                                       <div
//                                         key={card.title}
//                                         className="border border-gray-700 rounded-lg p-4"
//                                       >
//                                         <h3 className="text-lg font-medium mb-2">
//                                           {card.title}
//                                         </h3>
//                                         <p className="text-sm text-gray-300">
//                                           {card.description}
//                                         </p>
//                                       </div>
//                                     ))}
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             ))}
//           </nav>

//           {/* Auth buttons */}
//           <div className="hidden md:flex items-center space-x-4">
//             <Link
//               to="/login"
//               className="px-3 py-1 text-sm font-medium text-white hover:text-cyan-400 transition-colors"
//             >
//               Log In
//             </Link>
//             <Link
//               to="/register"
//               className="px-6 py-2 text-sm font-medium    bg-white text-[#0a0b2e] rounded-lg hover:bg-gray-200 transition-colors"
//             >
//               Sign up
//             </Link>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               className="inline-flex   items-center justify-center rounded-md text-white   focus:outline-none"
//               onClick={() => openMobileNavFunc()}
//             >
//               {openMobileNav ? (
//                 <Close />
//               ) : (
//                 <svg
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {openMobileNav && (
//         <div className="md:hidden  bg-[#0a0b2e] border-t border-gray-700">
//           <div className="px-2 max-h-[90vh] overflow-auto   pt-2 pb-3 space-y-1">
//             {data.mainNav.map((item) => (
//               <div className=" border-b  border-gray-500 p-2" key={item.name}>
//                 {item.href ? (
//                   <Link
//                     to={item.href}
//                     className="block px-3 py-2 text-base font-medium text-white hover:bg-gray-800 rounded-md"
//                   >
//                     {item.name}
//                   </Link>
//                 ) : (
//                   <>
//                     <button
//                       onClick={() =>
//                         toggleDropdown(
//                           item.name === activeDropdown ? null : item.name
//                         )
//                       }
//                       className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-white hover:bg-gray-800 rounded-md"
//                     >
//                       {item.name}
//                       <ChevronDown className="ml-1 h-4 w-4" />
//                     </button>

//                     {activeDropdown === item.name && (
//                       <div className=" mb-8 ml-2  mt-6">
//                         {item.name === "Products" ? (
//                           <ProductsDropdown />
//                         ) : item.name === "Solutions" ? (
//                           <SolutionsDropdown />
//                         ) : item.name === "Resources" ? (
//                           <ResourcesDropdown />
//                         ) : (
//                           <div className="w-screen bg-[#0a0b2e] border border-gray-700 rounded-md shadow-lg z-50">
//                             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
//                               {/* Left sidebar for subcategories if present */}
//                               {item.subcategories && (
//                                 <div className="border-r border-gray-700 pr-4">
//                                   {item.subcategories.map((subcat) => (
//                                     <div key={subcat.name} className="mb-4">
//                                       <button className="flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-left hover:bg-gray-800 transition-colors">
//                                         {subcat.icon && (
//                                           <span className="mr-2">
//                                             {React.createElement(subcat.icon, {
//                                               size: 18,
//                                             })}
//                                           </span>
//                                         )}
//                                         {subcat.name}
//                                         <ChevronDown className="ml-auto h-4 w-4" />
//                                       </button>
//                                     </div>
//                                   ))}
//                                 </div>
//                               )}

//                               {/* Main content area */}
//                               <div
//                                 className={`col-span-${
//                                   item.subcategories ? "3" : "4"
//                                 } grid grid-cols-1 md:grid-cols-${
//                                   item.columns || 3
//                                 } gap-6`}
//                               >
//                                 {item.sections &&
//                                   item.sections.map((section) => (
//                                     <div
//                                       key={section.title}
//                                       className="space-y-4"
//                                     >
//                                       <h3 className="text-lg font-medium text-white">
//                                         {section.title}
//                                       </h3>
//                                       <ul className="space-y-4">
//                                         {section.items.map((subItem) => (
//                                           <li key={subItem.name}>
//                                             <Link
//                                               to={subItem.href || "#"}
//                                               className="flex items-center text-sm text-gray-300 hover:text-white"
//                                             >
//                                               {subItem.icon && (
//                                                 <span className="mr-2 text-gray-400">
//                                                   {React.createElement(
//                                                     subItem.icon,
//                                                     { size: 18 }
//                                                   )}
//                                                 </span>
//                                               )}
//                                               <span>{subItem.name}</span>
//                                             </Link>
//                                             {subItem.description && (
//                                               <p className="mt-1 text-xs text-gray-400">
//                                                 {subItem.description}
//                                               </p>
//                                             )}
//                                           </li>
//                                         ))}
//                                       </ul>
//                                     </div>
//                                   ))}

//                                 {item.cards && (
//                                   <div
//                                     className={`col-span-${
//                                       item.columns || 3
//                                     } grid grid-cols-1 md:grid-cols-3 gap-4 mt-4`}
//                                   >
//                                     {item.cards.map((card) => (
//                                       <div
//                                         key={card.title}
//                                         className="border border-gray-700 rounded-lg p-4"
//                                       >
//                                         <h3 className="text-lg font-medium mb-2">
//                                           {card.title}
//                                         </h3>
//                                         <p className="text-sm text-gray-300">
//                                           {card.description}
//                                         </p>
//                                       </div>
//                                     ))}
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             ))}
//             <div className="pt-4 pb-3  border-gray-700">
//               <div className="flex flex-col  gap-8  px-3">
//                 <Link
//                   to="/login"
//                   className="flex-1 flex justify-center items-center border  px-3 py-3 text-base font-medium text-white hover:bg-gray-800 rounded-md"
//                 >
//                   Log In
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className=" flex-1 px-3 py-3 text-base flex justify-center items-center font-medium bg-white text-[#0a0b2e] rounded-md hover:bg-gray-200"
//                 >
//                   See All Features
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;




"use client"

import React, { useState, useEffect, useRef } from "react"
import { ChevronDown } from "../../components/icons/Icons"
import { Link, useLocation } from "react-router-dom"
import ProductsDropdown from "./ProductDropdown"
import SolutionsDropdown from "./SolutionDropdown"
import ResourcesDropdown from "./ResourcesDropdown"
import BigLogo from "../../assets/white-logo.svg"
import { Close } from "@mui/icons-material"

const Navbar = ({ data }) => {
  const [activeDropdown, setActiveDropdown] = useState(null)

  const [openMobileNav, setOpenMobileNav] = useState(false)
  const dropdownRef = useRef(null)
  const location = useLocation()

  // Close dropdown when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setActiveDropdown(null)
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside)
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside)
  //   }
  // }, [])

  // Close dropdown when route changes
  useEffect(() => {
    setOpenMobileNav(false)
    setActiveDropdown(null)
  }, [location])

  const toggleDropdown = (dropdown) => {
    
      setActiveDropdown(dropdown)
    
  }

  const openMobileNavFunc = () => {
    setOpenMobileNav(!openMobileNav)
  }

  return (
    <header className="fixed border-b border-dashed top-0 left-0 right-0 z-50 bg-[#04042fc7] text-white shadow-md">
      <div className=" mx-auto  w-full px-6 md:px-16">
        <div className="flex items-center justify-between h-24 ">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">
                <img src={BigLogo || "/placeholder.svg"} alt="" className="w-[80px] md:w-fit" />
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8" ref={dropdownRef}>
            {data.mainNav.map((item, index) => (
              <div key={item.name} className="">
                {item.href ? (
                  <Link
                    to={item.href}
                    className={`flex items-center px-2 py-1 text-sm font-medium rounded-md hover:text-cyan-400 transition-colors ${
                      location.pathname === item.href ? "text-cyan-400" : "text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`flex items-center px-2 py-1 text-sm font-medium rounded-md hover:text-cyan-400 transition-colors ${
                        activeDropdown === item.name ? "text-cyan-400" : "text-white"
                      }`}
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>

                    {activeDropdown === item.name && (
                      <div className="absolute  left-0 mt-9">
                        {item.name === "Products" ? (
                          <ProductsDropdown />
                        ) : item.name === "Solutions" ? (
                          <SolutionsDropdown />
                        ) : item.name === "Resources" ? (
                          <ResourcesDropdown />
                        ) : (
                          <div className="w-screen bg-[#0a0b2e] border border-gray-700 rounded-md shadow-lg z-50">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
                              {/* Left sidebar for subcategories if present */}
                              {item.subcategories && (
                                <div className="border-r border-gray-700 pr-4">
                                  {item.subcategories.map((subcat) => (
                                    <div key={subcat.name} className="mb-4">
                                      <button className="flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-left hover:bg-gray-800 transition-colors">
                                        {subcat.icon && (
                                          <span className="mr-2">
                                            {React.createElement(subcat.icon, {
                                              size: 18,
                                            })}
                                          </span>
                                        )}
                                        {subcat.name}
                                        <ChevronDown className="ml-auto h-4 w-4" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Main content area */}
                              <div
                                className={`col-span-${item.subcategories ? "3" : "4"} grid grid-cols-1 md:grid-cols-${
                                  item.columns || 3
                                } gap-6`}
                              >
                                {item.sections &&
                                  item.sections.map((section) => (
                                    <div key={section.title} className="space-y-4">
                                      <h3 className="text-lg font-medium text-white">{section.title}</h3>
                                      <ul className="space-y-4">
                                        {section.items.map((subItem) => (
                                          <li key={subItem.name}>
                                            <Link
                                              to={subItem.href || "#"}
                                              className="flex items-center text-sm text-gray-300 hover:text-white"
                                            >
                                              {subItem.icon && (
                                                <span className="mr-2 text-gray-400">
                                                  {React.createElement(subItem.icon, { size: 18 })}
                                                </span>
                                              )}
                                              <span>{subItem.name}</span>
                                            </Link>
                                            {subItem.description && (
                                              <p className="mt-1 text-xs text-gray-400">{subItem.description}</p>
                                            )}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}

                                {item.cards && (
                                  <div
                                    className={`col-span-${
                                      item.columns || 3
                                    } grid grid-cols-1 md:grid-cols-3 gap-4 mt-4`}
                                  >
                                    {item.cards.map((card) => (
                                      <div key={card.title} className="border border-gray-700 rounded-lg p-4">
                                        <h3 className="text-lg font-medium mb-2">{card.title}</h3>
                                        <p className="text-sm text-gray-300">{card.description}</p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </nav>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="px-3 py-1 text-sm font-medium text-white hover:text-cyan-400 transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 text-sm font-medium    bg-white text-[#0a0b2e] rounded-lg hover:bg-gray-200 transition-colors"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="inline-flex   items-center justify-center rounded-md text-white   focus:outline-none"
              onClick={() => openMobileNavFunc()}
            >
              {openMobileNav ? (
                <Close />
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {openMobileNav && (
        <div className="md:hidden  bg-[#0a0b2e] border-t border-gray-700">
          <div className="px-2 max-h-[90vh] overflow-auto   pt-2 pb-3 space-y-1">
            {data.mainNav.map((item) => (
              <div className=" border-b  border-gray-500 p-2" key={item.name}>
                {item.href ? (
                  <Link
                    to={item.href}
                    // onClick={() => setOpenMobileNav(false)}
                    className="block px-3 py-2 text-base font-medium text-white hover:bg-gray-800 rounded-md"
                  >
                    {item.name} 
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name === activeDropdown ?null : item.name)}
                      className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-white hover:bg-gray-800 rounded-md"
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>

                    {activeDropdown === item.name && (
                      <div className=" mb-8 ml-2  mt-6">
                        {item.name === "Products" ? (
                          <ProductsDropdown />
                        ) : item.name === "Solutions" ? (
                          <SolutionsDropdown />
                        ) : item.name === "Resources" ? (
                          <ResourcesDropdown />
                        ) : (
                          <div className="w-screen bg-[#0a0b2e] border border-gray-700 rounded-md shadow-lg z-50">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
                              {item.subcategories && (
                                <div className="border-r border-gray-700 pr-4">
                                  {item.subcategories.map((subcat) => (
                                    <div key={subcat.name} className="mb-4">
                                      <button className="flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-left hover:bg-gray-800 transition-colors">
                                        {subcat.icon && (
                                          <span className="mr-2">
                                            {React.createElement(subcat.icon, {
                                              size: 18,
                                            })}
                                          </span>
                                        )}
                                        {subcat.name} hhh
                                        <ChevronDown className="ml-auto h-4 w-4" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}

                              <div
                                className={`col-span-${item.subcategories ? "3" : "4"} grid grid-cols-1 md:grid-cols-${
                                  item.columns || 3
                                } gap-6`}
                              >
                                {item.sections &&
                                  item.sections.map((section) => (
                                    <div key={section.title} className="space-y-4">
                                      <h3 className="text-lg font-medium text-white">{section.title}</h3>
                                      <ul className="space-y-4">
                                        {section.items.map((subItem) => (
                                          <li key={subItem.name}>
                                            <Link
                                              to={subItem.href || "#"}
                                              onClick={() => setOpenMobileNav(false)}
                                              className="flex items-center text-sm text-gray-300 hover:text-white"
                                            >
                                              {subItem.icon && (
                                                <span className="mr-2 text-gray-400">
                                                  {React.createElement(subItem.icon, { size: 18 })}
                                                </span>
                                              )}
                                              <span>{subItem.name}</span>
                                            </Link>
                                            {subItem.description && (
                                              <p className="mt-1 text-xs text-gray-400">{subItem.description}</p>
                                            )}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}

                                {item.cards && (
                                  <div
                                    className={`col-span-${
                                      item.columns || 3
                                    } grid grid-cols-1 md:grid-cols-3 gap-4 mt-4`}
                                  >
                                    {item.cards.map((card) => (
                                      <div key={card.title} className="border border-gray-700 rounded-lg p-4">
                                        <h3 className="text-lg font-medium mb-2">{card.title}</h3>
                                        <p className="text-sm text-gray-300">{card.description}</p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
            <div className="pt-4 pb-3  border-gray-700">
              <div className="flex flex-col  gap-8  px-3">
                <Link
                  to="/login"
                  onClick={() => setOpenMobileNav(false)}
                  className="flex-1 flex justify-center items-center border  px-3 py-3 text-base font-medium text-white hover:bg-gray-800 rounded-md"
                >
                  Log In 
                </Link>
                <Link
                  to="/features"
                  onClick={() => setOpenMobileNav(false)}
                  className=" flex-1 px-3 py-3 text-base flex justify-center items-center font-medium bg-white text-[#0a0b2e] rounded-md hover:bg-gray-200"
                >
                  See All Features
                </Link> 
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
