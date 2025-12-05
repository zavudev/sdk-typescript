// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@zavudev/sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@zavudev/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Zavudev from '@zavudev/sdk';

export const metadata: Metadata = {
  resource: 'introspect',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/introspect/phone',
  operationId: 'introspectPhone',
};

export const tool: Tool = {
  name: 'validate_phone_introspect',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nValidate a phone number and check if a WhatsApp conversation window is open.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/introspect_validate_phone_response',\n  $defs: {\n    introspect_validate_phone_response: {\n      type: 'object',\n      properties: {\n        countryCode: {\n          type: 'string'\n        },\n        phoneNumber: {\n          type: 'string'\n        },\n        validNumber: {\n          type: 'boolean'\n        },\n        availableChannels: {\n          type: 'array',\n          description: 'List of available messaging channels for this phone number.',\n          items: {\n            type: 'string'\n          }\n        },\n        carrier: {\n          type: 'object',\n          description: 'Carrier information for the phone number.',\n          properties: {\n            name: {\n              type: 'string',\n              description: 'Carrier name.'\n            },\n            type: {\n              $ref: '#/$defs/line_type'\n            }\n          }\n        },\n        lineType: {\n          $ref: '#/$defs/line_type'\n        },\n        nationalFormat: {\n          type: 'string',\n          description: 'Phone number in national format.'\n        }\n      },\n      required: [        'countryCode',\n        'phoneNumber',\n        'validNumber'\n      ]\n    },\n    line_type: {\n      type: 'string',\n      description: 'Type of phone line.',\n      enum: [        'mobile',\n        'landline',\n        'voip',\n        'toll_free',\n        'unknown'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      phoneNumber: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['phoneNumber'],
  },
  annotations: {},
};

export const handler = async (client: Zavudev, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.introspect.validatePhone(body)));
  } catch (error) {
    if (error instanceof Zavudev.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
