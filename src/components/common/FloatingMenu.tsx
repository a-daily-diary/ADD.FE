import {
  FloatingMenuButton,
  type FloatingMenuButtonProps,
} from './FloatingMenuButton';
import { Popover } from './Popover';

interface FloatingMenuProps {
  items: FloatingMenuButtonProps[];
}

export const FloatingMenu = ({ items }: FloatingMenuProps) => {
  return (
    <Popover top={40} right={20}>
      <ul>
        {items.map((item, index) => {
          const { label, icon, onClick } = item;
          return (
            <li key={`floating-item-${index}`}>
              <FloatingMenuButton icon={icon} label={label} onClick={onClick} />
            </li>
          );
        })}
      </ul>
    </Popover>
  );
};
