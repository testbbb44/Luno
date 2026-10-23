













// import { useState, useRef, useEffect, useMemo } from "react";
// import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
// import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
// import { FormControl, Select as MuiSelect, MenuItem, InputBase } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import CloseIcon from "@mui/icons-material/Close";

// const autocompleteStyle = `
//   /* Your existing autocomplete styles */
//   @media (prefers-color-scheme: dark) {
//     input:-webkit-autofill,
//     input:-webkit-autofill:hover, 
//     input:-webkit-autofill:focus,
//     input:-webkit-autofill:active {
//       -webkit-box-shadow: 0 0 0 30px #2a2a2a inset !important;
//       -webkit-text-fill-color: #ffffff !important;
//       caret-color: #ffffff !important;
//     }
    
//     input:autofill {
//       background-color: #2a2a2a !important;
//       color: #ffffff !important;
//     }
//   }

//   input:-webkit-autofill,
//   input:-webkit-autofill:hover, 
//   input:-webkit-autofill:focus,
//   input:-webkit-autofill:active {
//     -webkit-box-shadow: 0 0 0 30px white inset !important;
//     -webkit-text-fill-color: black !important;
//     transition: background-color 5000s ease-in-out 0s;
//   }
  
//   input:autofill {
//     background-color: white !important;
//     color: black !important;
//   }

//   @keyframes onAutoFillStart {
//     from { content: ""; }
//     to { content: ""; }
//   }
  
//   @keyframes onAutoFillCancel {
//     from { content: ""; }
//     to { content: ""; }
//   }
  
//   input:-webkit-autofill {
//     animation-name: onAutoFillStart;
//     transition: background-color 50000s ease-in-out 0s;
//   }
  
//   input:not(:-webkit-autofill) {
//     animation-name: onAutoFillCancel;
//   }

//   .autofilled-dark-mode {
//     background-color: #2a2a2a !important;
//     color: #ffffff !important;
//   }
  
//   .autofilled-light-mode {
//     background-color: white !important;
//     color: black !important;
//   }
// `;

// const FormFieldComp = ({
//   bg,
//   label,
//   disabled = false,
//   name,
//   type,
//   register,
//   setValue,
//   validation,
//   errors = {},
//   options = [],
//   textArea,
//   searchable = true,
//   defaultValue = "",
//   tabIndex,
//   isOpen = false,
// }) => {
//   const [showInput, setShowInput] = useState(!!defaultValue);
//   const [isFocused, setIsFocused] = useState(false);
//   const [inputValue, setInputValue] = useState(defaultValue);
//   const [selectedValue, setSelectedValue] = useState(defaultValue);
//   const [openDropdown, setOpenDropdown] = useState(isOpen);
//   const [searchText, setSearchText] = useState("");
//   const [isAutofilled, setIsAutofilled] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const inputRef = useRef(null);
//   const containerRef = useRef(null);
//   const dropdownRef = useRef(null);
//   const selectRef = useRef(null);
//   const searchInputRef = useRef(null);

//   // Memoize filtered options
//   const filteredOptions = useMemo(() => {
//     if (!searchText) return options;
//     return options.filter(option =>
//       option.label.toLowerCase().includes(searchText.toLowerCase())
//     );
//   }, [options, searchText]);

//   // Check for dark mode
//   useEffect(() => {
//     const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
//     setIsDarkMode(darkModeQuery.matches);

//     const handleChange = (e) => setIsDarkMode(e.matches);
//     darkModeQuery.addEventListener("change", handleChange);

//     return () => darkModeQuery.removeEventListener("change", handleChange);
//   }, []);

//   // Initialize with default value
//   useEffect(() => {
//     if (defaultValue) {
//       setShowInput(true);
//       setInputValue(defaultValue);
//       setSelectedValue(defaultValue);
//       setValue(name, defaultValue);
//     }
//   }, [defaultValue, name, setValue]);

//   // Initialize openDropdown with isOpen prop
//   useEffect(() => {
//     setOpenDropdown(isOpen);
//   }, [isOpen]);

//   // Focus search input when dropdown opens
//   useEffect(() => {
//     if (openDropdown && searchable && searchInputRef.current) {
//       setTimeout(() => {
//         searchInputRef.current.focus();
//       }, 100);
//     }
//   }, [openDropdown, searchable]);

