// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from '@zavudev/sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Zavudev from '@zavudev/sdk';

export const metadata: Metadata = {
  resource: 'messages',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/messages',
  operationId: 'sendMessage',
};

export const tool: Tool = {
  name: 'send_messages',
  description:
    'Send a message to a recipient via SMS or WhatsApp.\n\n**Channel selection:**\n- If `channel` is omitted and `messageType` is `text`, defaults to SMS\n- If `messageType` is anything other than `text`, WhatsApp is used automatically\n\n**WhatsApp 24-hour window:**\n- Free-form messages (non-template) require an open 24h window\n- Window opens when the user messages you first\n- Use template messages to initiate conversations outside the window',
  inputSchema: {
    type: 'object',
    properties: {
      to: {
        type: 'string',
        description: 'Recipient phone number in E.164 format or email address.',
      },
      channel: {
        $ref: '#/$defs/channel',
      },
      content: {
        $ref: '#/$defs/message_content',
      },
      htmlBody: {
        type: 'string',
        description:
          'HTML body for email messages. If provided, email will be sent as multipart with both text and HTML.',
      },
      idempotencyKey: {
        type: 'string',
        description: 'Optional idempotency key to avoid duplicate sends.',
      },
      messageType: {
        $ref: '#/$defs/message_type',
      },
      metadata: {
        type: 'object',
        description: 'Arbitrary metadata to associate with the message.',
        additionalProperties: true,
      },
      replyTo: {
        type: 'string',
        description: 'Reply-To email address for email messages.',
      },
      subject: {
        type: 'string',
        description: "Email subject line. Required when channel is 'email' or recipient is an email address.",
      },
      text: {
        type: 'string',
        description: 'Text body for text messages or caption for media messages.',
      },
      'Zavu-Sender': {
        type: 'string',
      },
    },
    required: ['to'],
    $defs: {
      channel: {
        type: 'string',
        description: "Delivery channel. Use 'auto' for intelligent routing.",
        enum: ['auto', 'sms', 'whatsapp', 'email'],
      },
      message_content: {
        type: 'object',
        description: 'Content for non-text message types (WhatsApp only).',
        properties: {
          buttons: {
            type: 'array',
            description: 'Interactive buttons (max 3).',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                },
                title: {
                  type: 'string',
                },
              },
              required: ['id', 'title'],
            },
          },
          contacts: {
            type: 'array',
            description: 'Contact cards for contact messages.',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
                phones: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
              },
            },
          },
          emoji: {
            type: 'string',
            description: 'Emoji for reaction messages.',
          },
          filename: {
            type: 'string',
            description: 'Filename for documents.',
          },
          latitude: {
            type: 'number',
            description: 'Latitude for location messages.',
          },
          listButton: {
            type: 'string',
            description: 'Button text for list messages.',
          },
          locationAddress: {
            type: 'string',
            description: 'Address of the location.',
          },
          locationName: {
            type: 'string',
            description: 'Name of the location.',
          },
          longitude: {
            type: 'number',
            description: 'Longitude for location messages.',
          },
          mediaId: {
            type: 'string',
            description: 'WhatsApp media ID if already uploaded.',
          },
          mediaUrl: {
            type: 'string',
            description: 'URL of the media file (for image, video, audio, document, sticker).',
          },
          mimeType: {
            type: 'string',
            description: 'MIME type of the media.',
          },
          reactToMessageId: {
            type: 'string',
            description: 'Message ID to react to.',
          },
          sections: {
            type: 'array',
            description: 'Sections for list messages.',
            items: {
              type: 'object',
              properties: {
                rows: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                      },
                      title: {
                        type: 'string',
                      },
                      description: {
                        type: 'string',
                      },
                    },
                    required: ['id', 'title'],
                  },
                },
                title: {
                  type: 'string',
                },
              },
              required: ['rows', 'title'],
            },
          },
          templateId: {
            type: 'string',
            description: 'Template ID for template messages.',
          },
          templateVariables: {
            type: 'object',
            description: 'Variables for template rendering. Keys are variable positions (1, 2, 3...).',
            additionalProperties: true,
          },
        },
      },
      message_type: {
        type: 'string',
        description: 'Type of message. Non-text types are WhatsApp only.',
        enum: [
          'text',
          'image',
          'video',
          'audio',
          'document',
          'sticker',
          'location',
          'contact',
          'buttons',
          'list',
          'reaction',
          'template',
        ],
      },
    },
  },
  annotations: {},
};

export const handler = async (client: Zavudev, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  try {
    return asTextContentResult(await client.messages.send(body));
  } catch (error) {
    if (error instanceof Zavudev.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
