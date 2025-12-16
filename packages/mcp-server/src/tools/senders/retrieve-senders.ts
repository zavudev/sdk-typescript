// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@zavudev/sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@zavudev/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Zavudev from '@zavudev/sdk';

export const metadata: Metadata = {
  resource: 'senders',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/senders/{senderId}',
  operationId: 'getSender',
};

export const tool: Tool = {
  name: 'retrieve_senders',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet sender\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/sender',\n  $defs: {\n    sender: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        name: {\n          type: 'string'\n        },\n        phoneNumber: {\n          type: 'string',\n          description: 'Phone number in E.164 format.'\n        },\n        createdAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        isDefault: {\n          type: 'boolean',\n          description: 'Whether this sender is the project\\'s default.'\n        },\n        updatedAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        webhook: {\n          $ref: '#/$defs/sender_webhook'\n        }\n      },\n      required: [        'id',\n        'name',\n        'phoneNumber'\n      ]\n    },\n    sender_webhook: {\n      type: 'object',\n      description: 'Webhook configuration for the sender.',\n      properties: {\n        active: {\n          type: 'boolean',\n          description: 'Whether the webhook is active.'\n        },\n        events: {\n          type: 'array',\n          description: 'List of events the webhook is subscribed to.',\n          items: {\n            $ref: '#/$defs/webhook_event'\n          }\n        },\n        url: {\n          type: 'string',\n          description: 'HTTPS URL that will receive webhook events.'\n        },\n        secret: {\n          type: 'string',\n          description: 'Webhook secret for signature verification. Only returned on create or regenerate.'\n        }\n      },\n      required: [        'active',\n        'events',\n        'url'\n      ]\n    },\n    webhook_event: {\n      type: 'string',\n      description: 'Type of event that triggers the webhook.',\n      enum: [        'message.queued',\n        'message.sent',\n        'message.delivered',\n        'message.failed',\n        'message.inbound',\n        'message.unsupported',\n        'message.reaction',\n        'conversation.new',\n        'template.status_changed'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      senderId: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['senderId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Zavudev, args: Record<string, unknown> | undefined) => {
  const { senderId, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.senders.retrieve(senderId)));
  } catch (error) {
    if (error instanceof Zavudev.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
