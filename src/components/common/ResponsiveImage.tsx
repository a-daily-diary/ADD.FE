import styled from '@emotion/styled';
import Image from 'next/image';

interface ResponsiveImageStyleProps {
  aspectRatio?: number | 'auto';
}

interface ResponsiveImageProps extends ResponsiveImageStyleProps {
  src: string;
  alt: string;
  quality?: number;
}

const ResponsiveImage = ({
  src,
  alt,
  quality,
  aspectRatio = 'auto',
}: ResponsiveImageProps) => {
  return (
    <ImageContainer aspectRatio={aspectRatio}>
      <StyledImage src={src} alt={alt} quality={quality ?? 100} fill priority />
    </ImageContainer>
  );
};

export default ResponsiveImage;

const StyledImage = styled(Image)`
  position: relative !important;
  height: unset !important;
  object-fit: cover;
`;

const ImageContainer = styled.div<ResponsiveImageStyleProps>`
  ${StyledImage} {
    aspect-ratio: ${({ aspectRatio }) => aspectRatio};
  }
`;
