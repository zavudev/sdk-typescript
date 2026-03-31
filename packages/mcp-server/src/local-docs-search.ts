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
  },
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
      "## send\n\n`client.messages.send(to: string, channel?: 'auto' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice', content?: { buttons?: object[]; contacts?: object[]; emoji?: string; filename?: string; latitude?: number; listButton?: string; locationAddress?: string; locationName?: string; longitude?: number; mediaId?: string; mediaUrl?: string; mimeType?: string; reactToMessageId?: string; sections?: object[]; templateId?: string; templateVariables?: object; }, fallbackEnabled?: boolean, htmlBody?: string, idempotencyKey?: string, messageType?: string, metadata?: object, replyTo?: string, subject?: string, text?: string, voiceLanguage?: string, Zavu-Sender?: string): { message: message; }`\n\n**post** `/v1/messages`\n\nSend a message to a recipient via SMS or WhatsApp.\n\n**Channel selection:**\n- If `channel` is omitted and `messageType` is `text`, defaults to SMS\n- If `messageType` is anything other than `text`, WhatsApp is used automatically\n\n**WhatsApp 24-hour window:**\n- Free-form messages (non-template) require an open 24h window\n- Window opens when the user messages you first\n- Use template messages to initiate conversations outside the window\n\n**Daily limits:**\n- Unverified accounts: 200 messages per channel per day\n- Complete KYC verification to increase limits to 10,000/day\n\n### Parameters\n\n- `to: string`\n  Recipient phone number in E.164 format, email address, or numeric chat ID (for Telegram/Instagram).\n\n- `channel?: 'auto' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'`\n  Delivery channel. Use 'auto' for intelligent routing. If omitted with non-text messageType, WhatsApp is used. For email recipients, defaults to 'email'.\n\n- `content?: { buttons?: { id: string; title: string; }[]; contacts?: { name?: string; phones?: string[]; }[]; emoji?: string; filename?: string; latitude?: number; listButton?: string; locationAddress?: string; locationName?: string; longitude?: number; mediaId?: string; mediaUrl?: string; mimeType?: string; reactToMessageId?: string; sections?: { rows: { id: string; title: string; description?: string; }[]; title: string; }[]; templateId?: string; templateVariables?: object; }`\n  Additional content for non-text message types.\n  - `buttons?: { id: string; title: string; }[]`\n    Interactive buttons (max 3).\n  - `contacts?: { name?: string; phones?: string[]; }[]`\n    Contact cards for contact messages.\n  - `emoji?: string`\n    Emoji for reaction messages.\n  - `filename?: string`\n    Filename for documents.\n  - `latitude?: number`\n    Latitude for location messages.\n  - `listButton?: string`\n    Button text for list messages.\n  - `locationAddress?: string`\n    Address of the location.\n  - `locationName?: string`\n    Name of the location.\n  - `longitude?: number`\n    Longitude for location messages.\n  - `mediaId?: string`\n    WhatsApp media ID if already uploaded.\n  - `mediaUrl?: string`\n    URL of the media file (for image, video, audio, document, sticker).\n  - `mimeType?: string`\n    MIME type of the media.\n  - `reactToMessageId?: string`\n    Message ID to react to.\n  - `sections?: { rows: { id: string; title: string; description?: string; }[]; title: string; }[]`\n    Sections for list messages.\n  - `templateId?: string`\n    Template ID for template messages.\n  - `templateVariables?: object`\n    Variables for template rendering. Keys are variable positions (1, 2, 3...).\n\n- `fallbackEnabled?: boolean`\n  Whether to enable automatic fallback to SMS if WhatsApp fails. Defaults to true.\n\n- `htmlBody?: string`\n  HTML body for email messages. If provided, email will be sent as multipart with both text and HTML.\n\n- `idempotencyKey?: string`\n  Optional idempotency key to avoid duplicate sends.\n\n- `messageType?: string`\n  Type of message. Defaults to 'text'.\n\n- `metadata?: object`\n  Arbitrary metadata to associate with the message.\n\n- `replyTo?: string`\n  Reply-To email address for email messages.\n\n- `subject?: string`\n  Email subject line. Required when channel is 'email' or recipient is an email address.\n\n- `text?: string`\n  Text body for text messages or caption for media messages.\n\n- `voiceLanguage?: string`\n  Language code for voice text-to-speech (e.g., 'en-US', 'es-ES', 'pt-BR'). If omitted, language is auto-detected from recipient's country code.\n\n- `Zavu-Sender?: string`\n\n### Returns\n\n- `{ message: { id: string; channel: channel; createdAt: string; messageType: message_type; status: message_status; to: string; content?: message_content; cost?: number; costProvider?: number; costTotal?: number; errorCode?: string; errorMessage?: string; from?: string; metadata?: object; providerMessageId?: string; senderId?: string; text?: string; updatedAt?: string; }; }`\n\n  - `message: { id: string; channel: 'auto' | 'sms' | 'sms_oneway' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; createdAt: string; messageType: string; status: string; to: string; content?: { buttons?: object[]; contacts?: object[]; emoji?: string; filename?: string; latitude?: number; listButton?: string; locationAddress?: string; locationName?: string; longitude?: number; mediaId?: string; mediaUrl?: string; mimeType?: string; reactToMessageId?: string; sections?: object[]; templateId?: string; templateVariables?: object; }; cost?: number; costProvider?: number; costTotal?: number; errorCode?: string; errorMessage?: string; from?: string; metadata?: object; providerMessageId?: string; senderId?: string; text?: string; updatedAt?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst messageResponse = await client.messages.send({ to: '+56912345678' });\n\nconsole.log(messageResponse);\n```",
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
      'variables?: string[];',
      "whatsappCategory?: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION';",
    ],
    response:
      "{ id: string; body: string; category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; updatedAt?: string; variables?: string[]; whatsapp?: { namespace?: string; status?: string; templateName?: string; }; }",
    markdown:
      "## create\n\n`client.templates.create(body: string, language: string, name: string, addSecurityRecommendation?: boolean, buttons?: { text: string; type: 'quick_reply' | 'url' | 'phone' | 'otp'; otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; url?: string; }[], codeExpirationMinutes?: number, variables?: string[], whatsappCategory?: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'): { id: string; body: string; category: whatsapp_category; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: object[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; updatedAt?: string; variables?: string[]; whatsapp?: object; }`\n\n**post** `/v1/templates`\n\nCreate a WhatsApp message template. Note: Templates must be approved by Meta before use.\n\n### Parameters\n\n- `body: string`\n\n- `language: string`\n\n- `name: string`\n\n- `addSecurityRecommendation?: boolean`\n  Add 'Do not share this code' disclaimer. Only for AUTHENTICATION templates.\n\n- `buttons?: { text: string; type: 'quick_reply' | 'url' | 'phone' | 'otp'; otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; url?: string; }[]`\n  Template buttons (max 3).\n\n- `codeExpirationMinutes?: number`\n  Code expiration time in minutes. Only for AUTHENTICATION templates.\n\n- `variables?: string[]`\n\n- `whatsappCategory?: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'`\n  WhatsApp template category.\n\n### Returns\n\n- `{ id: string; body: string; category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; updatedAt?: string; variables?: string[]; whatsapp?: { namespace?: string; status?: string; templateName?: string; }; }`\n\n  - `id: string`\n  - `body: string`\n  - `category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'`\n  - `language: string`\n  - `name: string`\n  - `addSecurityRecommendation?: boolean`\n  - `buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]`\n  - `codeExpirationMinutes?: number`\n  - `createdAt?: string`\n  - `footer?: string`\n  - `headerContent?: string`\n  - `headerType?: string`\n  - `status?: 'draft' | 'pending' | 'approved' | 'rejected'`\n  - `updatedAt?: string`\n  - `variables?: string[]`\n  - `whatsapp?: { namespace?: string; status?: string; templateName?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst template = await client.templates.create({\n  body: 'Hi {{1}}, your order {{2}} has been confirmed and will ship within 24 hours.',\n  language: 'en',\n  name: 'order_confirmation',\n});\n\nconsole.log(template);\n```",
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
      "{ id: string; body: string; category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; updatedAt?: string; variables?: string[]; whatsapp?: { namespace?: string; status?: string; templateName?: string; }; }",
    markdown:
      "## retrieve\n\n`client.templates.retrieve(templateId: string): { id: string; body: string; category: whatsapp_category; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: object[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; updatedAt?: string; variables?: string[]; whatsapp?: object; }`\n\n**get** `/v1/templates/{templateId}`\n\nGet template\n\n### Parameters\n\n- `templateId: string`\n\n### Returns\n\n- `{ id: string; body: string; category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; updatedAt?: string; variables?: string[]; whatsapp?: { namespace?: string; status?: string; templateName?: string; }; }`\n\n  - `id: string`\n  - `body: string`\n  - `category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'`\n  - `language: string`\n  - `name: string`\n  - `addSecurityRecommendation?: boolean`\n  - `buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]`\n  - `codeExpirationMinutes?: number`\n  - `createdAt?: string`\n  - `footer?: string`\n  - `headerContent?: string`\n  - `headerType?: string`\n  - `status?: 'draft' | 'pending' | 'approved' | 'rejected'`\n  - `updatedAt?: string`\n  - `variables?: string[]`\n  - `whatsapp?: { namespace?: string; status?: string; templateName?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst template = await client.templates.retrieve('templateId');\n\nconsole.log(template);\n```",
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
      "{ id: string; body: string; category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; updatedAt?: string; variables?: string[]; whatsapp?: { namespace?: string; status?: string; templateName?: string; }; }",
    markdown:
      "## list\n\n`client.templates.list(cursor?: string, limit?: number): { id: string; body: string; category: whatsapp_category; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: object[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; updatedAt?: string; variables?: string[]; whatsapp?: object; }`\n\n**get** `/v1/templates`\n\nList WhatsApp message templates for this project.\n\n### Parameters\n\n- `cursor?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ id: string; body: string; category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; updatedAt?: string; variables?: string[]; whatsapp?: { namespace?: string; status?: string; templateName?: string; }; }`\n\n  - `id: string`\n  - `body: string`\n  - `category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'`\n  - `language: string`\n  - `name: string`\n  - `addSecurityRecommendation?: boolean`\n  - `buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]`\n  - `codeExpirationMinutes?: number`\n  - `createdAt?: string`\n  - `footer?: string`\n  - `headerContent?: string`\n  - `headerType?: string`\n  - `status?: 'draft' | 'pending' | 'approved' | 'rejected'`\n  - `updatedAt?: string`\n  - `variables?: string[]`\n  - `whatsapp?: { namespace?: string; status?: string; templateName?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\n// Automatically fetches more pages as needed.\nfor await (const template of client.templates.list()) {\n  console.log(template);\n}\n```",
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
      "{ id: string; body: string; category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; updatedAt?: string; variables?: string[]; whatsapp?: { namespace?: string; status?: string; templateName?: string; }; }",
    markdown:
      "## submit\n\n`client.templates.submit(templateId: string, senderId: string, category?: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'): { id: string; body: string; category: whatsapp_category; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: object[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; updatedAt?: string; variables?: string[]; whatsapp?: object; }`\n\n**post** `/v1/templates/{templateId}/submit`\n\nSubmit a WhatsApp template to Meta for approval. The template must be in draft status and associated with a sender that has a WhatsApp Business Account configured.\n\n### Parameters\n\n- `templateId: string`\n\n- `senderId: string`\n  The sender ID with the WhatsApp Business Account to submit the template to.\n\n- `category?: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'`\n  Template category. If not provided, uses the category set on the template.\n\n### Returns\n\n- `{ id: string; body: string; category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'; language: string; name: string; addSecurityRecommendation?: boolean; buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]; codeExpirationMinutes?: number; createdAt?: string; footer?: string; headerContent?: string; headerType?: string; status?: 'draft' | 'pending' | 'approved' | 'rejected'; updatedAt?: string; variables?: string[]; whatsapp?: { namespace?: string; status?: string; templateName?: string; }; }`\n\n  - `id: string`\n  - `body: string`\n  - `category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION'`\n  - `language: string`\n  - `name: string`\n  - `addSecurityRecommendation?: boolean`\n  - `buttons?: { otpType?: 'COPY_CODE' | 'ONE_TAP'; packageName?: string; phoneNumber?: string; signatureHash?: string; text?: string; type?: 'quick_reply' | 'url' | 'phone' | 'otp'; url?: string; }[]`\n  - `codeExpirationMinutes?: number`\n  - `createdAt?: string`\n  - `footer?: string`\n  - `headerContent?: string`\n  - `headerType?: string`\n  - `status?: 'draft' | 'pending' | 'approved' | 'rejected'`\n  - `updatedAt?: string`\n  - `variables?: string[]`\n  - `whatsapp?: { namespace?: string; status?: string; templateName?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst template = await client.templates.submit('templateId', { senderId: 'sender_abc123' });\n\nconsole.log(template);\n```",
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
      '{ flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: object[]; trigger: object; updatedAt: string; description?: string; }; }',
    markdown:
      "## create\n\n`client.senders.agent.flows.create(senderId: string, name: string, steps: { id: string; config: object; type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer'; nextStepId?: string; }[], trigger: { type: 'keyword' | 'intent' | 'always' | 'manual'; intent?: string; keywords?: string[]; }, description?: string, enabled?: boolean, priority?: number): { flow: agent_flow; }`\n\n**post** `/v1/senders/{senderId}/agent/flows`\n\nCreate a new flow for an agent.\n\n### Parameters\n\n- `senderId: string`\n\n- `name: string`\n\n- `steps: { id: string; config: object; type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer'; nextStepId?: string; }[]`\n\n- `trigger: { type: 'keyword' | 'intent' | 'always' | 'manual'; intent?: string; keywords?: string[]; }`\n  - `type: 'keyword' | 'intent' | 'always' | 'manual'`\n    Type of trigger for a flow.\n  - `intent?: string`\n    Intent that triggers the flow (for intent type).\n  - `keywords?: string[]`\n    Keywords that trigger the flow (for keyword type).\n\n- `description?: string`\n\n- `enabled?: boolean`\n\n- `priority?: number`\n\n### Returns\n\n- `{ flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: object[]; trigger: object; updatedAt: string; description?: string; }; }`\n\n  - `flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: { id: string; config: object; type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer'; nextStepId?: string; }[]; trigger: { type: 'keyword' | 'intent' | 'always' | 'manual'; intent?: string; keywords?: string[]; }; updatedAt: string; description?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst flow = await client.senders.agent.flows.create('senderId', {\n  name: 'Lead Capture',\n  steps: [{\n  id: 'welcome',\n  config: { text: 'bar' },\n  type: 'message',\n}, {\n  id: 'ask_name',\n  config: { variable: 'bar', prompt: 'bar' },\n  type: 'collect',\n}],\n  trigger: { type: 'keyword' },\n});\n\nconsole.log(flow);\n```",
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
      '{ flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: object[]; trigger: object; updatedAt: string; description?: string; }; }',
    markdown:
      "## retrieve\n\n`client.senders.agent.flows.retrieve(senderId: string, flowId: string): { flow: agent_flow; }`\n\n**get** `/v1/senders/{senderId}/agent/flows/{flowId}`\n\nGet a specific flow.\n\n### Parameters\n\n- `senderId: string`\n\n- `flowId: string`\n\n### Returns\n\n- `{ flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: object[]; trigger: object; updatedAt: string; description?: string; }; }`\n\n  - `flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: { id: string; config: object; type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer'; nextStepId?: string; }[]; trigger: { type: 'keyword' | 'intent' | 'always' | 'manual'; intent?: string; keywords?: string[]; }; updatedAt: string; description?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst flow = await client.senders.agent.flows.retrieve('flowId', { senderId: 'senderId' });\n\nconsole.log(flow);\n```",
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
      '{ flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: object[]; trigger: object; updatedAt: string; description?: string; }; }',
    markdown:
      "## update\n\n`client.senders.agent.flows.update(senderId: string, flowId: string, description?: string, enabled?: boolean, name?: string, priority?: number, steps?: { id: string; config: object; type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer'; nextStepId?: string; }[], trigger?: { type: 'keyword' | 'intent' | 'always' | 'manual'; intent?: string; keywords?: string[]; }): { flow: agent_flow; }`\n\n**patch** `/v1/senders/{senderId}/agent/flows/{flowId}`\n\nUpdate a flow.\n\n### Parameters\n\n- `senderId: string`\n\n- `flowId: string`\n\n- `description?: string`\n\n- `enabled?: boolean`\n\n- `name?: string`\n\n- `priority?: number`\n\n- `steps?: { id: string; config: object; type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer'; nextStepId?: string; }[]`\n\n- `trigger?: { type: 'keyword' | 'intent' | 'always' | 'manual'; intent?: string; keywords?: string[]; }`\n  - `type: 'keyword' | 'intent' | 'always' | 'manual'`\n    Type of trigger for a flow.\n  - `intent?: string`\n    Intent that triggers the flow (for intent type).\n  - `keywords?: string[]`\n    Keywords that trigger the flow (for keyword type).\n\n### Returns\n\n- `{ flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: object[]; trigger: object; updatedAt: string; description?: string; }; }`\n\n  - `flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: { id: string; config: object; type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer'; nextStepId?: string; }[]; trigger: { type: 'keyword' | 'intent' | 'always' | 'manual'; intent?: string; keywords?: string[]; }; updatedAt: string; description?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst flow = await client.senders.agent.flows.update('flowId', { senderId: 'senderId' });\n\nconsole.log(flow);\n```",
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
      "## list\n\n`client.senders.agent.flows.list(senderId: string, cursor?: string, enabled?: boolean, limit?: number): { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: object[]; trigger: object; updatedAt: string; description?: string; }`\n\n**get** `/v1/senders/{senderId}/agent/flows`\n\nList flows for an agent.\n\n### Parameters\n\n- `senderId: string`\n\n- `cursor?: string`\n\n- `enabled?: boolean`\n\n- `limit?: number`\n\n### Returns\n\n- `{ id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: { id: string; config: object; type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer'; nextStepId?: string; }[]; trigger: { type: 'keyword' | 'intent' | 'always' | 'manual'; intent?: string; keywords?: string[]; }; updatedAt: string; description?: string; }`\n\n  - `id: string`\n  - `agentId: string`\n  - `createdAt: string`\n  - `enabled: boolean`\n  - `name: string`\n  - `priority: number`\n  - `steps: { id: string; config: object; type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer'; nextStepId?: string; }[]`\n  - `trigger: { type: 'keyword' | 'intent' | 'always' | 'manual'; intent?: string; keywords?: string[]; }`\n  - `updatedAt: string`\n  - `description?: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\n// Automatically fetches more pages as needed.\nfor await (const agentFlow of client.senders.agent.flows.list('senderId')) {\n  console.log(agentFlow);\n}\n```",
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
      '{ flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: object[]; trigger: object; updatedAt: string; description?: string; }; }',
    markdown:
      "## duplicate\n\n`client.senders.agent.flows.duplicate(senderId: string, flowId: string, newName: string): { flow: agent_flow; }`\n\n**post** `/v1/senders/{senderId}/agent/flows/{flowId}/duplicate`\n\nCreate a copy of an existing flow with a new name.\n\n### Parameters\n\n- `senderId: string`\n\n- `flowId: string`\n\n- `newName: string`\n\n### Returns\n\n- `{ flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: object[]; trigger: object; updatedAt: string; description?: string; }; }`\n\n  - `flow: { id: string; agentId: string; createdAt: string; enabled: boolean; name: string; priority: number; steps: { id: string; config: object; type: 'message' | 'collect' | 'condition' | 'tool' | 'llm' | 'transfer'; nextStepId?: string; }[]; trigger: { type: 'keyword' | 'intent' | 'always' | 'manual'; intent?: string; keywords?: string[]; }; updatedAt: string; description?: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst response = await client.senders.agent.flows.duplicate('flowId', { senderId: 'senderId', newName: 'Lead Capture (Copy)' });\n\nconsole.log(response);\n```",
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
      '{ tool: { id: string; agentId: string; createdAt: string; description: string; enabled: boolean; name: string; parameters: object; updatedAt: string; webhookUrl: string; }; }',
    markdown:
      "## create\n\n`client.senders.agent.tools.create(senderId: string, description: string, name: string, parameters: { properties: object; required: string[]; type: 'object'; }, webhookUrl: string, enabled?: boolean, webhookSecret?: string): { tool: agent_tool; }`\n\n**post** `/v1/senders/{senderId}/agent/tools`\n\nCreate a new tool for an agent. Tools allow the agent to call external webhooks.\n\n### Parameters\n\n- `senderId: string`\n\n- `description: string`\n\n- `name: string`\n\n- `parameters: { properties: object; required: string[]; type: 'object'; }`\n  - `properties: object`\n  - `required: string[]`\n  - `type: 'object'`\n\n- `webhookUrl: string`\n  Must be HTTPS.\n\n- `enabled?: boolean`\n\n- `webhookSecret?: string`\n  Optional secret for webhook signature verification.\n\n### Returns\n\n- `{ tool: { id: string; agentId: string; createdAt: string; description: string; enabled: boolean; name: string; parameters: object; updatedAt: string; webhookUrl: string; }; }`\n\n  - `tool: { id: string; agentId: string; createdAt: string; description: string; enabled: boolean; name: string; parameters: { properties: object; required: string[]; type: 'object'; }; updatedAt: string; webhookUrl: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst tool = await client.senders.agent.tools.create('senderId', {\n  description: 'Get the status of a customer order',\n  name: 'get_order_status',\n  parameters: {\n  properties: { order_id: {} },\n  required: ['order_id'],\n  type: 'object',\n},\n  webhookUrl: 'https://api.example.com/webhooks/order-status',\n});\n\nconsole.log(tool);\n```",
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
      '{ tool: { id: string; agentId: string; createdAt: string; description: string; enabled: boolean; name: string; parameters: object; updatedAt: string; webhookUrl: string; }; }',
    markdown:
      "## retrieve\n\n`client.senders.agent.tools.retrieve(senderId: string, toolId: string): { tool: agent_tool; }`\n\n**get** `/v1/senders/{senderId}/agent/tools/{toolId}`\n\nGet a specific tool.\n\n### Parameters\n\n- `senderId: string`\n\n- `toolId: string`\n\n### Returns\n\n- `{ tool: { id: string; agentId: string; createdAt: string; description: string; enabled: boolean; name: string; parameters: object; updatedAt: string; webhookUrl: string; }; }`\n\n  - `tool: { id: string; agentId: string; createdAt: string; description: string; enabled: boolean; name: string; parameters: { properties: object; required: string[]; type: 'object'; }; updatedAt: string; webhookUrl: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst tool = await client.senders.agent.tools.retrieve('toolId', { senderId: 'senderId' });\n\nconsole.log(tool);\n```",
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
      '{ tool: { id: string; agentId: string; createdAt: string; description: string; enabled: boolean; name: string; parameters: object; updatedAt: string; webhookUrl: string; }; }',
    markdown:
      "## update\n\n`client.senders.agent.tools.update(senderId: string, toolId: string, description?: string, enabled?: boolean, name?: string, parameters?: { properties: object; required: string[]; type: 'object'; }, webhookSecret?: string, webhookUrl?: string): { tool: agent_tool; }`\n\n**patch** `/v1/senders/{senderId}/agent/tools/{toolId}`\n\nUpdate a tool.\n\n### Parameters\n\n- `senderId: string`\n\n- `toolId: string`\n\n- `description?: string`\n\n- `enabled?: boolean`\n\n- `name?: string`\n\n- `parameters?: { properties: object; required: string[]; type: 'object'; }`\n  - `properties: object`\n  - `required: string[]`\n  - `type: 'object'`\n\n- `webhookSecret?: string`\n\n- `webhookUrl?: string`\n\n### Returns\n\n- `{ tool: { id: string; agentId: string; createdAt: string; description: string; enabled: boolean; name: string; parameters: object; updatedAt: string; webhookUrl: string; }; }`\n\n  - `tool: { id: string; agentId: string; createdAt: string; description: string; enabled: boolean; name: string; parameters: { properties: object; required: string[]; type: 'object'; }; updatedAt: string; webhookUrl: string; }`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst tool = await client.senders.agent.tools.update('toolId', { senderId: 'senderId' });\n\nconsole.log(tool);\n```",
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
      "## list\n\n`client.senders.agent.tools.list(senderId: string, cursor?: string, enabled?: boolean, limit?: number): { id: string; agentId: string; createdAt: string; description: string; enabled: boolean; name: string; parameters: object; updatedAt: string; webhookUrl: string; }`\n\n**get** `/v1/senders/{senderId}/agent/tools`\n\nList tools for an agent.\n\n### Parameters\n\n- `senderId: string`\n\n- `cursor?: string`\n\n- `enabled?: boolean`\n\n- `limit?: number`\n\n### Returns\n\n- `{ id: string; agentId: string; createdAt: string; description: string; enabled: boolean; name: string; parameters: { properties: object; required: string[]; type: 'object'; }; updatedAt: string; webhookUrl: string; }`\n\n  - `id: string`\n  - `agentId: string`\n  - `createdAt: string`\n  - `description: string`\n  - `enabled: boolean`\n  - `name: string`\n  - `parameters: { properties: object; required: string[]; type: 'object'; }`\n  - `updatedAt: string`\n  - `webhookUrl: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\n// Automatically fetches more pages as needed.\nfor await (const agentTool of client.senders.agent.tools.list('senderId')) {\n  console.log(agentTool);\n}\n```",
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
      "{ id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: { avgDeliveryTimeMs?: number; failureCount?: number; lastSuccessAt?: string; successCount?: number; totalAttempts?: number; }; updatedAt?: string; }[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }",
    markdown:
      "## retrieve\n\n`client.contacts.retrieve(contactId: string): { id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: object[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }`\n\n**get** `/v1/contacts/{contactId}`\n\nGet contact\n\n### Parameters\n\n- `contactId: string`\n\n### Returns\n\n- `{ id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: { avgDeliveryTimeMs?: number; failureCount?: number; lastSuccessAt?: string; successCount?: number; totalAttempts?: number; }; updatedAt?: string; }[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `availableChannels: string[]`\n  - `createdAt: string`\n  - `metadata: object`\n  - `verified: boolean`\n  - `channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: { avgDeliveryTimeMs?: number; failureCount?: number; lastSuccessAt?: string; successCount?: number; totalAttempts?: number; }; updatedAt?: string; }[]`\n  - `countryCode?: string`\n  - `defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'`\n  - `displayName?: string`\n  - `phoneNumber?: string`\n  - `primaryEmail?: string`\n  - `primaryPhone?: string`\n  - `profileName?: string`\n  - `suggestedMergeWith?: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst contact = await client.contacts.retrieve('contactId');\n\nconsole.log(contact);\n```",
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
      "{ id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: { avgDeliveryTimeMs?: number; failureCount?: number; lastSuccessAt?: string; successCount?: number; totalAttempts?: number; }; updatedAt?: string; }[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }",
    markdown:
      "## update\n\n`client.contacts.update(contactId: string, defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice', metadata?: object): { id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: object[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }`\n\n**patch** `/v1/contacts/{contactId}`\n\nUpdate contact\n\n### Parameters\n\n- `contactId: string`\n\n- `defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'`\n  Preferred channel for this contact. Set to null to clear.\n\n- `metadata?: object`\n\n### Returns\n\n- `{ id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: { avgDeliveryTimeMs?: number; failureCount?: number; lastSuccessAt?: string; successCount?: number; totalAttempts?: number; }; updatedAt?: string; }[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `availableChannels: string[]`\n  - `createdAt: string`\n  - `metadata: object`\n  - `verified: boolean`\n  - `channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: { avgDeliveryTimeMs?: number; failureCount?: number; lastSuccessAt?: string; successCount?: number; totalAttempts?: number; }; updatedAt?: string; }[]`\n  - `countryCode?: string`\n  - `defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'`\n  - `displayName?: string`\n  - `phoneNumber?: string`\n  - `primaryEmail?: string`\n  - `primaryPhone?: string`\n  - `profileName?: string`\n  - `suggestedMergeWith?: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst contact = await client.contacts.update('contactId');\n\nconsole.log(contact);\n```",
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
      "{ id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: { avgDeliveryTimeMs?: number; failureCount?: number; lastSuccessAt?: string; successCount?: number; totalAttempts?: number; }; updatedAt?: string; }[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }",
    markdown:
      "## list\n\n`client.contacts.list(cursor?: string, limit?: number, phoneNumber?: string): { id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: object[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }`\n\n**get** `/v1/contacts`\n\nList contacts with their communication channels.\n\n### Parameters\n\n- `cursor?: string`\n\n- `limit?: number`\n\n- `phoneNumber?: string`\n\n### Returns\n\n- `{ id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: { avgDeliveryTimeMs?: number; failureCount?: number; lastSuccessAt?: string; successCount?: number; totalAttempts?: number; }; updatedAt?: string; }[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `availableChannels: string[]`\n  - `createdAt: string`\n  - `metadata: object`\n  - `verified: boolean`\n  - `channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: { avgDeliveryTimeMs?: number; failureCount?: number; lastSuccessAt?: string; successCount?: number; totalAttempts?: number; }; updatedAt?: string; }[]`\n  - `countryCode?: string`\n  - `defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'`\n  - `displayName?: string`\n  - `phoneNumber?: string`\n  - `primaryEmail?: string`\n  - `primaryPhone?: string`\n  - `profileName?: string`\n  - `suggestedMergeWith?: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\n// Automatically fetches more pages as needed.\nfor await (const contact of client.contacts.list()) {\n  console.log(contact);\n}\n```",
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
      "{ id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: { avgDeliveryTimeMs?: number; failureCount?: number; lastSuccessAt?: string; successCount?: number; totalAttempts?: number; }; updatedAt?: string; }[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }",
    markdown:
      "## retrieve_by_phone\n\n`client.contacts.retrieveByPhone(phoneNumber: string): { id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: object[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }`\n\n**get** `/v1/contacts/phone/{phoneNumber}`\n\nGet contact by phone number\n\n### Parameters\n\n- `phoneNumber: string`\n\n### Returns\n\n- `{ id: string; availableChannels: string[]; createdAt: string; metadata: object; verified: boolean; channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: { avgDeliveryTimeMs?: number; failureCount?: number; lastSuccessAt?: string; successCount?: number; totalAttempts?: number; }; updatedAt?: string; }[]; countryCode?: string; defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'; displayName?: string; phoneNumber?: string; primaryEmail?: string; primaryPhone?: string; profileName?: string; suggestedMergeWith?: string; updatedAt?: string; }`\n\n  - `id: string`\n  - `availableChannels: string[]`\n  - `createdAt: string`\n  - `metadata: object`\n  - `verified: boolean`\n  - `channels?: { id: string; channel: 'sms' | 'whatsapp' | 'email' | 'telegram' | 'voice'; createdAt: string; identifier: string; isPrimary: boolean; verified: boolean; countryCode?: string; label?: string; lastInboundAt?: string; metadata?: object; metrics?: { avgDeliveryTimeMs?: number; failureCount?: number; lastSuccessAt?: string; successCount?: number; totalAttempts?: number; }; updatedAt?: string; }[]`\n  - `countryCode?: string`\n  - `defaultChannel?: 'sms' | 'whatsapp' | 'telegram' | 'email' | 'instagram' | 'voice'`\n  - `displayName?: string`\n  - `phoneNumber?: string`\n  - `primaryEmail?: string`\n  - `primaryPhone?: string`\n  - `profileName?: string`\n  - `suggestedMergeWith?: string`\n  - `updatedAt?: string`\n\n### Example\n\n```typescript\nimport Zavudev from '@zavudev/sdk';\n\nconst client = new Zavudev();\n\nconst contact = await client.contacts.retrieveByPhone('phoneNumber');\n\nconsole.log(contact);\n```",
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
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [];

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