//   const handleLabelClick = () => {
//     if (type === "select") {
//       setOpenDropdown(!openDropdown);
//     } else if (inputRef.current) {
//       inputRef.current.focus();
//     }
//     setShowInput(true);
//     setIsFocused(true);
//   };

//   const handleBlur = (e) => {
//     if (dropdownRef.current && dropdownRef.current.contains(e.relatedTarget)) {
//       return;
//     }

//     setIsFocused(false);

//     if (!inputValue && !selectedValue && !isAutofilled) {
//       setTimeout(() => {
//         setShowInput(false);
//       }, 300);
//     }
//   };

//   const handleFocus = () => {
//     setIsFocused(true);
//     setShowInput(true);
//   };

//   const handleChange = (e) => {
//     setInputValue(e.target.value);
//     setShowInput(true);
//   };

//   const handleSelectChange = (e) => {
//     const value = e.target.value;
//     const label = options.find((option) => option.value === value)?.label || value;

//     setSelectedValue(value || "");
//     setInputValue(label || value || "");
//     setSearchText(""); // Clear search when selecting an option
//     setValue(name, value || "", { shouldValidate: true, shouldDirty: true });
//     setOpenDropdown(false);
//   };

//   const handleSelect = (value, label) => {
//     setSelectedValue(value || "");
//     setInputValue(label || value || "");
//     setSearchText(""); // Clear search when selecting an option
//     setValue(name, value || "", { shouldValidate: true, shouldDirty: true });
//     setOpenDropdown(false);
//   };

//   const handleSearchChange = (e) => {
//     setSearchText(e.target.value);
//   };

//   const clearSearch = () => {
//     setSearchText("");
//     if (searchInputRef.current) {
//       searchInputRef.current.focus();
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (type === "select") {
//       if (e.key === "Escape") {
//         e.preventDefault();
//         setOpenDropdown(false);
//         // Don't clear search on escape - let it persist
//       }
//     }
//   };

//   const handleClickOutside = (event) => {
//     if (type === "select" && openDropdown && !selectRef.current?.contains(event.target)) {
//       setOpenDropdown(false);
//       // Don't clear search when clicking outside
//     }

//     if (containerRef.current && !containerRef.current.contains(event.target)) {
//       setIsFocused(false);
//       if (showInput && !selectedValue && !inputValue && !isAutofilled) {
//         setShowInput(false);
//       }
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [showInput, selectedValue, inputValue, isAutofilled, openDropdown]);

//   useEffect(() => {
//     if (selectedValue || inputValue || isAutofilled) {
//       setShowInput(true);
//     }
//   }, [selectedValue, inputValue, isAutofilled]);

//   useEffect(() => {
//     if (selectedValue) {
//       setValue(name, selectedValue);
//     }
//   }, [selectedValue, setValue, name]);

//   const selectedLabel = options.find((option) => option.value === selectedValue)?.label || selectedValue;
//   const errorMessage = errors[name]?.message;
//   const autofillClass = isDarkMode ? "autofilled-dark-mode" : "autofilled-light-mode";

