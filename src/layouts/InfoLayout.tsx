import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Background from '../utils/Background';
import Container from '../utils/ContainerUtils/Container';

const WrapStyle = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
`;

const ContentsStyle = styled.div`
    flex: 1;
`;

const InfoLayout: React.FC = ({ children }) => {
    return (
        <WrapStyle>
            <ContentsStyle>
                <Container>{children}</Container>
            </ContentsStyle>

            <br />

            <Footer />
            <Background color="#f1f2f6" />
        </WrapStyle>
    );
};

export default InfoLayout;
