import React from 'react';
import Iconsax from '../Iconsax';

export default function StatCard({ title, value, icon, color = 'primary', trend }) {
  return (
    <div className="stat-card">
      <div>
        <span className="text-secondary fw-medium" style={{ fontSize: '13px' }}>{title}</span>
        <h3 className="fw-bold my-1 text-dark">{value}</h3>
        {trend && (
          <span className="text-success fw-medium" style={{ fontSize: '12px' }}>
            <Iconsax icon="arrow-up-3" className="me-1" /> {trend}
          </span>
        )}
      </div>
      <div className={`stat-icon bg-${color}-subtle text-${color}`}>
        <Iconsax icon={icon} />
      </div>
    </div>
  );
}
