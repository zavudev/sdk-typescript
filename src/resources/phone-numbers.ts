// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class PhoneNumbers extends APIResource {
  /**
   * Get details of a specific phone number.
   *
   * @example
   * ```ts
   * const phoneNumber = await client.phoneNumbers.retrieve(
   *   'phoneNumberId',
   * );
   * ```
   */
  retrieve(phoneNumberID: string, options?: RequestOptions): APIPromise<PhoneNumberRetrieveResponse> {
    return this._client.get(path`/v1/phone-numbers/${phoneNumberID}`, options);
  }

  /**
   * Update a phone number's name or sender assignment.
   *
   * @example
   * ```ts
   * const phoneNumber = await client.phoneNumbers.update(
   *   'phoneNumberId',
   *   { name: 'Support Line' },
   * );
   * ```
   */
  update(
    phoneNumberID: string,
    body: PhoneNumberUpdateParams,
    options?: RequestOptions,
  ): APIPromise<PhoneNumberUpdateResponse> {
    return this._client.patch(path`/v1/phone-numbers/${phoneNumberID}`, { body, ...options });
  }

  /**
   * List all phone numbers owned by this project.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const ownedPhoneNumber of client.phoneNumbers.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: PhoneNumberListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<OwnedPhoneNumbersCursor, OwnedPhoneNumber> {
    return this._client.getAPIList('/v1/phone-numbers', Cursor<OwnedPhoneNumber>, { query, ...options });
  }

  /**
   * Purchase an available phone number. Requires a paid plan: the Free plan cannot
   * purchase phone numbers and receives `402` with code `paid_plan_required`.
   *
   * **The included number.** A paid plan includes one number at no charge, once per
   * account: it must be a US or Canadian number (a +1 number) costing $20 a month or
   * less. `isFreeEligible` in `GET /v1/phone-numbers/available` marks the numbers
   * that qualify. Claiming it spends the benefit for good, across every team the
   * account owner owns, so releasing that number does not make another one free.
   *
   * **Numbers with regulatory requirements.** Which numbers need regulatory
   * information is decided per number, not by a fixed country list. The purchase
   * looks the requirements up for the exact number before charging anything:
   *
   * 1. `GET /v1/phone-numbers/requirements?phoneNumber=...`. If `items` is empty,
   *    buy normally.
   * 2. Create what it asks for: addresses with `POST /v1/addresses`, documents with
   *    `POST /v1/documents`.
   * 3. Purchase with `type` and `regulatoryRequirements`. The number is bought and
   *    billed at once with `regulatoryStatus: pending_review`.
   * 4. Poll `GET /v1/phone-numbers/{phoneNumberId}` until `regulatoryStatus` is
   *    `approved`. Assign it to a sender before or after approval; it starts
   *    carrying messages once approved.
   *
   * **Reuse.** Information you submitted is kept for your project, per country and
   * `type`, and a later purchase there may omit `regulatoryRequirements`. Reuse only
   * happens when what is kept still covers every requirement of the new number and
   * every address and document in it belongs to the project. Otherwise, or when
   * nothing is kept, the purchase returns `400 regulatory_compliance_required` with
   * the missing requirements in `details`.
   *
   * Invalid values (a missing, unknown or repeated requirement id, an address or
   * document from another project, or one rejected in review) return
   * `400 invalid_request`. If an address or document cannot be registered for
   * review, the purchase returns `400 invalid_request` naming the requirement. If
   * the requirements cannot be looked up, the purchase returns
   * `502 requirements_unavailable`, except for US and Canadian numbers, which are
   * sold as numbers without requirements. None of these errors charge anything.
   *
   * @example
   * ```ts
   * const response = await client.phoneNumbers.purchase({
   *   phoneNumber: '+15551234567',
   *   name: 'Primary Line',
   * });
   * ```
   */
  purchase(
    body: PhoneNumberPurchaseParams,
    options?: RequestOptions,
  ): APIPromise<PhoneNumberPurchaseResponse> {
    return this._client.post('/v1/phone-numbers', { body, ...options });
  }

  /**
   * Release a phone number. The phone number must not be assigned to a sender.
   *
   * @example
   * ```ts
   * await client.phoneNumbers.release('phoneNumberId');
   * ```
   */
  release(phoneNumberID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/phone-numbers/${phoneNumberID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Get the regulatory information needed to buy a phone number, for one specific
   * number or for a country and number type. Prefer `phoneNumber`: the response is
   * then exactly the list the purchase of that number validates against. Pass each
   * `requirementTypes[].id` back as `requirementType` in `regulatoryRequirements` on
   * `POST /v1/phone-numbers`.
   *
   * For `phoneNumber`, the requirements of that exact number are returned. When they
   * cannot be resolved for the number itself, the list for its country and `type` is
   * returned instead, and the purchase uses the same list. An empty `items` array
   * means the number needs no regulatory information. If the requirements cannot be
   * retrieved at all, the response is `502 requirements_unavailable`, never an empty
   * list.
   *
   * URL-encode the `+` of `phoneNumber` as `%2B`. An unencoded `+` is also accepted.
   *
   * @example
   * ```ts
   * const response = await client.phoneNumbers.requirements();
   * ```
   */
  requirements(
    query: PhoneNumberRequirementsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PhoneNumberRequirementsResponse> {
    return this._client.get('/v1/phone-numbers/requirements', { query, ...options });
  }

  /**
   * Search for available phone numbers to purchase by country and type.
   *
   * @example
   * ```ts
   * const response = await client.phoneNumbers.searchAvailable({
   *   countryCode: 'xx',
   * });
   * ```
   */
  searchAvailable(
    query: PhoneNumberSearchAvailableParams,
    options?: RequestOptions,
  ): APIPromise<PhoneNumberSearchAvailableResponse> {
    return this._client.get('/v1/phone-numbers/available', { query, ...options });
  }
}

export type OwnedPhoneNumbersCursor = Cursor<OwnedPhoneNumber>;

export interface AvailablePhoneNumber {
  capabilities: PhoneNumberCapabilities;

  phoneNumber: string;

  pricing: PhoneNumberPricing;

  friendlyName?: string;

  locality?: string;

  region?: string;
}

export interface OwnedPhoneNumber {
  id: string;

  capabilities: Array<string>;

  createdAt: string;

  phoneNumber: string;

  pricing: OwnedPhoneNumberPricing;

  /**
   * Regulatory review state. Numbers that need no review are `approved` immediately.
   * A number bought with regulatory information is owned and billed from purchase
   * and starts `pending_review`; it cannot send messages or place calls until this
   * is `approved`. The state is re-checked every 6 hours: poll
   * `GET /v1/phone-numbers/{phoneNumberId}` to follow it.
   *
   * Assign it to a sender with `PATCH /v1/phone-numbers/{phoneNumberId}`
   * (`senderId`) before or after approval. A number assigned while under review is
   * recorded and connected to that sender when it is approved; the connection is
   * retried until it succeeds. A sender created over the API is set up for SMS as
   * part of the assignment. `rejected` means review refused the information: the
   * number cannot be assigned to a sender. A number that stays `pending_review` may
   * be waiting on information the API cannot supply; contact support.
   */
  regulatoryStatus: 'approved' | 'pending_review' | 'rejected';

  /**
   * Billing state of an owned number, separate from `regulatoryStatus`. `pending` is
   * legacy and is not written to numbers today. The SDKs carry `active`, `suspended`
   * and `pending` only; `releasing` and `released` are returned by the REST API
   * until their next release.
   */
  status: PhoneNumberStatus;

  /**
   * Optional custom name for the phone number.
   */
  name?: string;

  nextRenewalDate?: string;

  /**
   * Sender ID if the phone number is assigned to a sender.
   */
  senderId?: string;

  updatedAt?: string;
}

export interface OwnedPhoneNumberPricing {
  /**
   * Whether this is a free number.
   */
  isFreeNumber?: boolean;

  /**
   * Monthly cost in cents.
   */
  monthlyCost?: number;

  /**
   * Monthly price in USD.
   */
  monthlyPrice?: number;

  /**
   * One-time purchase cost in cents.
   */
  upfrontCost?: number;
}

export interface PhoneNumberCapabilities {
  mms?: boolean;

  sms?: boolean;

  voice?: boolean;
}

export interface PhoneNumberPricing {
  /**
   * Whether this number qualifies as the plan-included number: a US or Canadian
   * number (a +1 number) costing $20 a month or less. The benefit is one per
   * account: it is never offered again once claimed, not even after the number is
   * released.
   */
  isFreeEligible?: boolean;

  /**
   * Monthly price in USD.
   */
  monthlyPrice?: number;

  /**
   * One-time purchase price in USD.
   */
  upfrontPrice?: number;
}

/**
 * Billing state of an owned number, separate from `regulatoryStatus`. `pending` is
 * legacy and is not written to numbers today. The SDKs carry `active`, `suspended`
 * and `pending` only; `releasing` and `released` are returned by the REST API
 * until their next release.
 */
export type PhoneNumberStatus = 'active' | 'suspended' | 'pending' | 'releasing' | 'released';

/**
 * Type of phone number. `mobile` is stocked in countries where no geographic
 * (`local`) or non-geographic (`national`) inventory exists, and in several
 * markets it is the only type that can receive SMS.
 */
export type PhoneNumberType = 'local' | 'national' | 'tollFree' | 'mobile';

/**
 * The requirements for ordering a number: for a country and number type, or for
 * one specific number when requested with `phoneNumber` (then `id` is that phone
 * number and `countryCode` is taken from it).
 */
export interface Requirement {
  id: string;

  action: string;

  countryCode: string;

  phoneNumberType: string;

  requirementTypes: Array<RequirementType>;
}

/**
 * Acceptance criteria for a requirement.
 */
export interface RequirementAcceptanceCriteria {
  allowedValues?: Array<string> | null;

  maxLength?: number | null;

  minLength?: number | null;

  regexPattern?: string | null;
}

/**
 * Type of requirement field.
 */
export type RequirementFieldType = 'textual' | 'address' | 'document' | 'action';

/**
 * A specific requirement type within a requirement group.
 */
export interface RequirementType {
  /**
   * Send this as `requirementType` in `regulatoryRequirements` when purchasing.
   */
  id: string;

  description: string;

  name: string;

  /**
   * Type of requirement field.
   */
  type: RequirementFieldType;

  /**
   * Acceptance criteria for a requirement.
   */
  acceptanceCriteria?: RequirementAcceptanceCriteria;

  example?: string | null;
}

export interface PhoneNumberRetrieveResponse {
  phoneNumber: OwnedPhoneNumber;
}

export interface PhoneNumberUpdateResponse {
  phoneNumber: OwnedPhoneNumber;
}

export interface PhoneNumberPurchaseResponse {
  phoneNumber: OwnedPhoneNumber;
}

export interface PhoneNumberRequirementsResponse {
  items: Array<Requirement>;
}

export interface PhoneNumberSearchAvailableResponse {
  items: Array<AvailablePhoneNumber>;
}

export interface PhoneNumberUpdateParams {
  /**
   * Custom name for the phone number. Set to null to clear.
   */
  name?: string | null;

  /**
   * Sender ID to assign the phone number to. Set to null to unassign. A number under
   * regulatory review is recorded now and connected to the sender when approved; a
   * rejected number is refused.
   */
  senderId?: string | null;
}

export interface PhoneNumberListParams extends CursorParams {
  /**
   * Filter by phone number status.
   */
  status?: PhoneNumberStatus;
}

export interface PhoneNumberPurchaseParams {
  /**
   * Phone number in E.164 format.
   */
  phoneNumber: string;

  /**
   * Optional custom name for the phone number.
   */
  name?: string;

  /**
   * Regulatory information, for numbers whose requirements list is not empty. Get
   * the list with `GET /v1/phone-numbers/requirements?phoneNumber=...` and send one
   * entry per requirement id, except `action` requirements, which take no value.
   * Every required id must be present, once, and no unknown id may be sent;
   * otherwise the purchase is refused with `400 invalid_request` before anything is
   * charged.
   *
   * The information is kept for your project under the number's country and `type`.
   * A later purchase there may omit this field if what is kept still covers that
   * number's requirements. Omit it for numbers without requirements.
   */
  regulatoryRequirements?: Array<PhoneNumberPurchaseParams.RegulatoryRequirement>;

  /**
   * Type of phone number. `mobile` is stocked in countries where no geographic
   * (`local`) or non-geographic (`national`) inventory exists, and in several
   * markets it is the only type that can receive SMS.
   */
  type?: PhoneNumberType;
}

export namespace PhoneNumberPurchaseParams {
  export interface RegulatoryRequirement {
    /**
     * Depends on the requirement's `type`: the text itself for `textual`; for
     * `address`, the `id` of an address created in this project with
     * `POST /v1/addresses`; for `document`, the `id` of a document created with
     * `POST /v1/documents`. An address or document from another project, or one
     * rejected in review, is refused.
     */
    fieldValue: string;

    /**
     * A `requirementTypes[].id` from `GET /v1/phone-numbers/requirements`. Each id may
     * appear only once.
     */
    requirementType: string;
  }
}

export interface PhoneNumberRequirementsParams {
  /**
   * Two-letter ISO country code. Required unless `phoneNumber` is given.
   */
  countryCode?: string;

  /**
   * E.164 number from `GET /v1/phone-numbers/available`, with `+` encoded as `%2B`.
   * Returns the requirements the purchase of that number checks. Takes precedence
   * over `countryCode`.
   */
  phoneNumber?: string;

  /**
   * Type of phone number (local, national, mobile, tollFree). Defaults to `local`.
   * With `phoneNumber`, used only when the number's own requirements cannot be
   * resolved and the country list is returned.
   */
  type?: PhoneNumberType;
}

export interface PhoneNumberSearchAvailableParams {
  /**
   * Two-letter ISO country code.
   */
  countryCode: string;

  /**
   * Comma-separated capabilities the number must have: `sms`, `voice`, `mms`.
   * Numbers missing any of them are dropped.
   */
  capabilities?: string;

  /**
   * Search for numbers containing this string.
   */
  contains?: string;

  /**
   * Maximum number of results to return.
   */
  limit?: number;

  /**
   * Type of phone number to search for.
   */
  type?: PhoneNumberType;
}

export declare namespace PhoneNumbers {
  export {
    type AvailablePhoneNumber as AvailablePhoneNumber,
    type OwnedPhoneNumber as OwnedPhoneNumber,
    type OwnedPhoneNumberPricing as OwnedPhoneNumberPricing,
    type PhoneNumberCapabilities as PhoneNumberCapabilities,
    type PhoneNumberPricing as PhoneNumberPricing,
    type PhoneNumberStatus as PhoneNumberStatus,
    type PhoneNumberType as PhoneNumberType,
    type Requirement as Requirement,
    type RequirementAcceptanceCriteria as RequirementAcceptanceCriteria,
    type RequirementFieldType as RequirementFieldType,
    type RequirementType as RequirementType,
    type PhoneNumberRetrieveResponse as PhoneNumberRetrieveResponse,
    type PhoneNumberUpdateResponse as PhoneNumberUpdateResponse,
    type PhoneNumberPurchaseResponse as PhoneNumberPurchaseResponse,
    type PhoneNumberRequirementsResponse as PhoneNumberRequirementsResponse,
    type PhoneNumberSearchAvailableResponse as PhoneNumberSearchAvailableResponse,
    type OwnedPhoneNumbersCursor as OwnedPhoneNumbersCursor,
    type PhoneNumberUpdateParams as PhoneNumberUpdateParams,
    type PhoneNumberListParams as PhoneNumberListParams,
    type PhoneNumberPurchaseParams as PhoneNumberPurchaseParams,
    type PhoneNumberRequirementsParams as PhoneNumberRequirementsParams,
    type PhoneNumberSearchAvailableParams as PhoneNumberSearchAvailableParams,
  };
}
