import React, { useEffect, useMemo, useState } from 'react';
import FontedTitle from '../../atomics/Typography/FontedTitle';
import MyProblemLayout from '../../layouts/MyProblemLayout';
import Table from '../../components/Table';
import EditIcon from '../../atomics/Icons/EditIcon';
import ProblemApi from '../../api/Problem';
import { useProfile } from '../../hooks/useProfile';
import SubjectToString from '../../utils/SubjectToString';

const MyProblemView: React.FC = () => {
    const columns = useMemo(
        () => [
            {
                Header: '문제 ID',
                accessor: 'id'
            },
            {
                Header: '문제 내용',
                accessor: 'contents',
                Cell: ({ row }: any) => row.original.contents.replace(/(<([^>]+)>)/gi, '')
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
                Cell: () => <EditIcon />
            }
        ],
        []
    );

    const profile = useProfile();
    const [data, setData] = useState<object[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!profile) return;

        ProblemApi.getByEmail(profile!!.data!!.email).then((res) => {
            setData(res.data.data);
            setLoading(true);
        });
    }, [profile]);

    return (
        <MyProblemLayout>
            <FontedTitle>문제 관리</FontedTitle>
            {loading && <Table columns={columns} data={data} />}
        </MyProblemLayout>
    );
};

export default MyProblemView;
