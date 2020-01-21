import React from 'react';
import styled from 'styled-components';
import { ReactComponent as TestIcon } from '../../../assets/icons/test.svg';

const TestStyle = styled(TestIcon)<{ size: string }>`
    width: ${(props) => props.size};
    height: ${(props) => props.size};
`;

interface TestProps {
    readonly size: string;
}

const Test: React.FC<TestProps> = ({ size }) => {
    return <TestStyle size={size} />;
};

export default Test;
