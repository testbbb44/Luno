
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { EditWriteIcon } from "../icons/Icons";
import { Eye, EyeOff, EyeOffIcon } from "lucide-react";
import FormFieldComp from "../form/FormFieldComp";
import FormButton from "../FormBtn";

const SecuritySettings = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    // Here you would typically send the data to your backend
    console.log("Form submitted:", data);
    setEditOpen(false);
  };

  const EditForm = () => (
    <div className="bg-white rounded-2xl border-2 p-6 ">
      <div className="flex items-center mb-4 justify-between">
        <div className="text-xl font-semibold">Security</div>
        <button
          onClick={() => setEditOpen(false)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-6 ">
            <div>
              <div className="text-sm text-gray-500 mb-2">Password</div>

              <FormFieldComp
                label="Change Password"
                name={`Password`}
                type="password"
                placeholder="********"
                register={register}
                setValue={setValue}
                validation={{ required: "Password is required" }}
                errors={errors}
              />
            </div>

            <div>
              <FormFieldComp
                label="Confirm Password"
                name={`confirmPassword`}
                type="password"
                placeholder="********"
                register={register}
                setValue={setValue}
                validation={{ required: "Confirm Your Password" }}
                errors={errors}
              />
            </div>
          </div>

          <div className="">
            <div className="flex justify-between  items-center">
              <div>
                <div className="text-sm text-gray-500">
                  Two-Factor Authentication
                </div>
                <div className="font-semibold mt-2">Enabled</div>
              </div>
              <button
                type="button"
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  twoFactorEnabled ? "bg-[#000080]" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-[19px] w-[19px] transform rounded-full bg-white transition-transform ${
                    twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="  w-full flex justify-center items-center ">
          <FormButton
            mt={2}
            width="70%"
            type="submit"
            text="Done"
            // isLoading={isLoading}
            // disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );

  const DisplayView = () => (
    <div className="bg-white rounded-2xl border-2 relative">
      <div className="p-6 flex items-center justify-between">
        <div className="text-xl font-semibold">Security</div>
        <div className="h-5 w-5 text-gray-500">
          <button
            onClick={() => setEditOpen(true)}
            className="absolute top-3 right-3 p-2 hover:bg-gray-100 rounded-full"
          >
            <EditWriteIcon />
          </button>
        </div>
      </div>
      <div className="p-6 grid grid-cols-2 gap-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm text-gray-500 mb-2">Password</div>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center mt-1">
                ********
              </span>
              <EyeOffIcon size={16} className="text-gray-500 mb-1" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">
              Two-Factor Authentication
            </div>
            <div>Enabled</div>
          </div>
          <button
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              twoFactorEnabled ? "bg-[#000080]" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-[19px] w-[19px] transform rounded-full bg-white transition-transform ${
                twoFactorEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  return <>{editOpen ? <EditForm /> : <DisplayView />}</>;
};

export default SecuritySettings;
