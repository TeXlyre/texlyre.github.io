---
sidebar_position: 3
---

# Data Management

TeXlyre's local-first architecture puts you in complete control of your data. Understanding how to export, import, and manage your account information ensures you can preserve your work and migrate between devices safely.

## Account Export

### Full Account Export

Export your complete TeXlyre account to create a comprehensive backup containing all projects, settings, and account data. Access this feature through your user dropdown menu by selecting "Export Account."

The export process creates a ZIP file containing your projects, documents, files, collaboration history, settings, and encrypted secrets. This archive preserves everything needed to restore your complete TeXlyre workspace on any compatible browser.

Account exports include metadata about your projects such as creation dates, modification timestamps, tags, and collaboration settings. The export maintains the relationships between documents and files, ensuring linked documents reconnect properly after import.

### Export Scope Options

Choose between exporting your current project only or all projects in your account. Current project export creates smaller files suitable for sharing specific work, while full account export provides comprehensive backup coverage.

The export dialog allows you to exclude certain data types if desired. You can opt to exclude cache files, temporary compilation artifacts, or large binary files that might not be essential for backup purposes.

Consider your export purpose when selecting scope options. Collaboration sharing might only need specific projects, while device migration requires complete account export including settings and preferences.

### Export File Contents

TeXlyre exports contain your projects organized in a structured folder hierarchy that mirrors your workspace organization. Each project includes its documents, linked files, and collaboration metadata in clearly labeled directories.

Settings and preferences export as separate configuration files that restore your customized interface, compilation preferences, and plugin configurations. Encrypted secrets like API keys export in protected form that only your password can decrypt.

The export format remains compatible across TeXlyre versions, ensuring you can restore data even after software updates. Export files use standard ZIP compression that most operating systems can open for inspection.

## Account Import

### Import Process

Import TeXlyre export files through the authentication screen's "Import Account" option. This feature replaces your current account data with the imported information, so ensure you've exported any existing work you want to preserve.

The import process validates the export file structure and checks for compatibility with your current TeXlyre version. Corrupted or incompatible exports generate clear error messages explaining the issue and suggesting resolution steps.

Large export files may take several minutes to import depending on the number of projects and file sizes. The import progress indicator helps you track the process and identify any problems that arise during restoration.

### Import Considerations

Importing an account completely replaces your current TeXlyre data including projects, settings, and user preferences. This destructive process cannot be undone, so carefully consider whether you need to export your current account first.

If you're importing an account created by a different user, you'll gain access to their projects but won't be able to decrypt their personal encrypted secrets like API keys. Shared projects remain accessible with full collaboration capabilities.

Import works best when moving between similar browser environments. Significant differences in browser capabilities or TeXlyre versions might require manual project recreation for optimal compatibility.

### Selective Import Options

Some import scenarios allow selective restoration of specific data types rather than complete account replacement. These options appear during import when TeXlyre detects existing account data that might conflict with imported information.

Project-level import can add imported projects to your existing account without replacing your current projects or settings. This approach works well for incorporating shared work or migrating specific projects between accounts.

Settings import can restore your customized preferences without affecting your projects. This option helps maintain consistent workspace configuration across different TeXlyre installations.

## Cross-Device Migration

### Migration Strategy

Moving your TeXlyre account between devices requires manual export and import since account data doesn't synchronize automatically. Plan migrations carefully to ensure you capture all necessary data before switching devices.

Export your complete account from the source device, including all projects and settings. Transfer the export file to your target device using email, cloud storage, or direct file transfer methods.

Import the account data on your target device after installing and briefly configuring TeXlyre. The import process recreates your complete workspace including projects, preferences, and collaboration settings.

### Browser Compatibility

TeXlyre functions consistently across different browsers, but some advanced features like file system backup require specific browser capabilities. Consider these limitations when migrating between different browser environments.

Chrome and Edge provide the most complete TeXlyre experience with full file system integration and advanced collaboration features. Firefox offers excellent collaboration but with limited file system backup capabilities.

Safari and mobile browsers support core TeXlyre functionality but may have reduced feature sets. Test critical workflows after migration to ensure your required features work properly in the new environment.

### Migration Verification

After importing your account on a new device, verify that all projects opened correctly and linked documents maintain their connections. Check that compilation settings and LaTeX/Typst engines work as expected in the new environment.

Test collaboration features by joining existing shared projects or creating test collaborations. Ensure your cursor colors and identity settings transferred correctly and that real-time editing functions properly.

Verify that any configured integrations like GitHub tokens or bibliography services work correctly after migration. You may need to re-enter some encrypted credentials if migration occurs between significantly different environments.

## Account Deletion

### Deletion Process

Account deletion permanently removes all your TeXlyre data including projects, files, documents, settings, and collaboration history. Access this feature through Profile Settings, but consider the irreversible nature of this action.

The deletion process requires your current password for security verification and asks you to type a confirmation phrase to prevent accidental deletions. These safeguards ensure you fully understand the consequences of account removal.

Deletion removes all data from your browser's storage including project databases, cached files, and configuration settings. This process cannot be undone, and deleted data cannot be recovered through TeXlyre's interface.

### Before Deletion

Export your account data before deletion if you might want to preserve any projects or settings for future use. Account exports create complete backups that you can import later if you change your mind about deletion.

Consider whether you have active collaborations that might be affected by your account deletion. While shared projects continue existing for other collaborators, your contributions and identity within those projects will be preserved but no longer editable by you.

Review any external integrations or API keys you've configured in TeXlyre. Account deletion removes access to these credentials, so ensure you have alternative access methods if needed.

### Post-Deletion Cleanup

After account deletion, TeXlyre removes all traces of your data from browser storage. However, collaborators in shared projects retain access to content you contributed before deletion.

If you used TeXlyre on shared or public computers, account deletion provides a clean way to ensure your data doesn't remain accessible to other users of those devices.

Creating a new TeXlyre account after deletion starts completely fresh with no connection to your previous account or projects. You'll need to import exported data or recreate projects manually if you want to restore previous work.

:::warning Data Recovery
Deleted TeXlyre accounts cannot be recovered. The deletion process permanently removes all data with no backup or recovery options available through the interface. Always export important data before proceeding with account deletion.
:::