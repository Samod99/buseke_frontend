// Pages/Home.js
import React from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import AccountComponent from '../../components/Admin/AccountComponent'; // Renaming the imported Account component

const Account = () => {
    return (
        <AdminLayout>
            <AccountComponent /> {/* Use the renamed component */}
        </AdminLayout>
    );
};

export default Account;
