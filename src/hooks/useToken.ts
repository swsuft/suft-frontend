import { useCallback } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import TokenUtil from '../api/TokenUtil';

const GET_TOKEN = gql`
    mutation {
        token
    }
`;

const useToken = () => {
    const [, { loading, error, data }] = useMutation(GET_TOKEN);

    return useCallback(() => {
        if (loading) return;

        if (error) {
            cogoToast.error('로그인 연장 중 오류가 발생하였습니다. 로그아웃 후 다시 시도하세요.');
            return;
        }

        if (TokenUtil.isEmpty()) return;

        console.log(data);
    }, [loading, error, data]);
};

export default useToken;
