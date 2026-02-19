---
sidebar_position: 4
---

# Codeberg

TeXlyre can back up your projects to Codeberg repositories using an access token. Codeberg runs on Forgejo. Tokens are stored encrypted in your browser's local storage and are never transmitted to external servers.

## Generating a Token

Navigate to [Codeberg → User Settings → Applications](https://codeberg.org/user/settings/applications).

![Codeberg access token creation](../../static/img/integration/codeberg-token-create.png)

Under **Generate new token**, enter a descriptive **Token name** such as `TeXlyre`.

### Repository and Organization Access

Select **All (public, private, and limited)** unless you intend to restrict TeXlyre to public repositories only.

### Required Permissions

Expand **Select permissions** and set the following:

| Permission | Level |
|---|---|
| `misc` | Read |
| `notification` | Read |
| `organization` | Read and write |
| `package` | Read and write |
| `repository` | Read and write |
| `user` | Read |

Click **Generate token** and copy the token immediately — it will not be shown again.

## Adding the Token to TeXlyre

1. Open TeXlyre and navigate to **Backup → Codeberg**.
2. Paste your token into the **Codeberg Access Token** field.
3. Click **Connect**.
4. Select a **repository** (preferably private; must already contain at least one file, e.g. `README.md`, as TeXlyre does not create repositories).
5. Click **Next**.
6. Select a **branch** and click **Connect**.
7. Enter your TeXlyre account password to securely store your token.
8. Click **Unlock**.

:::note Changing the Endpoint
To change the connected repository endpoint, navigate to **Settings → Backup → Forgejo**.
:::
