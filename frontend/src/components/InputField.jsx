import { AlertTriangle } from 'lucide-react';

export default function InputField({ icon: Icon, label, type = "text", placeholder, value, error, touched, onChange, onBlur, children, ...props }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ 
        color: '#ccc', fontSize: '0.85rem', display: 'flex', alignItems: 'center',
        gap: '6px', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        <Icon size={14} color={error && touched ? '#ff4444' : '#00f2fe'} />
        {label} <span style={{ color: '#ff007f' }}>*</span>
      </label>
      {children || (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          style={{
            width: '100%', padding: '14px 16px', borderRadius: '12px',
            border: error && touched ? '2px solid #ff4444' : '1px solid #2a2a4e',
            background: '#0a0a1a', color: '#fff', fontSize: '1rem',
            outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box',
            boxShadow: error && touched ? '0 0 10px rgba(255,68,68,0.2)' : 'none'
          }}
          onFocus={e => {
            if (!error) e.target.style.borderColor = '#00f2fe';
            e.target.style.boxShadow = '0 0 15px rgba(0,242,254,0.1)';
          }}
          onBlurCapture={e => {
            e.target.style.borderColor = error && touched ? '#ff4444' : '#2a2a4e';
            e.target.style.boxShadow = 'none';
          }}
          {...props}
        />
      )}
      {error && touched && (
        <div style={{ 
          color: '#ff4444', fontSize: '0.8rem', marginTop: '6px',
          display: 'flex', alignItems: 'center', gap: '4px'
        }}>
          <AlertTriangle size={12} /> {error}
        </div>
      )}
    </div>
  );
}
