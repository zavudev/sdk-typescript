# Zavudev TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Direct invocation

You can run the MCP Server directly via `npx`:

```sh
export ZAVUDEV_API_KEY="My API Key"
npx -y @zavudev/sdk-mcp@latest
```

### Via MCP Client

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "zavudev_sdk_api": {
      "command": "npx",
      "args": ["-y", "@zavudev/sdk-mcp", "--client=claude", "--tools=dynamic"],
      "env": {
        "ZAVUDEV_API_KEY": "My API Key"
      }
    }
  }
}
```

### Cursor

If you use Cursor, you can install the MCP server by using the button below. You will need to set your environment variables
in Cursor's `mcp.json`, which can be found in Cursor Settings > Tools & MCP > New MCP Server.

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=@zavudev/sdk-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkB6YXZ1ZGV2L3Nkay1tY3AiXSwiZW52Ijp7IlpBVlVERVZfQVBJX0tFWSI6IlNldCB5b3VyIFpBVlVERVZfQVBJX0tFWSBoZXJlLiJ9fQ)

### VS Code

If you use MCP, you can install the MCP server by clicking the link below. You will need to set your environment variables
in VS Code's `mcp.json`, which can be found via Command Palette > MCP: Open User Configuration.

[Open VS Code](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40zavudev%2Fsdk-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40zavudev%2Fsdk-mcp%22%5D%2C%22env%22%3A%7B%22ZAVUDEV_API_KEY%22%3A%22Set%20your%20ZAVUDEV_API_KEY%20here.%22%7D%7D)

### Claude Code

If you use Claude Code, you can install the MCP server by running the command below in your terminal. You will need to set your
environment variables in Claude Code's `.claude.json`, which can be found in your home directory.

```
claude mcp add --transport stdio zavudev_sdk_api --env ZAVUDEV_API_KEY="Your ZAVUDEV_API_KEY here." -- npx -y @zavudev/sdk-mcp
```

## Exposing endpoints to your MCP Client

There are three ways to expose endpoints as tools in the MCP server:

1. Exposing one tool per endpoint, and filtering as necessary
2. Exposing a set of tools to dynamically discover and invoke endpoints from the API
3. Exposing a docs search tool and a code execution tool, allowing the client to write code to be executed against the TypeScript client

### Filtering endpoints and tools

You can run the package on the command line to discover and filter the set of tools that are exposed by the
MCP Server. This can be helpful for large APIs where including all endpoints at once is too much for your AI's
context window.

You can filter by multiple aspects:

- `--tool` includes a specific tool by name
- `--resource` includes all tools under a specific resource, and can have wildcards, e.g. `my.resource*`
- `--operation` includes just read (get/list) or just write operations

### Dynamic tools

If you specify `--tools=dynamic` to the MCP server, instead of exposing one tool per endpoint in the API, it will
expose the following tools:

1. `list_api_endpoints` - Discovers available endpoints, with optional filtering by search query
2. `get_api_endpoint_schema` - Gets detailed schema information for a specific endpoint
3. `invoke_api_endpoint` - Executes any endpoint with the appropriate parameters

This allows you to have the full set of API endpoints available to your MCP Client, while not requiring that all
of their schemas be loaded into context at once. Instead, the LLM will automatically use these tools together to
search for, look up, and invoke endpoints dynamically. However, due to the indirect nature of the schemas, it
can struggle to provide the correct properties a bit more than when tools are imported explicitly. Therefore,
you can opt-in to explicit tools, the dynamic tools, or both.

See more information with `--help`.

All of these command-line options can be repeated, combined together, and have corresponding exclusion versions (e.g. `--no-tool`).

Use `--list` to see the list of available tools, or see below.

### Code execution

If you specify `--tools=code` to the MCP server, it will expose just two tools:

- `search_docs` - Searches the API documentation and returns a list of markdown results
- `execute` - Runs code against the TypeScript client

This allows the LLM to implement more complex logic by chaining together many API calls without loading
intermediary results into its context window.

The code execution itself happens in a Deno sandbox that has network access only to the base URL for the API.

### Specifying the MCP Client

Different clients have varying abilities to handle arbitrary tools and schemas.

You can specify the client you are using with the `--client` argument, and the MCP server will automatically
serve tools and schemas that are more compatible with that client.

- `--client=<type>`: Set all capabilities based on a known MCP client

  - Valid values: `openai-agents`, `claude`, `claude-code`, `cursor`
  - Example: `--client=cursor`

Additionally, if you have a client not on the above list, or the client has gotten better
over time, you can manually enable or disable certain capabilities:

- `--capability=<name>`: Specify individual client capabilities
  - Available capabilities:
    - `top-level-unions`: Enable support for top-level unions in tool schemas
    - `valid-json`: Enable JSON string parsing for arguments
    - `refs`: Enable support for $ref pointers in schemas
    - `unions`: Enable support for union types (anyOf) in schemas
    - `formats`: Enable support for format validations in schemas (e.g. date-time, email)
    - `tool-name-length=N`: Set maximum tool name length to N characters
  - Example: `--capability=top-level-unions --capability=tool-name-length=40`
  - Example: `--capability=top-level-unions,tool-name-length=40`

### Examples

1. Filter for read operations on cards:

```bash
--resource=cards --operation=read
```

2. Exclude specific tools while including others:

```bash
--resource=cards --no-tool=create_cards
```

3. Configure for Cursor client with custom max tool name length:

```bash
--client=cursor --capability=tool-name-length=40
```

4. Complex filtering with multiple criteria:

```bash
--resource=cards,accounts --operation=read --tag=kyc --no-tool=create_cards
```

## Running remotely

Launching the client with `--transport=http` launches the server as a remote server using Streamable HTTP transport. The `--port` setting can choose the port it will run on, and the `--socket` setting allows it to run on a Unix socket.

Authorization can be provided via the `Authorization` header using the Bearer scheme.

Additionally, authorization can be provided via the following headers:
| Header | Equivalent client option | Security scheme |
| ------------------- | ------------------------ | --------------- |
| `x-zavudev-api-key` | `apiKey` | bearerAuth |

A configuration JSON for this server might look like this, assuming the server is hosted at `http://localhost:3000`:

