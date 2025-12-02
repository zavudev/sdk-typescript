# Template

## Example Usage

```typescript
import { Template } from "@zavu/sdk/models";

let value: Template = {
  id: "<id>",
  name: "order_confirmation",
  language: "en",
  body: "Hi {{1}}, your order {{2}} has shipped.",
  category: "MARKETING",
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   | Example                                                                                       |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `id`                                                                                          | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |                                                                                               |
| `name`                                                                                        | *string*                                                                                      | :heavy_check_mark:                                                                            | Template name (must match WhatsApp template name).                                            | order_confirmation                                                                            |
| `language`                                                                                    | *string*                                                                                      | :heavy_check_mark:                                                                            | Language code.                                                                                | en                                                                                            |
| `body`                                                                                        | *string*                                                                                      | :heavy_check_mark:                                                                            | Template body with variables: {{1}}, {{2}}, etc.                                              | Hi {{1}}, your order {{2}} has shipped.                                                       |
| `category`                                                                                    | [models.WhatsAppCategory](../models/whatsappcategory.md)                                      | :heavy_check_mark:                                                                            | WhatsApp template category.                                                                   |                                                                                               |
| `status`                                                                                      | [models.Status](../models/status.md)                                                          | :heavy_minus_sign:                                                                            | N/A                                                                                           |                                                                                               |
| `variables`                                                                                   | *string*[]                                                                                    | :heavy_minus_sign:                                                                            | List of variable names for documentation.                                                     |                                                                                               |
| `createdAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_minus_sign:                                                                            | N/A                                                                                           |                                                                                               |
| `updatedAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_minus_sign:                                                                            | N/A                                                                                           |                                                                                               |