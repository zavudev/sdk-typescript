// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@zavudev/sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@zavudev/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Zavudev from '@zavudev/sdk';

export const metadata: Metadata = {
  resource: 'phone_numbers',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/v1/phone-numbers/{phoneNumberId}',
  operationId: 'updatePhoneNumber',
};

export const tool: Tool = {
  name: 'update_phone_numbers',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpdate a phone number's name or sender assignment.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/phone_number_update_response',\n  $defs: {\n    phone_number_update_response: {\n      type: 'object',\n      properties: {\n        phoneNumber: {\n          $ref: '#/$defs/owned_phone_number'\n        }\n      },\n      required: [        'phoneNumber'\n      ]\n    },\n    owned_phone_number: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        capabilities: {\n          type: 'array',\n          items: {\n            type: 'string'\n          }\n        },\n        createdAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        phoneNumber: {\n          type: 'string'\n        },\n        pricing: {\n          $ref: '#/$defs/owned_phone_number_pricing'\n        },\n        status: {\n          $ref: '#/$defs/phone_number_status'\n        },\n        name: {\n          type: 'string',\n          description: 'Optional custom name for the phone number.'\n        },\n        nextRenewalDate: {\n          type: 'string',\n          format: 'date-time'\n        },\n        senderId: {\n          type: 'string',\n          description: 'Sender ID if the phone number is assigned to a sender.'\n        },\n        updatedAt: {\n          type: 'string',\n          format: 'date-time'\n        }\n      },\n      required: [        'id',\n        'capabilities',\n        'createdAt',\n        'phoneNumber',\n        'pricing',\n        'status'\n      ]\n    },\n    owned_phone_number_pricing: {\n      type: 'object',\n      properties: {\n        isFreeNumber: {\n          type: 'boolean',\n          description: 'Whether this is a free number.'\n        },\n        monthlyCost: {\n          type: 'number',\n          description: 'Monthly cost in cents.'\n        },\n        monthlyPrice: {\n          type: 'number',\n          description: 'Monthly price in USD.'\n        },\n        upfrontCost: {\n          type: 'number',\n          description: 'One-time purchase cost in cents.'\n        }\n      }\n    },\n    phone_number_status: {\n      type: 'string',\n      enum: [        'active',\n        'suspended',\n        'pending'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      phoneNumberId: {
        type: 'string',
      },
      name: {
        type: 'string',
        description: 'Custom name for the phone number. Set to null to clear.',
      },
      senderId: {
        type: 'string',
        description: 'Sender ID to assign the phone number to. Set to null to unassign.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['phoneNumberId'],
  },
  annotations: {},
};

export const handler = async (client: Zavudev, args: Record<string, unknown> | undefined) => {
  const { phoneNumberId, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(
      await maybeFilter(jq_filter, await client.phoneNumbers.update(phoneNumberId, body)),
    );
  } catch (error) {
    if (error instanceof Zavudev.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
