import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
    margin: 4px auto;
`;

const NoticeStyle = styled.p`
    font-size: 16px;
`;

const NoticeDateStyle = styled.p`
    font-size: 12px;
    color: var(--color-text);
`;

interface NoticeBoxProps {
    readonly year: number;
    readonly month: number;
    readonly day: number;
}

const InfoNoticeBox: React.FC<NoticeBoxProps> = ({ year, month, day, children }) => {
    return (
        <Wrap>
            <NoticeStyle>{children}</NoticeStyle>
            <NoticeDateStyle>
                {year}년 {month}월 {day}일
            </NoticeDateStyle>
        </Wrap>
    );
};

export default InfoNoticeBox;
