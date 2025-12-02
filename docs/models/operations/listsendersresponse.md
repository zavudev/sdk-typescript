# ListSendersResponse

List of sender profiles.

## Example Usage

```typescript
import { ListSendersResponse } from "@zavudev/sdk/models/operations";

let value: ListSendersResponse = {
  items: [
    {
      id: "sender_12345",
      name: "Primary sender",
      phoneNumber: "+13125551212",
    },
  ],
};
```

## Fields

| Field                                     | Type                                      | Required                                  | Description                               |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| `items`                                   | [models.Sender](../../models/sender.md)[] | :heavy_check_mark:                        | N/A                                       |