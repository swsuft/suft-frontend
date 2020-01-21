import React from 'react';
import styled from 'styled-components';
import { ReactComponent as BookRes } from '../../../assets/icons/book.svg';

const BookStyle = styled(BookRes)<{ size: string }>`
    width: ${(props) => props.size};
    height: ${(props) => props.size};
`;

interface BookProps {
    readonly size: string;
}

const BookIcon: React.FC<BookProps> = ({ size }) => {
    return <BookStyle size={size} />;
};

export default BookIcon;
