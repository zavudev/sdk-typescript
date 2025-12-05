// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@zavudev/sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@zavudev/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Zavudev from '@zavudev/sdk';

export const metadata: Metadata = {
  resource: 'broadcasts.contacts',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/broadcasts/{broadcastId}/contacts',
  operationId: 'listBroadcastContacts',
};

export const tool: Tool = {
  name: 'list_broadcasts_contacts',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nList contacts in a broadcast with optional status filter.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    items: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/broadcast_contact'\n      }\n    },\n    nextCursor: {\n      type: 'string'\n    }\n  },\n  required: [    'items'\n  ],\n  $defs: {\n    broadcast_contact: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        createdAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        recipient: {\n          type: 'string'\n        },\n        recipientType: {\n          type: 'string',\n          enum: [            'phone',\n            'email'\n          ]\n        },\n        status: {\n          $ref: '#/$defs/broadcast_contact_status'\n        },\n        cost: {\n          type: 'number'\n        },\n        errorCode: {\n          type: 'string'\n        },\n        errorMessage: {\n          type: 'string'\n        },\n        messageId: {\n          type: 'string',\n          description: 'Associated message ID after processing.'\n        },\n        processedAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        templateVariables: {\n          type: 'object',\n          additionalProperties: true\n        }\n      },\n      required: [        'id',\n        'createdAt',\n        'recipient',\n        'recipientType',\n        'status'\n      ]\n    },\n    broadcast_contact_status: {\n      type: 'string',\n      description: 'Status of a contact within a broadcast.',\n      enum: [        'pending',\n        'queued',\n        'sending',\n        'delivered',\n        'failed',\n        'skipped'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      broadcastId: {
        type: 'string',
      },
      cursor: {
        type: 'string',
      },
      limit: {
        type: 'integer',
      },
      status: {
        $ref: '#/$defs/broadcast_contact_status',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['broadcastId'],
    $defs: {
      broadcast_contact_status: {
        type: 'string',
        description: 'Status of a contact within a broadcast.',
        enum: ['pending', 'queued', 'sending', 'delivered', 'failed', 'skipped'],
      },
    },
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Zavudev, args: Record<string, unknown> | undefined) => {
  const { broadcastId, jq_filter, ...body } = args as any;
  const response = await client.broadcasts.contacts.list(broadcastId, body).asResponse();
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
  } catch (error) {
    if (error instanceof Zavudev.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