```json
{
  "mcpServers": {
    "zavudev_sdk_api": {
      "url": "http://localhost:3000",
      "headers": {
        "Authorization": "Bearer <auth value>"
      }
    }
  }
}
```

The command-line arguments for filtering tools and specifying clients can also be used as query parameters in the URL.
For example, to exclude specific tools while including others, use the URL:

```
http://localhost:3000?resource=cards&resource=accounts&no_tool=create_cards
```

Or, to configure for the Cursor client, with a custom max tool name length, use the URL:

```
http://localhost:3000?client=cursor&capability=tool-name-length%3D40
```

## Importing the tools and server individually

```js
// Import the server, generated endpoints, or the init function
import { server, endpoints, init } from "@zavudev/sdk-mcp/server";

// import a specific tool
import retrieveMessages from "@zavudev/sdk-mcp/tools/messages/retrieve-messages";

// initialize the server and all endpoints
init({ server, endpoints });

// manually start server
const transport = new StdioServerTransport();
await server.connect(transport);

// or initialize your own server with specific tools
const myServer = new McpServer(...);

// define your own endpoint
const myCustomEndpoint = {
  tool: {
    name: 'my_custom_tool',
    description: 'My custom tool',
    inputSchema: zodToJsonSchema(z.object({ a_property: z.string() })),
  },
  handler: async (client: client, args: any) => {
    return { myResponse: 'Hello world!' };
  })
};

// initialize the server with your custom endpoints
init({ server: myServer, endpoints: [retrieveMessages, myCustomEndpoint] });
```

## Available Tools

The following tools are available in this MCP server.

### Resource `messages`:

- `retrieve_messages` (`read`): Get message by ID
- `list_messages` (`read`): List messages previously sent by this project.
- `react_messages` (`write`): Send an emoji reaction to an existing WhatsApp message. Reactions are only supported for WhatsApp messages.
- `send_messages` (`write`): Send a message to a recipient via SMS or WhatsApp.

  **Channel selection:**

  - If `channel` is omitted and `messageType` is `text`, defaults to SMS
  - If `messageType` is anything other than `text`, WhatsApp is used automatically

  **WhatsApp 24-hour window:**

  - Free-form messages (non-template) require an open 24h window
  - Window opens when the user messages you first
  - Use template messages to initiate conversations outside the window

### Resource `templates`:

- `create_templates` (`write`): Create a WhatsApp message template. Note: Templates must be approved by Meta before use.
- `retrieve_templates` (`read`): Get template
- `list_templates` (`read`): List WhatsApp message templates for this project.
- `delete_templates` (`write`): Delete template

### Resource `senders`:

- `create_senders` (`write`): Create sender
- `retrieve_senders` (`read`): Get sender
- `update_senders` (`write`): Update sender
- `list_senders` (`read`): List senders
- `delete_senders` (`write`): Delete sender

### Resource `contacts`:

- `retrieve_contacts` (`read`): Get contact
- `update_contacts` (`write`): Update contact
- `list_contacts` (`read`): List contacts
- `retrieve_by_phone_contacts` (`read`): Get contact by phone number

### Resource `broadcasts`:

- `create_broadcasts` (`write`): Create a new broadcast campaign. Add contacts after creation, then send.
- `retrieve_broadcasts` (`read`): Get broadcast
- `update_broadcasts` (`write`): Update a broadcast in draft status.
- `list_broadcasts` (`read`): List broadcasts for this project.
- `delete_broadcasts` (`write`): Delete a broadcast in draft status.
- `cancel_broadcasts` (`write`): Cancel a broadcast. Pending contacts will be skipped, but already queued messages may still be delivered.
- `progress_broadcasts` (`read`): Get real-time progress of a broadcast including delivery counts and estimated completion time.
- `send_broadcasts` (`write`): Start sending the broadcast immediately or schedule for later. Reserves the estimated cost from your balance.

### Resource `broadcasts.contacts`:

- `list_broadcasts_contacts` (`read`): List contacts in a broadcast with optional status filter.
- `add_broadcasts_contacts` (`write`): Add contacts to a broadcast in batch. Maximum 1000 contacts per request.
- `remove_broadcasts_contacts` (`write`): Remove a contact from a broadcast in draft status.

### Resource `introspect`:

- `validate_phone_introspect` (`write`): Validate a phone number and check if a WhatsApp conversation window is open.
