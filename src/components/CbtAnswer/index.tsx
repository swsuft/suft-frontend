import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const AnswerContainer = styled.div`
    margin-top: 1rem;
`;

const InputStyle = styled.input`
    border: none;
    border-radius: 10px 0 0 10px;
    vertical-align: middle;
    width: 300px;
    height: 30px;
    padding-left: 10px;

    @media screen and (max-width: 420px) {
        border-radius: 10px;
    }
`;

const ButtonStyle = styled.button`
    vertical-align: middle;
    border: none;
    border-radius: 0 10px 10px 0;
    width: 100px;
    height: 30px;
    color: #000;
    background-color: var(--color-yellow);
    cursor: pointer;

    @media screen and (max-width: 420px) {
        border-radius: 10px;
    }
`;

const EtcTextStyle = styled.p`
    font-size: 12px;
    color: var(--color-text);
`;

interface CbtAnswerProps {
    readonly answerValue: string;
    readonly onChange?: React.ChangeEventHandler;
    readonly onKeyPress?: React.KeyboardEventHandler;
    readonly onButtonClick?: React.MouseEventHandler;
}

const CbtAnswer: React.FC<CbtAnswerProps> = ({ answerValue, onChange, onKeyPress, onButtonClick }) => {
    return (
        <AnswerContainer>
            <InputStyle value={answerValue} autoFocus placeholder="정답을 입력해주세요." onChange={onChange} onKeyPress={onKeyPress} />
            <ButtonStyle type="button" onClick={onButtonClick}>
                <FontAwesomeIcon icon={faPaperPlane} /> 제출
            </ButtonStyle>
            <EtcTextStyle>* 숫자 버튼을 이용하거나 입력칸을 이용하여 정답을 제출 할 수 있습니다.</EtcTextStyle>
        </AnswerContainer>
    );
};

export default CbtAnswer;
