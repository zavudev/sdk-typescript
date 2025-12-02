# PhoneIntrospectionResponse

## Example Usage

```typescript
import { PhoneIntrospectionResponse } from "@zavudev/sdk/models";

let value: PhoneIntrospectionResponse = {
  phoneNumber: "893.596.5518 x232",
  countryCode: "CL",
  validNumber: true,
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            | Example                                                |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `phoneNumber`                                          | *string*                                               | :heavy_check_mark:                                     | N/A                                                    |                                                        |
| `countryCode`                                          | *string*                                               | :heavy_check_mark:                                     | N/A                                                    | CL                                                     |
| `validNumber`                                          | *boolean*                                              | :heavy_check_mark:                                     | N/A                                                    |                                                        |
| `whatsappWindowOpen`                                   | *boolean*                                              | :heavy_minus_sign:                                     | Whether a 24h WhatsApp window is open for this number. |                                                        |