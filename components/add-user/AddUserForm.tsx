"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Home, Users, BookOpen, Settings, LogOut } from "lucide-react";

const ViewUserListForm: React.FC = () => {
  const [value, setValue] = useState("");
  const options = [
    { Label: "System Admin", Value: "systemadmin" },
    { Label: "Coordinator", Value: "coordinator" },
    { Label: "Class Admin", Value: "classadmin" },
    { Label: "Trainer", Value: "trainer" },
    { Label: "Trainee", Value: "trainee" },
  ];

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setValue(event.target.value);
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-[228px] bg-[#6FBC44] fixed h-screen">
        <div className="p-10">
          <Image
            src="/assets/images/fpt-logo.png"
            alt="FPT Logo"
            width={150}
            height={50}
            className="mb-8"
          />
        </div>

        <nav className="text-white">
          <a
            href="#"
            className="flex items-center px-6 py-3 hover:bg-[#5da639]"
          >
            <Home className="w-6 h-6 mr-4" />
            <span className="font-bold">Home</span>
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 hover:bg-[#5da639]"
          >
            <Users className="w-6 h-6 mr-4" />
            <span className="font-bold">User Management</span>
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 hover:bg-[#5da639]"
          >
            <BookOpen className="w-6 h-6 mr-4" />
            <span className="font-bold">Course Management</span>
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 mt-60 hover:bg-[#5da639]"
          >
            <Settings className="w-6 h-6 mr-4" />
            <span className="font-bold">Setting</span>
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 hover:bg-[#5da639]"
          >
            <LogOut className="w-6 h-6 mr-4" />
            <span className="font-bold">Sign out</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[228px] bg-[#EFF5EB] p-24">
        <div className="flex justify-between items-center p-8 border-b">
          <h2 className="text-4xl font-bold">Add New User</h2>
        </div>
        <div className="bg-white rounded-[40px] p-8 max-w-[1200px] mx-auto">
          <form className="grid grid-cols-2 gap-6">
            <div className="mb-6">
              <label className="block font-bold mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Input your name"
                className="w-full p-2 border border-gray-700 rounded"
              />
            </div>
            <div className="mb-6">
              <label className="block font-bold mb-1">Email</label>
              <input
                type="email"
                placeholder="Template@gmail.com"
                className="w-full p-2 border border-gray-700 rounded"
              />
            </div>
            <div className="mb-6">
              <label className="block font-bold mb-1">Account</label>
              <input
                type="tel"
                placeholder="Input Account"
                className="w-full p-2 border border-gray-700 rounded"
              />
            </div>
            <div className="mb-6">
              <label className="block font-bold mb-1">Password</label>
              <input
                type="tel"
                placeholder="Input Password"
                className="w-full p-2 border border-gray-700 rounded"
              />
            </div>
            <div className="mb-6">
              <label className="block font-bold mb-1">Role</label>
              <select
                className="w-full p-2.5 border border-gray-700 rounded"
                onChange={handleSelect}
              >
                
                {options.map((option) => (
                  <option key={option.Value} value={option.Value}>
                    {option.Label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block font-bold mb-1">PhoneNumber</label>
              <input
                type="text"
                placeholder="Input PhoneNumber"
                className="w-full p-2 border border-gray-700 rounded"
              />
            </div>
            
          </form>
          <div className="flex mt-10 ">
            <button
              type="submit"
              className="text-white bg-[#6FBC44] font-bold shadow-md hover:shadow-lg hover:bg-[#5da639] py-3 px-6 rounded mr-10"
            >
              Save
            </button>
            <button
              type="button"
              className="text-black bg-[#D5DCD0] font-bold shadow-md hover:shadow-lg hover:bg-gray-400 py-3 px-6 rounded"
            >
              Cancel
            </button>
          </div>
          <p className="text-center mt-6">
            Import a list?{" "}
            <a href="#" className="text-green-600">
              Click to download
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewUserListForm;
