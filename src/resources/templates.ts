// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Cursor, type CursorParams, PagePromise } from '../core/pagination';
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
   * // Automatically fetches more pages as needed.
   * for await (const template of client.templates.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: TemplateListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<TemplatesCursor, Template> {
    return this._client.getAPIList('/v1/templates', Cursor<Template>, { query, ...options });
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

export type TemplatesCursor = Cursor<Template>;

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

  /**
   * Template buttons.
   */
  buttons?: Array<Template.Button>;

  createdAt?: string;

  /**
   * Footer text for the template.
   */
  footer?: string;

  /**
   * Header content (text or media URL).
   */
  headerContent?: string;

  /**
   * Type of header (text, image, video, document).
   */
  headerType?: string;

  status?: 'draft' | 'pending' | 'approved' | 'rejected';

  updatedAt?: string;

  /**
   * List of variable names for documentation.
   */
  variables?: Array<string>;

  /**
   * WhatsApp-specific template information.
   */
  whatsapp?: Template.Whatsapp;
}

export namespace Template {
  export interface Button {
    phoneNumber?: string;

    text?: string;

    type?: string;

    url?: string;
  }

  /**
   * WhatsApp-specific template information.
   */
  export interface Whatsapp {
    /**
     * WhatsApp Business Account namespace.
     */
    namespace?: string;

    /**
     * WhatsApp approval status.
     */
    status?: string;

    /**
     * WhatsApp template name.
     */
    templateName?: string;
  }
}

/**
 * WhatsApp template category.
 */
export type WhatsappCategory = 'UTILITY' | 'MARKETING' | 'AUTHENTICATION';

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

export interface TemplateListParams extends CursorParams {}

export declare namespace Templates {
  export {
    type Template as Template,
    type WhatsappCategory as WhatsappCategory,
    type TemplatesCursor as TemplatesCursor,
    type TemplateCreateParams as TemplateCreateParams,
    type TemplateListParams as TemplateListParams,
  };
}
