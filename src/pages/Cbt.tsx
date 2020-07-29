import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Viewer } from '@toast-ui/react-editor';
import cogoToast from 'cogo-toast';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Container from '../utils/ContainerUtils/Container';
import FontedTitle from '../atomics/Typography/FontedTitle';
import FontedMiddleText from '../atomics/Typography/FontedMiddleText';
import useToken from '../hooks/useToken';
import DefaultLayout from '../layouts/DefaultLayout';
import NumberButton from '../atomics/NumberButton';
import CbtAnswer from '../components/CbtAnswer';
import ErrorCode from '../error/ErrorCode';
import ProblemViewer from '../components/ProblemViewer';
import { Problem } from '../payloads/Problem';
import subjectToString from '../utils/SubjectToString';
import { getGraphQLError } from '../api/errorHandler';

const NumberButtonContainer = styled.div`
    margin: 1rem auto;
`;

const TitleStyle = styled.div`
    & > p {
        margin-bottom: 0;
    }
`;

const SubTitleStyle = styled.div`
    & > p {
        margin-bottom: 2rem;
    }
`;

const SkipWrapper = styled.span`
    & > button {
        margin-left: 1rem;
        width: 64px;
        background-color: var(--color-orange);
    }
`;

interface CbtParams {
    readonly subject: string;
    readonly grade: string;
    readonly times: string;
}

const SEARCH_PROBLEM = gql`
    query($grade: Int!, $subject: Int!, $times: String!) {
        searchProblem(filter: { grade: $grade, subject: $subject, times: $times }) {
            email
            contents
            answer
            author
            grade
            subject
            times
        }
    }
`;

const Cbt: React.FC<RouteComponentProps<CbtParams>> = ({ match }) => {
    const refreshToken = useToken();
    const [random, setRandom] = useState<number>(0);
    const [overlapRandom, setOverlapRandom] = useState<number[]>([0]);

    const [userAnswer, setUserAnswer] = useState<string>('');

    const [problems, setProblems] = useState<Problem[]>([]);
    const [count, setCount] = useState<number>(1);
    const [isLoading, setBeLoading] = useState<boolean>(true);

    const inputRef = useRef<HTMLInputElement>(null);
    const viewerRef = useRef<Viewer>();

    const { subject, grade, times } = match.params;
    const { loading, error, data } = useQuery(SEARCH_PROBLEM, {
        variables: {
            grade: parseInt(grade, 10),
            subject: parseInt(subject, 10),
            times
        }
    });

    const pickRandomNumber = () => {
        if (problems.length === 0) return;

        if (overlapRandom.length === problems.length) {
            cogoToast.info('모든 문제를 풀었어요! 새로고침하여 다시 시작할 수 있어요.');
            return;
        }

        let rand = Math.floor(Math.random() * problems.length);

        while (overlapRandom.includes(rand)) {
            rand = Math.floor(Math.random() * problems.length);
        }

        if (viewerRef.current === undefined) return;
        viewerRef.current.getInstance().setMarkdown(problems[rand].contents);

        setOverlapRandom((arr) => [...arr, rand]);
        setRandom(rand);
        setCount((prev) => prev + 1);
    };

    const checkAnswer = (input: string = userAnswer) => {
        const answer = isLoading && problems[random] !== undefined ? problems[random].answer : '';

        if (input === '') {
            cogoToast.warn('정답을 입력해주세요.');
            return;
        }

        if (input === answer) {
            cogoToast.success('정답입니다!');
            pickRandomNumber();
        } else {
            cogoToast.error('오답입니다. 다시 한번 시도해보세요.');
        }

        setUserAnswer('');
    };

    useEffect(() => {
        setBeLoading(!loading);

        if (loading) {
            cogoToast.loading('지금 문제를 가져오고 있어요...', {
                hideAfter: 1
            });
            return;
        }

        if (error) {
            const gerror = getGraphQLError(error);
            if (!gerror) return;

            if (gerror[0] === ErrorCode.NO_PERMISSION) {
                refreshToken();
            } else {
                cogoToast.error(gerror[1]);
            }

            return;
        }

        if (viewerRef.current === undefined) return;
        if (data.searchProblem.length === 0) {
            viewerRef.current.getInstance().setMarkdown('<h3>문제가 존재하지 않습니다.</h3>');
            return;
        }

        viewerRef.current.getInstance().setMarkdown(data.searchProblem[0].contents);

        setProblems(data.searchProblem);
    }, [refreshToken, loading, data, error]);

    const subjectView = isLoading ? subjectToString(match.params.subject) : '과목';

    return (
        <DefaultLayout>
            <Container>
                <TitleStyle>
                    <FontedTitle>
                        {subjectView} {count}번 문제
                    </FontedTitle>
                </TitleStyle>
                <SubTitleStyle>
                    <FontedMiddleText>
                        작성자: {isLoading && problems[random] !== undefined ? problems[random].author : '알수없음'}
                    </FontedMiddleText>
                </SubTitleStyle>

                <ProblemViewer viewerRef={viewerRef} />

                <br />
                <hr />

                <NumberButtonContainer>
                    <NumberButton onClick={() => checkAnswer('1')}>1번</NumberButton>
                    <NumberButton onClick={() => checkAnswer('2')}>2번</NumberButton>
                    <NumberButton onClick={() => checkAnswer('3')}>3번</NumberButton>
                    <NumberButton onClick={() => checkAnswer('4')}>4번</NumberButton>
                    <NumberButton onClick={() => checkAnswer('5')}>5번</NumberButton>
                    <SkipWrapper>
                        <NumberButton onClick={() => pickRandomNumber()}>넘어가기</NumberButton>
                    </SkipWrapper>
                </NumberButtonContainer>

                <CbtAnswer
                  inputRef={inputRef}
                  answerValue={userAnswer}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserAnswer(e.target.value)}
                  onKeyPress={(e: React.KeyboardEvent) => {
                        if (e.key === 'Enter') checkAnswer();
                    }}
                  onButtonClick={() => checkAnswer()}
                />
            </Container>
        </DefaultLayout>
    );
};

export default withRouter(Cbt);
