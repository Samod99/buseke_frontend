import React, { useState } from "react";
import UserInfo from "./UserInfo.js";
import CreateBus from "./CreateBus";
import BusList from "./BusList";
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
      case "Create Bus":
        return <div className="p-6 bg-[#F6F6F6] rounded-lg shadow-md">
          <CreateBus />
        </div>;
      case "Bus List":
        return <div className="p-6 bg-[#F6F6F6] rounded-lg shadow-md">
          <BusList />
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
    
    localStorage.removeItem("token");

    alert("You have been logged out successfully.");

    window.location.href = "/login"; 
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
              {["User Info", "Create Bus", "Bus List", "Logout"].map(
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













// import React, { useState } from "react";

// const Account = () => {

   
//     return (
//         <div className="container mx-auto p-4">
//             {/* Breadcrumb */}
//             <div className="my-8 text-sm text-gray-600">
//                 <span>Bus Management &gt; </span>
//                 <span className="text-[#2b241a] font-medium">home</span>
//             </div>

            
//         </div>
//     );
// };

// export default Account;
