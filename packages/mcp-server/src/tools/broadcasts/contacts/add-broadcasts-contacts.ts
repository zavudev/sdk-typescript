// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@zavudev/sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@zavudev/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Zavudev from '@zavudev/sdk';

export const metadata: Metadata = {
  resource: 'broadcasts.contacts',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/broadcasts/{broadcastId}/contacts',
  operationId: 'addBroadcastContacts',
};

export const tool: Tool = {
  name: 'add_broadcasts_contacts',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nAdd contacts to a broadcast in batch. Maximum 1000 contacts per request.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/contact_add_response',\n  $defs: {\n    contact_add_response: {\n      type: 'object',\n      properties: {\n        added: {\n          type: 'integer',\n          description: 'Number of contacts successfully added.'\n        },\n        duplicates: {\n          type: 'integer',\n          description: 'Number of duplicate contacts skipped.'\n        },\n        invalid: {\n          type: 'integer',\n          description: 'Number of invalid contacts rejected.'\n        },\n        errors: {\n          type: 'array',\n          description: 'Details about invalid contacts.',\n          items: {\n            type: 'object',\n            properties: {\n              reason: {\n                type: 'string'\n              },\n              recipient: {\n                type: 'string'\n              }\n            }\n          }\n        }\n      },\n      required: [        'added',\n        'duplicates',\n        'invalid'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      broadcastId: {
        type: 'string',
      },
      contacts: {
        type: 'array',
        description: 'List of contacts to add (max 1000 per request).',
        items: {
          type: 'object',
          properties: {
            recipient: {
              type: 'string',
              description: 'Phone number (E.164) or email address.',
            },
            templateVariables: {
              type: 'object',
              description: 'Per-contact template variables to personalize the message.',
              additionalProperties: true,
            },
          },
          required: ['recipient'],
        },
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['broadcastId', 'contacts'],
  },
  annotations: {},
};

export const handler = async (client: Zavudev, args: Record<string, unknown> | undefined) => {
  const { broadcastId, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(
      await maybeFilter(jq_filter, await client.broadcasts.contacts.add(broadcastId, body)),
    );
  } catch (error) {
    if (error instanceof Zavudev.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
