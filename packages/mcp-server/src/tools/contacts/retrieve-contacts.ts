// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@zavudev/sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@zavudev/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Zavudev from '@zavudev/sdk';

export const metadata: Metadata = {
  resource: 'contacts',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/contacts/{contactId}',
  operationId: 'getContact',
};

export const tool: Tool = {
  name: 'retrieve_contacts',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet contact\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/contact',\n  $defs: {\n    contact: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        phoneNumber: {\n          type: 'string',\n          description: 'E.164 phone number.'\n        },\n        availableChannels: {\n          type: 'array',\n          description: 'List of available messaging channels for this contact.',\n          items: {\n            type: 'string'\n          }\n        },\n        countryCode: {\n          type: 'string'\n        },\n        createdAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        defaultChannel: {\n          type: 'string',\n          description: 'Preferred channel for this contact.',\n          enum: [            'sms',\n            'whatsapp',\n            'email'\n          ]\n        },\n        metadata: {\n          type: 'object',\n          additionalProperties: true\n        },\n        updatedAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        verified: {\n          type: 'boolean',\n          description: 'Whether this contact has been verified.'\n        }\n      },\n      required: [        'id',\n        'phoneNumber'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      contactId: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['contactId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Zavudev, args: Record<string, unknown> | undefined) => {
  const { contactId, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.contacts.retrieve(contactId)));
  } catch (error) {
    if (error instanceof Zavudev.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
