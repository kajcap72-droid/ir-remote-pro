# 📱 Instrukcja kompilacji IR Remote Pro do APK

## Szybka metoda - Online Build (bez instalacji Android Studio)

### Opcja 1: Użyj Appetize.io lub podobnego serwisu
Wrzuć plik `dist/index.html` na serwis typu Appetize.io, który utworzy instalowalne APK.

### Opcja 2: ApkOnline.net
1. Wejdź na https://www.apkonline.net/
2. Wybierz "Create Android App from HTML"
3. Wrzuć zawartość folderu `dist/`
4. Pobierz gotowy APK

### Opcja 3: WebIntoApp.com
1. Wejdź na https://www.webintoapp.com/
2. Wrzuć plik HTML
3. Skonfiguruj nazwę i ikonę
4. Pobierz APK

---

## Pełna metoda - Android Studio (zalecana dla IR Blaster)

### Wymagania:
- Android Studio (Arctic Fox lub nowszy)
- Java JDK 17+
- Android SDK (API 34)

### Krok 1: Przygotowanie środowiska

```bash
# Sklonuj/pobierz ten projekt
# Zainstaluj zależności
npm install

# Zbuduj aplikację web
npm run build
```

### Krok 2: Synchronizacja Capacitor

```bash
# Inicjalizacja Capacitor (jeśli nie zrobione)
npx cap init "IR Remote Pro" com.irremote.pro

# Dodaj platformę Android
npx cap add android

# Skopiuj pliki web do Android
npx cap copy android

# Synchronizuj zależności
npx cap sync android
```

### Krok 3: Otwórz w Android Studio

```bash
npx cap open android
```

### Krok 4: Zbuduj APK

1. W Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
2. APK znajdziesz w: `android/app/build/outputs/apk/debug/app-debug.apk`

### Krok 5: (Opcjonalnie) Podpisz APK do publikacji

1. **Build → Generate Signed Bundle / APK**
2. Wybierz APK
3. Utwórz nowy keystore lub użyj istniejącego
4. Wybierz release build
5. Gotowy APK do publikacji w Google Play

---

## 🔌 Obsługa IR Blaster

Aplikacja automatycznie wykrywa wbudowany nadajnik IR w telefonie.

### Telefony z IR Blasterem:
- **Xiaomi**: Mi 10, Mi 11, Redmi Note series, POCO
- **Huawei**: Mate/P series (starsze modele)
- **Samsung**: Galaxy S6 i starsze
- **LG**: G3, G4, G5, V20
- **HTC**: One M8, M9
- **Honor**: Niektóre modele
- **Oppo**: Niektóre modele

### Uprawnienia w AndroidManifest.xml:
```xml
<uses-permission android:name="android.permission.TRANSMIT_IR" />
<uses-feature android:name="android.hardware.consumerir" android:required="false" />
```

---

## 📁 Struktura projektu Android

```
android/
├── app/
│   ├── src/main/
│   │   ├── java/com/irremote/pro/
│   │   │   ├── MainActivity.java
│   │   │   └── IRBlasterPlugin.java  ← Plugin IR
│   │   ├── res/
│   │   │   ├── values/
│   │   │   │   ├── strings.xml
│   │   │   │   └── styles.xml
│   │   │   └── xml/
│   │   │       └── file_paths.xml
│   │   └── AndroidManifest.xml
│   └── build.gradle
├── build.gradle
├── settings.gradle
└── gradle.properties
```

---

## 🚀 Szybkie komendy

```bash
# Pełna kompilacja
npm run build && npx cap sync android && npx cap open android

# Tylko kopiuj pliki
npx cap copy android

# Uruchom na urządzeniu (z podłączonym telefonem)
npx cap run android
```

---

## ❓ Rozwiązywanie problemów

### Błąd "SDK not found"
```bash
# Ustaw zmienną środowiskową
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

### Błąd "Java version"
Zainstaluj JDK 17: https://adoptium.net/

### Błąd kompilacji Gradle
```bash
cd android
./gradlew clean
./gradlew build
```

---

## 📦 Gotowy APK

Po zbudowaniu, APK znajdziesz w:
- Debug: `android/app/build/outputs/apk/debug/app-debug.apk`
- Release: `android/app/build/outputs/apk/release/app-release.apk`

Rozmiar APK: ~5-8 MB
