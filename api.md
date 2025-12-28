# Messages

Types:

- <code><a href="./src/resources/messages.ts">Channel</a></code>
- <code><a href="./src/resources/messages.ts">Message</a></code>
- <code><a href="./src/resources/messages.ts">MessageContent</a></code>
- <code><a href="./src/resources/messages.ts">MessageResponse</a></code>
- <code><a href="./src/resources/messages.ts">MessageStatus</a></code>
- <code><a href="./src/resources/messages.ts">MessageType</a></code>

Methods:

- <code title="get /v1/messages/{messageId}">client.messages.<a href="./src/resources/messages.ts">retrieve</a>(messageID) -> MessageResponse</code>
- <code title="get /v1/messages">client.messages.<a href="./src/resources/messages.ts">list</a>({ ...params }) -> MessagesCursor</code>
- <code title="post /v1/messages/{messageId}/reactions">client.messages.<a href="./src/resources/messages.ts">react</a>(messageID, { ...params }) -> MessageResponse</code>
- <code title="post /v1/messages">client.messages.<a href="./src/resources/messages.ts">send</a>({ ...params }) -> MessageResponse</code>

# Templates

Types:

- <code><a href="./src/resources/templates.ts">Template</a></code>
- <code><a href="./src/resources/templates.ts">WhatsappCategory</a></code>

Methods:

- <code title="post /v1/templates">client.templates.<a href="./src/resources/templates.ts">create</a>({ ...params }) -> Template</code>
- <code title="get /v1/templates/{templateId}">client.templates.<a href="./src/resources/templates.ts">retrieve</a>(templateID) -> Template</code>
- <code title="get /v1/templates">client.templates.<a href="./src/resources/templates.ts">list</a>({ ...params }) -> TemplatesCursor</code>
- <code title="delete /v1/templates/{templateId}">client.templates.<a href="./src/resources/templates.ts">delete</a>(templateID) -> void</code>
- <code title="post /v1/templates/{templateId}/submit">client.templates.<a href="./src/resources/templates.ts">submit</a>(templateID, { ...params }) -> Template</code>

# Senders

Types:

- <code><a href="./src/resources/senders/senders.ts">Sender</a></code>
- <code><a href="./src/resources/senders/senders.ts">SenderWebhook</a></code>
- <code><a href="./src/resources/senders/senders.ts">WebhookEvent</a></code>
- <code><a href="./src/resources/senders/senders.ts">WebhookSecretResponse</a></code>
- <code><a href="./src/resources/senders/senders.ts">WhatsappBusinessProfile</a></code>
- <code><a href="./src/resources/senders/senders.ts">WhatsappBusinessProfileResponse</a></code>
- <code><a href="./src/resources/senders/senders.ts">WhatsappBusinessProfileVertical</a></code>
- <code><a href="./src/resources/senders/senders.ts">SenderUpdateProfileResponse</a></code>
- <code><a href="./src/resources/senders/senders.ts">SenderUploadProfilePictureResponse</a></code>

Methods:

- <code title="post /v1/senders">client.senders.<a href="./src/resources/senders/senders.ts">create</a>({ ...params }) -> Sender</code>
- <code title="get /v1/senders/{senderId}">client.senders.<a href="./src/resources/senders/senders.ts">retrieve</a>(senderID) -> Sender</code>
- <code title="patch /v1/senders/{senderId}">client.senders.<a href="./src/resources/senders/senders.ts">update</a>(senderID, { ...params }) -> Sender</code>
- <code title="get /v1/senders">client.senders.<a href="./src/resources/senders/senders.ts">list</a>({ ...params }) -> SendersCursor</code>
- <code title="delete /v1/senders/{senderId}">client.senders.<a href="./src/resources/senders/senders.ts">delete</a>(senderID) -> void</code>
- <code title="get /v1/senders/{senderId}/profile">client.senders.<a href="./src/resources/senders/senders.ts">getProfile</a>(senderID) -> WhatsappBusinessProfileResponse</code>
- <code title="post /v1/senders/{senderId}/webhook/secret">client.senders.<a href="./src/resources/senders/senders.ts">regenerateWebhookSecret</a>(senderID) -> WebhookSecretResponse</code>
- <code title="patch /v1/senders/{senderId}/profile">client.senders.<a href="./src/resources/senders/senders.ts">updateProfile</a>(senderID, { ...params }) -> SenderUpdateProfileResponse</code>
- <code title="post /v1/senders/{senderId}/profile/picture">client.senders.<a href="./src/resources/senders/senders.ts">uploadProfilePicture</a>(senderID, { ...params }) -> SenderUploadProfilePictureResponse</code>

