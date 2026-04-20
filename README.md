# Demo Pokedex QA Usabilidad (React Native Bare)

Este repositorio es un demo técnico para defender una propuesta interna: formalizar un flujo de QA de usabilidad en apps mobile Android mediante builds compartibles, sin depender de builds locales ni acceso al repositorio para testers.

La Pokedex es un caso funcional simple para demostrar distribución interna real con Firebase App Distribution.

## 1) Propósito del demo

- Mostrar una app Android funcional y visualmente cuidada.
- Consumir datos reales de [PokeAPI](https://pokeapi.co/).
- Probar un flujo claro de empaquetado y distribución a testers.
- Validar que el equipo puede iterar en QA de usabilidad sin fricción operativa.

## 2) Stack usado

- React Native bare (`0.85.1`) con TypeScript.
- Android como plataforma foco.
- React Navigation (stack nativo).
- Axios para consumo HTTP.
- Firebase App Distribution para distribución interna.
- GitHub Actions como pipeline de referencia.

## 3) Estructura principal

```text
src/
  api/
  components/
  hooks/
  navigation/
  screens/
  services/
  theme/
  types/
  utils/
android/
.github/workflows/
docs/
```

## 4) Instalación

Pre requisitos:

- Node.js `>=20.19.0`
- Java 17
- Android SDK configurado
- Emulador Android o dispositivo físico

Comandos:

```bash
npm install
```

## 5) Correr en Android local

Terminal 1:

```bash
npm start
```

Terminal 2:

```bash
npm run android
```

## 6) Funcionalidad incluida

- Listado de Pokemon con paginación (`load more`).
- Búsqueda por nombre sobre datos cargados.
- Pantalla de detalle con:
  - nombre
  - imagen
  - tipos
  - altura y peso
  - habilidades
  - stats principales
- Loading, empty state, error state y pull to refresh.

## 7) Comandos de build Android

Generar APK debug:

```bash
npm run build:apk:debug
```

Generar APK release:

```bash
npm run build:apk:release
```

Generar AAB release:

```bash
npm run build:aab:release
```

## 8) Integración Firebase (App Distribution)

### Archivos y ubicaciones

- Colocar `google-services.json` en `android/app/google-services.json`.
- Configurar App ID de Firebase: `YOUR_FIREBASE_APP_ID`.
- Configurar grupos de testers: `YOUR_FIREBASE_TESTER_GROUPS`.

### Variables esperadas

Basarse en `.env.example`:

- `ANDROID_PACKAGE_NAME`
- `FIREBASE_APP_ID`
- `FIREBASE_TESTER_GROUPS`
- `FIREBASE_SERVICE_ACCOUNT_JSON`
- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`

### Distribución manual vía Gradle

```bash
cd android
./gradlew appDistributionUploadRelease -PfirebaseAppId=YOUR_FIREBASE_APP_ID -PfirebaseGroups=qa-usability-testers -PfirebaseServiceCredentialsFile=../firebase-service-account.json
```

Guía detallada: `docs/firebase-app-distribution.md`.

## 9) Pipeline CI/CD (GitHub Actions)

Archivo: `.github/workflows/android-firebase-distribution.yml`

Flujo:

1. checkout del repositorio
2. setup Node + Java
3. `npm ci`
4. `npm run lint`
5. `npm run typecheck`
6. habilitar permisos de `gradlew`
7. build APK release
8. publicación de artefacto
9. distribución a Firebase App Distribution

Secrets requeridos en GitHub:

- `FIREBASE_APP_ID`
- `FIREBASE_TESTER_GROUPS`
- `FIREBASE_SERVICE_ACCOUNT_JSON`
- `GOOGLE_SERVICES_JSON` (opcional si se quiere inyectar el archivo desde CI)
- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`

## 10) Pipeline alternativo GitLab

Archivo opcional: `.gitlab-ci.yml`

Incluye etapas:

- `validate`
- `build`
- `distribute`

## 11) Android package y placeholders

El demo usa por defecto:

- `applicationId`: `com.pokedexdemo`

Si se cambia, actualizar:

- `android/app/build.gradle`
- App Android en Firebase (debe coincidir con package final)

Placeholders usados en el repo:

- `YOUR_FIREBASE_APP_ID`
- `YOUR_ANDROID_KEYSTORE_BASE64`
- `YOUR_ANDROID_KEYSTORE_PASSWORD`
- `YOUR_ANDROID_KEY_ALIAS`
- `YOUR_ANDROID_KEY_PASSWORD`

## 12) Cómo presentar este demo ante Tech Leads

Mensaje recomendado:

1. El equipo produce builds Android reproducibles desde CI.
2. QA de usabilidad puede testear sin acceso al repo.
3. Firebase App Distribution centraliza la entrega a grupos de testers.
4. Se habilita una rama/pipeline para feedback temprano y continuo.
5. Se reduce dependencia de builds locales de developers.

Resultado esperado de la propuesta:

- Menor fricción en validación de UX.
- Mayor trazabilidad de versiones probadas.
- Menor tiempo entre cambio y feedback de usabilidad.
