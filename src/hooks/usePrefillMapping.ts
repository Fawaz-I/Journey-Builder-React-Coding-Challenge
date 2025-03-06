import { useState } from 'react';
import { PrefillMapping, FieldMapping } from '../types';
import {
  updateMapping,
  removeMapping,
  findFieldMapping,
  getFormMappings as getFormMappingsService,
} from '../services/prefillService';

/**
 * Hook to manage prefill mapping state
 */
export const usePrefillMapping = (initialMappings: PrefillMapping[] = []) => {
  const [mappings, setMappings] = useState<PrefillMapping[]>(initialMappings);

  const addOrUpdateMapping = (
    targetFormId: string,
    targetField: string,
    sourceType: 'form' | 'global',
    sourceFormId: string | undefined,
    sourceField: string
  ) => {
    setMappings((prevMappings) =>
      updateMapping(
        prevMappings,
        targetFormId,
        targetField,
        sourceType,
        sourceFormId,
        sourceField
      )
    );
  };

  const deleteMapping = (targetFormId: string, targetField: string) => {
    setMappings((prevMappings) =>
      removeMapping(prevMappings, targetFormId, targetField)
    );
  };

  const getMapping = (
    targetFormId: string,
    targetField: string
  ): FieldMapping | undefined => {
    return findFieldMapping(mappings, targetFormId, targetField);
  };

  const getFormMappings = (targetFormId: string) => {
    return getFormMappingsService(mappings, targetFormId);
  };

  return {
    addOrUpdateMapping,
    deleteMapping,
    getMapping,
    getFormMappings,
  };
};
