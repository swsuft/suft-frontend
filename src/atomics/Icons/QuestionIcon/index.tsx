import React from 'react';
import styled from 'styled-components';
import { ReactComponent as QuestionRes } from '../../../assets/icons/question.svg';

const QuestionStyle = styled(QuestionRes)<{ size: string }>`
    width: ${(props) => props.size};
    height: ${(props) => props.size};
`;

interface QuestionProps {
    readonly size: string;
}

const QuestionIcon: React.FC<QuestionProps> = ({ size }) => {
    return <QuestionStyle size={size} />;
};

export default QuestionIcon;
