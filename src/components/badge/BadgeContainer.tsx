import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { CircleCheckedOffIcon, CircleCheckedOnIcon } from 'assets/icons';
import { useBadges } from 'hooks/services';
import { SVGVerticalAlignStyle } from 'styles';

export const BadgeContainer = () => {
  const { data: session } = useSession();
  const { badgesData } = useBadges({
    username: session?.user.username as string,
  });

  return (
    <Section>
      <Title>배지 목록</Title>
      <Description>공개할 뱃지를 선택해주세요.(최대 8개)</Description>
      <BadgeList>
        {badgesData?.map((badge) => {
          const { id, imgUrl, description, name, userToBadge } = badge;

          return (
            <li key={id}>
              <BadgeButton type="button">
                <BadgeImageContainer>
                  <Image
                    src={imgUrl}
                    alt={description}
                    width={80}
                    height={80}
                    priority
                  />
                  {userToBadge?.isPinned === true ? (
                    <CheckedOnIcon />
                  ) : (
                    <CheckedOffIcon />
                  )}
                </BadgeImageContainer>
                <span>{name}</span>
              </BadgeButton>
            </li>
          );
        })}
      </BadgeList>
    </Section>
  );
};

const Section = styled.section`
  padding: 28px 20px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.gray_00};
  ${({ theme }) => theme.fonts.headline_02}
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.gray_02};
  ${({ theme }) => theme.fonts.body_04}
`;

const BadgeList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px 34px;
  margin-top: 24px;
`;

const BadgeButton = styled.button`
  display: grid;
  grid-template-rows: 80px;
  place-items: center;
  gap: 10px;
  ${({ theme }) => theme.fonts.body_08};
`;

const BadgeImageContainer = styled.div`
  position: relative;
  ${SVGVerticalAlignStyle}
`;

const StyledIcon = css`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const CheckedOnIcon = styled(CircleCheckedOnIcon)`
  ${StyledIcon}
`;

const CheckedOffIcon = styled(CircleCheckedOffIcon)`
  ${StyledIcon}
`;
