# Firebase App Distribution Setup

## 1. Crear app Android en Firebase

1. Crear un proyecto en Firebase Console.
2. Registrar app Android con package `com.pokedexdemo` (o el package real de tu app).
3. Descargar `google-services.json`.
4. Copiar el archivo en `android/app/google-services.json`.

## 2. Configurar App Distribution

1. En Firebase Console abrir App Distribution.
2. Crear grupo de testers, por ejemplo `qa-usability-testers`.
3. Copiar el App ID de Firebase y usarlo como `YOUR_FIREBASE_APP_ID`.

## 3. Credenciales para CI/CD

1. Crear una Service Account con permisos sobre Firebase App Distribution.
2. Descargar la key JSON.
3. Guardar el contenido en el secreto `FIREBASE_SERVICE_ACCOUNT_JSON`.

## 4. Variables requeridas

- `FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID`
- `FIREBASE_TESTER_GROUPS=qa-usability-testers`
- `ANDROID_KEYSTORE_BASE64=YOUR_ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEYSTORE_PASSWORD=YOUR_ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS=YOUR_ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD=YOUR_ANDROID_KEY_PASSWORD`

## 5. Comandos manuales

Desde la raiz del proyecto:

```bash
npm run build:apk:release
cd android
./gradlew appDistributionUploadRelease -PfirebaseAppId=YOUR_FIREBASE_APP_ID -PfirebaseGroups=qa-usability-testers -PfirebaseServiceCredentialsFile=../firebase-service-account.json
```
