// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from '@zavudev/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Zavudev from '@zavudev/sdk';

export const metadata: Metadata = {
  resource: 'broadcasts.contacts',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/v1/broadcasts/{broadcastId}/contacts/{contactId}',
  operationId: 'removeBroadcastContact',
};

export const tool: Tool = {
  name: 'remove_broadcasts_contacts',
  description: 'Remove a contact from a broadcast in draft status.',
  inputSchema: {
    type: 'object',
    properties: {
      broadcastId: {
        type: 'string',
      },
      contactId: {
        type: 'string',
      },
    },
    required: ['broadcastId', 'contactId'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: Zavudev, args: Record<string, unknown> | undefined) => {
  const { contactId, ...body } = args as any;
  const response = await client.broadcasts.contacts.remove(contactId, body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
