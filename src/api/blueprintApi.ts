import { BlueprintGraphResponse } from '../types';
import { mockBlueprintGraph } from '../mocks/mockData';

// For development, we'll use mock data instead of making an actual API call
// In a real application, we would use the actual API

/**
 * Fetches the blueprint graph from the API
 */
export const fetchBlueprintGraph = async (
  tenantId: string,
  blueprintId: string,
  versionId: string
): Promise<BlueprintGraphResponse> => {
  // For development, we'll use mock data instead of making an actual API call
  console.log(
    `Fetching blueprint graph for tenant: ${tenantId}, blueprint: ${blueprintId}, version: ${versionId}`
  );

  // Simulating API delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockBlueprintGraph), 1000);
  });

  // Actual API call implementation (commented out for now)
  /*
  const API_BASE_URL = 'https://api.avantos-dev.io';
  
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/${tenantId}/actions/blueprints/${blueprintId}/${versionId}/graph`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch blueprint graph:', error);
    throw error;
  }
  */
};
