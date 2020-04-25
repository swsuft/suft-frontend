import React from 'react';
import styled from 'styled-components';

const ContainerStyle = styled.div`
    margin: 0 auto;
    position: relative;
    width: auto;

    @media screen and (max-width: 420px) {
        margin: 0 1rem;
    }

    @media screen and (min-width: 0px) {
        max-width: 500px;
    }

    @media screen and (min-width: 1001px) {
        max-width: 960px;
    }

    @media screen and (min-width: 1400px) {
        max-width: 1250px;
    }
`;

const Container: React.FC = ({ children }) => <ContainerStyle>{children}</ContainerStyle>;

export default Container;
