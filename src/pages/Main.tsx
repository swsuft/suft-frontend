import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Login from '../components/Login';
import MainMenu from '../components/MainMenu';
import { useProfile } from '../hooks/useProfile';

const Main: React.FC = () => {
    const profile = useProfile();

    if (profile !== undefined && !profile.success) {
        return (
            <MainLayout>
                <Login />
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <MainMenu />
        </MainLayout>
    );
};

export default Main;
