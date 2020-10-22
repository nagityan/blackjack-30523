# README

## usersテーブル
|  Column         |  type    |  Options   |
|   ----          |   ----   |    ----    |
|  nickname       |  string  | null: false|
|  email          |  string  | null: false|
|  password       |  string  | null: false|
|  iamge          |  string  | null: false|

### Association
- has_one :point
- has_one :debt

## assetテーブル
|  Column                     |  type       |  Options                     |
| ----                        | ----        | ----                         |
|  point                      |  integer    | null: false                  |
|  user                       | references  | null: false,foreign_key: true|

### Association
- belongs_to :user


## debtテーブル
|  Column                     |  type       |  Options                     |
| ----                        | ----        | ----                         |
|  point                      |  integer    | null: false                  |
|  user                       | references  | null: false,foreign_key: true|

### Association
- belongs_to :user
