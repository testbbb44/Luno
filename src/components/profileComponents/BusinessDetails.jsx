import React from "react";
import { EditIcon, EditWriteIcon } from "../icons/Icons";
import { useState, useRef } from "react";
import { Camera } from "lucide-react";
import CloseIcon from "@mui/icons-material/Close";
import FormButton from "../FormBtn";
import FormFieldComp from "../form/FormFieldComp";
import { useForm } from "react-hook-form";
import { useApiPost } from "@/hooks/useApi";

const BusineddDetailsComponent = ({ data, refetch, loading }) => {
  const [editOpen, setEditOPen] = useState(false);
  const { post, isLoading } = useApiPost();


  const roleOptions = [
    { label: "Manager", value: "manager" },
    { label: "Developer", value: "developer" },
    { label: "Designer", value: "designer" },
    { label: "Other", value: "other" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    console.log("this is the form data", formData);

    const newFormData = {
      fullname: formData.fullname,
      phone_number: formData.phoneNumber,
      // address: data.address,
      // gender: data.gender,
      // password: formData,
      business_name: formData.business_name,
      bussiness_type: data.bussiness_type,
      industry: formData.industry,
      role: formData.role,
    };

    const result = await post("/update-profile", newFormData);

    if (result.status === "success") {
      reset();
      setEditOPen(false);
      refetch();
    }
    console.log("hello");
  };

  return (
    <div className="mt-6">
      {editOpen ? (
        <div className="border-2 rounded-xl relative pt-8 p-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold absolute top-2">
              Business Details
            </h3>
            <div
              onClick={() => setEditOPen(false)}
              className=" hover:bg-offwhite cursor-pointer h-6 w-6 flex justify-center items-center top-2 rounded-full font-thin right-2 absolute"
            >
              <CloseIcon
                sx={{
                  fontWeight: "300",
                  color: "grey",
                  fontSize: "18px",
                }}
              />
            </div>
          </div>

          <form
            className=" flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
              <FormFieldComp
                // bg
                label="Full name "
                name={`fullname`}
                type="text"
                defaultValue={data.fullname}
                // placeholder="Enter full name"
                register={register}
                setValue={setValue}
                validation={{ required: "Full name is required" }}
                errors={errors}
              />
              <FormFieldComp
                // bg
                label="Business Name"
                defaultValue={data.business_name}
                name={`business_name`}
                type="text"
                // placeholder="Enter full name"
                register={register}
                setValue={setValue}
                validation={{ required: "Business Name is required" }}
                errors={errors}
              />
            </div>

            <div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
              <FormFieldComp
                bg
                label="Role"
                name={`role`}
                type="select"
                defaultValue={data.role}
                register={register}
                setValue={setValue}
                validation={{ required: "Role is required" }}
                errors={errors}
                options={roleOptions}
              />
              <FormFieldComp
                bg
                label="Industry"
                defaultValue={data.industry}
                name={`industry`}
                type="select"
                register={register}
                setValue={setValue}
                validation={{ required: "industry is required" }}
                errors={errors}
                options={roleOptions}
              />
            </div>
            <div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
              <FormFieldComp
                // bg
                label="Email "
                name={`email`}
                type="text"
                defaultValue={data.email}
                // placeholder="Enter full name"
                register={register}
                setValue={setValue}
                validation={{ required: "Email is required" }}
                errors={errors}
              />
              <FormFieldComp
                // bg
                label="Phone Number"
                name={`phoneNumber`}
                defaultValue={data.phone_number}
                type="number"
                // placeholder="Enter full name"
                register={register}
                setValue={setValue}
                validation={{ required: "Phone number is required" }}
                errors={errors}
              />
            </div>
            <div className="  w-full flex justify-center items-center ">
              <FormButton
                mt={2}
                width="70%"
                type="submit"
                text="Done"
                isLoading={isLoading}
                disabled={isLoading}
              />
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white border-2 relative rounded-lg ">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Business Details</h3>
              <button
                onClick={() => setEditOPen(true)}
                className="absolute top-3 right-3 p-2 hover:bg-gray-100 rounded-full"
              >
                <EditWriteIcon />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-xs">Full Name</p>
                  <p className="font-semibold text-sm">
                    {data.fullname ?? "---"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Role</p>
                  <p className="font-semibold text-sm">{data.role ?? "---"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Email Address</p>
                  <p className="font-semibold text-sm">{data.email ?? "---"}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-xs">Business Name</p>
                  <p className="font-semibold text-sm">
                    {data.business_name === "" ? "---" : data.business_name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Industry</p>
                  <p className="font-semibold text-sm">
                    {data.industry ?? "---"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Phone Number</p>
                  <p className="font-semibold text-sm">
                    {data.phone_number ?? "---"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusineddDetailsComponent;
