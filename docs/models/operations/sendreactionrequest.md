# SendReactionRequest

## Example Usage

```typescript
import { SendReactionRequest } from "@zavu/sdk/models/operations";

let value: SendReactionRequest = {
  messageId: "<id>",
  zavuSender: "sender_12345",
  body: {
    emoji: "👍",
  },
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        | Example                                                                            |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `messageId`                                                                        | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |                                                                                    |
| `zavuSender`                                                                       | *string*                                                                           | :heavy_minus_sign:                                                                 | Optional sender profile ID. If omitted, the project's default sender will be used. | sender_12345                                                                       |
| `body`                                                                             | [models.ReactionRequest](../../models/reactionrequest.md)                          | :heavy_check_mark:                                                                 | N/A                                                                                |                                                                                    |