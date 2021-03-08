# diskord

#### Implement permissions for routes.

#### Add websocket pings when a state is updated.

### Routes

| STATUS | ROUTE    |
| ------ | -------- |
| ✅     | `/ `     |
| ❌     | `/app `  |
| ❌     | `/docs ` |

### API Routes (prefixed with '/api')

| STATUS | METHOD | ROUTE                                              |
| ------ | ------ | -------------------------------------------------- |
| ✅     | POST   | `/auth/login `                                     |
| ✅     | PUT    | `/auth/signup `                                    |
| ✅     | PATCH  | `/auth/change `                                    |
| ✅     | GET    | `/auth/logout `                                    |
| ✅     | PATCH  | `/user/appearance `                                |
| ✅     | PATCH  | `/user/profile/username `                          |
| ✅     | PATCH  | `/user/profile/avatar `                            |
| ✅     | PATCH  | `/user/profile/status `                            |
| ✅     | DELETE | `/user/delete `                                    |
| ✅     | PATCH  | `/user/servers `                                   |
| ✅     | PUT    | `/guilds/new `                                     |
| ✅     | POST   | `/guilds/join `                                    |
| ✅     | PATCH  | `/guilds/leave `                                   |
| ✅     | DELETE | `/guilds/delete `                                  |
| ✅     | PUT    | `/guild/invites/new `                              |
| ✅     | DELETE | `/guild/invites/delete `                           |
| ✅     | PATCH  | `/users/block/:user `                              |
| ✅     | PATCH  | `/users/unblock/:user `                            |
| ❌     | PUT    | `/guild/:guild/channels `                          |
| ❌     | PUT    | `/guild/:guild/roles `                             |
| ❌     | DELETE | `/guild/:guild/channels/delete `                   |
| ❌     | DELETE | `/guild/:guild/roles/delete `                      |
| ❌     | PATCH  | `/guild/:guild/channels/:channel `                 |
| ❌     | PATCH  | `/guild/:guild/roles/:role `                       |
| ❌     | POST   | `/guild/:guild/channels/:channel/messages `        |
| ❌     | DELETE | `/guild/:guild/channels/:channel/messages/delete ` |
| ❌     | PUT    | `/guild/:guild/channels/:channel/messages/pin `    |
| ❌     | PATCH  | `/guild/:guild/channels/:channel/messages/edit `   |
| ❌     | PATCH  | `/guild/:guild/members/:member/roles/add `         |
| ❌     | PATCH  | `/guild/:guild/members/:member/roles/remove`       |
| ❌     | POST   | `/guild/:guild/members/:member/kick `              |
| ❌     | POST   | `/guild/:guild/members/:member/ban`                |
| ❌     | POST   | `/guild/:guild/members/:member/unban `             |
| ❌     | PATCH  | `/guild/:guild/members/:member/nickname `          |
