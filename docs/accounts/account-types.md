---
sidebar_position: 1
---

# Account Types

TeXlyre offers flexible account options designed to meet different usage patterns and privacy preferences. Understanding the differences between account types helps you choose the approach that best fits your needs.

## Guest Accounts

Guest accounts provide immediate access to TeXlyre without any registration process. Click "Try as Guest" from the login screen to begin using the platform immediately.

### Guest Account Features

Guest sessions include full access to TeXlyre's core functionality. You can create projects, edit documents, compile LaTeX, collaborate with others, and use all integrated tools. The editing experience is identical to full accounts, with real-time collaboration, syntax highlighting, and instant compilation.

Guest accounts support file uploads, project organization, and sharing capabilities. You can invite collaborators, participate in shared projects, and use the integrated chat and commenting systems.

### Guest Account Limitations

Guest sessions are temporary by design. Your projects and settings exist only for the current browser session and automatically expire after 24 hours or when you close your browser, whichever comes first.

File system backup features are disabled for guest accounts. This means you cannot connect TeXlyre to local folders or use automatic synchronization with cloud storage services.

Guest users appear as "Guest User" in collaborative sessions rather than displaying a chosen username. This affects how others see your contributions in shared projects and chat discussions.

### When to Use Guest Accounts

Guest accounts work well for several specific scenarios:

**Exploring TeXlyre**: Try the platform's features before committing to account creation. Guest sessions provide access to all core functionality for evaluation purposes.

**Temporary Projects**: Work on documents that don't require long-term storage, such as quick calculations, temporary collaboration, or one-time document creation.

**Collaborative Participation**: Join someone else's project for brief collaboration periods without needing permanent account setup.

**Public Computer Usage**: Access TeXlyre from shared computers where you don't want to leave persistent data or account information.

:::warning Session Expiration
Guest sessions automatically expire to protect privacy. Always export important work before ending your session if you want to preserve it for future use.
:::

## Full Accounts

Full accounts provide persistent storage and access to all TeXlyre features. Account creation requires only a username and password, with email addresses being optional for account recovery purposes.

### Full Account Benefits

Your projects persist indefinitely in your browser's local storage. This enables long-term project development, complex document workflows, and gradual accumulation of a personal LaTeX library.

Full accounts unlock file system backup capabilities, allowing you to connect TeXlyre to local folders for automatic synchronization. This feature works with cloud storage services to provide cross-device access and automatic backup.

Customization options become available with full accounts. Set your display name, choose cursor colors for collaboration visibility, and configure persistent preferences for editor behavior and compilation settings.

Full accounts support encrypted storage of API keys and other sensitive information. This enables integration with external services while keeping your credentials secure in local storage.

### Account Data Storage

TeXlyre stores all account data locally in your browser using IndexedDB. This includes projects, settings, preferences, and any encrypted secrets you've configured. Data remains on your device and isn't transmitted to external servers.

Each browser profile maintains separate account data. Using TeXlyre in different browsers or browser profiles requires separate account creation or data export/import.

### Account Security

TeXlyre implements standard security practices for local account management. Passwords are hashed using secure algorithms before storage, and encrypted data uses industry-standard encryption methods.

The local storage approach means your account security depends primarily on your device security. Use strong passwords and keep your computer secure to protect your TeXlyre data.

## Upgrading from Guest to Full Account

Guest sessions can be converted to full accounts at any time without losing current work. TeXlyre preserves all open projects, recent changes, and workspace state during the upgrade process.

### Upgrade Process

Look for upgrade prompts in the interface, or access the upgrade option through the user menu in the top-right corner. The upgrade process requires choosing a username and password for your new account.

During upgrade, TeXlyre automatically transfers all current projects to permanent storage. Your workspace state, including open documents and recent files, remains intact after the upgrade completes.

### Post-Upgrade Features

After upgrading, you immediately gain access to file system backup, persistent settings, and profile customization. Previously unavailable features become active without requiring application restart or re-login.

Your collaboration identity changes from "Guest User" to your chosen username in future collaborative sessions. Existing collaboration connections remain active during the upgrade process.

## Account Migration

TeXlyre accounts are tied to specific browser profiles and cannot be automatically synchronized across devices. However, the platform provides comprehensive export and import capabilities for manual account migration.

### Export Your Account

Full account exports include all projects, settings, preferences, and collaboration history. Use the "Export Account" option in your profile settings to create a complete backup ZIP file.

Export files are self-contained and can be imported into any TeXlyre instance. This enables migration between browsers, computers, or even different TeXlyre installations.

### Import Process

Import account data using the "Import Account" option from the login screen. Select your exported ZIP file, and TeXlyre will restore all projects and settings to the new browser location.

The import process preserves collaboration URLs, meaning shared projects continue working after migration. However, active collaboration sessions may need to be re-established.

:::tip Cross-Device Usage
For regular cross-device usage, consider using file system backup with cloud storage rather than manual export/import. This provides automatic synchronization of project files while maintaining separate account profiles on each device.
:::

## Privacy Considerations

Both account types maintain TeXlyre's privacy-first approach. Your documents and projects never leave your device unless you explicitly share specific projects with collaborators.

Guest accounts provide maximum privacy since no persistent data remains after session expiration. Full accounts store data locally, maintaining privacy while enabling persistence.

Account passwords and any encrypted data use standard security practices. The local-first architecture means your data privacy depends on your device security rather than external service policies.