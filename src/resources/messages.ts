// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Messages extends APIResource {
  /**
   * Get message by ID
   *
   * @example
   * ```ts
   * const messageResponse = await client.messages.retrieve(
   *   'messageId',
   * );
   * ```
   */
  retrieve(messageID: string, options?: RequestOptions): APIPromise<MessageResponse> {
    return this._client.get(path`/v1/messages/${messageID}`, options);
  }

  /**
   * List messages previously sent by this project.
   *
   * @example
   * ```ts
   * const messages = await client.messages.list();
   * ```
   */
  list(
    query: MessageListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MessageListResponse> {
    return this._client.get('/v1/messages', { query, ...options });
  }

  /**
   * Send an emoji reaction to an existing WhatsApp message. Reactions are only
   * supported for WhatsApp messages.
   *
   * @example
   * ```ts
   * const messageResponse = await client.messages.react(
   *   'messageId',
   *   { emoji: '👍' },
   * );
   * ```
   */
  react(
    messageID: string,
    params: MessageReactParams,
    options?: RequestOptions,
  ): APIPromise<MessageResponse> {
    const { 'Zavu-Sender': zavuSender, ...body } = params;
    return this._client.post(path`/v1/messages/${messageID}/reactions`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(zavuSender != null ? { 'Zavu-Sender': zavuSender } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Send a message to a recipient via SMS or WhatsApp.
   *
   * **Channel selection:**
   *
   * - If `channel` is omitted and `messageType` is `text`, defaults to SMS
   * - If `messageType` is anything other than `text`, WhatsApp is used automatically
   *
   * **WhatsApp 24-hour window:**
   *
   * - Free-form messages (non-template) require an open 24h window
   * - Window opens when the user messages you first
   * - Use template messages to initiate conversations outside the window
   *
   * @example
   * ```ts
   * const messageResponse = await client.messages.send({
   *   to: '+56912345678',
   *   text: 'Your verification code is 123456',
   * });
   * ```
   */
  send(params: MessageSendParams, options?: RequestOptions): APIPromise<MessageResponse> {
    const { 'Zavu-Sender': zavuSender, ...body } = params;
    return this._client.post('/v1/messages', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(zavuSender != null ? { 'Zavu-Sender': zavuSender } : undefined) },
        options?.headers,
      ]),
    });
  }
}

/**
 * Delivery channel. Use 'auto' for intelligent routing.
 */
export type Channel = 'auto' | 'sms' | 'whatsapp' | 'email';

export interface Message {
  id: string;

  /**
   * Delivery channel. Use 'auto' for intelligent routing.
   */
  channel: Channel;

  createdAt: string;

  /**
   * Type of message. Non-text types are WhatsApp only.
   */
  messageType: MessageType;

  status: MessageStatus;

  to: string;

  /**
   * Content for non-text message types (WhatsApp only).
   */
  content?: MessageContent;

  /**
   * MAU cost in USD (charged for first contact of the month).
   */
  cost?: number | null;

  /**
   * Provider cost in USD (Telnyx, SES, etc.).
   */
  costProvider?: number | null;

  /**
   * Total cost in USD (MAU + provider cost).
   */
  costTotal?: number | null;

  errorCode?: string | null;

  errorMessage?: string | null;

  from?: string;

  metadata?: { [key: string]: string };

  /**
   * Message ID from the delivery provider.
   */
  providerMessageId?: string;

  senderId?: string;

  /**
   * Text content or caption.
   */
  text?: string;

  updatedAt?: string;
}

/**
 * Content for non-text message types (WhatsApp only).
 */
export interface MessageContent {
  /**
   * Interactive buttons (max 3).
   */
  buttons?: Array<MessageContent.Button>;

  /**
   * Contact cards for contact messages.
   */
  contacts?: Array<MessageContent.Contact>;

  /**
   * Emoji for reaction messages.
   */
  emoji?: string;

  /**
   * Filename for documents.
   */
  filename?: string;

  /**
   * Latitude for location messages.
   */
  latitude?: number;

  /**
   * Button text for list messages.
   */
  listButton?: string;