//   return (
//     <div className="w-full mb-4">
//       <style>{autocompleteStyle}</style>
//       <div
//         ref={containerRef}
//         className={`w-full ${bg ? "bg-white" : ""} border h-fit ${
//           isFocused ? "border-[#0A0A78]" : "border"
//         } flex flex-col p-4 rounded-lg transition-all duration-300`}
//       >
//         {type === "select" ? (
//           <div onClick={handleLabelClick}>
//             <label
//               htmlFor={name}
//               className={`text-sm cursor-pointer ${
//                 showInput ? "text-[#59595D]" : "text-[#04042F]"
//               }`}
//             >
//               {label}
//             </label>
//             <div
//               className={`transition-all w-full top-0 left-0 duration-300 ${
//                 showInput ? "max-h-[200px] opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"
//               }`}
//             >
//               <div ref={selectRef}>
//                 <FormControl fullWidth variant="standard" sx={{ mt: 1 }}>
//                   <MuiSelect
//                     id={name}
//                     value={selectedValue}
//                     onChange={handleSelectChange}
//                     open={openDropdown}
//                     onOpen={() => setOpenDropdown(true)}
//                     onClose={() => setOpenDropdown(false)} // Don't clear search on close
//                     displayEmpty
//                     inputProps={{ "aria-label": label }}
//                     sx={{
//                       "& .MuiSelect-select": {
//                         py: 0.5,
//                         border: "none",
//                         "&:focus": { background: "transparent" },
//                       },
//                       "&:before, &:after": { display: "none" },
//                     }}
//                     IconComponent={
//                       openDropdown ? KeyboardArrowUpOutlinedIcon : KeyboardArrowDownOutlinedIcon
//                     }
//                     MenuProps={{
//                       PaperProps: { style: { maxHeight: 300, zIndex: 9999 } },
//                       autoFocus: false,
//                       disableAutoFocusItem: true,
//                       disableScrollLock: true,
//                     }}
//                     renderValue={(selected) => {
//                       if (!selected) return <span className="text-gray-400">Select an option</span>;
//                       return selectedLabel;
//                     }}
//                   >
//                     {searchable && (
//                       <div className="px-2 py-1 border-b sticky top-0 bg-white z-10">
//                         <div className="relative">
//                           <InputBase
//                             inputRef={searchInputRef}
//                             value={searchText}
//                             onChange={handleSearchChange}
//                             placeholder="Search..."
//                             className="w-full pl-8 pr-8"
//                             onKeyDown={(e) => {
//                               if (e.key === "Escape") {
//                                 e.stopPropagation();
//                                 setOpenDropdown(false);
//                               }
//                             }}
//                           />
//                           <SearchIcon
//                             className="absolute left-2 top-1/2 transform -translate-y-1/2"
//                             fontSize="small"
//                           />
//                           {searchText && (
//                             <CloseIcon
//                               className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
//                               fontSize="small"
//                               onClick={clearSearch}
//                             />
//                           )}
//                         </div>
//                       </div>
//                     )}
//                     {filteredOptions.length > 0 ? (
//                       filteredOptions.map((option) => (
//                         <MenuItem
//                           key={option.value}
//                           value={option.value}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleSelect(option.value, option.label);
//                           }}
//                         >
//                           {option.label}
//                         </MenuItem>
//                       ))
//                     ) : (
//                       <MenuItem disabled>No options found</MenuItem>
//                     )}
//                   </MuiSelect>
//                   <input
//                     disabled={disabled}
//                     type="hidden"
//                     {...register(name, validation)}
//                     value={selectedValue}
//                     name={name}
//                   />
//                 </FormControl>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <>
//             <label
//               id={`${name}-label`}
//               htmlFor={name}
//               className={`text-sm cursor-pointer ${
//                 showInput ? "text-[#59595D]" : "text-[#04042F]"
//               }`}
//               onClick={handleLabelClick}
//             >
//               {label}
//             </label>
//             <div
//               className={`transition-all duration-300 overflow-hidden ${
//                 showInput ? "max-h-[50px] opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"
//               }`}
//             >
//               {textArea ? (
//                 <textarea
//                   disabled={disabled}
//                   id={name}
//                   ref={inputRef}
//                   {...register(name, validation)}
//                   onChange={(e) => {
//                     handleChange(e);
//                     register(name).onChange(e);
//                   }}
//                   onFocus={handleFocus}
//                   onBlur={handleBlur}
//                   onAnimationStart={(e) => {
//                     if (e.animationName === "onAutoFillStart") {
//                       setIsAutofilled(true);
//                       setShowInput(true);
//                       if (inputRef.current?.value) setInputValue(inputRef.current.value);
//                     } else if (e.animationName === "onAutoFillCancel") {
//                       setIsAutofilled(false);
//                     }
//                   }}
//                   value={inputValue}
//                   autoComplete="off"
//                   className={`mt-2 bg-white text-black border-none text-[16px] focus:outline-none w-full transition-all duration-300 resize-none ${
//                     isAutofilled ? autofillClass : ""
//                   }`}
//                   rows={6}
//                   tabIndex={tabIndex}
//                 />
//               ) : (
//                 <input
//                   disabled={disabled}
//                   id={name}
//                   type={type}
//                   ref={inputRef}
//                   {...register(name, validation)}
//                   onChange={(e) => {
//                     handleChange(e);
//                     register(name).onChange(e);
//                   }}
//                   onFocus={handleFocus}
//                   onBlur={handleBlur}
//                   onAnimationStart={(e) => {
//                     if (e.animationName === "onAutoFillStart") {
//                       setIsAutofilled(true);
//                       setShowInput(true);
//                       if (inputRef.current?.value) setInputValue(inputRef.current.value);
//                     } else if (e.animationName === "onAutoFillCancel") {
//                       setIsAutofilled(false);
//                     }
//                   }}
//                   value={inputValue}
//                   autoComplete="off"
//                   className={`mt-2 border-none bg-white text-black text-[16px] focus:outline-none w-full transition-all duration-300 ${
//                     isAutofilled ? autofillClass : ""
//                   }`}
//                   tabIndex={tabIndex}
//                 />
//               )}
//             </div>
//           </>
//         )}
//       </div>
//       {errorMessage && (
//         <p className="text-red-500 text-[10px] mt-1" role="alert">
//           {errorMessage}
//         </p>
//       )}
//     </div>
//   );
// };

