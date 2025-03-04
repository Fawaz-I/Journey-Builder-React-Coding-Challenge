import { useState, useEffect } from 'react';
import { fetchBlueprintGraph } from '../api/blueprintApi';
import { BlueprintGraphResponse } from '../types';

/**
 * Hook to fetch and manage blueprint graph data
 */
export const useBlueprint = (
  tenantId: string,
  blueprintId: string,
  versionId: string
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<BlueprintGraphResponse | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const graphData = await fetchBlueprintGraph(
          tenantId,
          blueprintId,
          versionId
        );
        setData(graphData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [tenantId, blueprintId, versionId]);

  return { loading, error, data };
};
