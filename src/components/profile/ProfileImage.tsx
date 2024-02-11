import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

interface ProfileImageProps {
  username: string;
  src: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
}

export const ProfileImage = ({ username, src, size }: ProfileImageProps) => {
  return (
    <ImageLink href={`/profile/${username}`}>
      <Image
        src={src}
        alt={username}
        width={SIZE_STYLES[size]}
        height={SIZE_STYLES[size]}
      />
    </ImageLink>
  );
};

export const NoLinkProfileImage = ({
  username,
  src,
  size,
}: ProfileImageProps) => {
  return (
    <StyledImage
      src={src}
      alt={username}
      width={SIZE_STYLES[size]}
      height={SIZE_STYLES[size]}
      priority
    />
  );
};

const SIZE_STYLES = {
  sm: 22,
  md: 28,
  lg: 92,
  xl: 160,
};

const ImageStyles = css`
  overflow: hidden;
  border-radius: 50%;
  aspect-ratio: 1;
  object-fit: cover;
`;

const ImageLink = styled(Link)`
  ${ImageStyles}
`;

const StyledImage = styled(Image)`
  ${ImageStyles}

  display: block;
  margin: 0 auto;
`;
