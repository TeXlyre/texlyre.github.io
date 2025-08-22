---
sidebar_position: 2
---

# Profile Settings

Your TeXlyre profile controls how you appear to collaborators and manages your account preferences. These settings affect your collaboration experience and workspace customization.

## Accessing Profile Settings

Open your profile settings by clicking your username in the top-right corner of the interface, then selecting "Profile Settings" from the dropdown menu. The profile settings dialog provides access to all customizable account options.

Profile settings are only available for full accounts. Guest accounts cannot access these customization options due to their temporary nature.

## Basic Profile Information

### Username

Your username identifies you in collaborative sessions and appears next to your contributions in shared projects. Choose a name that collaborators will recognize and that represents you appropriately in professional contexts.

Usernames can include letters, numbers, spaces, and most special characters. Consider using your real name or a professional handle that colleagues will easily identify.

Changing your username updates your identity in future collaborative sessions but doesn't modify the attribution of past contributions to shared projects.

### Email Address

Email addresses are optional in TeXlyre and serve primarily as a recovery mechanism for your account credentials. TeXlyre doesn't send promotional emails or notifications to the address you provide.

The email field supports standard email validation but doesn't require verification. You can leave this field empty if you prefer not to provide an email address.

Since TeXlyre accounts are local to your browser, the email address cannot be used to access your account from different devices. Account migration requires manual export and import regardless of email configuration.

## Collaboration Identity

### Cursor Colors

TeXlyre assigns unique colors to each collaborator's cursor and text selections during real-time editing sessions. Customize these colors to ensure your contributions are easily visible and distinguishable from other collaborators.

**Dark Theme Color**: This color appears when you're working in TeXlyre's dark theme or when collaborators using dark themes see your cursor. Choose colors that remain visible against dark backgrounds.

**Light Theme Color**: This color displays in light theme contexts. Ensure your light theme color provides good contrast against white and light-colored backgrounds.

Color selection affects only future collaborative sessions. Existing collaboration sessions continue using previously assigned colors until you rejoin the session.

:::tip Color Visibility
Choose colors that are easily distinguishable from common text and background colors. Avoid very light colors that might be hard to see, and consider accessibility for collaborators who may have color vision differences.
:::

### Display Name in Sessions

Your username appears in several collaboration contexts: next to your cursor during editing, in chat messages, in comment threads, and in user lists for shared projects.

This identity helps maintain context during collaborative sessions, especially when multiple people work on the same document simultaneously. Clear identification reduces confusion about who made specific changes or suggestions.

## Password Management

### Changing Your Password

TeXlyre passwords protect your account data and encrypt sensitive information like API keys. To change your password, you must first provide your current password for security verification.

Enter your current password in the designated field, then specify your new password twice to confirm accuracy. New passwords must contain at least six characters, though longer passwords provide better security.

Password changes take effect immediately and apply to all encrypted data in your account. You won't need to re-enter API keys or other secrets after changing your password, as TeXlyre automatically re-encrypts this information.

### Password Security

TeXlyre stores password hashes rather than plain text passwords, providing security even if someone gains access to your browser's storage. However, your project files and documents remain unencrypted in browser storage for performance reasons.

When using TeXlyre on public or shared computers, export your account data and clear TeXlyre's browser storage before leaving. This prevents others from accessing your projects even though they can't discover your password.

The password primarily separates different user accounts on the same device and protects sensitive integrations rather than securing your document content from local access.

## Saving Profile Changes

Profile modifications save automatically when you click "Save Changes" in the settings dialog. The interface provides feedback when changes save successfully or if errors occur during the update process.

Username and email changes apply immediately to your local account. Color customizations become visible in new collaborative sessions after other participants refresh their connections to shared projects.

Password updates require additional verification and may take a moment longer to process while TeXlyre re-encrypts your account's sensitive data.

:::warning Browser Storage
Remember that TeXlyre accounts exist only in your current browser. Profile changes don't synchronize across different browsers or devices unless you manually export and import your account data.
:::

## Profile Limitations

Guest accounts cannot access profile customization options since guest sessions are temporary and don't persist beyond browser closure. Guest users appear with generic identifiers in collaborative sessions.

Full accounts created from guest sessions inherit default profile settings that you can customize immediately after upgrading. The upgrade process preserves your projects while enabling access to profile management features.

Some profile changes, particularly cursor colors, may not appear immediately in active collaborative sessions. Refreshing the project or rejoining the collaboration typically resolves any display inconsistencies.