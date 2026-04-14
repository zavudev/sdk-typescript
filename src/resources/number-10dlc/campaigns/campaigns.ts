// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as PhoneNumbersAPI from './phone-numbers';
import {
  PhoneNumberAssignParams,
  PhoneNumberAssignResponse,
  PhoneNumberListResponse,
  PhoneNumberUnassignParams,
  PhoneNumbers,
  TenDlcPhoneNumberAssignment,
} from './phone-numbers';
import { APIPromise } from '../../../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../../../core/pagination';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Campaigns extends APIResource {
  phoneNumbers: PhoneNumbersAPI.PhoneNumbers = new PhoneNumbersAPI.PhoneNumbers(this._client);

  /**
   * Create a 10DLC campaign under an existing brand. The campaign starts in draft
   * status. Submit it for carrier review using the submit endpoint.
   *
   * @example
   * ```ts
   * const campaign = await client.number10dlc.campaigns.create({
   *   affiliateMarketing: false,
   *   ageGated: false,
   *   brandId: 'brand_abc123',
   *   description:
   *     'Send order status updates and shipping notifications to customers who opted in.',
   *   directLending: false,
   *   embeddedLink: true,
   *   embeddedPhone: false,
   *   name: 'Order Notifications',
   *   numberPooling: false,
   *   sampleMessages: [
   *     'Hi {{name}}, your order #{{order_id}} has shipped! Track it at {{url}}',
   *     'Your order #{{order_id}} has been delivered. Thank you for your purchase!',
   *   ],
   *   subscriberHelp: true,
   *   subscriberOptIn: true,
   *   subscriberOptOut: true,
   *   useCase: 'ACCOUNT_NOTIFICATION',
   * });
   * ```
   */
  create(body: CampaignCreateParams, options?: RequestOptions): APIPromise<CampaignCreateResponse> {
    return this._client.post('/v1/10dlc/campaigns', { body, ...options });
  }

  /**
   * Get 10DLC campaign
   *
   * @example
   * ```ts
   * const campaign =
   *   await client.number10dlc.campaigns.retrieve('campaignId');
   * ```
   */
  retrieve(campaignID: string, options?: RequestOptions): APIPromise<CampaignRetrieveResponse> {
    return this._client.get(path`/v1/10dlc/campaigns/${campaignID}`, options);
  }

  /**
   * Update a 10DLC campaign in draft status. Cannot update after submission.
   *
   * @example
   * ```ts
   * const campaign = await client.number10dlc.campaigns.update(
   *   'campaignId',
   * );
   * ```
   */
  update(
    campaignID: string,
    body: CampaignUpdateParams,
    options?: RequestOptions,
  ): APIPromise<CampaignUpdateResponse> {
    return this._client.patch(path`/v1/10dlc/campaigns/${campaignID}`, { body, ...options });
  }

  /**
   * List 10DLC campaign registrations for this project.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const tenDlcCampaign of client.number10dlc.campaigns.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: CampaignListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TenDlcCampaignsCursor, TenDlcCampaign> {
    return this._client.getAPIList('/v1/10dlc/campaigns', Cursor<TenDlcCampaign>, { query, ...options });
  }

  /**
   * Delete 10DLC campaign
   *
   * @example
   * ```ts
   * await client.number10dlc.campaigns.delete('campaignId');
   * ```
   */
  delete(campaignID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/10dlc/campaigns/${campaignID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Submit a draft campaign for carrier review. The campaign must be in draft status
   * and its brand must be verified.
   *
   * @example
   * ```ts
   * const response = await client.number10dlc.campaigns.submit(
   *   'campaignId',
   * );
   * ```
   */
  submit(campaignID: string, options?: RequestOptions): APIPromise<CampaignSubmitResponse> {
    return this._client.post(path`/v1/10dlc/campaigns/${campaignID}/submit`, options);
  }

  /**
   * Sync the campaign status with the registration provider. Use this to check for
   * approval updates after submission.
   *
   * @example
   * ```ts
   * const response =
   *   await client.number10dlc.campaigns.syncStatus(
   *     'campaignId',
   *   );
   * ```
   */
  syncStatus(campaignID: string, options?: RequestOptions): APIPromise<CampaignSyncStatusResponse> {
    return this._client.post(path`/v1/10dlc/campaigns/${campaignID}/sync`, options);
  }
}

export type TenDlcCampaignsCursor = Cursor<TenDlcCampaign>;

export interface TenDlcCampaign {
  id: string;

  affiliateMarketing: boolean;

  ageGated: boolean;

  /**
   * ID of the brand this campaign belongs to.
   */
  brandId: string;

  createdAt: string;

  /**
   * Description of the messaging campaign.
   */
  description: string;

  directLending: boolean;

  embeddedLink: boolean;

  embeddedPhone: boolean;

  name: string;

  numberPooling: boolean;

  /**
   * Sample messages representative of campaign content.
   */
  sampleMessages: Array<string>;

  /**
   * Status of a 10DLC campaign registration.
   */
  status: 'draft' | 'pending' | 'approved' | 'rejected';

  subscriberHelp: boolean;

  subscriberOptIn: boolean;

  subscriberOptOut: boolean;

  updatedAt: string;

  /**
   * Campaign use case type.
   */
  useCase: string;

  approvedAt?: string | null;

  /**
   * Daily message limit based on brand trust score.
   */
  dailyLimit?: number | null;

  failureReason?: string | null;

  helpMessage?: string | null;

  messageFlow?: string | null;

  /**
   * Recurring monthly fee in cents.
   */
  monthlyFeeCents?: number | null;

  optInKeywords?: Array<string> | null;

  optOutKeywords?: Array<string> | null;

  /**
   * One-time registration cost in cents.
   */
  registrationCostCents?: number | null;

  submittedAt?: string | null;

  subUseCases?: Array<string> | null;
}

export interface CampaignCreateResponse {
  campaign: TenDlcCampaign;
}

export interface CampaignRetrieveResponse {
  campaign: TenDlcCampaign;
}

export interface CampaignUpdateResponse {
  campaign: TenDlcCampaign;
}

export interface CampaignSubmitResponse {
  campaign: TenDlcCampaign;
}

export interface CampaignSyncStatusResponse {
  campaign: TenDlcCampaign;
}

export interface CampaignCreateParams {
  affiliateMarketing: boolean;

  ageGated: boolean;

  /**
   * ID of the brand to create this campaign under.
   */
  brandId: string;

  description: string;

  directLending: boolean;

  embeddedLink: boolean;

  embeddedPhone: boolean;

  name: string;

  numberPooling: boolean;

  sampleMessages: Array<string>;

  subscriberHelp: boolean;

  subscriberOptIn: boolean;

  subscriberOptOut: boolean;

  /**
   * Campaign use case (e.g., ACCOUNT_NOTIFICATION, MARKETING, 2FA).
   */
  useCase: string;

  helpMessage?: string;

  messageFlow?: string;

  optInKeywords?: Array<string>;

  optOutKeywords?: Array<string>;

  subUseCases?: Array<string>;
}

export interface CampaignUpdateParams {
  description?: string;

  helpMessage?: string;

  messageFlow?: string;

  name?: string;

  optInKeywords?: Array<string>;

  optOutKeywords?: Array<string>;

  sampleMessages?: Array<string>;
}

export interface CampaignListParams extends CursorParams {
  /**
   * Filter campaigns by brand ID.
   */
  brandId?: string;
}

Campaigns.PhoneNumbers = PhoneNumbers;

export declare namespace Campaigns {
  export {
    type TenDlcCampaign as TenDlcCampaign,
    type CampaignCreateResponse as CampaignCreateResponse,
    type CampaignRetrieveResponse as CampaignRetrieveResponse,
    type CampaignUpdateResponse as CampaignUpdateResponse,
    type CampaignSubmitResponse as CampaignSubmitResponse,
    type CampaignSyncStatusResponse as CampaignSyncStatusResponse,
    type TenDlcCampaignsCursor as TenDlcCampaignsCursor,
    type CampaignCreateParams as CampaignCreateParams,
    type CampaignUpdateParams as CampaignUpdateParams,
    type CampaignListParams as CampaignListParams,
  };

  export {
    PhoneNumbers as PhoneNumbers,
    type TenDlcPhoneNumberAssignment as TenDlcPhoneNumberAssignment,
    type PhoneNumberListResponse as PhoneNumberListResponse,
    type PhoneNumberAssignResponse as PhoneNumberAssignResponse,
    type PhoneNumberAssignParams as PhoneNumberAssignParams,
    type PhoneNumberUnassignParams as PhoneNumberUnassignParams,
  };
}
