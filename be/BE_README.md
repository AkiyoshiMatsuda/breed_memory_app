# データベース設計書
## 要件
### 生体情報
- 種類
- モルフ
- 名前
- お迎え日
- 誕生日
- 写真

### 日々の記録
- 体重
- 温度
- 湿度
- 餌
- 排泄
- 日記

### ユーザー情報
- 名前
- メールアドレス
- パスワード

## エンティティ
- users
- reptiles
- photos
- weight_records（体重記録）
- feeding_records（餌記録）
- environment_records（環境記録）
- excretion_records（排泄記録）
- diary_records（日記記録）

## カラム
### users
- id
- name
- email
- password_hash
- created_at
### reptiles
- id
- user_id
- name
- species
- morph
- birthday
- arrival_date
- sex
- note
- created_at
### photos
- id
- reptile_id
- photo
- recorded_at
- created_at
### weight_records
- id
- reptile_id
- weight
- recorded_at
- created_at
### feeding_records
- id
- reptile_id
- food_name
- amount
- recorded_at
- created_at
### environment_records
- id
- reptile_id
- temperature
- humidity
- recorded_at
- created_at
### excretion_records
- id 
- reptile_id
- number
- recorded_at
- created_at
### diary_records
- id
- reptile_id
- diary
- recorded_at
- created_at

## リレーション
- users 1 --- 多reptiles
- reptile 1 --- 多photos
- reptile 1 --- 多weight_records 
- reptile 1 --- 多feeding_records 
- reptile 1 --- 多environment_records 
- reptile 1 --- 多excretion_records 
- reptile 1 --- 多diary_records 

### 外部キー
- reptiles.user_id -> users.id
- photos.reptile_id -> reptiles.id
- weight_records.reptile_id -> reptiles.id
- feeding_records.reptile_id -> reptiles.id
- environment_records.reptile_id -> reptiles.id
- excretion_records.reptile_id -> reptiles.id
- diary_records.reptile_id -> reptiles.id

