# WITHTRA-FRONTEND

このリポジトリは、WITHTRA-FRONTEND プロジェクトの一部です。以下に、このプロジェクトのセットアップ手順と必要な設定について説明します。

## 必要な設定
プロジェクトを実行するために、様々な .env ファイルが必要です。以下のFirebase関連のキー情報を .env ファイルに入力してください。これらの情報はFirebaseのプロジェクト設定から取得できるものであり、正確な情報を入力することが重要です。

```
VITE_FIREBASE_API_KEY="Your_Firebase_API_Key"
VITE_FIREBASE_AUTH_DOMAIN="Your_Firebase_Auth_Domain"
VITE_FIREBASE_PROJECTID="Your_Firebase_Project_ID"
VITE_FIREBASE_STORAGE_BUCKET="Your_Firebase_Storage_Bucket"
VITE_FIREBASE_API_MESSAGE_SENDER_ID="Your_Firebase_API_Message_Sender_ID"
VITE_FIREBASE_APP_ID="Your_Firebase_App_ID"
VITE_FIREBASE_DATABASE_URL="Your_Firebase_Database_url"
```

## インストール手順
以下の手順に従って、プロジェクトをセットアップしてください。

1. プロジェクトディレクトリに移動します。

    ```shell
    cd WITHTRA-FRONTEND
    ```

2. 必要なモジュールをインストールします。

    ```shell
    npm install
    ```

3. アプリケーションを起動します。

    ```shell
    npm start
    ```
上記コマンドを実行することで、プロジェクトがローカル環境で起動します。ウェブブラウザで http://localhost:5173 にアクセスすると、アプリケーションが表示されます。
