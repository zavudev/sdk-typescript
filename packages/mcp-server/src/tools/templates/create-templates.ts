// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@zavudev/sdk-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@zavudev/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Zavudev from '@zavudev/sdk';

export const metadata: Metadata = {
  resource: 'templates',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/templates',
  operationId: 'createTemplate',
};

export const tool: Tool = {
  name: 'create_templates',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreate a WhatsApp message template. Note: Templates must be approved by Meta before use.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/template',\n  $defs: {\n    template: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        body: {\n          type: 'string',\n          description: 'Template body with variables: {{1}}, {{2}}, etc.'\n        },\n        category: {\n          $ref: '#/$defs/whatsapp_category'\n        },\n        language: {\n          type: 'string',\n          description: 'Language code.'\n        },\n        name: {\n          type: 'string',\n          description: 'Template name (must match WhatsApp template name).'\n        },\n        buttons: {\n          type: 'array',\n          description: 'Template buttons.',\n          items: {\n            type: 'object',\n            properties: {\n              phoneNumber: {\n                type: 'string'\n              },\n              text: {\n                type: 'string'\n              },\n              type: {\n                type: 'string'\n              },\n              url: {\n                type: 'string'\n              }\n            }\n          }\n        },\n        createdAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        footer: {\n          type: 'string',\n          description: 'Footer text for the template.'\n        },\n        headerContent: {\n          type: 'string',\n          description: 'Header content (text or media URL).'\n        },\n        headerType: {\n          type: 'string',\n          description: 'Type of header (text, image, video, document).'\n        },\n        status: {\n          type: 'string',\n          enum: [            'draft',\n            'pending',\n            'approved',\n            'rejected'\n          ]\n        },\n        updatedAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        variables: {\n          type: 'array',\n          description: 'List of variable names for documentation.',\n          items: {\n            type: 'string'\n          }\n        },\n        whatsapp: {\n          type: 'object',\n          description: 'WhatsApp-specific template information.',\n          properties: {\n            namespace: {\n              type: 'string',\n              description: 'WhatsApp Business Account namespace.'\n            },\n            status: {\n              type: 'string',\n              description: 'WhatsApp approval status.'\n            },\n            templateName: {\n              type: 'string',\n              description: 'WhatsApp template name.'\n            }\n          }\n        }\n      },\n      required: [        'id',\n        'body',\n        'category',\n        'language',\n        'name'\n      ]\n    },\n    whatsapp_category: {\n      type: 'string',\n      description: 'WhatsApp template category.',\n      enum: [        'UTILITY',\n        'MARKETING',\n        'AUTHENTICATION'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      body: {
        type: 'string',
      },
      language: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      variables: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      whatsappCategory: {
        $ref: '#/$defs/whatsapp_category',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['body', 'language', 'name'],
    $defs: {
      whatsapp_category: {
        type: 'string',
        description: 'WhatsApp template category.',
        enum: ['UTILITY', 'MARKETING', 'AUTHENTICATION'],
      },
    },
  },
  annotations: {},
};

export const handler = async (client: Zavudev, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.templates.create(body)));
  } catch (error) {
    if (error instanceof Zavudev.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
