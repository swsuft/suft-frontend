import styled from 'styled-components';

const TableBodyRow = styled.tr`
    max-width: 100%;
    height: 2.6rem;
    background-color: #fafafa;
    text-align: center;
    font-size: 0.9rem;

    &:nth-child(even) {
        background-color: #f5f5f5;
    }

    & td {
        max-width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export default TableBodyRow;
