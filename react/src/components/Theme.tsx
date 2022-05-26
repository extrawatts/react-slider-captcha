import lightTheme from '../style/light';
import darkTheme from '../style/dark';

interface ThemeProps {
  variant?: 'light' | 'dark';
}

function Theme(props: ThemeProps) {
  const { variant = 'light' } = props;
  return (
    <style suppressHydrationWarning>
      {variant === 'dark' ? darkTheme : lightTheme}
    </style>
  );
}

export default Theme;
