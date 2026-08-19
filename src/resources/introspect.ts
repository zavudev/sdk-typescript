// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as IntrospectAPI from './introspect';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Introspect extends APIResource {
  /**
   * Heuristic email validation to run before sending: catches invalid syntax, dead
   * domains (no MX/A records), disposable inboxes, role-based addresses (info@,
   * contacto@, sales@), and addresses already on your project's suppression list.
   * Use it to clean a list before a broadcast and keep your bounce rate low.
   *
   * No mailbox-level (SMTP) probe is performed, so a `deliverable` verdict is not a
   * delivery guarantee — it means no negative signal was found. Treat `risky`
   * addresses with care and drop `undeliverable` ones.
   *
   * Accepts a single `email` or an `emails` batch (max 100 per request).
   *
   * @example
   * ```ts
   * const response = await client.introspect.validateEmail({
   *   email: 'maria@example.com',
   * });
   * ```
   */
  validateEmail(
    body: IntrospectValidateEmailParams,
    options?: RequestOptions,
  ): APIPromise<IntrospectValidateEmailResponse> {
    return this._client.post('/v1/introspect/email', { body, ...options });
  }

  /**
   * Validate a phone number and check if a WhatsApp conversation window is open.
   *
   * @example
   * ```ts
   * const response = await client.introspect.validatePhone({
   *   phoneNumber: '+56912345678',
   * });
   * ```
   */
  validatePhone(
    body: IntrospectValidatePhoneParams,
    options?: RequestOptions,
  ): APIPromise<IntrospectValidatePhoneResponse> {
    return this._client.post('/v1/introspect/phone', { body, ...options });
  }
}

/**
 * Type of phone line.
 */
export type LineType = 'mobile' | 'landline' | 'voip' | 'toll_free' | 'unknown';

export interface IntrospectValidateEmailResponse {
  /**
   * One result per submitted address, in the same order.
   */
  results: Array<IntrospectValidateEmailResponse.Result>;

  summary: IntrospectValidateEmailResponse.Summary;
}

export namespace IntrospectValidateEmailResponse {
  export interface Result {
    /**
     * Domain part of the address. Null when the syntax is invalid.
     */
    domain: string | null;

    /**
     * The address exactly as submitted.
     */
    email: string;

    /**
     * Lowercased, trimmed form of the address. Null when the syntax is invalid.
     */
    normalized: string | null;

    /**
     * Signals behind the verdict. Empty for a clean `deliverable` address.
     */
    reasons: Array<
      | 'invalid_syntax'
      | 'domain_not_found'
      | 'domain_no_mx'
      | 'disposable_domain'
      | 'role_address'
      | 'suppressed_hard_bounce'
      | 'suppressed_soft_bounce'
      | 'suppressed_complaint'
      | 'suppressed_manual'
      | 'suppressed_unsubscribe'
    >;

    /**
     * Validation verdict.
     *
     * - `deliverable`: nothing suggests the address will bounce.
     * - `risky`: sendable, but a signal predicts elevated bounce/complaint odds (role
     *   address, disposable domain, MX-less domain, prior soft bounce).
     * - `undeliverable`: will bounce or is blocked (invalid syntax, dead domain, or
     *   the address is on your suppression list after a hard bounce/complaint).
     */
    verdict: 'deliverable' | 'risky' | 'undeliverable';
  }

  export interface Summary {
    deliverable: number;

    risky: number;

    total: number;

    undeliverable: number;
  }
}

export interface IntrospectValidatePhoneResponse {
  countryCode: string;

  phoneNumber: string;

  validNumber: boolean;

  /**
   * List of available messaging channels for this phone number.
   */
  availableChannels?: Array<string>;

  /**
   * Carrier information for the phone number.
   */
  carrier?: IntrospectValidatePhoneResponse.Carrier;

  /**
   * Type of phone line.
   */
  lineType?: LineType;

  /**
   * Phone number in national format.
   */
  nationalFormat?: string;
}

export namespace IntrospectValidatePhoneResponse {
  /**
   * Carrier information for the phone number.
   */
  export interface Carrier {
    /**
     * Carrier name.
     */
    name?: string | null;

    /**
     * Type of phone line.
     */
    type?: IntrospectAPI.LineType;
  }
}

export interface IntrospectValidateEmailParams {
  /**
   * Single email address to validate.
   */
  email?: string;

  /**
   * Batch of email addresses to validate (max 100).
   */
  emails?: Array<string>;
}

export interface IntrospectValidatePhoneParams {
  phoneNumber: string;
}

export declare namespace Introspect {
  export {
    type LineType as LineType,
    type IntrospectValidateEmailResponse as IntrospectValidateEmailResponse,
    type IntrospectValidatePhoneResponse as IntrospectValidatePhoneResponse,
    type IntrospectValidateEmailParams as IntrospectValidateEmailParams,
    type IntrospectValidatePhoneParams as IntrospectValidatePhoneParams,
  };
}
