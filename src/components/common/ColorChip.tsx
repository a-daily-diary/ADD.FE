import styled from '@emotion/styled';

interface ColorChipProps {
  color: string;
}

export const ColorChip = ({ color }: ColorChipProps) => {
  return <Chip color={color} />;
};

const Chip = styled.div<ColorChipProps>`
  width: 20px;
  height: 20px;
  border-radius: 2px;
  background-color: ${({ color }) => color};
`;
