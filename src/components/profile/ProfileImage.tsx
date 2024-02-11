import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

interface ProfileImageProps {
  username: string;
  src: string;
  size: 'sm' | 'md';
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

const SIZE_STYLES = {
  sm: 22,
  md: 28,
};

const ImageLink = styled(Link)`
  overflow: hidden;
  border-radius: 50%;
  aspect-ratio: 1;
`;
