import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

const FormNode: React.FC<NodeProps> = ({ data, isConnectable }) => {
  const { label, isSelected } = data;

  return (
    <div
      style={{
        padding: '10px',
        borderRadius: '5px',
        background: isSelected ? '#d6e4ff' : 'white',
        border: isSelected ? '2px solid #3470ff' : '1px solid #ccc',
        width: '180px',
      }}
    >
      <Handle
        type='target'
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            marginRight: '8px',
            width: '24px',
            height: '24px',
            background: '#e7efff',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#4a7af9',
          }}
        >
          F
        </div>
        <div style={{ fontWeight: 'bold' }}>{label}</div>
      </div>
      <Handle
        type='source'
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default FormNode;
