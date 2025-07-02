import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm">🌞</span>
      <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
      <span className="text-sm">🌜</span>
    </div>
  );
};

export default ThemeToggle;