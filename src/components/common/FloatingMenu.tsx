import styled from '@emotion/styled';
import {
  FloatingMenuButton,
  type FloatingMenuButtonProps,
} from './FloatingMenuButton';
import { Z_INDEX } from 'constants/styles';

interface FloatingMenuStyleProps {
  position: 'absolute' | 'fixed';
}
interface FloatingMenuProps extends FloatingMenuStyleProps {
  items: FloatingMenuButtonProps[];
}

export const FloatingMenu = ({ items, position }: FloatingMenuProps) => {
  return (
    <List position={position}>
      {items.map((item, index) => {
        const { label, icon, onClick } = item;
        return (
          <li key={`floating-item-${index}`}>
            <FloatingMenuButton icon={icon} label={label} onClick={onClick} />
          </li>
        );
      })}
    </List>
  );
};

const List = styled.ul<FloatingMenuStyleProps>`
  position: ${({ position }) => position};
  top: 40px;
  right: 20px;
  z-index: ${Z_INDEX.dialog};
  padding: 6px 0;
  border: 1px solid ${({ theme }) => theme.colors.gray_06};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  filter: drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.08));
`;
