import React from 'react';

interface PrefillFieldProps {
  field: {
    id: string;
    name: string;
  };
  mapping?: {
    sourceType: 'form' | 'global';
    sourceFormId?: string;
    sourceField: string;
  };
  onEdit: () => void;
  onRemove: () => void;
}

const PrefillField: React.FC<PrefillFieldProps> = ({
  field,
  mapping,
  onEdit,
  onRemove,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #eee',
        backgroundColor: mapping ? '#f9f9f9' : 'transparent',
      }}
    >
      <div style={{ flex: 1, fontWeight: 'medium' }}>{field.name}</div>

      <div style={{ flex: 2, marginLeft: '16px' }}>
        {mapping ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              {mapping.sourceType === 'global'
                ? `Global: ${mapping.sourceField}`
                : `Form: ${mapping.sourceFormId}.${mapping.sourceField}`}
            </div>
            <button
              onClick={onRemove}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                marginLeft: '8px',
                color: '#ff4d4f',
                fontWeight: 'bold',
              }}
            >
              X
            </button>
          </div>
        ) : (
          <button
            onClick={onEdit}
            style={{
              background: 'none',
              border: '1px solid #1890ff',
              borderRadius: '4px',
              padding: '4px 12px',
              cursor: 'pointer',
              color: '#1890ff',
            }}
          >
            Add Mapping
          </button>
        )}
      </div>
    </div>
  );
};

export default PrefillField;
