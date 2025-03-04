import React from 'react';
import { BlueprintGraphResponse } from '../../types';
import PrefillField from './PrefillField';
import { extractFormFields, getFormById } from '../../services/graphService';

interface PrefillMappingPanelProps {
  graph: BlueprintGraphResponse;
  selectedFormId: string;
  mappings: Record<
    string,
    {
      sourceType: 'form' | 'global';
      sourceFormId?: string;
      sourceField: string;
    }
  >;
  onOpenMapping: (fieldId: string) => void;
  onRemoveMapping: (fieldId: string) => void;
}

const PrefillMappingPanel: React.FC<PrefillMappingPanelProps> = ({
  graph,
  selectedFormId,
  mappings,
  onOpenMapping,
  onRemoveMapping,
}) => {
  // Find the selected form
  const selectedForm = getFormById(graph, selectedFormId);

  if (!selectedForm) {
    return (
      <div style={{ padding: '16px', color: '#666' }}>
        Select a form to configure prefills
      </div>
    );
  }

  // Extract fields from the form
  const fields = extractFormFields(selectedForm);

  return (
    <div style={{ padding: '16px' }}>
      <h3
        style={{
          marginBottom: '16px',
          borderBottom: '1px solid #eee',
          paddingBottom: '8px',
        }}
      >
        Prefill fields for {selectedForm.name}
      </h3>

      {fields.length === 0 ? (
        <div style={{ color: '#666' }}>
          This form has no fields to configure
        </div>
      ) : (
        <div>
          {fields.map((field) => (
            <PrefillField
              key={field.id}
              field={field}
              mapping={mappings[field.id]}
              onEdit={() => onOpenMapping(field.id)}
              onRemove={() => onRemoveMapping(field.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PrefillMappingPanel;
