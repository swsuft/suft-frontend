import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import config from '../../constants/config';
import LoginButton from './LoginButton';
import LoginHeaderText from './LoginHeaderText';
import LoginFooterText from './LoginFooterText';
import LableText from '../../atoms/Typography/LableText';

const MenuLoginWrapStyle = styled.div`
    margin: 32px auto;
`;

const InputStyle = styled.input`
    border: none;
    border-radius: 20px;
    width: 95%;
    height: 46px;
    padding-left: 20px;
    margin-bottom: 10px;
    background-color: white;
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
            runLogin();
        }
    };

    const onEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const onPasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    return (
        <div>
            <LoginHeaderText/>

            <MenuLoginWrapStyle>
                <LableText>이메일</LableText>
                <InputStyle
                  value={email}
                  type="email"
                  placeholder="이메일을 입력해주세요."
                  onChange={onEmailInputChange}
                  onKeyPress={onEnterKeyPress}
                />

                <LableText>비밀번호</LableText>
                <InputStyle
                  value={password}
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  onChange={onPasswordInputChange}
                  onKeyPress={onEnterKeyPress}
                />
            </MenuLoginWrapStyle>

            <LoginButton onClick={runLogin}/>

            <LoginFooterText/>
        </div>
    );
};

export default Login;
