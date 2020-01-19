import React from 'react';
import Register from '../components/Register';
import MainLayout from '../layouts/MainLayout';
import CenterContainer from '../utils/ContainerUtils/CenterContainer';

const RegisterPage: React.FC = () => {
    return (
        <MainLayout>
            <CenterContainer>
                <Register />
            </CenterContainer>
        </MainLayout>
    );
};

export default RegisterPage;
