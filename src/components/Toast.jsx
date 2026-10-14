import React from 'react';

export default function Toast({ show, message, type = 'success', onClose }) {
  if (!show) return null;

  const bgColors = {
    success: 'bg-emerald-600 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-[#00204C] text-white'
  };

  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    info: 'fa-info-circle'
  };

  return (
    <div className="fixed top-20 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl animate-bounce-short transition-all">
      <div className={`${bgColors[type] || bgColors.success} px-5 py-3.5 rounded-xl flex items-center gap-3 shadow-xl`}>
        <i className={`fa ${icons[type] || icons.success} text-lg`}></i>
        <span className="text-sm font-semibold">{message}</span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-2 hover:opacity-80 transition-opacity"
          >
            <i className="fa fa-times text-xs"></i>
          </button>
        )}
      </div>
    </div>
  );
}
