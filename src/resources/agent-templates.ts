// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class AgentTemplates extends APIResource {
  /**
   * Fetch a single factory agent fully rendered: the function files to scaffold (an
   * `index.ts` that declares the agent with `defineAgent` and its skills with
   * `defineTool`) plus the secrets it needs. This is what
   * `npx zavudev agents pull <id>` writes to disk before `npx zavudev deploy`.
   *
   * @example
   * ```ts
   * const agentTemplate = await client.agentTemplates.retrieve(
   *   'fermi',
   * );
   * ```
   */
  retrieve(templateID: string, options?: RequestOptions): APIPromise<AgentTemplateRetrieveResponse> {
    return this._client.get(path`/v1/agent-templates/${templateID}`, options);
  }

  /**
   * List the factory agents available to scaffold with `npx zavudev agents pull`.
   * Each entry is a ready-made voice or text agent (system prompt, skills, and — for
   * voice agents — a co-located voice config).
   *
   * @example
   * ```ts
   * const agentTemplates = await client.agentTemplates.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<AgentTemplateListResponse> {
    return this._client.get('/v1/agent-templates', options);
  }
}

export interface AgentTemplateRetrieveResponse {
  /**
   * A fully rendered factory agent: the function files to scaffold plus the secrets
   * it needs. Returned by GET /v1/agent-templates/{templateId} and consumed by
   * `npx zavudev agents pull`.
   */
  template: AgentTemplateRetrieveResponse.Template;
}

export namespace AgentTemplateRetrieveResponse {
  /**
   * A fully rendered factory agent: the function files to scaffold plus the secrets
   * it needs. Returned by GET /v1/agent-templates/{templateId} and consumed by
   * `npx zavudev agents pull`.
   */
  export interface Template {
    id: string;

    category: 'sales' | 'support' | 'frontDesk' | 'ops';

    defaultSlug: string;

    /**
     * npm dependencies for the scaffolded function.
     */
    dependencies: { [key: string]: string };

    files: Array<Template.File>;

    name: string;

    requiredSecrets: Array<Template.RequiredSecret>;

    summary: string;

    voice: boolean;
  }

  export namespace Template {
    export interface File {
      /**
       * File contents to write verbatim.
       */
      content: string;

      path: string;
    }

    export interface RequiredSecret {
      hint: string;

      key: string;
    }
  }
}

export interface AgentTemplateListResponse {
  items: Array<AgentTemplateListResponse.Item>;
}

export namespace AgentTemplateListResponse {
  /**
   * Compact catalog entry for a factory agent.
   */
  export interface Item {
    id: string;

    category: 'sales' | 'support' | 'frontDesk' | 'ops';

    name: string;

    summary: string;

    toolCount: number;

    /**
     * Whether this agent answers phone calls.
     */
    voice: boolean;
  }
}

export declare namespace AgentTemplates {
  export {
    type AgentTemplateRetrieveResponse as AgentTemplateRetrieveResponse,
    type AgentTemplateListResponse as AgentTemplateListResponse,
  };
}
