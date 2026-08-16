---
sidebar_position: 1
---

# Account Types

TeXlyre offers flexible account options designed to meet different usage patterns and privacy preferences. Understanding the differences between account types helps you choose the approach that best fits your needs.

## Guest Accounts

Guest accounts provide immediate access to TeXlyre without any registration process. Click "Try as Guest" from the login screen to begin using the platform immediately.

### Guest Account Features

Guest sessions include full access to TeXlyre's core functionality. You can create projects, edit documents, compile LaTeX/Typst, collaborate with others, and use all integrated tools. The editing experience is identical to full accounts, with real-time collaboration, syntax highlighting, and instant compilation.

Guest accounts support file uploads, project organization, and sharing capabilities. You can invite collaborators, participate in shared projects, and use the integrated chat and commenting systems.

### Guest Account Limitations

Guest sessions are temporary by design. A guest account expires 24 hours after it is created, and TeXlyre removes the expired session and its data the next time the application starts. Closing the browser does not end the session early; the 24-hour window continues to run.

File system backup features are disabled for guest accounts. This means you cannot connect TeXlyre to local folders or use automatic synchronization with cloud storage services.

Profile settings, account export, and account deletion are unavailable while using a guest session, since each of those depends on a persistent account. Chelys connection is also unavailable to guests.

Guest users appear as "Guest User" in collaborative sessions, with no chosen username on display. This affects how others see your contributions in shared projects and chat discussions.

### When to Use Guest Accounts

Guest accounts work well for several specific scenarios:

**Exploring TeXlyre**: Try the platform's features before committing to account creation. Guest sessions provide access to all core functionality for evaluation purposes.

**Temporary Projects**: Work on documents that don't require long-term storage, such as quick calculations, temporary collaboration, or one-time document creation.

**Collaborative Participation**: Join someone else's project for brief collaboration periods without needing permanent account setup.

**Public Computer Usage**: Access TeXlyre from shared computers where you don't want to leave persistent data or account information.

:::warning[Session Expiration]
Guest sessions expire 24 hours after creation and their data is removed on the next start. Always export important work before the window closes if you want to preserve it for future use.
:::

## Full Accounts

Full accounts provide persistent storage and access to all TeXlyre features. Account creation requires only a username and password, with email addresses being optional.

### Full Account Benefits

Your projects persist indefinitely in your browser's local storage. This enables long-term project development, complex document workflows, and gradual accumulation of a personal LaTeX/Typst library.

Full accounts unlock file system backup capabilities, allowing you to connect TeXlyre to local folders for automatic synchronization. This feature works with cloud storage services to provide cross-device access and automatic backup.

Customization options become available with full accounts. Set your display name, choose cursor colors for collaboration visibility, and configure persistent preferences for editor behavior and compilation settings.

Full accounts support encrypted storage of API keys and other sensitive information. This enables integration with external services while keeping your credentials in local storage.

### Account Data Storage

TeXlyre stores account records and projects in your browser using IndexedDB, and keeps settings, properties, secrets, and per-user records in local storage. Data remains on your device and isn't transmitted to external servers.

Each browser profile maintains separate account data. Using TeXlyre in different browsers or browser profiles requires separate account creation, account export and import, or a Chelys connection.

### Account Security

Passwords are stored as a SHA-256 digest of the password. The digest never leaves your device, and TeXlyre has no server that could be attacked to obtain it. Anyone with access to your browser profile can read the stored digest, and a SHA-256 digest of a weak or reused password can be recovered from a precomputed table, so choose a password you use nowhere else.

The local storage approach means your account security depends primarily on your device security. Use a strong, unique password, and keep your computer and browser profile secure to protect your TeXlyre data.

## Chelys Accounts

Chelys accounts add a passkey to a full account. The passkey is what allows two devices running TeXlyre to recognise each other as the same person and keep account data in step, with no TeXlyre server involved in the exchange.

### What a Chelys Account Does

Connecting Chelys places your account settings, properties, encrypted secrets, and records in an end-to-end encrypted synchronisation room. Any other device that connects with the same passkey, username, and password joins the same room and receives those stores.

Projects and documents are not part of this synchronisation. Chelys keeps your account configuration consistent across devices; project files continue to travel through file system backup, collaboration URLs, or account export.

### How the Passkey Works

TeXlyre uses the WebAuthn PRF extension. When you enrol, your authenticator creates a discoverable credential for TeXlyre and returns a secret value derived from that credential. The credential itself stays inside the authenticator and cannot be exported.

