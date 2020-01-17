import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';

const CbtWrapStyle = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
`;

const CbtContentsStyle = styled.div`
    flex: 1;
`;

const CbtLayout: React.FC = ({ children }) => {
    return (
        <CbtWrapStyle>
            <CbtContentsStyle>{children}</CbtContentsStyle>

            <Footer />
        </CbtWrapStyle>
    );
};

export default CbtLayout;
