import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import config from '../config';
import CbtLayout from '../layouts/CbtLayout';
import Container from '../utils/ContainerUtils/Container';
import FontedTitle from '../atomics/Typography/FontedTitle';
import FontedMiddleText from '../atomics/Typography/FontedMiddleText';
import useToken from '../hooks/useToken';

const InputStyle = styled.input`
    border: none;
    border-radius: 10px 0px 0px 10px;
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
    border-radius: 0px 10px 10px 0px;
    width: 100px;
    height: 30px;
    color: #000;
    background-color: var(--color-yellow);
    cursor: pointer;

    @media screen and (max-width: 420px) {
        border-radius: 10px;
    }
`;

const NumberButtonWrapperStyle = styled.div`
    margin: 1rem auto;
`;

const NumberButtonStyle = styled.button`
    vertical-align: middle;
    border: none;
    border-radius: 10px;
    width: 36px;
    height: 36px;
    color: #000;
    background-color: var(--color-yellow);
    cursor: pointer;
    margin-right: 10px;
`;

const EtcTextStyle = styled.p`
    font-size: 12px;
    color: var(--color-text);
`;

const AnswerWrapStyle = styled.div`
    margin-top: 1rem;
`;

const ProblemBoxStyle = styled.div`
    margin-bottom: 1rem;
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

interface CbtParams {
    readonly subject: string;
    readonly grade: string;
    readonly times: string;
}

const Cbt: React.FC<RouteComponentProps<CbtParams>> = ({ match }) => {
    const refreshToken = useToken();
    const [isLoading, setBeLoading] = useState(false);
    const [random, setRandom] = useState(0);
    const [overlapRandom, setOverlapRandom] = useState<number[]>([0]);
    const [data, setData] = useState<any[]>([]);
    const [userAnswer, setUserAnswer] = useState('');
    const [count, setCount] = useState(0);

    useEffect(() => {
        const { subject, grade, times } = match.params;

        axios
            .get(`${config.ENDPOINT}/problem/get/${subject}/${grade}/${times}`, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                if (!res.data.success) {
                    if (res.data.message === '토큰이 만료되었습니다.') {
                        refreshToken();
                        return;
                    }

                    alert(res.data.message);
                    return;
                }

                setCount(res.data.problems.length);
                setData(res.data.problems);
            })
            .catch((err) => {
                console.log(err);
            });

        setBeLoading(true);
    }, [match.params, refreshToken]);

    const pickRandomNumber = () => {
        if (overlapRandom.length === count) {
            alert('모든 문제를 풀었습니다. 새로고침하여 새로 시작할 수 있습니다.');
            return;
        }

        let rand = Math.floor(Math.random() * count);

        while (overlapRandom.includes(rand)) {
            rand = Math.floor(Math.random() * count);
        }

        setOverlapRandom((arr) => [...arr, rand]);
        setRandom(rand);
    };

    const checkAnswerUsingValue = (value: string | number) => {
        const answer = isLoading && data[random] !== undefined ? data[random].answer : '';

        if (value.toString() === answer) {
            alert('정답입니다!');
            pickRandomNumber();
        } else {
            alert('오답입니다. 다시 한번 시도해보세요.');
        }

        setUserAnswer('');
    };

    const checkAnswer = () => {
        if (userAnswer === undefined || userAnswer === '') {
            alert('정답을 입력해주세요.');
            return;
        }

        checkAnswerUsingValue(userAnswer);
    };

    let exp = '불러오는 중입니다...';
    const expOfAuthor = isLoading && data[random] !== undefined ? data[random].author : '불러오는 중';

    if (isLoading && data[random] !== undefined) {
        exp = data[random].contents;
    } else if (count === 0) {
        exp = '<h3>해당 카테고리에 맞는 문제가 없습니다.</h3>';
    }

    return (
        <CbtLayout>
            <Container>
                <TitleStyle>
                    <FontedTitle>{isLoading ? random + 1 : '0'}번 문제</FontedTitle>
                </TitleStyle>
                <SubTitleStyle>
                    <FontedMiddleText>작성자: {expOfAuthor}</FontedMiddleText>
                </SubTitleStyle>

                <ProblemBoxStyle dangerouslySetInnerHTML={{ __html: exp }} />

                <hr />

                <NumberButtonWrapperStyle>
                    <NumberButtonStyle type="button" onClick={() => checkAnswerUsingValue(1)}>
                        1번
                    </NumberButtonStyle>
                    <NumberButtonStyle type="button" onClick={() => checkAnswerUsingValue(2)}>
                        2번
                    </NumberButtonStyle>
                    <NumberButtonStyle type="button" onClick={() => checkAnswerUsingValue(3)}>
                        3번
                    </NumberButtonStyle>
                    <NumberButtonStyle type="button" onClick={() => checkAnswerUsingValue(4)}>
                        4번
                    </NumberButtonStyle>
                    <NumberButtonStyle type="button" onClick={() => checkAnswerUsingValue(5)}>
                        5번
                    </NumberButtonStyle>
                </NumberButtonWrapperStyle>

                <AnswerWrapStyle>
                    <InputStyle
                      value={userAnswer}
                      autoFocus
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserAnswer(e.target.value)}
                      placeholder="정답을 입력해주세요."
                      onKeyPress={(e: React.KeyboardEvent) => {
                            if (e.key === 'Enter') checkAnswer();
                        }}
                    />
                    <ButtonStyle type="button" onClick={checkAnswer}>
                        <FontAwesomeIcon icon={faPaperPlane} /> 제출
                    </ButtonStyle>
                    <EtcTextStyle>* 숫자 버튼을 이용하거나 입력칸을 이용하여 정답을 제출 할 수 있습니다.</EtcTextStyle>
                </AnswerWrapStyle>
            </Container>
        </CbtLayout>
    );
};

export default withRouter(Cbt);
