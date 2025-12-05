// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@zavudev/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Zavudev from '@zavudev/sdk';

export const metadata: Metadata = {
  resource: 'senders',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/v1/senders/{senderId}',
  operationId: 'deleteSender',
};

export const tool: Tool = {
  name: 'delete_senders',
  description: 'Delete sender',
  inputSchema: {
    type: 'object',
    properties: {
      senderId: {
        type: 'string',
      },
    },
    required: ['senderId'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Zavudev, args: Record<string, unknown> | undefined) => {
  const { senderId, ...body } = args as any;
  const response = await client.senders.delete(senderId).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
