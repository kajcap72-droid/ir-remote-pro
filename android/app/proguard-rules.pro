# Add project specific ProGuard rules here.

# Capacitor
-keep class com.getcapacitor.** { *; }
-keep class com.irremote.pro.** { *; }

# Keep JavaScript interfaces
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# IR Blaster Plugin
-keep class com.irremote.pro.IRBlasterPlugin { *; }
