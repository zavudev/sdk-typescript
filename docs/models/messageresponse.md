# MessageResponse

## Example Usage

```typescript
import { MessageResponse } from "@zavu/sdk/models";

let value: MessageResponse = {
  message: {
    id: "jd7x2k3m4n5p6q7r8s9t0",
    to: "+56912345678",
    from: "+13125551212",
    senderId: "sender_12345",
    channel: "sms",
    messageType: "audio",
    status: "delivered",
    content: {
      mediaUrl: "https://example.com/image.jpg",
      mimeType: "image/jpeg",
      filename: "invoice.pdf",
      templateVariables: {
        "1": "John",
        "2": "ORD-12345",
      },
    },
    createdAt: new Date("2024-09-15T22:37:05.512Z"),
  },
};
```

## Fields

| Field                                  | Type                                   | Required                               | Description                            |
| -------------------------------------- | -------------------------------------- | -------------------------------------- | -------------------------------------- |
| `message`                              | [models.Message](../models/message.md) | :heavy_check_mark:                     | N/A                                    |