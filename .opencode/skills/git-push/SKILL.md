---
name: git-push
description: 提交项目到Gitee。使用git commit并push当前项目到https://gitee.com/jie-haoshuai/xiehaishuai110.git。当用户说"提交项目"、"push到gitee"、"git push"、"推送到码云"时使用此skill。
---

# 提交项目到Gitee

将当前项目提交并推送到 Gitee 远程仓库。

## 远程仓库

```
https://gitee.com/jie-haoshuai/xiehaishuai110.git
```

## 步骤

1. 检查当前 git 状态：`git status`
2. 暂存所有更改：`git add -A`
3. 提交：`git commit -m "提交项目"`
4. 推送到远程：`git push origin master`

如果推送失败（远程仓库有更新），先执行 `git pull --rebase origin master` 再重试推送。

## 注意事项

- 提交信息使用中文
- 不要提交敏感信息（密码、密钥等）
- 推送前确保本地提交成功
