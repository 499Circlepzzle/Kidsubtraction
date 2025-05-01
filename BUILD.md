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

1. Set environment variables for keystore passwords (optional but recommended)
   ```bash
   export KEYSTORE_PASSWORD="your_keystore_password"
   export KEY_PASSWORD="your_key_password"
   ```

2. Build the web assets
   ```bash
   npm run build
   ```

3. Add Android platform (if not already added)
   ```bash
   npx cap add android
   ```

4. Copy web assets to Android project
   ```bash
   npx cap copy android
   ```

5. Generate Release Keystore (if not exists)
   ```bash
   keytool -genkey -v -keystore release.keystore -alias release -keyalg RSA -keysize 2048 -validity 10000
   ```
   
   You'll be prompted to enter keystore information:
   - Full name: Your name or organization
   - Organizational unit: Your team or department
   - Organization: Your company
   - City/Locality: Your city
   - State/Province: Your state
   - Country Code: Your two-letter country code (e.g., US)
   - Password: Create a secure password

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

## App Icons and Splash Screens

For proper store submission, ensure you have all required app icons and splash screens:

1. Icons should be in the `android/app/src/main/res/` directory in various mipmap folders
2. Required icon sizes:
   - mipmap-mdpi: 48x48 px
   - mipmap-hdpi: 72x72 px
   - mipmap-xhdpi: 96x96 px
   - mipmap-xxhdpi: 144x144 px
   - mipmap-xxxhdpi: 192x192 px
   
3. Additional required assets for store listings:
   - Feature graphic: 1024x500 px
   - High-resolution app icon: 512x512 px
   - Screenshots in various device sizes

## Store Submission Requirements

### Common Requirements for Both Stores
1. App icon (512x512 PNG)
2. App screenshots (at least 2-8 depending on store)
3. App description (short and long)
4. Privacy policy URL
5. Content rating questionnaire completion
6. Contact information

### Amazon App Store Specific
1. Sign up for an Amazon Developer account ($99/year fee)
2. Create a new app in the Amazon Developer Console
3. Submit the APK file (`app-release.apk`)
4. Required screenshots:
   - 3-10 screenshots per device type
   - At least 1280px on longest side
5. Amazon AppStore testing program setup (optional)
6. Declaration of any in-app purchases

### Google Play Store Specific
1. Sign up for a Google Play Developer account ($25 one-time fee)
2. Create a new app in the Google Play Console
3. Submit the Android App Bundle (`app-release.aab`)
4. Required for listing:
   - At least 2 screenshots (8 max) for each supported device (phone, tablet, TV)
   - Feature graphic (1024x500)
   - App category and tags
   - Content rating questionnaire
   - Target audience and content designations
   - Google Play App Signing enrollment
5. Consider setting up internal, closed, or open testing tracks

## Privacy Policy and Terms of Service

Both stores require a privacy policy. For an educational app, include:

1. What data is collected (if any)
2. How data is used and stored
3. Parent/guardian consent information (for children's apps)
4. Contact information for privacy concerns

You can create a simple privacy policy and host it on a free service like GitHub Pages.

## Important Notes

1. Keep your keystore file (`release.keystore`) secure - you'll need the same key to update your app
2. Store your keystore password securely (password manager recommended)
3. Test the release build thoroughly before submission
4. Follow each store's specific guidelines for content and metadata
5. Ensure your app meets accessibility guidelines
6. The review process can take several days (1-7+ days depending on the store)
7. Be prepared to make changes based on reviewer feedback

## Troubleshooting

If you encounter build issues:
1. Verify JAVA_HOME is set correctly
2. Ensure Android SDK is properly installed
3. Check Gradle version compatibility
4. Verify all dependencies are installed
5. Review build logs for specific error messages
6. For signing issues, check that the keystore path and passwords are correct
