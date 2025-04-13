## genshin

该插件完全依赖于喵喵插件

请先安装喵喵插件后再安装

```sh
# 克隆喵喵插件
git clone --depth=1 https://gitee.com/yoimiya-kokomi/miao-plugin.git ./plugins/miao-plugin
# or
git clone --depth=1 https://gitee.com/yoimiya-kokomi/miao-plugin.git ./plugins/miao-plugin
```

```sh
# 克隆原神插件
git clone -b deploy --depth=1 https://gitee.com/yunzaijs/genshin.git ./plugins/genshin
# or
git clone -b deploy --depth=1 https://github.com/yunzaijs/genshin.git ./plugins/genshin
```

### 帮助

[点击了解所有指令](./README_HELP.md)

### 维护流程

当前仓库需要严格遵循以下流程：

1. 简单PR：提交PR --> main，触发流水线，通过后合入。

2. 开发和发布版本：

- 触发“新建分支”流水线，main --> dev-xxxxx，

- dev变更，触发“构建验证”流水线，

- 从dev分支触发deploy分支的”版本发布“流水线（触发前，需要确保dev合main分支已同步）

- 发布完成后，删除dev分支。
