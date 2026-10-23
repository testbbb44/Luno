import React from "react";
import { EditIcon, EditWriteIcon, LoaderIcon } from "../icons/Icons";
import { useState, useRef } from "react";
import { Camera } from "lucide-react";
import CloseIcon from "@mui/icons-material/Close";
import userNoBio from "../../assets/user-no-bio.png";
import { useApiPost } from "@/hooks/useApi";
import FormButton from "../FormBtn";

const ProfileImageComponent = ({ data, refetch, loading }) => {
  const { post, isLoading, error } = useApiPost();
  console.log("this is the data", data);

  const [editOpen, setEditOPen] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check if a file was selected
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload only image files");
      return;
    }

    // Create preview URL and store file
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
    setSelectedImage(file);

    // Log file details
    console.log("Selected file:", {
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024).toFixed(2)} KB`,
    });
  };

  const handleDone = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("profile_picture", selectedImage);
      const result = await post("/update-profile-picture", formData);
      if (result.status === "success") {
        console.log("its successful");
        refetch();
        window.location.reload()
        setEditOPen(false);
      } else {
        console.log("its unsuccessful");
      }
    } else {
      console.log("No image selected");
    }
  };
  return (
    <div>
      {editOpen ? (
        <div className="border-2 rounded-xl relative pt-12 p-4">
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
          <div className="bg-white rounded-lg max-w-[500px] m-auto">
            <div className="flex  flex-col md:flex-row gap-6 items-center">
              {/* Upload Section */}
              <div
                onClick={handleImageClick}
                className=" border  w-full md:w-1/2 aspect-video  bg-offwhite rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                {previewUrl ? (
                  <div className="w-full h-full relative">
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt="Profile Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <>
                    <Camera className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm font-semibold text-gray-500">
                      Upload Profile Picture
                    </p>
                  </>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">{data.fullname}</h2>
                <p className="text-grey text-sm">Graphic Designer</p>
                <p className="text-gray-500 text-xs">{data.role}</p>
              </div>
            </div>

            {/* Done Button */}
            <div className="mt-6 flex items-center">
              <FormButton
                mt={1}
                width="100%"
                type="button"
                onClick={handleDone}
                text="Done"
                isLoading={isLoading}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border-2">
          <div className="p-6 flex items-center gap-4 relative">
            <div className="w-20 bg-[#f0f1fc] border-2 flex justify-center items-center border-[#c7d4ff] h-20 rounded-full overflow-hidden">
              {loading ? (
                <div className="">
                  <LoaderIcon />
                </div>
              ) : (
                <img
                  src={data?.profile_picture ?? userNoBio}
                  alt="Profile"
                  loading="lazy"
                  // width={64}
                  // height={64}
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">{data.fullname}</h2>
              <p className="text-grey text-sm">Graphic Designer</p>
              <p className="text-gray-500 text-xs">{data.role}</p>
            </div>
            <button
              onClick={() => setEditOPen(true)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <EditWriteIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileImageComponent;
