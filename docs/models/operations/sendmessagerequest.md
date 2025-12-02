# SendMessageRequest

## Example Usage

```typescript
import { SendMessageRequest } from "@zavudev/sdk/models/operations";

let value: SendMessageRequest = {
  zavuSender: "sender_12345",
  body: {
    to: "+56912345678",
    text: "Your verification code is 123456.",
    content: {
      mediaUrl: "https://example.com/image.jpg",
      mimeType: "image/jpeg",
      filename: "invoice.pdf",
      templateVariables: {
        "1": "John",
        "2": "ORD-12345",
      },
    },
    idempotencyKey: "msg_01HZY4ZP7VQY2J3BRW7Z6G0QGE",
  },
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        | Example                                                                            |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `zavuSender`                                                                       | *string*                                                                           | :heavy_minus_sign:                                                                 | Optional sender profile ID. If omitted, the project's default sender will be used. | sender_12345                                                                       |
| `body`                                                                             | [models.MessageRequest](../../models/messagerequest.md)                            | :heavy_check_mark:                                                                 | N/A                                                                                |                                                                                    |