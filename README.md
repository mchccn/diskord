# diskord

### API Routes (prefixed with '/api')

| STATUS | METHOD | ROUTE                                        |
| ------ | ------ | -------------------------------------------- |
| ✅     | POST   | `/auth/login `                               |
| ✅     | PUT    | `/auth/signup `                              |
| ✅     | PATCH  | `/auth/change `                              |
| ✅     | GET    | `/auth/logout `                              |
| ✅     | PATCH  | `/user/appearance `                          |
| ✅     | PATCH  | `/user/profile/username `                    |
| ✅     | PATCH  | `/user/profile/avatar `                      |
| ✅     | PATCH  | `/user/profile/status `                      |
| ✅     | DELETE | `/user/delete `                              |
| ✅     | PATCH  | `/user/servers `                             |
| ❌     | PUT    | `/guilds/new `                               |
| ❌     | POST   | `/guilds/join `                              |
| ❌     | PATCH  | `/guilds/leave/:guild `                      |
| ❌     | DELETE | `/guild/:guild `                             |
| ❌     | PUT    | `/guild/channels/:guild `                    |
| ❌     | PUT    | `/guild/roles/:guild `                       |
| ❌     | DELETE | `/guild/channels/:guild `                    |
| ❌     | DELETE | `/guild/roles/:guild `                       |
| ❌     | PATCH  | `/guild/channel/:channel/:guild `            |
| ❌     | PATCH  | `/guild/roles/:role/:guild `                 |
| ❌     | POST   | `/guild/channels/:channel/:user `            |
| ❌     | DELETE | `/guild/channels/:channel/delete/:user `     |
| ❌     | PUT    | `/guild/channels/:channel/pin/:user `        |
| ❌     | PATCH  | `/guild/channels/:channel/edit/:guild `      |
| ❌     | PATCH  | `/guild/members/:member/roles/add/:guild `   |
| ❌     | PATCH  | `/guild/members/:member/roles/remove/:guild` |
| ❌     | POST   | `/guild/members/:member/kick/:guild `        |
| ❌     | POST   | `/guild/members/:member/ban/:guild `         |
| ❌     | POST   | `/guild/members/:member/unban/:guild `       |
| ❌     | PUT    | `/guild/invites/new/:guild `                 |
| ❌     | DELETE | `/guild/invites/delete/:guild `              |
| ❌     | PUT    | `/friends/request/:user `                    |
| ❌     | PUT    | `/friends/accept/:user `                     |
| ❌     | PATCH  | `/users/block/:user `                        |
| ❌     | PATCH  | `/users/unblock/:user `                      |
| ❌     | POST   | `/users/channels/:user `                     |
| ❌     | DELETE | `/users/channels/delete/:user `              |
| ❌     | PUT    | `/users/channels/pin/:user `                 |
| ❌     | PATCH  | `/users/channels/edit/:user `                |
