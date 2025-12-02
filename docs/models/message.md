# Message

## Example Usage

```typescript
import { Message } from "@zavu/sdk/models";

let value: Message = {
  id: "jd7x2k3m4n5p6q7r8s9t0",
  to: "+56912345678",
  from: "+13125551212",
  senderId: "sender_12345",
  channel: "whatsapp",
  messageType: "audio",
  status: "queued",
  content: {
    mediaUrl: "https://example.com/image.jpg",
    mimeType: "image/jpeg",
    filename: "invoice.pdf",
    templateVariables: {
      "1": "John",
      "2": "ORD-12345",
    },
  },
  createdAt: new Date("2024-06-17T16:16:40.677Z"),
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   | Example                                                                                       |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `id`                                                                                          | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           | jd7x2k3m4n5p6q7r8s9t0                                                                         |
| `to`                                                                                          | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           | +56912345678                                                                                  |
| `from`                                                                                        | *string*                                                                                      | :heavy_minus_sign:                                                                            | N/A                                                                                           | +13125551212                                                                                  |
| `senderId`                                                                                    | *string*                                                                                      | :heavy_minus_sign:                                                                            | N/A                                                                                           | sender_12345                                                                                  |
| `channel`                                                                                     | [models.Channel](../models/channel.md)                                                        | :heavy_check_mark:                                                                            | Delivery channel.                                                                             |                                                                                               |
| `messageType`                                                                                 | [models.MessageType](../models/messagetype.md)                                                | :heavy_check_mark:                                                                            | Type of message. Non-text types are WhatsApp only.                                            |                                                                                               |
| `status`                                                                                      | [models.MessageStatus](../models/messagestatus.md)                                            | :heavy_check_mark:                                                                            | N/A                                                                                           |                                                                                               |
| `text`                                                                                        | *string*                                                                                      | :heavy_minus_sign:                                                                            | Text content or caption.                                                                      |                                                                                               |
| `content`                                                                                     | [models.MessageContent](../models/messagecontent.md)                                          | :heavy_minus_sign:                                                                            | Content for non-text message types (WhatsApp only).                                           |                                                                                               |
| `providerMessageId`                                                                           | *string*                                                                                      | :heavy_minus_sign:                                                                            | Message ID from the delivery provider.                                                        |                                                                                               |
| `errorCode`                                                                                   | *string*                                                                                      | :heavy_minus_sign:                                                                            | N/A                                                                                           |                                                                                               |
| `errorMessage`                                                                                | *string*                                                                                      | :heavy_minus_sign:                                                                            | N/A                                                                                           |                                                                                               |
| `metadata`                                                                                    | Record<string, *string*>                                                                      | :heavy_minus_sign:                                                                            | N/A                                                                                           |                                                                                               |
| `createdAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | N/A                                                                                           |                                                                                               |
| `updatedAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_minus_sign:                                                                            | N/A                                                                                           |                                                                                               |