  /**
   * Address of the location.
   */
  locationAddress?: string;

  /**
   * Name of the location.
   */
  locationName?: string;

  /**
   * Longitude for location messages.
   */
  longitude?: number;

  /**
   * WhatsApp media ID if already uploaded.
   */
  mediaId?: string;

  /**
   * URL of the media file (for image, video, audio, document, sticker).
   */
  mediaUrl?: string;

  /**
   * MIME type of the media.
   */
  mimeType?: string;

  /**
   * Message ID to react to.
   */
  reactToMessageId?: string;

  /**
   * Sections for list messages.
   */
  sections?: Array<MessageContent.Section>;

  /**
   * Template ID for template messages.
   */
  templateId?: string;

  /**
   * Variables for template rendering. Keys are variable positions (1, 2, 3...).
   */
  templateVariables?: { [key: string]: string };
}

export namespace MessageContent {
  export interface Button {
    id: string;

    title: string;
  }

  export interface Contact {
    name?: string;

    phones?: Array<string>;
  }

  export interface Section {
    rows: Array<Section.Row>;

    title: string;
  }

  export namespace Section {
    export interface Row {
      id: string;

      title: string;

      description?: string;
    }
  }
}

export interface MessageResponse {
  message: Message;
}

export type MessageStatus = 'queued' | 'sending' | 'delivered' | 'failed' | 'received';

/**
 * Type of message. Non-text types are WhatsApp only.
 */
export type MessageType =
  | 'text'
  | 'image'
  | 'video'
  | 'audio'
  | 'document'
  | 'sticker'
  | 'location'
  | 'contact'
  | 'buttons'
  | 'list'
  | 'reaction'
  | 'template';

export interface MessageListResponse {
  items: Array<Message>;

  nextCursor?: string | null;
}

export interface MessageListParams {
  /**
   * Delivery channel. Use 'auto' for intelligent routing.
   */
  channel?: Channel;

  cursor?: string;

  limit?: number;

  status?: MessageStatus;

  to?: string;
}

export interface MessageReactParams {
  /**
   * Body param: Single emoji character to react with.
   */
  emoji: string;

  /**
   * Header param: Optional sender profile ID. If omitted, the project's default
   * sender will be used.
   */
  'Zavu-Sender'?: string;
}

export interface MessageSendParams {
  /**
   * Body param: Recipient phone number in E.164 format or email address.
   */
  to: string;

  /**
   * Body param: Delivery channel. Use 'auto' for intelligent routing. If omitted
   * with non-text messageType, WhatsApp is used. For email recipients, defaults to
   * 'email'.
   */
  channel?: Channel;

  /**
   * Body param: Additional content for non-text message types.
   */
  content?: MessageContent;

  /**
   * Body param: HTML body for email messages. If provided, email will be sent as
   * multipart with both text and HTML.
   */
  htmlBody?: string;

  /**
   * Body param: Optional idempotency key to avoid duplicate sends.
   */
  idempotencyKey?: string;

  /**
   * Body param: Type of message. Defaults to 'text'.
   */
  messageType?: MessageType;

  /**
   * Body param: Arbitrary metadata to associate with the message.
   */
  metadata?: { [key: string]: string };

  /**
   * Body param: Reply-To email address for email messages.
   */
  replyTo?: string;

  /**
   * Body param: Email subject line. Required when channel is 'email' or recipient is
   * an email address.
   */
  subject?: string;

  /**
   * Body param: Text body for text messages or caption for media messages.
   */
  text?: string;

  /**
   * Header param: Optional sender profile ID. If omitted, the project's default
   * sender will be used.
   */
  'Zavu-Sender'?: string;
}

export declare namespace Messages {
  export {
    type Channel as Channel,
    type Message as Message,
    type MessageContent as MessageContent,
    type MessageResponse as MessageResponse,
    type MessageStatus as MessageStatus,
    type MessageType as MessageType,
    type MessageListResponse as MessageListResponse,
    type MessageListParams as MessageListParams,
    type MessageReactParams as MessageReactParams,
    type MessageSendParams as MessageSendParams,
  };
}
