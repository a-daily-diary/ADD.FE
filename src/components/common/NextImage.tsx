import styled from '@emotion/styled';
import Image from 'next/image';

interface NextImageStyleProps {
  aspectRatio: number;
}

interface NextImageProps extends NextImageStyleProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  quality?: number;
}

const NextImage = ({
  src,
  alt,
  width,
  height,
  quality,
  aspectRatio,
}: NextImageProps) => {
  return (
    <ImageContainer aspectRatio={aspectRatio}>
      <StyledImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality ?? 100}
        priority
      />
    </ImageContainer>
  );
};

export default NextImage;

const ImageContainer = styled.div<NextImageStyleProps>`
  overflow: hidden;
  display: flex;
  place-content: center;
  width: 100%;
  aspect-ratio: ${({ aspectRatio }) => aspectRatio};
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: cover;
`;
