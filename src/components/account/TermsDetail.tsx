import styled from '@emotion/styled';

import type { TermsContent } from 'types/termsAgreement';
import { FullScreenModal } from 'components/common';

interface TermsDetailProps {
  title: string;
  contents: TermsContent[];
  onClose: () => void;
}

export const TermsDetail = ({ title, contents, onClose }: TermsDetailProps) => {
  return (
    <FullScreenModal onClose={onClose}>
      <Title>{title}</Title>
      <Article>
        <ul>
          {contents.map(({ subTitle, content }) => {
            return (
              <li key={subTitle}>
                <SubTitle>{subTitle}</SubTitle>
                <Content>{content}</Content>
              </li>
            );
          })}
        </ul>
      </Article>
    </FullScreenModal>
  );
};

const Title = styled.h1`
  ${({ theme }) => theme.fonts.headline_01}
  margin-bottom: 24px;
`;

const Article = styled.article`
  overflow: auto;
`;

const SubTitle = styled.strong`
  ${({ theme }) => theme.fonts.headline_04};
  display: inline-block;
  margin-bottom: 8px;
`;

const Content = styled.p`
  ${({ theme }) => theme.fonts.body_06};
  margin-bottom: 16px;
`;
