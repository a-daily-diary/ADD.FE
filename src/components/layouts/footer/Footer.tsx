import styled from '@emotion/styled';
import Link from 'next/link';
import { FOOTER_HEIGHT } from 'constants/styles';

export const Footer = () => {
  return (
    <FooterLayout>
      <div>
        {/* @TODO: 링크 연결하기 */}
        <LegalLink href={'/'}>개인정보처리방침</LegalLink>
        <LegalLink href={'/'}>이용약관</LegalLink>
      </div>
      <p>Copy right 2023. ADD. All rights reserved.</p>
      {/* @TODO: 이메일주소 변경하기 */}
      <a href="mailto:addofficial@gmail.com">addofficial@gmail.com</a>
    </FooterLayout>
  );
};

const FooterLayout = styled.footer`
  width: 100%;
  height: ${FOOTER_HEIGHT};
  padding: 16px 20px;
  background-color: ${({ theme }) => theme.colors.bg_02};
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${({ theme }) => theme.fonts.caption_02};
  color: ${({ theme }) => theme.colors.gray_03};
`;

const LegalLink = styled(Link)`
  ${({ theme }) => theme.fonts.caption_01}
  color: ${({ theme }) => theme.colors.gray_02};

  /* 새로 구분선 */
  &:not(:last-of-type) {
    &::after {
      content: '';
      display: inline-block;
      margin: 0 6px;
      width: 1px;
      height: 8px;
      background-color: ${({ theme }) => theme.colors.gray_05};
    }
  }
`;