## カラムの詳細設計
### users
|カラム名|型|NULL可否|メモ|
|---|---|---|---|
|id|BIGINT|NOT NULL|AUTO INCREMENT|
|name|VARCHAR(255)|NOT NULL||
|email|VARCHAR(255)|NOT NULL||
|password_hash|VARCHAR(255)|NOT NULL||
|created_at|TIMESTAMP|NOT NULL|作成時点で自動で追加するため<br>ユーザー入力は不要|
### reptiles
|カラム名|型|NULL可否|メモ|
|---|---|---|---|
|id|BIGINT|NOT NULL|AUTO INCREMENT|
|user_id|BIGINT|NOT NULL||
|name|VARCHAR(255)|NULL||
|species|VARCHAR(255)|NULL||
|morph|VARCHAR(255)|NULL||
|birthday|DATE|NULL||
|arrival_date|DATE|NOT NULL||
|sex|VARCHAR(20)|NULL||
|note|TAXT|NULL||
|created_at|TIMESTAMP|NOT NULL||
### photos
|カラム名|型|NULL可否|メモ|
|---|---|---|---|
|id|BIGINT|NOT NULL|AUTO INCREMENT|
|reptiles_id|BIGINT|NOT NULL||
|photo|VARCHAR(255)|NULL|画像データはディレクトリなどに格納しurlをDBに保存|
|recorded_at|DATETIME|NOT NULL||
|created_at|TIMESTAMP|NOT NULL||
### weight_records
|カラム名|型|NULL可否|メモ|
|---|---|---|---|
|id|BIGINT|NOT NULL||
|reptile_id|BIGINT|NOT NULL||
|weight_g|FLOAT|NOT NULL||
|recorded_at|DATETIME|NOT NULL||
|created_at|TIMESTAMP|NOT NULL||
### feeding_records
|カラム名|型|NULL可否|メモ|
|---|---|---|---|
|id|BIGINT|NOT NULL||
|reptile_id|BIGINT|NOT NULL||
|food_name|VARCHAR(255)|NOT NULL||
|amount_g|FLOAT|NULL||
|recorded_at|DATETIME|NOT NULL||
|created_at|TIMESTAMP|NOT NULL||
### environment_records
|カラム名|型|NULL可否|メモ|
|---|---|---|---|
|id|BIGINT|NOT NULL||
|reptile_id|BIGINT|NOT NULL||
|temperature|FLOAT|NOT NULL||
|humidity|FLOAT|NOT NULL||
|recorded_at|DATETIME|NOT NULL||
|created_at|TIMESTAMP|NOT NULL||
### excretion_records
|カラム名|型|NULL可否|メモ|
|---|---|---|---|
|id|BIGINT|NOT NULL||
|reptile_id|BIGINT|NOT NULL||
|number|INT|NOT NULL||
|recorded_at|DATETIME|NOT NULL||
|created_at|TIMESTAMP|NOT NULL||
### diary_records
|カラム名|型|NULL可否|メモ|
|---|---|---|---|
|id|BIGINT|NOT NULL||
|reptile_id|BIGINT|NOT NULL||
|diary|TEXT|NOT NULL||
|recorded_at|DATETIME|NOT NULL||
|created_at|TIMESTAMP|NOT NULL||
## SQL文
### users
```
CREATE TABLE users(
id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT 
,name VARCHAR(255) NOT NULL
,email VARCHAR(255) NOT NULL UNIQUE
,password_hash VARCHAR(255) NOT NULL
,created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```
### reptiles
```
CREATE TABLE reptiles(
id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT
,user_id BIGINT NOT NULL
,name VARCHAR(255) 
,species VARCHAR(255) 
,morph VARCHAR(255)
,birthday DATE
,arrival_date DATE NOT NULL
,sex VARCHAR(255)
,note TEXT
,created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
,FOREIGN KEY (user_id) 
    REFERENCES users(id) 
    ON DELETE CASCADE
);
```
### photos
```
CREATE TABLE photos(
id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT
,reptile_id BIGINT NOT NULL
,photo VARCHAR(255) 
,recorded_at DATETIME NOT NULL
,created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
,FOREIGN KEY(reptile_id) 
    REFERENCES reptiles(id)
    ON DELETE CASCADE
);
```
### weight_records
```
CREATE TABLE weight_records(
id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT
,reptile_id BIGINT NOT NULL
,weight_g FLOAT NOT NULL
,recorded_at DATETIME NOT NULL
,created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
,FOREIGN KEY (reptile_id)
    REFERENCES reptiles(id)
    ON DELETE CASCADE
);
```
### feeding_records
```
CREATE TABLE feeding_records(
id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT
,reptile_id BIGINT NOT NULL
,food_name VARCHAR(255) NOT NULL
,amount_g FLOAT 
,recorded_at DATETIME NOT NULL
,created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
,FOREIGN KEY (reptile_id)
    REFERENCES reptiles(id)
    ON DELETE CASCADE
);
```
### environment_records
```
CREATE TABLE environment_records(
id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT
,reptile_id BIGINT NOT NULL
,temperature FLOAT NOT NULL
,humidity FLOAT NOT NULL
,recorded_at DATETIME NOT NULL
,created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
,FOREIGN KEY (reptile_id)
    REFERENCES reptiles(id)
    ON DELETE CASCADE
);
```
### excretion_records
```
CREATE TABLE excretion_records(
id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT
,reptile_id BIGINT NOT NULL
,number INT NOT NULL
,recorded_at DATETIME NOT NULL
,created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
,FOREIGN KEY (reptile_id)
    REFERENCES reptiles(id)
    ON DELETE CASCADE
);
```
### diary_records
```
CREATE TABLE diary_records(
id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT
,reptile_id BIGINT NOT NULL
,diary TEXT NOT NULL
,recorded_at DATETIME NOT NULL
,created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
,FOREIGN KEY (reptile_id)
    REFERENCES reptiles(id)
    ON DELETE CASCADE
);
```