## Agent

Types:

- <code><a href="./src/resources/senders/agent/agent.ts">Agent</a></code>
- <code><a href="./src/resources/senders/agent/agent.ts">AgentExecution</a></code>
- <code><a href="./src/resources/senders/agent/agent.ts">AgentExecutionStatus</a></code>
- <code><a href="./src/resources/senders/agent/agent.ts">AgentProvider</a></code>
- <code><a href="./src/resources/senders/agent/agent.ts">AgentResponse</a></code>
- <code><a href="./src/resources/senders/agent/agent.ts">AgentStats</a></code>

Methods:

- <code title="post /v1/senders/{senderId}/agent">client.senders.agent.<a href="./src/resources/senders/agent/agent.ts">create</a>(senderID, { ...params }) -> AgentResponse</code>
- <code title="get /v1/senders/{senderId}/agent">client.senders.agent.<a href="./src/resources/senders/agent/agent.ts">retrieve</a>(senderID) -> AgentResponse</code>
- <code title="patch /v1/senders/{senderId}/agent">client.senders.agent.<a href="./src/resources/senders/agent/agent.ts">update</a>(senderID, { ...params }) -> AgentResponse</code>
- <code title="delete /v1/senders/{senderId}/agent">client.senders.agent.<a href="./src/resources/senders/agent/agent.ts">delete</a>(senderID) -> void</code>
- <code title="get /v1/senders/{senderId}/agent/stats">client.senders.agent.<a href="./src/resources/senders/agent/agent.ts">stats</a>(senderID) -> AgentStats</code>

### Executions

Methods:

- <code title="get /v1/senders/{senderId}/agent/executions">client.senders.agent.executions.<a href="./src/resources/senders/agent/executions.ts">list</a>(senderID, { ...params }) -> AgentExecutionsCursor</code>

### Flows

Types:

- <code><a href="./src/resources/senders/agent/flows.ts">AgentFlow</a></code>
- <code><a href="./src/resources/senders/agent/flows.ts">FlowCreateResponse</a></code>
- <code><a href="./src/resources/senders/agent/flows.ts">FlowRetrieveResponse</a></code>
- <code><a href="./src/resources/senders/agent/flows.ts">FlowUpdateResponse</a></code>
- <code><a href="./src/resources/senders/agent/flows.ts">FlowDuplicateResponse</a></code>

Methods:

- <code title="post /v1/senders/{senderId}/agent/flows">client.senders.agent.flows.<a href="./src/resources/senders/agent/flows.ts">create</a>(senderID, { ...params }) -> FlowCreateResponse</code>
- <code title="get /v1/senders/{senderId}/agent/flows/{flowId}">client.senders.agent.flows.<a href="./src/resources/senders/agent/flows.ts">retrieve</a>(flowID, { ...params }) -> FlowRetrieveResponse</code>
- <code title="patch /v1/senders/{senderId}/agent/flows/{flowId}">client.senders.agent.flows.<a href="./src/resources/senders/agent/flows.ts">update</a>(flowID, { ...params }) -> FlowUpdateResponse</code>
- <code title="get /v1/senders/{senderId}/agent/flows">client.senders.agent.flows.<a href="./src/resources/senders/agent/flows.ts">list</a>(senderID, { ...params }) -> AgentFlowsCursor</code>
- <code title="delete /v1/senders/{senderId}/agent/flows/{flowId}">client.senders.agent.flows.<a href="./src/resources/senders/agent/flows.ts">delete</a>(flowID, { ...params }) -> void</code>
- <code title="post /v1/senders/{senderId}/agent/flows/{flowId}/duplicate">client.senders.agent.flows.<a href="./src/resources/senders/agent/flows.ts">duplicate</a>(flowID, { ...params }) -> FlowDuplicateResponse</code>

