「查老师」的离线版本。用户在移动端/PC 端打开 index.html 后就可以离线阅读 `chalaoshi_data/` 中的数据内容。以下是具体要求：

页面：

1. 在所有页面最上方是一个搜索框。搜索框中可以输入教师姓名 / 拼音 / 拼音缩写，或者其子串；此时应当在搜索框下方显示有限的搜索结果。每条结果包括「教师姓名、学院、评分」几个字段。点击后，进入对应教师页面。
2. `index.html` 是主页面，包含搜索框、随机显示的 10 个老师及其评分，以及 `https://github.com/zjuchalaoshi/chalaoshi` 等链接和相关说明文字。
3. `/t/{id}/` 是教师页面，上方显著显示教师姓名、学院、评分、评分人数，下方显示所有课程 (linked to `/c/{课程名称}/`) 的 GPA、人数、标准差。然后，显示所有评论。评论有「人气评论」和「最新评论」两种排序方式。每条评论包括内容、发表时间 (下方)、赞踩数 (右边)。需要注意，有些老师的评论可能很多 (共计 3.4MB)，需要考虑性能问题。
4. `/c/{课程名称}/` 显示某一课程各个教师的姓名 (linked to `/t/{id}/`)、平均绩点±标准差、人数。

另外：

- 请注意移动端访问和热门老师评论过多时的性能优化。
- 用户只需要解压产物压缩包，双击 index.html 即可，不要加载任何网络资源。
