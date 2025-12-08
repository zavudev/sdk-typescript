// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@zavudev/sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@zavudev/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Zavudev from '@zavudev/sdk';

export const metadata: Metadata = {
  resource: 'phone_numbers',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/phone-numbers/available',
  operationId: 'searchAvailablePhoneNumbers',
};

export const tool: Tool = {
  name: 'search_available_phone_numbers',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nSearch for available phone numbers to purchase by country and type.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/phone_number_search_available_response',\n  $defs: {\n    phone_number_search_available_response: {\n      type: 'object',\n      properties: {\n        items: {\n          type: 'array',\n          items: {\n            $ref: '#/$defs/available_phone_number'\n          }\n        }\n      },\n      required: [        'items'\n      ]\n    },\n    available_phone_number: {\n      type: 'object',\n      properties: {\n        capabilities: {\n          $ref: '#/$defs/phone_number_capabilities'\n        },\n        phoneNumber: {\n          type: 'string'\n        },\n        pricing: {\n          $ref: '#/$defs/phone_number_pricing'\n        },\n        friendlyName: {\n          type: 'string'\n        },\n        locality: {\n          type: 'string'\n        },\n        region: {\n          type: 'string'\n        }\n      },\n      required: [        'capabilities',\n        'phoneNumber',\n        'pricing'\n      ]\n    },\n    phone_number_capabilities: {\n      type: 'object',\n      properties: {\n        mms: {\n          type: 'boolean'\n        },\n        sms: {\n          type: 'boolean'\n        },\n        voice: {\n          type: 'boolean'\n        }\n      }\n    },\n    phone_number_pricing: {\n      type: 'object',\n      properties: {\n        isFreeEligible: {\n          type: 'boolean',\n          description: 'Whether this number qualifies for the free first US number offer.'\n        },\n        monthlyPrice: {\n          type: 'number',\n          description: 'Monthly price in USD.'\n        },\n        upfrontPrice: {\n          type: 'number',\n          description: 'One-time purchase price in USD.'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      countryCode: {
        type: 'string',
        description: 'Two-letter ISO country code.',
      },
      contains: {
        type: 'string',
        description: 'Search for numbers containing this string.',
      },
      limit: {
        type: 'integer',
        description: 'Maximum number of results to return.',
      },
      type: {
        $ref: '#/$defs/phone_number_type',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['countryCode'],
    $defs: {
      phone_number_type: {
        type: 'string',
        enum: ['local', 'mobile', 'tollFree'],
      },
    },
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Zavudev, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.phoneNumbers.searchAvailable(body)));
  } catch (error) {
    if (error instanceof Zavudev.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
