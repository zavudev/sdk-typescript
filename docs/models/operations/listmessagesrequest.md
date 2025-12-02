# ListMessagesRequest

## Example Usage

```typescript
import { ListMessagesRequest } from "@zavudev/sdk/models/operations";

let value: ListMessagesRequest = {};
```

## Fields

| Field                                                 | Type                                                  | Required                                              | Description                                           |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `status`                                              | [models.MessageStatus](../../models/messagestatus.md) | :heavy_minus_sign:                                    | N/A                                                   |
| `to`                                                  | *string*                                              | :heavy_minus_sign:                                    | N/A                                                   |
| `channel`                                             | [models.Channel](../../models/channel.md)             | :heavy_minus_sign:                                    | Delivery channel.                                     |
| `limit`                                               | *number*                                              | :heavy_minus_sign:                                    | N/A                                                   |
| `cursor`                                              | *string*                                              | :heavy_minus_sign:                                    | N/A                                                   |