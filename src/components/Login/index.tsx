import React, { useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import axios from 'axios';
import config from '../../config/main';

const MenuStyle = styled.div`
    width: 450px;
    height: 530px;
    background-color: #ffffff;
    border-radius: 30px;
    box-shadow: 5px 5px 20px 5px #cbcbcb;
    text-align: center;

    @media screen and (max-width: 420px) {
        width: 80vw;
        height: 500px;
    }
`;

const MenuTitleStyle = styled.div`
    font-family: 'Gugi';
    font-size: 40px;
    padding-top: 30px;
`;

const MenuLoginWrapStyle = styled.div`
    margin-top: 13%;
`;

const InputStyle = styled.input`
    border: none;
    border-radius: 20px;
    width: 80%;
    height: 45px;
    padding-left: 20px;
    margin-bottom: 10px;
    background-color: var(--color-background);;
`;

const LoginButtonStyle = styled.button`
    width: 60%;
    height: 45px;
    margin-bottom: 10px;

    font-size: 18px;
    font-weight: 700;

    border: none;
    border-radius: 20px;

    color: #000;
    background-color: var(--color-yellow);
    cursor: pointer;
`;

const RegisterTextStyle = styled(Link)`
    font-size: 15px;
    color: var(--color-text);
    text-decoration: none;
    transition: all 200ms ease;

    &:hover {
        color: var(--color-yellow);
        cursor: pointer;
    }
`;

const WikiStyle = styled.a`
    font-size: 15px;
    color: var(--color-text);
    text-decoration: none;
    transition: all 200ms ease;

    &:hover {
        color: var(--color-yellow);
        cursor: pointer;
    }
`;

const EmptyLineStyle = styled.div<{ amount: number }>`
    margin-bottom: ${(props) => props.amount}px;
`;

const Login: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    const onLoginButtonClick = () => {
        if (email === '' || pw === '') {
            alert('빈 칸이 존재합니다.');
        } else {
            axios
                .post(
                    `${config.endpoint}/login`,
                    {
                        email,
                        password: pw
                    },
                    { withCredentials: true }
                )
                .then((data) => {
                    if (!data.data.success) {
                        alert(data.data.message);
                    } else {
                        localStorage.setItem('token', data.data.token);
                        window.location.reload();
                    }
                })
                .catch((err) => {
                    alert(err);
                });
        }
    };

    const onEnterKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onLoginButtonClick();
        }
    };

    const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (evt.target.placeholder === '이메일') {
            setEmail(evt.target.value);
        } else if (evt.target.placeholder === '비밀번호') {
            setPw(evt.target.value);
        }
    };

    return (
        <MenuStyle>
            <MenuTitleStyle>수프트</MenuTitleStyle>
            <h2>로그인</h2>
            <b>수프트위키와 수프트는 회원정보를 공유하지 않습니다!</b>

            <MenuLoginWrapStyle>
                <p>이메일</p>
                <InputStyle
                  value={email}
                  type="email"
                  placeholder="이메일"
                  onChange={onInputChange}
                  onKeyPress={onEnterKeyPress}
                />

                <p>비밀번호</p>
                <InputStyle
                  value={pw}
                  type="password"
                  placeholder="비밀번호"
                  onChange={onInputChange}
                  onKeyPress={onEnterKeyPress}
                />

                <EmptyLineStyle amount={15} />

                <LoginButtonStyle onClick={onLoginButtonClick}>
                    <FontAwesomeIcon icon={faSignInAlt} /> 로그인
                </LoginButtonStyle>

                <br />

                <RegisterTextStyle to="/register">회원가입</RegisterTextStyle>
                <br />
                <WikiStyle href="https://wiki.suft.kr">
                    수프트위키 바로가기
                </WikiStyle>
            </MenuLoginWrapStyle>
        </MenuStyle>
    );
};

export default withRouter(Login);