The room identifier and encryption key are derived from three inputs together: your username, your password, and the value returned by the passkey. All three are required, so the room stays unreachable to anyone holding only your password or only your passkey.

Enrolment requires an authenticator that supports the PRF extension. TeXlyre reports an error during enrolment if the authenticator lacks it.

:::note[Connecting without a passkey]
Chelys can generate a temporary key for devices with no PRF-capable authenticator. Open TeXlyre with that key appended to the URL as `#tempPrf:<key>`, and it substitutes for the passkey when deriving the room. When logged out (no existing session), log in with the same username and password used un Chelys. When logged in an existing session a prompt asks for your password to complete the connection. TeXlyre strips the key from the address bar on load and discards it once the connection is made, keeping only the derived room keys, so the device stays connected across reloads until you disconnect or log out of Chelys. Treat the generated link with `#tempPrf:<key>` as a credential: anyone who has it needs only your username and password to reach the room.
:::

### Connecting Chelys

From the login screen, "Log in to Chelys" prompts for your passkey alongside your username and password. If no matching account exists on the device, TeXlyre offers to create one and enrol a passkey in the same step.

From an existing session, open Profile Settings and use the Chelys connection section. Enrolling asks for your current password to confirm the account, then creates the passkey. If a passkey for that username already exists on the device, use "Log in to Chelys" to reconnect it.

Disconnecting Chelys stops synchronisation and clears the room keys from the device. Your local account, projects, and settings are unaffected.

### Using Chelys on a Second Device

Install or open TeXlyre on the second device and choose "Log in to Chelys" with the same username and password. Select the passkey when prompted. Once the derived room matches, the account stores synchronise.

Passkeys held in a platform authenticator, such as a phone or a password manager that syncs credentials, are the practical way to reach a second device. A passkey bound to one device stays on that device.

:::tip[Chelys and file system backup]
Chelys synchronises account configuration; file system backup synchronises project files. Using both gives cross-device access to settings and documents together.
:::

## Upgrading from Guest to Full Account

Guest sessions can be converted to full accounts at any time without losing current work. TeXlyre preserves all projects, recent changes, and workspace state (properties, settings, and currently opened file or document) during the upgrade process.

### Upgrade Process

Look for upgrade prompts in the interface, or access the upgrade option through the user menu in the top-right corner. The upgrade process requires choosing a username and password for your new account.

During upgrade, TeXlyre automatically transfers all current projects to permanent storage. Your workspace state, including open documents and recent files, remains intact after the upgrade completes.

### Post-Upgrade Features

After upgrading, you immediately gain access to file system backup, persistent settings, profile customization, and Chelys connection. Previously unavailable features become active without requiring application restart or re-login.

Your collaboration identity changes from "Guest User" to your chosen username in future collaborative sessions. Existing collaboration connections remain active during the upgrade process.

## Account Migration

TeXlyre accounts are tied to specific browser profiles. Connecting Chelys keeps account configuration in step across devices, and the platform provides export and import capabilities for moving complete accounts, including projects.

### Export Your Account

Full account exports include your account record, projects, settings, and preferences. Use the "Export Account" option in your profile settings to create a complete backup ZIP file.

Export files are self-contained and can be imported into any TeXlyre instance. This enables migration between browsers, computers, or even different TeXlyre installations.

### Import Process

Import account data using the "Import Account" option from the login screen. Select your exported ZIP file, and TeXlyre will restore all projects and settings to the new browser location.

The import process preserves collaboration URLs, meaning shared projects continue working after migration. However, active collaboration sessions may need to be re-established.

:::tip[Cross-Device Usage]
For regular cross-device usage, combine a Chelys connection for account configuration with file system backup and cloud storage for project files. Export and import suit one-off moves between browsers or machines.
:::

## Privacy Considerations

All three account types maintain TeXlyre's private local-first approach. Your documents and projects never leave your device unless you explicitly share specific projects with collaborators.

Guest accounts provide maximum privacy since the session and its data are removed once the 24-hour window closes. Full accounts store data locally, maintaining privacy while enabling persistence.

Chelys accounts add one exchange over the network, and it carries account configuration only. The room identifier and encryption key are derived on your device from your username, password, and passkey, so the synchronisation room's contents stay readable only to devices holding all three.

The local-first architecture means your data privacy depends on your device security, with no external service policies governing it.
