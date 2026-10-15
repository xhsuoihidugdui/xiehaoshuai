---
name: git-push
description: 提交项目到Gitee。使用git commit并push当前项目到https://gitee.com/jie-haoshuai/xiehaishuai110.git。当用户说"提交项目"、"push到gitee"、"git push"、"推送到码云"时使用此skill。
---

# Git Push to Gitee

将当前项目提交并推送到 Gitee 仓库：`https://gitee.com/jie-haoshuai/xiehaishuai110.git`

## 步骤

1. 如果当前目录不是 git 仓库，先执行 `git init`
2. 添加远程仓库（如果不存在）：`git remote add origin https://gitee.com/jie-haoshuai/xiehaishuai110.git`
   - 如果已存在，使用 `git remote set-url origin https://gitee.com/jie-haoshuai/xiehaishuai110.git`
3. 检查 `git status` 确认变更内容
4. `git add .`
5. `git commit -m "<提交信息>"`
   - 提交信息用中文，简明描述本次变更内容
   - 如果是首次提交，使用 "init: 初始化项目"
6. `git push -u origin master`（或根据实际分支名使用 `main`）

## 注意事项

- 如果 push 被拒绝（远程有新提交），先 `git pull --rebase origin <branch>` 再 push
- 首次推送可能需要输入 Gitee 用户名和密码（或使用已配置的 SSH key）
- 不要提交敏感文件（密码、token等）
