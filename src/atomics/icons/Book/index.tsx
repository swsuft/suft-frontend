import React from 'react';
import styled from 'styled-components';
import { ReactComponent as BookIcon } from '../../../assets/icons/book.svg';

const BookStyle = styled(BookIcon)<{ size: string }>`
    width: ${(props) => props.size};
    height: ${(props) => props.size};
`;

interface BookProps {
    readonly size: string;
}

const Book: React.FC<BookProps> = ({ size }) => {
    return <BookStyle size={size} />;
};

export default Book;
