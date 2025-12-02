# Sender

## Example Usage

```typescript
import { Sender } from "@zavudev/sdk/models";

let value: Sender = {
  id: "sender_12345",
  name: "Primary sender",
  phoneNumber: "+13125551212",
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   | Example                                                                                       |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `id`                                                                                          | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           | sender_12345                                                                                  |
| `name`                                                                                        | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           | Primary sender                                                                                |
| `phoneNumber`                                                                                 | *string*                                                                                      | :heavy_check_mark:                                                                            | Phone number in E.164 format.                                                                 | +13125551212                                                                                  |
| `isDefault`                                                                                   | *boolean*                                                                                     | :heavy_minus_sign:                                                                            | Whether this sender is the project's default.                                                 |                                                                                               |
| `capabilities`                                                                                | [models.Capabilities](../models/capabilities.md)                                              | :heavy_minus_sign:                                                                            | N/A                                                                                           |                                                                                               |
| `createdAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_minus_sign:                                                                            | N/A                                                                                           |                                                                                               |
| `updatedAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_minus_sign:                                                                            | N/A                                                                                           |                                                                                               |