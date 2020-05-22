import React from 'react';
import FontedTitle from '../../atomics/Typography/FontedTitle';
import AdminLayout from '../../layouts/AdminLayout';
import ProblemTable from '../../components/Admin/ProblemTable';

const AdminProblemView: React.FC = () => {
    return (
        <AdminLayout>
            <FontedTitle>문제 관리</FontedTitle>
            <ProblemTable />
        </AdminLayout>
    );
};

export default AdminProblemView;
