// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@zavudev/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Zavudev from '@zavudev/sdk';

export const metadata: Metadata = {
  resource: 'broadcasts',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/v1/broadcasts/{broadcastId}',
  operationId: 'deleteBroadcast',
};

export const tool: Tool = {
  name: 'delete_broadcasts',
  description: 'Delete a broadcast in draft status.',
  inputSchema: {
    type: 'object',
    properties: {
      broadcastId: {
        type: 'string',
      },
    },
    required: ['broadcastId'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Zavudev, args: Record<string, unknown> | undefined) => {
  const { broadcastId, ...body } = args as any;
  const response = await client.broadcasts.delete(broadcastId).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
