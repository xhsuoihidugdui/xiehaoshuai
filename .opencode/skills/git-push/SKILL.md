---
name: git-push
description: 提交项目到Gitee。使用git commit并push当前项目到https://gitee.com/jie-haoshuai/xiehaishuai110.git。当用户说"提交项目"、"push到gitee"、"git push"、"推送到码云"时使用此skill。
---

# 提交项目到Gitee

将当前项目提交并推送到 Gitee 远程仓库。

## 远程仓库

- HTTPS: `https://gitee.com/jie-haoshuai/xiehaishuai110.git`
- SSH: `git@gitee.com:jie-haoshuai/xiehaishuai110.git`（推荐，已配置）

## 步骤

1. 检查当前 git 状态：`git status`
2. 暂存所有更改：`git add -A`
3. 提交：`git commit -m "提交项目"`
4. 推送到远程：`git push origin master`

## 远程地址配置

如果远程地址是HTTPS（需要密码认证），切换为SSH：

```bash
git remote set-url origin git@gitee.com:jie-haoshuai/xiehaishuai110.git
```

## 常见问题

### Host key verification failed

首次SSH连接时可能出现，使用以下命令自动接受host key：

```bash
git -c core.sshCommand="ssh -o StrictHostKeyChecking=no" push origin master
```

### 推送被拒绝（远程有新提交）

```bash
git pull --rebase origin master
git push origin master
```

## 注意事项

- 提交信息使用中文
- 不要提交敏感信息（密码、密钥等）
- 推送前确保本地提交成功
- SSH密钥位于 `~/.ssh/id_ed25519.pub`，需已添加到Gitee账户
