// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@zavudev/sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@zavudev/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Zavudev from '@zavudev/sdk';

export const metadata: Metadata = {
  resource: 'broadcasts',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/broadcasts',
  operationId: 'createBroadcast',
};

export const tool: Tool = {
  name: 'create_broadcasts',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreate a new broadcast campaign. Add contacts after creation, then send.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/broadcast_create_response',\n  $defs: {\n    broadcast_create_response: {\n      type: 'object',\n      properties: {\n        broadcast: {\n          $ref: '#/$defs/broadcast'\n        }\n      },\n      required: [        'broadcast'\n      ]\n    },\n    broadcast: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        channel: {\n          $ref: '#/$defs/broadcast_channel'\n        },\n        createdAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        messageType: {\n          $ref: '#/$defs/broadcast_message_type'\n        },\n        name: {\n          type: 'string'\n        },\n        status: {\n          $ref: '#/$defs/broadcast_status'\n        },\n        totalContacts: {\n          type: 'integer',\n          description: 'Total number of contacts in the broadcast.'\n        },\n        actualCost: {\n          type: 'number',\n          description: 'Actual cost so far in USD.'\n        },\n        completedAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        content: {\n          $ref: '#/$defs/broadcast_content'\n        },\n        deliveredCount: {\n          type: 'integer'\n        },\n        emailSubject: {\n          type: 'string'\n        },\n        estimatedCost: {\n          type: 'number',\n          description: 'Estimated total cost in USD.'\n        },\n        failedCount: {\n          type: 'integer'\n        },\n        metadata: {\n          type: 'object',\n          additionalProperties: true\n        },\n        pendingCount: {\n          type: 'integer'\n        },\n        reservedAmount: {\n          type: 'number',\n          description: 'Amount reserved from balance in USD.'\n        },\n        scheduledAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        senderId: {\n          type: 'string'\n        },\n        sendingCount: {\n          type: 'integer'\n        },\n        startedAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        text: {\n          type: 'string'\n        },\n        updatedAt: {\n          type: 'string',\n          format: 'date-time'\n        }\n      },\n      required: [        'id',\n        'channel',\n        'createdAt',\n        'messageType',\n        'name',\n        'status',\n        'totalContacts'\n      ]\n    },\n    broadcast_channel: {\n      type: 'string',\n      description: 'Broadcast delivery channel.',\n      enum: [        'sms',\n        'whatsapp',\n        'email'\n      ]\n    },\n    broadcast_message_type: {\n      type: 'string',\n      description: 'Type of message for broadcast.',\n      enum: [        'text',\n        'image',\n        'video',\n        'audio',\n        'document',\n        'template'\n      ]\n    },\n    broadcast_status: {\n      type: 'string',\n      description: 'Current status of the broadcast.',\n      enum: [        'draft',\n        'scheduled',\n        'sending',\n        'paused',\n        'completed',\n        'cancelled',\n        'failed'\n      ]\n    },\n    broadcast_content: {\n      type: 'object',\n      description: 'Content for non-text broadcast message types.',\n      properties: {\n        filename: {\n          type: 'string',\n          description: 'Filename for documents.'\n        },\n        mediaId: {\n          type: 'string',\n          description: 'Media ID if already uploaded.'\n        },\n        mediaUrl: {\n          type: 'string',\n          description: 'URL of the media file.'\n        },\n        mimeType: {\n          type: 'string',\n          description: 'MIME type of the media.'\n        },\n        templateId: {\n          type: 'string',\n          description: 'Template ID for template messages.'\n        },\n        templateVariables: {\n          type: 'object',\n          description: 'Default template variables (can be overridden per contact).',\n          additionalProperties: true\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      channel: {
        $ref: '#/$defs/broadcast_channel',
      },
      name: {
        type: 'string',
        description: 'Name of the broadcast campaign.',
      },
      content: {
        $ref: '#/$defs/broadcast_content',
      },
      emailHtmlBody: {
        type: 'string',
        description: 'HTML body for email broadcasts.',
      },
      emailSubject: {
        type: 'string',
        description: 'Email subject line. Required for email broadcasts.',
      },
      idempotencyKey: {
        type: 'string',
        description: 'Idempotency key to prevent duplicate broadcasts.',
      },
      messageType: {
        $ref: '#/$defs/broadcast_message_type',
      },
      metadata: {
        type: 'object',
        additionalProperties: true,
      },
      scheduledAt: {
        type: 'string',
        description: 'Schedule the broadcast for future delivery.',
        format: 'date-time',
      },
      senderId: {
        type: 'string',
        description: 'Sender profile ID. Uses default sender if omitted.',
      },
      text: {
        type: 'string',
        description: 'Text content or caption. Supports template variables: {{name}}, {{1}}, etc.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['channel', 'name'],
    $defs: {
      broadcast_channel: {
        type: 'string',
        description: 'Broadcast delivery channel.',
        enum: ['sms', 'whatsapp', 'email'],
      },
      broadcast_content: {
        type: 'object',
        description: 'Content for non-text broadcast message types.',
        properties: {
          filename: {
            type: 'string',
            description: 'Filename for documents.',
          },
          mediaId: {
            type: 'string',
            description: 'Media ID if already uploaded.',
          },
          mediaUrl: {
            type: 'string',
            description: 'URL of the media file.',
          },
          mimeType: {
            type: 'string',
            description: 'MIME type of the media.',
          },
          templateId: {
            type: 'string',
            description: 'Template ID for template messages.',
          },
          templateVariables: {
            type: 'object',
            description: 'Default template variables (can be overridden per contact).',
            additionalProperties: true,
          },
        },
      },
      broadcast_message_type: {
        type: 'string',
        description: 'Type of message for broadcast.',
        enum: ['text', 'image', 'video', 'audio', 'document', 'template'],
      },
    },
  },
  annotations: {},
};

export const handler = async (client: Zavudev, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.broadcasts.create(body)));
  } catch (error) {
    if (error instanceof Zavudev.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
