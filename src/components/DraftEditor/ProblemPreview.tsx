import React from 'react';
import styled from 'styled-components';

const PreviewStyle = styled.div`
    margin-top: 1rem;
`;

interface ProblemPreviewProps {
    readonly html: string;
}

const ProblemPreview: React.FC<ProblemPreviewProps> = ({ html }) => (
    <PreviewStyle>
        <h2>미리보기</h2>
        <hr />
        {/* eslint-disable-next-line */}
        <div dangerouslySetInnerHTML={{ __html: html }} />
    </PreviewStyle>
);

export default ProblemPreview;
