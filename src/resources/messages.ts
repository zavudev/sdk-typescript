// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
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
   * // Automatically fetches more pages as needed.
   * for await (const message of client.messages.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: MessageListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MessagesCursor, Message> {
    return this._client.getAPIList('/v1/messages', Cursor<Message>, { query, ...options });
  }

  /**
   * List the stored file attachments for an email message and get a short-lived
   * signed `downloadUrl` for each. Works for both inbound emails (received via
   * `message.inbound`) and outbound emails you sent with attachments. Messages
   * without stored attachments (including SMS, WhatsApp, and other channels) return
   * an empty list. Each `downloadUrl` is generated fresh per request and expires —
   * fetch the file promptly and do not cache the URL.
   *
   * @example
   * ```ts
   * const response = await client.messages.listAttachments(
   *   'messageId',
   * );
   * ```
   */
  listAttachments(messageID: string, options?: RequestOptions): APIPromise<MessageListAttachmentsResponse> {
    return this._client.get(path`/v1/messages/${messageID}/attachments`, options);
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
   * **Plan allowances and email billing:**
   *
   * - WhatsApp, Telegram, Instagram and Messenger share an allowance of 2,000
   *   messages per month on Free. Over it, sends return 429 with code
   *   `a2p_limit_exceeded` and upgrade details; the counter resets on the 1st of
   *   each month. Paid plans have no message caps
   * - Email is billed from your prepaid balance in 1,000-message blocks: $0.40 per
   *   1,000 transactional emails, $0.80 per 1,000 marketing (broadcast) emails. A
   *   block is charged when your monthly count crosses each 1,000 boundary, and at
   *   zero balance email sends return 402 with code `insufficient_balance`. Free
   *   teams start with $2 of credit and additionally cap at 3,000 emails/month and
   *   100/day. Teams on earlier plans keep their original email quotas instead
   * - SMS and voice are billed per message from your balance on every plan
   *
   * **Email recipient pre-flight:** Email messages are validated automatically
   * before dispatch. Sends that would be a guaranteed hard bounce are failed instead
   * of sent, protecting your bounce rate: the message transitions to `failed`
   * (visible via `GET /v1/messages/{messageId}` and the `message.failed` webhook)
   * with `errorCode` set to `EMAIL_INVALID_RECIPIENT` (malformed address),
   * `EMAIL_DOMAIN_NOT_FOUND` (recipient domain has no MX or A records), or
   * `EMAIL_RECIPIENT_SUPPRESSED` (address is on your suppression list after a
   * previous bounce or complaint). Advisory signals (role addresses, disposable
   * domains) do not block sends — check them beforehand with
   * `POST /v1/introspect/email`.
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

  /**
   * Mark an inbound WhatsApp message as read and display a typing indicator to the
   * user while you prepare a response. The indicator is automatically dismissed when
   * you send a reply, or after 25 seconds — whichever comes first. Only valid for
   * inbound WhatsApp messages. Use this when a reply will take more than a couple of
   * seconds (LLM agent, tool call, lookup) to improve the recipient's experience.
   *
   * @example
   * ```ts
   * const response = await client.messages.showTyping(
   *   'messageId',
   * );
   * ```
   */
  showTyping(
    messageID: string,
    params: MessageShowTypingParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MessageShowTypingResponse> {
    const { 'Zavu-Sender': zavuSender } = params ?? {};
    return this._client.post(path`/v1/messages/${messageID}/typing`, {
      ...options,
      headers: buildHeaders([
        { ...(zavuSender != null ? { 'Zavu-Sender': zavuSender } : undefined) },
        options?.headers,
      ]),
    });
  }
}

export type MessagesCursor = Cursor<Message>;

/**
 * Delivery channel. Use 'auto' for intelligent routing.
 */
export type Channel =
  | 'auto'
  | 'sms'
  | 'sms_oneway'
  | 'whatsapp'
  | 'telegram'
  | 'email'
  | 'instagram'
  | 'messenger'
  | 'voice';

export interface Message {
  id: string;

  /**
   * Delivery channel. Use 'auto' for intelligent routing.
   */
  channel: Channel;

  createdAt: string;

  /**
   * Type of message. Non-text types are supported by WhatsApp and Telegram (varies
   * by type).
   *
   * `location_request` asks the recipient to share their location and is
   * WhatsApp-only. It takes no `content` object — the prompt goes in `text` (max
   * 1024 characters) and the button label is fixed by WhatsApp. The recipient's
   * answer arrives as an inbound `location` message whose `content.replyToMessageId`
   * is the ID of the request.
   *
   * `request_contact_info` asks the recipient to share their phone number and is
   * WhatsApp-only. Like `location_request` it takes no `content` object — the prompt
   * goes in `text` (max 1024 characters) and WhatsApp renders a fixed **Share
   * Contact Info** button. The answer arrives as an inbound `contact` message. Use
   * it to recover the phone number of a contact who adopted a WhatsApp username and
   * is only known by their business-scoped user ID (BSUID); when they share it, Zavu
   * automatically links the phone number to that contact.
   */
  messageType: MessageType;

  status: MessageStatus;

  to: string;

  /**
   * Content for non-text message types (WhatsApp and Telegram).
   */
  content?: MessageContent;

  /**
   * ID of the conversation (inbox thread) this message belongs to. Use it to build a
   * direct dashboard link:
   * `https://dashboard.zavu.dev/{locale}/inbox?conv={conversationId}`. Omitted only
   * on legacy messages created before conversation threading.
   */
  conversationId?: string;

  /**
   * Zavu platform charge in USD for this message. Messaging is billed against your
   * plan's monthly limits plus usage-based overage.
   */
  cost?: number | null;

  /**
   * Carrier and delivery cost in USD.
   */
  costProvider?: number | null;

  /**
   * Total cost in USD (platform charge + delivery cost).
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
 * Content for non-text message types (WhatsApp and Telegram).
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
   * Button label for cta_url messages.
   */
  ctaDisplayText?: string;

  /**
   * Public HTTPS URL of the header media when ctaHeaderType is 'image', 'video', or
   * 'document'. WhatsApp fetches this URL — it must be publicly reachable and return
   * the declared content type.
   */
  ctaHeaderMediaUrl?: string;

  /**
   * Header text when ctaHeaderType is 'text'.
   */
  ctaHeaderText?: string;

  /**
   * Optional header type for cta_url messages.
   */
  ctaHeaderType?: 'text' | 'image' | 'video' | 'document';

  /**
   * Destination URL opened in the device's default browser when the button is
   * tapped. Used with messageType=cta_url. WhatsApp requires HTTPS in production.
   */
  ctaUrl?: string;

  /**
   * Emoji for reaction messages.
   */
  emoji?: string;

  /**
   * Filename for documents.
   */
  filename?: string;

  /**
   * Optional footer text for cta_url messages.
   */
  footerText?: string;

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
   * Click-to-WhatsApp (CTWA) ad attribution: where an inbound conversation came
   * from.
   *
   * WhatsApp only. Present on the **first inbound message** of a conversation opened
   * from a Meta ad or post, and on no message after it — so store it when it arrives
   * rather than expecting it again. Organic conversations never carry it.
   *
   * Field names are camelCased to match the rest of this API; Meta sends them as
   * snake_case (`ctwa_clid`, `source_id`, ...). Fields that do not apply are
   * omitted: a `post` source has no click id, and an image ad has no `videoUrl`.
   */
  referral?: MessageContent.Referral;

  /**
   * Sender of the quoted message (phone number in E.164 format).
   */
  replyToFrom?: string;

  /**
   * Zavu message ID of the quoted message this message replies to. Present on
   * inbound messages that quote an earlier message. Omitted when the quoted message
   * is not found in Zavu (e.g. an old or unknown message) — use
   * replyToProviderMessageId in that case.
   */
  replyToMessageId?: string;

  /**
   * Type of the quoted message (text, image, video, etc.).
   */
  replyToMessageType?: string;

  /**
   * Provider message ID (WhatsApp WAMID) of the quoted message. Present whenever an
   * inbound message is a reply, even if the quoted message is not stored in Zavu.
   */
  replyToProviderMessageId?: string;

  /**
   * Truncated snippet of the quoted message's text, for display. Empty when the
   * quoted message has no text (e.g. media).
   */
  replyToText?: string;

  /**
   * Sections for list messages.
   */
  sections?: Array<MessageContent.Section>;

  /**
   * Variables for dynamic button placeholders (URL buttons and OTP buttons). Keys
   * are the button index (0, 1, 2) in the template's `buttons` array — not the
   * placeholder name. Values substitute the `{{1}}` placeholder inside that button's
   * URL.
   *
   * **WhatsApp constraints:**
   *
   * - URL buttons only accept `{{1}}` — positional, numeric, no whitespace, no name.
   *   Named placeholders like `{{token}}` are stored as literal URL text by Meta and
   *   cannot be substituted.
   * - At most one placeholder per URL button.
   * - A template may have at most three buttons.
   * - Static URL buttons (no placeholder) and `quick_reply` buttons are not included
   *   here.
   */
  templateButtonVariables?: { [key: string]: string };

  /**
   * Value for a text-header variable, keyed by `1` (WhatsApp text headers allow at
   * most one variable). Optional override. If omitted, Zavu resolves the header from
   * `templateVariables` using the header placeholder's name (e.g. `novios`). Static
   * text headers need no value.
   */
  templateHeaderVariables?: { [key: string]: string };

  /**
   * Template ID for template messages.
   */
  templateId?: string;

  /**
   * Variables for body placeholders. Key them to match the template body: by
   * position (`1`, `2`, ...) for positional templates, or by name (e.g.
   * `customer_name`) for named templates. Zavu detects the template's format and
   * sends the correct payload to Meta. Named keys also resolve a named text-header
   * variable. Do not mix positional and named keys in the same request.
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

  /**
   * Click-to-WhatsApp (CTWA) ad attribution: where an inbound conversation came
   * from.
   *
   * WhatsApp only. Present on the **first inbound message** of a conversation opened
   * from a Meta ad or post, and on no message after it — so store it when it arrives
   * rather than expecting it again. Organic conversations never carry it.
   *
   * Field names are camelCased to match the rest of this API; Meta sends them as
   * snake_case (`ctwa_clid`, `source_id`, ...). Fields that do not apply are
   * omitted: a `post` source has no click id, and an image ad has no `videoUrl`.
   */
  export interface Referral {
    /**
     * Body copy of the ad or post.
     */
    body?: string;

    /**
     * Click-to-WhatsApp click identifier. This is the value Meta's Conversions API
     * needs to credit a conversion back to the ad that produced the conversation.
     * Present on `ad` sources; a `post` source has none.
     */
    ctwaClid?: string;

    /**
     * Headline of the ad or post.
     */
    headline?: string;

    /**
     * Image of the ad. Present when `mediaType` is `image`.
     */
    imageUrl?: string;

    /**
     * Type of media on the ad, when it had any.
     */
    mediaType?: 'image' | 'video';

    /**
     * Identifier of the ad or post that produced the click.
     */
    sourceId?: string;

    /**
     * Where the click came from.
     */
    sourceType?: 'ad' | 'post';

    /**
     * Meta permalink to the ad or post.
     */
    sourceUrl?: string;

    /**
     * Thumbnail of the ad media.
     */
    thumbnailUrl?: string;

    /**
     * Video of the ad. Present when `mediaType` is `video`.
     */
    videoUrl?: string;
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

export type MessageStatus =
  | 'queued'
  | 'sending'
  | 'sent'
  | 'delivered'
  | 'read'
  | 'failed'
  | 'received'
  | 'pending_url_verification';

/**
 * Type of message. Non-text types are supported by WhatsApp and Telegram (varies
 * by type).
 *
 * `location_request` asks the recipient to share their location and is
 * WhatsApp-only. It takes no `content` object — the prompt goes in `text` (max
 * 1024 characters) and the button label is fixed by WhatsApp. The recipient's
 * answer arrives as an inbound `location` message whose `content.replyToMessageId`
 * is the ID of the request.
 *
 * `request_contact_info` asks the recipient to share their phone number and is
 * WhatsApp-only. Like `location_request` it takes no `content` object — the prompt
 * goes in `text` (max 1024 characters) and WhatsApp renders a fixed **Share
 * Contact Info** button. The answer arrives as an inbound `contact` message. Use
 * it to recover the phone number of a contact who adopted a WhatsApp username and
 * is only known by their business-scoped user ID (BSUID); when they share it, Zavu
 * automatically links the phone number to that contact.
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
  | 'cta_url'
  | 'request_contact_info'
  | 'location_request'
  | 'reaction'
  | 'template';

export interface MessageListAttachmentsResponse {
  items: Array<MessageListAttachmentsResponse.Item>;
}

export namespace MessageListAttachmentsResponse {
  /**
   * A stored file attachment for an email message (inbound or outbound).
   */
  export interface Item {
    id: string;

    /**
     * Content-ID for inline attachments (referenced in the HTML body as
     * `cid:<contentId>`). Null for regular attachments.
     */
    contentId: string | null;

    createdAt: string;

    /**
     * Short-lived signed URL to download the attachment bytes. Freshly generated on
     * each request and expires; do not cache it. Null if the stored file is no longer
     * available.
     */
    downloadUrl: string | null;

    filename: string;

    /**
     * Whether the attachment is inline (embedded in the HTML body) rather than a
     * regular attachment.
     */
    isInline: boolean;

    /**
     * MIME type of the attachment.
     */
    mimeType: string;

    /**
     * Size of the attachment in bytes.
     */
    size: number;
  }
}

export interface MessageShowTypingResponse {
  success: boolean;
}

export interface MessageListParams extends CursorParams {
  /**
   * Filter by delivery channel.
   */
  channel?: 'sms' | 'sms_oneway' | 'whatsapp' | 'email' | 'telegram' | 'instagram' | 'messenger' | 'voice';

  /**
   * Filter by status. Not all stored statuses are filterable.
   */
  status?: 'queued' | 'sending' | 'sent' | 'delivered' | 'failed' | 'received';

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
   * Body param: Recipient phone number in E.164 format, email address, WhatsApp
   * business-scoped user ID (BSUID, e.g. `US.13491208655302741918`), or numeric chat
   * ID (for Telegram/Instagram/Messenger). A BSUID is routed to WhatsApp and sent
   * via the `recipient` field; use it to message a contact who adopted a username
   * and whose phone number is hidden.
   */
  to: string;

  /**
   * Body param: Email attachments. Only supported when channel is 'email'. Maximum
   * 40MB total size.
   */
  attachments?: Array<MessageSendParams.Attachment>;

  /**
   * Body param: Delivery channel. Use 'auto' for intelligent routing. If omitted,
   * channel is auto-selected based on sender capabilities and recipient type. For
   * email recipients, defaults to 'email'.
   */
  channel?: Channel;

  /**
   * Body param: Additional content for non-text message types.
   */
  content?: MessageContent;

  /**
   * Body param: Whether to enable automatic fallback to SMS if WhatsApp fails.
   * Defaults to true.
   */
  fallbackEnabled?: boolean;

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
   * Body param: Language code for voice text-to-speech (e.g., 'en-US', 'es-ES',
   * 'pt-BR'). If omitted, language is auto-detected from recipient's country code.
   */
  voiceLanguage?: string;

  /**
   * Header param: Optional sender profile ID. If omitted, the project's default
   * sender will be used.
   */
  'Zavu-Sender'?: string;
}

export namespace MessageSendParams {
  /**
   * Email attachment. Provide either `content` (base64) or `path` (URL), not both.
   */
  export interface Attachment {
    /**
     * Name of the attached file.
     */
    filename: string;

    /**
     * Content of the attached file as a Base64-encoded string.
     */
    content?: string;

    /**
     * Content ID for inline images. Reference in HTML as
     * `<img src="cid:your_content_id">`.
     */
    content_id?: string;

    /**
     * MIME type of the attachment. If not set, will be derived from the filename.
     */
    content_type?: string;

    /**
     * URL where the attachment file is hosted. The server will fetch the file.
     */
    path?: string;
  }
}

export interface MessageShowTypingParams {
  /**
   * Optional sender profile ID. If omitted, the project's default sender will be
   * used.
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
    type MessageListAttachmentsResponse as MessageListAttachmentsResponse,
    type MessageShowTypingResponse as MessageShowTypingResponse,
    type MessagesCursor as MessagesCursor,
    type MessageListParams as MessageListParams,
    type MessageReactParams as MessageReactParams,
    type MessageSendParams as MessageSendParams,
    type MessageShowTypingParams as MessageShowTypingParams,
  };
}
