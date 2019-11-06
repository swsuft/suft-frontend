import React from 'react';
import styled from 'styled-components';

const ContainerStyle = styled.div`
    margin: 0 auto;
    position: relative;
    width: auto;

    @media screen and (min-width: 1024px) {
        max-width: 640px;
    }

    @media screen and (min-width: 1216px) {
        max-width: 840px;
    }

    @media screen and (min-width: 1408px) {
        max-width: 1100px;
    }
`;

const Container: React.FC = ({ children }) => <ContainerStyle>{children}</ContainerStyle>;

export default Container;
