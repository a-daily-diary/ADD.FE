import {
  FloatingMenuButton,
  type FloatingMenuButtonProps,
} from './FloatingMenuButton';
import { PopOver } from './PopOver';

interface FloatingMenuProps {
  items: FloatingMenuButtonProps[];
}

export const FloatingMenu = ({ items }: FloatingMenuProps) => {
  return (
    <PopOver top={40} right={20}>
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
    </PopOver>
  );
};
