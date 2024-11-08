"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Home, Users, BookOpen, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";

interface User {
  userId: number;
  fullName: string;
  email: string;
  roles: string;
  phone: string;
  status: "Active" | "Inactive";
}

const ViewUserListForm: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch danh sách users
  const fetchUsers = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      router.push("/authen/login");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8080/api/v1/user/management/list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Kiểm tra và xử lý dữ liệu trả về
      const userData = response?.data?.users;
      if (Array.isArray(userData)) {
        setUsers(userData);
      } else {
        console.error("Data received is not an array:", userData);
        setUsers([]);
      }
      setError(null);
    } catch (err) {
      setError("Error fetching users");
      console.error("Error fetching users:", err);
      setUsers([]); // Reset users về mảng rỗng khi có lỗi
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push("/authen/login");
      }
    } finally {
      setLoading(false);
    }
  };

  // Tìm kiếm users
  const searchUsers = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      router.push("/authen/login");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `http://http://localhost:8080/api/v1/user/management/list/search`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { searchTerm },
        }
      );

      // Kiểm tra và xử lý dữ liệu trả về
      const userData = response.data.content || response.data;
      if (Array.isArray(userData)) {
        setUsers(userData);
      } else {
        console.error("Search data received is not an array:", userData);
        setUsers([]);
      }
      setError(null);
    } catch (err) {
      setError("Error searching users");
      console.error("Error searching users:", err);
      setUsers([]); // Reset users về mảng rỗng khi có lỗi
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push("/authen/login");
      }
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật trạng thái user
  const handleToggleStatus = async (userId: number) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      router.push("/authen/login");
      return;
    }

    try {
      const user = users.find((u) => u.userId === userId);
      if (!user) return;

      const newStatus = user.status === "Active" ? "Inactive" : "Active";

      await axios.patch(
        `http://localhost:8080/api/v1/user/management/list/${userId}/status`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === userId ? { ...user, status: newStatus } : user
        )
      );

      setError(null);
    } catch (err) {
      setError("Error updating user status");
      console.error("Error updating user status:", err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push("/authen/login");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
          <h2 className="text-6xl font-bold">User List</h2>
          <div className="flex space-x-4">
            <form onSubmit={searchUsers} className="flex space-x-4">
              <input
                type="text"
                placeholder="Search..."
                className="border px-3 py-1 rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#6FBC44] text-white font-bold py-2 px-4 rounded shadow-gray-500 shadow-md hover:shadow-lg hover:shadow-gray-500 hover:bg-[#5da639]"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </form>
            <button
              className="bg-[#6FBC44] text-white font-bold py-2 px-4 rounded shadow-gray-500 shadow-md hover:shadow-lg hover:shadow-gray-500 hover:bg-[#5da639]"
              onClick={() => router.push("/feature/add-user")}
            >
              +Add New User
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <table className="w-full mt-10 table-auto border-collapse rounded py-5">
            <thead>
              <tr className="bg-[#6FBC44] text-white">
                <th className="px-6 py-3 uppercase tracking-wider border-r-white">
                  #
                </th>
                <th className="px-6 py-3 text-center uppercase tracking-wider border-r-white">
                  User name
                </th>
                <th className="px-6 py-3 text-center uppercase tracking-wider border-r-white">
                  Role
                </th>
                <th className="px-6 py-3 text-center uppercase tracking-wider border-r-white">
                  Email
                </th>
                <th className="px-6 py-3 text-center uppercase tracking-wider border-r-white">
                  Phone number
                </th>
                <th className="px-6 py-3 text-center uppercase tracking-wider border-r-white">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) &&
                users.map((user) => (
                  <tr
                    key={user.userId}
                    className={user.status === "Inactive" ? "bg-green-300" : ""}
                  >
                    <td className="border px-6 py-3 text-center">
                      {user.userId}
                    </td>
                    <td className="border px-6 py-3 text-center">
                      {user.fullName}
                    </td>
                    <td className="border px-6 py-3 text-center">
                      {user.roles}
                    </td>
                    <td className="border px-6 py-3 text-center">
                      {user.email}
                    </td>
                    <td className="border px-6 py-3 text-center">
                      {user.phone}
                    </td>
                    <td className="border px-6 py-3 text-center">
                      <div className="flex items-center justify-center">
                        <div
                          onClick={() => handleToggleStatus(user.userId)}
                          className={`flex h-6 w-12 cursor-pointer rounded-full border border-black ${
                            user.status === "Active"
                              ? "justify-end bg-green-500"
                              : "justify-start bg-black"
                          } px-[1px]`}
                        >
                          <motion.div
                            className="h-5 w-5 rounded-full bg-white"
                            layout
                            transition={{
                              type: "spring",
                              stiffness: 700,
                              damping: 30,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              {Array.isArray(users) && users.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No users found
                  </td>
                  <td className="border px-6 py-3 justify-center-center">
                    <div className="flex justify-center">
                      <Link href="#">
                        <FiEdit className="w-6 h-6 text-green-600 hover:text-green-800" />
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewUserListForm;
