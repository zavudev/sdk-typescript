// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Invitations extends APIResource {
  /**
   * Create a partner invitation link for a client to connect a Meta channel. The
   * client opens the returned `url` and authorizes with Meta; the resulting sender
   * is created in your project when they finish, and the invitation transitions to
   * `completed`.
   *
   * `connectionType` picks the channel:
   *
   * - `whatsapp_waba` (default): Meta's embedded signup links an official WhatsApp
   *   Business Account.
   * - `messenger`: the client picks a Facebook Page they administer; its Messenger
   *   inbox (including Marketplace chats) is routed to Zavu.
   *
   * One invitation connects one channel — create one per channel to onboard a client
   * on several. `phoneNumberId` and `allowedPhoneCountries` apply to `whatsapp_waba`
   * only.
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
   *
   * `failed` means the client started the connection and it did not finish (they
   * cancelled Meta's dialog, denied a permission, or abandoned the tab). A failed
   * invitation is still usable: the same link can be retried, and it moves back to
   * `in_progress` when the client tries again.
   */
  status: 'pending' | 'in_progress' | 'completed' | 'expired' | 'cancelled' | 'failed';

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
   * The account the client linked, populated once the invitation is `completed`.
   * Null before that. Use it to show the partner what was connected without fetching
   * the sender.
   */
  connectedAccount?: Invitation.ConnectedAccount | null;

  /**
   * Which Meta channel the client connects: `whatsapp_waba` (official WhatsApp Cloud
   * API via embedded signup) or `messenger` (a Facebook Page's Messenger inbox,
   * including Marketplace chats).
   */
  connectionType?: 'whatsapp_waba' | 'messenger';

  failedAt?: string | null;

  /**
   * Stable code for why the last attempt failed, present when `status` is `failed`.
   * Values include `fb_cancelled` (client closed Meta's dialog), `fb_not_authorized`
   * (permission denied), `signup_abandoned` (started but never finished),
   * `meta_no_pages` (the client administers no Facebook Page), and `internal_error`.
   * Treat unknown codes as a generic failure.
   */
  failureReason?: string | null;

  /**
   * ID of a pre-assigned Zavu phone number for WhatsApp registration. Always null
   * for `messenger` invitations.
   */
  phoneNumberId?: string | null;

  /**
   * ID of the sender created when invitation is completed.
   */
  senderId?: string | null;

  startedAt?: string | null;

  viewedAt?: string | null;
}

export namespace Invitation {
  /**
   * The account the client linked, populated once the invitation is `completed`.
   * Null before that. Use it to show the partner what was connected without fetching
   * the sender.
   */
  export interface ConnectedAccount {
    /**
     * Provider-side identifier: the WhatsApp phone number ID, or the Facebook Page ID.
     */
    id: string;

    channel: 'whatsapp' | 'messenger';

    /**
     * Display name of the connected account: the WhatsApp verified name, or the
     * Facebook Page name.
     */
    name?: string | null;
  }
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
   * ISO country codes for allowed phone numbers. Only valid when `connectionType` is
   * `whatsapp_waba` — sending it with `messenger` returns 400.
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
   * Which Meta channel the client connects, and how.
   *
   * - `whatsapp_waba` (default): Meta's embedded signup links an official WhatsApp
   *   Business Account. Accepts `phoneNumberId` and `allowedPhoneCountries`.
   * - `messenger`: the client authorizes with Facebook and picks a Facebook Page
   *   they administer. The Page's Messenger inbox — including Marketplace chats — is
   *   routed to Zavu. They must be an admin of at least one Page. A Page can only be
   *   connected to one Zavu project at a time: if the client picks a Page that
   *   another project already connected, the newer connection wins and the older one
   *   is disconnected.
   *
   * One invitation connects one channel. To onboard a client on several channels,
   * create one invitation per channel; each completes into its own sender.
   */
  connectionType?: 'whatsapp_waba' | 'messenger';

  /**
   * Number of days until the invitation expires.
   */
  expiresInDays?: number;

  /**
   * ID of a Zavu phone number to pre-assign for WhatsApp registration. If provided,
   * the client will use this number instead of their own. Only valid when
   * `connectionType` is `whatsapp_waba` — sending it with `messenger` returns 400,
   * since a Facebook Page has no phone number.
   */
  phoneNumberId?: string;
}

export interface InvitationListParams extends CursorParams {
  /**
   * Current status of the partner invitation.
   *
   * `failed` means the client started the connection and it did not finish (they
   * cancelled Meta's dialog, denied a permission, or abandoned the tab). A failed
   * invitation is still usable: the same link can be retried, and it moves back to
   * `in_progress` when the client tries again.
   */
  status?: 'pending' | 'in_progress' | 'completed' | 'expired' | 'cancelled' | 'failed';
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
