import { Toggle } from 'components/common';

export const SettingThemeToggle = () => {
  const toggleMode = (isDarkMode: boolean) => {
    /**
     * @TODO 다크/라이트 모드 테마 적용 로직 추가
     */
    console.log(isDarkMode ? '다크모드로 전환' : '라이트모드로 전환');
  };
  return <Toggle onChange={toggleMode} />;
};
