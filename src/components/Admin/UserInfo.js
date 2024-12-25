import React from "react";

const PersonalDetails = () => {
  return (
    <div className="">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Personal details</h2>
      <div className="flex items-start space-x-8">
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First name
            </label>
            <input
              type="text"
              defaultValue="Priyanka"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#2b241a] focus:border-[#2b241a] sm:text-sm bg-gray-100 py-2 px-4"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <input
              type="text"
              defaultValue="Chopra"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#2b241a] focus:border-[#2b241a] sm:text-sm bg-gray-100 py-2 px-4"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Birthday
            </label>
            <input
              type="text"
              defaultValue="01/01/1990"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#2b241a] focus:border-[#2b241a] sm:text-sm bg-gray-100 py-2 px-4"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              defaultValue="priyanka@gmail.com"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#2b241a] focus:border-[#2b241a] sm:text-sm bg-gray-100 py-2 px-4"
              disabled
            />
          </div>
          <div className="flex-shrink-0">
            <button className="mt-4 px-8 py-2 text-sm bg-[#2b241a] text-white rounded-md">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
