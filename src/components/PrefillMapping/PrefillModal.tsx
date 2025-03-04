import React, { useState } from 'react';
import { Form } from '../../types';
import { extractFormFields } from '../../services/graphService';
interface PrefillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (
    sourceType: 'form' | 'global',
    formId: string | undefined,
    fieldId: string
  ) => void;
  availableForms: {
    direct: Form[];
    transitive: Form[];
  };
  globalSources: { id: string; name: string }[];
}

const PrefillModal: React.FC<PrefillModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  availableForms,
  globalSources,
}) => {
  const [selectedType, setSelectedType] = useState<'form' | 'global'>('form');
  const [expandedForm, setExpandedForm] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<{
    type: 'form' | 'global';
    formId?: string;
    fieldId: string;
  } | null>(null);

  const handleTypeChange = (type: 'form' | 'global') => {
    setSelectedType(type);
    setExpandedForm(null);
    setSelectedSource(null);
  };

  const handleFormToggle = (formId: string) => {
    setExpandedForm(expandedForm === formId ? null : formId);
    setSelectedSource(null);
  };

  const handleSourceSelect = (
    type: 'form' | 'global',
    formId: string | undefined,
    fieldId: string
  ) => {
    setSelectedSource({ type, formId, fieldId });
  };

  const handleConfirm = () => {
    if (!selectedSource) return;
    onSelect(
      selectedSource.type,
      selectedSource.formId,
      selectedSource.fieldId
    );
  };

  if (!isOpen) {
    return null;
  }

  const renderFormFields = (form: Form) => {
    const fields = extractFormFields(form);

    return (
      <div style={{ paddingLeft: '24px' }}>
        {fields.map((field) => (
          <div
            key={field.id}
            onClick={() => handleSourceSelect('form', form.id, field.id)}
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              backgroundColor:
                selectedSource?.type === 'form' &&
                selectedSource.formId === form.id &&
                selectedSource.fieldId === field.id
                  ? '#e6f7ff'
                  : 'transparent',
              borderRadius: '4px',
            }}
          >
            {field.name}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '8px',
          width: '600px',
          maxWidth: '90%',
          maxHeight: '90%',
          overflow: 'auto',
          padding: '24px',
        }}
      >
        <h2 style={{ marginBottom: '16px' }}>Select data element to map</h2>

        <div style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', marginBottom: '16px' }}>
            <button
              onClick={() => handleTypeChange('form')}
              style={{
                padding: '8px 16px',
                background: selectedType === 'form' ? '#1890ff' : 'white',
                color: selectedType === 'form' ? 'white' : '#666',
                border: '1px solid #d9d9d9',
                borderRadius: '4px 0 0 4px',
                cursor: 'pointer',
                flex: 1,
              }}
            >
              Form Fields
            </button>
            <button
              onClick={() => handleTypeChange('global')}
              style={{
                padding: '8px 16px',
                background: selectedType === 'global' ? '#1890ff' : 'white',
                color: selectedType === 'global' ? 'white' : '#666',
                border: '1px solid #d9d9d9',
                borderLeft: 'none',
                borderRadius: '0 4px 4px 0',
                cursor: 'pointer',
                flex: 1,
              }}
            >
              Global Data
            </button>
          </div>

          <div
            style={{
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              maxHeight: '400px',
              overflow: 'auto',
            }}
          >
            {selectedType === 'form' ? (
              <div>
                {/* Direct dependencies section */}
                {availableForms.direct.length > 0 && (
                  <div>
                    <div
                      style={{
                        padding: '12px 16px',
                        fontWeight: 'bold',
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      Direct Dependencies
                    </div>

                    {availableForms.direct.map((form) => (
                      <div key={form.id}>
                        <div
                          onClick={() => handleFormToggle(form.id)}
                          style={{
                            padding: '10px 16px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor:
                              expandedForm === form.id ? '#f0f0f0' : 'white',
                            borderBottom: '1px solid #eee',
                          }}
                        >
                          <span style={{ marginRight: '8px' }}>
                            {expandedForm === form.id ? '▼' : '►'}
                          </span>
                          {form.name}
                        </div>

                        {expandedForm === form.id && renderFormFields(form)}
                      </div>
                    ))}
                  </div>
                )}

                {/* Transitive dependencies section */}
                {availableForms.transitive.length > 0 && (
                  <div>
                    <div
                      style={{
                        padding: '12px 16px',
                        fontWeight: 'bold',
                        borderBottom: '1px solid #eee',
                        borderTop:
                          availableForms.direct.length > 0
                            ? '1px solid #eee'
                            : 'none',
                      }}
                    >
                      Indirect Dependencies
                    </div>

                    {availableForms.transitive.map((form) => (
                      <div key={form.id}>
                        <div
                          onClick={() => handleFormToggle(form.id)}
                          style={{
                            padding: '10px 16px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor:
                              expandedForm === form.id ? '#f0f0f0' : 'white',
                            borderBottom: '1px solid #eee',
                          }}
                        >
                          <span style={{ marginRight: '8px' }}>
                            {expandedForm === form.id ? '▼' : '►'}
                          </span>
                          {form.name}
                        </div>

                        {expandedForm === form.id && renderFormFields(form)}
                      </div>
                    ))}
                  </div>
                )}

                {availableForms.direct.length === 0 &&
                  availableForms.transitive.length === 0 && (
                    <div
                      style={{
                        padding: '16px',
                        color: '#666',
                        textAlign: 'center',
                      }}
                    >
                      No upstream forms available to map from
                    </div>
                  )}
              </div>
            ) : (
              <div>
                {globalSources.map((source) => (
                  <div
                    key={source.id}
                    onClick={() =>
                      handleSourceSelect('global', undefined, source.id)
                    }
                    style={{
                      padding: '10px 16px',
                      cursor: 'pointer',
                      backgroundColor:
                        selectedSource?.type === 'global' &&
                        selectedSource.fieldId === source.id
                          ? '#e6f7ff'
                          : 'white',
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    {source.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              background: 'white',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              marginRight: '8px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedSource}
            style={{
              padding: '8px 16px',
              background: selectedSource ? '#1890ff' : '#f5f5f5',
              color: selectedSource ? 'white' : '#d9d9d9',
              border: 'none',
              borderRadius: '4px',
              cursor: selectedSource ? 'pointer' : 'default',
            }}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrefillModal;
