import React from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import FontedTitle from '../atomics/Typography/FontedTitle';
import Container from '../utils/ContainerUtils/Container';

const MyInfo: React.FC = () => {
    return (
        <DefaultLayout>
            <Container>
                <FontedTitle>내 정보</FontedTitle>

            </Container>
        </DefaultLayout>
    );
};

export default MyInfo;
