// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class PhoneNumbers extends APIResource {
  /**
   * List phone numbers assigned to a 10DLC campaign.
   *
   * @example
   * ```ts
   * const phoneNumbers =
   *   await client.number10dlc.campaigns.phoneNumbers.list(
   *     'campaignId',
   *   );
   * ```
   */
  list(campaignID: string, options?: RequestOptions): APIPromise<PhoneNumberListResponse> {
    return this._client.get(path`/v1/10dlc/campaigns/${campaignID}/phone-numbers`, options);
  }

  /**
   * Assign a US phone number to an approved 10DLC campaign. The campaign must be in
   * approved status.
   *
   * @example
   * ```ts
   * const response =
   *   await client.number10dlc.campaigns.phoneNumbers.assign(
   *     'campaignId',
   *     { phoneNumberId: 'pn_abc123' },
   *   );
   * ```
   */
  assign(
    campaignID: string,
    body: PhoneNumberAssignParams,
    options?: RequestOptions,
  ): APIPromise<PhoneNumberAssignResponse> {
    return this._client.post(path`/v1/10dlc/campaigns/${campaignID}/phone-numbers`, { body, ...options });
  }

  /**
   * Remove a phone number assignment from a 10DLC campaign.
   *
   * @example
   * ```ts
   * await client.number10dlc.campaigns.phoneNumbers.unassign(
   *   'assignmentId',
   *   { campaignId: 'campaignId' },
   * );
   * ```
   */
  unassign(
    assignmentID: string,
    params: PhoneNumberUnassignParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    const { campaignId } = params;
    return this._client.delete(path`/v1/10dlc/campaigns/${campaignId}/phone-numbers/${assignmentID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface TenDlcPhoneNumberAssignment {
  id: string;

  campaignId: string;

  createdAt: string;

  phoneNumberId: string;

  /**
   * Assignment status.
   */
  status: 'pending' | 'active' | 'failed';

  updatedAt: string;

  assignedAt?: string | null;

  failureReason?: string | null;
}

export interface PhoneNumberListResponse {
  items: Array<TenDlcPhoneNumberAssignment>;

  nextCursor?: string | null;
}

export interface PhoneNumberAssignResponse {
  assignment: TenDlcPhoneNumberAssignment;
}

export interface PhoneNumberAssignParams {
  /**
   * ID of the phone number to assign.
   */
  phoneNumberId: string;
}

export interface PhoneNumberUnassignParams {
  /**
   * 10DLC campaign ID.
   */
  campaignId: string;
}

export declare namespace PhoneNumbers {
  export {
    type TenDlcPhoneNumberAssignment as TenDlcPhoneNumberAssignment,
    type PhoneNumberListResponse as PhoneNumberListResponse,
    type PhoneNumberAssignResponse as PhoneNumberAssignResponse,
    type PhoneNumberAssignParams as PhoneNumberAssignParams,
    type PhoneNumberUnassignParams as PhoneNumberUnassignParams,
  };
}
