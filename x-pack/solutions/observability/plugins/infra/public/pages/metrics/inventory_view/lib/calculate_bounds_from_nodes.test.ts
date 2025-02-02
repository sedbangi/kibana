/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { calculateBoundsFromNodes } from './calculate_bounds_from_nodes';
import type { SnapshotNode } from '../../../../../common/http_api/snapshot_api';
const nodes: SnapshotNode[] = [
  {
    name: 'host-01',
    path: [{ value: 'host-01', label: 'host-01' }],
    metrics: [
      {
        name: 'cpu',
        value: 0.5,
        max: 1.5,
        avg: 0.7,
      },
    ],
  },
  {
    name: 'host-02',
    path: [{ value: 'host-02', label: 'host-02' }],
    metrics: [
      {
        name: 'cpu',
        value: 0.2,
        max: 0.7,
        avg: 0.4,
      },
    ],
  },
];

describe('calculateBoundsFromNodes', () => {
  it('should just work', () => {
    const bounds = calculateBoundsFromNodes(nodes);
    expect(bounds).toEqual({
      min: 0.2,
      max: 0.5,
    });
  });
  it('should have a minimum of 0 for only a single node', () => {
    const bounds = calculateBoundsFromNodes([nodes[0]]);
    expect(bounds).toEqual({
      min: 0,
      max: 0.5,
    });
  });
  it('should return zero for empty nodes', () => {
    const bounds = calculateBoundsFromNodes([]);
    expect(bounds).toEqual({
      min: 0,
      max: 0,
    });
  });
});
