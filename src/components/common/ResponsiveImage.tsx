import styled from '@emotion/styled';
import Image from 'next/image';

interface ResponsiveImageStyleProps {
  aspectRatio: number | 'auto';
}

interface ResponsiveImageProps extends ResponsiveImageStyleProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  quality?: number;
}

const ResponsiveImage = ({
  src,
  alt,
  width,
  height,
  quality,
  aspectRatio,
}: ResponsiveImageProps) => {
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

export default ResponsiveImage;

const ImageContainer = styled.div<ResponsiveImageStyleProps>`
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
