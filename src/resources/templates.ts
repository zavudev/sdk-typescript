// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Templates extends APIResource {
  /**
   * Create a WhatsApp message template. Note: Templates must be approved by Meta
   * before use.
   *
   * @example
   * ```ts
   * const template = await client.templates.create({
   *   body: 'Hi {{1}}, your order {{2}} has been confirmed and will ship within 24 hours.',
   *   language: 'en',
   *   name: 'order_confirmation',
   *   variables: ['customer_name', 'order_id'],
   *   whatsappCategory: 'UTILITY',
   * });
   * ```
   */
  create(body: TemplateCreateParams, options?: RequestOptions): APIPromise<Template> {
    return this._client.post('/v1/templates', { body, ...options });
  }

  /**
   * Get template
   *
   * @example
   * ```ts
   * const template = await client.templates.retrieve(
   *   'templateId',
   * );
   * ```
   */
  retrieve(templateID: string, options?: RequestOptions): APIPromise<Template> {
    return this._client.get(path`/v1/templates/${templateID}`, options);
  }

  /**
   * List WhatsApp message templates for this project.
   *
   * @example
   * ```ts
   * const templates = await client.templates.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<TemplateListResponse> {
    return this._client.get('/v1/templates', options);
  }

  /**
   * Delete template
   *
   * @example
   * ```ts
   * await client.templates.delete('templateId');
   * ```
   */
  delete(templateID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/templates/${templateID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface Template {
  id: string;

  /**
   * Template body with variables: {{1}}, {{2}}, etc.
   */
  body: string;

  /**
   * WhatsApp template category.
   */
  category: WhatsappCategory;

  /**
   * Language code.
   */
  language: string;

  /**
   * Template name (must match WhatsApp template name).
   */
  name: string;

  createdAt?: string;

  status?: 'pending' | 'approved' | 'rejected';

  updatedAt?: string;

  /**
   * List of variable names for documentation.
   */
  variables?: Array<string>;
}

/**
 * WhatsApp template category.
 */
export type WhatsappCategory = 'UTILITY' | 'MARKETING' | 'AUTHENTICATION';

export interface TemplateListResponse {
  items: Array<Template>;
}

export interface TemplateCreateParams {
  body: string;

  language: string;

  name: string;

  variables?: Array<string>;

  /**
   * WhatsApp template category.
   */
  whatsappCategory?: WhatsappCategory;
}

export declare namespace Templates {
  export {
    type Template as Template,
    type WhatsappCategory as WhatsappCategory,
    type TemplateListResponse as TemplateListResponse,
    type TemplateCreateParams as TemplateCreateParams,
  };
}
