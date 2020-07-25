import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import cogoToast from 'cogo-toast';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import DefaultLayout from '../layouts/DefaultLayout';
import FontedTitle from '../atomics/Typography/FontedTitle';
import Input from '../atomics/Input';
import LabelText from '../atomics/Typography/LabelText';
import Select from '../atomics/Select';
import CenterContainer from '../utils/ContainerUtils/CenterContainer';
import SquareButton from '../atomics/SquareButton';
import { useProfile } from '../hooks/useProfile';
import ErrorCode from '../error/ErrorCode';

const BodyStyle = styled.div`
    margin: 32px auto;
`;

const USER_UPDATE = gql`
    mutation updateUser($email: String!, $grade: Int!, $nowPassword: String!, $newPassword: String) {
        updateUser(input: { grade: $grade, email: $email, nowPassword: $nowPassword, newPassword: $newPassword }) {
            name
            email
            grade
            isAdmin
            isBlocked
            createdAt
            updatedAt
            registeredAt
        }
    }
`;

const MyInfo: React.FC = () => {
    const profile = useProfile();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('1');

    const [updateUser] = useMutation(USER_UPDATE);

    useEffect(() => {
        if (!profile) return;

        setEmail(profile.email);
        setName(profile.name);
        setGrade(profile.grade);
    }, [profile]);

    const updateMyInfo = () => {
        const pwRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/;

        if (password === '') {
            cogoToast.warn('현재 비밀번호를 입력하지 않았어요.');
            return;
        }
        if (newPassword !== '' && newPassword !== rePassword) {
            cogoToast.warn('변경하려는 비밀번호가 일치 하지 않아요.');
            return;
        }
        if (newPassword !== '' && password === newPassword) {
            cogoToast.warn('변경하려는 비밀번호가 기존과 동일해요.');
            return;
        }
        if (newPassword !== '' && !pwRegExp.test(newPassword)) {
            cogoToast.warn('비밀번호는 영문자, 특수문자, 숫자가 포함 되어야 하고 6자리 이상이어야 해요.');
            return;
        }

        updateUser({
            variables: {
                email: profile!!.email,
                grade: parseInt(grade, 10),
                nowPassword: password,
                newPassword
            }
        })
            .then(() => {
                cogoToast.success('내 정보가 수정되었어요.');
                window.location.reload();
            })
            .catch((err) => {
                if (!err.graphQLErrors.length) return;
                const { extensions, message } = err.graphQLErrors[0];
                if (!extensions) return;

                switch (extensions.code) {
                    case ErrorCode.PW_NOT_MATCH:
                        cogoToast.error('현재 비밀번호가 올바르지 않아요.');
                        break;
                    default:
                        cogoToast.error(message);
                }
            });
    };

    return (
        <DefaultLayout>
            <CenterContainer>
                <div>
                    <FontedTitle>내 정보</FontedTitle>

                    <BodyStyle>
                        <LabelText>이메일 (이메일은 변경 할 수 없어요)</LabelText>
                        <Input value={email} disabled />

                        <LabelText>이름 (이름은 변경 할 수 없어요)</LabelText>
                        <Input value={name} disabled />

                        <LabelText>현재 비밀번호</LabelText>
                        <Input
                          value={password}
                          type="password"
                          placeholder="현재 비밀번호를 입력해주세요."
                          onChange={(e) => setPassword(e.target.value)}
                        />

                        <LabelText>비밀번호 변경</LabelText>
                        <Input
                          value={newPassword}
                          type="password"
                          placeholder="비밀번호 변경 시 입력해주세요."
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <Input
                          value={rePassword}
                          type="password"
                          placeholder="확인을 위해 한 번 더 비밀번호를 입력해주세요."
                          onChange={(e) => setRePassword(e.target.value)}
                        />

                        <LabelText>학년</LabelText>
                        <Select value={grade} onChange={(e) => setGrade(e.target.value)} width="100%">
                            <option value="1">1학년</option>
                            <option value="2">2학년</option>
                            <option value="3">3학년</option>
                        </Select>
                    </BodyStyle>

                    <SquareButton onClick={updateMyInfo}>
                        <FontAwesomeIcon icon={faPen} /> 수정하기
                    </SquareButton>
                </div>
            </CenterContainer>
        </DefaultLayout>
    );
};

export default MyInfo;
