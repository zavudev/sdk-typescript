// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@zavudev/sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@zavudev/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Zavudev from '@zavudev/sdk';

export const metadata: Metadata = {
  resource: 'senders',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/v1/senders/{senderId}',
  operationId: 'updateSender',
};

export const tool: Tool = {
  name: 'update_senders',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpdate sender\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/sender',\n  $defs: {\n    sender: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        name: {\n          type: 'string'\n        },\n        phoneNumber: {\n          type: 'string',\n          description: 'Phone number in E.164 format.'\n        },\n        createdAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        isDefault: {\n          type: 'boolean',\n          description: 'Whether this sender is the project\\'s default.'\n        },\n        updatedAt: {\n          type: 'string',\n          format: 'date-time'\n        }\n      },\n      required: [        'id',\n        'name',\n        'phoneNumber'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      senderId: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      setAsDefault: {
        type: 'boolean',
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
  annotations: {},
};

export const handler = async (client: Zavudev, args: Record<string, unknown> | undefined) => {
  const { senderId, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.senders.update(senderId, body)));
  } catch (error) {
    if (error instanceof Zavudev.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
