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
  httpPath: '/v1/senders/{senderId}/profile',
  operationId: 'getSenderProfile',
};

export const tool: Tool = {
  name: 'get_profile_senders',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet the WhatsApp Business profile for a sender. The sender must have a WhatsApp Business Account connected.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/whatsapp_business_profile_response',\n  $defs: {\n    whatsapp_business_profile_response: {\n      type: 'object',\n      properties: {\n        profile: {\n          $ref: '#/$defs/whatsapp_business_profile'\n        }\n      },\n      required: [        'profile'\n      ]\n    },\n    whatsapp_business_profile: {\n      type: 'object',\n      description: 'WhatsApp Business profile information.',\n      properties: {\n        about: {\n          type: 'string',\n          description: 'Short description of the business (max 139 characters).'\n        },\n        address: {\n          type: 'string',\n          description: 'Physical address of the business (max 256 characters).'\n        },\n        description: {\n          type: 'string',\n          description: 'Extended description of the business (max 512 characters).'\n        },\n        email: {\n          type: 'string',\n          description: 'Business email address.'\n        },\n        profilePictureUrl: {\n          type: 'string',\n          description: 'URL of the business profile picture.'\n        },\n        vertical: {\n          $ref: '#/$defs/whatsapp_business_profile_vertical'\n        },\n        websites: {\n          type: 'array',\n          description: 'Business website URLs (maximum 2).',\n          items: {\n            type: 'string'\n          }\n        }\n      }\n    },\n    whatsapp_business_profile_vertical: {\n      type: 'string',\n      description: 'Business category for WhatsApp Business profile.',\n      enum: [        'UNDEFINED',\n        'OTHER',\n        'AUTO',\n        'BEAUTY',\n        'APPAREL',\n        'EDU',\n        'ENTERTAIN',\n        'EVENT_PLAN',\n        'FINANCE',\n        'GROCERY',\n        'GOVT',\n        'HOTEL',\n        'HEALTH',\n        'NONPROFIT',\n        'PROF_SERVICES',\n        'RETAIL',\n        'TRAVEL',\n        'RESTAURANT',\n        'NOT_A_BIZ'\n      ]\n    }\n  }\n}\n```",
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
    return asTextContentResult(await maybeFilter(jq_filter, await client.senders.getProfile(senderId)));
  } catch (error) {
    if (error instanceof Zavudev.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
