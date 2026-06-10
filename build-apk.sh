#!/bin/bash

echo "🚀 IR Remote Pro - APK Builder"
echo "================================"

# Sprawdź czy npm jest zainstalowany
if ! command -v npm &> /dev/null; then
    echo "❌ npm nie jest zainstalowany. Zainstaluj Node.js."
    exit 1
fi

# Krok 1: Buduj aplikację web
echo ""
echo "📦 Krok 1/4: Budowanie aplikacji web..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Błąd budowania. Sprawdź błędy powyżej."
    exit 1
fi

echo "✅ Aplikacja web zbudowana!"

# Krok 2: Synchronizuj z Capacitor
echo ""
echo "📱 Krok 2/4: Synchronizacja z Android..."

# Sprawdź czy platforma Android istnieje
if [ ! -d "android" ]; then
    echo "Dodawanie platformy Android..."
    npx cap add android
fi

npx cap copy android
npx cap sync android

echo "✅ Synchronizacja zakończona!"

# Krok 3: Sprawdź czy Android SDK jest dostępne
echo ""
echo "🔍 Krok 3/4: Sprawdzanie Android SDK..."

if [ -z "$ANDROID_HOME" ] && [ -z "$ANDROID_SDK_ROOT" ]; then
    echo "⚠️  ANDROID_HOME nie jest ustawione."
    echo "   Ustaw: export ANDROID_HOME=\$HOME/Android/Sdk"
    echo ""
    echo "📂 Otwieranie w Android Studio..."
    npx cap open android
    echo ""
    echo "W Android Studio:"
    echo "1. Poczekaj na synchronizację Gradle"
    echo "2. Build → Build Bundle(s) / APK(s) → Build APK(s)"
    echo "3. APK będzie w: android/app/build/outputs/apk/debug/"
    exit 0
fi

# Krok 4: Buduj APK przez Gradle
echo ""
echo "🔨 Krok 4/4: Budowanie APK..."

cd android

# Clean i build
./gradlew clean
./gradlew assembleDebug

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ ======================================"
    echo "✅ APK ZBUDOWANE POMYŚLNIE!"
    echo "✅ ======================================"
    echo ""
    echo "📍 Lokalizacja APK:"
    echo "   android/app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    
    # Kopiuj APK do głównego folderu
    if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
        cp app/build/outputs/apk/debug/app-debug.apk ../IR-Remote-Pro.apk
        echo "📦 Skopiowano jako: IR-Remote-Pro.apk"
    fi
else
    echo "❌ Błąd budowania APK. Sprawdź błędy Gradle."
    exit 1
fi
