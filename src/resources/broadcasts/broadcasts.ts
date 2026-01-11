// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ContactsAPI from './contacts';
import {
  ContactAddParams,
  ContactAddResponse,
  ContactListParams,
  ContactRemoveParams,
  Contacts,
} from './contacts';
import { APIPromise } from '../../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Broadcasts extends APIResource {
  contacts: ContactsAPI.Contacts = new ContactsAPI.Contacts(this._client);

  /**
   * Create a new broadcast campaign. Add contacts after creation, then send.
   *
   * @example
   * ```ts
   * const broadcast = await client.broadcasts.create({
   *   channel: 'sms',
   *   name: 'Black Friday Sale',
   *   text: 'Hi {{name}}, check out our Black Friday deals! Use code FRIDAY20 for 20% off.',
   * });
   * ```
   */
  create(body: BroadcastCreateParams, options?: RequestOptions): APIPromise<BroadcastCreateResponse> {
    return this._client.post('/v1/broadcasts', { body, ...options });
  }

  /**
   * Get broadcast
   *
   * @example
   * ```ts
   * const broadcast = await client.broadcasts.retrieve(
   *   'broadcastId',
   * );
   * ```
   */
  retrieve(broadcastID: string, options?: RequestOptions): APIPromise<BroadcastRetrieveResponse> {
    return this._client.get(path`/v1/broadcasts/${broadcastID}`, options);
  }

  /**
   * Update a broadcast in draft status.
   *
   * @example
   * ```ts
   * const broadcast = await client.broadcasts.update(
   *   'broadcastId',
   * );
   * ```
   */
  update(
    broadcastID: string,
    body: BroadcastUpdateParams,
    options?: RequestOptions,
  ): APIPromise<BroadcastUpdateResponse> {
    return this._client.patch(path`/v1/broadcasts/${broadcastID}`, { body, ...options });
  }

  /**
   * List broadcasts for this project.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const broadcast of client.broadcasts.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: BroadcastListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<BroadcastsCursor, Broadcast> {
    return this._client.getAPIList('/v1/broadcasts', Cursor<Broadcast>, { query, ...options });
  }

  /**
   * Delete a broadcast in draft status.
   *
   * @example
   * ```ts
   * await client.broadcasts.delete('broadcastId');
   * ```
   */
  delete(broadcastID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/broadcasts/${broadcastID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Cancel a broadcast. Pending contacts will be skipped, but already queued
   * messages may still be delivered.
   *
   * @example
   * ```ts
   * const response = await client.broadcasts.cancel(
   *   'broadcastId',
   * );
   * ```
   */
  cancel(broadcastID: string, options?: RequestOptions): APIPromise<BroadcastCancelResponse> {
    return this._client.post(path`/v1/broadcasts/${broadcastID}/cancel`, options);
  }

  /**
   * Get real-time progress of a broadcast including delivery counts and estimated
   * completion time.
   *
   * @example
   * ```ts
   * const broadcastProgress = await client.broadcasts.progress(
   *   'broadcastId',
   * );
   * ```
   */
  progress(broadcastID: string, options?: RequestOptions): APIPromise<BroadcastProgress> {
    return this._client.get(path`/v1/broadcasts/${broadcastID}/progress`, options);
  }

  /**
   * Update the scheduled time for a broadcast. The broadcast must be in scheduled
   * status.
   *
   * @example
   * ```ts
   * const response = await client.broadcasts.reschedule(
   *   'broadcastId',
   *   { scheduledAt: '2024-01-15T14:00:00Z' },
   * );
   * ```
   */
  reschedule(
    broadcastID: string,
    body: BroadcastRescheduleParams,
    options?: RequestOptions,
  ): APIPromise<BroadcastRescheduleResponse> {
    return this._client.patch(path`/v1/broadcasts/${broadcastID}/schedule`, { body, ...options });
  }

  /**
   * Start sending the broadcast immediately or schedule for later. Broadcasts go
   * through automated AI content review before sending. If the review passes, the
   * broadcast proceeds. If rejected, use PATCH to edit content, then call POST
   * /retry-review. Reserves the estimated cost from your balance.
   *
   * @example
   * ```ts
   * const response = await client.broadcasts.send(
   *   'broadcastId',
   * );
   * ```
   */
  send(
    broadcastID: string,
    body: BroadcastSendParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BroadcastSendResponse> {
    return this._client.post(path`/v1/broadcasts/${broadcastID}/send`, { body, ...options });
  }
}

export type BroadcastsCursor = Cursor<Broadcast>;

export type BroadcastContactsCursor = Cursor<BroadcastContact>;

export interface Broadcast {
  id: string;

  /**
   * Broadcast delivery channel. Use 'smart' for per-contact intelligent routing.
   */
  channel: BroadcastChannel;

  createdAt: string;

  /**
   * Type of message for broadcast.
   */
  messageType: BroadcastMessageType;

  name: string;

  /**
   * Current status of the broadcast.
   */
  status: BroadcastStatus;

  /**
   * Total number of contacts in the broadcast.
   */
  totalContacts: number;

  /**
   * Actual cost so far in USD.
   */
  actualCost?: number | null;

  completedAt?: string;

  /**
   * Content for non-text broadcast message types.
   */
  content?: BroadcastContent;

  deliveredCount?: number;

  emailSubject?: string;

  /**
   * Estimated total cost in USD.
   */
  estimatedCost?: number | null;

  failedCount?: number;

  metadata?: { [key: string]: string };

  pendingCount?: number;

  /**
   * Amount reserved from balance in USD.
   */
  reservedAmount?: number | null;

  /**
   * Number of review attempts (max 3).
   */
  reviewAttempts?: number | null;

  /**
   * AI content review result.
   */
  reviewResult?: Broadcast.ReviewResult | null;

  scheduledAt?: string;

  senderId?: string;

  sendingCount?: number;

  startedAt?: string;

  text?: string;

  updatedAt?: string;
}

export namespace Broadcast {
  /**
   * AI content review result.
   */
  export interface ReviewResult {
    /**
     * Policy categories violated, if any.
     */
    categories?: Array<string>;

    /**
     * Problematic text fragments, if any.
     */
    flaggedContent?: Array<string> | null;

    /**
     * Explanation of the review decision.
     */
    reasoning?: string;

    reviewedAt?: string;

    /**
     * Content safety score from 0.0 to 1.0, where 1.0 is completely safe.
     */
    score?: number;
  }
}

/**
 * Broadcast delivery channel. Use 'smart' for per-contact intelligent routing.
 */
export type BroadcastChannel = 'smart' | 'sms' | 'whatsapp' | 'email';

export interface BroadcastContact {
  id: string;

  createdAt: string;

  recipient: string;

  recipientType: 'phone' | 'email';

  /**
   * Status of a contact within a broadcast.
   */
  status: BroadcastContactStatus;

  cost?: number | null;

  errorCode?: string;

  errorMessage?: string;

  /**
   * Associated message ID after processing.
   */
  messageId?: string;

  processedAt?: string;

  templateVariables?: { [key: string]: string };
}

/**
 * Status of a contact within a broadcast.
 */
export type BroadcastContactStatus = 'pending' | 'queued' | 'sending' | 'delivered' | 'failed' | 'skipped';

/**
 * Content for non-text broadcast message types.
 */
export interface BroadcastContent {
  /**
   * Filename for documents.
   */
  filename?: string;

  /**
   * Media ID if already uploaded.
   */
  mediaId?: string;

  /**
   * URL of the media file.
   */
  mediaUrl?: string;

  /**
   * MIME type of the media.
   */
  mimeType?: string;

  /**
   * Template ID for template messages.
   */
  templateId?: string;

  /**
   * Default template variables (can be overridden per contact).
   */
  templateVariables?: { [key: string]: string };
}

/**
 * Type of message for broadcast.
 */
export type BroadcastMessageType = 'text' | 'image' | 'video' | 'audio' | 'document' | 'template';

export interface BroadcastProgress {
  broadcastId: string;

  /**
   * Successfully delivered.
   */
  delivered: number;

  /**
   * Failed to deliver.
   */
  failed: number;

  /**
   * Not yet queued for sending.
   */
  pending: number;

  /**
   * Percentage complete (0-100).
   */
  percentComplete: number;

  /**
   * Currently being sent.
   */
  sending: number;

  /**
   * Skipped (broadcast cancelled).
   */
  skipped: number;

  /**
   * Current status of the broadcast.
   */
  status: BroadcastStatus;

  /**
   * Total contacts in broadcast.
   */
  total: number;

  /**
   * Actual cost so far in USD.
   */
  actualCost?: number | null;

  estimatedCompletionAt?: string;

  /**
   * Estimated total cost in USD.
   */
  estimatedCost?: number | null;

  /**
   * Amount reserved from balance in USD.
   */
  reservedAmount?: number | null;

  startedAt?: string;
}

/**
 * Current status of the broadcast.
 */
export type BroadcastStatus =
  | 'draft'
  | 'pending_review'
  | 'approved'
  | 'rejected'
  | 'escalated'
  | 'rejected_final'
  | 'scheduled'
  | 'sending'
  | 'paused'
  | 'completed'
  | 'cancelled'
  | 'failed';

export interface BroadcastCreateResponse {
  broadcast: Broadcast;
}

export interface BroadcastRetrieveResponse {
  broadcast: Broadcast;
}

export interface BroadcastUpdateResponse {
  broadcast: Broadcast;
}

export interface BroadcastCancelResponse {
  broadcast: Broadcast;
}

export interface BroadcastRescheduleResponse {
  broadcast: Broadcast;
}

export interface BroadcastSendResponse {
  broadcast: Broadcast;
}

export interface BroadcastCreateParams {
  /**
   * Broadcast delivery channel. Use 'smart' for per-contact intelligent routing.
   */
  channel: BroadcastChannel;

  /**
   * Name of the broadcast campaign.
   */
  name: string;

  /**
   * Content for non-text broadcast message types.
   */
  content?: BroadcastContent;

  /**
   * HTML body for email broadcasts.
   */
  emailHtmlBody?: string;

  /**
   * Email subject line. Required for email broadcasts.
   */
  emailSubject?: string;

  /**
   * Idempotency key to prevent duplicate broadcasts.
   */
  idempotencyKey?: string;

  /**
   * Type of message for broadcast.
   */
  messageType?: BroadcastMessageType;

  metadata?: { [key: string]: string };

  /**
   * Schedule the broadcast for future delivery.
   */
  scheduledAt?: string;

  /**
   * Sender profile ID. Uses default sender if omitted.
   */
  senderId?: string;

  /**
   * Text content or caption. Supports template variables: {{name}}, {{1}}, etc.
   */
  text?: string;
}

export interface BroadcastUpdateParams {
  /**
   * Content for non-text broadcast message types.
   */
  content?: BroadcastContent;

  emailHtmlBody?: string;

  emailSubject?: string;

  metadata?: { [key: string]: string };

  name?: string;

  text?: string;
}

export interface BroadcastListParams extends CursorParams {
  /**
   * Current status of the broadcast.
   */
  status?: BroadcastStatus;
}

export interface BroadcastRescheduleParams {
  /**
   * New scheduled time for the broadcast.
   */
  scheduledAt: string;
}

export interface BroadcastSendParams {
  /**
   * Schedule for future delivery. Omit to send immediately.
   */
  scheduledAt?: string;
}

Broadcasts.Contacts = Contacts;

export declare namespace Broadcasts {
  export {
    type Broadcast as Broadcast,
    type BroadcastChannel as BroadcastChannel,
    type BroadcastContact as BroadcastContact,
    type BroadcastContactStatus as BroadcastContactStatus,
    type BroadcastContent as BroadcastContent,
    type BroadcastMessageType as BroadcastMessageType,
    type BroadcastProgress as BroadcastProgress,
    type BroadcastStatus as BroadcastStatus,
    type BroadcastCreateResponse as BroadcastCreateResponse,
    type BroadcastRetrieveResponse as BroadcastRetrieveResponse,
    type BroadcastUpdateResponse as BroadcastUpdateResponse,
    type BroadcastCancelResponse as BroadcastCancelResponse,
    type BroadcastRescheduleResponse as BroadcastRescheduleResponse,
    type BroadcastSendResponse as BroadcastSendResponse,
    type BroadcastsCursor as BroadcastsCursor,
    type BroadcastCreateParams as BroadcastCreateParams,
    type BroadcastUpdateParams as BroadcastUpdateParams,
    type BroadcastListParams as BroadcastListParams,
    type BroadcastRescheduleParams as BroadcastRescheduleParams,
    type BroadcastSendParams as BroadcastSendParams,
  };

  export {
    Contacts as Contacts,
    type ContactAddResponse as ContactAddResponse,
    type ContactListParams as ContactListParams,
    type ContactAddParams as ContactAddParams,
    type ContactRemoveParams as ContactRemoveParams,
  };
}
