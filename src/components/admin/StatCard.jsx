import React from 'react';
import Iconsax from '../Iconsax';

export default function StatCard({ title, value, icon, color = 'primary', trend, emoji }) {
  return (
    <div className="admin-stat-card">
      <div className="admin-stat-info">
        <span className="admin-stat-title">{title}</span>
        <h3 className="admin-stat-value">{value}</h3>
        {trend && (
          <span className="admin-stat-trend">
            <span className="admin-trend-icon">📈</span> {trend}
          </span>
        )}
      </div>
      <div className={`admin-stat-icon-box admin-bg-${color}`}>
        {emoji ? (
          <span className="admin-stat-emoji" style={{ fontSize: '24px' }}>{emoji}</span>
        ) : (
          <Iconsax icon={icon} />
        )}
      </div>
    </div>
  );
}
