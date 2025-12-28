// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
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

  /**
   * Create sender
   *
   * @example
   * ```ts
   * const sender = await client.senders.create({
   *   name: 'name',
   *   phoneNumber: 'phoneNumber',
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
 * Type of event that triggers the webhook. Note: Reactions are delivered as
 * message.inbound with messageType='reaction'.
 */
export type WebhookEvent =
  | 'message.queued'
  | 'message.sent'
  | 'message.delivered'
  | 'message.failed'
  | 'message.inbound'
  | 'message.unsupported'
  | 'conversation.new'
  | 'template.status_changed';

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

  phoneNumber: string;

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
}
