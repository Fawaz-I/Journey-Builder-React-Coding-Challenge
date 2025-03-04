import { BlueprintGraphResponse, Node, Form, FormFieldDisplay } from '../types';
/**
 * Find all upstream forms (direct and transitive dependencies) for a given form node
 */
export const findUpstreamForms = (
  graph: BlueprintGraphResponse,
  formId: string
): { direct: Form[]; transitive: Form[] } => {
  const nodes = graph.nodes;
  const edges = graph.edges;
  const forms = graph.forms;

  // Map to store form nodes by ID
  const formNodesMap = nodes
    .filter((node) => node.type === 'form')
    .reduce((map, node) => {
      map[node.id] = node;
      return map;
    }, {} as Record<string, Node>);

  // Map to store form details by ID
  const formsMap = forms.reduce((map, form) => {
    map[form.id] = form;
    return map;
  }, {} as Record<string, Form>);

  // Find direct upstream forms (immediate dependencies)
  const directUpstreamNodeIds = edges
    .filter((edge) => edge.target === formId)
    .map((edge) => edge.source)
    .filter((sourceId) => formNodesMap[sourceId]?.type === 'form');

  const directUpstreamForms = directUpstreamNodeIds
    .map((nodeId) => formsMap[nodeId])
    .filter(Boolean);

  // Find transitive upstream forms (ancestors/indirect dependencies)
  const visitedNodeIds = new Set([...directUpstreamNodeIds, formId]);
  const transitiveUpstreamForms: Form[] = [];

  const findTransitiveDependencies = (nodeIds: string[]) => {
    const nextLevelNodeIds: string[] = [];

    nodeIds.forEach((nodeId) => {
      const upstreamIds = edges
        .filter((edge) => edge.target === nodeId)
        .map((edge) => edge.source)
        .filter(
          (sourceId) =>
            formNodesMap[sourceId]?.type === 'form' &&
            !visitedNodeIds.has(sourceId)
        );

      upstreamIds.forEach((id) => {
        visitedNodeIds.add(id);
        nextLevelNodeIds.push(id);

        const form = formsMap[id];
        if (form) {
          transitiveUpstreamForms.push(form);
        }
      });
    });

    if (nextLevelNodeIds.length > 0) {
      findTransitiveDependencies(nextLevelNodeIds);
    }
  };

  findTransitiveDependencies(directUpstreamNodeIds);

  return {
    direct: directUpstreamForms,
    transitive: transitiveUpstreamForms,
  };
};

/**
 * Extract field definitions from a form
 */
export const extractFormFields = (form: Form): FormFieldDisplay[] => {
  const fieldSchema = form.field_schema;

  if (!fieldSchema || !fieldSchema.properties) {
    return [];
  }

  return Object.entries(fieldSchema.properties).map(
    ([fieldKey, fieldProps]) => ({
      id: fieldKey,
      name: fieldProps.title || fieldKey,
    })
  );
};

/**
 * Get form by ID from the graph
 */
export const getFormById = (
  graph: BlueprintGraphResponse,
  formId: string
): Form | undefined => {
  return graph.forms.find((form) => form.id === formId);
};
