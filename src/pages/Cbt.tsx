import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Viewer } from '@toast-ui/react-editor';
import cogoToast from 'cogo-toast';
import Container from '../utils/ContainerUtils/Container';
import FontedTitle from '../atomics/Typography/FontedTitle';
import FontedMiddleText from '../atomics/Typography/FontedMiddleText';
import useToken from '../hooks/useToken';
import DefaultLayout from '../layouts/DefaultLayout';
import NumberButton from '../atomics/NumberButton';
import CbtAnswer from '../components/CbtAnswer';
import ErrorCode from '../error/ErrorCode';
import ProblemApi from '../api/Problem';
import ProblemViewer from '../components/ProblemViewer';
import { Problem } from '../payloads/Problem';
import subjectToString from '../utils/SubjectToString';

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

const Cbt: React.FC<RouteComponentProps<CbtParams>> = ({ match }) => {
    const refreshToken = useToken();
    const [isLoading, setBeLoading] = useState<boolean>(false);
    const [random, setRandom] = useState<number>(0);
    const [overlapRandom, setOverlapRandom] = useState<number[]>([0]);

    const [userAnswer, setUserAnswer] = useState<string>('');

    const [problems, setProblems] = useState<Problem[]>([]);
    const [count, setCount] = useState<number>(1);

    const inputRef = useRef<HTMLInputElement>(null);
    const viewerRef = useRef<Viewer>();

    const pickRandomNumber = () => {
        if (problems.length === 0) return;

        if (overlapRandom.length === problems.length) {
            cogoToast.info('모든 문제를 풀었습니다. 새로고침하여 새로 시작할 수 있습니다.');
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
        const { subject, grade, times } = match.params;

        ProblemApi.filter(subject, grade, times)
            .then((res) => {
                if (viewerRef.current === undefined) return;
                if (res.data.data.length === 0) {
                    viewerRef.current.getInstance().setMarkdown('<h3>문제가 존재하지 않습니다.</h3>');
                    return;
                }

                viewerRef.current.getInstance().setMarkdown(res.data.data[0].contents);

                setProblems(res.data.data);
            })
            .catch((err) => {
                const { code } = err.response.data;

                if (code === ErrorCode.JWT_EXPIRED) {
                    refreshToken();
                }
            });

        setBeLoading(true);
    }, [match.params, refreshToken]);

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