### Tools

Types:

- <code><a href="./src/resources/senders/agent/tools.ts">AgentTool</a></code>
- <code><a href="./src/resources/senders/agent/tools.ts">ToolCreateResponse</a></code>
- <code><a href="./src/resources/senders/agent/tools.ts">ToolRetrieveResponse</a></code>
- <code><a href="./src/resources/senders/agent/tools.ts">ToolUpdateResponse</a></code>
- <code><a href="./src/resources/senders/agent/tools.ts">ToolTestResponse</a></code>

Methods:

- <code title="post /v1/senders/{senderId}/agent/tools">client.senders.agent.tools.<a href="./src/resources/senders/agent/tools.ts">create</a>(senderID, { ...params }) -> ToolCreateResponse</code>
- <code title="get /v1/senders/{senderId}/agent/tools/{toolId}">client.senders.agent.tools.<a href="./src/resources/senders/agent/tools.ts">retrieve</a>(toolID, { ...params }) -> ToolRetrieveResponse</code>
- <code title="patch /v1/senders/{senderId}/agent/tools/{toolId}">client.senders.agent.tools.<a href="./src/resources/senders/agent/tools.ts">update</a>(toolID, { ...params }) -> ToolUpdateResponse</code>
- <code title="get /v1/senders/{senderId}/agent/tools">client.senders.agent.tools.<a href="./src/resources/senders/agent/tools.ts">list</a>(senderID, { ...params }) -> AgentToolsCursor</code>
- <code title="delete /v1/senders/{senderId}/agent/tools/{toolId}">client.senders.agent.tools.<a href="./src/resources/senders/agent/tools.ts">delete</a>(toolID, { ...params }) -> void</code>
- <code title="post /v1/senders/{senderId}/agent/tools/{toolId}/test">client.senders.agent.tools.<a href="./src/resources/senders/agent/tools.ts">test</a>(toolID, { ...params }) -> ToolTestResponse</code>

### KnowledgeBases

Types:

- <code><a href="./src/resources/senders/agent/knowledge-bases/knowledge-bases.ts">AgentDocument</a></code>
- <code><a href="./src/resources/senders/agent/knowledge-bases/knowledge-bases.ts">AgentKnowledgeBase</a></code>
- <code><a href="./src/resources/senders/agent/knowledge-bases/knowledge-bases.ts">KnowledgeBaseCreateResponse</a></code>
- <code><a href="./src/resources/senders/agent/knowledge-bases/knowledge-bases.ts">KnowledgeBaseRetrieveResponse</a></code>
- <code><a href="./src/resources/senders/agent/knowledge-bases/knowledge-bases.ts">KnowledgeBaseUpdateResponse</a></code>

Methods:

- <code title="post /v1/senders/{senderId}/agent/knowledge-bases">client.senders.agent.knowledgeBases.<a href="./src/resources/senders/agent/knowledge-bases/knowledge-bases.ts">create</a>(senderID, { ...params }) -> KnowledgeBaseCreateResponse</code>
- <code title="get /v1/senders/{senderId}/agent/knowledge-bases/{kbId}">client.senders.agent.knowledgeBases.<a href="./src/resources/senders/agent/knowledge-bases/knowledge-bases.ts">retrieve</a>(kbID, { ...params }) -> KnowledgeBaseRetrieveResponse</code>
- <code title="patch /v1/senders/{senderId}/agent/knowledge-bases/{kbId}">client.senders.agent.knowledgeBases.<a href="./src/resources/senders/agent/knowledge-bases/knowledge-bases.ts">update</a>(kbID, { ...params }) -> KnowledgeBaseUpdateResponse</code>
- <code title="get /v1/senders/{senderId}/agent/knowledge-bases">client.senders.agent.knowledgeBases.<a href="./src/resources/senders/agent/knowledge-bases/knowledge-bases.ts">list</a>(senderID, { ...params }) -> AgentKnowledgeBasesCursor</code>
- <code title="delete /v1/senders/{senderId}/agent/knowledge-bases/{kbId}">client.senders.agent.knowledgeBases.<a href="./src/resources/senders/agent/knowledge-bases/knowledge-bases.ts">delete</a>(kbID, { ...params }) -> void</code>

