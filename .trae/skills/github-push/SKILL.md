---
name: github-push
description: 提交项目到 GitHub。使用 git commit 并 push 当前项目到 git@github.com:xhsuoihidugdui/xiehaoshuai.git。当用户说"提交到github"、"push到github"、"推送到github"、"提交github项目"时使用此skill。
---

# 提交项目到 GitHub

将当前项目提交并推送到 GitHub 远程仓库。

## 远程仓库

- HTTPS: `https://github.com/xhsuoihidugdui/xiehaoshuai.git`
- SSH: `git@github.com:xhsuoihidugdui/xiehaoshuai.git`（推荐，公钥已配置）

## 前置检查（先执行）

- 先查看当前 remote：`git remote -v`
- 若 remote 不是上述 GitHub 地址，先切换：
  ```bash
  git remote set-url origin git@github.com:xhsuoihidugdui/xiehaoshuai.git
  ```
- 验证 SSH 可用性：`ssh -T git@github.com`（若首次连接会提示接受 host key，输入 yes）

## 步骤

1. 检查状态：`git status`
2. 暂存：`git add -A`
3. 提交：`git commit -m "中文提交信息"`
4. 推送：`git push origin master`
   - 若默认分支是 main：`git push origin main`

## 常见问题

### Permission denied (publickey)

公钥未加载或未添加到 GitHub。引导用户执行 `ssh-add ~/.ssh/id_ed25519` 或检查 GitHub → Settings → SSH keys。

### 远程有新提交（非 fast-forward）

```bash
git pull --rebase origin master
git push origin master
```

### Host key verification failed

首次连接：
```bash
git -c core.sshCommand="ssh -o StrictHostKeyChecking=no" push origin master
```

## 注意事项

- 提交信息使用中文
- 不要提交敏感信息（密码、密钥等）
- 推送前确保本地 commit 成功
- SSH 密钥默认位于 `~/.ssh/id_ed25519.pub`，需已添加到 GitHub 账户
