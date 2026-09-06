---
sidebar_position: 1
---

# Sharing Projects

A TeXlyre project is shared by handing someone its link. Anyone holding the link can open the project and edit it. Collaboration runs directly between browsers, and a shared project is never uploaded to a TeXlyre server.

## Creating a Share Link

Open a project and click the **Share** button in the editor header. The dialog shows the project link with a copy button and a QR code for handing the project to a phone or tablet.

The link is your TeXlyre address followed by the project identifier as a fragment:

```
https://texlyre.org/#yjs:8f2c1e40-9b77-4a31-8d6e-0f1a2b3c4d5e
```

:::danger[The link is the credential]
The fragment contains the project identifier, which is the only thing needed to join. Anyone who obtains the link can read and modify every document and file in the project for as long as it is shared. Treat it like a password and share it over a channel you trust.
:::

Links can point at a specific place in the project by appending fragments: `&doc:<documentId>` opens a document and `&file:<path>` opens a file. TeXlyre generates these when you copy a link from an open document.

## Joining a Shared Project

Opening a share link brings up the login screen with the project already targeted. Collaborators can click **Try as Guest** and start editing without registering; the project appears in their dashboard once they are in a session. A guest session expires 24 hours after it is created, so collaborators who intend to keep the project should create a full account or export it before then.

## Data Shared Between Collaborators

Documents synchronise through Yjs, a CRDT that merges concurrent edits without a central authority. Every collaborator sees live cursors, selections, and text as it is typed, and simultaneous edits to the same paragraph resolve automatically.

Chat, comments, and tracked changes ride on the same connection. The chat panel is per-project and persists with it, comments attach to positions in a document, and the **Changes** panel collects tracked edits that can be accepted, rejected, or resolved individually or in bulk.

Files that are not linked to a document, such as images and data, are not part of the document sync. They travel over a separate peer-to-peer file transfer described in [File Synchronization](#file-synchronization) below.

Your account settings, properties, and encrypted secrets are never shared. API keys and backup tokens stay on your device.

## The Collaboration Indicator

The collaboration status indicator in the editor header reports the state of the connection and opens the collaboration, file sync, and shared tools dialogs. **Sync All Documents** forces a full resynchronisation of every document in the project, which is the first thing to try when a collaborator appears to be seeing stale content.

## Connection Providers

By default TeXlyre connects peers over WebRTC, using a signalling server only to introduce browsers to each other. Document content flows directly between peers and never reaches the signalling server.

Where WebRTC is blocked, typically by a restrictive network, switch to a server-based connection in <SettingsPath path="Connectivity > Real-time Synchronization > Connection provider" />. WebRTC uses <SettingsPath path="Connectivity > Real-time Synchronization > Signaling servers (WebRTC)" /> and WebSocket uses <SettingsPath path="Connectivity > Real-time Synchronization > WebSocket server" />; both accept your own server if you run one.

Two further settings affect how the session behaves on an unstable link: <SettingsPath path="Connectivity > Real-time Synchronization > Awareness timeout (seconds)" /> controls how long a silent collaborator is still shown as present, and <SettingsPath path="Connectivity > Real-time Synchronization > Auto-reconnect on disconnect" /> reconnects automatically after a drop.

:::note[Everyone must agree]
Peers only meet if they use the same provider and the same server. If you point a project at a self-hosted signalling or WebSocket server, every collaborator has to change the setting too.
:::

## File Synchronization

Non-linked files are exchanged by a separate peer-to-peer transfer, enabled with <SettingsPath path="Connectivity > File Synchronization > Enable file synchronization with peers" />. TeXlyre compares modification times and content checksums, transfers only what differs, and skips system and temporary files.

When two collaborators change the same file, the outcome depends on <SettingsPath path="Connectivity > File Synchronization > Conflict resolution strategy" />:

| Strategy | Behaviour |
|---|---|
| Prefer Latest (Default) | The most recently modified copy wins |
| Prefer Local (Do nothing) | Your copy is kept and the remote change is ignored |
| Notify of Conflicts | Nothing is overwritten; you are notified and choose |

<SettingsPath path="Connectivity > File Synchronization > Auto-sync interval (seconds)" /> sets how often TeXlyre checks for changes. Transfers are brokered by a FilePizza server, configurable at <SettingsPath path="Connectivity > File Synchronization > FilePizza server URL" />.

## Sharing Tools

Local typesetters and language servers configured through Chelys can be offered to collaborators alongside the project. Tick **Share tools used in this project** in the share dialog, and collaborators see the offer in the **Shared Tools** dialog, where they can accept it, keep their own configuration, or ignore it. Tools that depend on something only reachable from your machine are marked as unavailable and are not advertised.

## Working Offline

Collaboration can be suspended without leaving the project. <SettingsPath path="Connectivity > Offline Mode > Force collaboration offline" /> keeps the editor working locally while disconnecting from peers, and <SettingsPath path="Connectivity > Offline Mode > Force app offline" /> takes the whole application offline. For environments that must make no outbound requests at all, <SettingsPath path="Connectivity > Offline Mode > Air-gap collaboration and remote preview content" /> blocks collaboration traffic together with remote content in previews.

Edits made while offline are retained and merge into the shared state when the connection returns.

## Sharing Without a Live Session

Real-time collaboration suits work happening at the same time. For handing over a finished project, sending it to someone who does not need edit access, or keeping a durable copy, use a project export from the project menu, [Git synchronization](../git-synchronization), or [file system backup](../projects/data-management) instead.