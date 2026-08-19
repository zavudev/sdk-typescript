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

  /**
   * Submit a WhatsApp template to Meta for approval. The template must be in draft
   * status and associated with a sender that has a WhatsApp Business Account
   * configured.
   *
   * @example
   * ```ts
   * const template = await client.templates.submit(
   *   'templateId',
   *   { senderId: 'sender_abc123', category: 'UTILITY' },
   * );
   * ```
   */
  submit(templateID: string, body: TemplateSubmitParams, options?: RequestOptions): APIPromise<Template> {
    return this._client.post(path`/v1/templates/${templateID}/submit`, { body, ...options });
  }

  /**
   * Reconcile this project's templates against WhatsApp. Two things happen per
   * connected WhatsApp Business Account: templates that exist on Meta but not in
   * Zavu are imported (or linked to an existing template with the same name), and
   * the approval status of the templates Zavu already knows about is refreshed from
   * Meta.
   *
   * This is what to call when a template was created outside Zavu — in Meta Business
   * Manager, or by another tool — or when a `template.status_changed` webhook was
   * missed and a template is stuck in `pending`. Status changes normally arrive by
   * webhook; this endpoint is the recovery path and the only path for a template
   * Zavu never created.
   *
   * Templates that Meta reports as rejected or disabled are not imported; they are
   * counted in `skipped`. Existing local templates are matched first by Meta
   * template ID, then by name.
   *
   * By default every sender in the project with a WhatsApp Business Account is
   * synced. Pass `senderId` to sync only that sender's account. The call is
   * synchronous — it waits for Meta and returns what changed — so it can take a few
   * seconds per account. A failure on one account does not fail the request: it is
   * reported in `errors` and the remaining accounts are still synced.
   *
   * @example
   * ```ts
   * const response = await client.templates.sync();
   * ```
   */
  sync(
    body: TemplateSyncParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TemplateSyncResponse> {
    return this._client.post('/v1/templates/sync', { body, ...options });
  }
}

export type TemplatesCursor = Cursor<Template>;

export interface Template {
  id: string;

  /**
   * Default template body with variables: positional ({{1}}, {{2}}) or named
   * ({{customer_name}}, {{contact.first_name}}). Templates created in Zavu are
   * submitted to Meta as positional; templates imported from a WhatsApp Business
   * Account keep their original format (named or positional). Used when no
   * channel-specific body is set.
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
   * Template name. For WhatsApp, must match the approved template name in Meta.
   */
  name: string;

  /**
   * Add 'Do not share this code' disclaimer. Only for AUTHENTICATION templates.
   */
  addSecurityRecommendation?: boolean;

  /**
   * Template buttons.
   */
  buttons?: Array<Template.Button>;

  /**
   * Code expiration time in minutes. Only for AUTHENTICATION templates.
   */
  codeExpirationMinutes?: number;

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

  /**
   * Channel-specific body for Instagram messages. Falls back to `body` if not set.
   */
  instagramBody?: string;

  /**
   * Channel-specific body for SMS messages. Falls back to `body` if not set.
   */
  smsBody?: string;

  status?: 'draft' | 'pending' | 'approved' | 'rejected';

  /**
   * Channel-specific body for Telegram messages. Falls back to `body` if not set.
   */
  telegramBody?: string;

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
    /**
     * Sample value used to substitute `{{1}}` in the URL when submitting the template
     * to Meta for review. Only present for dynamic URL buttons.
     */
    example?: string;

    /**
     * OTP button type. Required when type is 'otp'.
     */
    otpType?: 'COPY_CODE' | 'ONE_TAP';

    /**
     * Android package name. Required for ONE_TAP buttons.
     */
    packageName?: string;

    phoneNumber?: string;

    /**
     * Android app signature hash. Required for ONE_TAP buttons.
     */
    signatureHash?: string;

    text?: string;

    type?: 'quick_reply' | 'url' | 'phone' | 'otp' | 'request_contact_info';

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

export interface TemplateSyncResponse {
  /**
   * WhatsApp Business Accounts reconciled in this call.
   */
  accountsSynced: number;

  /**
   * Problems hit while syncing. Non-empty with a 200 means part of the sync did not
   * complete — the rest still did.
   */
  errors: Array<string>;

