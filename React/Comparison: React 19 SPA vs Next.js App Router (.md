
| Feature                     | React 19 (SPA)                                    | Next.js (App Router)                                     |
| --------------------------- | ------------------------------------------------- | -------------------------------------------------------- |
| `action` type               | Client function (can also be server if supported) | **Server Action** (`'use server'` in a server component) |
| Submit behavior             | Executes action on client                         | Sends POST request to server                             |
| Server request              | ❌ No (unless manually triggered)                  | ✅ Yes (automatically handled by framework)               |
| Re-render after submit      | ❌ Only if `setState` or similar is called         | ✅ Automatically, based on returned server component tree |
| Data update reflected in UI | ❌ Not unless explicitly updated via client state  | ✅ Yes, re-renders with new server-rendered state         |
| Ideal use case              | Light client-side form logic                      | Server mutations + revalidation of server-rendered data  |

