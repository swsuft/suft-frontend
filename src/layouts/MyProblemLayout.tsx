import React from 'react';
import styled from 'styled-components';
import Container from '../utils/ContainerUtils/Container';
import DefaultLayout from './DefaultLayout';
import SideMenu from '../components/SideMenu';

const ProblemContainer = styled.div`
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 420px) {
        flex-direction: column;
    }
`;

const BodyStyle = styled.div`
    width: 100%;
`;

const items = [
    {
        to: '/myproblem/create',
        name: '문제 등록'
    },
    {
        to: '/myproblem/view',
        name: '문제 관리'
    }
];

const MyProblemLayout: React.FC = ({ children }) => {
    return (
        <DefaultLayout>
            <Container>
                <ProblemContainer>
                    <SideMenu menuTitle="내 문제" items={items} current={window.location.pathname} />
                    <BodyStyle>{children}</BodyStyle>
                </ProblemContainer>
            </Container>
        </DefaultLayout>
    );
};

export default MyProblemLayout;
