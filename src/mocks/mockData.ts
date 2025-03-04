import { BlueprintGraphResponse } from '../types';

// Sample mock data for testing
export const mockBlueprintGraph: BlueprintGraphResponse = {
  $schema: 'https://example.com/schemas/ActionBlueprintGraphDescription.json',
  blueprint_id: 'bp_12345',
  blueprint_name: 'Customer Onboarding',
  branches: [],
  edges: [
    { source: 'form_a', target: 'form_b' },
    { source: 'form_a', target: 'form_c' },
    { source: 'form_b', target: 'form_d' },
    { source: 'form_c', target: 'form_e' },
  ],
  forms: [
    {
      $schema: 'https://example.com/schemas/ActionFormDescription.json',
      description: 'First form in the journey',
      dynamic_field_config: {},
      field_schema: {
        properties: {
          email: {
            title: 'Email',
            type: 'string',
            description: 'Customer email address',
          },
          name: {
            title: 'Name',
            type: 'string',
            description: 'Customer name',
          },
          phone: {
            title: 'Phone',
            type: 'string',
            description: 'Customer phone',
          },
        },
        type: 'object',
      },
      id: 'form_a',
      is_reusable: true,
      name: 'Form A',
      ui_schema: {},
    },
    {
      $schema: 'https://example.com/schemas/ActionFormDescription.json',
      description: 'Second form in the journey',
      dynamic_field_config: {},
      field_schema: {
        properties: {
          dynamic_checkbox_group: {
            title: 'Checkbox Group',
            type: 'array',
            description: 'Dynamic checkbox group',
          },
          dynamic_object: {
            title: 'Dynamic Object',
            type: 'object',
            description: 'Dynamic object field',
          },
          email: {
            title: 'Email',
            type: 'string',
            description: 'Email address',
          },
        },
        type: 'object',
      },
      id: 'form_b',
      is_reusable: true,
      name: 'Form B',
      ui_schema: {},
    },
    {
      $schema: 'https://example.com/schemas/ActionFormDescription.json',
      description: 'Third form in the journey',
      dynamic_field_config: {},
      field_schema: {
        properties: {
          address: {
            title: 'Address',
            type: 'string',
            description: 'Customer address',
          },
          city: {
            title: 'City',
            type: 'string',
            description: 'City',
          },
        },
        type: 'object',
      },
      id: 'form_c',
      is_reusable: true,
      name: 'Form C',
      ui_schema: {},
    },
    {
      $schema: 'https://example.com/schemas/ActionFormDescription.json',
      description: 'Fourth form in the journey',
      dynamic_field_config: {},
      field_schema: {
        properties: {
          notes: {
            title: 'Notes',
            type: 'string',
            description: 'Additional notes',
          },
        },
        type: 'object',
      },
      id: 'form_d',
      is_reusable: true,
      name: 'Form D',
      ui_schema: {},
    },
    {
      $schema: 'https://example.com/schemas/ActionFormDescription.json',
      description: 'Fifth form in the journey',
      dynamic_field_config: {},
      field_schema: {
        properties: {
          confirmation: {
            title: 'Confirmation',
            type: 'boolean',
            description: 'Confirmation checkbox',
          },
        },
        type: 'object',
      },
      id: 'form_e',
      is_reusable: true,
      name: 'Form E',
      ui_schema: {},
    },
  ],
  nodes: [
    {
      data: {},
      id: 'form_a',
      position: { x: 100, y: 200 },
      type: 'form',
    },
    {
      data: {},
      id: 'form_b',
      position: { x: 400, y: 100 },
      type: 'form',
    },
    {
      data: {},
      id: 'form_c',
      position: { x: 400, y: 300 },
      type: 'form',
    },
    {
      data: {},
      id: 'form_d',
      position: { x: 700, y: 100 },
      type: 'form',
    },
    {
      data: {},
      id: 'form_e',
      position: { x: 700, y: 300 },
      type: 'form',
    },
  ],
  status: 'draft',
  tenant_id: '123',
  triggers: [],
  version_id: 'bpv_123',
  version_notes: 'Initial draft',
  version_number: 'v1.0.0',
};
