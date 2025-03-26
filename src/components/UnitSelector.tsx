
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export type AreaUnit = 'sqft' | 'dismil' | 'katha' | 'bigha' | 'acre' | 'hectare' | 'sqmeter';

interface UnitSelectorProps {
  value: AreaUnit;
  onChange: (value: AreaUnit) => void;
  className?: string;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({ value, onChange, className }) => {
  const units: { value: AreaUnit; label: string }[] = [
    { value: 'sqft', label: 'Square Foot' },
    { value: 'dismil', label: 'Dismil' },
    { value: 'katha', label: 'Katha' },
    { value: 'bigha', label: 'Bigha' },
    { value: 'acre', label: 'Acre' },
    { value: 'hectare', label: 'Hectare' },
    { value: 'sqmeter', label: 'Square Meter' }
  ];

  return (
    <div className={`relative ${className}`}>
      <select
        className="converter-select pr-8"
        value={value}
        onChange={(e) => onChange(e.target.value as AreaUnit)}
      >
        {units.map((unit) => (
          <option key={unit.value} value={unit.value}>
            {unit.label}
          </option>
        ))}
      </select>
      <motion.div
        className="absolute top-1/2 right-2 transform -translate-y-1/2 pointer-events-none text-notion-textSecondary"
        animate={{ rotate: 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown size={16} />
      </motion.div>
    </div>
  );
};

export default UnitSelector;
