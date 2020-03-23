import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import config from '../../config';
import LoginHeaderText from './LoginHeaderText';
import LoginFooterText from './LoginFooterText';
import LabelText from '../../atomics/Typography/LabelText';
import Input from '../../atomics/Input';
import SquareButton from '../../atomics/SquareButton';
import Error from '../../error/Error';
import serverErrorHandler from '../../utils/ServerErrorHandler';

const MenuLoginWrapStyle = styled.div`
    margin: 32px auto;
`;

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const runLogin = () => {
        if (email === '' || password === '') {
            alert('빈 칸이 존재합니다.');
        } else {
            axios
                .post(
                    `${config.ENDPOINT}/login`,
                    {
                        email,
                        password
                    },
                    { withCredentials: true }
                )
                .then((data) => {
                    localStorage.setItem('token', data.data.token);
                    window.location.reload();
                })
                .catch((err) => {
                    const errorCode = err.response.data.code;

                    if (errorCode === Error.SERVER_ERROR) {
                        serverErrorHandler(err);
                        return;
                    }

                    alert(err.response.data.message);
                });
        }
    };

    const onEnterKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            runLogin();
        }
    };

    const onEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const onPasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    return (
        <div>
            <LoginHeaderText />

            <MenuLoginWrapStyle>
                <LabelText>이메일</LabelText>
                <Input value={email} type="email" placeholder="이메일을 입력해주세요." onChange={onEmailInputChange} onKeyPress={onEnterKeyPress} />

                <LabelText>비밀번호</LabelText>
                <Input value={password} type="password" placeholder="비밀번호를 입력해주세요." onChange={onPasswordInputChange} onKeyPress={onEnterKeyPress} />
            </MenuLoginWrapStyle>

            <SquareButton onClick={runLogin}>
                <FontAwesomeIcon icon={faDoorOpen} /> 로그인
            </SquareButton>

            <LoginFooterText />
        </div>
    );
};

export default Login;
