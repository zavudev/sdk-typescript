// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Me extends APIResource {
  /**
   * Returns the project, team, and API key metadata bound to the current Bearer
   * token. Used by CLIs and SDKs to confirm which project they will operate on.
   */
  retrieve(options?: RequestOptions): APIPromise<MeRetrieveResponse> {
    return this._client.get('/v1/me', options);
  }
}

export interface MeRetrieveResponse {
  apiKey: MeRetrieveResponse.APIKey;

  isTestMode: boolean;

  project: MeRetrieveResponse.Project;

  team: MeRetrieveResponse.Team;
}

export namespace MeRetrieveResponse {
  export interface APIKey {
    id: string;
  }

  export interface Project {
    id: string;

    isSubAccount: boolean;

    name: string | null;
  }

  export interface Team {
    id: string;

    name: string | null;
  }
}

export declare namespace Me {
  export { type MeRetrieveResponse as MeRetrieveResponse };
}
