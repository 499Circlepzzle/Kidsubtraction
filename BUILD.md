# Building the Android App for Store Submission

This guide explains how to build the Android app package for submission to both Amazon App Store and Google Play Store.

## Prerequisites

1. Install Java Development Kit (JDK) 17 or later
   ```bash
   # For Ubuntu/Debian
   sudo apt install openjdk-17-jdk
   # For macOS
   brew install openjdk@17
   ```

2. Set up JAVA_HOME environment variable
   ```bash
   # Add to your ~/.bashrc or ~/.zshrc
   export JAVA_HOME=/path/to/your/jdk
   export PATH=$JAVA_HOME/bin:$PATH
   ```

3. Install Android Studio and Android SDK
   - Download from: https://developer.android.com/studio
   - During installation, ensure you install:
     - Android SDK
     - Android SDK Platform-Tools
     - Android Build Tools

4. Install Node.js dependencies
   ```bash
   npm install
   ```

## Building the App

1. Build the web assets
   ```bash
   npm run build
   ```

2. Add Android platform (if not already added)
   ```bash
   npx cap add android
   ```

3. Copy web assets to Android project
   ```bash
   npx cap copy android
   ```

4. Generate Release Keystore (if not exists)
   ```bash
   keytool -genkey -v -keystore release.keystore -alias release -keyalg RSA -keysize 2048 -validity 10000
   ```

5. Update signing configuration in `android/app/build.gradle`:
   ```gradle
   android {
     signingConfigs {
       release {
         storeFile file("../../release.keystore")
         storePassword System.getenv("KEYSTORE_PASSWORD")
         keyAlias "release"
         keyPassword System.getenv("KEY_PASSWORD")
       }
     }
   }
   ```

6. Build Release APK and Bundle
   ```bash
   cd android
   # For APK (Amazon App Store)
   ./gradlew assembleRelease
   # For AAB (Google Play Store)
   ./gradlew bundleRelease
   ```

The release builds will be available at:
- APK: `android/app/build/outputs/apk/release/app-release.apk`
- Bundle: `android/app/build/outputs/bundle/release/app-release.aab`

## Store Submission

### Amazon App Store
1. Sign up for an Amazon Developer account
2. Create a new app in the Amazon Developer Console
3. Submit the APK file (`app-release.apk`)
4. Provide required metadata:
   - App title: "Subtraction Practice"
   - Description
   - Screenshots
   - Privacy policy
   - Content rating information

### Google Play Store
1. Sign up for a Google Play Developer account
2. Create a new app in the Google Play Console
3. Submit the Android App Bundle (`app-release.aab`)
4. Provide required metadata:
   - App title: "Subtraction Practice"
   - Description
   - Screenshots
   - Privacy policy
   - Content rating information

## Important Notes

1. Keep your keystore file (`release.keystore`) secure - you'll need the same key to update your app
2. Store your keystore password securely
3. Test the release build thoroughly before submission
4. Follow each store's specific guidelines for content and metadata
5. Ensure your app meets accessibility guidelines
6. Include appropriate privacy policy and terms of service

## Troubleshooting

If you encounter build issues:
1. Verify JAVA_HOME is set correctly
2. Ensure Android SDK is properly installed
3. Check Gradle version compatibility
4. Verify all dependencies are installed
5. Review build logs for specific error messages
