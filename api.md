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

# Senders

Types:

- <code><a href="./src/resources/senders.ts">Sender</a></code>

Methods:

- <code title="post /v1/senders">client.senders.<a href="./src/resources/senders.ts">create</a>({ ...params }) -> Sender</code>
- <code title="get /v1/senders/{senderId}">client.senders.<a href="./src/resources/senders.ts">retrieve</a>(senderID) -> Sender</code>
- <code title="patch /v1/senders/{senderId}">client.senders.<a href="./src/resources/senders.ts">update</a>(senderID, { ...params }) -> Sender</code>
- <code title="get /v1/senders">client.senders.<a href="./src/resources/senders.ts">list</a>({ ...params }) -> SendersCursor</code>
- <code title="delete /v1/senders/{senderId}">client.senders.<a href="./src/resources/senders.ts">delete</a>(senderID) -> void</code>

# Contacts

Types:

- <code><a href="./src/resources/contacts.ts">Contact</a></code>

Methods:

- <code title="get /v1/contacts/{contactId}">client.contacts.<a href="./src/resources/contacts.ts">retrieve</a>(contactID) -> Contact</code>
- <code title="patch /v1/contacts/{contactId}">client.contacts.<a href="./src/resources/contacts.ts">update</a>(contactID, { ...params }) -> Contact</code>
- <code title="get /v1/contacts">client.contacts.<a href="./src/resources/contacts.ts">list</a>({ ...params }) -> ContactsCursor</code>
- <code title="get /v1/contacts/phone/{phoneNumber}">client.contacts.<a href="./src/resources/contacts.ts">retrieveByPhone</a>(phoneNumber) -> Contact</code>

# Introspect

Types:

- <code><a href="./src/resources/introspect.ts">LineType</a></code>
- <code><a href="./src/resources/introspect.ts">IntrospectValidatePhoneResponse</a></code>

Methods:

- <code title="post /v1/introspect/phone">client.introspect.<a href="./src/resources/introspect.ts">validatePhone</a>({ ...params }) -> IntrospectValidatePhoneResponse</code>
