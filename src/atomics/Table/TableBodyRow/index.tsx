import styled from 'styled-components';

const TableBodyRow = styled.tr`
    height: 2.6rem;
    background-color: #fafafa;
    text-align: center;
    font-size: 0.9rem;

    &:nth-child(even) {
        background-color: #f5f5f5;
    }
`;

export default TableBodyRow;
