# ListTemplatesResponse

List of templates.

## Example Usage

```typescript
import { ListTemplatesResponse } from "@zavudev/sdk/models/operations";

let value: ListTemplatesResponse = {
  items: [
    {
      id: "<id>",
      name: "order_confirmation",
      language: "en",
      body: "Hi {{1}}, your order {{2}} has shipped.",
      category: "UTILITY",
    },
  ],
};
```

## Fields

| Field                                         | Type                                          | Required                                      | Description                                   |
| --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| `items`                                       | [models.Template](../../models/template.md)[] | :heavy_check_mark:                            | N/A                                           |