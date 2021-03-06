# diskord

### Todo list:

-   [ ] Implement permissions check for routes
-   [ ] friend/unfriend system
-   [ ] block/unblock system
-   [ ] start on frontend for `/`

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
| ✅     | PUT    | `/guilds/new `                               |
| ✅     | POST   | `/guilds/join `                              |
| ✅     | PATCH  | `/guilds/leave `                             |
| ✅     | DELETE | `/guilds/delete `                            |
| ✅     | PUT    | `/guild/invites/new/ `                       |
| ✅     | DELETE | `/guild/invites/delete/ `                    |
| ✅     | PUT    | `/friends/request/ `                         |
| ✅     | PUT    | `/friends/accept/ `                          |
| ✅     | DELETE | `/friends/remove/ `                          |
| ✅     | DELETE | `/friends/ignore/ `                          |
| ❌     | PATCH  | `/users/block/:user `                        |
| ❌     | PATCH  | `/users/unblock/:user `                      |
| ❌     | POST   | `/users/channels/:user `                     |
| ❌     | DELETE | `/users/channels/delete/:user `              |
| ❌     | PUT    | `/users/channels/pin/:user `                 |
| ❌     | PATCH  | `/users/channels/edit/:user `                |
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
| ❌     | PATCH  | `/guild/members/:member/nickname `           |
