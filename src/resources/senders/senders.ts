// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WhatsappSyncAPI from './whatsapp-sync';
import {
  WhatsAppSyncContacts,
  WhatsAppSyncHistory,
  WhatsAppSyncStatus,
  WhatsappSync,
  WhatsappSyncRetrieveResponse,
  WhatsappSyncStartContactsSyncResponse,
  WhatsappSyncStartHistorySyncResponse,
} from './whatsapp-sync';
import * as AgentAPI from './agent/agent';
import {
  Agent,
  AgentCreateParams,
  AgentExecution,
  AgentExecutionStatus,
  AgentProvider,
  AgentResource,
  AgentResponse,
  AgentStats,
  AgentUpdateParams,
} from './agent/agent';
import { APIPromise } from '../../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Senders extends APIResource {
  agent: AgentAPI.AgentResource = new AgentAPI.AgentResource(this._client);
  whatsappSync: WhatsappSyncAPI.WhatsappSync = new WhatsappSyncAPI.WhatsappSync(this._client);

  /**
   * Create sender
   *
   * @example
   * ```ts
   * const sender = await client.senders.create({
   *   name: 'name',
   * });
   * ```
   */
  create(body: SenderCreateParams, options?: RequestOptions): APIPromise<Sender> {
    return this._client.post('/v1/senders', { body, ...options });
  }

  /**
   * Get sender
   *
   * @example
   * ```ts
   * const sender = await client.senders.retrieve('senderId');
   * ```
   */
  retrieve(senderID: string, options?: RequestOptions): APIPromise<Sender> {
    return this._client.get(path`/v1/senders/${senderID}`, options);
  }

  /**
   * Update sender
   *
   * @example
   * ```ts
   * const sender = await client.senders.update('senderId');
   * ```
   */
  update(senderID: string, body: SenderUpdateParams, options?: RequestOptions): APIPromise<Sender> {
    return this._client.patch(path`/v1/senders/${senderID}`, { body, ...options });
  }

  /**
   * List senders
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const sender of client.senders.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: SenderListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<SendersCursor, Sender> {
    return this._client.getAPIList('/v1/senders', Cursor<Sender>, { query, ...options });
  }

  /**
   * Delete sender
   *
   * @example
   * ```ts
   * await client.senders.delete('senderId');
   * ```
   */
  delete(senderID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/senders/${senderID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Get the WhatsApp Business profile for a sender. The sender must have a WhatsApp
   * Business Account connected.
   *
   * @example
   * ```ts
   * const whatsappBusinessProfileResponse =
   *   await client.senders.getProfile('senderId');
   * ```
   */
  getProfile(senderID: string, options?: RequestOptions): APIPromise<WhatsappBusinessProfileResponse> {
    return this._client.get(path`/v1/senders/${senderID}/profile`, options);
  }

  /**
   * Regenerate the webhook secret for a sender. The old secret will be invalidated
   * immediately.
   *
   * @example
   * ```ts
   * const webhookSecretResponse =
   *   await client.senders.regenerateWebhookSecret('senderId');
   * ```
   */
  regenerateWebhookSecret(senderID: string, options?: RequestOptions): APIPromise<WebhookSecretResponse> {
    return this._client.post(path`/v1/senders/${senderID}/webhook/secret`, options);
  }

  /**
   * Update the WhatsApp Business profile for a sender. The sender must have a
   * WhatsApp Business Account connected.
   *
   * @example
   * ```ts
   * const response = await client.senders.updateProfile(
   *   'senderId',
   *   {
   *     about: 'Succulent specialists!',
   *     description:
   *       'We specialize in providing high-quality succulents.',
   *     email: 'contact@example.com',
   *     vertical: 'RETAIL',
   *     websites: ['https://www.example.com'],
   *   },
   * );
   * ```
   */
  updateProfile(
    senderID: string,
    body: SenderUpdateProfileParams,
    options?: RequestOptions,
  ): APIPromise<SenderUpdateProfileResponse> {
    return this._client.patch(path`/v1/senders/${senderID}/profile`, { body, ...options });
  }

  /**
   * Upload a new profile picture for the WhatsApp Business profile. The image will
   * be uploaded to Meta and set as the profile picture.
   *
   * @example
   * ```ts
   * const response = await client.senders.uploadProfilePicture(
   *   'senderId',
   *   {
   *     imageUrl: 'https://example.com/profile.jpg',
   *     mimeType: 'image/jpeg',
   *   },
   * );
   * ```
   */
  uploadProfilePicture(
    senderID: string,
    body: SenderUploadProfilePictureParams,
    options?: RequestOptions,
  ): APIPromise<SenderUploadProfilePictureResponse> {
    return this._client.post(path`/v1/senders/${senderID}/profile/picture`, { body, ...options });
  }
}

export type SendersCursor = Cursor<Sender>;

export interface Sender {
  id: string;

  name: string;

  /**
   * Phone number in E.164 format.
   */
  phoneNumber: string;

  createdAt?: string;

  /**
   * From-address for the email channel, if configured.
   */
  emailAddress?: string;

  /**
   * Whether catch-all receiving is enabled. When true (and emailReceivingEnabled is
   * true), this sender receives email addressed to any local part at its domain, not
   * just its own address. The original recipient is delivered in the message.inbound
   * webhook's data.to.
   */
  emailCatchAllEnabled?: boolean;

  /**
   * Whether inbound email receiving is enabled for this sender.
   */
  emailReceivingEnabled?: boolean;

  /**
   * Whether this sender is the project's default.
   */
  isDefault?: boolean;

  updatedAt?: string;

  /**
   * Webhook configuration for the sender.
   */
  webhook?: SenderWebhook;

  /**
   * WhatsApp Business Account information. Only present if a WABA is connected.
   */
  whatsapp?: Sender.Whatsapp;
}

export namespace Sender {
  /**
   * WhatsApp Business Account information. Only present if a WABA is connected.
   */
  export interface Whatsapp {
    /**
     * Display phone number.
     */
    displayPhoneNumber?: string;

    /**
     * Payment configuration status from Meta.
     */
    paymentStatus?: Whatsapp.PaymentStatus;

    /**
     * WhatsApp phone number ID from Meta.
     */
    phoneNumberId?: string;
  }

  export namespace Whatsapp {
    /**
     * Payment configuration status from Meta.
     */
    export interface PaymentStatus {
      /**
       * Whether template messages can be sent. Requires setupStatus=COMPLETE and
       * methodStatus=VALID.
       */
      canSendTemplates?: boolean;

      /**
       * Payment method status (VALID, NONE, etc.).
       */
      methodStatus?: string;

      /**
       * Payment setup status (COMPLETE, NOT_STARTED, etc.).
       */
      setupStatus?: string;
    }
  }
}

/**
 * Webhook configuration for the sender.
 */
export interface SenderWebhook {
  /**
   * Whether the webhook is active.
   */
  active: boolean;

  /**
   * List of events the webhook is subscribed to.
   */
  events: Array<WebhookEvent>;

  /**
   * HTTPS URL that will receive webhook events.
   */
  url: string;

  /**
   * Webhook secret for signature verification. Only returned on create or
   * regenerate.
   */
  secret?: string;
}

/**
 * Type of event that triggers the webhook.
 *
 * **Message lifecycle events:**
 *
 * - `message.queued`: Message created and queued for sending. `data.status` =
 *   `queued`
 * - `message.sent`: Message accepted by the provider. `data.status` = `sent`
 * - `message.delivered`: Message delivered to recipient. `data.status` =
 *   `delivered`
 * - `message.read`: Message was read by the recipient (WhatsApp only).
 *   `data.status` = `read`
 * - `message.failed`: Message failed to send. `data.status` = `failed`
 *
 * **Inbound events:**
 *
 * - `message.inbound`: New message received from a contact. Reactions are
 *   delivered as `message.inbound` with `messageType='reaction'`. When the contact
 *   replied to (quoted) an earlier message, `data.content` carries the reply
 *   context: `replyToMessageId`, `replyToProviderMessageId`, `replyToFrom`,
 *   `replyToText`, and `replyToMessageType`. `data.providerTimestamp` is the
 *   provider's original receive time in Unix milliseconds (the moment the channel
 *   received the message from the contact — WhatsApp, Telegram, Instagram,
 *   Messenger; `null` for SMS and email). Compare it against the top-level
 *   `timestamp` (when Zavu dispatched the webhook) to detect and ignore delayed
 *   deliveries.
 * - `message.status`: A contact posted a WhatsApp status/story (currently WhatsApp
 *   Alternative only). It is NOT a conversation message and never enters the inbox
 *   — it is delivered only if you subscribe to `message.status`. `data` carries
 *   `from` (the author in E.164), `messageType` (`text`, `image`, `video`,
 *   `audio`), `text` (caption/text when present), `mimetype` (for media stories),
 *   and `providerTimestamp`. Media bytes are not included.
 * - `message.unsupported`: Received a message type that is not supported
 *
 * **Broadcast events:**
 *
 * - `broadcast.status_changed`: Broadcast status changed (pending_review,
 *   approved, rejected, sending, completed, cancelled)
 *
 * **Other events:**
 *
 * - `conversation.new`: New conversation started with a contact
 * - `template.status_changed`: WhatsApp template approval status changed
 *
 * **Partner events:**
 *
 * - `invitation.status_changed`: A partner invitation status changed (pending,
 *   in_progress, completed, cancelled)
 *
 * **Custom domain events:**
 *
 * - `domain.verified`: A custom email domain passed verification (DKIM, and
 *   SPF/DMARC/MAIL FROM if enhanced records are enabled)
 * - `domain.failed`: A custom email domain failed verification or is partially
 *   verified
 */
export type WebhookEvent =
  | 'message.queued'
  | 'message.sent'
  | 'message.delivered'
  | 'message.read'
  | 'message.failed'
  | 'message.inbound'
  | 'message.status'
  | 'message.unsupported'
  | 'broadcast.status_changed'
  | 'conversation.new'
  | 'template.status_changed'
  | 'invitation.status_changed'
  | 'domain.verified'
  | 'domain.failed';

export interface WebhookSecretResponse {
  /**
   * The new webhook secret.
   */
  secret: string;
}

/**
 * WhatsApp Business profile information.
 */
export interface WhatsappBusinessProfile {
  /**
   * Short description of the business (max 139 characters).
   */
  about?: string;

  /**
   * Physical address of the business (max 256 characters).
   */
  address?: string;

  /**
   * Extended description of the business (max 512 characters).
   */
  description?: string;

  /**
   * Business email address.
   */
  email?: string;

  /**
   * URL of the business profile picture.
   */
  profilePictureUrl?: string;

  /**
   * Business category for WhatsApp Business profile.
   */
  vertical?: WhatsappBusinessProfileVertical;

  /**
   * Business website URLs (maximum 2).
   */
  websites?: Array<string>;
}

export interface WhatsappBusinessProfileResponse {
  /**
   * WhatsApp Business profile information.
   */
  profile: WhatsappBusinessProfile;
}

/**
 * Business category for WhatsApp Business profile.
 */
export type WhatsappBusinessProfileVertical =
  | 'UNDEFINED'
  | 'OTHER'
  | 'AUTO'
  | 'BEAUTY'
  | 'APPAREL'
  | 'EDU'
  | 'ENTERTAIN'
  | 'EVENT_PLAN'
  | 'FINANCE'
  | 'GROCERY'
  | 'GOVT'
  | 'HOTEL'
  | 'HEALTH'
  | 'NONPROFIT'
  | 'PROF_SERVICES'
  | 'RETAIL'
  | 'TRAVEL'
  | 'RESTAURANT'
  | 'NOT_A_BIZ';

export interface SenderUpdateProfileResponse {
  /**
   * WhatsApp Business profile information.
   */
  profile: WhatsappBusinessProfile;

  success: boolean;
}

export interface SenderUploadProfilePictureResponse {
  /**
   * WhatsApp Business profile information.
   */
  profile: WhatsappBusinessProfile;

  success: boolean;
}

export interface SenderCreateParams {
  name: string;

  /**
   * From-address for the email channel (e.g. noreply@yourdomain.com). The address's
   * domain must be a verified email domain in your project. Setting this attaches
   * the email channel to the sender.
   */
  emailAddress?: string;

  /**
   * ID of the verified email domain to attach. Optional — resolved from
   * `emailAddress`'s domain when omitted.
   */
  emailDomainId?: string;

  /**
   * Display name shown in the recipient's inbox for the email channel.
   */
  emailFromName?: string;

  /**
   * Enable inbound email receiving on this sender. Requires a verified MX record on
   * the domain; ignored otherwise.
   */
  emailReceivingEnabled?: boolean;

  /**
   * Phone number in E.164 format. Required for phone-based channels (SMS, WhatsApp).
   * Omit for an email-only sender.
   */
  phoneNumber?: string;

  setAsDefault?: boolean;

  /**
   * Events to subscribe to.
   */
  webhookEvents?: Array<WebhookEvent>;

  /**
   * HTTPS URL for webhook events.
   */
  webhookUrl?: string;
}

export interface SenderUpdateParams {
  /**
   * Attach or change the sender's email from-address (e.g. noreply@yourdomain.com).
   * The domain must be a verified email domain in your project.
   */
  emailAddress?: string;

  /**
   * Enable or disable domain catch-all. When enabled (with emailReceivingEnabled
   * true), this sender receives email for any address at its domain. Ignored
   * (treated as false) if receiving is not enabled.
   */
  emailCatchAllEnabled?: boolean;

  /**
   * ID of the verified email domain to attach. Optional — resolved from
   * `emailAddress`'s domain when omitted.
   */
  emailDomainId?: string;

  /**
   * Display name shown in the recipient's inbox for the email channel.
   */
  emailFromName?: string;

  /**
   * Enable or disable inbound email receiving for this sender.
   */
  emailReceivingEnabled?: boolean;

  name?: string;

  setAsDefault?: boolean;

  /**
   * Whether the webhook is active.
   */
  webhookActive?: boolean;

  /**
   * Events to subscribe to.
   */
  webhookEvents?: Array<WebhookEvent>;

  /**
   * HTTPS URL for webhook events. Set to null to remove webhook.
   */
  webhookUrl?: string | null;
}

export interface SenderListParams extends CursorParams {}

export interface SenderUpdateProfileParams {
  /**
   * Short description of the business (max 139 characters).
   */
  about?: string;

  /**
   * Physical address of the business (max 256 characters).
   */
  address?: string;

  /**
   * Extended description of the business (max 512 characters).
   */
  description?: string;

  /**
   * Business email address.
   */
  email?: string;

  /**
   * Business category for WhatsApp Business profile.
   */
  vertical?: WhatsappBusinessProfileVertical;

  /**
   * Business website URLs (maximum 2).
   */
  websites?: Array<string>;
}

export interface SenderUploadProfilePictureParams {
  /**
   * URL of the image to upload.
   */
  imageUrl: string;

  /**
   * MIME type of the image.
   */
  mimeType: 'image/jpeg' | 'image/png';
}

Senders.AgentResource = AgentResource;
Senders.WhatsappSync = WhatsappSync;

export declare namespace Senders {
  export {
    type Sender as Sender,
    type SenderWebhook as SenderWebhook,
    type WebhookEvent as WebhookEvent,
    type WebhookSecretResponse as WebhookSecretResponse,
    type WhatsappBusinessProfile as WhatsappBusinessProfile,
    type WhatsappBusinessProfileResponse as WhatsappBusinessProfileResponse,
    type WhatsappBusinessProfileVertical as WhatsappBusinessProfileVertical,
    type SenderUpdateProfileResponse as SenderUpdateProfileResponse,
    type SenderUploadProfilePictureResponse as SenderUploadProfilePictureResponse,
    type SendersCursor as SendersCursor,
    type SenderCreateParams as SenderCreateParams,
    type SenderUpdateParams as SenderUpdateParams,
    type SenderListParams as SenderListParams,
    type SenderUpdateProfileParams as SenderUpdateProfileParams,
    type SenderUploadProfilePictureParams as SenderUploadProfilePictureParams,
  };

  export {
    AgentResource as AgentResource,
    type Agent as Agent,
    type AgentExecution as AgentExecution,
    type AgentExecutionStatus as AgentExecutionStatus,
    type AgentProvider as AgentProvider,
    type AgentResponse as AgentResponse,
    type AgentStats as AgentStats,
    type AgentCreateParams as AgentCreateParams,
    type AgentUpdateParams as AgentUpdateParams,
  };

  export {
    WhatsappSync as WhatsappSync,
    type WhatsAppSyncContacts as WhatsAppSyncContacts,
    type WhatsAppSyncHistory as WhatsAppSyncHistory,
    type WhatsAppSyncStatus as WhatsAppSyncStatus,
    type WhatsappSyncRetrieveResponse as WhatsappSyncRetrieveResponse,
    type WhatsappSyncStartContactsSyncResponse as WhatsappSyncStartContactsSyncResponse,
    type WhatsappSyncStartHistorySyncResponse as WhatsappSyncStartHistorySyncResponse,
  };
}
