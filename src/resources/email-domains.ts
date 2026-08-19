// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class EmailDomains extends APIResource {
  /**
   * Add a domain to send email from. Returns the DNS records to publish (DKIM CNAMEs
   * are required; SPF, DMARC, and MAIL FROM are recommended). Publish them at your
   * DNS provider, then verify.
   *
   * @example
   * ```ts
   * const emailDomain = await client.emailDomains.create({
   *   domain: 'example.com',
   * });
   * ```
   */
  create(body: EmailDomainCreateParams, options?: RequestOptions): APIPromise<EmailDomainCreateResponse> {
    return this._client.post('/v1/email-domains', { body, ...options });
  }

  /**
   * Fetch a domain with its DNS records and current status.
   *
   * @example
   * ```ts
   * const emailDomain = await client.emailDomains.retrieve(
   *   'domainId',
   * );
   * ```
   */
  retrieve(domainID: string, options?: RequestOptions): APIPromise<EmailDomainRetrieveResponse> {
    return this._client.get(path`/v1/email-domains/${domainID}`, options);
  }

  /**
   * List email domains
   *
   * @example
   * ```ts
   * const emailDomains = await client.emailDomains.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<EmailDomainListResponse> {
    return this._client.get('/v1/email-domains', options);
  }

  /**
   * Remove an email domain
   *
   * @example
   * ```ts
   * await client.emailDomains.delete('domainId');
   * ```
   */
  delete(domainID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/email-domains/${domainID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Re-check the domain's published DNS records and refresh its status.
   *
   * @example
   * ```ts
   * const response = await client.emailDomains.verify(
   *   'domainId',
   * );
   * ```
   */
  verify(domainID: string, options?: RequestOptions): APIPromise<EmailDomainVerifyResponse> {
    return this._client.post(path`/v1/email-domains/${domainID}/verify`, options);
  }
}

export interface EmailDomainCreateResponse {
  domain: EmailDomainCreateResponse.Domain;
}

export namespace EmailDomainCreateResponse {
  export interface Domain {
    id: string;

    dkimStatus: string;

    domain: string;

    /**
     * Overall verification status.
     */
    status: string;

    /**
     * DNS records to publish. Present when fetching a single domain or after adding
     * one.
     */
    dnsRecords?: Array<Domain.DNSRecord>;
  }

  export namespace Domain {
    export interface DNSRecord {
      /**
       * Record host/name to create.
       */
      name: string;

      /**
       * What the record is for.
       */
      purpose: 'dkim' | 'spf' | 'dmarc' | 'mail_from';

      /**
       * Whether the record is required to verify + send (DKIM) or recommended for
       * deliverability.
       */
      required: boolean;

      /**
       * DNS record type.
       */
      type: string;

      /**
       * Record value.
       */
      value: string;

      /**
       * Priority (MX records only).
       */
      priority?: number;
    }
  }
}

export interface EmailDomainRetrieveResponse {
  domain: EmailDomainRetrieveResponse.Domain;
}

export namespace EmailDomainRetrieveResponse {
  export interface Domain {
    id: string;

    dkimStatus: string;

    domain: string;

    /**
     * Overall verification status.
     */
    status: string;

    /**
     * DNS records to publish. Present when fetching a single domain or after adding
     * one.
     */
    dnsRecords?: Array<Domain.DNSRecord>;
  }

  export namespace Domain {
    export interface DNSRecord {
      /**
       * Record host/name to create.
       */
      name: string;

      /**
       * What the record is for.
       */
      purpose: 'dkim' | 'spf' | 'dmarc' | 'mail_from';

      /**
       * Whether the record is required to verify + send (DKIM) or recommended for
       * deliverability.
       */
      required: boolean;

      /**
       * DNS record type.
       */
      type: string;

      /**
       * Record value.
       */
      value: string;

      /**
       * Priority (MX records only).
       */
      priority?: number;
    }
  }
}

export interface EmailDomainListResponse {
  items: Array<EmailDomainListResponse.Item>;
}

export namespace EmailDomainListResponse {
  export interface Item {
    id: string;

    dkimStatus: string;

    domain: string;

    /**
     * Overall verification status.
     */
    status: string;

    /**
     * DNS records to publish. Present when fetching a single domain or after adding
     * one.
     */
    dnsRecords?: Array<Item.DNSRecord>;
  }

  export namespace Item {
    export interface DNSRecord {
      /**
       * Record host/name to create.
       */
      name: string;

      /**
       * What the record is for.
       */
      purpose: 'dkim' | 'spf' | 'dmarc' | 'mail_from';

      /**
       * Whether the record is required to verify + send (DKIM) or recommended for
       * deliverability.
       */
      required: boolean;

      /**
       * DNS record type.
       */
      type: string;

      /**
       * Record value.
       */
      value: string;

      /**
       * Priority (MX records only).
       */
      priority?: number;
    }
  }
}

export interface EmailDomainVerifyResponse {
  domain: EmailDomainVerifyResponse.Domain;
}

export namespace EmailDomainVerifyResponse {
  export interface Domain {
    id: string;

    dkimStatus: string;

    domain: string;

    /**
     * Overall verification status.
     */
    status: string;

    /**
     * DNS records to publish. Present when fetching a single domain or after adding
     * one.
     */
    dnsRecords?: Array<Domain.DNSRecord>;
  }

  export namespace Domain {
    export interface DNSRecord {
      /**
       * Record host/name to create.
       */
      name: string;

      /**
       * What the record is for.
       */
      purpose: 'dkim' | 'spf' | 'dmarc' | 'mail_from';

      /**
       * Whether the record is required to verify + send (DKIM) or recommended for
       * deliverability.
       */
      required: boolean;

      /**
       * DNS record type.
       */
      type: string;

      /**
       * Record value.
       */
      value: string;

      /**
       * Priority (MX records only).
       */
      priority?: number;
    }
  }
}

export interface EmailDomainCreateParams {
  /**
   * Bare domain, e.g. example.com.
   */
  domain: string;
}

export declare namespace EmailDomains {
  export {
    type EmailDomainCreateResponse as EmailDomainCreateResponse,
    type EmailDomainRetrieveResponse as EmailDomainRetrieveResponse,
    type EmailDomainListResponse as EmailDomainListResponse,
    type EmailDomainVerifyResponse as EmailDomainVerifyResponse,
    type EmailDomainCreateParams as EmailDomainCreateParams,
  };
}