  /**
   * Templates that existed on Meta and were created in Zavu by this call.
   */
  imported: number;

  /**
   * Existing Zavu templates that were matched to a Meta template by name and bound
   * to its Meta ID.
   */
  linked: number;

  /**
   * Meta templates left alone: already linked to a Zavu template, or
   * rejected/disabled on Meta.
   */
  skipped: number;

  /**
   * Templates whose approval status changed to match Meta.
   */
  updated: number;
}

export interface TemplateCreateParams {
  /**
   * Default template body. Used when no channel-specific body is set.
   */
  body: string;

  language: string;

  name: string;

  /**
   * Add 'Do not share this code' disclaimer. Only for AUTHENTICATION templates.
   */
  addSecurityRecommendation?: boolean;

  /**
   * Template buttons (max 3).
   */
  buttons?: Array<TemplateCreateParams.Button>;

  /**
   * Code expiration time in minutes. Only for AUTHENTICATION templates.
   */
  codeExpirationMinutes?: number;

  /**
   * Footer text for the template.
   */
  footer?: string;

  /**
   * Header content (text string or media URL).
   */
  headerContent?: string;

  /**
   * Type of header for the template.
   */
  headerType?: 'text' | 'image' | 'video' | 'document';

  /**
   * Channel-specific body for Instagram. Falls back to `body` if not set.
   */
  instagramBody?: string;

  /**
   * Channel-specific body for SMS. Falls back to `body` if not set.
   */
  smsBody?: string;

  /**
   * Channel-specific body for Telegram. Falls back to `body` if not set.
   */
  telegramBody?: string;

  variables?: Array<string>;

  /**
   * WhatsApp template category.
   */
  whatsappCategory?: WhatsappCategory;
}

export namespace TemplateCreateParams {
  export interface Button {
    /**
     * `request_contact_info` renders a fixed **Share Contact Info** button that asks
     * the recipient to share their phone number — useful when a contact adopted a
     * WhatsApp username and you only know their BSUID. It takes no other fields.
     */
    type: 'quick_reply' | 'url' | 'phone' | 'otp' | 'request_contact_info';

    /**
     * Sample value Meta uses to review templates with a dynamic URL button.
     * Substituted into `{{1}}` of the URL when the template is submitted to Meta. Only
     * meaningful when `url` contains `{{1}}`; ignored for static URLs.
     */
    example?: string;

    /**
     * Required when type is 'otp'. COPY_CODE shows copy button, ONE_TAP enables
     * Android autofill.
     */
    otpType?: 'COPY_CODE' | 'ONE_TAP';

    /**
     * Android package name. Required for ONE_TAP buttons.
     */
    packageName?: string;

    phoneNumber?: string;

    /**
     * Android app signature hash. Required for ONE_TAP buttons.
     */
    signatureHash?: string;

    /**
     * Button label. Required for every type except `request_contact_info`, whose label
     * is fixed by WhatsApp.
     */
    text?: string;

    /**
     * Button destination. Use `{{1}}` exactly once for a dynamic URL (e.g.
     * `https://example.com/orders/{{1}}`); WhatsApp only accepts the strict `{{1}}`
     * form. Static URLs must not contain any `{{...}}` placeholder.
     */
    url?: string;
  }
}

export interface TemplateListParams extends CursorParams {}

export interface TemplateSubmitParams {
  /**
   * The sender ID with the WhatsApp Business Account to submit the template to.
   */
  senderId: string;

  /**
   * Template category. If not provided, uses the category set on the template.
   */
  category?: WhatsappCategory;
}

export interface TemplateSyncParams {
  /**
   * Sync only the WhatsApp Business Account attached to this sender. If omitted,
   * every WhatsApp sender in the project is synced.
   */
  senderId?: string;
}

export declare namespace Templates {
  export {
    type Template as Template,
    type WhatsappCategory as WhatsappCategory,
    type TemplateSyncResponse as TemplateSyncResponse,
    type TemplatesCursor as TemplatesCursor,
    type TemplateCreateParams as TemplateCreateParams,
    type TemplateListParams as TemplateListParams,
    type TemplateSubmitParams as TemplateSubmitParams,
    type TemplateSyncParams as TemplateSyncParams,
  };
}
