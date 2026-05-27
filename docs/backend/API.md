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
    "password_hash":"ad_pass"
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
### POST /users/login

## reptiles登録
POST /reptiles/
## 体重記録
## 体重取得
## 温湿度記録
## 温湿度取得