#### Documents

Types:

- <code><a href="./src/resources/senders/agent/knowledge-bases/documents.ts">DocumentCreateResponse</a></code>

Methods:

- <code title="post /v1/senders/{senderId}/agent/knowledge-bases/{kbId}/documents">client.senders.agent.knowledgeBases.documents.<a href="./src/resources/senders/agent/knowledge-bases/documents.ts">create</a>(kbID, { ...params }) -> DocumentCreateResponse</code>
- <code title="get /v1/senders/{senderId}/agent/knowledge-bases/{kbId}/documents">client.senders.agent.knowledgeBases.documents.<a href="./src/resources/senders/agent/knowledge-bases/documents.ts">list</a>(kbID, { ...params }) -> AgentDocumentsCursor</code>
- <code title="delete /v1/senders/{senderId}/agent/knowledge-bases/{kbId}/documents/{docId}">client.senders.agent.knowledgeBases.documents.<a href="./src/resources/senders/agent/knowledge-bases/documents.ts">delete</a>(docID, { ...params }) -> void</code>

# Contacts

Types:

- <code><a href="./src/resources/contacts.ts">Contact</a></code>

Methods:

- <code title="get /v1/contacts/{contactId}">client.contacts.<a href="./src/resources/contacts.ts">retrieve</a>(contactID) -> Contact</code>
- <code title="patch /v1/contacts/{contactId}">client.contacts.<a href="./src/resources/contacts.ts">update</a>(contactID, { ...params }) -> Contact</code>
- <code title="get /v1/contacts">client.contacts.<a href="./src/resources/contacts.ts">list</a>({ ...params }) -> ContactsCursor</code>
- <code title="get /v1/contacts/phone/{phoneNumber}">client.contacts.<a href="./src/resources/contacts.ts">retrieveByPhone</a>(phoneNumber) -> Contact</code>

# Broadcasts

Types:

- <code><a href="./src/resources/broadcasts/broadcasts.ts">Broadcast</a></code>
- <code><a href="./src/resources/broadcasts/broadcasts.ts">BroadcastChannel</a></code>
- <code><a href="./src/resources/broadcasts/broadcasts.ts">BroadcastContact</a></code>
- <code><a href="./src/resources/broadcasts/broadcasts.ts">BroadcastContactStatus</a></code>
- <code><a href="./src/resources/broadcasts/broadcasts.ts">BroadcastContent</a></code>
- <code><a href="./src/resources/broadcasts/broadcasts.ts">BroadcastMessageType</a></code>
- <code><a href="./src/resources/broadcasts/broadcasts.ts">BroadcastProgress</a></code>
- <code><a href="./src/resources/broadcasts/broadcasts.ts">BroadcastStatus</a></code>
- <code><a href="./src/resources/broadcasts/broadcasts.ts">BroadcastCreateResponse</a></code>
- <code><a href="./src/resources/broadcasts/broadcasts.ts">BroadcastRetrieveResponse</a></code>
- <code><a href="./src/resources/broadcasts/broadcasts.ts">BroadcastUpdateResponse</a></code>
- <code><a href="./src/resources/broadcasts/broadcasts.ts">BroadcastCancelResponse</a></code>
- <code><a href="./src/resources/broadcasts/broadcasts.ts">BroadcastRescheduleResponse</a></code>
- <code><a href="./src/resources/broadcasts/broadcasts.ts">BroadcastSendResponse</a></code>

Methods:

