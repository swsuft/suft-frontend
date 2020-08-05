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
    const [getToken] = useMutation(GET_TOKEN);

    return useCallback(() => {
        if (TokenUtil.isEmpty()) return;

        getToken()
            .then((res) => {
                TokenUtil.set(res.data.token);
                window.location.reload();
            })
            .catch(() => cogoToast.error('로그인 연장 중 오류가 발생하였습니다. 로그아웃 후 다시 시도하세요.'));
    }, [getToken]);
};

export default useToken;
