import React, { useEffect, useMemo, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import underscore from 'underscore';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import cogoToast from 'cogo-toast';
import FontedTitle from '../../atomics/Typography/FontedTitle';
import MyProblemLayout from '../../layouts/MyProblemLayout';
import Table from '../../components/Table';
import EditIcon from '../../atomics/Icons/EditIcon';
import { useProfile } from '../../hooks/useProfile';
import SubjectToString from '../../utils/SubjectToString';
import useToken from '../../hooks/useToken';
import ErrorCode from '../../error/ErrorCode';
import { getGraphQLError } from '../../api/errorHandler';

const GET_MY_PROBLEM = gql`
    query($email: String!) {
        searchProblem(filter: { email: $email }) {
            id
            email
            contents
            answer
            author
            grade
            subject
            times
        }
    }
`;

const MyProblemView: React.FC<RouteComponentProps> = ({ history }) => {
    const columns = useMemo(
        () => [
            {
                Header: '문제 ID',
                accessor: 'id'
            },
            {
                Header: '문제 내용',
                accessor: 'contents',
                Cell: ({ row }: any) => underscore.unescape(row.original.contents).replace(/(<([^>]+)>)/gi, '')
            },
            {
                Header: '문제 정답',
                accessor: 'answer'
            },
            {
                Header: '학년',
                accessor: 'grade'
            },
            {
                Header: '학기',
                accessor: 'times'
            },
            {
                Header: '과목',
                accessor: 'subject',
                Cell: ({ row }: any) => SubjectToString(row.original.subject)
            },
            {
                Header: '문제 수정',
                Cell: ({ row }: any) => <EditIcon onClick={() => history.push(`/myproblem/edit/${row.original.id}`)} />
            }
        ],
        [history]
    );

    const profile = useProfile();
    const refreshToken = useToken();
    const [problemData, setProblemData] = useState<object[]>([]);
    const [isLoading, setBeLoading] = useState<boolean>(false);

    const [getMyProblem, { loading, error, data }] = useLazyQuery(GET_MY_PROBLEM);

    useEffect(() => {
        if (!profile) return;

        setBeLoading(!loading);

        if (loading) {
            cogoToast.loading('지금 문제를 가져오고 있어요...', {
                hideAfter: 1
            });
            return;
        }

        if (error) {
            const gerror = getGraphQLError(error);
            if (!gerror) return;

            if (gerror[0] === ErrorCode.NO_PERMISSION) {
                refreshToken();
            } else {
                cogoToast.error(gerror[1]);
            }

            return;
        }

        getMyProblem({
            variables: {
                email: profile.email
            }
        });

        if (data) setProblemData(data.searchProblem);
    }, [profile, loading, error, data, getMyProblem, refreshToken]);

    return (
        <MyProblemLayout>
            <FontedTitle>문제 관리</FontedTitle>
            {isLoading && <Table columns={columns} data={problemData} />}
        </MyProblemLayout>
    );
};

export default withRouter(MyProblemView);
