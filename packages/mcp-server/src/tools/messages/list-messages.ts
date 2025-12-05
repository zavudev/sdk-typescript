// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@zavudev/sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@zavudev/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Zavudev from '@zavudev/sdk';

export const metadata: Metadata = {
  resource: 'messages',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/messages',
  operationId: 'listMessages',
};

export const tool: Tool = {
  name: 'list_messages',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nList messages previously sent by this project.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    items: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/message'\n      }\n    },\n    nextCursor: {\n      type: 'string'\n    }\n  },\n  required: [    'items'\n  ],\n  $defs: {\n    message: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        channel: {\n          $ref: '#/$defs/channel'\n        },\n        createdAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        messageType: {\n          $ref: '#/$defs/message_type'\n        },\n        status: {\n          $ref: '#/$defs/message_status'\n        },\n        to: {\n          type: 'string'\n        },\n        content: {\n          $ref: '#/$defs/message_content'\n        },\n        cost: {\n          type: 'number',\n          description: 'MAU cost in USD (charged for first contact of the month).'\n        },\n        costProvider: {\n          type: 'number',\n          description: 'Provider cost in USD (Telnyx, SES, etc.).'\n        },\n        costTotal: {\n          type: 'number',\n          description: 'Total cost in USD (MAU + provider cost).'\n        },\n        errorCode: {\n          type: 'string'\n        },\n        errorMessage: {\n          type: 'string'\n        },\n        from: {\n          type: 'string'\n        },\n        metadata: {\n          type: 'object',\n          additionalProperties: true\n        },\n        providerMessageId: {\n          type: 'string',\n          description: 'Message ID from the delivery provider.'\n        },\n        senderId: {\n          type: 'string'\n        },\n        text: {\n          type: 'string',\n          description: 'Text content or caption.'\n        },\n        updatedAt: {\n          type: 'string',\n          format: 'date-time'\n        }\n      },\n      required: [        'id',\n        'channel',\n        'createdAt',\n        'messageType',\n        'status',\n        'to'\n      ]\n    },\n    channel: {\n      type: 'string',\n      description: 'Delivery channel. Use \\'auto\\' for intelligent routing.',\n      enum: [        'auto',\n        'sms',\n        'whatsapp',\n        'email'\n      ]\n    },\n    message_type: {\n      type: 'string',\n      description: 'Type of message. Non-text types are WhatsApp only.',\n      enum: [        'text',\n        'image',\n        'video',\n        'audio',\n        'document',\n        'sticker',\n        'location',\n        'contact',\n        'buttons',\n        'list',\n        'reaction',\n        'template'\n      ]\n    },\n    message_status: {\n      type: 'string',\n      enum: [        'queued',\n        'sending',\n        'delivered',\n        'failed',\n        'received'\n      ]\n    },\n    message_content: {\n      type: 'object',\n      description: 'Content for non-text message types (WhatsApp only).',\n      properties: {\n        buttons: {\n          type: 'array',\n          description: 'Interactive buttons (max 3).',\n          items: {\n            type: 'object',\n            properties: {\n              id: {\n                type: 'string'\n              },\n              title: {\n                type: 'string'\n              }\n            },\n            required: [              'id',\n              'title'\n            ]\n          }\n        },\n        contacts: {\n          type: 'array',\n          description: 'Contact cards for contact messages.',\n          items: {\n            type: 'object',\n            properties: {\n              name: {\n                type: 'string'\n              },\n              phones: {\n                type: 'array',\n                items: {\n                  type: 'string'\n                }\n              }\n            }\n          }\n        },\n        emoji: {\n          type: 'string',\n          description: 'Emoji for reaction messages.'\n        },\n        filename: {\n          type: 'string',\n          description: 'Filename for documents.'\n        },\n        latitude: {\n          type: 'number',\n          description: 'Latitude for location messages.'\n        },\n        listButton: {\n          type: 'string',\n          description: 'Button text for list messages.'\n        },\n        locationAddress: {\n          type: 'string',\n          description: 'Address of the location.'\n        },\n        locationName: {\n          type: 'string',\n          description: 'Name of the location.'\n        },\n        longitude: {\n          type: 'number',\n          description: 'Longitude for location messages.'\n        },\n        mediaId: {\n          type: 'string',\n          description: 'WhatsApp media ID if already uploaded.'\n        },\n        mediaUrl: {\n          type: 'string',\n          description: 'URL of the media file (for image, video, audio, document, sticker).'\n        },\n        mimeType: {\n          type: 'string',\n          description: 'MIME type of the media.'\n        },\n        reactToMessageId: {\n          type: 'string',\n          description: 'Message ID to react to.'\n        },\n        sections: {\n          type: 'array',\n          description: 'Sections for list messages.',\n          items: {\n            type: 'object',\n            properties: {\n              rows: {\n                type: 'array',\n                items: {\n                  type: 'object',\n                  properties: {\n                    id: {\n                      type: 'string'\n                    },\n                    title: {\n                      type: 'string'\n                    },\n                    description: {\n                      type: 'string'\n                    }\n                  },\n                  required: [                    'id',\n                    'title'\n                  ]\n                }\n              },\n              title: {\n                type: 'string'\n              }\n            },\n            required: [              'rows',\n              'title'\n            ]\n          }\n        },\n        templateId: {\n          type: 'string',\n          description: 'Template ID for template messages.'\n        },\n        templateVariables: {\n          type: 'object',\n          description: 'Variables for template rendering. Keys are variable positions (1, 2, 3...).',\n          additionalProperties: true\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      channel: {
        $ref: '#/$defs/channel',
      },
      cursor: {
        type: 'string',
      },
      limit: {
        type: 'integer',
      },
      status: {
        $ref: '#/$defs/message_status',
      },
      to: {
        type: 'string',
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
      channel: {
        type: 'string',
        description: "Delivery channel. Use 'auto' for intelligent routing.",
        enum: ['auto', 'sms', 'whatsapp', 'email'],
      },
      message_status: {
        type: 'string',
        enum: ['queued', 'sending', 'delivered', 'failed', 'received'],
      },
    },
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Zavudev, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  const response = await client.messages.list(body).asResponse();
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
