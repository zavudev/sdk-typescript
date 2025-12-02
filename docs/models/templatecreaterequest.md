# TemplateCreateRequest

## Example Usage

```typescript
import { TemplateCreateRequest } from "@zavu/sdk/models";

let value: TemplateCreateRequest = {
  name: "<value>",
  body: "<value>",
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `name`                                                   | *string*                                                 | :heavy_check_mark:                                       | N/A                                                      |
| `language`                                               | *string*                                                 | :heavy_minus_sign:                                       | N/A                                                      |
| `body`                                                   | *string*                                                 | :heavy_check_mark:                                       | N/A                                                      |
| `whatsappCategory`                                       | [models.WhatsAppCategory](../models/whatsappcategory.md) | :heavy_minus_sign:                                       | WhatsApp template category.                              |
| `variables`                                              | *string*[]                                               | :heavy_minus_sign:                                       | N/A                                                      |