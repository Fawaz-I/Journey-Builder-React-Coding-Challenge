// src/services/prefillService.ts
import { FieldMapping, PrefillMapping } from '../types';

/**
 * Get display text for a mapping
 */
export const getDisplayText = (mapping: FieldMapping): string => {
  if (mapping.sourceType === 'global') {
    return `Global: ${mapping.sourceField}`;
  } else {
    return `Form: ${mapping.sourceFormId}.${mapping.sourceField}`;
  }
};

/**
 * Add or update a mapping
 */
export const updateMapping = (
  mappings: PrefillMapping[],
  targetFormId: string,
  targetField: string,
  sourceType: 'form' | 'global',
  sourceFormId: string | undefined,
  sourceField: string
): PrefillMapping[] => {
  const updatedMappings = [...mappings];

  // Find if we already have mappings for this form
  const formMappingIndex = updatedMappings.findIndex(
    (m) => m.targetFormId === targetFormId
  );

  if (formMappingIndex >= 0) {
    const formMapping = { ...updatedMappings[formMappingIndex] };

    // Find if we already have a mapping for this field
    const fieldMappingIndex = formMapping.mappings.findIndex(
      (m) => m.targetField === targetField
    );

    const newFieldMapping: FieldMapping = {
      targetField,
      sourceType,
      sourceFormId,
      sourceField,
      displayText:
        sourceType === 'global'
          ? `Global: ${sourceField}`
          : `Form: ${sourceFormId}.${sourceField}`,
    };

    if (fieldMappingIndex >= 0) {
      // Update existing field mapping
      const updatedMappings = [...formMapping.mappings];
      updatedMappings[fieldMappingIndex] = newFieldMapping;
      formMapping.mappings = updatedMappings;
    } else {
      // Add new field mapping
      formMapping.mappings = [...formMapping.mappings, newFieldMapping];
    }

    updatedMappings[formMappingIndex] = formMapping;
  } else {
    // Add new form mapping
    updatedMappings.push({
      targetFormId,
      mappings: [
        {
          targetField,
          sourceType,
          sourceFormId,
          sourceField,
          displayText:
            sourceType === 'global'
              ? `Global: ${sourceField}`
              : `Form: ${sourceFormId}.${sourceField}`,
        },
      ],
    });
  }

  return updatedMappings;
};

/**
 * Remove a mapping
 */
export const removeMapping = (
  mappings: PrefillMapping[],
  targetFormId: string,
  targetField: string
): PrefillMapping[] => {
  const updatedMappings = [...mappings];

  const formMappingIndex = updatedMappings.findIndex(
    (m) => m.targetFormId === targetFormId
  );

  if (formMappingIndex >= 0) {
    const formMapping = { ...updatedMappings[formMappingIndex] };

    // Filter out the mapping for this field
    formMapping.mappings = formMapping.mappings.filter(
      (m) => m.targetField !== targetField
    );

    if (formMapping.mappings.length === 0) {
      // If no more mappings for this form, remove the form mapping
      updatedMappings.splice(formMappingIndex, 1);
    } else {
      updatedMappings[formMappingIndex] = formMapping;
    }
  }

  return updatedMappings;
};

/**
 * Find mapping for a specific field
 */
export const findFieldMapping = (
  mappings: PrefillMapping[],
  targetFormId: string,
  targetField: string
): FieldMapping | undefined => {
  const formMapping = mappings.find((m) => m.targetFormId === targetFormId);

  if (!formMapping) {
    return undefined;
  }

  return formMapping.mappings.find((m) => m.targetField === targetField);
};

/**
 * Get all mappings for a form
 */
export const getFormMappings = (
  mappings: PrefillMapping[],
  targetFormId: string
): Record<
  string,
  { sourceType: 'form' | 'global'; sourceFormId?: string; sourceField: string }
> => {
  const formMapping = mappings.find((m) => m.targetFormId === targetFormId);

  if (!formMapping) {
    return {};
  }

  return formMapping.mappings.reduce((acc, mapping) => {
    acc[mapping.targetField] = {
      sourceType: mapping.sourceType,
      sourceFormId: mapping.sourceFormId,
      sourceField: mapping.sourceField,
    };
    return acc;
  }, {} as Record<string, { sourceType: 'form' | 'global'; sourceFormId?: string; sourceField: string }>);
};
