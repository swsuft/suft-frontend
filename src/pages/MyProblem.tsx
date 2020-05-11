import React, { useRef } from 'react';
import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import FontedTitle from '../atomics/Typography/FontedTitle';
import Container from '../utils/ContainerUtils/Container';
import DefaultLayout from '../layouts/DefaultLayout';
import ProblemEditor from '../components/ProblemEditor';

const ProblemContainer = styled.div`
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 420px) {
        flex-direction: column;
    }
`;

const SideContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 2.2rem;

    @media screen and (max-width: 420px) {
        margin-right: 0;
    }
`;

const SideListStyle = styled.div`
    border: var(--color-gray-background) solid 1.2px;
    border-radius: 10px;
`;

const SideItemStyle = styled.div`
    color: var(--color-text);
    cursor: pointer;
    padding: 1rem 2rem;
    white-space: nowrap;
    text-align: center;

    &:hover {
        background-color: var(--color-gray-background);
    }
`;

const FontedTitleStyle = styled(FontedTitle)`
    margin-bottom: 1.6rem;

    @media screen and (max-width: 420px) {
        text-align: center;
    }
`;

const BodyStyle = styled.div`
    width: 100%;
`;

const MyProblem: React.FC = () => {
    const editorRef = useRef<Editor>();

    return (
        <DefaultLayout>
            <Container>
                <ProblemContainer>
                    <SideContainer>
                        <FontedTitleStyle>내 문제</FontedTitleStyle>
                        <SideListStyle>
                            <SideItemStyle>문제 등록</SideItemStyle>
                            <SideItemStyle>문제 관리</SideItemStyle>
                            <SideItemStyle>어쩌구</SideItemStyle>
                            <SideItemStyle>저쩌구</SideItemStyle>
                            <SideItemStyle>그래서</SideItemStyle>
                            <SideItemStyle>그랬다</SideItemStyle>
                        </SideListStyle>
                    </SideContainer>
                    <BodyStyle>
                        <FontedTitle>문제 등록</FontedTitle>
                        <ProblemEditor editorRef={editorRef} />
                    </BodyStyle>
                </ProblemContainer>
            </Container>
        </DefaultLayout>
    );
};

export default MyProblem;
