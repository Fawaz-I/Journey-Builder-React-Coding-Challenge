// Graph API response types
export interface BlueprintGraphResponse {
  $schema: string;
  blueprint_id: string;
  blueprint_name: string;
  branches: Branch[];
  edges: Edge[];
  forms: Form[];
  nodes: Node[];
  status: 'draft' | 'published' | 'historical' | 'archived';
  tenant_id: string;
  triggers: Trigger[];
  version_id: string;
  version_notes: string;
  version_number: string;
}

export interface Branch {
  $schema: string;
  condition: Record<string, any>;
  created_at: string;
  created_by: string;
  description: string;
  id: string;
  name: string;
  tenant_id: string;
  updated_at: string;
}

export interface Edge {
  source: string;
  target: string;
}

export interface Form {
  $schema: string;
  description: string;
  dynamic_field_config: Record<string, object>;
  field_schema: FormFieldSchema;
  id: string;
  is_reusable: boolean;
  name: string;
  ui_schema: object;
  vendor_schema?: Record<string, any>;
}

export interface FormFieldSchema {
  properties: Record<string, FormFieldDefinition>;
  required?: string[];
  type: string;
}

// This is the definition of a field in the schema
export interface FormFieldDefinition {
  title: string;
  type: string;
  description?: string;
}

// This is what we use to display a field in the UI
export interface FormFieldDisplay {
  id: string;
  name: string;
}

export interface Node {
  data: object;
  id: string;
  position: Position;
  type: 'form' | 'branch' | 'trigger' | 'configuration';
}

export interface Position {
  x: number;
  y: number;
}

export interface Trigger {
  $schema: string;
  created_at: string;
  id: string;
  max_retries: number;
  name: string;
  output_mapping: Record<string, string>;
  path_template: string;
  path_template_variables: string[] | null;
  payload_template: Record<string, any>;
  payload_template_variables: string[] | null;
  query_parameter_template: Record<string, string>;
  query_parameter_template_variables: string[] | null;
  request_method: 'POST' | 'PUT' | 'GET' | 'DELETE';
  timeout_seconds: number;
  trigger_service_id: string;
  updated_at: string;
}

// Prefill mapping types
export interface PrefillMapping {
  targetFormId: string;
  mappings: FieldMapping[];
}

export interface FieldMapping {
  targetField: string;
  sourceType: 'form' | 'global';
  sourceFormId?: string;
  sourceField: string;
  displayText: string;
}