- <code title="post /v1/broadcasts">client.broadcasts.<a href="./src/resources/broadcasts/broadcasts.ts">create</a>({ ...params }) -> BroadcastCreateResponse</code>
- <code title="get /v1/broadcasts/{broadcastId}">client.broadcasts.<a href="./src/resources/broadcasts/broadcasts.ts">retrieve</a>(broadcastID) -> BroadcastRetrieveResponse</code>
- <code title="patch /v1/broadcasts/{broadcastId}">client.broadcasts.<a href="./src/resources/broadcasts/broadcasts.ts">update</a>(broadcastID, { ...params }) -> BroadcastUpdateResponse</code>
- <code title="get /v1/broadcasts">client.broadcasts.<a href="./src/resources/broadcasts/broadcasts.ts">list</a>({ ...params }) -> BroadcastsCursor</code>
- <code title="delete /v1/broadcasts/{broadcastId}">client.broadcasts.<a href="./src/resources/broadcasts/broadcasts.ts">delete</a>(broadcastID) -> void</code>
- <code title="post /v1/broadcasts/{broadcastId}/cancel">client.broadcasts.<a href="./src/resources/broadcasts/broadcasts.ts">cancel</a>(broadcastID) -> BroadcastCancelResponse</code>
- <code title="get /v1/broadcasts/{broadcastId}/progress">client.broadcasts.<a href="./src/resources/broadcasts/broadcasts.ts">progress</a>(broadcastID) -> BroadcastProgress</code>
- <code title="patch /v1/broadcasts/{broadcastId}/schedule">client.broadcasts.<a href="./src/resources/broadcasts/broadcasts.ts">reschedule</a>(broadcastID, { ...params }) -> BroadcastRescheduleResponse</code>
- <code title="post /v1/broadcasts/{broadcastId}/send">client.broadcasts.<a href="./src/resources/broadcasts/broadcasts.ts">send</a>(broadcastID, { ...params }) -> BroadcastSendResponse</code>

## Contacts

Types:

- <code><a href="./src/resources/broadcasts/contacts.ts">ContactAddResponse</a></code>

Methods:

- <code title="get /v1/broadcasts/{broadcastId}/contacts">client.broadcasts.contacts.<a href="./src/resources/broadcasts/contacts.ts">list</a>(broadcastID, { ...params }) -> BroadcastContactsCursor</code>
- <code title="post /v1/broadcasts/{broadcastId}/contacts">client.broadcasts.contacts.<a href="./src/resources/broadcasts/contacts.ts">add</a>(broadcastID, { ...params }) -> ContactAddResponse</code>
- <code title="delete /v1/broadcasts/{broadcastId}/contacts/{contactId}">client.broadcasts.contacts.<a href="./src/resources/broadcasts/contacts.ts">remove</a>(contactID, { ...params }) -> void</code>

# Introspect

Types:

- <code><a href="./src/resources/introspect.ts">LineType</a></code>
- <code><a href="./src/resources/introspect.ts">IntrospectValidatePhoneResponse</a></code>

Methods:

- <code title="post /v1/introspect/phone">client.introspect.<a href="./src/resources/introspect.ts">validatePhone</a>({ ...params }) -> IntrospectValidatePhoneResponse</code>

# PhoneNumbers

Types:

- <code><a href="./src/resources/phone-numbers.ts">AvailablePhoneNumber</a></code>
- <code><a href="./src/resources/phone-numbers.ts">OwnedPhoneNumber</a></code>
- <code><a href="./src/resources/phone-numbers.ts">OwnedPhoneNumberPricing</a></code>
- <code><a href="./src/resources/phone-numbers.ts">PhoneNumberCapabilities</a></code>
- <code><a href="./src/resources/phone-numbers.ts">PhoneNumberPricing</a></code>
- <code><a href="./src/resources/phone-numbers.ts">PhoneNumberStatus</a></code>
- <code><a href="./src/resources/phone-numbers.ts">PhoneNumberType</a></code>
- <code><a href="./src/resources/phone-numbers.ts">Requirement</a></code>
- <code><a href="./src/resources/phone-numbers.ts">RequirementAcceptanceCriteria</a></code>
- <code><a href="./src/resources/phone-numbers.ts">RequirementFieldType</a></code>
- <code><a href="./src/resources/phone-numbers.ts">RequirementType</a></code>
- <code><a href="./src/resources/phone-numbers.ts">PhoneNumberRetrieveResponse</a></code>
- <code><a href="./src/resources/phone-numbers.ts">PhoneNumberUpdateResponse</a></code>
- <code><a href="./src/resources/phone-numbers.ts">PhoneNumberPurchaseResponse</a></code>
- <code><a href="./src/resources/phone-numbers.ts">PhoneNumberRequirementsResponse</a></code>
- <code><a href="./src/resources/phone-numbers.ts">PhoneNumberSearchAvailableResponse</a></code>

