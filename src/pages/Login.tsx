import styled from 'styled-components';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import LoginHeaderText from '../components/Login/LoginHeaderText';
import LabelText from '../atomics/Typography/LabelText';
import Input from '../atomics/Input';
import SquareButton from '../atomics/SquareButton';
import LoginFooterText from '../components/Login/LoginFooterText';
import DefaultLayout from '../layouts/DefaultLayout';
import CenterContainer from '../utils/ContainerUtils/CenterContainer';
import AuthApi from '../api/Auth';
import TokenUtil from '../api/TokenUtil';
import ErrorCode from '../error/ErrorCode';

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
            AuthApi.login(email, password)
                .then((res) => {
                    TokenUtil.set(res.data.token);
                    window.location.reload();
                })
                .catch((err) => {
                    const { code, message } = err.response.data;

                    if (code === ErrorCode.USER_NOT_FOUND) {
                        alert(message);
                        return;
                    }

                    if (code === ErrorCode.PW_NOT_MATCH) {
                        alert(message);
                        return;
                    }

                    if (code === ErrorCode.USER_WAITING) {
                        alert(message);
                        return;
                    }

                    if (code === ErrorCode.USER_DENY) {
                        alert('가입이 거절된 계정입니다.');
                        return;
                    }

                    if (code === ErrorCode.USER_BLOCK) {
                        alert('서비스 이용이 차된되어 로그인이 불가능합니다.');
                    }
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
        <DefaultLayout>
            <CenterContainer>
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
            </CenterContainer>
        </DefaultLayout>
    );
};

export default Login;
