---
sidebar_position: 3
---

# Gitea

TeXlyre can back up your projects to Gitea repositories using an access token. Tokens are stored encrypted in your browser's local storage and are never transmitted to external servers.

## Generating a Token

Navigate to your Gitea instance at **User Settings → Applications**.

![Gitea access token creation](../../static/img/integration/gitea-token-create.png)

Under **Generate New Token**, enter a descriptive **Token Name** such as `TeXlyre`.

### Repository and Organization Access

Select **All (public, private, and limited)** unless you intend to restrict TeXlyre to public repositories only.

### Required Permissions

Set the following permissions:

| Permission | Level |
|---|---|
| `misc` | Read |
| `notification` | Read |
| `organization` | Read and Write |
| `package` | Read and Write |
| `repository` | Read and Write |
| `user` | Read |

Click **Generate Token** and copy the token immediately — it will not be shown again.

## Adding the Token to TeXlyre

1. Open TeXlyre and navigate to **Backup → Gitea**.
2. Paste your token into the **Gitea Access Token** field.
3. Enter your instance's **base URL** (e.g. `https://gitea.example.com`).
4. Click **Connect**.
5. Select a **repository** (preferably private; must already contain at least one file, e.g. `README.md`, as TeXlyre does not create repositories).
6. Click **Next**.
7. Select a **branch** and click **Connect**.
8. Enter your TeXlyre account password to securely store your token.
9. Click **Unlock**.

:::note Changing the Endpoint
To change the connected repository instance URL, navigate to **Settings → Backup → Gitea**.
:::