Methods:

- <code title="get /v1/phone-numbers/{phoneNumberId}">client.phoneNumbers.<a href="./src/resources/phone-numbers.ts">retrieve</a>(phoneNumberID) -> PhoneNumberRetrieveResponse</code>
- <code title="patch /v1/phone-numbers/{phoneNumberId}">client.phoneNumbers.<a href="./src/resources/phone-numbers.ts">update</a>(phoneNumberID, { ...params }) -> PhoneNumberUpdateResponse</code>
- <code title="get /v1/phone-numbers">client.phoneNumbers.<a href="./src/resources/phone-numbers.ts">list</a>({ ...params }) -> OwnedPhoneNumbersCursor</code>
- <code title="post /v1/phone-numbers">client.phoneNumbers.<a href="./src/resources/phone-numbers.ts">purchase</a>({ ...params }) -> PhoneNumberPurchaseResponse</code>
- <code title="delete /v1/phone-numbers/{phoneNumberId}">client.phoneNumbers.<a href="./src/resources/phone-numbers.ts">release</a>(phoneNumberID) -> void</code>
- <code title="get /v1/phone-numbers/requirements">client.phoneNumbers.<a href="./src/resources/phone-numbers.ts">requirements</a>({ ...params }) -> PhoneNumberRequirementsResponse</code>
- <code title="get /v1/phone-numbers/available">client.phoneNumbers.<a href="./src/resources/phone-numbers.ts">searchAvailable</a>({ ...params }) -> PhoneNumberSearchAvailableResponse</code>

# Addresses

Types:

- <code><a href="./src/resources/addresses.ts">Address</a></code>
- <code><a href="./src/resources/addresses.ts">AddressStatus</a></code>
- <code><a href="./src/resources/addresses.ts">AddressCreateResponse</a></code>
- <code><a href="./src/resources/addresses.ts">AddressRetrieveResponse</a></code>

Methods:

- <code title="post /v1/addresses">client.addresses.<a href="./src/resources/addresses.ts">create</a>({ ...params }) -> AddressCreateResponse</code>
- <code title="get /v1/addresses/{addressId}">client.addresses.<a href="./src/resources/addresses.ts">retrieve</a>(addressID) -> AddressRetrieveResponse</code>
- <code title="get /v1/addresses">client.addresses.<a href="./src/resources/addresses.ts">list</a>({ ...params }) -> AddressesCursor</code>
- <code title="delete /v1/addresses/{addressId}">client.addresses.<a href="./src/resources/addresses.ts">delete</a>(addressID) -> void</code>

# RegulatoryDocuments

Types:

- <code><a href="./src/resources/regulatory-documents.ts">RegulatoryDocument</a></code>
- <code><a href="./src/resources/regulatory-documents.ts">RegulatoryDocumentCreateResponse</a></code>
- <code><a href="./src/resources/regulatory-documents.ts">RegulatoryDocumentRetrieveResponse</a></code>
- <code><a href="./src/resources/regulatory-documents.ts">RegulatoryDocumentUploadURLResponse</a></code>

Methods:

- <code title="post /v1/documents">client.regulatoryDocuments.<a href="./src/resources/regulatory-documents.ts">create</a>({ ...params }) -> RegulatoryDocumentCreateResponse</code>
- <code title="get /v1/documents/{documentId}">client.regulatoryDocuments.<a href="./src/resources/regulatory-documents.ts">retrieve</a>(documentID) -> RegulatoryDocumentRetrieveResponse</code>
- <code title="get /v1/documents">client.regulatoryDocuments.<a href="./src/resources/regulatory-documents.ts">list</a>({ ...params }) -> RegulatoryDocumentsCursor</code>
- <code title="delete /v1/documents/{documentId}">client.regulatoryDocuments.<a href="./src/resources/regulatory-documents.ts">delete</a>(documentID) -> void</code>
- <code title="post /v1/documents/upload-url">client.regulatoryDocuments.<a href="./src/resources/regulatory-documents.ts">uploadURL</a>() -> RegulatoryDocumentUploadURLResponse</code>
