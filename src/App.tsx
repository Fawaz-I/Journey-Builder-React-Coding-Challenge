import React, { useState } from 'react';
import { useBlueprint } from './hooks/useBlueprint';
import { usePrefillMapping } from './hooks/usePrefillMapping';
import JourneyGraph from './components/JourneyGraph/JourneyGraph';
import PrefillMappingPanel from './components/PrefillMapping/PrefillMappingPanel';
import PrefillModal from './components/PrefillMapping/PrefillModal';
import { findUpstreamForms } from './services/graphService';
import './App.css';

// Mock global data sources - in a real app these could come from an API or config
const GLOBAL_DATA_SOURCES = [
  { id: 'action.id', name: 'Action ID' },
  { id: 'action.name', name: 'Action Name' },
  { id: 'action.created_at', name: 'Action Creation Date' },
  { id: 'client.id', name: 'Client ID' },
  { id: 'client.name', name: 'Client Name' },
  { id: 'client.email', name: 'Client Email' },
  { id: 'client.created_at', name: 'Client Creation Date' },
];

function App() {
  // In a real app, these would come from URL params, context, or state management
  const tenantId = '123';
  const blueprintId = 'bp_456';
  const versionId = 'bpv_123';

  const { loading, error, data } = useBlueprint(
    tenantId,
    blueprintId,
    versionId
  );
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeFieldId, setActiveFieldId] = useState<string | null>(null);

  const { addOrUpdateMapping, deleteMapping, getFormMappings } =
    usePrefillMapping([]);

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setActiveFieldId(null);
  };

  const handleOpenMapping = (fieldId: string) => {
    setActiveFieldId(fieldId);
  };

  const handleCloseMapping = () => {
    setActiveFieldId(null);
  };

  const handleSelectMapping = (
    sourceType: 'form' | 'global',
    sourceFormId: string | undefined,
    sourceField: string
  ) => {
    if (selectedNodeId && activeFieldId) {
      addOrUpdateMapping(
        selectedNodeId,
        activeFieldId,
        sourceType,
        sourceFormId,
        sourceField
      );
      setActiveFieldId(null);
    }
  };

  const handleRemoveMapping = (fieldId: string) => {
    if (selectedNodeId) {
      deleteMapping(selectedNodeId, fieldId);
    }
  };

  if (loading) {
    return (
      <div className='loading-container'>
        <div className='loading-spinner'></div>
        <div>Loading blueprint data...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className='error-container'>
        <h2>Error loading blueprint</h2>
        <div>{error?.message || 'Unknown error'}</div>
      </div>
    );
  }

  // Get upstream forms for the selected node
  const upstreamForms = selectedNodeId
    ? findUpstreamForms(data, selectedNodeId)
    : { direct: [], transitive: [] };

  // Get mappings for the selected form
  const fieldMappings = selectedNodeId ? getFormMappings(selectedNodeId) : {};

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Journey Builder</h1>
        <div className='blueprint-info'>
          <span>Blueprint: {data.blueprint_name}</span>
          <span>|</span>
          <span>Version: {data.version_number}</span>
          <span>|</span>
          <span>Status: {data.status}</span>
        </div>
      </header>

      <div className='app-content'>
        <div className='graph-container'>
          <JourneyGraph
            data={data}
            onNodeSelect={handleNodeSelect}
            selectedNodeId={selectedNodeId}
          />
        </div>

        <div className='panel-container'>
          <div className='panel-header'>
            <h2>Form Configuration</h2>
          </div>

          <div className='panel-content'>
            {selectedNodeId ? (
              <PrefillMappingPanel
                graph={data}
                selectedFormId={selectedNodeId}
                mappings={fieldMappings}
                onOpenMapping={handleOpenMapping}
                onRemoveMapping={handleRemoveMapping}
              />
            ) : (
              <div className='panel-placeholder'>
                Select a form node to configure its prefill mappings
              </div>
            )}
          </div>
        </div>
      </div>

      {activeFieldId && (
        <PrefillModal
          isOpen={true}
          onClose={handleCloseMapping}
          onSelect={handleSelectMapping}
          availableForms={upstreamForms}
          globalSources={GLOBAL_DATA_SOURCES}
        />
      )}
    </div>
  );
}

export default App;
