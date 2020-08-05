import cogoToast from 'cogo-toast';
import ErrorCode from '../error/ErrorCode';

// eslint-disable-next-line import/prefer-default-export
export const getGraphQLError = (error: any): string[] | undefined => {
    if (!error.graphQLErrors.length) {
        cogoToast.error(error.message);
        return undefined;
    }
    const { extensions, message } = error.graphQLErrors[0];
    if (!extensions) return undefined;

    if (!extensions.code) return [ErrorCode.SERVER_ERROR, '🔥 서버 오류가 발생하였어요. 잠시후 다시 시도해보세요.'];

    return [extensions.code, message];
};
