// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'send',
    endpoint: '/v1/messages',
    httpMethod: 'post',
    summary: 'Send a message',
    description:
      'Send a message to a recipient via SMS or WhatsApp.\n\n**Channel selection:**\n- If `channel` is omitted and `messageType` is `text`, defaults to SMS\n- If `messageType` is anything other than `text`, WhatsApp is used automatically\n\n**WhatsApp 24-hour window:**\n- Free-form messages (non-template) require an open 24h window\n- Window opens when the user messages you first\n- Use template messages to initiate conversations outside the window\n\n**Daily limits:**\n- Unverified accounts: 200 messages per channel per day\n- Complete KYC verification to increase limits to 10,000/day',
    stainlessPath: '(resource) messages > (method) send',
    qualified: 'client.messages.send',
    params: [
      'to: string;',
      'attachments?: { filename: string; content?: string; content_id?: string; content_type?: string; path?: string; }[];',
      "channel?: 'auto' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice';",
      'content?: { buttons?: { id: string; title: string; }[]; contacts?: { name?: string; phones?: string[]; }[]; emoji?: string; filename?: string; latitude?: number; listButton?: string; locationAddress?: string; locationName?: string; longitude?: number; mediaId?: string; mediaUrl?: string; mimeType?: string; reactToMessageId?: string; sections?: { rows: { id: string; title: string; description?: string; }[]; title: string; }[]; templateId?: string; templateVariables?: object; };',
      'fallbackEnabled?: boolean;',
      'htmlBody?: string;',
      'idempotencyKey?: string;',
      'messageType?: string;',
      'metadata?: object;',
      'replyTo?: string;',
      'subject?: string;',
      'text?: string;',
      'voiceLanguage?: string;',
      'Zavu-Sender?: string;',
    ],
    response:
      '{ message: { id: string; channel: channel; createdAt: string; messageType: message_type; status: message_status; to: string; content?: message_content; cost?: number; costProvider?: number; costTotal?: number; errorCode?: string; errorMessage?: string; from?: string; metadata?: object; providerMessageId?: string; senderId?: string; text?: string; updatedAt?: string; }; }',
    markdown:
      "## send\n\n`client.messages.send(to: string, attachments?: { filename: string; content?: string; content_id?: string; content_type?: string; path?: string; }[], channel?: 'auto' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice', content?: { buttons?: object[]; contacts?: object[]; emoji?: string; filename?: string; latitude?: number; listButton?: string; locationAddress?: string; locationName?: string; longitude?: number; mediaId?: string; mediaUrl?: string; mimeType?: string; reactToMessageId?: string; sections?: object[]; templateId?: string; templateVariables?: object; }, fallbackEnabled?: boolean, htmlBody?: string, idempotencyKey?: string, messageType?: string, metadata?: object, replyTo?: string, subject?: string, text?: string, voiceLanguage?: string, Zavu-Sender?: string): { message: message; }`\n\n**post** `/v1/messages`\n\nSend a message to a recipient via SMS or WhatsApp.\n\n**Channel selection:**\n- If `channel` is omitted and `messageType` is `text`, defaults to SMS\n- If `messageType` is anything other than `text`, WhatsApp is used automatically\n\n**WhatsApp 24-hour window:**\n- Free-form messages (non-template) require an open 24h window\n- Window opens when the user messages you first\n- Use template messages to initiate conversations outside the window\n\n**Daily limits:**\n- Unverified accounts: 200 messages per channel per day\n- Complete KYC verification to increase limits to 10,000/day\n\n### Parameters\n\n- `to: string`\n  Recipient phone number in E.164 format, email address, or numeric chat ID (for Telegram/Instagram).\n\n- `attachments?: { filename: string; content?: string; content_id?: string; content_type?: string; path?: string; }[]`\n  Email attachments. Only supported when channel is 'email'. Maximum 40MB total size.\n\n- `channel?: 'auto' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'`\n  Delivery channel. Use 'auto' for intelligent routing. If omitted, channel is auto-selected based on sender capabilities and recipient type. For email recipients, defaults to 'email'.\n\n- `content?: { buttons?: { id: string; title: string; }[]; contacts?: { name?: string; phones?: string[]; }[]; emoji?: string; filename?: string; latitude?: number; listButton?: string; locationAddress?: string; locationName?: string; longitude?: number; mediaId?: string; mediaUrl?: string; mimeType?: string; reactToMessageId?: string; sections?: { rows: { id: string; title: string; description?: string; }[]; title: string; }[]; templateId?: string; templateVariables?: object; }`\n  Additional content for non-text message types.\n  - `buttons?: { id: string; title: string; }[]`\n    Interactive buttons (max 3).\n  - `contacts?: { name?: string; phones?: string[]; }[]`\n    Contact cards for contact messages.\n  - `emoji?: string`\n    Emoji for reaction messages.\n  - `filename?: string`\n    Filename for documents.\n  - `latitude?: number`\n    Latitude for location messages.\n  - `listButton?: string`\n    Button text for list messages.\n  - `locationAddress?: string`\n    Address of the location.\n  - `locationName?: string`\n    Name of the location.\n  - `longitude?: number`\n    Longitude for location messages.\n  - `mediaId?: string`\n    WhatsApp media ID if already uploaded.\n  - `mediaUrl?: string`\n    URL of the media file (for image, video, audio, document, sticker).\n  - `mimeType?: string`\n    MIME type of the media.\n  - `reactToMessageId?: string`\n    Message ID to react to.\n  - `sections?: { rows: { id: string; title: string; description?: string; }[]; title: string; }[]`\n    Sections for list messages.\n  - `templateId?: string`\n    Template ID for template messages.\n  - `templateVariables?: object`\n    Variables for template rendering. Keys are variable positions (1, 2, 3...).\n\n- `fallbackEnabled?: boolean`\n  Whether to enable automatic fallback to SMS if WhatsApp fails. Defaults to true.\n\n- `htmlBody?: string`\n  HTML body for email messages. If provided, email will be sent as multipart with both text and HTML.\n\n- `idempotencyKey?: string`\n  Optional idempotency key to avoid duplicate sends.\n\n- `messageType?: string`\n  Type of message. Defaults to 'text'.\n\n- `metadata?: object`\n  Arbitrary metadata to associate with the message.\n\n- `replyTo?: string`\n  Reply-To email address for email messages.\n\n- `subject?: string`\n  Email subject line. Required when channel is 'email' or recipient is an email address.\n\n- `text?: string`\n  Text body for text messages or caption for media messages.\n\n- `voiceLanguage?: string`\n  Language code for voice text-to-speech (e.g., 'en-US', 'es-ES', 'pt-BR'). If omitted, language is auto-detected from recipient's country code.\n\n- `Zavu-Sender?: string`\n\n### Returns\n\n- `{ message: { id: string; channel: channel; createdAt: string; messageType: message_type; status: message_status; to: string; content?: message_content; cost?: number; costProvider?: number; costTotal?: number; errorCode?: string; errorMessage?: string; from?: string; metadata?: object; providerMessageId?: string; senderId?: string; text?: string; updatedAt?: string; }; }`\n\n  - `message: { id: string; channel: 'auto' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; createdAt: string; messageType: string; status: string; to: string; content?: { buttons?: object[]; contacts?: object[]; emoji?: string; filename?: string; latitude?: number; listButton?: string; locationAddress?: string; locationName?: string; longitude?: number; mediaId?: string; mediaUrl?: string; mimeType?: string; reactToMessageId?: string; sections?: object[]; templateId?: string; templateVariables?: object; }; cost?: number; costProvider?: number; costTotal?: number; errorCode?: string; errorMessage?: string; from?: string; metadata?: object; providerMessageId?: string; senderId?: string; text?: string; updatedAt?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst messageResponse = await client.messages.send({ to: '+56912345678' });\n\nconsole.log(messageResponse);\n```",
    perLanguage: {
      cli: {
        method: 'messages send',
        example: "zavudev messages send \\\n  --api-key 'My API Key' \\\n  --to +56912345678",
      },
      go: {
        method: 'client.Messages.Send',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmessageResponse, err := client.Messages.Send(context.TODO(), zavudev.MessageSendParams{\n\t\tTo:   "+56912345678",\n\t\tText: zavudev.String("Your verification code is 123456"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", messageResponse.Message)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/messages \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY" \\\n    -d \'{\n          "to": "+56912345678",\n          "idempotencyKey": "msg_01HZY4ZP7VQY2J3BRW7Z6G0QGE",\n          "replyTo": "support@example.com",\n          "subject": "Your order confirmation",\n          "text": "Your verification code is 123456",\n          "voiceLanguage": "es-ES"\n        }\'',
      },
      php: {
        method: 'messages->send',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$messageResponse = $client->messages->send(\n  to: '+56912345678',\n  attachments: [\n    [\n      'filename' => 'invoice.pdf',\n      'content' => 'content',\n      'contentID' => 'logo',\n      'contentType' => 'application/pdf',\n      'path' => 'https://example.com',\n    ],\n  ],\n  channel: Channel::AUTO,\n  content: [\n    'buttons' => [['id' => 'id', 'title' => 'title']],\n    'contacts' => [['name' => 'name', 'phones' => ['string']]],\n    'emoji' => 'emoji',\n    'filename' => 'invoice.pdf',\n    'latitude' => 0,\n    'listButton' => 'listButton',\n    'locationAddress' => 'locationAddress',\n    'locationName' => 'locationName',\n    'longitude' => 0,\n    'mediaID' => 'mediaId',\n    'mediaURL' => 'https://example.com/image.jpg',\n    'mimeType' => 'image/jpeg',\n    'reactToMessageID' => 'reactToMessageId',\n    'sections' => [\n      [\n        'rows' => [\n          ['id' => 'id', 'title' => 'title', 'description' => 'description']\n        ],\n        'title' => 'title',\n      ],\n    ],\n    'templateID' => 'templateId',\n    'templateVariables' => ['1' => 'John', '2' => 'ORD-12345'],\n  ],\n  fallbackEnabled: true,\n  htmlBody: 'htmlBody',\n  idempotencyKey: 'msg_01HZY4ZP7VQY2J3BRW7Z6G0QGE',\n  messageType: MessageType::TEXT,\n  metadata: ['foo' => 'string'],\n  replyTo: 'support@example.com',\n  subject: 'Your order confirmation',\n  text: 'Your verification code is 123456',\n  voiceLanguage: 'es-ES',\n  zavuSender: 'sender_12345',\n);\n\nvar_dump($messageResponse);",
      },
      python: {
        method: 'messages.send',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nmessage_response = client.messages.send(\n    to="+56912345678",\n    text="Your verification code is 123456",\n)\nprint(message_response.message)',
      },
      ruby: {
        method: 'messages.send_',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nmessage_response = zavudev.messages.send_(to: "+56912345678")\n\nputs(message_response)',
      },
      typescript: {
        method: 'client.messages.send',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst messageResponse = await client.messages.send({\n  to: '+56912345678',\n  text: 'Your verification code is 123456',\n});\n\nconsole.log(messageResponse.message);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/messages',
    httpMethod: 'get',
    summary: 'List messages',
    description: 'List messages previously sent by this project.',
    stainlessPath: '(resource) messages > (method) list',
    qualified: 'client.messages.list',
    params: [
      "channel?: 'auto' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice';",
      'cursor?: string;',
      'limit?: number;',
      'status?: string;',
      'to?: string;',
    ],
    response:
      "{ id: string; channel: 'auto' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; createdAt: string; messageType: string; status: string; to: string; content?: { buttons?: object[]; contacts?: object[]; emoji?: string; filename?: string; latitude?: number; listButton?: string; locationAddress?: string; locationName?: string; longitude?: number; mediaId?: string; mediaUrl?: string; mimeType?: string; reactToMessageId?: string; sections?: object[]; templateId?: string; templateVariables?: object; }; cost?: number; costProvider?: number; costTotal?: number; errorCode?: string; errorMessage?: string; from?: string; metadata?: object; providerMessageId?: string; senderId?: string; text?: string; updatedAt?: string; }",
    markdown:
      "## list\n\n`client.messages.list(channel?: 'auto' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice', cursor?: string, limit?: number, status?: string, to?: string): { id: string; channel: channel; createdAt: string; messageType: message_type; status: message_status; to: string; content?: message_content; cost?: number; costProvider?: number; costTotal?: number; errorCode?: string; errorMessage?: string; from?: string; metadata?: object; providerMessageId?: string; senderId?: string; text?: string; updatedAt?: string; }`\n\n**get** `/v1/messages`\n\nList messages previously sent by this project.\n\n### Parameters\n\n- `channel?: 'auto' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'`\n  Delivery channel. Use 'auto' for intelligent routing.\n\n- `cursor?: string`\n\n- `limit?: number`\n\n- `status?: string`\n\n- `to?: string`\n\n### Returns\n\n- `{ id: string; channel: 'auto' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; createdAt: string; messageType: string; status: string; to: string; content?: { buttons?: object[]; contacts?: object[]; emoji?: string; filename?: string; latitude?: number; listButton?: string; locationAddress?: string; locationName?: string; longitude?: number; mediaId?: string; mediaUrl?: string; mimeType?: string; reactToMessageId?: string; sections?: object[]; templateId?: string; templateVariables?: object; }; cost?: number; costProvider?: number; costTotal?: number; errorCode?: string; errorMessage?: string; from?: string; metadata?: object; providerMessageId?: string; senderId?: string; text?: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `channel: 'auto' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'`\n  - `createdAt: string`\n  - `messageType: string`\n  - `status: string`\n  - `to: string`\n  - `content?: { buttons?: { id: string; title: string; }[]; contacts?: { name?: string; phones?: string[]; }[]; emoji?: string; filename?: string; latitude?: number; listButton?: string; locationAddress?: string; locationName?: string; longitude?: number; mediaId?: string; mediaUrl?: string; mimeType?: string; reactToMessageId?: string; sections?: { rows: { id: string; title: string; description?: string; }[]; title: string; }[]; templateId?: string; templateVariables?: object; }`\n  - `cost?: number`\n  - `costProvider?: number`\n  - `costTotal?: number`\n  - `errorCode?: string`\n  - `errorMessage?: string`\n  - `from?: string`\n  - `metadata?: object`\n  - `providerMessageId?: string`\n  - `senderId?: string`\n  - `text?: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\n// Automatically fetches more pages as needed.\nfor await (const message of client.messages.list()) {\n  console.log(message);\n}\n```",
    perLanguage: {
      cli: {
        method: 'messages list',
        example: "zavudev messages list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Messages.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Messages.List(context.TODO(), zavudev.MessageListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.zavu.dev/v1/messages \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'messages->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->messages->list(\n  channel: Channel::AUTO,\n  cursor: 'cursor',\n  limit: 100,\n  status: MessageStatus::QUEUED,\n  to: 'to',\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'messages.list',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\npage = client.messages.list()\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'messages.list',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\npage = zavudev.messages.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.messages.list',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const message of client.messages.list()) {\n  console.log(message.id);\n}",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/messages/{messageId}',
    httpMethod: 'get',
    summary: 'Get message by ID',
    description: 'Get message by ID',
    stainlessPath: '(resource) messages > (method) retrieve',
    qualified: 'client.messages.retrieve',
    params: ['messageId: string;'],
    response:
      '{ message: { id: string; channel: channel; createdAt: string; messageType: message_type; status: message_status; to: string; content?: message_content; cost?: number; costProvider?: number; costTotal?: number; errorCode?: string; errorMessage?: string; from?: string; metadata?: object; providerMessageId?: string; senderId?: string; text?: string; updatedAt?: string; }; }',
    markdown:
      "## retrieve\n\n`client.messages.retrieve(messageId: string): { message: message; }`\n\n**get** `/v1/messages/{messageId}`\n\nGet message by ID\n\n### Parameters\n\n- `messageId: string`\n\n### Returns\n\n- `{ message: { id: string; channel: channel; createdAt: string; messageType: message_type; status: message_status; to: string; content?: message_content; cost?: number; costProvider?: number; costTotal?: number; errorCode?: string; errorMessage?: string; from?: string; metadata?: object; providerMessageId?: string; senderId?: string; text?: string; updatedAt?: string; }; }`\n\n  - `message: { id: string; channel: 'auto' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; createdAt: string; messageType: string; status: string; to: string; content?: { buttons?: object[]; contacts?: object[]; emoji?: string; filename?: string; latitude?: number; listButton?: string; locationAddress?: string; locationName?: string; longitude?: number; mediaId?: string; mediaUrl?: string; mimeType?: string; reactToMessageId?: string; sections?: object[]; templateId?: string; templateVariables?: object; }; cost?: number; costProvider?: number; costTotal?: number; errorCode?: string; errorMessage?: string; from?: string; metadata?: object; providerMessageId?: string; senderId?: string; text?: string; updatedAt?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst messageResponse = await client.messages.retrieve('messageId');\n\nconsole.log(messageResponse);\n```",
    perLanguage: {
      cli: {
        method: 'messages retrieve',
        example: "zavudev messages retrieve \\\n  --api-key 'My API Key' \\\n  --message-id messageId",
      },
      go: {
        method: 'client.Messages.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmessageResponse, err := client.Messages.Get(context.TODO(), "messageId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", messageResponse.Message)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/messages/$MESSAGE_ID \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'messages->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$messageResponse = $client->messages->retrieve('messageId');\n\nvar_dump($messageResponse);",
      },
      python: {
        method: 'messages.retrieve',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nmessage_response = client.messages.retrieve(\n    "messageId",\n)\nprint(message_response.message)',
      },
      ruby: {
        method: 'messages.retrieve',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nmessage_response = zavudev.messages.retrieve("messageId")\n\nputs(message_response)',
      },
      typescript: {
        method: 'client.messages.retrieve',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst messageResponse = await client.messages.retrieve('messageId');\n\nconsole.log(messageResponse.message);",
      },
    },
  },
  {
    name: 'react',
    endpoint: '/v1/messages/{messageId}/reactions',
    httpMethod: 'post',
    summary: 'Send reaction to message',
    description:
      'Send an emoji reaction to an existing WhatsApp message. Reactions are only supported for WhatsApp messages.',
    stainlessPath: '(resource) messages > (method) react',
    qualified: 'client.messages.react',
    params: ['messageId: string;', 'emoji: string;', 'Zavu-Sender?: string;'],
    response:
      '{ message: { id: string; channel: channel; createdAt: string; messageType: message_type; status: message_status; to: string; content?: message_content; cost?: number; costProvider?: number; costTotal?: number; errorCode?: string; errorMessage?: string; from?: string; metadata?: object; providerMessageId?: string; senderId?: string; text?: string; updatedAt?: string; }; }',
    markdown:
      "## react\n\n`client.messages.react(messageId: string, emoji: string, Zavu-Sender?: string): { message: message; }`\n\n**post** `/v1/messages/{messageId}/reactions`\n\nSend an emoji reaction to an existing WhatsApp message. Reactions are only supported for WhatsApp messages.\n\n### Parameters\n\n- `messageId: string`\n\n- `emoji: string`\n  Single emoji character to react with.\n\n- `Zavu-Sender?: string`\n\n### Returns\n\n- `{ message: { id: string; channel: channel; createdAt: string; messageType: message_type; status: message_status; to: string; content?: message_content; cost?: number; costProvider?: number; costTotal?: number; errorCode?: string; errorMessage?: string; from?: string; metadata?: object; providerMessageId?: string; senderId?: string; text?: string; updatedAt?: string; }; }`\n\n  - `message: { id: string; channel: 'auto' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; createdAt: string; messageType: string; status: string; to: string; content?: { buttons?: object[]; contacts?: object[]; emoji?: string; filename?: string; latitude?: number; listButton?: string; locationAddress?: string; locationName?: string; longitude?: number; mediaId?: string; mediaUrl?: string; mimeType?: string; reactToMessageId?: string; sections?: object[]; templateId?: string; templateVariables?: object; }; cost?: number; costProvider?: number; costTotal?: number; errorCode?: string; errorMessage?: string; from?: string; metadata?: object; providerMessageId?: string; senderId?: string; text?: string; updatedAt?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst messageResponse = await client.messages.react('messageId', { emoji: '👍' });\n\nconsole.log(messageResponse);\n```",
    perLanguage: {
      cli: {
        method: 'messages react',
        example:
          "zavudev messages react \\\n  --api-key 'My API Key' \\\n  --message-id messageId \\\n  --emoji '👍'",
      },
      go: {
        method: 'client.Messages.React',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmessageResponse, err := client.Messages.React(\n\t\tcontext.TODO(),\n\t\t"messageId",\n\t\tzavudev.MessageReactParams{\n\t\t\tEmoji: "👍",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", messageResponse.Message)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/messages/$MESSAGE_ID/reactions \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY" \\\n    -d \'{\n          "emoji": "👍"\n        }\'',
      },
      php: {
        method: 'messages->react',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$messageResponse = $client->messages->react(\n  'messageId', emoji: '👍', zavuSender: 'sender_12345'\n);\n\nvar_dump($messageResponse);",
      },
      python: {
        method: 'messages.react',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nmessage_response = client.messages.react(\n    message_id="messageId",\n    emoji="👍",\n)\nprint(message_response.message)',
      },
      ruby: {
        method: 'messages.react',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nmessage_response = zavudev.messages.react("messageId", emoji: "👍")\n\nputs(message_response)',
      },
      typescript: {
        method: 'client.messages.react',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst messageResponse = await client.messages.react('messageId', { emoji: '👍' });\n\nconsole.log(messageResponse.message);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/templates',
    httpMethod: 'get',
    summary: 'List templates',
    description: 'List WhatsApp message templates for this project.',
    stainlessPath: '(resource) templates > (method) list',
    qualified: 'client.templates.list',
    params: ['cursor?: string;', 'limit?: number;'],
    response:
      "{ id: string; body: string; category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; instagramBody?: string; smsBody?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; telegramBody?: string; updatedAt?: string; variables?: string[]; whatsapp?: { namespace?: string; status?: string; templateName?: string; }; }",
    markdown:
      "## list\n\n`client.templates.list(cursor?: string, limit?: number): { id: string; body: string; category: whatsapp_category; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: object[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; instagramBody?: string; smsBody?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; telegramBody?: string; updatedAt?: string; variables?: string[]; whatsapp?: object; }`\n\n**get** `/v1/templates`\n\nList WhatsApp message templates for this project.\n\n### Parameters\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ id: string; body: string; category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; instagramBody?: string; smsBody?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; telegramBody?: string; updatedAt?: string; variables?: string[]; whatsapp?: { namespace?: string; status?: string; templateName?: string; }; }`\n\n  - `id: string`\n  - `body: string`\n  - `category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'`\n  - `language: string`\n  - `name: string`\n  - `addSecurityRecommendation?: boolean`\n  - `buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]`\n  - `codeExpirationMinutes?: number`\n  - `createdAt?: string`\n  - `footer?: string`\n  - `headerContent?: string`\n  - `headerType?: string`\n  - `instagramBody?: string`\n  - `smsBody?: string`\n  - `status?: 'draft' | 'pending' | 'approved' | 'rejected'`\n  - `telegramBody?: string`\n  - `updatedAt?: string`\n  - `variables?: string[]`\n  - `whatsapp?: { namespace?: string; status?: string; templateName?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\n// Automatically fetches more pages as needed.\nfor await (const template of client.templates.list()) {\n  console.log(template);\n}\n```",
    perLanguage: {
      cli: {
        method: 'templates list',
        example: "zavudev templates list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Templates.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Templates.List(context.TODO(), zavudev.TemplateListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.zavu.dev/v1/templates \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'templates->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->templates->list(cursor: 'cursor', limit: 100);\n\nvar_dump($page);",
      },
      python: {
        method: 'templates.list',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\npage = client.templates.list()\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'templates.list',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\npage = zavudev.templates.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.templates.list',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const template of client.templates.list()) {\n  console.log(template.id);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/templates',
    httpMethod: 'post',
    summary: 'Create template',
    description: 'Create a WhatsApp message template. Note: Templates must be approved by Meta before use.',
    stainlessPath: '(resource) templates > (method) create',
    qualified: 'client.templates.create',
    params: [
      'body: string;',
      'language: string;',
      'name: string;',
      'addSecurityRecommendation?: boolean;',
      "buttons?: { text: string; type: 'quick_reply' | 'url' | 'phone' | 'otp'; otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; url?: string; }[];",
      'codeExpirationMinutes?: number;',
      'footer?: string;',
      'headerContent?: string;',
      "headerType?: 'text' | 'image' | 'video' | 'document';",
      'instagramBody?: string;',
      'smsBody?: string;',
      'telegramBody?: string;',
      'variables?: string[];',
      "whatsappCategory?: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION';",
    ],
    response:
      "{ id: string; body: string; category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; instagramBody?: string; smsBody?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; telegramBody?: string; updatedAt?: string; variables?: string[]; whatsapp?: { namespace?: string; status?: string; templateName?: string; }; }",
    markdown:
      "## create\n\n`client.templates.create(body: string, language: string, name: string, addSecurityRecommendation?: boolean, buttons?: { text: string; type: 'quick_reply' | 'url' | 'phone' | 'otp'; otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; url?: string; }[], codeExpirationMinutes?: number, footer?: string, headerContent?: string, headerType?: 'text' | 'image' | 'video' | 'document', instagramBody?: string, smsBody?: string, telegramBody?: string, variables?: string[], whatsappCategory?: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'): { id: string; body: string; category: whatsapp_category; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: object[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; instagramBody?: string; smsBody?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; telegramBody?: string; updatedAt?: string; variables?: string[]; whatsapp?: object; }`\n\n**post** `/v1/templates`\n\nCreate a WhatsApp message template. Note: Templates must be approved by Meta before use.\n\n### Parameters\n\n- `body: string`\n  Default template body. Used when no channel-specific body is set.\n\n- `language: string`\n\n- `name: string`\n\n- `addSecurityRecommendation?: boolean`\n  Add 'Do not share this code' disclaimer. Only for AUTHENTICATION templates.\n\n- `buttons?: { text: string; type: 'quick_reply' | 'url' | 'phone' | 'otp'; otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; url?: string; }[]`\n  Template buttons (max 3).\n\n- `codeExpirationMinutes?: number`\n  Code expiration time in minutes. Only for AUTHENTICATION templates.\n\n- `footer?: string`\n  Footer text for the template.\n\n- `headerContent?: string`\n  Header content (text string or media URL).\n\n- `headerType?: 'text' | 'image' | 'video' | 'document'`\n  Type of header for the template.\n\n- `instagramBody?: string`\n  Channel-specific body for Instagram. Falls back to `body` if not set.\n\n- `smsBody?: string`\n  Channel-specific body for SMS. Falls back to `body` if not set.\n\n- `telegramBody?: string`\n  Channel-specific body for Telegram. Falls back to `body` if not set.\n\n- `variables?: string[]`\n\n- `whatsappCategory?: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'`\n  WhatsApp template category.\n\n### Returns\n\n- `{ id: string; body: string; category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; instagramBody?: string; smsBody?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; telegramBody?: string; updatedAt?: string; variables?: string[]; whatsapp?: { namespace?: string; status?: string; templateName?: string; }; }`\n\n  - `id: string`\n  - `body: string`\n  - `category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'`\n  - `language: string`\n  - `name: string`\n  - `addSecurityRecommendation?: boolean`\n  - `buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]`\n  - `codeExpirationMinutes?: number`\n  - `createdAt?: string`\n  - `footer?: string`\n  - `headerContent?: string`\n  - `headerType?: string`\n  - `instagramBody?: string`\n  - `smsBody?: string`\n  - `status?: 'draft' | 'pending' | 'approved' | 'rejected'`\n  - `telegramBody?: string`\n  - `updatedAt?: string`\n  - `variables?: string[]`\n  - `whatsapp?: { namespace?: string; status?: string; templateName?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst template = await client.templates.create({\n  body: 'Hi {{1}}, your order {{2}} has been confirmed and will ship within 24 hours.',\n  language: 'en',\n  name: 'order_confirmation',\n});\n\nconsole.log(template);\n```",
    perLanguage: {
      cli: {
        method: 'templates create',
        example:
          "zavudev templates create \\\n  --api-key 'My API Key' \\\n  --body 'Hi {{1}}, your order {{2}} has been confirmed and will ship within 24 hours.' \\\n  --language en \\\n  --name order_confirmation",
      },
      go: {
        method: 'client.Templates.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttemplate, err := client.Templates.New(context.TODO(), zavudev.TemplateNewParams{\n\t\tBody:             "Hi {{1}}, your order {{2}} has been confirmed and will ship within 24 hours.",\n\t\tLanguage:         "en",\n\t\tName:             "order_confirmation",\n\t\tVariables:        []string{"customer_name", "order_id"},\n\t\tWhatsappCategory: zavudev.WhatsappCategoryUtility,\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", template.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/templates \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY" \\\n    -d \'{\n          "body": "Hi {{1}}, your order {{2}} has been confirmed and will ship within 24 hours.",\n          "language": "en",\n          "name": "order_confirmation"\n        }\'',
      },
      php: {
        method: 'templates->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$template = $client->templates->create(\n  body: 'Hi {{1}}, your order {{2}} has been confirmed and will ship within 24 hours.',\n  language: 'en',\n  name: 'order_confirmation',\n  addSecurityRecommendation: true,\n  buttons: [\n    [\n      'text' => 'text',\n      'type' => 'quick_reply',\n      'otpType' => 'COPY_CODE',\n      'packageName' => 'packageName',\n      'phoneNumber' => 'phoneNumber',\n      'signatureHash' => 'signatureHash',\n      'url' => 'https://example.com',\n    ],\n  ],\n  codeExpirationMinutes: 1,\n  footer: 'footer',\n  headerContent: 'headerContent',\n  headerType: 'text',\n  instagramBody: 'instagramBody',\n  smsBody: 'smsBody',\n  telegramBody: 'telegramBody',\n  variables: ['customer_name', 'order_id'],\n  whatsappCategory: WhatsappCategory::UTILITY,\n);\n\nvar_dump($template);",
      },
      python: {
        method: 'templates.create',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\ntemplate = client.templates.create(\n    body="Hi {{1}}, your order {{2}} has been confirmed and will ship within 24 hours.",\n    language="en",\n    name="order_confirmation",\n    variables=["customer_name", "order_id"],\n    whatsapp_category="UTILITY",\n)\nprint(template.id)',
      },
      ruby: {
        method: 'templates.create',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\ntemplate = zavudev.templates.create(\n  body: "Hi {{1}}, your order {{2}} has been confirmed and will ship within 24 hours.",\n  language: "en",\n  name: "order_confirmation"\n)\n\nputs(template)',
      },
      typescript: {
        method: 'client.templates.create',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst template = await client.templates.create({\n  body: 'Hi {{1}}, your order {{2}} has been confirmed and will ship within 24 hours.',\n  language: 'en',\n  name: 'order_confirmation',\n  variables: ['customer_name', 'order_id'],\n  whatsappCategory: 'UTILITY',\n});\n\nconsole.log(template.id);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/templates/{templateId}',
    httpMethod: 'get',
    summary: 'Get template',
    description: 'Get template',
    stainlessPath: '(resource) templates > (method) retrieve',
    qualified: 'client.templates.retrieve',
    params: ['templateId: string;'],
    response:
      "{ id: string; body: string; category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; instagramBody?: string; smsBody?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; telegramBody?: string; updatedAt?: string; variables?: string[]; whatsapp?: { namespace?: string; status?: string; templateName?: string; }; }",
    markdown:
      "## retrieve\n\n`client.templates.retrieve(templateId: string): { id: string; body: string; category: whatsapp_category; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: object[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; instagramBody?: string; smsBody?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; telegramBody?: string; updatedAt?: string; variables?: string[]; whatsapp?: object; }`\n\n**get** `/v1/templates/{templateId}`\n\nGet template\n\n### Parameters\n\n- `templateId: string`\n\n### Returns\n\n- `{ id: string; body: string; category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; instagramBody?: string; smsBody?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; telegramBody?: string; updatedAt?: string; variables?: string[]; whatsapp?: { namespace?: string; status?: string; templateName?: string; }; }`\n\n  - `id: string`\n  - `body: string`\n  - `category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'`\n  - `language: string`\n  - `name: string`\n  - `addSecurityRecommendation?: boolean`\n  - `buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]`\n  - `codeExpirationMinutes?: number`\n  - `createdAt?: string`\n  - `footer?: string`\n  - `headerContent?: string`\n  - `headerType?: string`\n  - `instagramBody?: string`\n  - `smsBody?: string`\n  - `status?: 'draft' | 'pending' | 'approved' | 'rejected'`\n  - `telegramBody?: string`\n  - `updatedAt?: string`\n  - `variables?: string[]`\n  - `whatsapp?: { namespace?: string; status?: string; templateName?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst template = await client.templates.retrieve('templateId');\n\nconsole.log(template);\n```",
    perLanguage: {
      cli: {
        method: 'templates retrieve',
        example: "zavudev templates retrieve \\\n  --api-key 'My API Key' \\\n  --template-id templateId",
      },
      go: {
        method: 'client.Templates.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttemplate, err := client.Templates.Get(context.TODO(), "templateId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", template.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/templates/$TEMPLATE_ID \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'templates->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$template = $client->templates->retrieve('templateId');\n\nvar_dump($template);",
      },
      python: {
        method: 'templates.retrieve',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\ntemplate = client.templates.retrieve(\n    "templateId",\n)\nprint(template.id)',
      },
      ruby: {
        method: 'templates.retrieve',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\ntemplate = zavudev.templates.retrieve("templateId")\n\nputs(template)',
      },
      typescript: {
        method: 'client.templates.retrieve',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst template = await client.templates.retrieve('templateId');\n\nconsole.log(template.id);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/templates/{templateId}',
    httpMethod: 'delete',
    summary: 'Delete template',
    description: 'Delete template',
    stainlessPath: '(resource) templates > (method) delete',
    qualified: 'client.templates.delete',
    params: ['templateId: string;'],
    markdown:
      "## delete\n\n`client.templates.delete(templateId: string): void`\n\n**delete** `/v1/templates/{templateId}`\n\nDelete template\n\n### Parameters\n\n- `templateId: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nawait client.templates.delete('templateId')\n```",
    perLanguage: {
      cli: {
        method: 'templates delete',
        example: "zavudev templates delete \\\n  --api-key 'My API Key' \\\n  --template-id templateId",
      },
      go: {
        method: 'client.Templates.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Templates.Delete(context.TODO(), "templateId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/templates/$TEMPLATE_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'templates->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$result = $client->templates->delete('templateId');\n\nvar_dump($result);",
      },
      python: {
        method: 'templates.delete',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nclient.templates.delete(\n    "templateId",\n)',
      },
      ruby: {
        method: 'templates.delete',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresult = zavudev.templates.delete("templateId")\n\nputs(result)',
      },
      typescript: {
        method: 'client.templates.delete',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.templates.delete('templateId');",
      },
    },
  },
  {
    name: 'submit',
    endpoint: '/v1/templates/{templateId}/submit',
    httpMethod: 'post',
    summary: 'Submit template for approval',
    description:
      'Submit a WhatsApp template to Meta for approval. The template must be in draft status and associated with a sender that has a WhatsApp Business Account configured.',
    stainlessPath: '(resource) templates > (method) submit',
    qualified: 'client.templates.submit',
    params: [
      'templateId: string;',
      'senderId: string;',
      "category?: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION';",
    ],
    response:
      "{ id: string; body: string; category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; instagramBody?: string; smsBody?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; telegramBody?: string; updatedAt?: string; variables?: string[]; whatsapp?: { namespace?: string; status?: string; templateName?: string; }; }",
    markdown:
      "## submit\n\n`client.templates.submit(templateId: string, senderId: string, category?: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'): { id: string; body: string; category: whatsapp_category; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: object[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; instagramBody?: string; smsBody?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; telegramBody?: string; updatedAt?: string; variables?: string[]; whatsapp?: object; }`\n\n**post** `/v1/templates/{templateId}/submit`\n\nSubmit a WhatsApp template to Meta for approval. The template must be in draft status and associated with a sender that has a WhatsApp Business Account configured.\n\n### Parameters\n\n- `templateId: string`\n\n- `senderId: string`\n  The sender ID with the WhatsApp Business Account to submit the template to.\n\n- `category?: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'`\n  Template category. If not provided, uses the category set on the template.\n\n### Returns\n\n- `{ id: string; body: string; category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; instagramBody?: string; smsBody?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; telegramBody?: string; updatedAt?: string; variables?: string[]; whatsapp?: { namespace?: string; status?: string; templateName?: string; }; }`\n\n  - `id: string`\n  - `body: string`\n  - `category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'`\n  - `language: string`\n  - `name: string`\n  - `addSecurityRecommendation?: boolean`\n  - `buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]`\n  - `codeExpirationMinutes?: number`\n  - `createdAt?: string`\n  - `footer?: string`\n  - `headerContent?: string`\n  - `headerType?: string`\n  - `instagramBody?: string`\n  - `smsBody?: string`\n  - `status?: 'draft' | 'pending' | 'approved' | 'rejected'`\n  - `telegramBody?: string`\n  - `updatedAt?: string`\n  - `variables?: string[]`\n  - `whatsapp?: { namespace?: string; status?: string; templateName?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst template = await client.templates.submit('templateId', { senderId: 'sender_abc123' });\n\nconsole.log(template);\n```",
    perLanguage: {
      cli: {
        method: 'templates submit',
        example:
          "zavudev templates submit \\\n  --api-key 'My API Key' \\\n  --template-id templateId \\\n  --sender-id sender_abc123",
      },
      go: {
        method: 'client.Templates.Submit',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttemplate, err := client.Templates.Submit(\n\t\tcontext.TODO(),\n\t\t"templateId",\n\t\tzavudev.TemplateSubmitParams{\n\t\t\tSenderID: "sender_abc123",\n\t\t\tCategory: zavudev.WhatsappCategoryUtility,\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", template.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/templates/$TEMPLATE_ID/submit \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY" \\\n    -d \'{\n          "senderId": "sender_abc123"\n        }\'',
      },
      php: {
        method: 'templates->submit',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$template = $client->templates->submit(\n  'templateId', senderID: 'sender_abc123', category: WhatsappCategory::UTILITY\n);\n\nvar_dump($template);",
      },
      python: {
        method: 'templates.submit',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\ntemplate = client.templates.submit(\n    template_id="templateId",\n    sender_id="sender_abc123",\n    category="UTILITY",\n)\nprint(template.id)',
      },
      ruby: {
        method: 'templates.submit',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\ntemplate = zavudev.templates.submit("templateId", sender_id: "sender_abc123")\n\nputs(template)',
      },
      typescript: {
        method: 'client.templates.submit',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst template = await client.templates.submit('templateId', {\n  senderId: 'sender_abc123',\n  category: 'UTILITY',\n});\n\nconsole.log(template.id);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/senders',
    httpMethod: 'get',
    summary: 'List senders',
    description: 'List senders',
    stainlessPath: '(resource) senders > (method) list',
    qualified: 'client.senders.list',
    params: ['cursor?: string;', 'limit?: number;'],
    response:
      '{ id: string; name: string; phoneNumber: string; createdAt?: string; emailReceivingEnabled?: boolean; isDefault?: boolean; updatedAt?: string; webhook?: { active: boolean; events: webhook_event[]; url: string; secret?: string; }; whatsapp?: { displayPhoneNumber?: string; paymentStatus?: { canSendTemplates?: boolean; methodStatus?: string; setupStatus?: string; }; phoneNumberId?: string; }; }',
    markdown:
      "## list\n\n`client.senders.list(cursor?: string, limit?: number): { id: string; name: string; phoneNumber: string; createdAt?: string; emailReceivingEnabled?: boolean; isDefault?: boolean; updatedAt?: string; webhook?: sender_webhook; whatsapp?: object; }`\n\n**get** `/v1/senders`\n\nList senders\n\n### Parameters\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ id: string; name: string; phoneNumber: string; createdAt?: string; emailReceivingEnabled?: boolean; isDefault?: boolean; updatedAt?: string; webhook?: { active: boolean; events: webhook_event[]; url: string; secret?: string; }; whatsapp?: { displayPhoneNumber?: string; paymentStatus?: { canSendTemplates?: boolean; methodStatus?: string; setupStatus?: string; }; phoneNumberId?: string; }; }`\n\n  - `id: string`\n  - `name: string`\n  - `phoneNumber: string`\n  - `createdAt?: string`\n  - `emailReceivingEnabled?: boolean`\n  - `isDefault?: boolean`\n  - `updatedAt?: string`\n  - `webhook?: { active: boolean; events: string[]; url: string; secret?: string; }`\n  - `whatsapp?: { displayPhoneNumber?: string; paymentStatus?: { canSendTemplates?: boolean; methodStatus?: string; setupStatus?: string; }; phoneNumberId?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\n// Automatically fetches more pages as needed.\nfor await (const sender of client.senders.list()) {\n  console.log(sender);\n}\n```",
    perLanguage: {
      cli: {
        method: 'senders list',
        example: "zavudev senders list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Senders.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Senders.List(context.TODO(), zavudev.SenderListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.zavu.dev/v1/senders \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'senders->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->senders->list(cursor: 'cursor', limit: 100);\n\nvar_dump($page);",
      },
      python: {
        method: 'senders.list',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\npage = client.senders.list()\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'senders.list',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\npage = zavudev.senders.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.senders.list',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const sender of client.senders.list()) {\n  console.log(sender.id);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/senders',
    httpMethod: 'post',
    summary: 'Create sender',
    description: 'Create sender',
    stainlessPath: '(resource) senders > (method) create',
    qualified: 'client.senders.create',
    params: [
      'name: string;',
      'phoneNumber: string;',
      'setAsDefault?: boolean;',
      'webhookEvents?: string[];',
      'webhookUrl?: string;',
    ],
    response:
      '{ id: string; name: string; phoneNumber: string; createdAt?: string; emailReceivingEnabled?: boolean; isDefault?: boolean; updatedAt?: string; webhook?: { active: boolean; events: webhook_event[]; url: string; secret?: string; }; whatsapp?: { displayPhoneNumber?: string; paymentStatus?: { canSendTemplates?: boolean; methodStatus?: string; setupStatus?: string; }; phoneNumberId?: string; }; }',
    markdown:
      "## create\n\n`client.senders.create(name: string, phoneNumber: string, setAsDefault?: boolean, webhookEvents?: string[], webhookUrl?: string): { id: string; name: string; phoneNumber: string; createdAt?: string; emailReceivingEnabled?: boolean; isDefault?: boolean; updatedAt?: string; webhook?: sender_webhook; whatsapp?: object; }`\n\n**post** `/v1/senders`\n\nCreate sender\n\n### Parameters\n\n- `name: string`\n\n- `phoneNumber: string`\n\n- `setAsDefault?: boolean`\n\n- `webhookEvents?: string[]`\n  Events to subscribe to.\n\n- `webhookUrl?: string`\n  HTTPS URL for webhook events.\n\n### Returns\n\n- `{ id: string; name: string; phoneNumber: string; createdAt?: string; emailReceivingEnabled?: boolean; isDefault?: boolean; updatedAt?: string; webhook?: { active: boolean; events: webhook_event[]; url: string; secret?: string; }; whatsapp?: { displayPhoneNumber?: string; paymentStatus?: { canSendTemplates?: boolean; methodStatus?: string; setupStatus?: string; }; phoneNumberId?: string; }; }`\n\n  - `id: string`\n  - `name: string`\n  - `phoneNumber: string`\n  - `createdAt?: string`\n  - `emailReceivingEnabled?: boolean`\n  - `isDefault?: boolean`\n  - `updatedAt?: string`\n  - `webhook?: { active: boolean; events: string[]; url: string; secret?: string; }`\n  - `whatsapp?: { displayPhoneNumber?: string; paymentStatus?: { canSendTemplates?: boolean; methodStatus?: string; setupStatus?: string; }; phoneNumberId?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst sender = await client.senders.create({ name: 'name', phoneNumber: 'phoneNumber' });\n\nconsole.log(sender);\n```",
    perLanguage: {
      cli: {
        method: 'senders create',
        example:
          "zavudev senders create \\\n  --api-key 'My API Key' \\\n  --name name \\\n  --phone-number phoneNumber",
      },
      go: {
        method: 'client.Senders.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsender, err := client.Senders.New(context.TODO(), zavudev.SenderNewParams{\n\t\tName:        "name",\n\t\tPhoneNumber: "phoneNumber",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", sender.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY" \\\n    -d \'{\n          "name": "name",\n          "phoneNumber": "phoneNumber"\n        }\'',
      },
      php: {
        method: 'senders->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$sender = $client->senders->create(\n  name: 'name',\n  phoneNumber: 'phoneNumber',\n  setAsDefault: true,\n  webhookEvents: [WebhookEvent::MESSAGE_QUEUED],\n  webhookURL: 'https://example.com',\n);\n\nvar_dump($sender);",
      },
      python: {
        method: 'senders.create',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nsender = client.senders.create(\n    name="name",\n    phone_number="phoneNumber",\n)\nprint(sender.id)',
      },
      ruby: {
        method: 'senders.create',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nsender = zavudev.senders.create(name: "name", phone_number: "phoneNumber")\n\nputs(sender)',
      },
      typescript: {
        method: 'client.senders.create',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst sender = await client.senders.create({ name: 'name', phoneNumber: 'phoneNumber' });\n\nconsole.log(sender.id);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/senders/{senderId}',
    httpMethod: 'get',
    summary: 'Get sender',
    description: 'Get sender',
    stainlessPath: '(resource) senders > (method) retrieve',
    qualified: 'client.senders.retrieve',
    params: ['senderId: string;'],
    response:
      '{ id: string; name: string; phoneNumber: string; createdAt?: string; emailReceivingEnabled?: boolean; isDefault?: boolean; updatedAt?: string; webhook?: { active: boolean; events: webhook_event[]; url: string; secret?: string; }; whatsapp?: { displayPhoneNumber?: string; paymentStatus?: { canSendTemplates?: boolean; methodStatus?: string; setupStatus?: string; }; phoneNumberId?: string; }; }',
    markdown:
      "## retrieve\n\n`client.senders.retrieve(senderId: string): { id: string; name: string; phoneNumber: string; createdAt?: string; emailReceivingEnabled?: boolean; isDefault?: boolean; updatedAt?: string; webhook?: sender_webhook; whatsapp?: object; }`\n\n**get** `/v1/senders/{senderId}`\n\nGet sender\n\n### Parameters\n\n- `senderId: string`\n\n### Returns\n\n- `{ id: string; name: string; phoneNumber: string; createdAt?: string; emailReceivingEnabled?: boolean; isDefault?: boolean; updatedAt?: string; webhook?: { active: boolean; events: webhook_event[]; url: string; secret?: string; }; whatsapp?: { displayPhoneNumber?: string; paymentStatus?: { canSendTemplates?: boolean; methodStatus?: string; setupStatus?: string; }; phoneNumberId?: string; }; }`\n\n  - `id: string`\n  - `name: string`\n  - `phoneNumber: string`\n  - `createdAt?: string`\n  - `emailReceivingEnabled?: boolean`\n  - `isDefault?: boolean`\n  - `updatedAt?: string`\n  - `webhook?: { active: boolean; events: string[]; url: string; secret?: string; }`\n  - `whatsapp?: { displayPhoneNumber?: string; paymentStatus?: { canSendTemplates?: boolean; methodStatus?: string; setupStatus?: string; }; phoneNumberId?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst sender = await client.senders.retrieve('senderId');\n\nconsole.log(sender);\n```",
    perLanguage: {
      cli: {
        method: 'senders retrieve',
        example: "zavudev senders retrieve \\\n  --api-key 'My API Key' \\\n  --sender-id senderId",
      },
      go: {
        method: 'client.Senders.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsender, err := client.Senders.Get(context.TODO(), "senderId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", sender.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'senders->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$sender = $client->senders->retrieve('senderId');\n\nvar_dump($sender);",
      },
      python: {
        method: 'senders.retrieve',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nsender = client.senders.retrieve(\n    "senderId",\n)\nprint(sender.id)',
      },
      ruby: {
        method: 'senders.retrieve',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nsender = zavudev.senders.retrieve("senderId")\n\nputs(sender)',
      },
      typescript: {
        method: 'client.senders.retrieve',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst sender = await client.senders.retrieve('senderId');\n\nconsole.log(sender.id);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/senders/{senderId}',
    httpMethod: 'patch',
    summary: 'Update sender',
    description: 'Update sender',
    stainlessPath: '(resource) senders > (method) update',
    qualified: 'client.senders.update',
    params: [
      'senderId: string;',
      'emailReceivingEnabled?: boolean;',
      'name?: string;',
      'setAsDefault?: boolean;',
      'webhookActive?: boolean;',
      'webhookEvents?: string[];',
      'webhookUrl?: string;',
    ],
    response:
      '{ id: string; name: string; phoneNumber: string; createdAt?: string; emailReceivingEnabled?: boolean; isDefault?: boolean; updatedAt?: string; webhook?: { active: boolean; events: webhook_event[]; url: string; secret?: string; }; whatsapp?: { displayPhoneNumber?: string; paymentStatus?: { canSendTemplates?: boolean; methodStatus?: string; setupStatus?: string; }; phoneNumberId?: string; }; }',
    markdown:
      "## update\n\n`client.senders.update(senderId: string, emailReceivingEnabled?: boolean, name?: string, setAsDefault?: boolean, webhookActive?: boolean, webhookEvents?: string[], webhookUrl?: string): { id: string; name: string; phoneNumber: string; createdAt?: string; emailReceivingEnabled?: boolean; isDefault?: boolean; updatedAt?: string; webhook?: sender_webhook; whatsapp?: object; }`\n\n**patch** `/v1/senders/{senderId}`\n\nUpdate sender\n\n### Parameters\n\n- `senderId: string`\n\n- `emailReceivingEnabled?: boolean`\n  Enable or disable inbound email receiving for this sender.\n\n- `name?: string`\n\n- `setAsDefault?: boolean`\n\n- `webhookActive?: boolean`\n  Whether the webhook is active.\n\n- `webhookEvents?: string[]`\n  Events to subscribe to.\n\n- `webhookUrl?: string`\n  HTTPS URL for webhook events. Set to null to remove webhook.\n\n### Returns\n\n- `{ id: string; name: string; phoneNumber: string; createdAt?: string; emailReceivingEnabled?: boolean; isDefault?: boolean; updatedAt?: string; webhook?: { active: boolean; events: webhook_event[]; url: string; secret?: string; }; whatsapp?: { displayPhoneNumber?: string; paymentStatus?: { canSendTemplates?: boolean; methodStatus?: string; setupStatus?: string; }; phoneNumberId?: string; }; }`\n\n  - `id: string`\n  - `name: string`\n  - `phoneNumber: string`\n  - `createdAt?: string`\n  - `emailReceivingEnabled?: boolean`\n  - `isDefault?: boolean`\n  - `updatedAt?: string`\n  - `webhook?: { active: boolean; events: string[]; url: string; secret?: string; }`\n  - `whatsapp?: { displayPhoneNumber?: string; paymentStatus?: { canSendTemplates?: boolean; methodStatus?: string; setupStatus?: string; }; phoneNumberId?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst sender = await client.senders.update('senderId');\n\nconsole.log(sender);\n```",
    perLanguage: {
      cli: {
        method: 'senders update',
        example: "zavudev senders update \\\n  --api-key 'My API Key' \\\n  --sender-id senderId",
      },
      go: {
        method: 'client.Senders.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tsender, err := client.Senders.Update(\n\t\tcontext.TODO(),\n\t\t"senderId",\n\t\tzavudev.SenderUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", sender.ID)\n}\n',
      },
      http: {
        example:
          "curl https://api.zavu.dev/v1/senders/$SENDER_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $ZAVUDEV_API_KEY\" \\\n    -d '{}'",
      },
      php: {
        method: 'senders->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$sender = $client->senders->update(\n  'senderId',\n  emailReceivingEnabled: true,\n  name: 'name',\n  setAsDefault: true,\n  webhookActive: true,\n  webhookEvents: [WebhookEvent::MESSAGE_QUEUED],\n  webhookURL: 'https://example.com',\n);\n\nvar_dump($sender);",
      },
      python: {
        method: 'senders.update',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nsender = client.senders.update(\n    sender_id="senderId",\n)\nprint(sender.id)',
      },
      ruby: {
        method: 'senders.update',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nsender = zavudev.senders.update("senderId")\n\nputs(sender)',
      },
      typescript: {
        method: 'client.senders.update',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst sender = await client.senders.update('senderId');\n\nconsole.log(sender.id);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/senders/{senderId}',
    httpMethod: 'delete',
    summary: 'Delete sender',
    description: 'Delete sender',
    stainlessPath: '(resource) senders > (method) delete',
    qualified: 'client.senders.delete',
    params: ['senderId: string;'],
    markdown:
      "## delete\n\n`client.senders.delete(senderId: string): void`\n\n**delete** `/v1/senders/{senderId}`\n\nDelete sender\n\n### Parameters\n\n- `senderId: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nawait client.senders.delete('senderId')\n```",
    perLanguage: {
      cli: {
        method: 'senders delete',
        example: "zavudev senders delete \\\n  --api-key 'My API Key' \\\n  --sender-id senderId",
      },
      go: {
        method: 'client.Senders.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Senders.Delete(context.TODO(), "senderId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'senders->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$result = $client->senders->delete('senderId');\n\nvar_dump($result);",
      },
      python: {
        method: 'senders.delete',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nclient.senders.delete(\n    "senderId",\n)',
      },
      ruby: {
        method: 'senders.delete',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresult = zavudev.senders.delete("senderId")\n\nputs(result)',
      },
      typescript: {
        method: 'client.senders.delete',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.senders.delete('senderId');",
      },
    },
  },
  {
    name: 'regenerate_webhook_secret',
    endpoint: '/v1/senders/{senderId}/webhook/secret',
    httpMethod: 'post',
    summary: 'Regenerate webhook secret',
    description:
      'Regenerate the webhook secret for a sender. The old secret will be invalidated immediately.',
    stainlessPath: '(resource) senders > (method) regenerate_webhook_secret',
    qualified: 'client.senders.regenerateWebhookSecret',
    params: ['senderId: string;'],
    response: '{ secret: string; }',
    markdown:
      "## regenerate_webhook_secret\n\n`client.senders.regenerateWebhookSecret(senderId: string): { secret: string; }`\n\n**post** `/v1/senders/{senderId}/webhook/secret`\n\nRegenerate the webhook secret for a sender. The old secret will be invalidated immediately.\n\n### Parameters\n\n- `senderId: string`\n\n### Returns\n\n- `{ secret: string; }`\n\n  - `secret: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst webhookSecretResponse = await client.senders.regenerateWebhookSecret('senderId');\n\nconsole.log(webhookSecretResponse);\n```",
    perLanguage: {
      cli: {
        method: 'senders regenerate_webhook_secret',
        example:
          "zavudev senders regenerate-webhook-secret \\\n  --api-key 'My API Key' \\\n  --sender-id senderId",
      },
      go: {
        method: 'client.Senders.RegenerateWebhookSecret',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twebhookSecretResponse, err := client.Senders.RegenerateWebhookSecret(context.TODO(), "senderId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", webhookSecretResponse.Secret)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/webhook/secret \\\n    -X POST \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'senders->regenerateWebhookSecret',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$webhookSecretResponse = $client->senders->regenerateWebhookSecret('senderId');\n\nvar_dump($webhookSecretResponse);",
      },
      python: {
        method: 'senders.regenerate_webhook_secret',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nwebhook_secret_response = client.senders.regenerate_webhook_secret(\n    "senderId",\n)\nprint(webhook_secret_response.secret)',
      },
      ruby: {
        method: 'senders.regenerate_webhook_secret',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nwebhook_secret_response = zavudev.senders.regenerate_webhook_secret("senderId")\n\nputs(webhook_secret_response)',
      },
      typescript: {
        method: 'client.senders.regenerateWebhookSecret',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhookSecretResponse = await client.senders.regenerateWebhookSecret('senderId');\n\nconsole.log(webhookSecretResponse.secret);",
      },
    },
  },
  {
    name: 'get_profile',
    endpoint: '/v1/senders/{senderId}/profile',
    httpMethod: 'get',
    summary: 'Get WhatsApp Business profile',
    description:
      'Get the WhatsApp Business profile for a sender. The sender must have a WhatsApp Business Account connected.',
    stainlessPath: '(resource) senders > (method) get_profile',
    qualified: 'client.senders.getProfile',
    params: ['senderId: string;'],
    response:
      '{ profile: { about?: string; address?: string; description?: string; email?: string; profilePictureUrl?: string; vertical?: whatsapp_business_profile_vertical; websites?: string[]; }; }',
    markdown:
      "## get_profile\n\n`client.senders.getProfile(senderId: string): { profile: whatsapp_business_profile; }`\n\n**get** `/v1/senders/{senderId}/profile`\n\nGet the WhatsApp Business profile for a sender. The sender must have a WhatsApp Business Account connected.\n\n### Parameters\n\n- `senderId: string`\n\n### Returns\n\n- `{ profile: { about?: string; address?: string; description?: string; email?: string; profilePictureUrl?: string; vertical?: whatsapp_business_profile_vertical; websites?: string[]; }; }`\n\n  - `profile: { about?: string; address?: string; description?: string; email?: string; profilePictureUrl?: string; vertical?: string; websites?: string[]; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst whatsappBusinessProfileResponse = await client.senders.getProfile('senderId');\n\nconsole.log(whatsappBusinessProfileResponse);\n```",
    perLanguage: {
      cli: {
        method: 'senders get_profile',
        example: "zavudev senders get-profile \\\n  --api-key 'My API Key' \\\n  --sender-id senderId",
      },
      go: {
        method: 'client.Senders.GetProfile',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\twhatsappBusinessProfileResponse, err := client.Senders.GetProfile(context.TODO(), "senderId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", whatsappBusinessProfileResponse.Profile)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/profile \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'senders->getProfile',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$whatsappBusinessProfileResponse = $client->senders->getProfile('senderId');\n\nvar_dump($whatsappBusinessProfileResponse);",
      },
      python: {
        method: 'senders.get_profile',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nwhatsapp_business_profile_response = client.senders.get_profile(\n    "senderId",\n)\nprint(whatsapp_business_profile_response.profile)',
      },
      ruby: {
        method: 'senders.get_profile',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nwhatsapp_business_profile_response = zavudev.senders.get_profile("senderId")\n\nputs(whatsapp_business_profile_response)',
      },
      typescript: {
        method: 'client.senders.getProfile',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst whatsappBusinessProfileResponse = await client.senders.getProfile('senderId');\n\nconsole.log(whatsappBusinessProfileResponse.profile);",
      },
    },
  },
  {
    name: 'update_profile',
    endpoint: '/v1/senders/{senderId}/profile',
    httpMethod: 'patch',
    summary: 'Update WhatsApp Business profile',
    description:
      'Update the WhatsApp Business profile for a sender. The sender must have a WhatsApp Business Account connected.',
    stainlessPath: '(resource) senders > (method) update_profile',
    qualified: 'client.senders.updateProfile',
    params: [
      'senderId: string;',
      'about?: string;',
      'address?: string;',
      'description?: string;',
      'email?: string;',
      'vertical?: string;',
      'websites?: string[];',
    ],
    response:
      '{ profile: { about?: string; address?: string; description?: string; email?: string; profilePictureUrl?: string; vertical?: whatsapp_business_profile_vertical; websites?: string[]; }; success: boolean; }',
    markdown:
      "## update_profile\n\n`client.senders.updateProfile(senderId: string, about?: string, address?: string, description?: string, email?: string, vertical?: string, websites?: string[]): { profile: whatsapp_business_profile; success: boolean; }`\n\n**patch** `/v1/senders/{senderId}/profile`\n\nUpdate the WhatsApp Business profile for a sender. The sender must have a WhatsApp Business Account connected.\n\n### Parameters\n\n- `senderId: string`\n\n- `about?: string`\n  Short description of the business (max 139 characters).\n\n- `address?: string`\n  Physical address of the business (max 256 characters).\n\n- `description?: string`\n  Extended description of the business (max 512 characters).\n\n- `email?: string`\n  Business email address.\n\n- `vertical?: string`\n  Business category for WhatsApp Business profile.\n\n- `websites?: string[]`\n  Business website URLs (maximum 2).\n\n### Returns\n\n- `{ profile: { about?: string; address?: string; description?: string; email?: string; profilePictureUrl?: string; vertical?: whatsapp_business_profile_vertical; websites?: string[]; }; success: boolean; }`\n\n  - `profile: { about?: string; address?: string; description?: string; email?: string; profilePictureUrl?: string; vertical?: string; websites?: string[]; }`\n  - `success: boolean`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst response = await client.senders.updateProfile('senderId');\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'senders update_profile',
        example: "zavudev senders update-profile \\\n  --api-key 'My API Key' \\\n  --sender-id senderId",
      },
      go: {
        method: 'client.Senders.UpdateProfile',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Senders.UpdateProfile(\n\t\tcontext.TODO(),\n\t\t"senderId",\n\t\tzavudev.SenderUpdateProfileParams{\n\t\t\tAbout:       zavudev.String("Succulent specialists!"),\n\t\t\tDescription: zavudev.String("We specialize in providing high-quality succulents."),\n\t\t\tEmail:       zavudev.String("contact@example.com"),\n\t\t\tVertical:    zavudev.WhatsappBusinessProfileVerticalRetail,\n\t\t\tWebsites:    []string{"https://www.example.com"},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Profile)\n}\n',
      },
      http: {
        example:
          "curl https://api.zavu.dev/v1/senders/$SENDER_ID/profile \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $ZAVUDEV_API_KEY\" \\\n    -d '{}'",
      },
      php: {
        method: 'senders->updateProfile',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->senders->updateProfile(\n  'senderId',\n  about: 'Succulent specialists!',\n  address: 'address',\n  description: 'We specialize in providing high-quality succulents.',\n  email: 'contact@example.com',\n  vertical: WhatsappBusinessProfileVertical::RETAIL,\n  websites: ['https://www.example.com'],\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'senders.update_profile',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.senders.update_profile(\n    sender_id="senderId",\n    about="Succulent specialists!",\n    description="We specialize in providing high-quality succulents.",\n    email="contact@example.com",\n    vertical="RETAIL",\n    websites=["https://www.example.com"],\n)\nprint(response.profile)',
      },
      ruby: {
        method: 'senders.update_profile',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresponse = zavudev.senders.update_profile("senderId")\n\nputs(response)',
      },
      typescript: {
        method: 'client.senders.updateProfile',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.senders.updateProfile('senderId', {\n  about: 'Succulent specialists!',\n  description: 'We specialize in providing high-quality succulents.',\n  email: 'contact@example.com',\n  vertical: 'RETAIL',\n  websites: ['https://www.example.com'],\n});\n\nconsole.log(response.profile);",
      },
    },
  },
  {
    name: 'upload_profile_picture',
    endpoint: '/v1/senders/{senderId}/profile/picture',
    httpMethod: 'post',
    summary: 'Upload WhatsApp Business profile picture',
    description:
      'Upload a new profile picture for the WhatsApp Business profile. The image will be uploaded to Meta and set as the profile picture.',
    stainlessPath: '(resource) senders > (method) upload_profile_picture',
    qualified: 'client.senders.uploadProfilePicture',
    params: ['senderId: string;', 'imageUrl: string;', "mimeType: 'image/jpeg' | 'image/png';"],
    response:
      '{ profile: { about?: string; address?: string; description?: string; email?: string; profilePictureUrl?: string; vertical?: whatsapp_business_profile_vertical; websites?: string[]; }; success: boolean; }',
    markdown:
      "## upload_profile_picture\n\n`client.senders.uploadProfilePicture(senderId: string, imageUrl: string, mimeType: 'image/jpeg' | 'image/png'): { profile: whatsapp_business_profile; success: boolean; }`\n\n**post** `/v1/senders/{senderId}/profile/picture`\n\nUpload a new profile picture for the WhatsApp Business profile. The image will be uploaded to Meta and set as the profile picture.\n\n### Parameters\n\n- `senderId: string`\n\n- `imageUrl: string`\n  URL of the image to upload.\n\n- `mimeType: 'image/jpeg' | 'image/png'`\n  MIME type of the image.\n\n### Returns\n\n- `{ profile: { about?: string; address?: string; description?: string; email?: string; profilePictureUrl?: string; vertical?: whatsapp_business_profile_vertical; websites?: string[]; }; success: boolean; }`\n\n  - `profile: { about?: string; address?: string; description?: string; email?: string; profilePictureUrl?: string; vertical?: string; websites?: string[]; }`\n  - `success: boolean`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst response = await client.senders.uploadProfilePicture('senderId', { imageUrl: 'https://example.com/profile.jpg', mimeType: 'image/jpeg' });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'senders upload_profile_picture',
        example:
          "zavudev senders upload-profile-picture \\\n  --api-key 'My API Key' \\\n  --sender-id senderId \\\n  --image-url https://example.com/profile.jpg \\\n  --mime-type image/jpeg",
      },
      go: {
        method: 'client.Senders.UploadProfilePicture',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Senders.UploadProfilePicture(\n\t\tcontext.TODO(),\n\t\t"senderId",\n\t\tzavudev.SenderUploadProfilePictureParams{\n\t\t\tImageURL: "https://example.com/profile.jpg",\n\t\t\tMimeType: zavudev.SenderUploadProfilePictureParamsMimeTypeImageJpeg,\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Profile)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/profile/picture \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY" \\\n    -d \'{\n          "imageUrl": "https://example.com/profile.jpg",\n          "mimeType": "image/jpeg"\n        }\'',
      },
      php: {
        method: 'senders->uploadProfilePicture',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->senders->uploadProfilePicture(\n  'senderId',\n  imageURL: 'https://example.com/profile.jpg',\n  mimeType: 'image/jpeg',\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'senders.upload_profile_picture',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.senders.upload_profile_picture(\n    sender_id="senderId",\n    image_url="https://example.com/profile.jpg",\n    mime_type="image/jpeg",\n)\nprint(response.profile)',
      },
      ruby: {
        method: 'senders.upload_profile_picture',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresponse = zavudev.senders.upload_profile_picture(\n  "senderId",\n  image_url: "https://example.com/profile.jpg",\n  mime_type: :"image/jpeg"\n)\n\nputs(response)',
      },
      typescript: {
        method: 'client.senders.uploadProfilePicture',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.senders.uploadProfilePicture('senderId', {\n  imageUrl: 'https://example.com/profile.jpg',\n  mimeType: 'image/jpeg',\n});\n\nconsole.log(response.profile);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/senders/{senderId}/agent',
    httpMethod: 'get',
    summary: 'Get agent',
    description: 'Get the AI agent configuration for a sender.',
    stainlessPath: '(resource) senders.agent > (method) retrieve',
    qualified: 'client.senders.agent.retrieve',
    params: ['senderId: string;'],
    response:
      '{ agent: { id: string; createdAt: string; enabled: boolean; model: string; name: string; provider: agent_provider; senderId: string; systemPrompt: string; updatedAt: string; contextWindowMessages?: number; includeContactMetadata?: boolean; maxTokens?: number; stats?: object; temperature?: number; triggerOnChannels?: string[]; triggerOnMessageTypes?: string[]; }; }',
    markdown:
      "## retrieve\n\n`client.senders.agent.retrieve(senderId: string): { agent: agent; }`\n\n**get** `/v1/senders/{senderId}/agent`\n\nGet the AI agent configuration for a sender.\n\n### Parameters\n\n- `senderId: string`\n\n### Returns\n\n- `{ agent: { id: string; createdAt: string; enabled: boolean; model: string; name: string; provider: agent_provider; senderId: string; systemPrompt: string; updatedAt: string; contextWindowMessages?: number; includeContactMetadata?: boolean; maxTokens?: number; stats?: object; temperature?: number; triggerOnChannels?: string[]; triggerOnMessageTypes?: string[]; }; }`\n\n  - `agent: { id: string; createdAt: string; enabled: boolean; model: string; name: string; provider: 'openai' | 'anthropic' | 'google' | 'mistral' | 'zavu'; senderId: string; systemPrompt: string; updatedAt: string; contextWindowMessages?: number; includeContactMetadata?: boolean; maxTokens?: number; stats?: { totalCost?: number; totalInvocations?: number; totalTokensUsed?: number; }; temperature?: number; triggerOnChannels?: string[]; triggerOnMessageTypes?: string[]; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst agentResponse = await client.senders.agent.retrieve('senderId');\n\nconsole.log(agentResponse);\n```",
    perLanguage: {
      cli: {
        method: 'agent retrieve',
        example: "zavudev senders:agent retrieve \\\n  --api-key 'My API Key' \\\n  --sender-id senderId",
      },
      go: {
        method: 'client.Senders.Agent.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tagentResponse, err := client.Senders.Agent.Get(context.TODO(), "senderId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", agentResponse.Agent)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'senders->agent->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$agentResponse = $client->senders->agent->retrieve('senderId');\n\nvar_dump($agentResponse);",
      },
      python: {
        method: 'senders.agent.retrieve',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nagent_response = client.senders.agent.retrieve(\n    "senderId",\n)\nprint(agent_response.agent)',
      },
      ruby: {
        method: 'senders.agent.retrieve',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nagent_response = zavudev.senders.agent.retrieve("senderId")\n\nputs(agent_response)',
      },
      typescript: {
        method: 'client.senders.agent.retrieve',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst agentResponse = await client.senders.agent.retrieve('senderId');\n\nconsole.log(agentResponse.agent);",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/senders/{senderId}/agent',
    httpMethod: 'post',
    summary: 'Create agent',
    description: 'Create an AI agent for a sender. Each sender can have at most one agent.',
    stainlessPath: '(resource) senders.agent > (method) create',
    qualified: 'client.senders.agent.create',
    params: [
      'senderId: string;',
      'model: string;',
      'name: string;',
      "provider: 'openai' | 'anthropic' | 'google' | 'mistral' | 'zavu';",
      'systemPrompt: string;',
      'apiKey?: string;',
      'contextWindowMessages?: number;',
      'includeContactMetadata?: boolean;',
      'maxTokens?: number;',
      'temperature?: number;',
      'triggerOnChannels?: string[];',
      'triggerOnMessageTypes?: string[];',
    ],
    response:
      '{ agent: { id: string; createdAt: string; enabled: boolean; model: string; name: string; provider: agent_provider; senderId: string; systemPrompt: string; updatedAt: string; contextWindowMessages?: number; includeContactMetadata?: boolean; maxTokens?: number; stats?: object; temperature?: number; triggerOnChannels?: string[]; triggerOnMessageTypes?: string[]; }; }',
    markdown:
      "## create\n\n`client.senders.agent.create(senderId: string, model: string, name: string, provider: 'openai' | 'anthropic' | 'google' | 'mistral' | 'zavu', systemPrompt: string, apiKey?: string, contextWindowMessages?: number, includeContactMetadata?: boolean, maxTokens?: number, temperature?: number, triggerOnChannels?: string[], triggerOnMessageTypes?: string[]): { agent: agent; }`\n\n**post** `/v1/senders/{senderId}/agent`\n\nCreate an AI agent for a sender. Each sender can have at most one agent.\n\n### Parameters\n\n- `senderId: string`\n\n- `model: string`\n\n- `name: string`\n\n- `provider: 'openai' | 'anthropic' | 'google' | 'mistral' | 'zavu'`\n  LLM provider for the AI agent.\n\n- `systemPrompt: string`\n\n- `apiKey?: string`\n  API key for the LLM provider. Required unless provider is 'zavu'.\n\n- `contextWindowMessages?: number`\n\n- `includeContactMetadata?: boolean`\n\n- `maxTokens?: number`\n\n- `temperature?: number`\n\n- `triggerOnChannels?: string[]`\n\n- `triggerOnMessageTypes?: string[]`\n\n### Returns\n\n- `{ agent: { id: string; createdAt: string; enabled: boolean; model: string; name: string; provider: agent_provider; senderId: string; systemPrompt: string; updatedAt: string; contextWindowMessages?: number; includeContactMetadata?: boolean; maxTokens?: number; stats?: object; temperature?: number; triggerOnChannels?: string[]; triggerOnMessageTypes?: string[]; }; }`\n\n  - `agent: { id: string; createdAt: string; enabled: boolean; model: string; name: string; provider: 'openai' | 'anthropic' | 'google' | 'mistral' | 'zavu'; senderId: string; systemPrompt: string; updatedAt: string; contextWindowMessages?: number; includeContactMetadata?: boolean; maxTokens?: number; stats?: { totalCost?: number; totalInvocations?: number; totalTokensUsed?: number; }; temperature?: number; triggerOnChannels?: string[]; triggerOnMessageTypes?: string[]; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst agentResponse = await client.senders.agent.create('senderId', {\n  model: 'gpt-4o-mini',\n  name: 'Customer Support',\n  provider: 'openai',\n  systemPrompt: 'You are a helpful customer support agent. Be friendly and concise.',\n});\n\nconsole.log(agentResponse);\n```",
    perLanguage: {
      cli: {
        method: 'agent create',
        example:
          "zavudev senders:agent create \\\n  --api-key 'My API Key' \\\n  --sender-id senderId \\\n  --model gpt-4o-mini \\\n  --name 'Customer Support' \\\n  --provider openai \\\n  --system-prompt 'You are a helpful customer support agent. Be friendly and concise.'",
      },
      go: {
        method: 'client.Senders.Agent.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tagentResponse, err := client.Senders.Agent.New(\n\t\tcontext.TODO(),\n\t\t"senderId",\n\t\tzavudev.SenderAgentNewParams{\n\t\t\tModel:        "gpt-4o-mini",\n\t\t\tName:         "Customer Support",\n\t\t\tProvider:     zavudev.AgentProviderOpenAI,\n\t\t\tSystemPrompt: "You are a helpful customer support agent. Be friendly and concise.",\n\t\t\tAPIKey:       zavudev.String("sk-..."),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", agentResponse.Agent)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY" \\\n    -d \'{\n          "model": "gpt-4o-mini",\n          "name": "Customer Support",\n          "provider": "openai",\n          "systemPrompt": "You are a helpful customer support agent. Be friendly and concise."\n        }\'',
      },
      php: {
        method: 'senders->agent->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$agentResponse = $client->senders->agent->create(\n  'senderId',\n  model: 'gpt-4o-mini',\n  name: 'Customer Support',\n  provider: AgentProvider::OPENAI,\n  systemPrompt: 'You are a helpful customer support agent. Be friendly and concise.',\n  apiKey: 'sk-...',\n  contextWindowMessages: 1,\n  includeContactMetadata: true,\n  maxTokens: 1,\n  temperature: 0,\n  triggerOnChannels: ['string'],\n  triggerOnMessageTypes: ['string'],\n);\n\nvar_dump($agentResponse);",
      },
      python: {
        method: 'senders.agent.create',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nagent_response = client.senders.agent.create(\n    sender_id="senderId",\n    model="gpt-4o-mini",\n    name="Customer Support",\n    provider="openai",\n    system_prompt="You are a helpful customer support agent. Be friendly and concise.",\n    api_key="sk-...",\n)\nprint(agent_response.agent)',
      },
      ruby: {
        method: 'senders.agent.create',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nagent_response = zavudev.senders.agent.create(\n  "senderId",\n  model: "gpt-4o-mini",\n  name: "Customer Support",\n  provider: :openai,\n  system_prompt: "You are a helpful customer support agent. Be friendly and concise."\n)\n\nputs(agent_response)',
      },
      typescript: {
        method: 'client.senders.agent.create',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst agentResponse = await client.senders.agent.create('senderId', {\n  model: 'gpt-4o-mini',\n  name: 'Customer Support',\n  provider: 'openai',\n  systemPrompt: 'You are a helpful customer support agent. Be friendly and concise.',\n  apiKey: 'sk-...',\n});\n\nconsole.log(agentResponse.agent);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/senders/{senderId}/agent',
    httpMethod: 'patch',
    summary: 'Update agent',
    description: "Update an AI agent's configuration.",
    stainlessPath: '(resource) senders.agent > (method) update',
    qualified: 'client.senders.agent.update',
    params: [
      'senderId: string;',
      'apiKey?: string;',
      'contextWindowMessages?: number;',
      'enabled?: boolean;',
      'includeContactMetadata?: boolean;',
      'maxTokens?: number;',
      'model?: string;',
      'name?: string;',
      "provider?: 'openai' | 'anthropic' | 'google' | 'mistral' | 'zavu';",
      'systemPrompt?: string;',
      'temperature?: number;',
      'triggerOnChannels?: string[];',
      'triggerOnMessageTypes?: string[];',
    ],
    response:
      '{ agent: { id: string; createdAt: string; enabled: boolean; model: string; name: string; provider: agent_provider; senderId: string; systemPrompt: string; updatedAt: string; contextWindowMessages?: number; includeContactMetadata?: boolean; maxTokens?: number; stats?: object; temperature?: number; triggerOnChannels?: string[]; triggerOnMessageTypes?: string[]; }; }',
    markdown:
      "## update\n\n`client.senders.agent.update(senderId: string, apiKey?: string, contextWindowMessages?: number, enabled?: boolean, includeContactMetadata?: boolean, maxTokens?: number, model?: string, name?: string, provider?: 'openai' | 'anthropic' | 'google' | 'mistral' | 'zavu', systemPrompt?: string, temperature?: number, triggerOnChannels?: string[], triggerOnMessageTypes?: string[]): { agent: agent; }`\n\n**patch** `/v1/senders/{senderId}/agent`\n\nUpdate an AI agent's configuration.\n\n### Parameters\n\n- `senderId: string`\n\n- `apiKey?: string`\n\n- `contextWindowMessages?: number`\n\n- `enabled?: boolean`\n\n- `includeContactMetadata?: boolean`\n\n- `maxTokens?: number`\n\n- `model?: string`\n\n- `name?: string`\n\n- `provider?: 'openai' | 'anthropic' | 'google' | 'mistral' | 'zavu'`\n  LLM provider for the AI agent.\n\n- `systemPrompt?: string`\n\n- `temperature?: number`\n\n- `triggerOnChannels?: string[]`\n\n- `triggerOnMessageTypes?: string[]`\n\n### Returns\n\n- `{ agent: { id: string; createdAt: string; enabled: boolean; model: string; name: string; provider: agent_provider; senderId: string; systemPrompt: string; updatedAt: string; contextWindowMessages?: number; includeContactMetadata?: boolean; maxTokens?: number; stats?: object; temperature?: number; triggerOnChannels?: string[]; triggerOnMessageTypes?: string[]; }; }`\n\n  - `agent: { id: string; createdAt: string; enabled: boolean; model: string; name: string; provider: 'openai' | 'anthropic' | 'google' | 'mistral' | 'zavu'; senderId: string; systemPrompt: string; updatedAt: string; contextWindowMessages?: number; includeContactMetadata?: boolean; maxTokens?: number; stats?: { totalCost?: number; totalInvocations?: number; totalTokensUsed?: number; }; temperature?: number; triggerOnChannels?: string[]; triggerOnMessageTypes?: string[]; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst agentResponse = await client.senders.agent.update('senderId');\n\nconsole.log(agentResponse);\n```",
    perLanguage: {
      cli: {
        method: 'agent update',
        example: "zavudev senders:agent update \\\n  --api-key 'My API Key' \\\n  --sender-id senderId",
      },
      go: {
        method: 'client.Senders.Agent.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tagentResponse, err := client.Senders.Agent.Update(\n\t\tcontext.TODO(),\n\t\t"senderId",\n\t\tzavudev.SenderAgentUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", agentResponse.Agent)\n}\n',
      },
      http: {
        example:
          "curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $ZAVUDEV_API_KEY\" \\\n    -d '{}'",
      },
      php: {
        method: 'senders->agent->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$agentResponse = $client->senders->agent->update(\n  'senderId',\n  apiKey: 'apiKey',\n  contextWindowMessages: 1,\n  enabled: true,\n  includeContactMetadata: true,\n  maxTokens: 1,\n  model: 'model',\n  name: 'name',\n  provider: AgentProvider::OPENAI,\n  systemPrompt: 'systemPrompt',\n  temperature: 0,\n  triggerOnChannels: ['string'],\n  triggerOnMessageTypes: ['string'],\n);\n\nvar_dump($agentResponse);",
      },
      python: {
        method: 'senders.agent.update',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nagent_response = client.senders.agent.update(\n    sender_id="senderId",\n)\nprint(agent_response.agent)',
      },
      ruby: {
        method: 'senders.agent.update',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nagent_response = zavudev.senders.agent.update("senderId")\n\nputs(agent_response)',
      },
      typescript: {
        method: 'client.senders.agent.update',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst agentResponse = await client.senders.agent.update('senderId');\n\nconsole.log(agentResponse.agent);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/senders/{senderId}/agent',
    httpMethod: 'delete',
    summary: 'Delete agent',
    description: 'Delete an AI agent.',
    stainlessPath: '(resource) senders.agent > (method) delete',
    qualified: 'client.senders.agent.delete',
    params: ['senderId: string;'],
    markdown:
      "## delete\n\n`client.senders.agent.delete(senderId: string): void`\n\n**delete** `/v1/senders/{senderId}/agent`\n\nDelete an AI agent.\n\n### Parameters\n\n- `senderId: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nawait client.senders.agent.delete('senderId')\n```",
    perLanguage: {
      cli: {
        method: 'agent delete',
        example: "zavudev senders:agent delete \\\n  --api-key 'My API Key' \\\n  --sender-id senderId",
      },
      go: {
        method: 'client.Senders.Agent.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Senders.Agent.Delete(context.TODO(), "senderId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent \\\n    -X DELETE \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'senders->agent->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$result = $client->senders->agent->delete('senderId');\n\nvar_dump($result);",
      },
      python: {
        method: 'senders.agent.delete',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nclient.senders.agent.delete(\n    "senderId",\n)',
      },
      ruby: {
        method: 'senders.agent.delete',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresult = zavudev.senders.agent.delete("senderId")\n\nputs(result)',
      },
      typescript: {
        method: 'client.senders.agent.delete',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.senders.agent.delete('senderId');",
      },
    },
  },
  {
    name: 'stats',
    endpoint: '/v1/senders/{senderId}/agent/stats',
    httpMethod: 'get',
    summary: 'Get agent statistics',
    description: 'Get statistics for an AI agent including invocations, tokens, and costs.',
    stainlessPath: '(resource) senders.agent > (method) stats',
    qualified: 'client.senders.agent.stats',
    params: ['senderId: string;'],
    response:
      '{ errorCount: number; successCount: number; totalCost: number; totalInvocations: number; totalTokensUsed: number; avgLatencyMs?: number; }',
    markdown:
      "## stats\n\n`client.senders.agent.stats(senderId: string): { errorCount: number; successCount: number; totalCost: number; totalInvocations: number; totalTokensUsed: number; avgLatencyMs?: number; }`\n\n**get** `/v1/senders/{senderId}/agent/stats`\n\nGet statistics for an AI agent including invocations, tokens, and costs.\n\n### Parameters\n\n- `senderId: string`\n\n### Returns\n\n- `{ errorCount: number; successCount: number; totalCost: number; totalInvocations: number; totalTokensUsed: number; avgLatencyMs?: number; }`\n\n  - `errorCount: number`\n  - `successCount: number`\n  - `totalCost: number`\n  - `totalInvocations: number`\n  - `totalTokensUsed: number`\n  - `avgLatencyMs?: number`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst agentStats = await client.senders.agent.stats('senderId');\n\nconsole.log(agentStats);\n```",
    perLanguage: {
      cli: {
        method: 'agent stats',
        example: "zavudev senders:agent stats \\\n  --api-key 'My API Key' \\\n  --sender-id senderId",
      },
      go: {
        method: 'client.Senders.Agent.Stats',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tagentStats, err := client.Senders.Agent.Stats(context.TODO(), "senderId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", agentStats.ErrorCount)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent/stats \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'senders->agent->stats',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$agentStats = $client->senders->agent->stats('senderId');\n\nvar_dump($agentStats);",
      },
      python: {
        method: 'senders.agent.stats',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nagent_stats = client.senders.agent.stats(\n    "senderId",\n)\nprint(agent_stats.error_count)',
      },
      ruby: {
        method: 'senders.agent.stats',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nagent_stats = zavudev.senders.agent.stats("senderId")\n\nputs(agent_stats)',
      },
      typescript: {
        method: 'client.senders.agent.stats',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst agentStats = await client.senders.agent.stats('senderId');\n\nconsole.log(agentStats.errorCount);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/senders/{senderId}/agent/executions',
    httpMethod: 'get',
    summary: 'List agent executions',
    description: 'List recent agent executions with pagination.',
    stainlessPath: '(resource) senders.agent.executions > (method) list',
    qualified: 'client.senders.agent.executions.list',
    params: [
      'senderId: string;',
      'cursor?: string;',
      'limit?: number;',
      "status?: 'success' | 'error' | 'filtered' | 'rate_limited' | 'balance_insufficient';",
    ],
    response:
      "{ id: string; agentId: string; cost: number; createdAt: string; inputTokens: number; latencyMs: number; outputTokens: number; status: 'success' | 'error' | 'filtered' | 'rate_limited' | 'balance_insufficient'; errorMessage?: string; inboundMessageId?: string; responseMessageId?: string; responseText?: string; }",
    markdown:
      "## list\n\n`client.senders.agent.executions.list(senderId: string, cursor?: string, limit?: number, status?: 'success' | 'error' | 'filtered' | 'rate_limited' | 'balance_insufficient'): { id: string; agentId: string; cost: number; createdAt: string; inputTokens: number; latencyMs: number; outputTokens: number; status: agent_execution_status; errorMessage?: string; inboundMessageId?: string; responseMessageId?: string; responseText?: string; }`\n\n**get** `/v1/senders/{senderId}/agent/executions`\n\nList recent agent executions with pagination.\n\n### Parameters\n\n- `senderId: string`\n\n- `cursor?: string`\n\n- `limit?: number`\n\n- `status?: 'success' | 'error' | 'filtered' | 'rate_limited' | 'balance_insufficient'`\n  Status of an agent execution.\n\n### Returns\n\n- `{ id: string; agentId: string; cost: number; createdAt: string; inputTokens: number; latencyMs: number; outputTokens: number; status: 'success' | 'error' | 'filtered' | 'rate_limited' | 'balance_insufficient'; errorMessage?: string; inboundMessageId?: string; responseMessageId?: string; responseText?: string; }`\n\n  - `id: string`\n  - `agentId: string`\n  - `cost: number`\n  - `createdAt: string`\n  - `inputTokens: number`\n  - `latencyMs: number`\n  - `outputTokens: number`\n  - `status: 'success' | 'error' | 'filtered' | 'rate_limited' | 'balance_insufficient'`\n  - `errorMessage?: string`\n  - `inboundMessageId?: string`\n  - `responseMessageId?: string`\n  - `responseText?: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\n// Automatically fetches more pages as needed.\nfor await (const agentExecution of client.senders.agent.executions.list('senderId')) {\n  console.log(agentExecution);\n}\n```",
    perLanguage: {
      cli: {
        method: 'executions list',
        example:
          "zavudev senders:agent:executions list \\\n  --api-key 'My API Key' \\\n  --sender-id senderId",
      },
      go: {
        method: 'client.Senders.Agent.Executions.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Senders.Agent.Executions.List(\n\t\tcontext.TODO(),\n\t\t"senderId",\n\t\tzavudev.SenderAgentExecutionListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent/executions \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'senders->agent->executions->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->senders->agent->executions->list(\n  'senderId',\n  cursor: 'cursor',\n  limit: 100,\n  status: AgentExecutionStatus::SUCCESS,\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'senders.agent.executions.list',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\npage = client.senders.agent.executions.list(\n    sender_id="senderId",\n)\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'senders.agent.executions.list',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\npage = zavudev.senders.agent.executions.list("senderId")\n\nputs(page)',
      },
      typescript: {
        method: 'client.senders.agent.executions.list',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const agentExecution of client.senders.agent.executions.list('senderId')) {\n  console.log(agentExecution.id);\n}",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/senders/{senderId}/agent/flows',
    httpMethod: 'get',
    summary: 'List flows',
    description: 'List flows for an agent.',
    stainlessPath: '(resource) senders.agent.flows > (method) list',
    qualified: 'client.senders.agent.flows.list',
    params: ['senderId: string;', 'cursor?: string;', 'enabled?: boolean;', 'limit?: number;'],
    response:
      "{ id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: { id: string; config: object; type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer'; nextStepId?: string; }[]; trigger: { type: 'keyword' | 'intent' | 'always' | 'manual'; intent?: string; keywords?: string[]; }; updatedAt: string; description?: string; }",
    markdown:
      "## list\n\n`client.senders.agent.flows.list(senderId: string, cursor?: string, enabled?: boolean, limit?: number): { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: flow_step[]; trigger: flow_trigger; updatedAt: string; description?: string; }`\n\n**get** `/v1/senders/{senderId}/agent/flows`\n\nList flows for an agent.\n\n### Parameters\n\n- `senderId: string`\n\n- `cursor?: string`\n\n- `enabled?: boolean`\n\n- `limit?: number`\n\n### Returns\n\n- `{ id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: { id: string; config: object; type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer'; nextStepId?: string; }[]; trigger: { type: 'keyword' | 'intent' | 'always' | 'manual'; intent?: string; keywords?: string[]; }; updatedAt: string; description?: string; }`\n\n  - `id: string`\n  - `agentId: string`\n  - `createdAt: string`\n  - `enabled: boolean`\n  - `name: string`\n  - `priority: number`\n  - `steps: { id: string; config: object; type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer'; nextStepId?: string; }[]`\n  - `trigger: { type: 'keyword' | 'intent' | 'always' | 'manual'; intent?: string; keywords?: string[]; }`\n  - `updatedAt: string`\n  - `description?: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\n// Automatically fetches more pages as needed.\nfor await (const agentFlow of client.senders.agent.flows.list('senderId')) {\n  console.log(agentFlow);\n}\n```",
    perLanguage: {
      cli: {
        method: 'flows list',
        example: "zavudev senders:agent:flows list \\\n  --api-key 'My API Key' \\\n  --sender-id senderId",
      },
      go: {
        method: 'client.Senders.Agent.Flows.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Senders.Agent.Flows.List(\n\t\tcontext.TODO(),\n\t\t"senderId",\n\t\tzavudev.SenderAgentFlowListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent/flows \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'senders->agent->flows->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->senders->agent->flows->list(\n  'senderId', cursor: 'cursor', enabled: true, limit: 100\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'senders.agent.flows.list',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\npage = client.senders.agent.flows.list(\n    sender_id="senderId",\n)\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'senders.agent.flows.list',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\npage = zavudev.senders.agent.flows.list("senderId")\n\nputs(page)',
      },
      typescript: {
        method: 'client.senders.agent.flows.list',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const agentFlow of client.senders.agent.flows.list('senderId')) {\n  console.log(agentFlow.id);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/senders/{senderId}/agent/flows',
    httpMethod: 'post',
    summary: 'Create flow',
    description: 'Create a new flow for an agent.',
    stainlessPath: '(resource) senders.agent.flows > (method) create',
    qualified: 'client.senders.agent.flows.create',
    params: [
      'senderId: string;',
      'name: string;',
      "steps: { id: string; config: object; type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer'; nextStepId?: string; }[];",
      "trigger: { type: 'keyword' | 'intent' | 'always' | 'manual'; intent?: string; keywords?: string[]; };",
      'description?: string;',
      'enabled?: boolean;',
      'priority?: number;',
    ],
    response:
      '{ flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: flow_step[]; trigger: flow_trigger; updatedAt: string; description?: string; }; }',
    markdown:
      "## create\n\n`client.senders.agent.flows.create(senderId: string, name: string, steps: { id: string; config: object; type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer'; nextStepId?: string; }[], trigger: { type: 'keyword' | 'intent' | 'always' | 'manual'; intent?: string; keywords?: string[]; }, description?: string, enabled?: boolean, priority?: number): { flow: agent_flow; }`\n\n**post** `/v1/senders/{senderId}/agent/flows`\n\nCreate a new flow for an agent.\n\n### Parameters\n\n- `senderId: string`\n\n- `name: string`\n\n- `steps: { id: string; config: object; type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer'; nextStepId?: string; }[]`\n\n- `trigger: { type: 'keyword' | 'intent' | 'always' | 'manual'; intent?: string; keywords?: string[]; }`\n  - `type: 'keyword' | 'intent' | 'always' | 'manual'`\n    Type of trigger for a flow.\n  - `intent?: string`\n    Intent that triggers the flow (for intent type).\n  - `keywords?: string[]`\n    Keywords that trigger the flow (for keyword type).\n\n- `description?: string`\n\n- `enabled?: boolean`\n\n- `priority?: number`\n\n### Returns\n\n- `{ flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: flow_step[]; trigger: flow_trigger; updatedAt: string; description?: string; }; }`\n\n  - `flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: { id: string; config: object; type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer'; nextStepId?: string; }[]; trigger: { type: 'keyword' | 'intent' | 'always' | 'manual'; intent?: string; keywords?: string[]; }; updatedAt: string; description?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst flow = await client.senders.agent.flows.create('senderId', {\n  name: 'Lead Capture',\n  steps: [{\n  id: 'welcome',\n  config: { text: 'bar' },\n  type: 'message',\n}, {\n  id: 'ask_name',\n  config: { variable: 'bar', prompt: 'bar' },\n  type: 'collect',\n}],\n  trigger: { type: 'keyword' },\n});\n\nconsole.log(flow);\n```",
    perLanguage: {
      cli: {
        method: 'flows create',
        example:
          "zavudev senders:agent:flows create \\\n  --api-key 'My API Key' \\\n  --sender-id senderId \\\n  --name 'Lead Capture' \\\n  --step '{id: welcome, config: {text: bar}, type: message}' \\\n  --step '{id: ask_name, config: {variable: bar, prompt: bar}, type: collect}' \\\n  --trigger '{type: keyword}'",
      },
      go: {
        method: 'client.Senders.Agent.Flows.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tflow, err := client.Senders.Agent.Flows.New(\n\t\tcontext.TODO(),\n\t\t"senderId",\n\t\tzavudev.SenderAgentFlowNewParams{\n\t\t\tName: "Lead Capture",\n\t\t\tSteps: []zavudev.FlowStepParam{{\n\t\t\t\tID:   "welcome",\n\t\t\t\tType: zavudev.FlowStepTypeMessage,\n\t\t\t\tConfig: map[string]any{\n\t\t\t\t\t"text": "Thanks for your interest! Let me get some info.",\n\t\t\t\t},\n\t\t\t\tNextStepID: zavudev.String("ask_name"),\n\t\t\t}, {\n\t\t\t\tID:   "ask_name",\n\t\t\t\tType: zavudev.FlowStepTypeCollect,\n\t\t\t\tConfig: map[string]any{\n\t\t\t\t\t"variable": "name",\n\t\t\t\t\t"prompt":   "What\'s your name?",\n\t\t\t\t},\n\t\t\t}},\n\t\t\tTrigger: zavudev.FlowTriggerParam{\n\t\t\t\tType:     zavudev.FlowTriggerTypeKeyword,\n\t\t\t\tKeywords: []string{"info", "pricing", "demo"},\n\t\t\t},\n\t\t\tDescription: zavudev.String("Capture lead information"),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", flow.Flow)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent/flows \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY" \\\n    -d \'{\n          "name": "Lead Capture",\n          "steps": [\n            {\n              "id": "welcome",\n              "config": {\n                "text": "bar"\n              },\n              "type": "message",\n              "nextStepId": "ask_name"\n            },\n            {\n              "id": "ask_name",\n              "config": {\n                "variable": "bar",\n                "prompt": "bar"\n              },\n              "type": "collect"\n            }\n          ],\n          "trigger": {\n            "type": "keyword",\n            "keywords": [\n              "info",\n              "pricing",\n              "demo"\n            ]\n          }\n        }\'',
      },
      php: {
        method: 'senders->agent->flows->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$flow = $client->senders->agent->flows->create(\n  'senderId',\n  name: 'Lead Capture',\n  steps: [\n    [\n      'id' => 'welcome',\n      'config' => ['text' => 'bar'],\n      'type' => 'message',\n      'nextStepID' => 'ask_name',\n    ],\n    [\n      'id' => 'ask_name',\n      'config' => ['variable' => 'bar', 'prompt' => 'bar'],\n      'type' => 'collect',\n      'nextStepID' => 'nextStepId',\n    ],\n  ],\n  trigger: [\n    'type' => 'keyword',\n    'intent' => 'intent',\n    'keywords' => ['info', 'pricing', 'demo'],\n  ],\n  description: 'Capture lead information',\n  enabled: true,\n  priority: 0,\n);\n\nvar_dump($flow);",
      },
      python: {
        method: 'senders.agent.flows.create',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nflow = client.senders.agent.flows.create(\n    sender_id="senderId",\n    name="Lead Capture",\n    steps=[{\n        "id": "welcome",\n        "type": "message",\n        "config": {\n            "text": "Thanks for your interest! Let me get some info."\n        },\n        "next_step_id": "ask_name",\n    }, {\n        "id": "ask_name",\n        "type": "collect",\n        "config": {\n            "variable": "name",\n            "prompt": "What\'s your name?",\n        },\n    }],\n    trigger={\n        "type": "keyword",\n        "keywords": ["info", "pricing", "demo"],\n    },\n    description="Capture lead information",\n)\nprint(flow.flow)',
      },
      ruby: {
        method: 'senders.agent.flows.create',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nflow = zavudev.senders.agent.flows.create(\n  "senderId",\n  name: "Lead Capture",\n  steps: [\n    {id: "welcome", config: {text: "bar"}, type: :message},\n    {id: "ask_name", config: {variable: "bar", prompt: "bar"}, type: :collect}\n  ],\n  trigger: {type: :keyword}\n)\n\nputs(flow)',
      },
      typescript: {
        method: 'client.senders.agent.flows.create',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst flow = await client.senders.agent.flows.create('senderId', {\n  name: 'Lead Capture',\n  steps: [\n    {\n      id: 'welcome',\n      type: 'message',\n      config: { text: 'Thanks for your interest! Let me get some info.' },\n      nextStepId: 'ask_name',\n    },\n    {\n      id: 'ask_name',\n      type: 'collect',\n      config: { variable: 'name', prompt: \"What's your name?\" },\n    },\n  ],\n  trigger: { type: 'keyword', keywords: ['info', 'pricing', 'demo'] },\n  description: 'Capture lead information',\n});\n\nconsole.log(flow.flow);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/senders/{senderId}/agent/flows/{flowId}',
    httpMethod: 'get',
    summary: 'Get flow',
    description: 'Get a specific flow.',
    stainlessPath: '(resource) senders.agent.flows > (method) retrieve',
    qualified: 'client.senders.agent.flows.retrieve',
    params: ['senderId: string;', 'flowId: string;'],
    response:
      '{ flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: flow_step[]; trigger: flow_trigger; updatedAt: string; description?: string; }; }',
    markdown:
      "## retrieve\n\n`client.senders.agent.flows.retrieve(senderId: string, flowId: string): { flow: agent_flow; }`\n\n**get** `/v1/senders/{senderId}/agent/flows/{flowId}`\n\nGet a specific flow.\n\n### Parameters\n\n- `senderId: string`\n\n- `flowId: string`\n\n### Returns\n\n- `{ flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: flow_step[]; trigger: flow_trigger; updatedAt: string; description?: string; }; }`\n\n  - `flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: { id: string; config: object; type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer'; nextStepId?: string; }[]; trigger: { type: 'keyword' | 'intent' | 'always' | 'manual'; intent?: string; keywords?: string[]; }; updatedAt: string; description?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst flow = await client.senders.agent.flows.retrieve('flowId', { senderId: 'senderId' });\n\nconsole.log(flow);\n```",
    perLanguage: {
      cli: {
        method: 'flows retrieve',
        example:
          "zavudev senders:agent:flows retrieve \\\n  --api-key 'My API Key' \\\n  --sender-id senderId \\\n  --flow-id flowId",
      },
      go: {
        method: 'client.Senders.Agent.Flows.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tflow, err := client.Senders.Agent.Flows.Get(\n\t\tcontext.TODO(),\n\t\t"flowId",\n\t\tzavudev.SenderAgentFlowGetParams{\n\t\t\tSenderID: "senderId",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", flow.Flow)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent/flows/$FLOW_ID \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'senders->agent->flows->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$flow = $client->senders->agent->flows->retrieve(\n  'flowId', senderID: 'senderId'\n);\n\nvar_dump($flow);",
      },
      python: {
        method: 'senders.agent.flows.retrieve',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nflow = client.senders.agent.flows.retrieve(\n    flow_id="flowId",\n    sender_id="senderId",\n)\nprint(flow.flow)',
      },
      ruby: {
        method: 'senders.agent.flows.retrieve',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nflow = zavudev.senders.agent.flows.retrieve("flowId", sender_id: "senderId")\n\nputs(flow)',
      },
      typescript: {
        method: 'client.senders.agent.flows.retrieve',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst flow = await client.senders.agent.flows.retrieve('flowId', { senderId: 'senderId' });\n\nconsole.log(flow.flow);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/senders/{senderId}/agent/flows/{flowId}',
    httpMethod: 'patch',
    summary: 'Update flow',
    description: 'Update a flow.',
    stainlessPath: '(resource) senders.agent.flows > (method) update',
    qualified: 'client.senders.agent.flows.update',
    params: [
      'senderId: string;',
      'flowId: string;',
      'description?: string;',
      'enabled?: boolean;',
      'name?: string;',
      'priority?: number;',
      "steps?: { id: string; config: object; type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer'; nextStepId?: string; }[];",
      "trigger?: { type: 'keyword' | 'intent' | 'always' | 'manual'; intent?: string; keywords?: string[]; };",
    ],
    response:
      '{ flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: flow_step[]; trigger: flow_trigger; updatedAt: string; description?: string; }; }',
    markdown:
      "## update\n\n`client.senders.agent.flows.update(senderId: string, flowId: string, description?: string, enabled?: boolean, name?: string, priority?: number, steps?: { id: string; config: object; type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer'; nextStepId?: string; }[], trigger?: { type: 'keyword' | 'intent' | 'always' | 'manual'; intent?: string; keywords?: string[]; }): { flow: agent_flow; }`\n\n**patch** `/v1/senders/{senderId}/agent/flows/{flowId}`\n\nUpdate a flow.\n\n### Parameters\n\n- `senderId: string`\n\n- `flowId: string`\n\n- `description?: string`\n\n- `enabled?: boolean`\n\n- `name?: string`\n\n- `priority?: number`\n\n- `steps?: { id: string; config: object; type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer'; nextStepId?: string; }[]`\n\n- `trigger?: { type: 'keyword' | 'intent' | 'always' | 'manual'; intent?: string; keywords?: string[]; }`\n  - `type: 'keyword' | 'intent' | 'always' | 'manual'`\n    Type of trigger for a flow.\n  - `intent?: string`\n    Intent that triggers the flow (for intent type).\n  - `keywords?: string[]`\n    Keywords that trigger the flow (for keyword type).\n\n### Returns\n\n- `{ flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: flow_step[]; trigger: flow_trigger; updatedAt: string; description?: string; }; }`\n\n  - `flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: { id: string; config: object; type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer'; nextStepId?: string; }[]; trigger: { type: 'keyword' | 'intent' | 'always' | 'manual'; intent?: string; keywords?: string[]; }; updatedAt: string; description?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst flow = await client.senders.agent.flows.update('flowId', { senderId: 'senderId' });\n\nconsole.log(flow);\n```",
    perLanguage: {
      cli: {
        method: 'flows update',
        example:
          "zavudev senders:agent:flows update \\\n  --api-key 'My API Key' \\\n  --sender-id senderId \\\n  --flow-id flowId",
      },
      go: {
        method: 'client.Senders.Agent.Flows.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tflow, err := client.Senders.Agent.Flows.Update(\n\t\tcontext.TODO(),\n\t\t"flowId",\n\t\tzavudev.SenderAgentFlowUpdateParams{\n\t\t\tSenderID: "senderId",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", flow.Flow)\n}\n',
      },
      http: {
        example:
          "curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent/flows/$FLOW_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $ZAVUDEV_API_KEY\" \\\n    -d '{}'",
      },
      php: {
        method: 'senders->agent->flows->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$flow = $client->senders->agent->flows->update(\n  'flowId',\n  senderID: 'senderId',\n  description: 'description',\n  enabled: true,\n  name: 'name',\n  priority: 0,\n  steps: [\n    [\n      'id' => 'id',\n      'config' => ['foo' => 'bar'],\n      'type' => 'message',\n      'nextStepID' => 'nextStepId',\n    ],\n  ],\n  trigger: [\n    'type' => 'keyword', 'intent' => 'intent', 'keywords' => ['string']\n  ],\n);\n\nvar_dump($flow);",
      },
      python: {
        method: 'senders.agent.flows.update',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nflow = client.senders.agent.flows.update(\n    flow_id="flowId",\n    sender_id="senderId",\n)\nprint(flow.flow)',
      },
      ruby: {
        method: 'senders.agent.flows.update',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nflow = zavudev.senders.agent.flows.update("flowId", sender_id: "senderId")\n\nputs(flow)',
      },
      typescript: {
        method: 'client.senders.agent.flows.update',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst flow = await client.senders.agent.flows.update('flowId', { senderId: 'senderId' });\n\nconsole.log(flow.flow);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/senders/{senderId}/agent/flows/{flowId}',
    httpMethod: 'delete',
    summary: 'Delete flow',
    description: 'Delete a flow. Cannot delete flows with active sessions.',
    stainlessPath: '(resource) senders.agent.flows > (method) delete',
    qualified: 'client.senders.agent.flows.delete',
    params: ['senderId: string;', 'flowId: string;'],
    markdown:
      "## delete\n\n`client.senders.agent.flows.delete(senderId: string, flowId: string): void`\n\n**delete** `/v1/senders/{senderId}/agent/flows/{flowId}`\n\nDelete a flow. Cannot delete flows with active sessions.\n\n### Parameters\n\n- `senderId: string`\n\n- `flowId: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nawait client.senders.agent.flows.delete('flowId', { senderId: 'senderId' })\n```",
    perLanguage: {
      cli: {
        method: 'flows delete',
        example:
          "zavudev senders:agent:flows delete \\\n  --api-key 'My API Key' \\\n  --sender-id senderId \\\n  --flow-id flowId",
      },
      go: {
        method: 'client.Senders.Agent.Flows.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Senders.Agent.Flows.Delete(\n\t\tcontext.TODO(),\n\t\t"flowId",\n\t\tzavudev.SenderAgentFlowDeleteParams{\n\t\t\tSenderID: "senderId",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent/flows/$FLOW_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'senders->agent->flows->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$result = $client->senders->agent->flows->delete(\n  'flowId', senderID: 'senderId'\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'senders.agent.flows.delete',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nclient.senders.agent.flows.delete(\n    flow_id="flowId",\n    sender_id="senderId",\n)',
      },
      ruby: {
        method: 'senders.agent.flows.delete',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresult = zavudev.senders.agent.flows.delete("flowId", sender_id: "senderId")\n\nputs(result)',
      },
      typescript: {
        method: 'client.senders.agent.flows.delete',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.senders.agent.flows.delete('flowId', { senderId: 'senderId' });",
      },
    },
  },
  {
    name: 'duplicate',
    endpoint: '/v1/senders/{senderId}/agent/flows/{flowId}/duplicate',
    httpMethod: 'post',
    summary: 'Duplicate flow',
    description: 'Create a copy of an existing flow with a new name.',
    stainlessPath: '(resource) senders.agent.flows > (method) duplicate',
    qualified: 'client.senders.agent.flows.duplicate',
    params: ['senderId: string;', 'flowId: string;', 'newName: string;'],
    response:
      '{ flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: flow_step[]; trigger: flow_trigger; updatedAt: string; description?: string; }; }',
    markdown:
      "## duplicate\n\n`client.senders.agent.flows.duplicate(senderId: string, flowId: string, newName: string): { flow: agent_flow; }`\n\n**post** `/v1/senders/{senderId}/agent/flows/{flowId}/duplicate`\n\nCreate a copy of an existing flow with a new name.\n\n### Parameters\n\n- `senderId: string`\n\n- `flowId: string`\n\n- `newName: string`\n\n### Returns\n\n- `{ flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: flow_step[]; trigger: flow_trigger; updatedAt: string; description?: string; }; }`\n\n  - `flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: { id: string; config: object; type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer'; nextStepId?: string; }[]; trigger: { type: 'keyword' | 'intent' | 'always' | 'manual'; intent?: string; keywords?: string[]; }; updatedAt: string; description?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst response = await client.senders.agent.flows.duplicate('flowId', { senderId: 'senderId', newName: 'Lead Capture (Copy)' });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'flows duplicate',
        example:
          "zavudev senders:agent:flows duplicate \\\n  --api-key 'My API Key' \\\n  --sender-id senderId \\\n  --flow-id flowId \\\n  --new-name 'Lead Capture (Copy)'",
      },
      go: {
        method: 'client.Senders.Agent.Flows.Duplicate',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Senders.Agent.Flows.Duplicate(\n\t\tcontext.TODO(),\n\t\t"flowId",\n\t\tzavudev.SenderAgentFlowDuplicateParams{\n\t\t\tSenderID: "senderId",\n\t\t\tNewName:  "Lead Capture (Copy)",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Flow)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent/flows/$FLOW_ID/duplicate \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY" \\\n    -d \'{\n          "newName": "Lead Capture (Copy)"\n        }\'',
      },
      php: {
        method: 'senders->agent->flows->duplicate',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->senders->agent->flows->duplicate(\n  'flowId', senderID: 'senderId', newName: 'Lead Capture (Copy)'\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'senders.agent.flows.duplicate',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.senders.agent.flows.duplicate(\n    flow_id="flowId",\n    sender_id="senderId",\n    new_name="Lead Capture (Copy)",\n)\nprint(response.flow)',
      },
      ruby: {
        method: 'senders.agent.flows.duplicate',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresponse = zavudev.senders.agent.flows.duplicate("flowId", sender_id: "senderId", new_name: "Lead Capture (Copy)")\n\nputs(response)',
      },
      typescript: {
        method: 'client.senders.agent.flows.duplicate',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.senders.agent.flows.duplicate('flowId', {\n  senderId: 'senderId',\n  newName: 'Lead Capture (Copy)',\n});\n\nconsole.log(response.flow);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/senders/{senderId}/agent/tools',
    httpMethod: 'get',
    summary: 'List tools',
    description: 'List tools for an agent.',
    stainlessPath: '(resource) senders.agent.tools > (method) list',
    qualified: 'client.senders.agent.tools.list',
    params: ['senderId: string;', 'cursor?: string;', 'enabled?: boolean;', 'limit?: number;'],
    response:
      "{ id: string; agentId: string; createdAt: string; description: string; enabled: boolean; name: string; parameters: { properties: object; required: string[]; type: 'object'; }; updatedAt: string; webhookUrl: string; }",
    markdown:
      "## list\n\n`client.senders.agent.tools.list(senderId: string, cursor?: string, enabled?: boolean, limit?: number): { id: string; agentId: string; createdAt: string; description: string; enabled: boolean; name: string; parameters: tool_parameters; updatedAt: string; webhookUrl: string; }`\n\n**get** `/v1/senders/{senderId}/agent/tools`\n\nList tools for an agent.\n\n### Parameters\n\n- `senderId: string`\n\n- `cursor?: string`\n\n- `enabled?: boolean`\n\n- `limit?: number`\n\n### Returns\n\n- `{ id: string; agentId: string; createdAt: string; description: string; enabled: boolean; name: string; parameters: { properties: object; required: string[]; type: 'object'; }; updatedAt: string; webhookUrl: string; }`\n\n  - `id: string`\n  - `agentId: string`\n  - `createdAt: string`\n  - `description: string`\n  - `enabled: boolean`\n  - `name: string`\n  - `parameters: { properties: object; required: string[]; type: 'object'; }`\n  - `updatedAt: string`\n  - `webhookUrl: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\n// Automatically fetches more pages as needed.\nfor await (const agentTool of client.senders.agent.tools.list('senderId')) {\n  console.log(agentTool);\n}\n```",
    perLanguage: {
      cli: {
        method: 'tools list',
        example: "zavudev senders:agent:tools list \\\n  --api-key 'My API Key' \\\n  --sender-id senderId",
      },
      go: {
        method: 'client.Senders.Agent.Tools.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Senders.Agent.Tools.List(\n\t\tcontext.TODO(),\n\t\t"senderId",\n\t\tzavudev.SenderAgentToolListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent/tools \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'senders->agent->tools->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->senders->agent->tools->list(\n  'senderId', cursor: 'cursor', enabled: true, limit: 100\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'senders.agent.tools.list',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\npage = client.senders.agent.tools.list(\n    sender_id="senderId",\n)\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'senders.agent.tools.list',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\npage = zavudev.senders.agent.tools.list("senderId")\n\nputs(page)',
      },
      typescript: {
        method: 'client.senders.agent.tools.list',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const agentTool of client.senders.agent.tools.list('senderId')) {\n  console.log(agentTool.id);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/senders/{senderId}/agent/tools',
    httpMethod: 'post',
    summary: 'Create tool',
    description: 'Create a new tool for an agent. Tools allow the agent to call external webhooks.',
    stainlessPath: '(resource) senders.agent.tools > (method) create',
    qualified: 'client.senders.agent.tools.create',
    params: [
      'senderId: string;',
      'description: string;',
      'name: string;',
      "parameters: { properties: object; required: string[]; type: 'object'; };",
      'webhookUrl: string;',
      'enabled?: boolean;',
      'webhookSecret?: string;',
    ],
    response:
      '{ tool: { id: string; agentId: string; createdAt: string; description: string; enabled: boolean; name: string; parameters: tool_parameters; updatedAt: string; webhookUrl: string; }; }',
    markdown:
      "## create\n\n`client.senders.agent.tools.create(senderId: string, description: string, name: string, parameters: { properties: object; required: string[]; type: 'object'; }, webhookUrl: string, enabled?: boolean, webhookSecret?: string): { tool: agent_tool; }`\n\n**post** `/v1/senders/{senderId}/agent/tools`\n\nCreate a new tool for an agent. Tools allow the agent to call external webhooks.\n\n### Parameters\n\n- `senderId: string`\n\n- `description: string`\n\n- `name: string`\n\n- `parameters: { properties: object; required: string[]; type: 'object'; }`\n  - `properties: object`\n  - `required: string[]`\n  - `type: 'object'`\n\n- `webhookUrl: string`\n  Must be HTTPS.\n\n- `enabled?: boolean`\n\n- `webhookSecret?: string`\n  Optional secret for webhook signature verification.\n\n### Returns\n\n- `{ tool: { id: string; agentId: string; createdAt: string; description: string; enabled: boolean; name: string; parameters: tool_parameters; updatedAt: string; webhookUrl: string; }; }`\n\n  - `tool: { id: string; agentId: string; createdAt: string; description: string; enabled: boolean; name: string; parameters: { properties: object; required: string[]; type: 'object'; }; updatedAt: string; webhookUrl: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst tool = await client.senders.agent.tools.create('senderId', {\n  description: 'Get the status of a customer order',\n  name: 'get_order_status',\n  parameters: {\n  properties: { order_id: {} },\n  required: ['order_id'],\n  type: 'object',\n},\n  webhookUrl: 'https://api.example.com/webhooks/order-status',\n});\n\nconsole.log(tool);\n```",
    perLanguage: {
      cli: {
        method: 'tools create',
        example:
          "zavudev senders:agent:tools create \\\n  --api-key 'My API Key' \\\n  --sender-id senderId \\\n  --description 'Get the status of a customer order' \\\n  --name get_order_status \\\n  --parameters '{properties: {order_id: {}}, required: [order_id], type: object}' \\\n  --webhook-url https://api.example.com/webhooks/order-status",
      },
      go: {
        method: 'client.Senders.Agent.Tools.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttool, err := client.Senders.Agent.Tools.New(\n\t\tcontext.TODO(),\n\t\t"senderId",\n\t\tzavudev.SenderAgentToolNewParams{\n\t\t\tDescription: "Get the status of a customer order",\n\t\t\tName:        "get_order_status",\n\t\t\tParameters: zavudev.ToolParameters{\n\t\t\t\tType: zavudev.ToolParametersTypeObject,\n\t\t\t\tProperties: map[string]zavudev.ToolParametersProperty{\n\t\t\t\t\t"order_id": {\n\t\t\t\t\t\tType:        zavudev.String("string"),\n\t\t\t\t\t\tDescription: zavudev.String("The order ID to look up"),\n\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\tRequired: []string{"order_id"},\n\t\t\t},\n\t\t\tWebhookURL:    "https://api.example.com/webhooks/order-status",\n\t\t\tWebhookSecret: zavudev.String("whsec_..."),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", tool.Tool)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent/tools \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY" \\\n    -d \'{\n          "description": "Get the status of a customer order",\n          "name": "get_order_status",\n          "parameters": {\n            "properties": {\n              "order_id": {\n                "description": "The order ID to look up",\n                "type": "string"\n              }\n            },\n            "required": [\n              "order_id"\n            ],\n            "type": "object"\n          },\n          "webhookUrl": "https://api.example.com/webhooks/order-status"\n        }\'',
      },
      php: {
        method: 'senders->agent->tools->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$tool = $client->senders->agent->tools->create(\n  'senderId',\n  description: 'Get the status of a customer order',\n  name: 'get_order_status',\n  parameters: [\n    'properties' => [\n      'order_id' => [\n        'description' => 'The order ID to look up', 'type' => 'string'\n      ],\n    ],\n    'required' => ['order_id'],\n    'type' => 'object',\n  ],\n  webhookURL: 'https://api.example.com/webhooks/order-status',\n  enabled: true,\n  webhookSecret: 'whsec_...',\n);\n\nvar_dump($tool);",
      },
      python: {
        method: 'senders.agent.tools.create',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\ntool = client.senders.agent.tools.create(\n    sender_id="senderId",\n    description="Get the status of a customer order",\n    name="get_order_status",\n    parameters={\n        "type": "object",\n        "properties": {\n            "order_id": {\n                "type": "string",\n                "description": "The order ID to look up",\n            }\n        },\n        "required": ["order_id"],\n    },\n    webhook_url="https://api.example.com/webhooks/order-status",\n    webhook_secret="whsec_...",\n)\nprint(tool.tool)',
      },
      ruby: {
        method: 'senders.agent.tools.create',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\ntool = zavudev.senders.agent.tools.create(\n  "senderId",\n  description: "Get the status of a customer order",\n  name: "get_order_status",\n  parameters: {properties: {order_id: {}}, required: ["order_id"], type: :object},\n  webhook_url: "https://api.example.com/webhooks/order-status"\n)\n\nputs(tool)',
      },
      typescript: {
        method: 'client.senders.agent.tools.create',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst tool = await client.senders.agent.tools.create('senderId', {\n  description: 'Get the status of a customer order',\n  name: 'get_order_status',\n  parameters: {\n    type: 'object',\n    properties: { order_id: { type: 'string', description: 'The order ID to look up' } },\n    required: ['order_id'],\n  },\n  webhookUrl: 'https://api.example.com/webhooks/order-status',\n  webhookSecret: 'whsec_...',\n});\n\nconsole.log(tool.tool);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/senders/{senderId}/agent/tools/{toolId}',
    httpMethod: 'get',
    summary: 'Get tool',
    description: 'Get a specific tool.',
    stainlessPath: '(resource) senders.agent.tools > (method) retrieve',
    qualified: 'client.senders.agent.tools.retrieve',
    params: ['senderId: string;', 'toolId: string;'],
    response:
      '{ tool: { id: string; agentId: string; createdAt: string; description: string; enabled: boolean; name: string; parameters: tool_parameters; updatedAt: string; webhookUrl: string; }; }',
    markdown:
      "## retrieve\n\n`client.senders.agent.tools.retrieve(senderId: string, toolId: string): { tool: agent_tool; }`\n\n**get** `/v1/senders/{senderId}/agent/tools/{toolId}`\n\nGet a specific tool.\n\n### Parameters\n\n- `senderId: string`\n\n- `toolId: string`\n\n### Returns\n\n- `{ tool: { id: string; agentId: string; createdAt: string; description: string; enabled: boolean; name: string; parameters: tool_parameters; updatedAt: string; webhookUrl: string; }; }`\n\n  - `tool: { id: string; agentId: string; createdAt: string; description: string; enabled: boolean; name: string; parameters: { properties: object; required: string[]; type: 'object'; }; updatedAt: string; webhookUrl: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst tool = await client.senders.agent.tools.retrieve('toolId', { senderId: 'senderId' });\n\nconsole.log(tool);\n```",
    perLanguage: {
      cli: {
        method: 'tools retrieve',
        example:
          "zavudev senders:agent:tools retrieve \\\n  --api-key 'My API Key' \\\n  --sender-id senderId \\\n  --tool-id toolId",
      },
      go: {
        method: 'client.Senders.Agent.Tools.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttool, err := client.Senders.Agent.Tools.Get(\n\t\tcontext.TODO(),\n\t\t"toolId",\n\t\tzavudev.SenderAgentToolGetParams{\n\t\t\tSenderID: "senderId",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", tool.Tool)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent/tools/$TOOL_ID \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'senders->agent->tools->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$tool = $client->senders->agent->tools->retrieve(\n  'toolId', senderID: 'senderId'\n);\n\nvar_dump($tool);",
      },
      python: {
        method: 'senders.agent.tools.retrieve',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\ntool = client.senders.agent.tools.retrieve(\n    tool_id="toolId",\n    sender_id="senderId",\n)\nprint(tool.tool)',
      },
      ruby: {
        method: 'senders.agent.tools.retrieve',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\ntool = zavudev.senders.agent.tools.retrieve("toolId", sender_id: "senderId")\n\nputs(tool)',
      },
      typescript: {
        method: 'client.senders.agent.tools.retrieve',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst tool = await client.senders.agent.tools.retrieve('toolId', { senderId: 'senderId' });\n\nconsole.log(tool.tool);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/senders/{senderId}/agent/tools/{toolId}',
    httpMethod: 'patch',
    summary: 'Update tool',
    description: 'Update a tool.',
    stainlessPath: '(resource) senders.agent.tools > (method) update',
    qualified: 'client.senders.agent.tools.update',
    params: [
      'senderId: string;',
      'toolId: string;',
      'description?: string;',
      'enabled?: boolean;',
      'name?: string;',
      "parameters?: { properties: object; required: string[]; type: 'object'; };",
      'webhookSecret?: string;',
      'webhookUrl?: string;',
    ],
    response:
      '{ tool: { id: string; agentId: string; createdAt: string; description: string; enabled: boolean; name: string; parameters: tool_parameters; updatedAt: string; webhookUrl: string; }; }',
    markdown:
      "## update\n\n`client.senders.agent.tools.update(senderId: string, toolId: string, description?: string, enabled?: boolean, name?: string, parameters?: { properties: object; required: string[]; type: 'object'; }, webhookSecret?: string, webhookUrl?: string): { tool: agent_tool; }`\n\n**patch** `/v1/senders/{senderId}/agent/tools/{toolId}`\n\nUpdate a tool.\n\n### Parameters\n\n- `senderId: string`\n\n- `toolId: string`\n\n- `description?: string`\n\n- `enabled?: boolean`\n\n- `name?: string`\n\n- `parameters?: { properties: object; required: string[]; type: 'object'; }`\n  - `properties: object`\n  - `required: string[]`\n  - `type: 'object'`\n\n- `webhookSecret?: string`\n\n- `webhookUrl?: string`\n\n### Returns\n\n- `{ tool: { id: string; agentId: string; createdAt: string; description: string; enabled: boolean; name: string; parameters: tool_parameters; updatedAt: string; webhookUrl: string; }; }`\n\n  - `tool: { id: string; agentId: string; createdAt: string; description: string; enabled: boolean; name: string; parameters: { properties: object; required: string[]; type: 'object'; }; updatedAt: string; webhookUrl: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst tool = await client.senders.agent.tools.update('toolId', { senderId: 'senderId' });\n\nconsole.log(tool);\n```",
    perLanguage: {
      cli: {
        method: 'tools update',
        example:
          "zavudev senders:agent:tools update \\\n  --api-key 'My API Key' \\\n  --sender-id senderId \\\n  --tool-id toolId",
      },
      go: {
        method: 'client.Senders.Agent.Tools.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\ttool, err := client.Senders.Agent.Tools.Update(\n\t\tcontext.TODO(),\n\t\t"toolId",\n\t\tzavudev.SenderAgentToolUpdateParams{\n\t\t\tSenderID: "senderId",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", tool.Tool)\n}\n',
      },
      http: {
        example:
          "curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent/tools/$TOOL_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $ZAVUDEV_API_KEY\" \\\n    -d '{}'",
      },
      php: {
        method: 'senders->agent->tools->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$tool = $client->senders->agent->tools->update(\n  'toolId',\n  senderID: 'senderId',\n  description: 'description',\n  enabled: true,\n  name: 'name',\n  parameters: [\n    'properties' => [\n      'foo' => ['description' => 'description', 'type' => 'type']\n    ],\n    'required' => ['string'],\n    'type' => 'object',\n  ],\n  webhookSecret: 'webhookSecret',\n  webhookURL: 'https://example.com',\n);\n\nvar_dump($tool);",
      },
      python: {
        method: 'senders.agent.tools.update',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\ntool = client.senders.agent.tools.update(\n    tool_id="toolId",\n    sender_id="senderId",\n)\nprint(tool.tool)',
      },
      ruby: {
        method: 'senders.agent.tools.update',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\ntool = zavudev.senders.agent.tools.update("toolId", sender_id: "senderId")\n\nputs(tool)',
      },
      typescript: {
        method: 'client.senders.agent.tools.update',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst tool = await client.senders.agent.tools.update('toolId', { senderId: 'senderId' });\n\nconsole.log(tool.tool);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/senders/{senderId}/agent/tools/{toolId}',
    httpMethod: 'delete',
    summary: 'Delete tool',
    description: 'Delete a tool.',
    stainlessPath: '(resource) senders.agent.tools > (method) delete',
    qualified: 'client.senders.agent.tools.delete',
    params: ['senderId: string;', 'toolId: string;'],
    markdown:
      "## delete\n\n`client.senders.agent.tools.delete(senderId: string, toolId: string): void`\n\n**delete** `/v1/senders/{senderId}/agent/tools/{toolId}`\n\nDelete a tool.\n\n### Parameters\n\n- `senderId: string`\n\n- `toolId: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nawait client.senders.agent.tools.delete('toolId', { senderId: 'senderId' })\n```",
    perLanguage: {
      cli: {
        method: 'tools delete',
        example:
          "zavudev senders:agent:tools delete \\\n  --api-key 'My API Key' \\\n  --sender-id senderId \\\n  --tool-id toolId",
      },
      go: {
        method: 'client.Senders.Agent.Tools.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Senders.Agent.Tools.Delete(\n\t\tcontext.TODO(),\n\t\t"toolId",\n\t\tzavudev.SenderAgentToolDeleteParams{\n\t\t\tSenderID: "senderId",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent/tools/$TOOL_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'senders->agent->tools->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$result = $client->senders->agent->tools->delete(\n  'toolId', senderID: 'senderId'\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'senders.agent.tools.delete',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nclient.senders.agent.tools.delete(\n    tool_id="toolId",\n    sender_id="senderId",\n)',
      },
      ruby: {
        method: 'senders.agent.tools.delete',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresult = zavudev.senders.agent.tools.delete("toolId", sender_id: "senderId")\n\nputs(result)',
      },
      typescript: {
        method: 'client.senders.agent.tools.delete',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.senders.agent.tools.delete('toolId', { senderId: 'senderId' });",
      },
    },
  },
  {
    name: 'test',
    endpoint: '/v1/senders/{senderId}/agent/tools/{toolId}/test',
    httpMethod: 'post',
    summary: 'Test tool',
    description: 'Test a tool by triggering its webhook with test parameters.',
    stainlessPath: '(resource) senders.agent.tools > (method) test',
    qualified: 'client.senders.agent.tools.test',
    params: ['senderId: string;', 'toolId: string;', 'testParams: object;'],
    response: '{ scheduled: boolean; }',
    markdown:
      "## test\n\n`client.senders.agent.tools.test(senderId: string, toolId: string, testParams: object): { scheduled: boolean; }`\n\n**post** `/v1/senders/{senderId}/agent/tools/{toolId}/test`\n\nTest a tool by triggering its webhook with test parameters.\n\n### Parameters\n\n- `senderId: string`\n\n- `toolId: string`\n\n- `testParams: object`\n  Parameters to pass to the tool for testing.\n\n### Returns\n\n- `{ scheduled: boolean; }`\n\n  - `scheduled: boolean`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst response = await client.senders.agent.tools.test('toolId', {\n  senderId: 'senderId',\n  testParams: { order_id: 'bar' },\n});\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'tools test',
        example:
          "zavudev senders:agent:tools test \\\n  --api-key 'My API Key' \\\n  --sender-id senderId \\\n  --tool-id toolId \\\n  --test-params '{order_id: bar}'",
      },
      go: {
        method: 'client.Senders.Agent.Tools.Test',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Senders.Agent.Tools.Test(\n\t\tcontext.TODO(),\n\t\t"toolId",\n\t\tzavudev.SenderAgentToolTestParams{\n\t\t\tSenderID: "senderId",\n\t\t\tTestParams: map[string]any{\n\t\t\t\t"order_id": "ORD-12345",\n\t\t\t},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Scheduled)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent/tools/$TOOL_ID/test \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY" \\\n    -d \'{\n          "testParams": {\n            "order_id": "bar"\n          }\n        }\'',
      },
      php: {
        method: 'senders->agent->tools->test',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->senders->agent->tools->test(\n  'toolId', senderID: 'senderId', testParams: ['order_id' => 'bar']\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'senders.agent.tools.test',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.senders.agent.tools.test(\n    tool_id="toolId",\n    sender_id="senderId",\n    test_params={\n        "order_id": "ORD-12345"\n    },\n)\nprint(response.scheduled)',
      },
      ruby: {
        method: 'senders.agent.tools.test_',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresponse = zavudev.senders.agent.tools.test_("toolId", sender_id: "senderId", test_params: {order_id: "bar"})\n\nputs(response)',
      },
      typescript: {
        method: 'client.senders.agent.tools.test',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.senders.agent.tools.test('toolId', {\n  senderId: 'senderId',\n  testParams: { order_id: 'ORD-12345' },\n});\n\nconsole.log(response.scheduled);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/senders/{senderId}/agent/knowledge-bases',
    httpMethod: 'get',
    summary: 'List knowledge bases',
    description: 'List knowledge bases for an agent.',
    stainlessPath: '(resource) senders.agent.knowledge_bases > (method) list',
    qualified: 'client.senders.agent.knowledgeBases.list',
    params: ['senderId: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      '{ id: string; agentId: string; createdAt: string; documentCount: number; name: string; totalChunks: number; updatedAt: string; description?: string; }',
    markdown:
      "## list\n\n`client.senders.agent.knowledgeBases.list(senderId: string, cursor?: string, limit?: number): { id: string; agentId: string; createdAt: string; documentCount: number; name: string; totalChunks: number; updatedAt: string; description?: string; }`\n\n**get** `/v1/senders/{senderId}/agent/knowledge-bases`\n\nList knowledge bases for an agent.\n\n### Parameters\n\n- `senderId: string`\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ id: string; agentId: string; createdAt: string; documentCount: number; name: string; totalChunks: number; updatedAt: string; description?: string; }`\n\n  - `id: string`\n  - `agentId: string`\n  - `createdAt: string`\n  - `documentCount: number`\n  - `name: string`\n  - `totalChunks: number`\n  - `updatedAt: string`\n  - `description?: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\n// Automatically fetches more pages as needed.\nfor await (const agentKnowledgeBase of client.senders.agent.knowledgeBases.list('senderId')) {\n  console.log(agentKnowledgeBase);\n}\n```",
    perLanguage: {
      cli: {
        method: 'knowledge_bases list',
        example:
          "zavudev senders:agent:knowledge-bases list \\\n  --api-key 'My API Key' \\\n  --sender-id senderId",
      },
      go: {
        method: 'client.Senders.Agent.KnowledgeBases.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Senders.Agent.KnowledgeBases.List(\n\t\tcontext.TODO(),\n\t\t"senderId",\n\t\tzavudev.SenderAgentKnowledgeBaseListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent/knowledge-bases \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'senders->agent->knowledgeBases->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->senders->agent->knowledgeBases->list(\n  'senderId', cursor: 'cursor', limit: 100\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'senders.agent.knowledge_bases.list',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\npage = client.senders.agent.knowledge_bases.list(\n    sender_id="senderId",\n)\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'senders.agent.knowledge_bases.list',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\npage = zavudev.senders.agent.knowledge_bases.list("senderId")\n\nputs(page)',
      },
      typescript: {
        method: 'client.senders.agent.knowledgeBases.list',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const agentKnowledgeBase of client.senders.agent.knowledgeBases.list('senderId')) {\n  console.log(agentKnowledgeBase.id);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/senders/{senderId}/agent/knowledge-bases',
    httpMethod: 'post',
    summary: 'Create knowledge base',
    description: 'Create a new knowledge base for an agent.',
    stainlessPath: '(resource) senders.agent.knowledge_bases > (method) create',
    qualified: 'client.senders.agent.knowledgeBases.create',
    params: ['senderId: string;', 'name: string;', 'description?: string;'],
    response:
      '{ knowledgeBase: { id: string; agentId: string; createdAt: string; documentCount: number; name: string; totalChunks: number; updatedAt: string; description?: string; }; }',
    markdown:
      "## create\n\n`client.senders.agent.knowledgeBases.create(senderId: string, name: string, description?: string): { knowledgeBase: agent_knowledge_base; }`\n\n**post** `/v1/senders/{senderId}/agent/knowledge-bases`\n\nCreate a new knowledge base for an agent.\n\n### Parameters\n\n- `senderId: string`\n\n- `name: string`\n\n- `description?: string`\n\n### Returns\n\n- `{ knowledgeBase: { id: string; agentId: string; createdAt: string; documentCount: number; name: string; totalChunks: number; updatedAt: string; description?: string; }; }`\n\n  - `knowledgeBase: { id: string; agentId: string; createdAt: string; documentCount: number; name: string; totalChunks: number; updatedAt: string; description?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst knowledgeBase = await client.senders.agent.knowledgeBases.create('senderId', { name: 'Product FAQ' });\n\nconsole.log(knowledgeBase);\n```",
    perLanguage: {
      cli: {
        method: 'knowledge_bases create',
        example:
          "zavudev senders:agent:knowledge-bases create \\\n  --api-key 'My API Key' \\\n  --sender-id senderId \\\n  --name 'Product FAQ'",
      },
      go: {
        method: 'client.Senders.Agent.KnowledgeBases.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tknowledgeBase, err := client.Senders.Agent.KnowledgeBases.New(\n\t\tcontext.TODO(),\n\t\t"senderId",\n\t\tzavudev.SenderAgentKnowledgeBaseNewParams{\n\t\t\tName:        "Product FAQ",\n\t\t\tDescription: zavudev.String("Frequently asked questions about our products"),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", knowledgeBase.KnowledgeBase)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent/knowledge-bases \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY" \\\n    -d \'{\n          "name": "Product FAQ"\n        }\'',
      },
      php: {
        method: 'senders->agent->knowledgeBases->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$knowledgeBase = $client->senders->agent->knowledgeBases->create(\n  'senderId',\n  name: 'Product FAQ',\n  description: 'Frequently asked questions about our products',\n);\n\nvar_dump($knowledgeBase);",
      },
      python: {
        method: 'senders.agent.knowledge_bases.create',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nknowledge_base = client.senders.agent.knowledge_bases.create(\n    sender_id="senderId",\n    name="Product FAQ",\n    description="Frequently asked questions about our products",\n)\nprint(knowledge_base.knowledge_base)',
      },
      ruby: {
        method: 'senders.agent.knowledge_bases.create',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nknowledge_base = zavudev.senders.agent.knowledge_bases.create("senderId", name: "Product FAQ")\n\nputs(knowledge_base)',
      },
      typescript: {
        method: 'client.senders.agent.knowledgeBases.create',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst knowledgeBase = await client.senders.agent.knowledgeBases.create('senderId', {\n  name: 'Product FAQ',\n  description: 'Frequently asked questions about our products',\n});\n\nconsole.log(knowledgeBase.knowledgeBase);",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/senders/{senderId}/agent/knowledge-bases/{kbId}',
    httpMethod: 'get',
    summary: 'Get knowledge base',
    description: 'Get a specific knowledge base.',
    stainlessPath: '(resource) senders.agent.knowledge_bases > (method) retrieve',
    qualified: 'client.senders.agent.knowledgeBases.retrieve',
    params: ['senderId: string;', 'kbId: string;'],
    response:
      '{ knowledgeBase: { id: string; agentId: string; createdAt: string; documentCount: number; name: string; totalChunks: number; updatedAt: string; description?: string; }; }',
    markdown:
      "## retrieve\n\n`client.senders.agent.knowledgeBases.retrieve(senderId: string, kbId: string): { knowledgeBase: agent_knowledge_base; }`\n\n**get** `/v1/senders/{senderId}/agent/knowledge-bases/{kbId}`\n\nGet a specific knowledge base.\n\n### Parameters\n\n- `senderId: string`\n\n- `kbId: string`\n\n### Returns\n\n- `{ knowledgeBase: { id: string; agentId: string; createdAt: string; documentCount: number; name: string; totalChunks: number; updatedAt: string; description?: string; }; }`\n\n  - `knowledgeBase: { id: string; agentId: string; createdAt: string; documentCount: number; name: string; totalChunks: number; updatedAt: string; description?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst knowledgeBase = await client.senders.agent.knowledgeBases.retrieve('kbId', { senderId: 'senderId' });\n\nconsole.log(knowledgeBase);\n```",
    perLanguage: {
      cli: {
        method: 'knowledge_bases retrieve',
        example:
          "zavudev senders:agent:knowledge-bases retrieve \\\n  --api-key 'My API Key' \\\n  --sender-id senderId \\\n  --kb-id kbId",
      },
      go: {
        method: 'client.Senders.Agent.KnowledgeBases.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tknowledgeBase, err := client.Senders.Agent.KnowledgeBases.Get(\n\t\tcontext.TODO(),\n\t\t"kbId",\n\t\tzavudev.SenderAgentKnowledgeBaseGetParams{\n\t\t\tSenderID: "senderId",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", knowledgeBase.KnowledgeBase)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent/knowledge-bases/$KB_ID \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'senders->agent->knowledgeBases->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$knowledgeBase = $client->senders->agent->knowledgeBases->retrieve(\n  'kbId', senderID: 'senderId'\n);\n\nvar_dump($knowledgeBase);",
      },
      python: {
        method: 'senders.agent.knowledge_bases.retrieve',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nknowledge_base = client.senders.agent.knowledge_bases.retrieve(\n    kb_id="kbId",\n    sender_id="senderId",\n)\nprint(knowledge_base.knowledge_base)',
      },
      ruby: {
        method: 'senders.agent.knowledge_bases.retrieve',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nknowledge_base = zavudev.senders.agent.knowledge_bases.retrieve("kbId", sender_id: "senderId")\n\nputs(knowledge_base)',
      },
      typescript: {
        method: 'client.senders.agent.knowledgeBases.retrieve',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst knowledgeBase = await client.senders.agent.knowledgeBases.retrieve('kbId', {\n  senderId: 'senderId',\n});\n\nconsole.log(knowledgeBase.knowledgeBase);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/senders/{senderId}/agent/knowledge-bases/{kbId}',
    httpMethod: 'patch',
    summary: 'Update knowledge base',
    description: 'Update a knowledge base.',
    stainlessPath: '(resource) senders.agent.knowledge_bases > (method) update',
    qualified: 'client.senders.agent.knowledgeBases.update',
    params: ['senderId: string;', 'kbId: string;', 'description?: string;', 'name?: string;'],
    response:
      '{ knowledgeBase: { id: string; agentId: string; createdAt: string; documentCount: number; name: string; totalChunks: number; updatedAt: string; description?: string; }; }',
    markdown:
      "## update\n\n`client.senders.agent.knowledgeBases.update(senderId: string, kbId: string, description?: string, name?: string): { knowledgeBase: agent_knowledge_base; }`\n\n**patch** `/v1/senders/{senderId}/agent/knowledge-bases/{kbId}`\n\nUpdate a knowledge base.\n\n### Parameters\n\n- `senderId: string`\n\n- `kbId: string`\n\n- `description?: string`\n\n- `name?: string`\n\n### Returns\n\n- `{ knowledgeBase: { id: string; agentId: string; createdAt: string; documentCount: number; name: string; totalChunks: number; updatedAt: string; description?: string; }; }`\n\n  - `knowledgeBase: { id: string; agentId: string; createdAt: string; documentCount: number; name: string; totalChunks: number; updatedAt: string; description?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst knowledgeBase = await client.senders.agent.knowledgeBases.update('kbId', { senderId: 'senderId' });\n\nconsole.log(knowledgeBase);\n```",
    perLanguage: {
      cli: {
        method: 'knowledge_bases update',
        example:
          "zavudev senders:agent:knowledge-bases update \\\n  --api-key 'My API Key' \\\n  --sender-id senderId \\\n  --kb-id kbId",
      },
      go: {
        method: 'client.Senders.Agent.KnowledgeBases.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tknowledgeBase, err := client.Senders.Agent.KnowledgeBases.Update(\n\t\tcontext.TODO(),\n\t\t"kbId",\n\t\tzavudev.SenderAgentKnowledgeBaseUpdateParams{\n\t\t\tSenderID: "senderId",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", knowledgeBase.KnowledgeBase)\n}\n',
      },
      http: {
        example:
          "curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent/knowledge-bases/$KB_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $ZAVUDEV_API_KEY\" \\\n    -d '{}'",
      },
      php: {
        method: 'senders->agent->knowledgeBases->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$knowledgeBase = $client->senders->agent->knowledgeBases->update(\n  'kbId', senderID: 'senderId', description: 'description', name: 'name'\n);\n\nvar_dump($knowledgeBase);",
      },
      python: {
        method: 'senders.agent.knowledge_bases.update',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nknowledge_base = client.senders.agent.knowledge_bases.update(\n    kb_id="kbId",\n    sender_id="senderId",\n)\nprint(knowledge_base.knowledge_base)',
      },
      ruby: {
        method: 'senders.agent.knowledge_bases.update',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nknowledge_base = zavudev.senders.agent.knowledge_bases.update("kbId", sender_id: "senderId")\n\nputs(knowledge_base)',
      },
      typescript: {
        method: 'client.senders.agent.knowledgeBases.update',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst knowledgeBase = await client.senders.agent.knowledgeBases.update('kbId', {\n  senderId: 'senderId',\n});\n\nconsole.log(knowledgeBase.knowledgeBase);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/senders/{senderId}/agent/knowledge-bases/{kbId}',
    httpMethod: 'delete',
    summary: 'Delete knowledge base',
    description: 'Delete a knowledge base and all its documents.',
    stainlessPath: '(resource) senders.agent.knowledge_bases > (method) delete',
    qualified: 'client.senders.agent.knowledgeBases.delete',
    params: ['senderId: string;', 'kbId: string;'],
    markdown:
      "## delete\n\n`client.senders.agent.knowledgeBases.delete(senderId: string, kbId: string): void`\n\n**delete** `/v1/senders/{senderId}/agent/knowledge-bases/{kbId}`\n\nDelete a knowledge base and all its documents.\n\n### Parameters\n\n- `senderId: string`\n\n- `kbId: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nawait client.senders.agent.knowledgeBases.delete('kbId', { senderId: 'senderId' })\n```",
    perLanguage: {
      cli: {
        method: 'knowledge_bases delete',
        example:
          "zavudev senders:agent:knowledge-bases delete \\\n  --api-key 'My API Key' \\\n  --sender-id senderId \\\n  --kb-id kbId",
      },
      go: {
        method: 'client.Senders.Agent.KnowledgeBases.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Senders.Agent.KnowledgeBases.Delete(\n\t\tcontext.TODO(),\n\t\t"kbId",\n\t\tzavudev.SenderAgentKnowledgeBaseDeleteParams{\n\t\t\tSenderID: "senderId",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent/knowledge-bases/$KB_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'senders->agent->knowledgeBases->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$result = $client->senders->agent->knowledgeBases->delete(\n  'kbId', senderID: 'senderId'\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'senders.agent.knowledge_bases.delete',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nclient.senders.agent.knowledge_bases.delete(\n    kb_id="kbId",\n    sender_id="senderId",\n)',
      },
      ruby: {
        method: 'senders.agent.knowledge_bases.delete',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresult = zavudev.senders.agent.knowledge_bases.delete("kbId", sender_id: "senderId")\n\nputs(result)',
      },
      typescript: {
        method: 'client.senders.agent.knowledgeBases.delete',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.senders.agent.knowledgeBases.delete('kbId', { senderId: 'senderId' });",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/senders/{senderId}/agent/knowledge-bases/{kbId}/documents',
    httpMethod: 'get',
    summary: 'List documents',
    description: 'List documents in a knowledge base.',
    stainlessPath: '(resource) senders.agent.knowledge_bases.documents > (method) list',
    qualified: 'client.senders.agent.knowledgeBases.documents.list',
    params: ['senderId: string;', 'kbId: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      '{ id: string; chunkCount: number; contentLength: number; createdAt: string; isProcessed: boolean; knowledgeBaseId: string; title: string; updatedAt: string; }',
    markdown:
      "## list\n\n`client.senders.agent.knowledgeBases.documents.list(senderId: string, kbId: string, cursor?: string, limit?: number): { id: string; chunkCount: number; contentLength: number; createdAt: string; isProcessed: boolean; knowledgeBaseId: string; title: string; updatedAt: string; }`\n\n**get** `/v1/senders/{senderId}/agent/knowledge-bases/{kbId}/documents`\n\nList documents in a knowledge base.\n\n### Parameters\n\n- `senderId: string`\n\n- `kbId: string`\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ id: string; chunkCount: number; contentLength: number; createdAt: string; isProcessed: boolean; knowledgeBaseId: string; title: string; updatedAt: string; }`\n\n  - `id: string`\n  - `chunkCount: number`\n  - `contentLength: number`\n  - `createdAt: string`\n  - `isProcessed: boolean`\n  - `knowledgeBaseId: string`\n  - `title: string`\n  - `updatedAt: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\n// Automatically fetches more pages as needed.\nfor await (const agentDocument of client.senders.agent.knowledgeBases.documents.list('kbId', { senderId: 'senderId' })) {\n  console.log(agentDocument);\n}\n```",
    perLanguage: {
      cli: {
        method: 'documents list',
        example:
          "zavudev senders:agent:knowledge-bases:documents list \\\n  --api-key 'My API Key' \\\n  --sender-id senderId \\\n  --kb-id kbId",
      },
      go: {
        method: 'client.Senders.Agent.KnowledgeBases.Documents.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Senders.Agent.KnowledgeBases.Documents.List(\n\t\tcontext.TODO(),\n\t\t"kbId",\n\t\tzavudev.SenderAgentKnowledgeBaseDocumentListParams{\n\t\t\tSenderID: "senderId",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent/knowledge-bases/$KB_ID/documents \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'senders->agent->knowledgeBases->documents->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->senders->agent->knowledgeBases->documents->list(\n  'kbId', senderID: 'senderId', cursor: 'cursor', limit: 100\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'senders.agent.knowledge_bases.documents.list',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\npage = client.senders.agent.knowledge_bases.documents.list(\n    kb_id="kbId",\n    sender_id="senderId",\n)\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'senders.agent.knowledge_bases.documents.list',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\npage = zavudev.senders.agent.knowledge_bases.documents.list("kbId", sender_id: "senderId")\n\nputs(page)',
      },
      typescript: {
        method: 'client.senders.agent.knowledgeBases.documents.list',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const agentDocument of client.senders.agent.knowledgeBases.documents.list('kbId', {\n  senderId: 'senderId',\n})) {\n  console.log(agentDocument.id);\n}",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/senders/{senderId}/agent/knowledge-bases/{kbId}/documents',
    httpMethod: 'post',
    summary: 'Create document',
    description: 'Add a document to a knowledge base. The document will be automatically processed for RAG.',
    stainlessPath: '(resource) senders.agent.knowledge_bases.documents > (method) create',
    qualified: 'client.senders.agent.knowledgeBases.documents.create',
    params: ['senderId: string;', 'kbId: string;', 'content: string;', 'title: string;'],
    response:
      '{ document: { id: string; chunkCount: number; contentLength: number; createdAt: string; isProcessed: boolean; knowledgeBaseId: string; title: string; updatedAt: string; }; }',
    markdown:
      "## create\n\n`client.senders.agent.knowledgeBases.documents.create(senderId: string, kbId: string, content: string, title: string): { document: agent_document; }`\n\n**post** `/v1/senders/{senderId}/agent/knowledge-bases/{kbId}/documents`\n\nAdd a document to a knowledge base. The document will be automatically processed for RAG.\n\n### Parameters\n\n- `senderId: string`\n\n- `kbId: string`\n\n- `content: string`\n\n- `title: string`\n\n### Returns\n\n- `{ document: { id: string; chunkCount: number; contentLength: number; createdAt: string; isProcessed: boolean; knowledgeBaseId: string; title: string; updatedAt: string; }; }`\n\n  - `document: { id: string; chunkCount: number; contentLength: number; createdAt: string; isProcessed: boolean; knowledgeBaseId: string; title: string; updatedAt: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst document = await client.senders.agent.knowledgeBases.documents.create('kbId', {\n  senderId: 'senderId',\n  content: 'Our return policy allows returns within 30 days of purchase...',\n  title: 'Return Policy',\n});\n\nconsole.log(document);\n```",
    perLanguage: {
      cli: {
        method: 'documents create',
        example:
          "zavudev senders:agent:knowledge-bases:documents create \\\n  --api-key 'My API Key' \\\n  --sender-id senderId \\\n  --kb-id kbId \\\n  --content 'Our return policy allows returns within 30 days of purchase...' \\\n  --title 'Return Policy'",
      },
      go: {
        method: 'client.Senders.Agent.KnowledgeBases.Documents.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tdocument, err := client.Senders.Agent.KnowledgeBases.Documents.New(\n\t\tcontext.TODO(),\n\t\t"kbId",\n\t\tzavudev.SenderAgentKnowledgeBaseDocumentNewParams{\n\t\t\tSenderID: "senderId",\n\t\t\tContent:  "Our return policy allows returns within 30 days of purchase...",\n\t\t\tTitle:    "Return Policy",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", document.Document)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent/knowledge-bases/$KB_ID/documents \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY" \\\n    -d \'{\n          "content": "Our return policy allows returns within 30 days of purchase...",\n          "title": "Return Policy"\n        }\'',
      },
      php: {
        method: 'senders->agent->knowledgeBases->documents->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$document = $client->senders->agent->knowledgeBases->documents->create(\n  'kbId',\n  senderID: 'senderId',\n  content: 'Our return policy allows returns within 30 days of purchase...',\n  title: 'Return Policy',\n);\n\nvar_dump($document);",
      },
      python: {
        method: 'senders.agent.knowledge_bases.documents.create',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\ndocument = client.senders.agent.knowledge_bases.documents.create(\n    kb_id="kbId",\n    sender_id="senderId",\n    content="Our return policy allows returns within 30 days of purchase...",\n    title="Return Policy",\n)\nprint(document.document)',
      },
      ruby: {
        method: 'senders.agent.knowledge_bases.documents.create',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\ndocument = zavudev.senders.agent.knowledge_bases.documents.create(\n  "kbId",\n  sender_id: "senderId",\n  content: "Our return policy allows returns within 30 days of purchase...",\n  title: "Return Policy"\n)\n\nputs(document)',
      },
      typescript: {
        method: 'client.senders.agent.knowledgeBases.documents.create',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst document = await client.senders.agent.knowledgeBases.documents.create('kbId', {\n  senderId: 'senderId',\n  content: 'Our return policy allows returns within 30 days of purchase...',\n  title: 'Return Policy',\n});\n\nconsole.log(document.document);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/senders/{senderId}/agent/knowledge-bases/{kbId}/documents/{docId}',
    httpMethod: 'delete',
    summary: 'Delete document',
    description: 'Delete a document from a knowledge base.',
    stainlessPath: '(resource) senders.agent.knowledge_bases.documents > (method) delete',
    qualified: 'client.senders.agent.knowledgeBases.documents.delete',
    params: ['senderId: string;', 'kbId: string;', 'docId: string;'],
    markdown:
      "## delete\n\n`client.senders.agent.knowledgeBases.documents.delete(senderId: string, kbId: string, docId: string): void`\n\n**delete** `/v1/senders/{senderId}/agent/knowledge-bases/{kbId}/documents/{docId}`\n\nDelete a document from a knowledge base.\n\n### Parameters\n\n- `senderId: string`\n\n- `kbId: string`\n\n- `docId: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nawait client.senders.agent.knowledgeBases.documents.delete('docId', { senderId: 'senderId', kbId: 'kbId' })\n```",
    perLanguage: {
      cli: {
        method: 'documents delete',
        example:
          "zavudev senders:agent:knowledge-bases:documents delete \\\n  --api-key 'My API Key' \\\n  --sender-id senderId \\\n  --kb-id kbId \\\n  --doc-id docId",
      },
      go: {
        method: 'client.Senders.Agent.KnowledgeBases.Documents.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Senders.Agent.KnowledgeBases.Documents.Delete(\n\t\tcontext.TODO(),\n\t\t"docId",\n\t\tzavudev.SenderAgentKnowledgeBaseDocumentDeleteParams{\n\t\t\tSenderID: "senderId",\n\t\t\tKBID:     "kbId",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/senders/$SENDER_ID/agent/knowledge-bases/$KB_ID/documents/$DOC_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'senders->agent->knowledgeBases->documents->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$result = $client->senders->agent->knowledgeBases->documents->delete(\n  'docId', senderID: 'senderId', kbID: 'kbId'\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'senders.agent.knowledge_bases.documents.delete',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nclient.senders.agent.knowledge_bases.documents.delete(\n    doc_id="docId",\n    sender_id="senderId",\n    kb_id="kbId",\n)',
      },
      ruby: {
        method: 'senders.agent.knowledge_bases.documents.delete',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresult = zavudev.senders.agent.knowledge_bases.documents.delete("docId", sender_id: "senderId", kb_id: "kbId")\n\nputs(result)',
      },
      typescript: {
        method: 'client.senders.agent.knowledgeBases.documents.delete',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.senders.agent.knowledgeBases.documents.delete('docId', {\n  senderId: 'senderId',\n  kbId: 'kbId',\n});",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/contacts',
    httpMethod: 'get',
    summary: 'List contacts',
    description: 'List contacts with their communication channels.',
    stainlessPath: '(resource) contacts > (method) list',
    qualified: 'client.contacts.list',
    params: ['cursor?: string;', 'limit?: number;', 'phoneNumber?: string;'],
    response:
      "{ id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: object; updatedAt?: string; }[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }",
    markdown:
      "## list\n\n`client.contacts.list(cursor?: string, limit?: number, phoneNumber?: string): { id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: contact_channel[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }`\n\n**get** `/v1/contacts`\n\nList contacts with their communication channels.\n\n### Parameters\n\n- `cursor?: string`\n\n- `limit?: number`\n\n- `phoneNumber?: string`\n\n### Returns\n\n- `{ id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: object; updatedAt?: string; }[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `availableChannels: string[]`\n  - `createdAt: string`\n  - `metadata: object`\n  - `verified: boolean`\n  - `channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: { avgDeliveryTimeMs?: number; failureCount?: number; lastSuccessAt?: string; successCount?: number; totalAttempts?: number; }; updatedAt?: string; }[]`\n  - `countryCode?: string`\n  - `defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'`\n  - `displayName?: string`\n  - `phoneNumber?: string`\n  - `primaryEmail?: string`\n  - `primaryPhone?: string`\n  - `profileName?: string`\n  - `suggestedMergeWith?: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\n// Automatically fetches more pages as needed.\nfor await (const contact of client.contacts.list()) {\n  console.log(contact);\n}\n```",
    perLanguage: {
      cli: {
        method: 'contacts list',
        example: "zavudev contacts list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Contacts.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Contacts.List(context.TODO(), zavudev.ContactListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.zavu.dev/v1/contacts \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'contacts->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->contacts->list(\n  cursor: 'cursor', limit: 100, phoneNumber: 'phoneNumber'\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'contacts.list',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\npage = client.contacts.list()\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'contacts.list',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\npage = zavudev.contacts.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.contacts.list',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const contact of client.contacts.list()) {\n  console.log(contact.id);\n}",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/contacts/{contactId}',
    httpMethod: 'get',
    summary: 'Get contact',
    description: 'Get contact',
    stainlessPath: '(resource) contacts > (method) retrieve',
    qualified: 'client.contacts.retrieve',
    params: ['contactId: string;'],
    response:
      "{ id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: object; updatedAt?: string; }[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }",
    markdown:
      "## retrieve\n\n`client.contacts.retrieve(contactId: string): { id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: contact_channel[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }`\n\n**get** `/v1/contacts/{contactId}`\n\nGet contact\n\n### Parameters\n\n- `contactId: string`\n\n### Returns\n\n- `{ id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: object; updatedAt?: string; }[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `availableChannels: string[]`\n  - `createdAt: string`\n  - `metadata: object`\n  - `verified: boolean`\n  - `channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: { avgDeliveryTimeMs?: number; failureCount?: number; lastSuccessAt?: string; successCount?: number; totalAttempts?: number; }; updatedAt?: string; }[]`\n  - `countryCode?: string`\n  - `defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'`\n  - `displayName?: string`\n  - `phoneNumber?: string`\n  - `primaryEmail?: string`\n  - `primaryPhone?: string`\n  - `profileName?: string`\n  - `suggestedMergeWith?: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst contact = await client.contacts.retrieve('contactId');\n\nconsole.log(contact);\n```",
    perLanguage: {
      cli: {
        method: 'contacts retrieve',
        example: "zavudev contacts retrieve \\\n  --api-key 'My API Key' \\\n  --contact-id contactId",
      },
      go: {
        method: 'client.Contacts.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcontact, err := client.Contacts.Get(context.TODO(), "contactId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", contact.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/contacts/$CONTACT_ID \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'contacts->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$contact = $client->contacts->retrieve('contactId');\n\nvar_dump($contact);",
      },
      python: {
        method: 'contacts.retrieve',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\ncontact = client.contacts.retrieve(\n    "contactId",\n)\nprint(contact.id)',
      },
      ruby: {
        method: 'contacts.retrieve',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\ncontact = zavudev.contacts.retrieve("contactId")\n\nputs(contact)',
      },
      typescript: {
        method: 'client.contacts.retrieve',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst contact = await client.contacts.retrieve('contactId');\n\nconsole.log(contact.id);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/contacts/{contactId}',
    httpMethod: 'patch',
    summary: 'Update contact',
    description: 'Update contact',
    stainlessPath: '(resource) contacts > (method) update',
    qualified: 'client.contacts.update',
    params: [
      'contactId: string;',
      "defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice';",
      'metadata?: object;',
    ],
    response:
      "{ id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: object; updatedAt?: string; }[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }",
    markdown:
      "## update\n\n`client.contacts.update(contactId: string, defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice', metadata?: object): { id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: contact_channel[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }`\n\n**patch** `/v1/contacts/{contactId}`\n\nUpdate contact\n\n### Parameters\n\n- `contactId: string`\n\n- `defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'`\n  Preferred channel for this contact. Set to null to clear.\n\n- `metadata?: object`\n\n### Returns\n\n- `{ id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: object; updatedAt?: string; }[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `availableChannels: string[]`\n  - `createdAt: string`\n  - `metadata: object`\n  - `verified: boolean`\n  - `channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: { avgDeliveryTimeMs?: number; failureCount?: number; lastSuccessAt?: string; successCount?: number; totalAttempts?: number; }; updatedAt?: string; }[]`\n  - `countryCode?: string`\n  - `defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'`\n  - `displayName?: string`\n  - `phoneNumber?: string`\n  - `primaryEmail?: string`\n  - `primaryPhone?: string`\n  - `profileName?: string`\n  - `suggestedMergeWith?: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst contact = await client.contacts.update('contactId');\n\nconsole.log(contact);\n```",
    perLanguage: {
      cli: {
        method: 'contacts update',
        example: "zavudev contacts update \\\n  --api-key 'My API Key' \\\n  --contact-id contactId",
      },
      go: {
        method: 'client.Contacts.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcontact, err := client.Contacts.Update(\n\t\tcontext.TODO(),\n\t\t"contactId",\n\t\tzavudev.ContactUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", contact.ID)\n}\n',
      },
      http: {
        example:
          "curl https://api.zavu.dev/v1/contacts/$CONTACT_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $ZAVUDEV_API_KEY\" \\\n    -d '{}'",
      },
      php: {
        method: 'contacts->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$contact = $client->contacts->update(\n  'contactId', defaultChannel: 'sms', metadata: ['foo' => 'string']\n);\n\nvar_dump($contact);",
      },
      python: {
        method: 'contacts.update',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\ncontact = client.contacts.update(\n    contact_id="contactId",\n)\nprint(contact.id)',
      },
      ruby: {
        method: 'contacts.update',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\ncontact = zavudev.contacts.update("contactId")\n\nputs(contact)',
      },
      typescript: {
        method: 'client.contacts.update',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst contact = await client.contacts.update('contactId');\n\nconsole.log(contact.id);",
      },
    },
  },
  {
    name: 'retrieve_by_phone',
    endpoint: '/v1/contacts/phone/{phoneNumber}',
    httpMethod: 'get',
    summary: 'Get contact by phone number',
    description: 'Get contact by phone number',
    stainlessPath: '(resource) contacts > (method) retrieve_by_phone',
    qualified: 'client.contacts.retrieveByPhone',
    params: ['phoneNumber: string;'],
    response:
      "{ id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: object; updatedAt?: string; }[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }",
    markdown:
      "## retrieve_by_phone\n\n`client.contacts.retrieveByPhone(phoneNumber: string): { id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: contact_channel[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }`\n\n**get** `/v1/contacts/phone/{phoneNumber}`\n\nGet contact by phone number\n\n### Parameters\n\n- `phoneNumber: string`\n\n### Returns\n\n- `{ id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: object; updatedAt?: string; }[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `availableChannels: string[]`\n  - `createdAt: string`\n  - `metadata: object`\n  - `verified: boolean`\n  - `channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: { avgDeliveryTimeMs?: number; failureCount?: number; lastSuccessAt?: string; successCount?: number; totalAttempts?: number; }; updatedAt?: string; }[]`\n  - `countryCode?: string`\n  - `defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'`\n  - `displayName?: string`\n  - `phoneNumber?: string`\n  - `primaryEmail?: string`\n  - `primaryPhone?: string`\n  - `profileName?: string`\n  - `suggestedMergeWith?: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst contact = await client.contacts.retrieveByPhone('phoneNumber');\n\nconsole.log(contact);\n```",
    perLanguage: {
      cli: {
        method: 'contacts retrieve_by_phone',
        example:
          "zavudev contacts retrieve-by-phone \\\n  --api-key 'My API Key' \\\n  --phone-number phoneNumber",
      },
      go: {
        method: 'client.Contacts.GetByPhone',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcontact, err := client.Contacts.GetByPhone(context.TODO(), "phoneNumber")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", contact.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/contacts/phone/$PHONE_NUMBER \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'contacts->retrieveByPhone',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$contact = $client->contacts->retrieveByPhone('phoneNumber');\n\nvar_dump($contact);",
      },
      python: {
        method: 'contacts.retrieve_by_phone',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\ncontact = client.contacts.retrieve_by_phone(\n    "phoneNumber",\n)\nprint(contact.id)',
      },
      ruby: {
        method: 'contacts.retrieve_by_phone',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\ncontact = zavudev.contacts.retrieve_by_phone("phoneNumber")\n\nputs(contact)',
      },
      typescript: {
        method: 'client.contacts.retrieveByPhone',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst contact = await client.contacts.retrieveByPhone('phoneNumber');\n\nconsole.log(contact.id);",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/broadcasts',
    httpMethod: 'post',
    summary: 'Create broadcast',
    description: 'Create a new broadcast campaign. Add contacts after creation, then send.',
    stainlessPath: '(resource) broadcasts > (method) create',
    qualified: 'client.broadcasts.create',
    params: [
      "channel: 'smart' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice';",
      'name: string;',
      'content?: { filename?: string; mediaId?: string; mediaUrl?: string; mimeType?: string; templateId?: string; templateVariables?: object; };',
      'emailHtmlBody?: string;',
      'emailSubject?: string;',
      'idempotencyKey?: string;',
      "messageType?: 'text' | 'image' | 'video' | 'audio' | 'document' | 'template';",
      'metadata?: object;',
      'scheduledAt?: string;',
      'senderId?: string;',
      'text?: string;',
    ],
    response:
      '{ broadcast: { id: string; channel: broadcast_channel; createdAt: string; messageType: broadcast_message_type; name: string; status: broadcast_status; totalContacts: number; actualCost?: number; completedAt?: string; content?: broadcast_content; deliveredCount?: number; emailSubject?: string; estimatedCost?: number; failedCount?: number; metadata?: object; pendingCount?: number; reservedAmount?: number; reviewAttempts?: number; reviewResult?: object; scheduledAt?: string; senderId?: string; sendingCount?: number; startedAt?: string; text?: string; updatedAt?: string; }; }',
    markdown:
      "## create\n\n`client.broadcasts.create(channel: 'smart' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice', name: string, content?: { filename?: string; mediaId?: string; mediaUrl?: string; mimeType?: string; templateId?: string; templateVariables?: object; }, emailHtmlBody?: string, emailSubject?: string, idempotencyKey?: string, messageType?: 'text' | 'image' | 'video' | 'audio' | 'document' | 'template', metadata?: object, scheduledAt?: string, senderId?: string, text?: string): { broadcast: broadcast; }`\n\n**post** `/v1/broadcasts`\n\nCreate a new broadcast campaign. Add contacts after creation, then send.\n\n### Parameters\n\n- `channel: 'smart' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'`\n  Broadcast delivery channel. Use 'smart' for per-contact intelligent routing.\n\n- `name: string`\n  Name of the broadcast campaign.\n\n- `content?: { filename?: string; mediaId?: string; mediaUrl?: string; mimeType?: string; templateId?: string; templateVariables?: object; }`\n  Content for non-text broadcast message types.\n  - `filename?: string`\n    Filename for documents.\n  - `mediaId?: string`\n    Media ID if already uploaded.\n  - `mediaUrl?: string`\n    URL of the media file.\n  - `mimeType?: string`\n    MIME type of the media.\n  - `templateId?: string`\n    Template ID for template messages.\n  - `templateVariables?: object`\n    Default template variables (can be overridden per contact).\n\n- `emailHtmlBody?: string`\n  HTML body for email broadcasts.\n\n- `emailSubject?: string`\n  Email subject line. Required for email broadcasts.\n\n- `idempotencyKey?: string`\n  Idempotency key to prevent duplicate broadcasts.\n\n- `messageType?: 'text' | 'image' | 'video' | 'audio' | 'document' | 'template'`\n  Type of message for broadcast.\n\n- `metadata?: object`\n\n- `scheduledAt?: string`\n  Schedule the broadcast for future delivery.\n\n- `senderId?: string`\n  Sender profile ID. Uses default sender if omitted.\n\n- `text?: string`\n  Text content or caption. Supports template variables: {{name}}, {{1}}, etc.\n\n### Returns\n\n- `{ broadcast: { id: string; channel: broadcast_channel; createdAt: string; messageType: broadcast_message_type; name: string; status: broadcast_status; totalContacts: number; actualCost?: number; completedAt?: string; content?: broadcast_content; deliveredCount?: number; emailSubject?: string; estimatedCost?: number; failedCount?: number; metadata?: object; pendingCount?: number; reservedAmount?: number; reviewAttempts?: number; reviewResult?: object; scheduledAt?: string; senderId?: string; sendingCount?: number; startedAt?: string; text?: string; updatedAt?: string; }; }`\n\n  - `broadcast: { id: string; channel: 'smart' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; createdAt: string; messageType: 'text' | 'image' | 'video' | 'audio' | 'document' | 'template'; name: string; status: string; totalContacts: number; actualCost?: number; completedAt?: string; content?: { filename?: string; mediaId?: string; mediaUrl?: string; mimeType?: string; templateId?: string; templateVariables?: object; }; deliveredCount?: number; emailSubject?: string; estimatedCost?: number; failedCount?: number; metadata?: object; pendingCount?: number; reservedAmount?: number; reviewAttempts?: number; reviewResult?: { categories?: string[]; flaggedContent?: string[]; reasoning?: string; reviewedAt?: string; score?: number; }; scheduledAt?: string; senderId?: string; sendingCount?: number; startedAt?: string; text?: string; updatedAt?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst broadcast = await client.broadcasts.create({ channel: 'sms', name: 'Black Friday Sale' });\n\nconsole.log(broadcast);\n```",
    perLanguage: {
      cli: {
        method: 'broadcasts create',
        example:
          "zavudev broadcasts create \\\n  --api-key 'My API Key' \\\n  --channel sms \\\n  --name 'Black Friday Sale'",
      },
      go: {
        method: 'client.Broadcasts.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tbroadcast, err := client.Broadcasts.New(context.TODO(), zavudev.BroadcastNewParams{\n\t\tChannel: zavudev.BroadcastChannelSMS,\n\t\tName:    "Black Friday Sale",\n\t\tText:    zavudev.String("Hi {{name}}, check out our Black Friday deals! Use code FRIDAY20 for 20% off."),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", broadcast.Broadcast)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/broadcasts \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY" \\\n    -d \'{\n          "channel": "sms",\n          "name": "Black Friday Sale",\n          "text": "Hi {{name}}, check out our Black Friday deals! Use code FRIDAY20 for 20% off."\n        }\'',
      },
      php: {
        method: 'broadcasts->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$broadcast = $client->broadcasts->create(\n  channel: BroadcastChannel::SMS,\n  name: 'Black Friday Sale',\n  content: [\n    'filename' => 'filename',\n    'mediaID' => 'mediaId',\n    'mediaURL' => 'mediaUrl',\n    'mimeType' => 'mimeType',\n    'templateID' => 'templateId',\n    'templateVariables' => ['foo' => 'string'],\n  ],\n  emailHTMLBody: 'emailHtmlBody',\n  emailSubject: 'emailSubject',\n  idempotencyKey: 'idempotencyKey',\n  messageType: BroadcastMessageType::TEXT,\n  metadata: ['foo' => 'string'],\n  scheduledAt: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  senderID: 'senderId',\n  text: 'Hi {{name}}, check out our Black Friday deals! Use code FRIDAY20 for 20% off.',\n);\n\nvar_dump($broadcast);",
      },
      python: {
        method: 'broadcasts.create',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nbroadcast = client.broadcasts.create(\n    channel="sms",\n    name="Black Friday Sale",\n    text="Hi {{name}}, check out our Black Friday deals! Use code FRIDAY20 for 20% off.",\n)\nprint(broadcast.broadcast)',
      },
      ruby: {
        method: 'broadcasts.create',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nbroadcast = zavudev.broadcasts.create(channel: :sms, name: "Black Friday Sale")\n\nputs(broadcast)',
      },
      typescript: {
        method: 'client.broadcasts.create',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst broadcast = await client.broadcasts.create({\n  channel: 'sms',\n  name: 'Black Friday Sale',\n  text: 'Hi {{name}}, check out our Black Friday deals! Use code FRIDAY20 for 20% off.',\n});\n\nconsole.log(broadcast.broadcast);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/broadcasts',
    httpMethod: 'get',
    summary: 'List broadcasts',
    description: 'List broadcasts for this project.',
    stainlessPath: '(resource) broadcasts > (method) list',
    qualified: 'client.broadcasts.list',
    params: ['cursor?: string;', 'limit?: number;', 'status?: string;'],
    response:
      "{ id: string; channel: 'smart' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; createdAt: string; messageType: 'text' | 'image' | 'video' | 'audio' | 'document' | 'template'; name: string; status: string; totalContacts: number; actualCost?: number; completedAt?: string; content?: { filename?: string; mediaId?: string; mediaUrl?: string; mimeType?: string; templateId?: string; templateVariables?: object; }; deliveredCount?: number; emailSubject?: string; estimatedCost?: number; failedCount?: number; metadata?: object; pendingCount?: number; reservedAmount?: number; reviewAttempts?: number; reviewResult?: { categories?: string[]; flaggedContent?: string[]; reasoning?: string; reviewedAt?: string; score?: number; }; scheduledAt?: string; senderId?: string; sendingCount?: number; startedAt?: string; text?: string; updatedAt?: string; }",
    markdown:
      "## list\n\n`client.broadcasts.list(cursor?: string, limit?: number, status?: string): { id: string; channel: broadcast_channel; createdAt: string; messageType: broadcast_message_type; name: string; status: broadcast_status; totalContacts: number; actualCost?: number; completedAt?: string; content?: broadcast_content; deliveredCount?: number; emailSubject?: string; estimatedCost?: number; failedCount?: number; metadata?: object; pendingCount?: number; reservedAmount?: number; reviewAttempts?: number; reviewResult?: object; scheduledAt?: string; senderId?: string; sendingCount?: number; startedAt?: string; text?: string; updatedAt?: string; }`\n\n**get** `/v1/broadcasts`\n\nList broadcasts for this project.\n\n### Parameters\n\n- `cursor?: string`\n\n- `limit?: number`\n\n- `status?: string`\n  Current status of the broadcast.\n\n### Returns\n\n- `{ id: string; channel: 'smart' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; createdAt: string; messageType: 'text' | 'image' | 'video' | 'audio' | 'document' | 'template'; name: string; status: string; totalContacts: number; actualCost?: number; completedAt?: string; content?: { filename?: string; mediaId?: string; mediaUrl?: string; mimeType?: string; templateId?: string; templateVariables?: object; }; deliveredCount?: number; emailSubject?: string; estimatedCost?: number; failedCount?: number; metadata?: object; pendingCount?: number; reservedAmount?: number; reviewAttempts?: number; reviewResult?: { categories?: string[]; flaggedContent?: string[]; reasoning?: string; reviewedAt?: string; score?: number; }; scheduledAt?: string; senderId?: string; sendingCount?: number; startedAt?: string; text?: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `channel: 'smart' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'`\n  - `createdAt: string`\n  - `messageType: 'text' | 'image' | 'video' | 'audio' | 'document' | 'template'`\n  - `name: string`\n  - `status: string`\n  - `totalContacts: number`\n  - `actualCost?: number`\n  - `completedAt?: string`\n  - `content?: { filename?: string; mediaId?: string; mediaUrl?: string; mimeType?: string; templateId?: string; templateVariables?: object; }`\n  - `deliveredCount?: number`\n  - `emailSubject?: string`\n  - `estimatedCost?: number`\n  - `failedCount?: number`\n  - `metadata?: object`\n  - `pendingCount?: number`\n  - `reservedAmount?: number`\n  - `reviewAttempts?: number`\n  - `reviewResult?: { categories?: string[]; flaggedContent?: string[]; reasoning?: string; reviewedAt?: string; score?: number; }`\n  - `scheduledAt?: string`\n  - `senderId?: string`\n  - `sendingCount?: number`\n  - `startedAt?: string`\n  - `text?: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\n// Automatically fetches more pages as needed.\nfor await (const broadcast of client.broadcasts.list()) {\n  console.log(broadcast);\n}\n```",
    perLanguage: {
      cli: {
        method: 'broadcasts list',
        example: "zavudev broadcasts list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Broadcasts.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Broadcasts.List(context.TODO(), zavudev.BroadcastListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/broadcasts \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'broadcasts->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->broadcasts->list(\n  cursor: 'cursor', limit: 100, status: BroadcastStatus::DRAFT\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'broadcasts.list',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\npage = client.broadcasts.list()\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'broadcasts.list',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\npage = zavudev.broadcasts.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.broadcasts.list',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const broadcast of client.broadcasts.list()) {\n  console.log(broadcast.id);\n}",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/broadcasts/{broadcastId}',
    httpMethod: 'get',
    summary: 'Get broadcast',
    description: 'Get broadcast',
    stainlessPath: '(resource) broadcasts > (method) retrieve',
    qualified: 'client.broadcasts.retrieve',
    params: ['broadcastId: string;'],
    response:
      '{ broadcast: { id: string; channel: broadcast_channel; createdAt: string; messageType: broadcast_message_type; name: string; status: broadcast_status; totalContacts: number; actualCost?: number; completedAt?: string; content?: broadcast_content; deliveredCount?: number; emailSubject?: string; estimatedCost?: number; failedCount?: number; metadata?: object; pendingCount?: number; reservedAmount?: number; reviewAttempts?: number; reviewResult?: object; scheduledAt?: string; senderId?: string; sendingCount?: number; startedAt?: string; text?: string; updatedAt?: string; }; }',
    markdown:
      "## retrieve\n\n`client.broadcasts.retrieve(broadcastId: string): { broadcast: broadcast; }`\n\n**get** `/v1/broadcasts/{broadcastId}`\n\nGet broadcast\n\n### Parameters\n\n- `broadcastId: string`\n\n### Returns\n\n- `{ broadcast: { id: string; channel: broadcast_channel; createdAt: string; messageType: broadcast_message_type; name: string; status: broadcast_status; totalContacts: number; actualCost?: number; completedAt?: string; content?: broadcast_content; deliveredCount?: number; emailSubject?: string; estimatedCost?: number; failedCount?: number; metadata?: object; pendingCount?: number; reservedAmount?: number; reviewAttempts?: number; reviewResult?: object; scheduledAt?: string; senderId?: string; sendingCount?: number; startedAt?: string; text?: string; updatedAt?: string; }; }`\n\n  - `broadcast: { id: string; channel: 'smart' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; createdAt: string; messageType: 'text' | 'image' | 'video' | 'audio' | 'document' | 'template'; name: string; status: string; totalContacts: number; actualCost?: number; completedAt?: string; content?: { filename?: string; mediaId?: string; mediaUrl?: string; mimeType?: string; templateId?: string; templateVariables?: object; }; deliveredCount?: number; emailSubject?: string; estimatedCost?: number; failedCount?: number; metadata?: object; pendingCount?: number; reservedAmount?: number; reviewAttempts?: number; reviewResult?: { categories?: string[]; flaggedContent?: string[]; reasoning?: string; reviewedAt?: string; score?: number; }; scheduledAt?: string; senderId?: string; sendingCount?: number; startedAt?: string; text?: string; updatedAt?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst broadcast = await client.broadcasts.retrieve('broadcastId');\n\nconsole.log(broadcast);\n```",
    perLanguage: {
      cli: {
        method: 'broadcasts retrieve',
        example: "zavudev broadcasts retrieve \\\n  --api-key 'My API Key' \\\n  --broadcast-id broadcastId",
      },
      go: {
        method: 'client.Broadcasts.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tbroadcast, err := client.Broadcasts.Get(context.TODO(), "broadcastId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", broadcast.Broadcast)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/broadcasts/$BROADCAST_ID \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'broadcasts->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$broadcast = $client->broadcasts->retrieve('broadcastId');\n\nvar_dump($broadcast);",
      },
      python: {
        method: 'broadcasts.retrieve',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nbroadcast = client.broadcasts.retrieve(\n    "broadcastId",\n)\nprint(broadcast.broadcast)',
      },
      ruby: {
        method: 'broadcasts.retrieve',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nbroadcast = zavudev.broadcasts.retrieve("broadcastId")\n\nputs(broadcast)',
      },
      typescript: {
        method: 'client.broadcasts.retrieve',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst broadcast = await client.broadcasts.retrieve('broadcastId');\n\nconsole.log(broadcast.broadcast);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/broadcasts/{broadcastId}',
    httpMethod: 'patch',
    summary: 'Update broadcast',
    description: 'Update a broadcast in draft status.',
    stainlessPath: '(resource) broadcasts > (method) update',
    qualified: 'client.broadcasts.update',
    params: [
      'broadcastId: string;',
      'content?: { filename?: string; mediaId?: string; mediaUrl?: string; mimeType?: string; templateId?: string; templateVariables?: object; };',
      'emailHtmlBody?: string;',
      'emailSubject?: string;',
      'metadata?: object;',
      'name?: string;',
      'text?: string;',
    ],
    response:
      '{ broadcast: { id: string; channel: broadcast_channel; createdAt: string; messageType: broadcast_message_type; name: string; status: broadcast_status; totalContacts: number; actualCost?: number; completedAt?: string; content?: broadcast_content; deliveredCount?: number; emailSubject?: string; estimatedCost?: number; failedCount?: number; metadata?: object; pendingCount?: number; reservedAmount?: number; reviewAttempts?: number; reviewResult?: object; scheduledAt?: string; senderId?: string; sendingCount?: number; startedAt?: string; text?: string; updatedAt?: string; }; }',
    markdown:
      "## update\n\n`client.broadcasts.update(broadcastId: string, content?: { filename?: string; mediaId?: string; mediaUrl?: string; mimeType?: string; templateId?: string; templateVariables?: object; }, emailHtmlBody?: string, emailSubject?: string, metadata?: object, name?: string, text?: string): { broadcast: broadcast; }`\n\n**patch** `/v1/broadcasts/{broadcastId}`\n\nUpdate a broadcast in draft status.\n\n### Parameters\n\n- `broadcastId: string`\n\n- `content?: { filename?: string; mediaId?: string; mediaUrl?: string; mimeType?: string; templateId?: string; templateVariables?: object; }`\n  Content for non-text broadcast message types.\n  - `filename?: string`\n    Filename for documents.\n  - `mediaId?: string`\n    Media ID if already uploaded.\n  - `mediaUrl?: string`\n    URL of the media file.\n  - `mimeType?: string`\n    MIME type of the media.\n  - `templateId?: string`\n    Template ID for template messages.\n  - `templateVariables?: object`\n    Default template variables (can be overridden per contact).\n\n- `emailHtmlBody?: string`\n\n- `emailSubject?: string`\n\n- `metadata?: object`\n\n- `name?: string`\n\n- `text?: string`\n\n### Returns\n\n- `{ broadcast: { id: string; channel: broadcast_channel; createdAt: string; messageType: broadcast_message_type; name: string; status: broadcast_status; totalContacts: number; actualCost?: number; completedAt?: string; content?: broadcast_content; deliveredCount?: number; emailSubject?: string; estimatedCost?: number; failedCount?: number; metadata?: object; pendingCount?: number; reservedAmount?: number; reviewAttempts?: number; reviewResult?: object; scheduledAt?: string; senderId?: string; sendingCount?: number; startedAt?: string; text?: string; updatedAt?: string; }; }`\n\n  - `broadcast: { id: string; channel: 'smart' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; createdAt: string; messageType: 'text' | 'image' | 'video' | 'audio' | 'document' | 'template'; name: string; status: string; totalContacts: number; actualCost?: number; completedAt?: string; content?: { filename?: string; mediaId?: string; mediaUrl?: string; mimeType?: string; templateId?: string; templateVariables?: object; }; deliveredCount?: number; emailSubject?: string; estimatedCost?: number; failedCount?: number; metadata?: object; pendingCount?: number; reservedAmount?: number; reviewAttempts?: number; reviewResult?: { categories?: string[]; flaggedContent?: string[]; reasoning?: string; reviewedAt?: string; score?: number; }; scheduledAt?: string; senderId?: string; sendingCount?: number; startedAt?: string; text?: string; updatedAt?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst broadcast = await client.broadcasts.update('broadcastId');\n\nconsole.log(broadcast);\n```",
    perLanguage: {
      cli: {
        method: 'broadcasts update',
        example: "zavudev broadcasts update \\\n  --api-key 'My API Key' \\\n  --broadcast-id broadcastId",
      },
      go: {
        method: 'client.Broadcasts.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tbroadcast, err := client.Broadcasts.Update(\n\t\tcontext.TODO(),\n\t\t"broadcastId",\n\t\tzavudev.BroadcastUpdateParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", broadcast.Broadcast)\n}\n',
      },
      http: {
        example:
          "curl https://api.zavu.dev/v1/broadcasts/$BROADCAST_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $ZAVUDEV_API_KEY\" \\\n    -d '{}'",
      },
      php: {
        method: 'broadcasts->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$broadcast = $client->broadcasts->update(\n  'broadcastId',\n  content: [\n    'filename' => 'filename',\n    'mediaID' => 'mediaId',\n    'mediaURL' => 'mediaUrl',\n    'mimeType' => 'mimeType',\n    'templateID' => 'templateId',\n    'templateVariables' => ['foo' => 'string'],\n  ],\n  emailHTMLBody: 'emailHtmlBody',\n  emailSubject: 'emailSubject',\n  metadata: ['foo' => 'string'],\n  name: 'name',\n  text: 'text',\n);\n\nvar_dump($broadcast);",
      },
      python: {
        method: 'broadcasts.update',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nbroadcast = client.broadcasts.update(\n    broadcast_id="broadcastId",\n)\nprint(broadcast.broadcast)',
      },
      ruby: {
        method: 'broadcasts.update',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nbroadcast = zavudev.broadcasts.update("broadcastId")\n\nputs(broadcast)',
      },
      typescript: {
        method: 'client.broadcasts.update',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst broadcast = await client.broadcasts.update('broadcastId');\n\nconsole.log(broadcast.broadcast);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/broadcasts/{broadcastId}',
    httpMethod: 'delete',
    summary: 'Delete broadcast',
    description: 'Delete a broadcast in draft status.',
    stainlessPath: '(resource) broadcasts > (method) delete',
    qualified: 'client.broadcasts.delete',
    params: ['broadcastId: string;'],
    markdown:
      "## delete\n\n`client.broadcasts.delete(broadcastId: string): void`\n\n**delete** `/v1/broadcasts/{broadcastId}`\n\nDelete a broadcast in draft status.\n\n### Parameters\n\n- `broadcastId: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nawait client.broadcasts.delete('broadcastId')\n```",
    perLanguage: {
      cli: {
        method: 'broadcasts delete',
        example: "zavudev broadcasts delete \\\n  --api-key 'My API Key' \\\n  --broadcast-id broadcastId",
      },
      go: {
        method: 'client.Broadcasts.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Broadcasts.Delete(context.TODO(), "broadcastId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/broadcasts/$BROADCAST_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'broadcasts->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$result = $client->broadcasts->delete('broadcastId');\n\nvar_dump($result);",
      },
      python: {
        method: 'broadcasts.delete',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nclient.broadcasts.delete(\n    "broadcastId",\n)',
      },
      ruby: {
        method: 'broadcasts.delete',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresult = zavudev.broadcasts.delete("broadcastId")\n\nputs(result)',
      },
      typescript: {
        method: 'client.broadcasts.delete',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.broadcasts.delete('broadcastId');",
      },
    },
  },
  {
    name: 'send',
    endpoint: '/v1/broadcasts/{broadcastId}/send',
    httpMethod: 'post',
    summary: 'Send broadcast',
    description:
      'Start sending the broadcast immediately or schedule for later. Broadcasts go through automated AI content review before sending. If the review passes, the broadcast proceeds. If rejected, use PATCH to edit content, then call POST /retry-review. Reserves the estimated cost from your balance.',
    stainlessPath: '(resource) broadcasts > (method) send',
    qualified: 'client.broadcasts.send',
    params: ['broadcastId: string;', 'scheduledAt?: string;'],
    response:
      '{ broadcast: { id: string; channel: broadcast_channel; createdAt: string; messageType: broadcast_message_type; name: string; status: broadcast_status; totalContacts: number; actualCost?: number; completedAt?: string; content?: broadcast_content; deliveredCount?: number; emailSubject?: string; estimatedCost?: number; failedCount?: number; metadata?: object; pendingCount?: number; reservedAmount?: number; reviewAttempts?: number; reviewResult?: object; scheduledAt?: string; senderId?: string; sendingCount?: number; startedAt?: string; text?: string; updatedAt?: string; }; }',
    markdown:
      "## send\n\n`client.broadcasts.send(broadcastId: string, scheduledAt?: string): { broadcast: broadcast; }`\n\n**post** `/v1/broadcasts/{broadcastId}/send`\n\nStart sending the broadcast immediately or schedule for later. Broadcasts go through automated AI content review before sending. If the review passes, the broadcast proceeds. If rejected, use PATCH to edit content, then call POST /retry-review. Reserves the estimated cost from your balance.\n\n### Parameters\n\n- `broadcastId: string`\n\n- `scheduledAt?: string`\n  Schedule for future delivery. Omit to send immediately.\n\n### Returns\n\n- `{ broadcast: { id: string; channel: broadcast_channel; createdAt: string; messageType: broadcast_message_type; name: string; status: broadcast_status; totalContacts: number; actualCost?: number; completedAt?: string; content?: broadcast_content; deliveredCount?: number; emailSubject?: string; estimatedCost?: number; failedCount?: number; metadata?: object; pendingCount?: number; reservedAmount?: number; reviewAttempts?: number; reviewResult?: object; scheduledAt?: string; senderId?: string; sendingCount?: number; startedAt?: string; text?: string; updatedAt?: string; }; }`\n\n  - `broadcast: { id: string; channel: 'smart' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; createdAt: string; messageType: 'text' | 'image' | 'video' | 'audio' | 'document' | 'template'; name: string; status: string; totalContacts: number; actualCost?: number; completedAt?: string; content?: { filename?: string; mediaId?: string; mediaUrl?: string; mimeType?: string; templateId?: string; templateVariables?: object; }; deliveredCount?: number; emailSubject?: string; estimatedCost?: number; failedCount?: number; metadata?: object; pendingCount?: number; reservedAmount?: number; reviewAttempts?: number; reviewResult?: { categories?: string[]; flaggedContent?: string[]; reasoning?: string; reviewedAt?: string; score?: number; }; scheduledAt?: string; senderId?: string; sendingCount?: number; startedAt?: string; text?: string; updatedAt?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst response = await client.broadcasts.send('broadcastId');\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'broadcasts send',
        example: "zavudev broadcasts send \\\n  --api-key 'My API Key' \\\n  --broadcast-id broadcastId",
      },
      go: {
        method: 'client.Broadcasts.Send',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Broadcasts.Send(\n\t\tcontext.TODO(),\n\t\t"broadcastId",\n\t\tzavudev.BroadcastSendParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Broadcast)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/broadcasts/$BROADCAST_ID/send \\\n    -X POST \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'broadcasts->send',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->broadcasts->send(\n  'broadcastId', scheduledAt: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z')\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'broadcasts.send',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.broadcasts.send(\n    broadcast_id="broadcastId",\n)\nprint(response.broadcast)',
      },
      ruby: {
        method: 'broadcasts.send_',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresponse = zavudev.broadcasts.send_("broadcastId")\n\nputs(response)',
      },
      typescript: {
        method: 'client.broadcasts.send',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.broadcasts.send('broadcastId');\n\nconsole.log(response.broadcast);",
      },
    },
  },
  {
    name: 'cancel',
    endpoint: '/v1/broadcasts/{broadcastId}/cancel',
    httpMethod: 'post',
    summary: 'Cancel broadcast',
    description:
      'Cancel a broadcast. Pending contacts will be skipped, but already queued messages may still be delivered.',
    stainlessPath: '(resource) broadcasts > (method) cancel',
    qualified: 'client.broadcasts.cancel',
    params: ['broadcastId: string;'],
    response:
      '{ broadcast: { id: string; channel: broadcast_channel; createdAt: string; messageType: broadcast_message_type; name: string; status: broadcast_status; totalContacts: number; actualCost?: number; completedAt?: string; content?: broadcast_content; deliveredCount?: number; emailSubject?: string; estimatedCost?: number; failedCount?: number; metadata?: object; pendingCount?: number; reservedAmount?: number; reviewAttempts?: number; reviewResult?: object; scheduledAt?: string; senderId?: string; sendingCount?: number; startedAt?: string; text?: string; updatedAt?: string; }; }',
    markdown:
      "## cancel\n\n`client.broadcasts.cancel(broadcastId: string): { broadcast: broadcast; }`\n\n**post** `/v1/broadcasts/{broadcastId}/cancel`\n\nCancel a broadcast. Pending contacts will be skipped, but already queued messages may still be delivered.\n\n### Parameters\n\n- `broadcastId: string`\n\n### Returns\n\n- `{ broadcast: { id: string; channel: broadcast_channel; createdAt: string; messageType: broadcast_message_type; name: string; status: broadcast_status; totalContacts: number; actualCost?: number; completedAt?: string; content?: broadcast_content; deliveredCount?: number; emailSubject?: string; estimatedCost?: number; failedCount?: number; metadata?: object; pendingCount?: number; reservedAmount?: number; reviewAttempts?: number; reviewResult?: object; scheduledAt?: string; senderId?: string; sendingCount?: number; startedAt?: string; text?: string; updatedAt?: string; }; }`\n\n  - `broadcast: { id: string; channel: 'smart' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; createdAt: string; messageType: 'text' | 'image' | 'video' | 'audio' | 'document' | 'template'; name: string; status: string; totalContacts: number; actualCost?: number; completedAt?: string; content?: { filename?: string; mediaId?: string; mediaUrl?: string; mimeType?: string; templateId?: string; templateVariables?: object; }; deliveredCount?: number; emailSubject?: string; estimatedCost?: number; failedCount?: number; metadata?: object; pendingCount?: number; reservedAmount?: number; reviewAttempts?: number; reviewResult?: { categories?: string[]; flaggedContent?: string[]; reasoning?: string; reviewedAt?: string; score?: number; }; scheduledAt?: string; senderId?: string; sendingCount?: number; startedAt?: string; text?: string; updatedAt?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst response = await client.broadcasts.cancel('broadcastId');\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'broadcasts cancel',
        example: "zavudev broadcasts cancel \\\n  --api-key 'My API Key' \\\n  --broadcast-id broadcastId",
      },
      go: {
        method: 'client.Broadcasts.Cancel',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Broadcasts.Cancel(context.TODO(), "broadcastId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Broadcast)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/broadcasts/$BROADCAST_ID/cancel \\\n    -X POST \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'broadcasts->cancel',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->broadcasts->cancel('broadcastId');\n\nvar_dump($response);",
      },
      python: {
        method: 'broadcasts.cancel',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.broadcasts.cancel(\n    "broadcastId",\n)\nprint(response.broadcast)',
      },
      ruby: {
        method: 'broadcasts.cancel',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresponse = zavudev.broadcasts.cancel("broadcastId")\n\nputs(response)',
      },
      typescript: {
        method: 'client.broadcasts.cancel',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.broadcasts.cancel('broadcastId');\n\nconsole.log(response.broadcast);",
      },
    },
  },
  {
    name: 'progress',
    endpoint: '/v1/broadcasts/{broadcastId}/progress',
    httpMethod: 'get',
    summary: 'Get broadcast progress',
    description:
      'Get real-time progress of a broadcast including delivery counts and estimated completion time.',
    stainlessPath: '(resource) broadcasts > (method) progress',
    qualified: 'client.broadcasts.progress',
    params: ['broadcastId: string;'],
    response:
      '{ broadcastId: string; delivered: number; failed: number; pending: number; percentComplete: number; sending: number; skipped: number; status: string; total: number; actualCost?: number; estimatedCompletionAt?: string; estimatedCost?: number; reservedAmount?: number; startedAt?: string; }',
    markdown:
      "## progress\n\n`client.broadcasts.progress(broadcastId: string): { broadcastId: string; delivered: number; failed: number; pending: number; percentComplete: number; sending: number; skipped: number; status: broadcast_status; total: number; actualCost?: number; estimatedCompletionAt?: string; estimatedCost?: number; reservedAmount?: number; startedAt?: string; }`\n\n**get** `/v1/broadcasts/{broadcastId}/progress`\n\nGet real-time progress of a broadcast including delivery counts and estimated completion time.\n\n### Parameters\n\n- `broadcastId: string`\n\n### Returns\n\n- `{ broadcastId: string; delivered: number; failed: number; pending: number; percentComplete: number; sending: number; skipped: number; status: string; total: number; actualCost?: number; estimatedCompletionAt?: string; estimatedCost?: number; reservedAmount?: number; startedAt?: string; }`\n\n  - `broadcastId: string`\n  - `delivered: number`\n  - `failed: number`\n  - `pending: number`\n  - `percentComplete: number`\n  - `sending: number`\n  - `skipped: number`\n  - `status: string`\n  - `total: number`\n  - `actualCost?: number`\n  - `estimatedCompletionAt?: string`\n  - `estimatedCost?: number`\n  - `reservedAmount?: number`\n  - `startedAt?: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst broadcastProgress = await client.broadcasts.progress('broadcastId');\n\nconsole.log(broadcastProgress);\n```",
    perLanguage: {
      cli: {
        method: 'broadcasts progress',
        example: "zavudev broadcasts progress \\\n  --api-key 'My API Key' \\\n  --broadcast-id broadcastId",
      },
      go: {
        method: 'client.Broadcasts.Progress',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tbroadcastProgress, err := client.Broadcasts.Progress(context.TODO(), "broadcastId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", broadcastProgress.BroadcastID)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/broadcasts/$BROADCAST_ID/progress \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'broadcasts->progress',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$broadcastProgress = $client->broadcasts->progress('broadcastId');\n\nvar_dump($broadcastProgress);",
      },
      python: {
        method: 'broadcasts.progress',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nbroadcast_progress = client.broadcasts.progress(\n    "broadcastId",\n)\nprint(broadcast_progress.broadcast_id)',
      },
      ruby: {
        method: 'broadcasts.progress',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nbroadcast_progress = zavudev.broadcasts.progress("broadcastId")\n\nputs(broadcast_progress)',
      },
      typescript: {
        method: 'client.broadcasts.progress',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst broadcastProgress = await client.broadcasts.progress('broadcastId');\n\nconsole.log(broadcastProgress.broadcastId);",
      },
    },
  },
  {
    name: 'reschedule',
    endpoint: '/v1/broadcasts/{broadcastId}/schedule',
    httpMethod: 'patch',
    summary: 'Reschedule broadcast',
    description: 'Update the scheduled time for a broadcast. The broadcast must be in scheduled status.',
    stainlessPath: '(resource) broadcasts > (method) reschedule',
    qualified: 'client.broadcasts.reschedule',
    params: ['broadcastId: string;', 'scheduledAt: string;'],
    response:
      '{ broadcast: { id: string; channel: broadcast_channel; createdAt: string; messageType: broadcast_message_type; name: string; status: broadcast_status; totalContacts: number; actualCost?: number; completedAt?: string; content?: broadcast_content; deliveredCount?: number; emailSubject?: string; estimatedCost?: number; failedCount?: number; metadata?: object; pendingCount?: number; reservedAmount?: number; reviewAttempts?: number; reviewResult?: object; scheduledAt?: string; senderId?: string; sendingCount?: number; startedAt?: string; text?: string; updatedAt?: string; }; }',
    markdown:
      "## reschedule\n\n`client.broadcasts.reschedule(broadcastId: string, scheduledAt: string): { broadcast: broadcast; }`\n\n**patch** `/v1/broadcasts/{broadcastId}/schedule`\n\nUpdate the scheduled time for a broadcast. The broadcast must be in scheduled status.\n\n### Parameters\n\n- `broadcastId: string`\n\n- `scheduledAt: string`\n  New scheduled time for the broadcast.\n\n### Returns\n\n- `{ broadcast: { id: string; channel: broadcast_channel; createdAt: string; messageType: broadcast_message_type; name: string; status: broadcast_status; totalContacts: number; actualCost?: number; completedAt?: string; content?: broadcast_content; deliveredCount?: number; emailSubject?: string; estimatedCost?: number; failedCount?: number; metadata?: object; pendingCount?: number; reservedAmount?: number; reviewAttempts?: number; reviewResult?: object; scheduledAt?: string; senderId?: string; sendingCount?: number; startedAt?: string; text?: string; updatedAt?: string; }; }`\n\n  - `broadcast: { id: string; channel: 'smart' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; createdAt: string; messageType: 'text' | 'image' | 'video' | 'audio' | 'document' | 'template'; name: string; status: string; totalContacts: number; actualCost?: number; completedAt?: string; content?: { filename?: string; mediaId?: string; mediaUrl?: string; mimeType?: string; templateId?: string; templateVariables?: object; }; deliveredCount?: number; emailSubject?: string; estimatedCost?: number; failedCount?: number; metadata?: object; pendingCount?: number; reservedAmount?: number; reviewAttempts?: number; reviewResult?: { categories?: string[]; flaggedContent?: string[]; reasoning?: string; reviewedAt?: string; score?: number; }; scheduledAt?: string; senderId?: string; sendingCount?: number; startedAt?: string; text?: string; updatedAt?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst response = await client.broadcasts.reschedule('broadcastId', { scheduledAt: '2024-01-15T14:00:00Z' });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'broadcasts reschedule',
        example:
          "zavudev broadcasts reschedule \\\n  --api-key 'My API Key' \\\n  --broadcast-id broadcastId \\\n  --scheduled-at \"'2024-01-15T14:00:00Z'\"",
      },
      go: {
        method: 'client.Broadcasts.Reschedule',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\t"time"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Broadcasts.Reschedule(\n\t\tcontext.TODO(),\n\t\t"broadcastId",\n\t\tzavudev.BroadcastRescheduleParams{\n\t\t\tScheduledAt: time.Now(),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Broadcast)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/broadcasts/$BROADCAST_ID/schedule \\\n    -X PATCH \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY" \\\n    -d \'{\n          "scheduledAt": "2024-01-15T14:00:00Z"\n        }\'',
      },
      php: {
        method: 'broadcasts->reschedule',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->broadcasts->reschedule(\n  'broadcastId', scheduledAt: new \\DateTimeImmutable('2024-01-15T14:00:00Z')\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'broadcasts.reschedule',
        example:
          'import os\nfrom datetime import datetime\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.broadcasts.reschedule(\n    broadcast_id="broadcastId",\n    scheduled_at=datetime.fromisoformat("2024-01-15T14:00:00"),\n)\nprint(response.broadcast)',
      },
      ruby: {
        method: 'broadcasts.reschedule',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresponse = zavudev.broadcasts.reschedule("broadcastId", scheduled_at: "2024-01-15T14:00:00Z")\n\nputs(response)',
      },
      typescript: {
        method: 'client.broadcasts.reschedule',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.broadcasts.reschedule('broadcastId', {\n  scheduledAt: '2024-01-15T14:00:00Z',\n});\n\nconsole.log(response.broadcast);",
      },
    },
  },
  {
    name: 'add',
    endpoint: '/v1/broadcasts/{broadcastId}/contacts',
    httpMethod: 'post',
    summary: 'Add contacts to broadcast',
    description: 'Add contacts to a broadcast in batch. Maximum 1000 contacts per request.',
    stainlessPath: '(resource) broadcasts.contacts > (method) add',
    qualified: 'client.broadcasts.contacts.add',
    params: ['broadcastId: string;', 'contacts: { recipient: string; templateVariables?: object; }[];'],
    response:
      '{ added: number; duplicates: number; invalid: number; errors?: { reason?: string; recipient?: string; }[]; }',
    markdown:
      "## add\n\n`client.broadcasts.contacts.add(broadcastId: string, contacts: { recipient: string; templateVariables?: object; }[]): { added: number; duplicates: number; invalid: number; errors?: object[]; }`\n\n**post** `/v1/broadcasts/{broadcastId}/contacts`\n\nAdd contacts to a broadcast in batch. Maximum 1000 contacts per request.\n\n### Parameters\n\n- `broadcastId: string`\n\n- `contacts: { recipient: string; templateVariables?: object; }[]`\n  List of contacts to add (max 1000 per request).\n\n### Returns\n\n- `{ added: number; duplicates: number; invalid: number; errors?: { reason?: string; recipient?: string; }[]; }`\n\n  - `added: number`\n  - `duplicates: number`\n  - `invalid: number`\n  - `errors?: { reason?: string; recipient?: string; }[]`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst response = await client.broadcasts.contacts.add('broadcastId', { contacts: [{ recipient: '+14155551234' }, { recipient: '+14155555678' }] });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'contacts add',
        example:
          "zavudev broadcasts:contacts add \\\n  --api-key 'My API Key' \\\n  --broadcast-id broadcastId \\\n  --contact \"{recipient: '+14155551234'}\" \\\n  --contact \"{recipient: '+14155555678'}\"",
      },
      go: {
        method: 'client.Broadcasts.Contacts.Add',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Broadcasts.Contacts.Add(\n\t\tcontext.TODO(),\n\t\t"broadcastId",\n\t\tzavudev.BroadcastContactAddParams{\n\t\t\tContacts: []zavudev.BroadcastContactAddParamsContact{{\n\t\t\t\tRecipient: "+14155551234",\n\t\t\t\tTemplateVariables: map[string]string{\n\t\t\t\t\t"name":     "John",\n\t\t\t\t\t"order_id": "ORD-001",\n\t\t\t\t},\n\t\t\t}, {\n\t\t\t\tRecipient: "+14155555678",\n\t\t\t\tTemplateVariables: map[string]string{\n\t\t\t\t\t"name":     "Jane",\n\t\t\t\t\t"order_id": "ORD-002",\n\t\t\t\t},\n\t\t\t}},\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Invalid)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/broadcasts/$BROADCAST_ID/contacts \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY" \\\n    -d \'{\n          "contacts": [\n            {\n              "recipient": "+14155551234",\n              "templateVariables": {\n                "name": "John",\n                "order_id": "ORD-001"\n              }\n            },\n            {\n              "recipient": "+14155555678",\n              "templateVariables": {\n                "name": "Jane",\n                "order_id": "ORD-002"\n              }\n            }\n          ]\n        }\'',
      },
      php: {
        method: 'broadcasts->contacts->add',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->broadcasts->contacts->add(\n  'broadcastId',\n  contacts: [\n    [\n      'recipient' => '+14155551234',\n      'templateVariables' => ['name' => 'John', 'order_id' => 'ORD-001'],\n    ],\n    [\n      'recipient' => '+14155555678',\n      'templateVariables' => ['name' => 'Jane', 'order_id' => 'ORD-002'],\n    ],\n  ],\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'broadcasts.contacts.add',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.broadcasts.contacts.add(\n    broadcast_id="broadcastId",\n    contacts=[{\n        "recipient": "+14155551234",\n        "template_variables": {\n            "name": "John",\n            "order_id": "ORD-001",\n        },\n    }, {\n        "recipient": "+14155555678",\n        "template_variables": {\n            "name": "Jane",\n            "order_id": "ORD-002",\n        },\n    }],\n)\nprint(response.invalid)',
      },
      ruby: {
        method: 'broadcasts.contacts.add',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresponse = zavudev.broadcasts.contacts.add(\n  "broadcastId",\n  contacts: [{recipient: "+14155551234"}, {recipient: "+14155555678"}]\n)\n\nputs(response)',
      },
      typescript: {
        method: 'client.broadcasts.contacts.add',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.broadcasts.contacts.add('broadcastId', {\n  contacts: [\n    {\n      recipient: '+14155551234',\n      templateVariables: { name: 'John', order_id: 'ORD-001' },\n    },\n    {\n      recipient: '+14155555678',\n      templateVariables: { name: 'Jane', order_id: 'ORD-002' },\n    },\n  ],\n});\n\nconsole.log(response.invalid);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/broadcasts/{broadcastId}/contacts',
    httpMethod: 'get',
    summary: 'List broadcast contacts',
    description: 'List contacts in a broadcast with optional status filter.',
    stainlessPath: '(resource) broadcasts.contacts > (method) list',
    qualified: 'client.broadcasts.contacts.list',
    params: [
      'broadcastId: string;',
      'cursor?: string;',
      'limit?: number;',
      "status?: 'pending' | 'queued' | 'sending' | 'delivered' | 'failed' | 'skipped';",
    ],
    response:
      "{ id: string; createdAt: string; recipient: string; recipientType: 'phone' | 'email'; status: 'pending' | 'queued' | 'sending' | 'delivered' | 'failed' | 'skipped'; cost?: number; errorCode?: string; errorMessage?: string; messageId?: string; processedAt?: string; templateVariables?: object; }",
    markdown:
      "## list\n\n`client.broadcasts.contacts.list(broadcastId: string, cursor?: string, limit?: number, status?: 'pending' | 'queued' | 'sending' | 'delivered' | 'failed' | 'skipped'): { id: string; createdAt: string; recipient: string; recipientType: 'phone' | 'email'; status: broadcast_contact_status; cost?: number; errorCode?: string; errorMessage?: string; messageId?: string; processedAt?: string; templateVariables?: object; }`\n\n**get** `/v1/broadcasts/{broadcastId}/contacts`\n\nList contacts in a broadcast with optional status filter.\n\n### Parameters\n\n- `broadcastId: string`\n\n- `cursor?: string`\n\n- `limit?: number`\n\n- `status?: 'pending' | 'queued' | 'sending' | 'delivered' | 'failed' | 'skipped'`\n  Status of a contact within a broadcast.\n\n### Returns\n\n- `{ id: string; createdAt: string; recipient: string; recipientType: 'phone' | 'email'; status: 'pending' | 'queued' | 'sending' | 'delivered' | 'failed' | 'skipped'; cost?: number; errorCode?: string; errorMessage?: string; messageId?: string; processedAt?: string; templateVariables?: object; }`\n\n  - `id: string`\n  - `createdAt: string`\n  - `recipient: string`\n  - `recipientType: 'phone' | 'email'`\n  - `status: 'pending' | 'queued' | 'sending' | 'delivered' | 'failed' | 'skipped'`\n  - `cost?: number`\n  - `errorCode?: string`\n  - `errorMessage?: string`\n  - `messageId?: string`\n  - `processedAt?: string`\n  - `templateVariables?: object`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\n// Automatically fetches more pages as needed.\nfor await (const broadcastContact of client.broadcasts.contacts.list('broadcastId')) {\n  console.log(broadcastContact);\n}\n```",
    perLanguage: {
      cli: {
        method: 'contacts list',
        example:
          "zavudev broadcasts:contacts list \\\n  --api-key 'My API Key' \\\n  --broadcast-id broadcastId",
      },
      go: {
        method: 'client.Broadcasts.Contacts.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Broadcasts.Contacts.List(\n\t\tcontext.TODO(),\n\t\t"broadcastId",\n\t\tzavudev.BroadcastContactListParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/broadcasts/$BROADCAST_ID/contacts \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'broadcasts->contacts->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->broadcasts->contacts->list(\n  'broadcastId',\n  cursor: 'cursor',\n  limit: 100,\n  status: BroadcastContactStatus::PENDING,\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'broadcasts.contacts.list',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\npage = client.broadcasts.contacts.list(\n    broadcast_id="broadcastId",\n)\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'broadcasts.contacts.list',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\npage = zavudev.broadcasts.contacts.list("broadcastId")\n\nputs(page)',
      },
      typescript: {
        method: 'client.broadcasts.contacts.list',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const broadcastContact of client.broadcasts.contacts.list('broadcastId')) {\n  console.log(broadcastContact.id);\n}",
      },
    },
  },
  {
    name: 'remove',
    endpoint: '/v1/broadcasts/{broadcastId}/contacts/{contactId}',
    httpMethod: 'delete',
    summary: 'Remove contact from broadcast',
    description: 'Remove a contact from a broadcast in draft status.',
    stainlessPath: '(resource) broadcasts.contacts > (method) remove',
    qualified: 'client.broadcasts.contacts.remove',
    params: ['broadcastId: string;', 'contactId: string;'],
    markdown:
      "## remove\n\n`client.broadcasts.contacts.remove(broadcastId: string, contactId: string): void`\n\n**delete** `/v1/broadcasts/{broadcastId}/contacts/{contactId}`\n\nRemove a contact from a broadcast in draft status.\n\n### Parameters\n\n- `broadcastId: string`\n\n- `contactId: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nawait client.broadcasts.contacts.remove('contactId', { broadcastId: 'broadcastId' })\n```",
    perLanguage: {
      cli: {
        method: 'contacts remove',
        example:
          "zavudev broadcasts:contacts remove \\\n  --api-key 'My API Key' \\\n  --broadcast-id broadcastId \\\n  --contact-id contactId",
      },
      go: {
        method: 'client.Broadcasts.Contacts.Remove',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Broadcasts.Contacts.Remove(\n\t\tcontext.TODO(),\n\t\t"contactId",\n\t\tzavudev.BroadcastContactRemoveParams{\n\t\t\tBroadcastID: "broadcastId",\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/broadcasts/$BROADCAST_ID/contacts/$CONTACT_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'broadcasts->contacts->remove',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$result = $client->broadcasts->contacts->remove(\n  'contactId', broadcastID: 'broadcastId'\n);\n\nvar_dump($result);",
      },
      python: {
        method: 'broadcasts.contacts.remove',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nclient.broadcasts.contacts.remove(\n    contact_id="contactId",\n    broadcast_id="broadcastId",\n)',
      },
      ruby: {
        method: 'broadcasts.contacts.remove',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresult = zavudev.broadcasts.contacts.remove("contactId", broadcast_id: "broadcastId")\n\nputs(result)',
      },
      typescript: {
        method: 'client.broadcasts.contacts.remove',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.broadcasts.contacts.remove('contactId', { broadcastId: 'broadcastId' });",
      },
    },
  },
  {
    name: 'validate_phone',
    endpoint: '/v1/introspect/phone',
    httpMethod: 'post',
    summary: 'Introspect phone number',
    description: 'Validate a phone number and check if a WhatsApp conversation window is open.',
    stainlessPath: '(resource) introspect > (method) validate_phone',
    qualified: 'client.introspect.validatePhone',
    params: ['phoneNumber: string;'],
    response:
      "{ countryCode: string; phoneNumber: string; validNumber: boolean; availableChannels?: string[]; carrier?: { name?: string; type?: 'mobile' | 'landline' | 'voip' | 'toll_free' | 'unknown'; }; lineType?: 'mobile' | 'landline' | 'voip' | 'toll_free' | 'unknown'; nationalFormat?: string; }",
    markdown:
      "## validate_phone\n\n`client.introspect.validatePhone(phoneNumber: string): { countryCode: string; phoneNumber: string; validNumber: boolean; availableChannels?: string[]; carrier?: object; lineType?: line_type; nationalFormat?: string; }`\n\n**post** `/v1/introspect/phone`\n\nValidate a phone number and check if a WhatsApp conversation window is open.\n\n### Parameters\n\n- `phoneNumber: string`\n\n### Returns\n\n- `{ countryCode: string; phoneNumber: string; validNumber: boolean; availableChannels?: string[]; carrier?: { name?: string; type?: 'mobile' | 'landline' | 'voip' | 'toll_free' | 'unknown'; }; lineType?: 'mobile' | 'landline' | 'voip' | 'toll_free' | 'unknown'; nationalFormat?: string; }`\n\n  - `countryCode: string`\n  - `phoneNumber: string`\n  - `validNumber: boolean`\n  - `availableChannels?: string[]`\n  - `carrier?: { name?: string; type?: 'mobile' | 'landline' | 'voip' | 'toll_free' | 'unknown'; }`\n  - `lineType?: 'mobile' | 'landline' | 'voip' | 'toll_free' | 'unknown'`\n  - `nationalFormat?: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst response = await client.introspect.validatePhone({ phoneNumber: '+56912345678' });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'introspect validate_phone',
        example:
          "zavudev introspect validate-phone \\\n  --api-key 'My API Key' \\\n  --phone-number +56912345678",
      },
      go: {
        method: 'client.Introspect.ValidatePhone',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Introspect.ValidatePhone(context.TODO(), zavudev.IntrospectValidatePhoneParams{\n\t\tPhoneNumber: "+56912345678",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ValidNumber)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/introspect/phone \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY" \\\n    -d \'{\n          "phoneNumber": "+56912345678"\n        }\'',
      },
      php: {
        method: 'introspect->validatePhone',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->introspect->validatePhone(phoneNumber: '+56912345678');\n\nvar_dump($response);",
      },
      python: {
        method: 'introspect.validate_phone',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.introspect.validate_phone(\n    phone_number="+56912345678",\n)\nprint(response.valid_number)',
      },
      ruby: {
        method: 'introspect.validate_phone',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresponse = zavudev.introspect.validate_phone(phone_number: "+56912345678")\n\nputs(response)',
      },
      typescript: {
        method: 'client.introspect.validatePhone',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.introspect.validatePhone({ phoneNumber: '+56912345678' });\n\nconsole.log(response.validNumber);",
      },
    },
  },
  {
    name: 'search_available',
    endpoint: '/v1/phone-numbers/available',
    httpMethod: 'get',
    summary: 'Search available phone numbers',
    description: 'Search for available phone numbers to purchase by country and type.',
    stainlessPath: '(resource) phone_numbers > (method) search_available',
    qualified: 'client.phoneNumbers.searchAvailable',
    params: [
      'countryCode: string;',
      'contains?: string;',
      'limit?: number;',
      "type?: 'local' | 'mobile' | 'tollFree';",
    ],
    response:
      '{ items: { capabilities: phone_number_capabilities; phoneNumber: string; pricing: phone_number_pricing; friendlyName?: string; locality?: string; region?: string; }[]; }',
    markdown:
      "## search_available\n\n`client.phoneNumbers.searchAvailable(countryCode: string, contains?: string, limit?: number, type?: 'local' | 'mobile' | 'tollFree'): { items: available_phone_number[]; }`\n\n**get** `/v1/phone-numbers/available`\n\nSearch for available phone numbers to purchase by country and type.\n\n### Parameters\n\n- `countryCode: string`\n  Two-letter ISO country code.\n\n- `contains?: string`\n  Search for numbers containing this string.\n\n- `limit?: number`\n  Maximum number of results to return.\n\n- `type?: 'local' | 'mobile' | 'tollFree'`\n  Type of phone number to search for.\n\n### Returns\n\n- `{ items: { capabilities: phone_number_capabilities; phoneNumber: string; pricing: phone_number_pricing; friendlyName?: string; locality?: string; region?: string; }[]; }`\n\n  - `items: { capabilities: { mms?: boolean; sms?: boolean; voice?: boolean; }; phoneNumber: string; pricing: { isFreeEligible?: boolean; monthlyPrice?: number; upfrontPrice?: number; }; friendlyName?: string; locality?: string; region?: string; }[]`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst response = await client.phoneNumbers.searchAvailable({ countryCode: 'xx' });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'phone_numbers search_available',
        example:
          "zavudev phone-numbers search-available \\\n  --api-key 'My API Key' \\\n  --country-code xx",
      },
      go: {
        method: 'client.PhoneNumbers.SearchAvailable',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.PhoneNumbers.SearchAvailable(context.TODO(), zavudev.PhoneNumberSearchAvailableParams{\n\t\tCountryCode: "xx",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Items)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/phone-numbers/available \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'phoneNumbers->searchAvailable',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->phoneNumbers->searchAvailable(\n  countryCode: 'xx',\n  contains: 'contains',\n  limit: 50,\n  type: PhoneNumberType::LOCAL,\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'phone_numbers.search_available',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.phone_numbers.search_available(\n    country_code="xx",\n)\nprint(response.items)',
      },
      ruby: {
        method: 'phone_numbers.search_available',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresponse = zavudev.phone_numbers.search_available(country_code: "xx")\n\nputs(response)',
      },
      typescript: {
        method: 'client.phoneNumbers.searchAvailable',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.phoneNumbers.searchAvailable({ countryCode: 'xx' });\n\nconsole.log(response.items);",
      },
    },
  },
  {
    name: 'requirements',
    endpoint: '/v1/phone-numbers/requirements',
    httpMethod: 'get',
    summary: 'Get regulatory requirements',
    description:
      'Get regulatory requirements for purchasing phone numbers in a specific country. Some countries require additional documentation (addresses, identity documents) before phone numbers can be activated.',
    stainlessPath: '(resource) phone_numbers > (method) requirements',
    qualified: 'client.phoneNumbers.requirements',
    params: ['countryCode: string;', "type?: 'local' | 'mobile' | 'tollFree';"],
    response:
      '{ items: { id: string; action: string; countryCode: string; phoneNumberType: string; requirementTypes: requirement_type[]; }[]; }',
    markdown:
      "## requirements\n\n`client.phoneNumbers.requirements(countryCode: string, type?: 'local' | 'mobile' | 'tollFree'): { items: requirement[]; }`\n\n**get** `/v1/phone-numbers/requirements`\n\nGet regulatory requirements for purchasing phone numbers in a specific country. Some countries require additional documentation (addresses, identity documents) before phone numbers can be activated.\n\n### Parameters\n\n- `countryCode: string`\n  Two-letter ISO country code.\n\n- `type?: 'local' | 'mobile' | 'tollFree'`\n  Type of phone number (local, mobile, tollFree).\n\n### Returns\n\n- `{ items: { id: string; action: string; countryCode: string; phoneNumberType: string; requirementTypes: requirement_type[]; }[]; }`\n\n  - `items: { id: string; action: string; countryCode: string; phoneNumberType: string; requirementTypes: { id: string; description: string; name: string; type: requirement_field_type; acceptanceCriteria?: requirement_acceptance_criteria; example?: string; }[]; }[]`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst response = await client.phoneNumbers.requirements({ countryCode: 'xx' });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'phone_numbers requirements',
        example: "zavudev phone-numbers requirements \\\n  --api-key 'My API Key' \\\n  --country-code xx",
      },
      go: {
        method: 'client.PhoneNumbers.Requirements',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.PhoneNumbers.Requirements(context.TODO(), zavudev.PhoneNumberRequirementsParams{\n\t\tCountryCode: "xx",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Items)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/phone-numbers/requirements \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'phoneNumbers->requirements',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->phoneNumbers->requirements(\n  countryCode: 'xx', type: PhoneNumberType::LOCAL\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'phone_numbers.requirements',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.phone_numbers.requirements(\n    country_code="xx",\n)\nprint(response.items)',
      },
      ruby: {
        method: 'phone_numbers.requirements',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresponse = zavudev.phone_numbers.requirements(country_code: "xx")\n\nputs(response)',
      },
      typescript: {
        method: 'client.phoneNumbers.requirements',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.phoneNumbers.requirements({ countryCode: 'xx' });\n\nconsole.log(response.items);",
      },
    },
  },
  {
    name: 'purchase',
    endpoint: '/v1/phone-numbers',
    httpMethod: 'post',
    summary: 'Purchase a phone number',
    description: 'Purchase an available phone number. The first US phone number is free for each team.',
    stainlessPath: '(resource) phone_numbers > (method) purchase',
    qualified: 'client.phoneNumbers.purchase',
    params: ['phoneNumber: string;', 'name?: string;'],
    response:
      '{ phoneNumber: { id: string; capabilities: string[]; createdAt: string; phoneNumber: string; pricing: owned_phone_number_pricing; status: phone_number_status; name?: string; nextRenewalDate?: string; senderId?: string; updatedAt?: string; }; }',
    markdown:
      "## purchase\n\n`client.phoneNumbers.purchase(phoneNumber: string, name?: string): { phoneNumber: owned_phone_number; }`\n\n**post** `/v1/phone-numbers`\n\nPurchase an available phone number. The first US phone number is free for each team.\n\n### Parameters\n\n- `phoneNumber: string`\n  Phone number in E.164 format.\n\n- `name?: string`\n  Optional custom name for the phone number.\n\n### Returns\n\n- `{ phoneNumber: { id: string; capabilities: string[]; createdAt: string; phoneNumber: string; pricing: owned_phone_number_pricing; status: phone_number_status; name?: string; nextRenewalDate?: string; senderId?: string; updatedAt?: string; }; }`\n\n  - `phoneNumber: { id: string; capabilities: string[]; createdAt: string; phoneNumber: string; pricing: { isFreeNumber?: boolean; monthlyCost?: number; monthlyPrice?: number; upfrontCost?: number; }; status: 'active' | 'suspended' | 'pending'; name?: string; nextRenewalDate?: string; senderId?: string; updatedAt?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst response = await client.phoneNumbers.purchase({ phoneNumber: '+15551234567' });\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'phone_numbers purchase',
        example:
          "zavudev phone-numbers purchase \\\n  --api-key 'My API Key' \\\n  --phone-number +15551234567",
      },
      go: {
        method: 'client.PhoneNumbers.Purchase',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.PhoneNumbers.Purchase(context.TODO(), zavudev.PhoneNumberPurchaseParams{\n\t\tPhoneNumber: "+15551234567",\n\t\tName:        zavudev.String("Primary Line"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.PhoneNumber)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/phone-numbers \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY" \\\n    -d \'{\n          "phoneNumber": "+15551234567"\n        }\'',
      },
      php: {
        method: 'phoneNumbers->purchase',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->phoneNumbers->purchase(\n  phoneNumber: '+15551234567', name: 'Primary Line'\n);\n\nvar_dump($response);",
      },
      python: {
        method: 'phone_numbers.purchase',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.phone_numbers.purchase(\n    phone_number="+15551234567",\n    name="Primary Line",\n)\nprint(response.phone_number)',
      },
      ruby: {
        method: 'phone_numbers.purchase',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresponse = zavudev.phone_numbers.purchase(phone_number: "+15551234567")\n\nputs(response)',
      },
      typescript: {
        method: 'client.phoneNumbers.purchase',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.phoneNumbers.purchase({\n  phoneNumber: '+15551234567',\n  name: 'Primary Line',\n});\n\nconsole.log(response.phoneNumber);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/phone-numbers',
    httpMethod: 'get',
    summary: 'List phone numbers',
    description: 'List all phone numbers owned by this project.',
    stainlessPath: '(resource) phone_numbers > (method) list',
    qualified: 'client.phoneNumbers.list',
    params: ['cursor?: string;', 'limit?: number;', "status?: 'active' | 'suspended' | 'pending';"],
    response:
      "{ id: string; capabilities: string[]; createdAt: string; phoneNumber: string; pricing: { isFreeNumber?: boolean; monthlyCost?: number; monthlyPrice?: number; upfrontCost?: number; }; status: 'active' | 'suspended' | 'pending'; name?: string; nextRenewalDate?: string; senderId?: string; updatedAt?: string; }",
    markdown:
      "## list\n\n`client.phoneNumbers.list(cursor?: string, limit?: number, status?: 'active' | 'suspended' | 'pending'): { id: string; capabilities: string[]; createdAt: string; phoneNumber: string; pricing: owned_phone_number_pricing; status: phone_number_status; name?: string; nextRenewalDate?: string; senderId?: string; updatedAt?: string; }`\n\n**get** `/v1/phone-numbers`\n\nList all phone numbers owned by this project.\n\n### Parameters\n\n- `cursor?: string`\n  Pagination cursor.\n\n- `limit?: number`\n\n- `status?: 'active' | 'suspended' | 'pending'`\n  Filter by phone number status.\n\n### Returns\n\n- `{ id: string; capabilities: string[]; createdAt: string; phoneNumber: string; pricing: { isFreeNumber?: boolean; monthlyCost?: number; monthlyPrice?: number; upfrontCost?: number; }; status: 'active' | 'suspended' | 'pending'; name?: string; nextRenewalDate?: string; senderId?: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `capabilities: string[]`\n  - `createdAt: string`\n  - `phoneNumber: string`\n  - `pricing: { isFreeNumber?: boolean; monthlyCost?: number; monthlyPrice?: number; upfrontCost?: number; }`\n  - `status: 'active' | 'suspended' | 'pending'`\n  - `name?: string`\n  - `nextRenewalDate?: string`\n  - `senderId?: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\n// Automatically fetches more pages as needed.\nfor await (const ownedPhoneNumber of client.phoneNumbers.list()) {\n  console.log(ownedPhoneNumber);\n}\n```",
    perLanguage: {
      cli: {
        method: 'phone_numbers list',
        example: "zavudev phone-numbers list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.PhoneNumbers.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.PhoneNumbers.List(context.TODO(), zavudev.PhoneNumberListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/phone-numbers \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'phoneNumbers->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->phoneNumbers->list(\n  cursor: 'cursor', limit: 100, status: PhoneNumberStatus::ACTIVE\n);\n\nvar_dump($page);",
      },
      python: {
        method: 'phone_numbers.list',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\npage = client.phone_numbers.list()\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'phone_numbers.list',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\npage = zavudev.phone_numbers.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.phoneNumbers.list',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const ownedPhoneNumber of client.phoneNumbers.list()) {\n  console.log(ownedPhoneNumber.id);\n}",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/phone-numbers/{phoneNumberId}',
    httpMethod: 'get',
    summary: 'Get phone number',
    description: 'Get details of a specific phone number.',
    stainlessPath: '(resource) phone_numbers > (method) retrieve',
    qualified: 'client.phoneNumbers.retrieve',
    params: ['phoneNumberId: string;'],
    response:
      '{ phoneNumber: { id: string; capabilities: string[]; createdAt: string; phoneNumber: string; pricing: owned_phone_number_pricing; status: phone_number_status; name?: string; nextRenewalDate?: string; senderId?: string; updatedAt?: string; }; }',
    markdown:
      "## retrieve\n\n`client.phoneNumbers.retrieve(phoneNumberId: string): { phoneNumber: owned_phone_number; }`\n\n**get** `/v1/phone-numbers/{phoneNumberId}`\n\nGet details of a specific phone number.\n\n### Parameters\n\n- `phoneNumberId: string`\n\n### Returns\n\n- `{ phoneNumber: { id: string; capabilities: string[]; createdAt: string; phoneNumber: string; pricing: owned_phone_number_pricing; status: phone_number_status; name?: string; nextRenewalDate?: string; senderId?: string; updatedAt?: string; }; }`\n\n  - `phoneNumber: { id: string; capabilities: string[]; createdAt: string; phoneNumber: string; pricing: { isFreeNumber?: boolean; monthlyCost?: number; monthlyPrice?: number; upfrontCost?: number; }; status: 'active' | 'suspended' | 'pending'; name?: string; nextRenewalDate?: string; senderId?: string; updatedAt?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst phoneNumber = await client.phoneNumbers.retrieve('phoneNumberId');\n\nconsole.log(phoneNumber);\n```",
    perLanguage: {
      cli: {
        method: 'phone_numbers retrieve',
        example:
          "zavudev phone-numbers retrieve \\\n  --api-key 'My API Key' \\\n  --phone-number-id phoneNumberId",
      },
      go: {
        method: 'client.PhoneNumbers.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tphoneNumber, err := client.PhoneNumbers.Get(context.TODO(), "phoneNumberId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", phoneNumber.PhoneNumber)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/phone-numbers/$PHONE_NUMBER_ID \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'phoneNumbers->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$phoneNumber = $client->phoneNumbers->retrieve('phoneNumberId');\n\nvar_dump($phoneNumber);",
      },
      python: {
        method: 'phone_numbers.retrieve',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nphone_number = client.phone_numbers.retrieve(\n    "phoneNumberId",\n)\nprint(phone_number.phone_number)',
      },
      ruby: {
        method: 'phone_numbers.retrieve',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nphone_number = zavudev.phone_numbers.retrieve("phoneNumberId")\n\nputs(phone_number)',
      },
      typescript: {
        method: 'client.phoneNumbers.retrieve',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst phoneNumber = await client.phoneNumbers.retrieve('phoneNumberId');\n\nconsole.log(phoneNumber.phoneNumber);",
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/phone-numbers/{phoneNumberId}',
    httpMethod: 'patch',
    summary: 'Update phone number',
    description: "Update a phone number's name or sender assignment.",
    stainlessPath: '(resource) phone_numbers > (method) update',
    qualified: 'client.phoneNumbers.update',
    params: ['phoneNumberId: string;', 'name?: string;', 'senderId?: string;'],
    response:
      '{ phoneNumber: { id: string; capabilities: string[]; createdAt: string; phoneNumber: string; pricing: owned_phone_number_pricing; status: phone_number_status; name?: string; nextRenewalDate?: string; senderId?: string; updatedAt?: string; }; }',
    markdown:
      "## update\n\n`client.phoneNumbers.update(phoneNumberId: string, name?: string, senderId?: string): { phoneNumber: owned_phone_number; }`\n\n**patch** `/v1/phone-numbers/{phoneNumberId}`\n\nUpdate a phone number's name or sender assignment.\n\n### Parameters\n\n- `phoneNumberId: string`\n\n- `name?: string`\n  Custom name for the phone number. Set to null to clear.\n\n- `senderId?: string`\n  Sender ID to assign the phone number to. Set to null to unassign.\n\n### Returns\n\n- `{ phoneNumber: { id: string; capabilities: string[]; createdAt: string; phoneNumber: string; pricing: owned_phone_number_pricing; status: phone_number_status; name?: string; nextRenewalDate?: string; senderId?: string; updatedAt?: string; }; }`\n\n  - `phoneNumber: { id: string; capabilities: string[]; createdAt: string; phoneNumber: string; pricing: { isFreeNumber?: boolean; monthlyCost?: number; monthlyPrice?: number; upfrontCost?: number; }; status: 'active' | 'suspended' | 'pending'; name?: string; nextRenewalDate?: string; senderId?: string; updatedAt?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst phoneNumber = await client.phoneNumbers.update('phoneNumberId');\n\nconsole.log(phoneNumber);\n```",
    perLanguage: {
      cli: {
        method: 'phone_numbers update',
        example:
          "zavudev phone-numbers update \\\n  --api-key 'My API Key' \\\n  --phone-number-id phoneNumberId",
      },
      go: {
        method: 'client.PhoneNumbers.Update',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tphoneNumber, err := client.PhoneNumbers.Update(\n\t\tcontext.TODO(),\n\t\t"phoneNumberId",\n\t\tzavudev.PhoneNumberUpdateParams{\n\t\t\tName: zavudev.String("Support Line"),\n\t\t},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", phoneNumber.PhoneNumber)\n}\n',
      },
      http: {
        example:
          "curl https://api.zavu.dev/v1/phone-numbers/$PHONE_NUMBER_ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $ZAVUDEV_API_KEY\" \\\n    -d '{}'",
      },
      php: {
        method: 'phoneNumbers->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$phoneNumber = $client->phoneNumbers->update(\n  'phoneNumberId', name: 'Support Line', senderID: 'senderId'\n);\n\nvar_dump($phoneNumber);",
      },
      python: {
        method: 'phone_numbers.update',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nphone_number = client.phone_numbers.update(\n    phone_number_id="phoneNumberId",\n    name="Support Line",\n)\nprint(phone_number.phone_number)',
      },
      ruby: {
        method: 'phone_numbers.update',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nphone_number = zavudev.phone_numbers.update("phoneNumberId")\n\nputs(phone_number)',
      },
      typescript: {
        method: 'client.phoneNumbers.update',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst phoneNumber = await client.phoneNumbers.update('phoneNumberId', { name: 'Support Line' });\n\nconsole.log(phoneNumber.phoneNumber);",
      },
    },
  },
  {
    name: 'release',
    endpoint: '/v1/phone-numbers/{phoneNumberId}',
    httpMethod: 'delete',
    summary: 'Release phone number',
    description: 'Release a phone number. The phone number must not be assigned to a sender.',
    stainlessPath: '(resource) phone_numbers > (method) release',
    qualified: 'client.phoneNumbers.release',
    params: ['phoneNumberId: string;'],
    markdown:
      "## release\n\n`client.phoneNumbers.release(phoneNumberId: string): void`\n\n**delete** `/v1/phone-numbers/{phoneNumberId}`\n\nRelease a phone number. The phone number must not be assigned to a sender.\n\n### Parameters\n\n- `phoneNumberId: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nawait client.phoneNumbers.release('phoneNumberId')\n```",
    perLanguage: {
      cli: {
        method: 'phone_numbers release',
        example:
          "zavudev phone-numbers release \\\n  --api-key 'My API Key' \\\n  --phone-number-id phoneNumberId",
      },
      go: {
        method: 'client.PhoneNumbers.Release',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.PhoneNumbers.Release(context.TODO(), "phoneNumberId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/phone-numbers/$PHONE_NUMBER_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'phoneNumbers->release',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$result = $client->phoneNumbers->release('phoneNumberId');\n\nvar_dump($result);",
      },
      python: {
        method: 'phone_numbers.release',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nclient.phone_numbers.release(\n    "phoneNumberId",\n)',
      },
      ruby: {
        method: 'phone_numbers.release',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresult = zavudev.phone_numbers.release("phoneNumberId")\n\nputs(result)',
      },
      typescript: {
        method: 'client.phoneNumbers.release',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.phoneNumbers.release('phoneNumberId');",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/addresses',
    httpMethod: 'post',
    summary: 'Create address',
    description:
      'Create a regulatory address for phone number purchases. Some countries require a verified address before phone numbers can be activated.',
    stainlessPath: '(resource) addresses > (method) create',
    qualified: 'client.addresses.create',
    params: [
      'countryCode: string;',
      'locality: string;',
      'postalCode: string;',
      'streetAddress: string;',
      'administrativeArea?: string;',
      'businessName?: string;',
      'extendedAddress?: string;',
      'firstName?: string;',
      'lastName?: string;',
    ],
    response:
      '{ address: { id: string; countryCode: string; createdAt: string; locality: string; postalCode: string; status: address_status; streetAddress: string; administrativeArea?: string; businessName?: string; extendedAddress?: string; firstName?: string; lastName?: string; updatedAt?: string; }; }',
    markdown:
      "## create\n\n`client.addresses.create(countryCode: string, locality: string, postalCode: string, streetAddress: string, administrativeArea?: string, businessName?: string, extendedAddress?: string, firstName?: string, lastName?: string): { address: address; }`\n\n**post** `/v1/addresses`\n\nCreate a regulatory address for phone number purchases. Some countries require a verified address before phone numbers can be activated.\n\n### Parameters\n\n- `countryCode: string`\n\n- `locality: string`\n\n- `postalCode: string`\n\n- `streetAddress: string`\n\n- `administrativeArea?: string`\n\n- `businessName?: string`\n\n- `extendedAddress?: string`\n\n- `firstName?: string`\n\n- `lastName?: string`\n\n### Returns\n\n- `{ address: { id: string; countryCode: string; createdAt: string; locality: string; postalCode: string; status: address_status; streetAddress: string; administrativeArea?: string; businessName?: string; extendedAddress?: string; firstName?: string; lastName?: string; updatedAt?: string; }; }`\n\n  - `address: { id: string; countryCode: string; createdAt: string; locality: string; postalCode: string; status: 'pending' | 'verified' | 'rejected'; streetAddress: string; administrativeArea?: string; businessName?: string; extendedAddress?: string; firstName?: string; lastName?: string; updatedAt?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst address = await client.addresses.create({\n  countryCode: 'DE',\n  locality: 'Berlin',\n  postalCode: '10115',\n  streetAddress: '123 Main St',\n});\n\nconsole.log(address);\n```",
    perLanguage: {
      cli: {
        method: 'addresses create',
        example:
          "zavudev addresses create \\\n  --api-key 'My API Key' \\\n  --country-code DE \\\n  --locality Berlin \\\n  --postal-code 10115 \\\n  --street-address '123 Main St'",
      },
      go: {
        method: 'client.Addresses.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\taddress, err := client.Addresses.New(context.TODO(), zavudev.AddressNewParams{\n\t\tCountryCode:   "DE",\n\t\tLocality:      "Berlin",\n\t\tPostalCode:    "10115",\n\t\tStreetAddress: "123 Main St",\n\t\tFirstName:     zavudev.String("John"),\n\t\tLastName:      zavudev.String("Doe"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", address.Address)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/addresses \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY" \\\n    -d \'{\n          "countryCode": "DE",\n          "locality": "Berlin",\n          "postalCode": "10115",\n          "streetAddress": "123 Main St"\n        }\'',
      },
      php: {
        method: 'addresses->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$address = $client->addresses->create(\n  countryCode: 'DE',\n  locality: 'Berlin',\n  postalCode: '10115',\n  streetAddress: '123 Main St',\n  administrativeArea: 'administrativeArea',\n  businessName: 'businessName',\n  extendedAddress: 'extendedAddress',\n  firstName: 'John',\n  lastName: 'Doe',\n);\n\nvar_dump($address);",
      },
      python: {
        method: 'addresses.create',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\naddress = client.addresses.create(\n    country_code="DE",\n    locality="Berlin",\n    postal_code="10115",\n    street_address="123 Main St",\n    first_name="John",\n    last_name="Doe",\n)\nprint(address.address)',
      },
      ruby: {
        method: 'addresses.create',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\naddress = zavudev.addresses.create(\n  country_code: "DE",\n  locality: "Berlin",\n  postal_code: "10115",\n  street_address: "123 Main St"\n)\n\nputs(address)',
      },
      typescript: {
        method: 'client.addresses.create',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst address = await client.addresses.create({\n  countryCode: 'DE',\n  locality: 'Berlin',\n  postalCode: '10115',\n  streetAddress: '123 Main St',\n  firstName: 'John',\n  lastName: 'Doe',\n});\n\nconsole.log(address.address);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/addresses',
    httpMethod: 'get',
    summary: 'List addresses',
    description: 'List regulatory addresses for this project.',
    stainlessPath: '(resource) addresses > (method) list',
    qualified: 'client.addresses.list',
    params: ['cursor?: string;', 'limit?: number;'],
    response:
      "{ id: string; countryCode: string; createdAt: string; locality: string; postalCode: string; status: 'pending' | 'verified' | 'rejected'; streetAddress: string; administrativeArea?: string; businessName?: string; extendedAddress?: string; firstName?: string; lastName?: string; updatedAt?: string; }",
    markdown:
      "## list\n\n`client.addresses.list(cursor?: string, limit?: number): { id: string; countryCode: string; createdAt: string; locality: string; postalCode: string; status: address_status; streetAddress: string; administrativeArea?: string; businessName?: string; extendedAddress?: string; firstName?: string; lastName?: string; updatedAt?: string; }`\n\n**get** `/v1/addresses`\n\nList regulatory addresses for this project.\n\n### Parameters\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ id: string; countryCode: string; createdAt: string; locality: string; postalCode: string; status: 'pending' | 'verified' | 'rejected'; streetAddress: string; administrativeArea?: string; businessName?: string; extendedAddress?: string; firstName?: string; lastName?: string; updatedAt?: string; }`\n  A regulatory address for phone number requirements.\n\n  - `id: string`\n  - `countryCode: string`\n  - `createdAt: string`\n  - `locality: string`\n  - `postalCode: string`\n  - `status: 'pending' | 'verified' | 'rejected'`\n  - `streetAddress: string`\n  - `administrativeArea?: string`\n  - `businessName?: string`\n  - `extendedAddress?: string`\n  - `firstName?: string`\n  - `lastName?: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\n// Automatically fetches more pages as needed.\nfor await (const address of client.addresses.list()) {\n  console.log(address);\n}\n```",
    perLanguage: {
      cli: {
        method: 'addresses list',
        example: "zavudev addresses list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Addresses.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.Addresses.List(context.TODO(), zavudev.AddressListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.zavu.dev/v1/addresses \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'addresses->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->addresses->list(cursor: 'cursor', limit: 100);\n\nvar_dump($page);",
      },
      python: {
        method: 'addresses.list',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\npage = client.addresses.list()\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'addresses.list',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\npage = zavudev.addresses.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.addresses.list',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const address of client.addresses.list()) {\n  console.log(address.id);\n}",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/addresses/{addressId}',
    httpMethod: 'get',
    summary: 'Get address',
    description: 'Get a specific regulatory address.',
    stainlessPath: '(resource) addresses > (method) retrieve',
    qualified: 'client.addresses.retrieve',
    params: ['addressId: string;'],
    response:
      '{ address: { id: string; countryCode: string; createdAt: string; locality: string; postalCode: string; status: address_status; streetAddress: string; administrativeArea?: string; businessName?: string; extendedAddress?: string; firstName?: string; lastName?: string; updatedAt?: string; }; }',
    markdown:
      "## retrieve\n\n`client.addresses.retrieve(addressId: string): { address: address; }`\n\n**get** `/v1/addresses/{addressId}`\n\nGet a specific regulatory address.\n\n### Parameters\n\n- `addressId: string`\n\n### Returns\n\n- `{ address: { id: string; countryCode: string; createdAt: string; locality: string; postalCode: string; status: address_status; streetAddress: string; administrativeArea?: string; businessName?: string; extendedAddress?: string; firstName?: string; lastName?: string; updatedAt?: string; }; }`\n\n  - `address: { id: string; countryCode: string; createdAt: string; locality: string; postalCode: string; status: 'pending' | 'verified' | 'rejected'; streetAddress: string; administrativeArea?: string; businessName?: string; extendedAddress?: string; firstName?: string; lastName?: string; updatedAt?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst address = await client.addresses.retrieve('addressId');\n\nconsole.log(address);\n```",
    perLanguage: {
      cli: {
        method: 'addresses retrieve',
        example: "zavudev addresses retrieve \\\n  --api-key 'My API Key' \\\n  --address-id addressId",
      },
      go: {
        method: 'client.Addresses.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\taddress, err := client.Addresses.Get(context.TODO(), "addressId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", address.Address)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/addresses/$ADDRESS_ID \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'addresses->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$address = $client->addresses->retrieve('addressId');\n\nvar_dump($address);",
      },
      python: {
        method: 'addresses.retrieve',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\naddress = client.addresses.retrieve(\n    "addressId",\n)\nprint(address.address)',
      },
      ruby: {
        method: 'addresses.retrieve',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\naddress = zavudev.addresses.retrieve("addressId")\n\nputs(address)',
      },
      typescript: {
        method: 'client.addresses.retrieve',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst address = await client.addresses.retrieve('addressId');\n\nconsole.log(address.address);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/addresses/{addressId}',
    httpMethod: 'delete',
    summary: 'Delete address',
    description: 'Delete a regulatory address. Cannot delete addresses that are in use.',
    stainlessPath: '(resource) addresses > (method) delete',
    qualified: 'client.addresses.delete',
    params: ['addressId: string;'],
    markdown:
      "## delete\n\n`client.addresses.delete(addressId: string): void`\n\n**delete** `/v1/addresses/{addressId}`\n\nDelete a regulatory address. Cannot delete addresses that are in use.\n\n### Parameters\n\n- `addressId: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nawait client.addresses.delete('addressId')\n```",
    perLanguage: {
      cli: {
        method: 'addresses delete',
        example: "zavudev addresses delete \\\n  --api-key 'My API Key' \\\n  --address-id addressId",
      },
      go: {
        method: 'client.Addresses.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Addresses.Delete(context.TODO(), "addressId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/addresses/$ADDRESS_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'addresses->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$result = $client->addresses->delete('addressId');\n\nvar_dump($result);",
      },
      python: {
        method: 'addresses.delete',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nclient.addresses.delete(\n    "addressId",\n)',
      },
      ruby: {
        method: 'addresses.delete',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresult = zavudev.addresses.delete("addressId")\n\nputs(result)',
      },
      typescript: {
        method: 'client.addresses.delete',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.addresses.delete('addressId');",
      },
    },
  },
  {
    name: 'upload_url',
    endpoint: '/v1/documents/upload-url',
    httpMethod: 'post',
    summary: 'Get document upload URL',
    description:
      'Get a presigned URL to upload a document file. After uploading, use the storageId to create the document record.',
    stainlessPath: '(resource) regulatory_documents > (method) upload_url',
    qualified: 'client.regulatoryDocuments.uploadURL',
    response: '{ uploadUrl: string; }',
    markdown:
      "## upload_url\n\n`client.regulatoryDocuments.uploadURL(): { uploadUrl: string; }`\n\n**post** `/v1/documents/upload-url`\n\nGet a presigned URL to upload a document file. After uploading, use the storageId to create the document record.\n\n### Returns\n\n- `{ uploadUrl: string; }`\n\n  - `uploadUrl: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst response = await client.regulatoryDocuments.uploadURL();\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'regulatory_documents upload_url',
        example: "zavudev regulatory-documents upload-url \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.RegulatoryDocuments.UploadURL',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.RegulatoryDocuments.UploadURL(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.UploadURL)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/documents/upload-url \\\n    -X POST \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'regulatoryDocuments->uploadURL',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->regulatoryDocuments->uploadURL();\n\nvar_dump($response);",
      },
      python: {
        method: 'regulatory_documents.upload_url',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.regulatory_documents.upload_url()\nprint(response.upload_url)',
      },
      ruby: {
        method: 'regulatory_documents.upload_url',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresponse = zavudev.regulatory_documents.upload_url\n\nputs(response)',
      },
      typescript: {
        method: 'client.regulatoryDocuments.uploadURL',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.regulatoryDocuments.uploadURL();\n\nconsole.log(response.uploadUrl);",
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/documents',
    httpMethod: 'post',
    summary: 'Create document',
    description:
      'Create a regulatory document record after uploading the file. Use the upload-url endpoint first to get an upload URL.',
    stainlessPath: '(resource) regulatory_documents > (method) create',
    qualified: 'client.regulatoryDocuments.create',
    params: [
      'documentType: string;',
      'fileSize: number;',
      'mimeType: string;',
      'name: string;',
      'storageId: string;',
    ],
    response:
      "{ document: { id: string; createdAt: string; documentType: string; name: string; status: 'pending' | 'uploaded' | 'verified' | 'rejected'; fileSize?: number; mimeType?: string; rejectionReason?: string; updatedAt?: string; }; }",
    markdown:
      "## create\n\n`client.regulatoryDocuments.create(documentType: string, fileSize: number, mimeType: string, name: string, storageId: string): { document: regulatory_document; }`\n\n**post** `/v1/documents`\n\nCreate a regulatory document record after uploading the file. Use the upload-url endpoint first to get an upload URL.\n\n### Parameters\n\n- `documentType: string`\n\n- `fileSize: number`\n\n- `mimeType: string`\n\n- `name: string`\n\n- `storageId: string`\n  Storage ID from the upload-url endpoint.\n\n### Returns\n\n- `{ document: { id: string; createdAt: string; documentType: string; name: string; status: 'pending' | 'uploaded' | 'verified' | 'rejected'; fileSize?: number; mimeType?: string; rejectionReason?: string; updatedAt?: string; }; }`\n\n  - `document: { id: string; createdAt: string; documentType: string; name: string; status: 'pending' | 'uploaded' | 'verified' | 'rejected'; fileSize?: number; mimeType?: string; rejectionReason?: string; updatedAt?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst regulatoryDocument = await client.regulatoryDocuments.create({\n  documentType: 'passport',\n  fileSize: 102400,\n  mimeType: 'image/jpeg',\n  name: 'Passport Scan',\n  storageId: 'kg2abc123...',\n});\n\nconsole.log(regulatoryDocument);\n```",
    perLanguage: {
      cli: {
        method: 'regulatory_documents create',
        example:
          "zavudev regulatory-documents create \\\n  --api-key 'My API Key' \\\n  --document-type passport \\\n  --file-size 102400 \\\n  --mime-type image/jpeg \\\n  --name 'Passport Scan' \\\n  --storage-id kg2abc123...",
      },
      go: {
        method: 'client.RegulatoryDocuments.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tregulatoryDocument, err := client.RegulatoryDocuments.New(context.TODO(), zavudev.RegulatoryDocumentNewParams{\n\t\tDocumentType: zavudev.RegulatoryDocumentNewParamsDocumentTypePassport,\n\t\tFileSize:     102400,\n\t\tMimeType:     "image/jpeg",\n\t\tName:         "Passport Scan",\n\t\tStorageID:    "kg2abc123...",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", regulatoryDocument.Document)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/documents \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY" \\\n    -d \'{\n          "documentType": "passport",\n          "fileSize": 102400,\n          "mimeType": "image/jpeg",\n          "name": "Passport Scan",\n          "storageId": "kg2abc123..."\n        }\'',
      },
      php: {
        method: 'regulatoryDocuments->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$regulatoryDocument = $client->regulatoryDocuments->create(\n  documentType: 'passport',\n  fileSize: 102400,\n  mimeType: 'image/jpeg',\n  name: 'Passport Scan',\n  storageID: 'kg2abc123...',\n);\n\nvar_dump($regulatoryDocument);",
      },
      python: {
        method: 'regulatory_documents.create',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nregulatory_document = client.regulatory_documents.create(\n    document_type="passport",\n    file_size=102400,\n    mime_type="image/jpeg",\n    name="Passport Scan",\n    storage_id="kg2abc123...",\n)\nprint(regulatory_document.document)',
      },
      ruby: {
        method: 'regulatory_documents.create',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nregulatory_document = zavudev.regulatory_documents.create(\n  document_type: :passport,\n  file_size: 102400,\n  mime_type: "image/jpeg",\n  name: "Passport Scan",\n  storage_id: "kg2abc123..."\n)\n\nputs(regulatory_document)',
      },
      typescript: {
        method: 'client.regulatoryDocuments.create',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst regulatoryDocument = await client.regulatoryDocuments.create({\n  documentType: 'passport',\n  fileSize: 102400,\n  mimeType: 'image/jpeg',\n  name: 'Passport Scan',\n  storageId: 'kg2abc123...',\n});\n\nconsole.log(regulatoryDocument.document);",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/documents',
    httpMethod: 'get',
    summary: 'List documents',
    description: 'List regulatory documents for this project.',
    stainlessPath: '(resource) regulatory_documents > (method) list',
    qualified: 'client.regulatoryDocuments.list',
    params: ['cursor?: string;', 'limit?: number;'],
    response:
      "{ id: string; createdAt: string; documentType: string; name: string; status: 'pending' | 'uploaded' | 'verified' | 'rejected'; fileSize?: number; mimeType?: string; rejectionReason?: string; updatedAt?: string; }",
    markdown:
      "## list\n\n`client.regulatoryDocuments.list(cursor?: string, limit?: number): { id: string; createdAt: string; documentType: string; name: string; status: 'pending' | 'uploaded' | 'verified' | 'rejected'; fileSize?: number; mimeType?: string; rejectionReason?: string; updatedAt?: string; }`\n\n**get** `/v1/documents`\n\nList regulatory documents for this project.\n\n### Parameters\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ id: string; createdAt: string; documentType: string; name: string; status: 'pending' | 'uploaded' | 'verified' | 'rejected'; fileSize?: number; mimeType?: string; rejectionReason?: string; updatedAt?: string; }`\n  A regulatory document for phone number requirements.\n\n  - `id: string`\n  - `createdAt: string`\n  - `documentType: string`\n  - `name: string`\n  - `status: 'pending' | 'uploaded' | 'verified' | 'rejected'`\n  - `fileSize?: number`\n  - `mimeType?: string`\n  - `rejectionReason?: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\n// Automatically fetches more pages as needed.\nfor await (const regulatoryDocument of client.regulatoryDocuments.list()) {\n  console.log(regulatoryDocument);\n}\n```",
    perLanguage: {
      cli: {
        method: 'regulatory_documents list',
        example: "zavudev regulatory-documents list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.RegulatoryDocuments.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tpage, err := client.RegulatoryDocuments.List(context.TODO(), zavudev.RegulatoryDocumentListParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", page)\n}\n',
      },
      http: {
        example: 'curl https://api.zavu.dev/v1/documents \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'regulatoryDocuments->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->regulatoryDocuments->list(cursor: 'cursor', limit: 100);\n\nvar_dump($page);",
      },
      python: {
        method: 'regulatory_documents.list',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\npage = client.regulatory_documents.list()\npage = page.items[0]\nprint(page.id)',
      },
      ruby: {
        method: 'regulatory_documents.list',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\npage = zavudev.regulatory_documents.list\n\nputs(page)',
      },
      typescript: {
        method: 'client.regulatoryDocuments.list',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const regulatoryDocument of client.regulatoryDocuments.list()) {\n  console.log(regulatoryDocument.id);\n}",
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/documents/{documentId}',
    httpMethod: 'get',
    summary: 'Get document',
    description: 'Get a specific regulatory document.',
    stainlessPath: '(resource) regulatory_documents > (method) retrieve',
    qualified: 'client.regulatoryDocuments.retrieve',
    params: ['documentId: string;'],
    response:
      "{ document: { id: string; createdAt: string; documentType: string; name: string; status: 'pending' | 'uploaded' | 'verified' | 'rejected'; fileSize?: number; mimeType?: string; rejectionReason?: string; updatedAt?: string; }; }",
    markdown:
      "## retrieve\n\n`client.regulatoryDocuments.retrieve(documentId: string): { document: regulatory_document; }`\n\n**get** `/v1/documents/{documentId}`\n\nGet a specific regulatory document.\n\n### Parameters\n\n- `documentId: string`\n\n### Returns\n\n- `{ document: { id: string; createdAt: string; documentType: string; name: string; status: 'pending' | 'uploaded' | 'verified' | 'rejected'; fileSize?: number; mimeType?: string; rejectionReason?: string; updatedAt?: string; }; }`\n\n  - `document: { id: string; createdAt: string; documentType: string; name: string; status: 'pending' | 'uploaded' | 'verified' | 'rejected'; fileSize?: number; mimeType?: string; rejectionReason?: string; updatedAt?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst regulatoryDocument = await client.regulatoryDocuments.retrieve('documentId');\n\nconsole.log(regulatoryDocument);\n```",
    perLanguage: {
      cli: {
        method: 'regulatory_documents retrieve',
        example:
          "zavudev regulatory-documents retrieve \\\n  --api-key 'My API Key' \\\n  --document-id documentId",
      },
      go: {
        method: 'client.RegulatoryDocuments.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tregulatoryDocument, err := client.RegulatoryDocuments.Get(context.TODO(), "documentId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", regulatoryDocument.Document)\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/documents/$DOCUMENT_ID \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'regulatoryDocuments->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$regulatoryDocument = $client->regulatoryDocuments->retrieve('documentId');\n\nvar_dump($regulatoryDocument);",
      },
      python: {
        method: 'regulatory_documents.retrieve',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nregulatory_document = client.regulatory_documents.retrieve(\n    "documentId",\n)\nprint(regulatory_document.document)',
      },
      ruby: {
        method: 'regulatory_documents.retrieve',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nregulatory_document = zavudev.regulatory_documents.retrieve("documentId")\n\nputs(regulatory_document)',
      },
      typescript: {
        method: 'client.regulatoryDocuments.retrieve',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst regulatoryDocument = await client.regulatoryDocuments.retrieve('documentId');\n\nconsole.log(regulatoryDocument.document);",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/documents/{documentId}',
    httpMethod: 'delete',
    summary: 'Delete document',
    description: 'Delete a regulatory document. Cannot delete verified documents.',
    stainlessPath: '(resource) regulatory_documents > (method) delete',
    qualified: 'client.regulatoryDocuments.delete',
    params: ['documentId: string;'],
    markdown:
      "## delete\n\n`client.regulatoryDocuments.delete(documentId: string): void`\n\n**delete** `/v1/documents/{documentId}`\n\nDelete a regulatory document. Cannot delete verified documents.\n\n### Parameters\n\n- `documentId: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nawait client.regulatoryDocuments.delete('documentId')\n```",
    perLanguage: {
      cli: {
        method: 'regulatory_documents delete',
        example:
          "zavudev regulatory-documents delete \\\n  --api-key 'My API Key' \\\n  --document-id documentId",
      },
      go: {
        method: 'client.RegulatoryDocuments.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.RegulatoryDocuments.Delete(context.TODO(), "documentId")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.zavu.dev/v1/documents/$DOCUMENT_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $ZAVUDEV_API_KEY"',
      },
      php: {
        method: 'regulatoryDocuments->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$result = $client->regulatoryDocuments->delete('documentId');\n\nvar_dump($result);",
      },
      python: {
        method: 'regulatory_documents.delete',
        example:
          'import os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\nclient.regulatory_documents.delete(\n    "documentId",\n)',
      },
      ruby: {
        method: 'regulatory_documents.delete',
        example:
          'require "zavudev"\n\nzavudev = Zavudev::Client.new(api_key: "My API Key")\n\nresult = zavudev.regulatory_documents.delete("documentId")\n\nputs(result)',
      },
      typescript: {
        method: 'client.regulatoryDocuments.delete',
        example:
          "import Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.regulatoryDocuments.delete('documentId');",
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'python',
    content:
      '# Zavudev Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/zavudev.svg?label=pypi%20(stable))](https://pypi.org/project/zavudev/)\n\nThe Zavudev Python library provides convenient access to the Zavudev REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Zavudev MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40zavudev%2Fsdk-mcp&config=eyJuYW1lIjoiQHphdnVkZXYvc2RrLW1jcCIsInRyYW5zcG9ydCI6Imh0dHAiLCJ1cmwiOiJodHRwczovL3phdnVkZXYuc3RsbWNwLmNvbSIsImhlYWRlcnMiOnsieC16YXZ1ZGV2LWFwaS1rZXkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40zavudev%2Fsdk-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fzavudev.stlmcp.com%22%2C%22headers%22%3A%7B%22x-zavudev-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [docs.zavu.dev](https://docs.zavu.dev). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install zavudev\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom zavudev import Zavudev\n\nclient = Zavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\n\nmessage_response = client.messages.send(\n    to="+14155551234",\n    text="Hello from Zavu!",\n)\nprint(message_response.message)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `ZAVUDEV_API_KEY="My API Key"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncZavudev` instead of `Zavudev` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom zavudev import AsyncZavudev\n\nclient = AsyncZavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  message_response = await client.messages.send(\n      to="+14155551234",\n      text="Hello from Zavu!",\n  )\n  print(message_response.message)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install zavudev[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom zavudev import DefaultAioHttpClient\nfrom zavudev import AsyncZavudev\n\nasync def main() -> None:\n  async with AsyncZavudev(\n    api_key=os.environ.get("ZAVUDEV_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    message_response = await client.messages.send(\n        to="+14155551234",\n        text="Hello from Zavu!",\n    )\n    print(message_response.message)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n## Pagination\n\nList methods in the Zavudev API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```python\nfrom zavudev import Zavudev\n\nclient = Zavudev()\n\nall_messages = []\n# Automatically fetches more pages as needed.\nfor message in client.messages.list():\n    # Do something with message here\n    all_messages.append(message)\nprint(all_messages)\n```\n\nOr, asynchronously:\n\n```python\nimport asyncio\nfrom zavudev import AsyncZavudev\n\nclient = AsyncZavudev()\n\nasync def main() -> None:\n    all_messages = []\n    # Iterate through items across all pages, issuing requests as needed.\n    async for message in client.messages.list():\n        all_messages.append(message)\n    print(all_messages)\n\nasyncio.run(main())\n```\n\nAlternatively, you can use the `.has_next_page()`, `.next_page_info()`, or  `.get_next_page()` methods for more granular control working with pages:\n\n```python\nfirst_page = await client.messages.list()\nif first_page.has_next_page():\n    print(f"will fetch next page using these details: {first_page.next_page_info()}")\n    next_page = await first_page.get_next_page()\n    print(f"number of items we just fetched: {len(next_page.items)}")\n\n# Remove `await` for non-async usage.\n```\n\nOr just work directly with the returned data:\n\n```python\nfirst_page = await client.messages.list()\n\nprint(f"next page cursor: {first_page.next_cursor}") # => "next page cursor: ..."\nfor message in first_page.items:\n    print(message.id)\n\n# Remove `await` for non-async usage.\n```\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom zavudev import Zavudev\n\nclient = Zavudev()\n\nmessage_response = client.messages.send(\n    to="+56912345678",\n    content={},\n)\nprint(message_response.content)\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `zavudev.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `zavudev.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `zavudev.APIError`.\n\n```python\nimport zavudev\nfrom zavudev import Zavudev\n\nclient = Zavudev()\n\ntry:\n    client.messages.send(\n        to="+14155551234",\n        text="Hello from Zavu!",\n    )\nexcept zavudev.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept zavudev.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept zavudev.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom zavudev import Zavudev\n\n# Configure the default for all requests:\nclient = Zavudev(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).messages.send(\n    to="+14155551234",\n    text="Hello from Zavu!",\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom zavudev import Zavudev\n\n# Configure the default for all requests:\nclient = Zavudev(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = Zavudev(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).messages.send(\n    to="+14155551234",\n    text="Hello from Zavu!",\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `ZAVUDEV_LOG` to `info`.\n\n```shell\n$ export ZAVUDEV_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom zavudev import Zavudev\n\nclient = Zavudev()\nresponse = client.messages.with_raw_response.send(\n    to="+14155551234",\n    text="Hello from Zavu!",\n)\nprint(response.headers.get(\'X-My-Header\'))\n\nmessage = response.parse()  # get the object that `messages.send()` would have returned\nprint(message.message)\n```\n\nThese methods return an [`APIResponse`](https://github.com/zavudev/sdk-python/tree/main/src/zavudev/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/zavudev/sdk-python/tree/main/src/zavudev/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.messages.with_streaming_response.send(\n    to="+14155551234",\n    text="Hello from Zavu!",\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom zavudev import Zavudev, DefaultHttpxClient\n\nclient = Zavudev(\n    # Or use the `ZAVUDEV_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom zavudev import Zavudev\n\nwith Zavudev() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/zavudev/sdk-python/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport zavudev\nprint(zavudev.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'go',
    content:
      '# Zavudev Go API Library\n\n<a href="https://pkg.go.dev/github.com/zavudev/sdk-go"><img src="https://pkg.go.dev/badge/github.com/zavudev/sdk-go.svg" alt="Go Reference"></a>\n\nThe Zavudev Go library provides convenient access to the [Zavudev REST API](https://docs.zavu.dev)\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Zavudev MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40zavudev%2Fsdk-mcp&config=eyJuYW1lIjoiQHphdnVkZXYvc2RrLW1jcCIsInRyYW5zcG9ydCI6Imh0dHAiLCJ1cmwiOiJodHRwczovL3phdnVkZXYuc3RsbWNwLmNvbSIsImhlYWRlcnMiOnsieC16YXZ1ZGV2LWFwaS1rZXkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40zavudev%2Fsdk-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fzavudev.stlmcp.com%22%2C%22headers%22%3A%7B%22x-zavudev-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/zavudev/sdk-go" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/zavudev/sdk-go@v0.0.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/zavudev/sdk-go"\n\t"github.com/zavudev/sdk-go/option"\n)\n\nfunc main() {\n\tclient := zavudev.NewClient(\n\t\toption.WithAPIKey("My API Key"), // defaults to os.LookupEnv("ZAVUDEV_API_KEY")\n\t)\n\tmessageResponse, err := client.Messages.Send(context.TODO(), zavudev.MessageSendParams{\n\t\tTo:   "+14155551234",\n\t\tText: zavudev.String("Hello from Zavu!"),\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", messageResponse.Message)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Messages.Send(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/zavudev/sdk-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n```go\niter := client.Messages.ListAutoPaging(context.TODO(), zavudev.MessageListParams{})\n// Automatically fetches more pages as needed.\nfor iter.Next() {\n\tmessage := iter.Current()\n\tfmt.Printf("%+v\\n", message)\n}\nif err := iter.Err(); err != nil {\n\tpanic(err.Error())\n}\n```\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n```go\npage, err := client.Messages.List(context.TODO(), zavudev.MessageListParams{})\nfor page != nil {\n\tfor _, message := range page.Items {\n\t\tfmt.Printf("%+v\\n", message)\n\t}\n\tpage, err = page.GetNextPage()\n}\nif err != nil {\n\tpanic(err.Error())\n}\n```\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Messages.Send(context.TODO(), zavudev.MessageSendParams{\n\tTo:   "+14155551234",\n\tText: zavudev.String("Hello from Zavu!"),\n})\nif err != nil {\n\tvar apierr *zavudev.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/v1/messages": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Messages.Send(\n\tctx,\n\tzavudev.MessageSendParams{\n\t\tTo:   "+14155551234",\n\t\tText: zavudev.String("Hello from Zavu!"),\n\t},\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := zavudev.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Messages.Send(\n\tcontext.TODO(),\n\tzavudev.MessageSendParams{\n\t\tTo:   "+14155551234",\n\t\tText: zavudev.String("Hello from Zavu!"),\n\t},\n\toption.WithMaxRetries(5),\n)\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\nmessageResponse, err := client.Messages.Send(\n\tcontext.TODO(),\n\tzavudev.MessageSendParams{\n\t\tTo:   "+14155551234",\n\t\tText: zavudev.String("Hello from Zavu!"),\n\t},\n\toption.WithResponseInto(&response),\n)\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", messageResponse)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/zavudev/sdk-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Zavudev TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/@zavudev/sdk.svg?label=npm%20(stable))](https://npmjs.org/package/@zavudev/sdk) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@zavudev/sdk)\n\nThis library provides convenient access to the Zavudev REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [docs.zavu.dev](https://docs.zavu.dev). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Zavudev MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40zavudev%2Fsdk-mcp&config=eyJuYW1lIjoiQHphdnVkZXYvc2RrLW1jcCIsInRyYW5zcG9ydCI6Imh0dHAiLCJ1cmwiOiJodHRwczovL3phdnVkZXYuc3RsbWNwLmNvbSIsImhlYWRlcnMiOnsieC16YXZ1ZGV2LWFwaS1rZXkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40zavudev%2Fsdk-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fzavudev.stlmcp.com%22%2C%22headers%22%3A%7B%22x-zavudev-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install @zavudev/sdk\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst messageResponse = await client.messages.send({\n  to: '+14155551234',\n  text: 'Hello from Zavu!',\n});\n\nconsole.log(messageResponse.message);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  apiKey: process.env['ZAVUDEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst params: Zavudev.MessageSendParams = { to: '+14155551234', text: 'Hello from Zavu!' };\nconst messageResponse: Zavudev.MessageResponse = await client.messages.send(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst messageResponse = await client.messages\n  .send({ to: '+14155551234', text: 'Hello from Zavu!' })\n  .catch(async (err) => {\n    if (err instanceof Zavudev.APIError) {\n      console.log(err.status); // 400\n      console.log(err.name); // BadRequestError\n      console.log(err.headers); // {server: 'nginx', ...}\n    } else {\n      throw err;\n    }\n  });\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Zavudev({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.messages.send({ to: '+14155551234', text: 'Hello from Zavu!' }, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Zavudev({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.messages.send({ to: '+14155551234', text: 'Hello from Zavu!' }, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n## Auto-pagination\n\nList methods in the Zavudev API are paginated.\nYou can use the `for await … of` syntax to iterate through items across all pages:\n\n```ts\nasync function fetchAllMessages(params) {\n  const allMessages = [];\n  // Automatically fetches more pages as needed.\n  for await (const message of client.messages.list()) {\n    allMessages.push(message);\n  }\n  return allMessages;\n}\n```\n\nAlternatively, you can request a single page at a time:\n\n```ts\nlet page = await client.messages.list();\nfor (const message of page.items) {\n  console.log(message);\n}\n\n// Convenience methods are provided for manually paginating:\nwhile (page.hasNextPage()) {\n  page = await page.getNextPage();\n  // ...\n}\n```\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Zavudev();\n\nconst response = await client.messages\n  .send({ to: '+14155551234', text: 'Hello from Zavu!' })\n  .asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: messageResponse, response: raw } = await client.messages\n  .send({ to: '+14155551234', text: 'Hello from Zavu!' })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(messageResponse.message);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `ZAVUDEV_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Zavudev from '@zavudev/sdk';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Zavudev({\n  logger: logger.child({ name: 'Zavudev' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.messages.send({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Zavudev from '@zavudev/sdk';\nimport fetch from 'my-fetch';\n\nconst client = new Zavudev({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Zavudev from '@zavudev/sdk';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Zavudev({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Zavudev from 'npm:@zavudev/sdk';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Zavudev({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/zavudev/sdk-typescript/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
  {
    language: 'ruby',
    content:
      '# Zavudev Ruby API library\n\nThe Zavudev Ruby library provides convenient access to the Zavudev REST API from any Ruby 3.2.0+ application. It ships with comprehensive types & docstrings in Yard, RBS, and RBI – [see below](https://github.com/zavudev/sdk-ruby#Sorbet) for usage with Sorbet. The standard library\'s `net/http` is used as the HTTP transport, with connection pooling via the `connection_pool` gem.\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Zavudev MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40zavudev%2Fsdk-mcp&config=eyJuYW1lIjoiQHphdnVkZXYvc2RrLW1jcCIsInRyYW5zcG9ydCI6Imh0dHAiLCJ1cmwiOiJodHRwczovL3phdnVkZXYuc3RsbWNwLmNvbSIsImhlYWRlcnMiOnsieC16YXZ1ZGV2LWFwaS1rZXkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40zavudev%2Fsdk-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fzavudev.stlmcp.com%22%2C%22headers%22%3A%7B%22x-zavudev-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nDocumentation for releases of this gem can be found [on RubyDoc](https://gemdocs.org/gems/zavudev).\n\nThe REST API documentation can be found on [docs.zavu.dev](https://docs.zavu.dev).\n\n## Installation\n\nTo use this gem, install via Bundler by adding the following to your application\'s `Gemfile`:\n\n<!-- x-release-please-start-version -->\n\n```ruby\ngem "zavudev", "~> 0.0.1"\n```\n\n<!-- x-release-please-end -->\n\n## Usage\n\n```ruby\nrequire "bundler/setup"\nrequire "zavudev"\n\nzavudev = Zavudev::Client.new(\n  api_key: ENV["ZAVUDEV_API_KEY"] # This is the default and can be omitted\n)\n\nmessage_response = zavudev.messages.send_(to: "+14155551234", text: "Hello from Zavu!")\n\nputs(message_response.message)\n```\n\n\n\n### Pagination\n\nList methods in the Zavudev API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```ruby\npage = zavudev.messages.list\n\n# Fetch single item from page.\nmessage = page.items[0]\nputs(message.id)\n\n# Automatically fetches more pages as needed.\npage.auto_paging_each do |message|\n  puts(message.id)\nend\n```\n\nAlternatively, you can use the `#next_page?` and `#next_page` methods for more granular control working with pages.\n\n```ruby\nif page.next_page?\n  new_page = page.next_page\n  puts(new_page.items[0].id)\nend\n```\n\n\n\n### Handling errors\n\nWhen the library is unable to connect to the API, or if the API returns a non-success status code (i.e., 4xx or 5xx response), a subclass of `Zavudev::Errors::APIError` will be thrown:\n\n```ruby\nbegin\n  message = zavudev.messages.send_(to: "+14155551234", text: "Hello from Zavu!")\nrescue Zavudev::Errors::APIConnectionError => e\n  puts("The server could not be reached")\n  puts(e.cause)  # an underlying Exception, likely raised within `net/http`\nrescue Zavudev::Errors::RateLimitError => e\n  puts("A 429 status code was received; we should back off a bit.")\nrescue Zavudev::Errors::APIStatusError => e\n  puts("Another non-200-range status code was received")\n  puts(e.status)\nend\n```\n\nError codes are as follows:\n\n| Cause            | Error Type                 |\n| ---------------- | -------------------------- |\n| HTTP 400         | `BadRequestError`          |\n| HTTP 401         | `AuthenticationError`      |\n| HTTP 403         | `PermissionDeniedError`    |\n| HTTP 404         | `NotFoundError`            |\n| HTTP 409         | `ConflictError`            |\n| HTTP 422         | `UnprocessableEntityError` |\n| HTTP 429         | `RateLimitError`           |\n| HTTP >= 500      | `InternalServerError`      |\n| Other HTTP error | `APIStatusError`           |\n| Timeout          | `APITimeoutError`          |\n| Network error    | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\n\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict, 429 Rate Limit, >=500 Internal errors, and timeouts will all be retried by default.\n\nYou can use the `max_retries` option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\nzavudev = Zavudev::Client.new(\n  max_retries: 0 # default is 2\n)\n\n# Or, configure per-request:\nzavudev.messages.send_(to: "+14155551234", text: "Hello from Zavu!", request_options: {max_retries: 5})\n```\n\n### Timeouts\n\nBy default, requests will time out after 60 seconds. You can use the timeout option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\nzavudev = Zavudev::Client.new(\n  timeout: nil # default is 60\n)\n\n# Or, configure per-request:\nzavudev.messages.send_(to: "+14155551234", text: "Hello from Zavu!", request_options: {timeout: 5})\n```\n\nOn timeout, `Zavudev::Errors::APITimeoutError` is raised.\n\nNote that requests that time out are retried by default.\n\n## Advanced concepts\n\n### BaseModel\n\nAll parameter and response objects inherit from `Zavudev::Internal::Type::BaseModel`, which provides several conveniences, including:\n\n1. All fields, including unknown ones, are accessible with `obj[:prop]` syntax, and can be destructured with `obj => {prop: prop}` or pattern-matching syntax.\n\n2. Structural equivalence for equality; if two API calls return the same values, comparing the responses with == will return true.\n\n3. Both instances and the classes themselves can be pretty-printed.\n\n4. Helpers such as `#to_h`, `#deep_to_h`, `#to_json`, and `#to_yaml`.\n\n### Making custom or undocumented requests\n\n#### Undocumented properties\n\nYou can send undocumented parameters to any endpoint, and read undocumented response properties, like so:\n\nNote: the `extra_` parameters of the same name overrides the documented parameters.\n\n```ruby\nmessage_response =\n  zavudev.messages.send_(\n    to: "+14155551234",\n    text: "Hello from Zavu!",\n    request_options: {\n      extra_query: {my_query_parameter: value},\n      extra_body: {my_body_parameter: value},\n      extra_headers: {"my-header": value}\n    }\n  )\n\nputs(message_response[:my_undocumented_property])\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` under the `request_options:` parameter when making a request, as seen in the examples above.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints while retaining the benefit of auth, retries, and so on, you can make requests using `client.request`, like so:\n\n```ruby\nresponse = client.request(\n  method: :post,\n  path: \'/undocumented/endpoint\',\n  query: {"dog": "woof"},\n  headers: {"useful-header": "interesting-value"},\n  body: {"hello": "world"}\n)\n```\n\n### Concurrency & connection pooling\n\nThe `Zavudev::Client` instances are threadsafe, but are only are fork-safe when there are no in-flight HTTP requests.\n\nEach instance of `Zavudev::Client` has its own HTTP connection pool with a default size of 99. As such, we recommend instantiating the client once per application in most settings.\n\nWhen all available connections from the pool are checked out, requests wait for a new connection to become available, with queue time counting towards the request timeout.\n\nUnless otherwise specified, other classes in the SDK do not have locks protecting their underlying data structure.\n\n## Sorbet\n\nThis library provides comprehensive [RBI](https://sorbet.org/docs/rbi) definitions, and has no dependency on sorbet-runtime.\n\nYou can provide typesafe request parameters like so:\n\n```ruby\nzavudev.messages.send_(to: "+14155551234", text: "Hello from Zavu!")\n```\n\nOr, equivalently:\n\n```ruby\n# Hashes work, but are not typesafe:\nzavudev.messages.send_(to: "+14155551234", text: "Hello from Zavu!")\n\n# You can also splat a full Params class:\nparams = Zavudev::MessageSendParams.new(to: "+14155551234", text: "Hello from Zavu!")\nzavudev.messages.send_(**params)\n```\n\n### Enums\n\nSince this library does not depend on `sorbet-runtime`, it cannot provide [`T::Enum`](https://sorbet.org/docs/tenum) instances. Instead, we provide "tagged symbols" instead, which is always a primitive at runtime:\n\n```ruby\n# :auto\nputs(Zavudev::Channel::AUTO)\n\n# Revealed type: `T.all(Zavudev::Channel, Symbol)`\nT.reveal_type(Zavudev::Channel::AUTO)\n```\n\nEnum parameters have a "relaxed" type, so you can either pass in enum constants or their literal value:\n\n```ruby\n# Using the enum constants preserves the tagged type information:\nzavudev.messages.list(\n  channel: Zavudev::Channel::AUTO,\n  # …\n)\n\n# Literal values are also permissible:\nzavudev.messages.list(\n  channel: :auto,\n  # …\n)\n```\n\n## Versioning\n\nThis package follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions. As the library is in initial development and has a major version of `0`, APIs may change at any time.\n\nThis package considers improvements to the (non-runtime) `*.rbi` and `*.rbs` type definitions to be non-breaking changes.\n\n## Requirements\n\nRuby 3.2.0 or higher.\n\n## Contributing\n\nSee [the contributing documentation](https://github.com/zavudev/sdk-ruby/tree/main/CONTRIBUTING.md).\n',
  },
  {
    language: 'cli',
    content:
      "# Zavudev CLI\n\nThe official CLI for the [Zavudev REST API](https://docs.zavu.dev).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n<!-- x-release-please-start-version -->\n\n## Installation\n\n### Installing with Homebrew\n\n~~~sh\nbrew install zavudev/tools/zavudev\n~~~\n\n### Installing with Go\n\nTo test or install the CLI locally, you need [Go](https://go.dev/doc/install) version 1.22 or later installed.\n\n~~~sh\ngo install 'github.com/zavudev/cli/cmd/zavudev@latest'\n~~~\n\nOnce you have run `go install`, the binary is placed in your Go bin directory:\n\n- **Default location**: `$HOME/go/bin` (or `$GOPATH/bin` if GOPATH is set)\n- **Check your path**: Run `go env GOPATH` to see the base directory\n\nIf commands aren't found after installation, add the Go bin directory to your PATH:\n\n~~~sh\n# Add to your shell profile (.zshrc, .bashrc, etc.)\nexport PATH=\"$PATH:$(go env GOPATH)/bin\"\n~~~\n\n<!-- x-release-please-end -->\n\n### Running Locally\n\nAfter cloning the git repository for this project, you can use the\n`scripts/run` script to run the tool locally:\n\n~~~sh\n./scripts/run args...\n~~~\n\n## Usage\n\nThe CLI follows a resource-based command structure:\n\n~~~sh\nzavudev [resource] <command> [flags...]\n~~~\n\n~~~sh\nzavudev messages send \\\n  --api-key 'My API Key' \\\n  --to +14155551234 \\\n  --text 'Hello from Zavu!'\n~~~\n\nFor details about specific commands, use the `--help` flag.\n\n### Environment variables\n\n| Environment variable | Required |\n| -------------------- | -------- |\n| `ZAVUDEV_API_KEY`    | yes      |\n\n### Global flags\n\n- `--api-key` (can also be set with `ZAVUDEV_API_KEY` env var)\n- `--help` - Show command line usage\n- `--debug` - Enable debug logging (includes HTTP request/response details)\n- `--version`, `-v` - Show the CLI version\n- `--base-url` - Use a custom API backend URL\n- `--format` - Change the output format (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--format-error` - Change the output format for errors (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--transform` - Transform the data output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n- `--transform-error` - Transform the error output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n\n### Passing files as arguments\n\nTo pass files to your API, you can use the `@myfile.ext` syntax:\n\n~~~bash\nzavudev <command> --arg @abe.jpg\n~~~\n\nFiles can also be passed inside JSON or YAML blobs:\n\n~~~bash\nzavudev <command> --arg '{image: \"@abe.jpg\"}'\n# Equivalent:\nzavudev <command> <<YAML\narg:\n  image: \"@abe.jpg\"\nYAML\n~~~\n\nIf you need to pass a string literal that begins with an `@` sign, you can\nescape the `@` sign to avoid accidentally passing a file.\n\n~~~bash\nzavudev <command> --username '\\@abe'\n~~~\n\n#### Explicit encoding\n\nFor JSON endpoints, the CLI tool does filetype sniffing to determine whether the\nfile contents should be sent as a string literal (for plain text files) or as a\nbase64-encoded string literal (for binary files). If you need to explicitly send\nthe file as either plain text or base64-encoded data, you can use\n`@file://myfile.txt` (for string encoding) or `@data://myfile.dat` (for\nbase64-encoding). Note that absolute paths will begin with `@file://` or\n`@data://`, followed by a third `/` (for example, `@file:///tmp/file.txt`).\n\n~~~bash\nzavudev <command> --arg @data://file.txt\n~~~\n\n## Linking different Go SDK versions\n\nYou can link the CLI against a different version of the Zavudev Go SDK\nfor development purposes using the `./scripts/link` script.\n\nTo link to a specific version from a repository (version can be a branch,\ngit tag, or commit hash):\n\n~~~bash\n./scripts/link github.com/org/repo@version\n~~~\n\nTo link to a local copy of the SDK:\n\n~~~bash\n./scripts/link ../path/to/zavudev-go\n~~~\n\nIf you run the link script without any arguments, it will default to `../zavudev-go`.\n",
  },
  {
    language: 'php',
    content:
      '# Zavudev PHP API Library\n\nThe Zavudev PHP library provides convenient access to the Zavudev REST API from any PHP 8.1.0+ application.\n\n## Installation\n\nTo use this package, install via Composer by adding the following to your application\'s `composer.json`:\n\n<!-- x-release-please-start-version -->\n```json\n{\n  "repositories": [\n    {\n      "type": "vcs",\n      "url": "git@github.com:zavudev/sdk-php.git"\n    }\n  ],\n  "require": {\n    "org-placeholder/zavudev": "dev-main"\n  }\n}\n```\n<!-- x-release-please-end -->\n\n## Usage\n\n```php\n<?php\n\n$client = new Client(apiKey: getenv(\'ZAVUDEV_API_KEY\') ?: \'My API Key\');\n\n$messageResponse = $client->messages->send(\n  to: \'+14155551234\', text: \'Hello from Zavu!\'\n);\n\nvar_dump($messageResponse->message);\n```',
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
