import { mockBlueprintGraph } from '../mocks/mockData';
import { findUpstreamForms } from './graphService';

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

describe('UpstreamForms', () => {
  it('should find upstreamForms', () => {
    const result = findUpstreamForms(mockBlueprintGraph, 'form_b');
    expect(result.direct).toHaveLength(1);
    expect(result.direct[0].id).toBe('form_a');
  });
  it('should find multiple direct upstream forms', () => {
    // Add another edge to make two direct dependencies
    const graphWithMultipleDirectDeps = {
      ...mockBlueprintGraph,
      edges: [
        ...mockBlueprintGraph.edges,
        { source: 'form_c', target: 'form_b' },
      ],
    };

    const result = findUpstreamForms(graphWithMultipleDirectDeps, 'form_b');

    expect(result.direct).toHaveLength(2);
    expect(result.direct.map((form) => form.id)).toContain('form_a');
    expect(result.direct.map((form) => form.id)).toContain('form_c');
  });

  it('should find transitive upstream forms', () => {
    const result = findUpstreamForms(mockBlueprintGraph, 'form_d');

    expect(result.direct).toHaveLength(1);
    expect(result.direct[0].id).toBe('form_b');

    expect(result.transitive).toHaveLength(1);
    expect(result.transitive[0].id).toBe('form_a');
  });
});
