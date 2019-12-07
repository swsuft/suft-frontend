import React from 'react';
import Register from '../components/Register';
import AuthLayout from '../layouts/AuthLayout';

const RegisterPage: React.FC = () => {
    return (
        <AuthLayout>
            <Register/>
        </AuthLayout>
    );
};

export default RegisterPage;
