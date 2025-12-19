# Focus: Digital Wellness — APK Build Guide

Follow these steps to convert this React project into a production-ready Android APK.

## Prerequisites
- **Node.js**: [Download](https://nodejs.org/)
- **Android Studio**: [Download](https://developer.android.com/studio)
- **Java JDK 17**: Required for modern Android builds.

## Step 1: Initialize Project
Open your terminal and run:
```bash
# Create a new Vite + React project
npm create vite@latest focus-app -- --template react-ts
cd focus-app

# Install dependencies
npm install
npm install @capacitor/core @capacitor/android @capacitor/cli lucide-react recharts

# Initialize Capacitor
npx cap init Focus "in.netio.focus" --web-dir dist
npx cap add android
```

## Step 2: Copy App Files
Replace the contents of the `src/` folder in your new project with the files provided in this editor.

## Step 3: Implement the Native Bridge (The Secret Sauce)
For this app to monitor other apps, you need a **Kotlin Accessibility Service**.

1. Open the project in **Android Studio**.
2. Navigate to `app/src/main/java/in/netio/focus/`.
3. Create a new file `FocusService.kt`:

```kotlin
package in.netio.focus

import android.accessibilityservice.AccessibilityService
import android.view.accessibility.AccessibilityEvent
import android.content.Intent

class FocusService : AccessibilityService() {
    override fun onAccessibilityEvent(event: AccessibilityEvent) {
        if (event.eventType == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) {
            val packageName = event.packageName?.toString() ?: return
            
            // Send a broadcast to the React app
            val intent = Intent("APP_LAUNCHED")
            intent.putExtra("packageName", packageName)
            sendBroadcast(intent)
        }
    }
    override fun onInterrupt() {}
}
```

4. Register the service in `AndroidManifest.xml`:
```xml
<service android:name=".FocusService"
    android:permission="android.permission.BIND_ACCESSIBILITY_SERVICE"
    android:exported="true">
    <intent-filter>
        <action android:name="android.accessibilityservice.AccessibilityService" />
    </intent-filter>
    <meta-data android:name="android.accessibilityservice" android:resource="@xml/accessibility_service_config" />
</service>
```

## Step 4: Build & Run
```bash
# Build the web assets
npm run build

# Sync with Android
npx cap sync

# Open Android Studio to build the APK
npx cap open android
```

## Step 5: Testing on Phone
1. Enable **Developer Options** on your phone.
2. Enable **USB Debugging**.
3. Plug in your phone and click **Run** in Android Studio.
4. **CRITICAL**: Go to Phone Settings -> Accessibility -> Focus -> Turn ON.
