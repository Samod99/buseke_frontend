import React, { useState } from "react";
import Favourites from "./Favs";
import UserInfo from "./UserInfo";
import ChangePwd from "./ChangePwd";
import CreateUser from "./CreateUser";
import UserList from "./UserList";
import CreateRoute from "./CreateRoute";
import RouteList from "./RouteList";
const Account = () => {
  const [activeTab, setActiveTab] = useState("User Info");

  const renderContent = () => {
    switch (activeTab) {
      case "User Info":
        return (
          <div className="p-6 bg-[#F6F6F6] rounded-lg shadow-md">
            <UserInfo />
          </div>
        );
      case "Favourites":
        return <div className="p-6 bg-[#F6F6F6] rounded-lg shadow-md">
          <Favourites />
        </div>;
      case "Change Password":
        return <div className="p-6 bg-[#F6F6F6] rounded-lg shadow-md">
          <ChangePwd />
        </div>;
      case "Create User":
        return <div className="p-6 bg-[#F6F6F6] rounded-lg shadow-md">
          <CreateUser />
        </div>;
      case "User List":
        return <div className="p-6 bg-[#F6F6F6] rounded-lg shadow-md">
          <UserList />
        </div>;
      case "Create Route":
        return <div className="p-6 bg-[#F6F6F6] rounded-lg shadow-md">
          <CreateRoute />
        </div>;
      case "Route List":
        return <div className="p-6 bg-[#F6F6F6] rounded-lg shadow-md">
          <RouteList />
        </div>;
      case "Logout":
        return <div className="p-6 bg-[#F6F6F6] rounded-lg shadow-md">
          <button className="px-8 py-2 text-sm bg-[#2b241a] text-white rounded-md" onClick={handleLogout}>
              Logout
            </button>
        </div>;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem("token");

    // Optional: Provide feedback to the user
    alert("You have been logged out successfully.");

    // Redirect to login page
    window.location.href = "/login"; // Or use navigate if using react-router
  };

  return (
    <div className="container mx-auto p-4">
      {/* Breadcrumb */}
      <div className="my-8 text-sm text-gray-600">
        <span>Account &gt; </span>
        <span className="text-[#2b241a] font-medium">{activeTab}</span>
      </div>

      <div className="flex space-x-8">
        {/* Sidebar */}
        <aside className="w-1/4 bg-[#B0A89466] rounded-lg shadow-md">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <nav className="space-y-4">
              {["User Info", "Favourites", "Change Password", "Create User", "User List", "Create Route", "Route List", "Logout"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`block w-full text-left px-4 py-2 rounded-md font-medium ${
                      activeTab === tab
                        ? "bg-[#2b241a] text-white"
                        : "text-gray-700 hover:bg-[#2b241a]/10"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-3/4">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Account;
