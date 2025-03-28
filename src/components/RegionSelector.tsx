
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';

export type Region = 'standard' | 'banka_bihar';

export const REGION_LABELS: Record<Region, string> = {
  standard: 'Standard (International)',
  banka_bihar: 'Banka, Bihar (India)'
};

interface RegionSelectorProps {
  value: Region;
  onChange: (value: Region) => void;
  className?: string;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ value, onChange, className }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-notion-textSecondary" />
        <select
          className="converter-select pl-9 pr-8"
          value={value}
          onChange={(e) => onChange(e.target.value as Region)}
          aria-label="Select region"
        >
          {Object.entries(REGION_LABELS).map(([regionValue, label]) => (
            <option key={regionValue} value={regionValue}>
              {label}
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
    </div>
  );
};

export default RegionSelector;
