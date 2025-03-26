
import React from 'react';
import { motion } from 'framer-motion';

export type ColorTheme = 'blue' | 'green' | 'purple' | 'red' | 'orange' | 'teal' | 'pink' | 'gray';

interface ThemeSelectorProps {
  currentTheme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
  const themes: { name: ColorTheme; color: string }[] = [
    { name: 'blue', color: 'bg-theme-blue' },
    { name: 'green', color: 'bg-theme-green' },
    { name: 'purple', color: 'bg-theme-purple' },
    { name: 'red', color: 'bg-theme-red' },
    { name: 'orange', color: 'bg-theme-orange' },
    { name: 'teal', color: 'bg-theme-teal' },
    { name: 'pink', color: 'bg-theme-pink' },
    { name: 'gray', color: 'bg-theme-gray' }
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {themes.map((theme) => (
        <motion.button
          key={theme.name}
          className={`theme-button ${theme.color} ${
            currentTheme === theme.name ? 'ring-2 ring-white ring-opacity-100' : ''
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onThemeChange(theme.name)}
          aria-label={`${theme.name} theme`}
        />
      ))}
    </div>
  );
};

export default ThemeSelector;
