# ListMessagesResponse

List of messages.

## Example Usage

```typescript
import { ListMessagesResponse } from "@zavu/sdk/models/operations";

let value: ListMessagesResponse = {
  items: [
    {
      id: "jd7x2k3m4n5p6q7r8s9t0",
      to: "+56912345678",
      from: "+13125551212",
      senderId: "sender_12345",
      channel: "whatsapp",
      messageType: "document",
      status: "sending",
      content: {
        mediaUrl: "https://example.com/image.jpg",
        mimeType: "image/jpeg",
        filename: "invoice.pdf",
        templateVariables: {
          "1": "John",
          "2": "ORD-12345",
        },
      },
      createdAt: new Date("2024-06-17T20:03:05.799Z"),
    },
  ],
};
```

## Fields

| Field                                       | Type                                        | Required                                    | Description                                 |
| ------------------------------------------- | ------------------------------------------- | ------------------------------------------- | ------------------------------------------- |
| `items`                                     | [models.Message](../../models/message.md)[] | :heavy_check_mark:                          | N/A                                         |
| `nextCursor`                                | *string*                                    | :heavy_minus_sign:                          | N/A                                         |