import React from 'react';
import styled from 'styled-components';
import { ReactComponent as TestRes } from '../../../assets/icons/test.svg';

const TestStyle = styled(TestRes)<{ size: string }>`
    width: ${(props) => props.size};
    height: ${(props) => props.size};
`;

interface TestProps {
    readonly size: string;
}

const TestIcon: React.FC<TestProps> = ({ size }) => {
    return <TestStyle size={size} />;
};

export default TestIcon;
