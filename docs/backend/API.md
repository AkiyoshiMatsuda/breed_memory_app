# API設計
**命名規則**

## user作成
### エンドポイント
POST /users
### 説明
ユーザーの作成
### リクエスト
- header
```
Content-Type: application/json
```
- body
```
{
    "name":"admin",
    "email":"hogehoge@example.com",
    "password":"ad_pass"
}
```
### レスポンス
- 201 created
```
{
    "status":"success",
    "id":1,
    "message":"user created"
}
```
- 400 bad request
```
{
    "status":"error",
    "message":"user create failed."
}
```
## userログイン
### エンドポイント
POST /users/login
### 説明
ユーザーのログイン
### リクエスト
- header
```
Content-Type: application/json
```
- body
```
{
    "email":"hogehoge@example.com",
    "password":"ad_pass"
}
```
### レスポンス
- 200 ok
```
{
    "status":"success",
    "message":"Login correct."
}
```
- 400 bad request
```
{
    "status":"error",
    "message":"Login incorrect."
}
```
## reptiles登録
### エンドポイント
POST /reptiles/
### 説明
生体を登録
### リクエスト
- header
```
Content-Type: application/json
```
- body
```
{
    "user_id":1,
    "name":"テスト",
    "species":"クレステッドゲッコー",
    "morph":"ダルメシアン",
    "birthday":"1111-11-11"
}
```
### レスポンス
- 201 created
```
{
    "status":"success",
    "message":"Registration correct",
    "info":Json.stringify{
        "id":1,
        "name":"テスト",
        "species":"クレステッドゲッコー",
        "morph":"ダルメシアン",
        "birthday":"1111-11-11"
    }
}
```
## reptiles取得
### エンドポイント
GET /users/{user_id}/reptiles
### 説明
生体情報を取得
### リクエスト
- header
```
Content-Type: application/json
```
- body
なし
### レスポンス
- 200 ok
```
{
    "status":"success",
    "message":"Acquisition correct",
    "reptiles":{
        "id":1,
        "name":"テスト",
        "species":"クレステッドゲッコー",
        "morph":"ダルメシアン",
        "birthday":"1111-11-11",
        "arrival_date":"1111-11-11",
        "sex":"male",
        "note":"テスト個体",
        "created_at":"1111-11-11"
    }
}
```
## 体重記録
## 体重取得
## 温湿度記録
## 温湿度取得