// export default FormFieldComp;












import { useState, useRef, useEffect, useMemo } from "react";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { FormControl, Select as MuiSelect, MenuItem, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const autocompleteStyle = `
  /* Your existing autocomplete styles */
  /* ... */
`;

const FormFieldComp = ({
  bg,
  label,
  disabled = false,
  name,
  type,
  register,
  setValue,
  validation,
  errors = {},
  options = [],
  textArea,
  searchable = true,
  defaultValue = "",
  tabIndex,
  isOpen = false,
}) => {
  const [showInput, setShowInput] = useState(!!defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [openDropdown, setOpenDropdown] = useState(isOpen);
  const [searchText, setSearchText] = useState("");
  const [isAutofilled, setIsAutofilled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const selectRef = useRef(null);
  const searchInputRef = useRef(null);

  // Memoize filtered options
  const filteredOptions = useMemo(() => {
    if (!searchText) return options;
    return options.filter(option =>
      option.label.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [options, searchText]);

  // Check for dark mode
  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeQuery.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeQuery.addEventListener("change", handleChange);
    return () => darkModeQuery.removeEventListener("change", handleChange);
  }, []);

  // Initialize with default value
  useEffect(() => {
    if (defaultValue) {
      setShowInput(true);
      setInputValue(defaultValue);
      setSelectedValue(defaultValue);
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);

  // Initialize openDropdown with isOpen prop
  useEffect(() => {
    setOpenDropdown(isOpen);
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (openDropdown && searchable && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100);
    }
  }, [openDropdown, searchable]);

  const handleLabelClick = () => {
    if (type === "select") setOpenDropdown(!openDropdown);
    else if (inputRef.current) inputRef.current.focus();
    setShowInput(true);
    setIsFocused(true);
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    const label = options.find((option) => option.value === value)?.label || value;
    setSelectedValue(value || "");
    setInputValue(label || value || "");
    setSearchText(""); // Clear search only when selecting an option
    setValue(name, value || "", { shouldValidate: true, shouldDirty: true });
    setOpenDropdown(false);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const clearSearch = () => {
    setSearchText("");
    searchInputRef.current?.focus();
  };

  const handleClickOutside = (event) => {
    if (type === "select" && openDropdown && !selectRef.current?.contains(event.target)) {
      setOpenDropdown(false);
      // Don't clear search when clicking outside
    }

    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsFocused(false);
      if (showInput && !selectedValue && !inputValue && !isAutofilled) {
        setShowInput(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showInput, selectedValue, inputValue, isAutofilled, openDropdown]);

  const selectedLabel = options.find((option) => option.value === selectedValue)?.label || selectedValue;
  const errorMessage = errors[name]?.message;
  const autofillClass = isDarkMode ? "autofilled-dark-mode" : "autofilled-light-mode";

  return (
    <div className="w-full mb-4">
      <style>{autocompleteStyle}</style>
      <div
        ref={containerRef}
        className={`w-full ${bg ? "bg-white" : ""} border h-fit ${
          isFocused ? "border-[#0A0A78]" : "border"
        } flex flex-col p-4 rounded-lg transition-all duration-300`}
      >
        {type === "select" ? (
          <div onClick={handleLabelClick}>
            <label
              htmlFor={name}
              className={`text-sm cursor-pointer ${
                showInput ? "text-[#59595D]" : "text-[#04042F]"
              }`}
            >
              {label}
            </label>
            <div
              className={`transition-all w-full top-0 left-0 duration-300 ${
                showInput ? "max-h-[200px] opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"
              }`}
            >
              <div ref={selectRef}>
                <FormControl fullWidth variant="standard" sx={{ mt: 1 }}>
                  <MuiSelect
                    id={name}
                    value={selectedValue}
                    onChange={handleSelectChange}
                    open={openDropdown}
                    onOpen={() => setOpenDropdown(true)}
                    onClose={() => setOpenDropdown(false)}
                    displayEmpty
                    inputProps={{ "aria-label": label }}
                    sx={{
                      "& .MuiSelect-select": {
                        py: 0.5,
                        border: "none",
                        "&:focus": { background: "transparent" },
                      },
                      "&:before, &:after": { display: "none" },
                    }}
                    IconComponent={
                      openDropdown ? KeyboardArrowUpOutlinedIcon : KeyboardArrowDownOutlinedIcon
                    }
                    MenuProps={{
                      PaperProps: { style: { maxHeight: 300, zIndex: 9999 } },
                      autoFocus: false,
                      disableAutoFocusItem: true,
                      disableScrollLock: true,
                    }}
                    renderValue={(selected) => {
                      if (!selected) return <span className="text-gray-400">Select an option</span>;
                      return selectedLabel;
                    }}
                  >
                    {searchable && (
                      <div className="px-2 py-1 border-b sticky top-0 bg-white z-10">
                        <div className="relative">
                          <InputBase
                            inputRef={searchInputRef}
                            value={searchText}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                            className="w-full pl-8 pr-8"
                          />
                          <SearchIcon
                            className="absolute left-2 top-1/2 transform -translate-y-1/2"
                            fontSize="small"
                          />
                          {searchText && (
                            <CloseIcon
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                              fontSize="small"
                              onClick={clearSearch}
                            />
                          )}
                        </div>
                      </div>
                    )}
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedValue(option.value);
                            setInputValue(option.label);
                            setSearchText("");
                            setValue(name, option.value, { shouldValidate: true, shouldDirty: true });
                            setOpenDropdown(false);
                          }}
                        >
                          {option.label}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No options found</MenuItem>
                    )}
                  </MuiSelect>
                  <input
                    disabled={disabled}
                    type="hidden"
                    {...register(name, validation)}
                    value={selectedValue}
                    name={name}
                  />
                </FormControl>
              </div>
            </div>
          </div>
        ) : (
          <>
            <label
              id={`${name}-label`}
              htmlFor={name}
              className={`text-sm cursor-pointer ${
                showInput ? "text-[#59595D]" : "text-[#04042F]"
              }`}
              onClick={handleLabelClick}
            >
              {label}
            </label>
            <div
              className={`transition-all duration-300 overflow-hidden ${
                showInput ? "max-h-[50px] opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"
              }`}
            >
              {textArea ? (
                <textarea
                  disabled={disabled}
                  id={name}
                  ref={inputRef}
                  {...register(name, validation)}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    register(name).onChange(e);
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  value={inputValue}
                  autoComplete="off"
                  className={`mt-2 bg-white text-black border-none text-[16px] focus:outline-none w-full transition-all duration-300 resize-none ${
                    isAutofilled ? autofillClass : ""
                  }`}
                  rows={6}
                  tabIndex={tabIndex}
                />
              ) : (
                <input
                  disabled={disabled}
                  id={name}
                  type={type}
                  ref={inputRef}
                  {...register(name, validation)}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    register(name).onChange(e);
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  value={inputValue}
                  autoComplete="off"
                  className={`mt-2 border-none bg-white text-black text-[16px] focus:outline-none w-full transition-all duration-300 ${
                    isAutofilled ? autofillClass : ""
                  }`}
                  tabIndex={tabIndex}
                />
              )}
            </div>
          </>
        )}
      </div>
      {errorMessage && (
        <p className="text-red-500 text-[10px] mt-1" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormFieldComp;