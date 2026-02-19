---
sidebar_position: 2
---

# GitLab

TeXlyre can back up your projects to GitLab repositories using a personal access token. Tokens are stored encrypted in your browser's local storage and are never transmitted to external servers.

## Generating a Token

Navigate to [GitLab → User Settings → Personal access tokens](https://gitlab.com/-/user_settings/personal_access_tokens).

Click **Add new token**.

![GitLab personal access token creation](../../static/img/integration/gitlab-token-create.png)

Enter a descriptive **Token name** such as `TeXlyre` and set an **Expiration date**.

### Required Scopes

Enable the following scopes:

| Scope | Purpose |
|---|---|
| `read_user` | Read profile information |
| `read_repository` | Read repository contents |
| `write_repository` | Push changes to repositories |
| `api` | Full API access |

Click **Generate token** and copy the token immediately — GitLab will not display it again.

## Adding the Token to TeXlyre

1. Open TeXlyre and navigate to **Backup → GitLab**.
2. Paste your token into the **GitLab Personal Access Token** field.
3. Click **Connect**.
4. Select a **repository** (preferably private; must already contain at least one file, e.g. `README.md`, as TeXlyre does not create repositories).
5. Click **Next**.
6. Select a **branch** and click **Connect**.
7. Enter your TeXlyre account password to securely store your token.
8. Click **Unlock**.

:::note Self-Hosted GitLab
If you use a self-hosted GitLab instance, you can change the API endpoint by navigating to **Settings → Backup → GitLab** and updating the instance URL (e.g. `https://gitlab.example.com`).
:::

:::warning Token Expiry
When your token expires, backups will stop silently. Regenerate your token on GitLab and update it in TeXlyre settings before the expiry date.
:::
