// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Senders extends APIResource {
  /**
   * Create sender
   */
  create(body: SenderCreateParams, options?: RequestOptions): APIPromise<Sender> {
    return this._client.post('/v1/senders', { body, ...options });
  }

  /**
   * Get sender
   */
  retrieve(senderID: string, options?: RequestOptions): APIPromise<Sender> {
    return this._client.get(path`/v1/senders/${senderID}`, options);
  }

  /**
   * Update sender
   */
  update(senderID: string, body: SenderUpdateParams, options?: RequestOptions): APIPromise<Sender> {
    return this._client.patch(path`/v1/senders/${senderID}`, { body, ...options });
  }

  /**
   * List senders
   */
  list(
    query: SenderListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<SendersCursor, Sender> {
    return this._client.getAPIList('/v1/senders', Cursor<Sender>, { query, ...options });
  }

  /**
   * Delete sender
   */
  delete(senderID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/senders/${senderID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Regenerate the webhook secret for a sender. The old secret will be invalidated
   * immediately.
   */
  regenerateWebhookSecret(senderID: string, options?: RequestOptions): APIPromise<WebhookSecretResponse> {
    return this._client.post(path`/v1/senders/${senderID}/webhook/secret`, options);
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

export declare namespace Senders {
  export {
    type Sender as Sender,
    type SenderWebhook as SenderWebhook,
    type WebhookEvent as WebhookEvent,
    type WebhookSecretResponse as WebhookSecretResponse,
    type SendersCursor as SendersCursor,
    type SenderCreateParams as SenderCreateParams,
    type SenderUpdateParams as SenderUpdateParams,
    type SenderListParams as SenderListParams,
  };
}
