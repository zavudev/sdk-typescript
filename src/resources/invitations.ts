// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Invitations extends APIResource {
  /**
   * Create a partner invitation link for a client to connect their WhatsApp Business
   * account. The client will complete Meta's embedded signup flow and the resulting
   * sender will be created in your project.
   *
   * @example
   * ```ts
   * const invitation = await client.invitations.create({
   *   clientName: 'Acme Corp',
   * });
   * ```
   */
  create(
    body: InvitationCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<InvitationCreateResponse> {
    return this._client.post('/v1/invitations', { body, ...options });
  }

  /**
   * Get invitation
   *
   * @example
   * ```ts
   * const invitation = await client.invitations.retrieve(
   *   'invitationId',
   * );
   * ```
   */
  retrieve(invitationID: string, options?: RequestOptions): APIPromise<InvitationRetrieveResponse> {
    return this._client.get(path`/v1/invitations/${invitationID}`, options);
  }

  /**
   * List partner invitations for this project.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const invitation of client.invitations.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: InvitationListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<InvitationsCursor, Invitation> {
    return this._client.getAPIList('/v1/invitations', Cursor<Invitation>, { query, ...options });
  }

  /**
   * Cancel an active invitation. The client will no longer be able to use the
   * invitation link.
   *
   * @example
   * ```ts
   * const response = await client.invitations.cancel(
   *   'invitationId',
   * );
   * ```
   */
  cancel(invitationID: string, options?: RequestOptions): APIPromise<InvitationCancelResponse> {
    return this._client.post(path`/v1/invitations/${invitationID}/cancel`, options);
  }
}

export type InvitationsCursor = Cursor<Invitation>;

export interface Invitation {
  id: string;

  /**
   * Unique invitation token.
   */
  token: string;

  createdAt: string;

  expiresAt: string;

  /**
   * Current status of the partner invitation.
   */
  status: 'pending' | 'in_progress' | 'completed' | 'expired' | 'cancelled';

  updatedAt: string;

  /**
   * Full URL to share with the client.
   */
  url: string;

  clientEmail?: string | null;

  clientName?: string | null;

  clientPhone?: string | null;

  completedAt?: string | null;

  /**
   * ID of a pre-assigned Zavu phone number for WhatsApp registration.
   */
  phoneNumberId?: string | null;

  /**
   * ID of the sender created when invitation is completed.
   */
  senderId?: string | null;

  startedAt?: string | null;

  viewedAt?: string | null;
}

export interface InvitationCreateResponse {
  invitation: Invitation;
}

export interface InvitationRetrieveResponse {
  invitation: Invitation;
}

export interface InvitationCancelResponse {
  invitation: Invitation;
}

export interface InvitationCreateParams {
  /**
   * ISO country codes for allowed phone numbers.
   */
  allowedPhoneCountries?: Array<string>;

  /**
   * Email of the client being invited.
   */
  clientEmail?: string;

  /**
   * Name of the client being invited.
   */
  clientName?: string;

  /**
   * Phone number of the client in E.164 format.
   */
  clientPhone?: string;

  /**
   * Number of days until the invitation expires.
   */
  expiresInDays?: number;

  /**
   * ID of a Zavu phone number to pre-assign for WhatsApp registration. If provided,
   * the client will use this number instead of their own.
   */
  phoneNumberId?: string;
}

export interface InvitationListParams extends CursorParams {
  /**
   * Current status of the partner invitation.
   */
  status?: 'pending' | 'in_progress' | 'completed' | 'expired' | 'cancelled';
}

export declare namespace Invitations {
  export {
    type Invitation as Invitation,
    type InvitationCreateResponse as InvitationCreateResponse,
    type InvitationRetrieveResponse as InvitationRetrieveResponse,
    type InvitationCancelResponse as InvitationCancelResponse,
    type InvitationsCursor as InvitationsCursor,
    type InvitationCreateParams as InvitationCreateParams,
    type InvitationListParams as InvitationListParams,
  };
}
