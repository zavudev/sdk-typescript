// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.messages.retrieve',
    fullyQualifiedName: 'messages.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/messages/{messageId}',
  },
  {
    clientCallName: 'client.messages.list',
    fullyQualifiedName: 'messages.list',
    httpMethod: 'get',
    httpPath: '/v1/messages',
  },
  {
    clientCallName: 'client.messages.react',
    fullyQualifiedName: 'messages.react',
    httpMethod: 'post',
    httpPath: '/v1/messages/{messageId}/reactions',
  },
  {
    clientCallName: 'client.messages.send',
    fullyQualifiedName: 'messages.send',
    httpMethod: 'post',
    httpPath: '/v1/messages',
  },
  {
    clientCallName: 'client.templates.create',
    fullyQualifiedName: 'templates.create',
    httpMethod: 'post',
    httpPath: '/v1/templates',
  },
  {
    clientCallName: 'client.templates.retrieve',
    fullyQualifiedName: 'templates.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/templates/{templateId}',
  },
  {
    clientCallName: 'client.templates.list',
    fullyQualifiedName: 'templates.list',
    httpMethod: 'get',
    httpPath: '/v1/templates',
  },
  {
    clientCallName: 'client.templates.delete',
    fullyQualifiedName: 'templates.delete',
    httpMethod: 'delete',
    httpPath: '/v1/templates/{templateId}',
  },
  {
    clientCallName: 'client.templates.submit',
    fullyQualifiedName: 'templates.submit',
    httpMethod: 'post',
    httpPath: '/v1/templates/{templateId}/submit',
  },
  {
    clientCallName: 'client.senders.create',
    fullyQualifiedName: 'senders.create',
    httpMethod: 'post',
    httpPath: '/v1/senders',
  },
  {
    clientCallName: 'client.senders.retrieve',
    fullyQualifiedName: 'senders.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/senders/{senderId}',
  },
  {
    clientCallName: 'client.senders.update',
    fullyQualifiedName: 'senders.update',
    httpMethod: 'patch',
    httpPath: '/v1/senders/{senderId}',
  },
  {
    clientCallName: 'client.senders.list',
    fullyQualifiedName: 'senders.list',
    httpMethod: 'get',
    httpPath: '/v1/senders',
  },
  {
    clientCallName: 'client.senders.delete',
    fullyQualifiedName: 'senders.delete',
    httpMethod: 'delete',
    httpPath: '/v1/senders/{senderId}',
  },
  {
    clientCallName: 'client.senders.getProfile',
    fullyQualifiedName: 'senders.getProfile',
    httpMethod: 'get',
    httpPath: '/v1/senders/{senderId}/profile',
  },
  {
    clientCallName: 'client.senders.regenerateWebhookSecret',
    fullyQualifiedName: 'senders.regenerateWebhookSecret',
    httpMethod: 'post',
    httpPath: '/v1/senders/{senderId}/webhook/secret',
  },
  {
    clientCallName: 'client.senders.updateProfile',
    fullyQualifiedName: 'senders.updateProfile',
    httpMethod: 'patch',
    httpPath: '/v1/senders/{senderId}/profile',
  },
  {
    clientCallName: 'client.senders.uploadProfilePicture',
    fullyQualifiedName: 'senders.uploadProfilePicture',
    httpMethod: 'post',
    httpPath: '/v1/senders/{senderId}/profile/picture',
  },
  {
    clientCallName: 'client.senders.agent.create',
    fullyQualifiedName: 'senders.agent.create',
    httpMethod: 'post',
    httpPath: '/v1/senders/{senderId}/agent',
  },
  {
    clientCallName: 'client.senders.agent.retrieve',
    fullyQualifiedName: 'senders.agent.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/senders/{senderId}/agent',
  },
  {
    clientCallName: 'client.senders.agent.update',
    fullyQualifiedName: 'senders.agent.update',
    httpMethod: 'patch',
    httpPath: '/v1/senders/{senderId}/agent',
  },
  {
    clientCallName: 'client.senders.agent.delete',
    fullyQualifiedName: 'senders.agent.delete',
    httpMethod: 'delete',
    httpPath: '/v1/senders/{senderId}/agent',
  },
  {
    clientCallName: 'client.senders.agent.stats',
    fullyQualifiedName: 'senders.agent.stats',
    httpMethod: 'get',
    httpPath: '/v1/senders/{senderId}/agent/stats',
  },
  {
    clientCallName: 'client.senders.agent.executions.list',
    fullyQualifiedName: 'senders.agent.executions.list',
    httpMethod: 'get',
    httpPath: '/v1/senders/{senderId}/agent/executions',
  },
  {
    clientCallName: 'client.senders.agent.flows.create',
    fullyQualifiedName: 'senders.agent.flows.create',
    httpMethod: 'post',
    httpPath: '/v1/senders/{senderId}/agent/flows',
  },
  {
    clientCallName: 'client.senders.agent.flows.retrieve',
    fullyQualifiedName: 'senders.agent.flows.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/senders/{senderId}/agent/flows/{flowId}',
  },
  {
    clientCallName: 'client.senders.agent.flows.update',
    fullyQualifiedName: 'senders.agent.flows.update',
    httpMethod: 'patch',
    httpPath: '/v1/senders/{senderId}/agent/flows/{flowId}',
  },
  {
    clientCallName: 'client.senders.agent.flows.list',
    fullyQualifiedName: 'senders.agent.flows.list',
    httpMethod: 'get',
    httpPath: '/v1/senders/{senderId}/agent/flows',
  },
  {
    clientCallName: 'client.senders.agent.flows.delete',
    fullyQualifiedName: 'senders.agent.flows.delete',
    httpMethod: 'delete',
    httpPath: '/v1/senders/{senderId}/agent/flows/{flowId}',
  },
  {
    clientCallName: 'client.senders.agent.flows.duplicate',
    fullyQualifiedName: 'senders.agent.flows.duplicate',
    httpMethod: 'post',
    httpPath: '/v1/senders/{senderId}/agent/flows/{flowId}/duplicate',
  },
  {
    clientCallName: 'client.senders.agent.tools.create',
    fullyQualifiedName: 'senders.agent.tools.create',
    httpMethod: 'post',
    httpPath: '/v1/senders/{senderId}/agent/tools',
  },
  {
    clientCallName: 'client.senders.agent.tools.retrieve',
    fullyQualifiedName: 'senders.agent.tools.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/senders/{senderId}/agent/tools/{toolId}',
  },
  {
    clientCallName: 'client.senders.agent.tools.update',
    fullyQualifiedName: 'senders.agent.tools.update',
    httpMethod: 'patch',
    httpPath: '/v1/senders/{senderId}/agent/tools/{toolId}',
  },
  {
    clientCallName: 'client.senders.agent.tools.list',
    fullyQualifiedName: 'senders.agent.tools.list',
    httpMethod: 'get',
    httpPath: '/v1/senders/{senderId}/agent/tools',
  },
  {
    clientCallName: 'client.senders.agent.tools.delete',
    fullyQualifiedName: 'senders.agent.tools.delete',
    httpMethod: 'delete',
    httpPath: '/v1/senders/{senderId}/agent/tools/{toolId}',
  },
  {
    clientCallName: 'client.senders.agent.tools.test',
    fullyQualifiedName: 'senders.agent.tools.test',
    httpMethod: 'post',
    httpPath: '/v1/senders/{senderId}/agent/tools/{toolId}/test',
  },
  {
    clientCallName: 'client.senders.agent.knowledgeBases.create',
    fullyQualifiedName: 'senders.agent.knowledgeBases.create',
    httpMethod: 'post',
    httpPath: '/v1/senders/{senderId}/agent/knowledge-bases',
  },
  {
    clientCallName: 'client.senders.agent.knowledgeBases.retrieve',
    fullyQualifiedName: 'senders.agent.knowledgeBases.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/senders/{senderId}/agent/knowledge-bases/{kbId}',
  },
  {
    clientCallName: 'client.senders.agent.knowledgeBases.update',
    fullyQualifiedName: 'senders.agent.knowledgeBases.update',
    httpMethod: 'patch',
    httpPath: '/v1/senders/{senderId}/agent/knowledge-bases/{kbId}',
  },
  {
    clientCallName: 'client.senders.agent.knowledgeBases.list',
    fullyQualifiedName: 'senders.agent.knowledgeBases.list',
    httpMethod: 'get',
    httpPath: '/v1/senders/{senderId}/agent/knowledge-bases',
  },
  {
    clientCallName: 'client.senders.agent.knowledgeBases.delete',
    fullyQualifiedName: 'senders.agent.knowledgeBases.delete',
    httpMethod: 'delete',
    httpPath: '/v1/senders/{senderId}/agent/knowledge-bases/{kbId}',
  },
  {
    clientCallName: 'client.senders.agent.knowledgeBases.documents.create',
    fullyQualifiedName: 'senders.agent.knowledgeBases.documents.create',
    httpMethod: 'post',
    httpPath: '/v1/senders/{senderId}/agent/knowledge-bases/{kbId}/documents',
  },
  {
    clientCallName: 'client.senders.agent.knowledgeBases.documents.list',
    fullyQualifiedName: 'senders.agent.knowledgeBases.documents.list',
    httpMethod: 'get',
    httpPath: '/v1/senders/{senderId}/agent/knowledge-bases/{kbId}/documents',
  },
  {
    clientCallName: 'client.senders.agent.knowledgeBases.documents.delete',
    fullyQualifiedName: 'senders.agent.knowledgeBases.documents.delete',
    httpMethod: 'delete',
    httpPath: '/v1/senders/{senderId}/agent/knowledge-bases/{kbId}/documents/{docId}',
  },
  {
    clientCallName: 'client.senders.whatsappSync.retrieve',
    fullyQualifiedName: 'senders.whatsappSync.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/senders/{senderId}/whatsapp-sync',
  },
  {
    clientCallName: 'client.senders.whatsappSync.startContactsSync',
    fullyQualifiedName: 'senders.whatsappSync.startContactsSync',
    httpMethod: 'post',
    httpPath: '/v1/senders/{senderId}/whatsapp-sync/contacts',
  },
  {
    clientCallName: 'client.senders.whatsappSync.startHistorySync',
    fullyQualifiedName: 'senders.whatsappSync.startHistorySync',
    httpMethod: 'post',
    httpPath: '/v1/senders/{senderId}/whatsapp-sync/history',
  },
  {
    clientCallName: 'client.contacts.create',
    fullyQualifiedName: 'contacts.create',
    httpMethod: 'post',
    httpPath: '/v1/contacts',
  },
  {
    clientCallName: 'client.contacts.retrieve',
    fullyQualifiedName: 'contacts.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/contacts/{contactId}',
  },
  {
    clientCallName: 'client.contacts.update',
    fullyQualifiedName: 'contacts.update',
    httpMethod: 'patch',
    httpPath: '/v1/contacts/{contactId}',
  },
  {
    clientCallName: 'client.contacts.list',
    fullyQualifiedName: 'contacts.list',
    httpMethod: 'get',
    httpPath: '/v1/contacts',
  },
  {
    clientCallName: 'client.contacts.dismissMergeSuggestion',
    fullyQualifiedName: 'contacts.dismissMergeSuggestion',
    httpMethod: 'delete',
    httpPath: '/v1/contacts/{contactId}/merge-suggestion',
  },
  {
    clientCallName: 'client.contacts.merge',
    fullyQualifiedName: 'contacts.merge',
    httpMethod: 'post',
    httpPath: '/v1/contacts/{contactId}/merge',
  },
  {
    clientCallName: 'client.contacts.retrieveByPhone',
    fullyQualifiedName: 'contacts.retrieveByPhone',
    httpMethod: 'get',
    httpPath: '/v1/contacts/phone/{phoneNumber}',
  },
  {
    clientCallName: 'client.contacts.channels.update',
    fullyQualifiedName: 'contacts.channels.update',
    httpMethod: 'patch',
    httpPath: '/v1/contacts/{contactId}/channels/{channelId}',
  },
  {
    clientCallName: 'client.contacts.channels.add',
    fullyQualifiedName: 'contacts.channels.add',
    httpMethod: 'post',
    httpPath: '/v1/contacts/{contactId}/channels',
  },
  {
    clientCallName: 'client.contacts.channels.remove',
    fullyQualifiedName: 'contacts.channels.remove',
    httpMethod: 'delete',
    httpPath: '/v1/contacts/{contactId}/channels/{channelId}',
  },
  {
    clientCallName: 'client.contacts.channels.setPrimary',
    fullyQualifiedName: 'contacts.channels.setPrimary',
    httpMethod: 'post',
    httpPath: '/v1/contacts/{contactId}/channels/{channelId}/primary',
  },
  {
    clientCallName: 'client.broadcasts.create',
    fullyQualifiedName: 'broadcasts.create',
    httpMethod: 'post',
    httpPath: '/v1/broadcasts',
  },
  {
    clientCallName: 'client.broadcasts.retrieve',
    fullyQualifiedName: 'broadcasts.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/broadcasts/{broadcastId}',
  },
  {
    clientCallName: 'client.broadcasts.update',
    fullyQualifiedName: 'broadcasts.update',
    httpMethod: 'patch',
    httpPath: '/v1/broadcasts/{broadcastId}',
  },
  {
    clientCallName: 'client.broadcasts.list',
    fullyQualifiedName: 'broadcasts.list',
    httpMethod: 'get',
    httpPath: '/v1/broadcasts',
  },
  {
    clientCallName: 'client.broadcasts.delete',
    fullyQualifiedName: 'broadcasts.delete',
    httpMethod: 'delete',
    httpPath: '/v1/broadcasts/{broadcastId}',
  },
  {
    clientCallName: 'client.broadcasts.cancel',
    fullyQualifiedName: 'broadcasts.cancel',
    httpMethod: 'post',
    httpPath: '/v1/broadcasts/{broadcastId}/cancel',
  },
  {
    clientCallName: 'client.broadcasts.escalateReview',
    fullyQualifiedName: 'broadcasts.escalateReview',
    httpMethod: 'post',
    httpPath: '/v1/broadcasts/{broadcastId}/escalate',
  },
  {
    clientCallName: 'client.broadcasts.progress',
    fullyQualifiedName: 'broadcasts.progress',
    httpMethod: 'get',
    httpPath: '/v1/broadcasts/{broadcastId}/progress',
  },
  {
    clientCallName: 'client.broadcasts.reschedule',
    fullyQualifiedName: 'broadcasts.reschedule',
    httpMethod: 'patch',
    httpPath: '/v1/broadcasts/{broadcastId}/schedule',
  },
  {
    clientCallName: 'client.broadcasts.retryReview',
    fullyQualifiedName: 'broadcasts.retryReview',
    httpMethod: 'post',
    httpPath: '/v1/broadcasts/{broadcastId}/retry-review',
  },
  {
    clientCallName: 'client.broadcasts.send',
    fullyQualifiedName: 'broadcasts.send',
    httpMethod: 'post',
    httpPath: '/v1/broadcasts/{broadcastId}/send',
  },
  {
    clientCallName: 'client.broadcasts.contacts.list',
    fullyQualifiedName: 'broadcasts.contacts.list',
    httpMethod: 'get',
    httpPath: '/v1/broadcasts/{broadcastId}/contacts',
  },
  {
    clientCallName: 'client.broadcasts.contacts.add',
    fullyQualifiedName: 'broadcasts.contacts.add',
    httpMethod: 'post',
    httpPath: '/v1/broadcasts/{broadcastId}/contacts',
  },
  {
    clientCallName: 'client.broadcasts.contacts.remove',
    fullyQualifiedName: 'broadcasts.contacts.remove',
    httpMethod: 'delete',
    httpPath: '/v1/broadcasts/{broadcastId}/contacts/{contactId}',
  },
  {
    clientCallName: 'client.introspect.validatePhone',
    fullyQualifiedName: 'introspect.validatePhone',
    httpMethod: 'post',
    httpPath: '/v1/introspect/phone',
  },
  {
    clientCallName: 'client.phoneNumbers.retrieve',
    fullyQualifiedName: 'phoneNumbers.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/phone-numbers/{phoneNumberId}',
  },
  {
    clientCallName: 'client.phoneNumbers.update',
    fullyQualifiedName: 'phoneNumbers.update',
    httpMethod: 'patch',
    httpPath: '/v1/phone-numbers/{phoneNumberId}',
  },
  {
    clientCallName: 'client.phoneNumbers.list',
    fullyQualifiedName: 'phoneNumbers.list',
    httpMethod: 'get',
    httpPath: '/v1/phone-numbers',
  },
  {
    clientCallName: 'client.phoneNumbers.purchase',
    fullyQualifiedName: 'phoneNumbers.purchase',
    httpMethod: 'post',
    httpPath: '/v1/phone-numbers',
  },
  {
    clientCallName: 'client.phoneNumbers.release',
    fullyQualifiedName: 'phoneNumbers.release',
    httpMethod: 'delete',
    httpPath: '/v1/phone-numbers/{phoneNumberId}',
  },
  {
    clientCallName: 'client.phoneNumbers.requirements',
    fullyQualifiedName: 'phoneNumbers.requirements',
    httpMethod: 'get',
    httpPath: '/v1/phone-numbers/requirements',
  },
  {
    clientCallName: 'client.phoneNumbers.searchAvailable',
    fullyQualifiedName: 'phoneNumbers.searchAvailable',
    httpMethod: 'get',
    httpPath: '/v1/phone-numbers/available',
  },
  {
    clientCallName: 'client.addresses.create',
    fullyQualifiedName: 'addresses.create',
    httpMethod: 'post',
    httpPath: '/v1/addresses',
  },
  {
    clientCallName: 'client.addresses.retrieve',
    fullyQualifiedName: 'addresses.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/addresses/{addressId}',
  },
  {
    clientCallName: 'client.addresses.list',
    fullyQualifiedName: 'addresses.list',
    httpMethod: 'get',
    httpPath: '/v1/addresses',
  },
  {
    clientCallName: 'client.addresses.delete',
    fullyQualifiedName: 'addresses.delete',
    httpMethod: 'delete',
    httpPath: '/v1/addresses/{addressId}',
  },
  {
    clientCallName: 'client.regulatoryDocuments.create',
    fullyQualifiedName: 'regulatoryDocuments.create',
    httpMethod: 'post',
    httpPath: '/v1/documents',
  },
  {
    clientCallName: 'client.regulatoryDocuments.retrieve',
    fullyQualifiedName: 'regulatoryDocuments.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/documents/{documentId}',
  },
  {
    clientCallName: 'client.regulatoryDocuments.list',
    fullyQualifiedName: 'regulatoryDocuments.list',
    httpMethod: 'get',
    httpPath: '/v1/documents',
  },
  {
    clientCallName: 'client.regulatoryDocuments.delete',
    fullyQualifiedName: 'regulatoryDocuments.delete',
    httpMethod: 'delete',
    httpPath: '/v1/documents/{documentId}',
  },
  {
    clientCallName: 'client.regulatoryDocuments.uploadURL',
    fullyQualifiedName: 'regulatoryDocuments.uploadURL',
    httpMethod: 'post',
    httpPath: '/v1/documents/upload-url',
  },
  {
    clientCallName: 'client.invitations.create',
    fullyQualifiedName: 'invitations.create',
    httpMethod: 'post',
    httpPath: '/v1/invitations',
  },
  {
    clientCallName: 'client.invitations.retrieve',
    fullyQualifiedName: 'invitations.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/invitations/{invitationId}',
  },
  {
    clientCallName: 'client.invitations.list',
    fullyQualifiedName: 'invitations.list',
    httpMethod: 'get',
    httpPath: '/v1/invitations',
  },
  {
    clientCallName: 'client.invitations.cancel',
    fullyQualifiedName: 'invitations.cancel',
    httpMethod: 'post',
    httpPath: '/v1/invitations/{invitationId}/cancel',
  },
  {
    clientCallName: 'client.exports.create',
    fullyQualifiedName: 'exports.create',
    httpMethod: 'post',
    httpPath: '/v1/exports',
  },
  {
    clientCallName: 'client.exports.retrieve',
    fullyQualifiedName: 'exports.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/exports/{exportId}',
  },
  {
    clientCallName: 'client.exports.list',
    fullyQualifiedName: 'exports.list',
    httpMethod: 'get',
    httpPath: '/v1/exports',
  },
  {
    clientCallName: 'client.urls.listVerified',
    fullyQualifiedName: 'urls.listVerified',
    httpMethod: 'get',
    httpPath: '/v1/urls',
  },
  {
    clientCallName: 'client.urls.retrieveDetails',
    fullyQualifiedName: 'urls.retrieveDetails',
    httpMethod: 'get',
    httpPath: '/v1/urls/{urlId}',
  },
  {
    clientCallName: 'client.urls.submitForVerification',
    fullyQualifiedName: 'urls.submitForVerification',
    httpMethod: 'post',
    httpPath: '/v1/urls',
  },
  {
    clientCallName: 'client.balance.retrieve',
    fullyQualifiedName: 'balance.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/balance',
  },
  {
    clientCallName: 'client.plan.retrieve',
    fullyQualifiedName: 'plan.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/plan',
  },
  {
    clientCallName: 'client.usage.retrieve',
    fullyQualifiedName: 'usage.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/usage',
  },
  {
    clientCallName: 'client.subAccounts.create',
    fullyQualifiedName: 'subAccounts.create',
    httpMethod: 'post',
    httpPath: '/v1/sub-accounts',
  },
  {
    clientCallName: 'client.subAccounts.retrieve',
    fullyQualifiedName: 'subAccounts.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/sub-accounts/{id}',
  },
  {
    clientCallName: 'client.subAccounts.update',
    fullyQualifiedName: 'subAccounts.update',
    httpMethod: 'patch',
    httpPath: '/v1/sub-accounts/{id}',
  },
  {
    clientCallName: 'client.subAccounts.list',
    fullyQualifiedName: 'subAccounts.list',
    httpMethod: 'get',
    httpPath: '/v1/sub-accounts',
  },
  {
    clientCallName: 'client.subAccounts.deactivate',
    fullyQualifiedName: 'subAccounts.deactivate',
    httpMethod: 'delete',
    httpPath: '/v1/sub-accounts/{id}',
  },
  {
    clientCallName: 'client.subAccounts.getBalance',
    fullyQualifiedName: 'subAccounts.getBalance',
    httpMethod: 'get',
    httpPath: '/v1/sub-accounts/{id}/balance',
  },
  {
    clientCallName: 'client.subAccounts.apiKeys.create',
    fullyQualifiedName: 'subAccounts.apiKeys.create',
    httpMethod: 'post',
    httpPath: '/v1/sub-accounts/{id}/api-keys',
  },
  {
    clientCallName: 'client.subAccounts.apiKeys.list',
    fullyQualifiedName: 'subAccounts.apiKeys.list',
    httpMethod: 'get',
    httpPath: '/v1/sub-accounts/{id}/api-keys',
  },
  {
    clientCallName: 'client.subAccounts.apiKeys.revoke',
    fullyQualifiedName: 'subAccounts.apiKeys.revoke',
    httpMethod: 'delete',
    httpPath: '/v1/sub-accounts/{id}/api-keys/{keyId}',
  },
  {
    clientCallName: 'client.number10dlc.brands.create',
    fullyQualifiedName: 'number10dlc.brands.create',
    httpMethod: 'post',
    httpPath: '/v1/10dlc/brands',
  },
  {
    clientCallName: 'client.number10dlc.brands.retrieve',
    fullyQualifiedName: 'number10dlc.brands.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/10dlc/brands/{brandId}',
  },
  {
    clientCallName: 'client.number10dlc.brands.update',
    fullyQualifiedName: 'number10dlc.brands.update',
    httpMethod: 'patch',
    httpPath: '/v1/10dlc/brands/{brandId}',
  },
  {
    clientCallName: 'client.number10dlc.brands.list',
    fullyQualifiedName: 'number10dlc.brands.list',
    httpMethod: 'get',
    httpPath: '/v1/10dlc/brands',
  },
  {
    clientCallName: 'client.number10dlc.brands.delete',
    fullyQualifiedName: 'number10dlc.brands.delete',
    httpMethod: 'delete',
    httpPath: '/v1/10dlc/brands/{brandId}',
  },
  {
    clientCallName: 'client.number10dlc.brands.listUseCases',
    fullyQualifiedName: 'number10dlc.brands.listUseCases',
    httpMethod: 'get',
    httpPath: '/v1/10dlc/brands/use-cases',
  },
  {
    clientCallName: 'client.number10dlc.brands.submit',
    fullyQualifiedName: 'number10dlc.brands.submit',
    httpMethod: 'post',
    httpPath: '/v1/10dlc/brands/{brandId}/submit',
  },
  {
    clientCallName: 'client.number10dlc.brands.syncStatus',
    fullyQualifiedName: 'number10dlc.brands.syncStatus',
    httpMethod: 'post',
    httpPath: '/v1/10dlc/brands/{brandId}/sync',
  },
  {
    clientCallName: 'client.number10dlc.campaigns.create',
    fullyQualifiedName: 'number10dlc.campaigns.create',
    httpMethod: 'post',
    httpPath: '/v1/10dlc/campaigns',
  },
  {
    clientCallName: 'client.number10dlc.campaigns.retrieve',
    fullyQualifiedName: 'number10dlc.campaigns.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/10dlc/campaigns/{campaignId}',
  },
  {
    clientCallName: 'client.number10dlc.campaigns.update',
    fullyQualifiedName: 'number10dlc.campaigns.update',
    httpMethod: 'patch',
    httpPath: '/v1/10dlc/campaigns/{campaignId}',
  },
  {
    clientCallName: 'client.number10dlc.campaigns.list',
    fullyQualifiedName: 'number10dlc.campaigns.list',
    httpMethod: 'get',
    httpPath: '/v1/10dlc/campaigns',
  },
  {
    clientCallName: 'client.number10dlc.campaigns.delete',
    fullyQualifiedName: 'number10dlc.campaigns.delete',
    httpMethod: 'delete',
    httpPath: '/v1/10dlc/campaigns/{campaignId}',
  },
  {
    clientCallName: 'client.number10dlc.campaigns.submit',
    fullyQualifiedName: 'number10dlc.campaigns.submit',
    httpMethod: 'post',
    httpPath: '/v1/10dlc/campaigns/{campaignId}/submit',
  },
  {
    clientCallName: 'client.number10dlc.campaigns.syncStatus',
    fullyQualifiedName: 'number10dlc.campaigns.syncStatus',
    httpMethod: 'post',
    httpPath: '/v1/10dlc/campaigns/{campaignId}/sync',
  },
  {
    clientCallName: 'client.number10dlc.campaigns.phoneNumbers.list',
    fullyQualifiedName: 'number10dlc.campaigns.phoneNumbers.list',
    httpMethod: 'get',
    httpPath: '/v1/10dlc/campaigns/{campaignId}/phone-numbers',
  },
  {
    clientCallName: 'client.number10dlc.campaigns.phoneNumbers.assign',
    fullyQualifiedName: 'number10dlc.campaigns.phoneNumbers.assign',
    httpMethod: 'post',
    httpPath: '/v1/10dlc/campaigns/{campaignId}/phone-numbers',
  },
  {
    clientCallName: 'client.number10dlc.campaigns.phoneNumbers.unassign',
    fullyQualifiedName: 'number10dlc.campaigns.phoneNumbers.unassign',
    httpMethod: 'delete',
    httpPath: '/v1/10dlc/campaigns/{campaignId}/phone-numbers/{assignmentId}',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
