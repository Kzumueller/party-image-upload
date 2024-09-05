# Party Image Upload

## Create a new instance

### Create a firebase project

- Head over to https://console.firebase.google.com/

Store acquired credentials in env file

### Add a service account

- Go to https://console.firebase.google.com/project/PROJECT_ID/settings/serviceaccounts/adminsdk

- Hit "Generate new private key"

- Place generated private key in env file as `GOOGLE_APPLICATION_CREDENTIALS` all in one line. 

### Add a user

- See https://console.firebase.google.com/project/PROJECT_ID/authentication/users

- Select Email/password as provider then switch back to tab "Users" 

### Add a database 

- Generate a new database here: https://console.firebase.google.com/project/PROJECT_ID/firestore

- Add collections `users` and `images`

- Add a user document as follows:

Document ID: user id from Firebase Auth

```JSON

{
  "email": "first.last@gmail.com",
  "permissions": {
    "admin": true,
    "download": true,
    "present":  true,
    "upload": true
  }
}
```

where `permissions` is of type `map`

### Set database rules

As follows:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /images/{document=**} {
      allow read: if get(
      	/databases/(default)/documents/users/$(request.auth.uid)).data.permissions.download;
      allow write: if get(
      	/databases/(default)/documents/users/$(request.auth.uid)).data.permissions.upload;
    }
    match /users/{userId} {
    	allow read, update, delete: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }
    match /users/{document=**} {
      allow read: if get(
      	/databases/(default)/documents/users/$(request.auth.uid)).data.permissions.admin;
      allow write: if get(
      	/databases/(default)/documents/users/$(request.auth.uid)).data.permissions.admin;
    }
  }
}
```

and hit "Publish"

### Set up storage

- Head over to https://console.firebase.google.com/project/PROJECT_ID/storage
- Click the button to set up storage
- Set rules as follows:

```
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
    	allow read: if firestore.get(
      	/databases/(default)/documents/users/$(request.auth.uid)).data.permissions.download;
      allow write: if firestore.get(
      	/databases/(default)/documents/users/$(request.auth.uid)).data.permissions.upload;
    }
  }
}
```

- "Attach permissions" if asked to do so

### Add access to secrets via gcloud

```bash
firebase apphosting:secrets:grantaccess --backend PROJECT_ID SECRET_NAME
```