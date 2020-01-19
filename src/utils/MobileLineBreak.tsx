import React from 'react';
import styled from 'styled-components';

const LineBreakStyle = styled.br`
    display: none;

    @media screen and (max-width: 420px) {
        display: inline;
    }
`;

const MobileLineBreak: React.FC = () => <LineBreakStyle />;

export default MobileLineBreak;
