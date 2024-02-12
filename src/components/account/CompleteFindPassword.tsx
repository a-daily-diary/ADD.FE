import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';

export const CompleteFindPassword = () => {
  return (
    <>
      <Title>링크가 전송되었습니다.</Title>
      <DescriptionText>
        이메일로 전송된 링크를 통해 비밀번호를 재설정해주세요.
      </DescriptionText>
      <ImageContainer>
        <Image
          src={'/images/findPassword/send_email.png'}
          alt="환영합니다!"
          width={200}
          height={200}
          priority
        />
      </ImageContainer>
    </>
  );
};

const Title = styled.h1`
  ${({ theme }) => theme.fonts.headline_01};
`;

const DescriptionText = styled.p`
  margin-top: 8px;

  color: ${({ theme }) => theme.colors.gray_02};
  ${({ theme }) => theme.fonts.body_07};
`;

const ImageContainer = styled.div`
  margin-top: 60px;
  text-align: center;
`;
