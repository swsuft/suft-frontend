import React from 'react';
import Register from '../components/Register';
import DefaultLayout from '../layouts/DefaultLayout';
import CenterContainer from '../utils/ContainerUtils/CenterContainer';

const RegisterPage: React.FC = () => {
    return (
        <DefaultLayout>
            <CenterContainer>
                <Register />
            </CenterContainer>
        </DefaultLayout>
    );
};

export default RegisterPage;
