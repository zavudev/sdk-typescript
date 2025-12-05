// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@zavudev/sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@zavudev/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Zavudev from '@zavudev/sdk';

export const metadata: Metadata = {
  resource: 'broadcasts',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/broadcasts',
  operationId: 'listBroadcasts',
};

export const tool: Tool = {
  name: 'list_broadcasts',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nList broadcasts for this project.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    items: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/broadcast'\n      }\n    },\n    nextCursor: {\n      type: 'string'\n    }\n  },\n  required: [    'items'\n  ],\n  $defs: {\n    broadcast: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        channel: {\n          $ref: '#/$defs/broadcast_channel'\n        },\n        createdAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        messageType: {\n          $ref: '#/$defs/broadcast_message_type'\n        },\n        name: {\n          type: 'string'\n        },\n        status: {\n          $ref: '#/$defs/broadcast_status'\n        },\n        totalContacts: {\n          type: 'integer',\n          description: 'Total number of contacts in the broadcast.'\n        },\n        actualCost: {\n          type: 'number',\n          description: 'Actual cost so far in USD.'\n        },\n        completedAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        content: {\n          $ref: '#/$defs/broadcast_content'\n        },\n        deliveredCount: {\n          type: 'integer'\n        },\n        emailSubject: {\n          type: 'string'\n        },\n        estimatedCost: {\n          type: 'number',\n          description: 'Estimated total cost in USD.'\n        },\n        failedCount: {\n          type: 'integer'\n        },\n        metadata: {\n          type: 'object',\n          additionalProperties: true\n        },\n        pendingCount: {\n          type: 'integer'\n        },\n        reservedAmount: {\n          type: 'number',\n          description: 'Amount reserved from balance in USD.'\n        },\n        scheduledAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        senderId: {\n          type: 'string'\n        },\n        sendingCount: {\n          type: 'integer'\n        },\n        startedAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        text: {\n          type: 'string'\n        },\n        updatedAt: {\n          type: 'string',\n          format: 'date-time'\n        }\n      },\n      required: [        'id',\n        'channel',\n        'createdAt',\n        'messageType',\n        'name',\n        'status',\n        'totalContacts'\n      ]\n    },\n    broadcast_channel: {\n      type: 'string',\n      description: 'Broadcast delivery channel.',\n      enum: [        'sms',\n        'whatsapp',\n        'email'\n      ]\n    },\n    broadcast_message_type: {\n      type: 'string',\n      description: 'Type of message for broadcast.',\n      enum: [        'text',\n        'image',\n        'video',\n        'audio',\n        'document',\n        'template'\n      ]\n    },\n    broadcast_status: {\n      type: 'string',\n      description: 'Current status of the broadcast.',\n      enum: [        'draft',\n        'scheduled',\n        'sending',\n        'paused',\n        'completed',\n        'cancelled',\n        'failed'\n      ]\n    },\n    broadcast_content: {\n      type: 'object',\n      description: 'Content for non-text broadcast message types.',\n      properties: {\n        filename: {\n          type: 'string',\n          description: 'Filename for documents.'\n        },\n        mediaId: {\n          type: 'string',\n          description: 'Media ID if already uploaded.'\n        },\n        mediaUrl: {\n          type: 'string',\n          description: 'URL of the media file.'\n        },\n        mimeType: {\n          type: 'string',\n          description: 'MIME type of the media.'\n        },\n        templateId: {\n          type: 'string',\n          description: 'Template ID for template messages.'\n        },\n        templateVariables: {\n          type: 'object',\n          description: 'Default template variables (can be overridden per contact).',\n          additionalProperties: true\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      cursor: {
        type: 'string',
      },
      limit: {
        type: 'integer',
      },
      status: {
        $ref: '#/$defs/broadcast_status',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
    $defs: {
      broadcast_status: {
        type: 'string',
        description: 'Current status of the broadcast.',
        enum: ['draft', 'scheduled', 'sending', 'paused', 'completed', 'cancelled', 'failed'],
      },
    },
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Zavudev, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  const response = await client.broadcasts.list(body).asResponse();
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
