import React from 'react';
import MainLayout from '../layouts/MainLayout';
import MainMenu from '../components/MainMenu';
import { useProfile } from '../hooks/useProfile';
import Login from '../components/Login';

const Main: React.FC = () => {
    const profile = useProfile();

    if (profile !== undefined && !profile.success) {
        return (
            <MainLayout>
                <Login/>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <MainMenu/>
        </MainLayout>
    );
};

export default Main;
