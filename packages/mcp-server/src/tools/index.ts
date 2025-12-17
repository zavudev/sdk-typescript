// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import retrieve_messages from './messages/retrieve-messages';
import list_messages from './messages/list-messages';
import react_messages from './messages/react-messages';
import send_messages from './messages/send-messages';
import create_templates from './templates/create-templates';
import retrieve_templates from './templates/retrieve-templates';
import list_templates from './templates/list-templates';
import delete_templates from './templates/delete-templates';
import submit_templates from './templates/submit-templates';
import create_senders from './senders/create-senders';
import retrieve_senders from './senders/retrieve-senders';
import update_senders from './senders/update-senders';
import list_senders from './senders/list-senders';
import delete_senders from './senders/delete-senders';
import get_profile_senders from './senders/get-profile-senders';
import regenerate_webhook_secret_senders from './senders/regenerate-webhook-secret-senders';
import update_profile_senders from './senders/update-profile-senders';
import upload_profile_picture_senders from './senders/upload-profile-picture-senders';
import retrieve_contacts from './contacts/retrieve-contacts';
import update_contacts from './contacts/update-contacts';
import list_contacts from './contacts/list-contacts';
import retrieve_by_phone_contacts from './contacts/retrieve-by-phone-contacts';
import create_broadcasts from './broadcasts/create-broadcasts';
import retrieve_broadcasts from './broadcasts/retrieve-broadcasts';
import update_broadcasts from './broadcasts/update-broadcasts';
import list_broadcasts from './broadcasts/list-broadcasts';
import delete_broadcasts from './broadcasts/delete-broadcasts';
import cancel_broadcasts from './broadcasts/cancel-broadcasts';
import progress_broadcasts from './broadcasts/progress-broadcasts';
import send_broadcasts from './broadcasts/send-broadcasts';
import list_broadcasts_contacts from './broadcasts/contacts/list-broadcasts-contacts';
import add_broadcasts_contacts from './broadcasts/contacts/add-broadcasts-contacts';
import remove_broadcasts_contacts from './broadcasts/contacts/remove-broadcasts-contacts';
import validate_phone_introspect from './introspect/validate-phone-introspect';
import retrieve_phone_numbers from './phone-numbers/retrieve-phone-numbers';
import update_phone_numbers from './phone-numbers/update-phone-numbers';
import list_phone_numbers from './phone-numbers/list-phone-numbers';
import purchase_phone_numbers from './phone-numbers/purchase-phone-numbers';
import release_phone_numbers from './phone-numbers/release-phone-numbers';
import search_available_phone_numbers from './phone-numbers/search-available-phone-numbers';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(retrieve_messages);
addEndpoint(list_messages);
addEndpoint(react_messages);
addEndpoint(send_messages);
addEndpoint(create_templates);
addEndpoint(retrieve_templates);
addEndpoint(list_templates);
addEndpoint(delete_templates);
addEndpoint(submit_templates);
addEndpoint(create_senders);
addEndpoint(retrieve_senders);
addEndpoint(update_senders);
addEndpoint(list_senders);
addEndpoint(delete_senders);
addEndpoint(get_profile_senders);
addEndpoint(regenerate_webhook_secret_senders);
addEndpoint(update_profile_senders);
addEndpoint(upload_profile_picture_senders);
addEndpoint(retrieve_contacts);
addEndpoint(update_contacts);
addEndpoint(list_contacts);
addEndpoint(retrieve_by_phone_contacts);
addEndpoint(create_broadcasts);
addEndpoint(retrieve_broadcasts);
addEndpoint(update_broadcasts);
addEndpoint(list_broadcasts);
addEndpoint(delete_broadcasts);
addEndpoint(cancel_broadcasts);
addEndpoint(progress_broadcasts);
addEndpoint(send_broadcasts);
addEndpoint(list_broadcasts_contacts);
addEndpoint(add_broadcasts_contacts);
addEndpoint(remove_broadcasts_contacts);
addEndpoint(validate_phone_introspect);
addEndpoint(retrieve_phone_numbers);
addEndpoint(update_phone_numbers);
addEndpoint(list_phone_numbers);
addEndpoint(purchase_phone_numbers);
addEndpoint(release_phone_numbers);
addEndpoint(search_available_phone_numbers);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  const allExcludes = filters.length > 0 && filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  const unmatched = Array.from(unmatchedFilters).filter((f) => f.type === 'tool' || f.type === 'resource');
  if (unmatched.length > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${unmatched
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}
