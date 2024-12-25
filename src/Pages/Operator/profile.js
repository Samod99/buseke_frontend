// Pages/Home.js
import React from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import OperatorAccount from '../../components/Operator/OperatorAccount'; // Renaming the imported Account component

const Account = () => {
    return (
        <AdminLayout>
            <OperatorAccount /> {/* Use the renamed component */}
        </AdminLayout>
    );
};

export default Account;
