"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const FormContext = createContext();

// Storage key for localStorage
const STORAGE_KEY = "contract_form_data";

// Create a provider component
export const FormProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [formData, setFormData] = useState(() => {
    // Try to get stored data when component mounts
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem(STORAGE_KEY);
      return storedData
        ? JSON.parse(storedData)
        : {
            // Default initial state with the new structure
            title: "",
            description: "",
            startDate: "",
            endDate: "",
            jurisdiction: "",
            scopeContent: "", // New field for markdown content
            parties: [],
            deliverables: [],
            milestones: [],
            payments: [],

            legalSections: [], // New field for legal sections
            promptTokens: 0,
            completionTokens: 0,
            totalTokens: 0,
          };
    }

    // Default state for server-side rendering
    return {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      jurisdiction: "",
      scopeContent: "",
      parties: [],
      deliverables: [],
      milestones: [],
      payments: [],
      legalSections: [],
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
    };
  });

  // Save to localStorage whenever formData changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  // Function to update form data
  const updateFormData = (stepData) => {
    setFormData((prevData) => {
      const newData = {
        ...prevData,
        ...stepData,
      };

      // Save to localStorage immediately
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      }

      return newData;
    });
  };

  // Function to get the complete form data
  const getFormData = () => {
    return formData;
  };

  // Function to clear form data (useful for reset or after submission)
  const clearFormData = () => {
    const emptyData = {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      jurisdiction: "",
      scopeContent: "",
      parties: [],
      deliverables: [],
      milestones: [],
      payments: [],
      legalSections: [],
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
    };

    setFormData(emptyData);

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(emptyData));
    }
  };

  // Function to set the entire form data at once (useful for loading a template)
  const setFullFormData = (data) => {
    // Ensure we have all the required fields with defaults if not provided
    const completeData = {
      title: data.title || "",
      description: data.description || "",
      startDate: data.startDate || "",
      endDate: data.endDate || "",
      jurisdiction: data.jurisdiction || "",
      scopeContent: data.scopeContent || "",
      parties: data.parties || [],
      deliverables: data.deliverables || [],
      milestones: data.milestones || [],
      payments: data.payments || [],
      legalSections: data.legalSections || [],
    };

    setFormData(completeData);

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completeData));
    }
  };

  // Add a function to update token counts
  const updateTokenCounts = (newTokens) => {
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        promptTokens:
          (prevData.promptTokens || 0) + (newTokens.promptTokens || 0),
        completionTokens:
          (prevData.completionTokens || 0) + (newTokens.completionTokens || 0),
        totalTokens: (prevData.totalTokens || 0) + (newTokens.totalTokens || 0),
      };

      // Save to localStorage immediately
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      }

      return updatedData;
    });
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        getFormData,
        clearFormData,
        setFullFormData,
        updateTokenCounts,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use the form context
export const useFormData = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormProvider");
  }
  return context;
};
