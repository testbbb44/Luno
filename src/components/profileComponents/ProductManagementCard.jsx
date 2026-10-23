
import React, { useState } from "react";
import { Pencil, X } from "lucide-react";
import { EditWriteIcon } from "../icons/Icons";
import FormButton from "../FormBtn";

const ProductManagementCard = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [timeZone, setTimeZone] = useState("West Africa Standard Time");
  const [notifications, setNotifications] = useState({
    inApp: true,
    sms: false,
    email: true,
  });
  const [language, setLanguage] = useState("English");

  const languages = ["English", "French", "Spanish", "German", "Japanese"];
  const timeZones = [
    "West Africa Standard Time",
    "Eastern Standard Time",
    "Pacific Standard Time",
    "Central European Time",
    "Japan Standard Time",
  ];
  const toggleNotification = (type) => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Here you would typically send the data to a server
    setEditOpen(false);
  };

  const EditForm = () => (
    <form
      onSubmit={handleSave}
      className="bg-white rounded-2xl border-2 shadow-sm p-6 space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Project Management</h2>
        <button
          type="button"
          onClick={() => setEditOpen(false)}
          className="text-gray-500"
        >
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className="block text-sm text-gray-500 mb-2">Time Zone</label>
          <select
            id="timeZone"
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {timeZones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-2">
            Notifications
          </label>
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between mb-2">
              <span className="capitalize font-semibold">{key}</span>
              <button
                type="button"
                onClick={() => toggleNotification(key)}
                className={`relative  inline-flex h-6 w-11 items-center rounded-full ${
                  value ? "bg-primary-background" : "bg-gray-200"
                } transition-colors focus:outlinghe-none`}
              >
                <span
                  className={`inline-block h-[19px] w-[19px] transform rounded-full  bg-white transition-transform ${
                    value ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
      <div>
        <label className="block text-sm text-gray-500 mb-2">Language</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
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
  );

  const DisplayCard = () => (
    <div className="bg-white rounded-2xl border-2 shadow-sm">
      <div className="p-6 flex items-center justify-between">
        <div className="text-xl font-semibold">Project Management</div>
        <button
          onClick={() => setEditOpen(true)}
          className="h-5 w-5 text-gray-500"
        >
          <EditWriteIcon />
        </button>
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="text-sm text-gray-500 mb-2">Time Zone</div>
            <div className="font-semibold">{timeZone}</div>
          </div>

          <div>
            <div className="text-sm text-gray-500 mb-4">Notification</div>
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="capitalize font-semibold">{key}</div>
                  <div
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      value ? "bg-primary-background" : "bg-gray-200"
                    } transition-colors focus:outline-none`}
                  >
                    <div
                      className={`h-[19px] w-[19px] transform rounded-full bg-white transition-transform ${
                        value ? "translate-x-6" : "translate-x-1"
                      }`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500 mb-2">Language</div>
          <div className="font-semibold">{language}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-6">{editOpen ? <EditForm /> : <DisplayCard />}</div>
  );
};

export default ProductManagementCard;
