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

const Cbt: React.FC<RouteComponentProps<{ subject: string; grade: string; times: string }>> = ({ match }) => {
    const [isLoading, setBeLoading] = useState(false);
    const [random, setRandom] = useState(-1);
    const [overlapRandom, setOverlapRandom] = useState<number[]>([]);
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
                    alert(res.data.message);
                } else {
                    setCount(res.data.problems.length);
                    setData(res.data.problems);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        setBeLoading(true);

        const rand = Math.floor(Math.random() * count);
        setOverlapRandom((arr) => [...arr, rand]);
        setRandom(rand);
    }, [count, match.params]);

    const pickRandomNumber = () => {
        let rand = Math.floor(Math.random() * count);

        while (overlapRandom.includes(rand)) {
            if (overlapRandom.length === count) {
                alert('모든 문제를 풀었습니다. 새로고침하여 새로 시작할 수 있습니다.');
                return;
            }

            rand = Math.floor(Math.random() * count);
        }

        setOverlapRandom((arr) => [...arr, rand]);
        setRandom(rand);
    };

    const checkAnswer = () => {
        const answer = isLoading && data[random] !== undefined ? data[random].answer : '';

        if (userAnswer === undefined || userAnswer === '') {
            alert('정답을 입력해주세요!');
            return;
        }

        if (userAnswer === answer) {
            alert('정답!');
            pickRandomNumber();
        } else {
            alert('오답!');
        }

        setUserAnswer('');
    };

    const checkAnswerUsingNumber = (number: number) => {
        const answer = isLoading && data[random] !== undefined ? data[random].answer : '';

        if (number.toString() === answer) {
            alert('정답!');
            pickRandomNumber();
        } else {
            alert('오답!');
        }

        setUserAnswer('');
    };

    let exp = '불러오는 중입니다...';
    if (isLoading && data[random] !== undefined) {
        exp = data[random].contents;
    } else if (count === 0) exp = '<h3>해당 카테고리에 맞는 문제가 없습니다.</h3>';

    const expOfAuthor = isLoading && data[random] !== undefined ? data[random].author : '불러오는 중';

    return (
        <CbtLayout>
            <Container>
                <FontedTitle>
                    {isLoading ? random + 1 : '0'}번 문제 <FontedMiddleText>작성자: {expOfAuthor}</FontedMiddleText>
                </FontedTitle>

                <ProblemBoxStyle dangerouslySetInnerHTML={{ __html: exp }}/>

                <hr/>

                <NumberButtonWrapperStyle>
                    <NumberButtonStyle type="button" onClick={() => checkAnswerUsingNumber(1)}>
                        1번
                    </NumberButtonStyle>
                    <NumberButtonStyle type="button" onClick={() => checkAnswerUsingNumber(2)}>
                        2번
                    </NumberButtonStyle>
                    <NumberButtonStyle type="button" onClick={() => checkAnswerUsingNumber(3)}>
                        3번
                    </NumberButtonStyle>
                    <NumberButtonStyle type="button" onClick={() => checkAnswerUsingNumber(4)}>
                        4번
                    </NumberButtonStyle>
                    <NumberButtonStyle type="button" onClick={() => checkAnswerUsingNumber(5)}>
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
                        <FontAwesomeIcon icon={faPaperPlane}/> 제출
                    </ButtonStyle>
                    <EtcTextStyle>* 숫자 버튼을 이용하거나 입력칸을 이용하여 정답을 제출 할 수 있습니다.</EtcTextStyle>
                </AnswerWrapStyle>
            </Container>
        </CbtLayout>
    );
};

export default withRouter(Cbt);
