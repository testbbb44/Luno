
import React, { useState } from "react";
import { X, Check, ChevronDown } from "lucide-react";
import { EditWriteIcon } from "../icons/Icons";
import FormButton from "../FormBtn";

const ServicesOffered = () => {
  const [editOpen, setEditOpen] = useState(false);

  // Updated data structure with IDs
  const availableOptions = [
    { id: 1, name: "Logo Design" },
    { id: 2, name: "Branding" },
    { id: 3, name: "Graphic Design" },
    { id: 4, name: "UI/UX Design" },
    { id: 5, name: "Web Design" },
    { id: 6, name: "Motion Graphics" },
    { id: 7, name: "Illustration" },
    { id: 8, name: "Print Design" },
  ];

  const [serviceCategories, setServiceCategories] = useState([
    { id: 1, name: "Logo Design" },
    { id: 2, name: "Branding" },
    { id: 3, name: "Graphic Design" },
  ]);

  const [skills, setSkills] = useState([
    { id: 1, name: "Logo Design" },
    { id: 2, name: "Branding" },
    { id: 3, name: "Graphic Design" },
  ]);

  const [errors, setErrors] = useState({ categories: "", skills: "" });
  const [dropdownStates, setDropdownStates] = useState({
    categories: false,
    skills: false,
  });

  const toggleDropdown = (type) => {
    setDropdownStates((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleSelection = (type, item) => {
    const currentSelection = type === "categories" ? serviceCategories : skills;
    const setSelection =
      type === "categories" ? setServiceCategories : setSkills;

    if (currentSelection.find((i) => i.id === item.id)) {
      setSelection(currentSelection.filter((i) => i.id !== item.id));
    } else {
      setSelection([...currentSelection, item]);
    }

    setErrors((prev) => ({
      ...prev,
      [type]: "",
    }));
  };

  const handleSave = () => {
    const newErrors = {};

    if (serviceCategories.length < 3) {
      newErrors.categories = "Select at least 3 categories";
    }
    if (skills.length < 3) {
      newErrors.skills = "Select at least 3 skills";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setEditOpen(false);
    }
  };

  const getSelectedNames = (items) => {
    return items.map((item) => item.name).join(", ");
  };

  const EditForm = () => (
    <div className="bg-white rounded-2xl border-2 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">Services Offered</div>
        <button
          onClick={() => setEditOpen(false)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 ">
        {/* Categories Dropdown */}
        <div>
          <div className="relative">
            <button
              onClick={() => toggleDropdown("categories")}
              className="w-full p-3 text-left border rounded-lg flex items-center justify-between"
            >
              <span className="text-gray-700 text-sm">
                {serviceCategories.length > 0
                  ? getSelectedNames(serviceCategories)
                  : "Choose Service Category"}
              </span>
              <ChevronDown
                className={`transform transition-transform w-4 ${
                  dropdownStates.categories ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownStates.categories && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                {availableOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleSelection("categories", option)}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
                  >
                    <span>{option.name}</span>
                    {serviceCategories.find((cat) => cat.id === option.id) && (
                      <Check size={16} className="text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          {errors.categories && (
            <p className="text-red-500 text-sm mt-1">{errors.categories}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Select at least 3 categories
          </p>
        </div>

        {/* Skills Dropdown */}
        <div>
          <div className=" relative">
            <button
              onClick={() => toggleDropdown("skills")}
              className="w-full p-3 text-left border rounded-lg flex items-center justify-between"
            >
              <span className="text-gray-700 text-sm">
                {skills.length > 0 ? getSelectedNames(skills) : "Choose Skills"}
              </span>
              <ChevronDown
                className={`transform transition-transform w-4 ${
                  dropdownStates.skills ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownStates.skills && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                {availableOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleSelection("skills", option)}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
                  >
                    <span>{option.name}</span>
                    {skills.find((skill) => skill.id === option.id) && (
                      <Check size={16} className="text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          {errors.skills && (
            <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">Select at least 3 skills</p>
        </div>
      </div>
      <div className="  w-full flex justify-center items-center ">
        <FormButton
          mt={2}
          width="70%"
          type="submit"
          text="Save"
          // isLoading={isLoading}
          // disabled={isLoading}
        />
      </div>
    </div>
  );

  const DisplayView = () => (
    <div className="bg-white rounded-2xl border-2 relative">
      <div className="p-6 flex items-center justify-between">
        <div className="text-xl font-semibold">Services Offered</div>
        <div className="h-5 w-5 text-gray-500">
          <button
            onClick={() => setEditOpen(true)}
            className="absolute top-3 right-3 p-2 hover:bg-gray-100 rounded-full"
          >
            <EditWriteIcon />
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="text-sm text-gray-500 mb-4">Service Categories</div>
            <ul className="space-y-3 list-disc ml-8 font-semibold">
              {serviceCategories.map((category) => (
                <li key={category.id}>{category.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-4">Skills</div>
            <ul className="space-y-3 list-disc ml-8 font-semibold">
              {skills.map((skill) => (
                <li key={skill.id}>{skill.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return <>{editOpen ? <EditForm /> : <DisplayView />}</>;
};

export default ServicesOffered;
