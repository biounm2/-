# Remind Me

## 当前定位

OpenWrite 是课堂资料结构化整理工具。它不做实时录音、不做 AI 出题、不依赖豆包 API。推荐流程是：

1. 用户先用豆包“录音纪要”得到文字稿。
2. 用户把文字稿、零散笔记、docx/pdf 或图片导入 OpenWrite。
3. OpenWrite 在本地整理核心摘要、知识点清单和结构化文档。
4. 用户导出 Markdown/PDF，或在完整版本里保存历史。

## 必须说明清楚的两种版本

### 1. 纯静态版本

位置：

```text
static/index.html
```

用途：

- 一次性资料整理。
- 不需要后端。
- 不需要 MongoDB。
- 不需要启动服务。

使用：

```powershell
git clone https://github.com/biounm2/openwrite.git openwrite
cd openwrite
start static\index.html
```

也可以直接双击 `static/index.html`。

必须提醒用户：

- 纯静态版无法保存历史数据。
- 刷新页面或关闭浏览器后，当前整理内容可能丢失。
- 图片只存在于当前页面会话中，不会长期保存。
- 整理完成后必须立刻导出 Markdown 或 PDF 自己保存。
- docx/pdf 解析依赖浏览器端脚本；完全离线时，txt/Markdown 和手动粘贴最稳定。
- 如果需要历史记录、附件长期保存、多次查看详情页，就不要用纯静态版，改用完整前后端版本。

### 2. 完整前后端版本

位置：

```text
frontend/
backend/
```

用途：

- 保存历史文档。
- 保存上传附件和图片。
- 提供列表页和详情页。
- 适合长期本地使用。

使用：

```powershell
git clone https://github.com/biounm2/openwrite.git openwrite
cd openwrite
copy backend\.env.example backend\.env
pnpm run deploy:local
```

运行前要确认 MongoDB 已经启动。默认连接地址：

```text
mongodb://localhost:27017/note-summary
```

成功后打开：

```text
http://127.0.0.1:5050
```

如果要让局域网其他设备访问，把 `backend/.env` 改成：

```text
MONGODB_URI=mongodb://localhost:27017/note-summary
HOST=0.0.0.0
PORT=5050
```

然后访问：

```text
http://你的电脑局域网IP:5050
```

## 目录结构

```text
openwrite
  static
    index.html            # 纯静态一次性整理工具
  backend
    .env.example
    server.js
    models/Note.js
    routes/notes.js
  frontend
    src
      views
        NoteList.vue
        NoteCreate.vue
        NoteDetail.vue
      utils
        exportDocument.ts
        importDocuments.ts
        structureNotes.ts
  README.md
  REMIND_ME.md
  package.json
```

## 完整版本开发模式

后端开发：

```powershell
cd backend
pnpm install
pnpm run dev
```

前端开发：

```powershell
cd frontend
pnpm install
pnpm run dev
```

## 重要接口

这些只属于完整前后端版本：

- `GET /api/notes`：获取文档列表。
- `GET /api/notes/:id`：获取单篇文档。
- `POST /api/notes`：保存结构化文档。
- `PUT /api/notes/:id`：更新文档。
- `DELETE /api/notes/:id`：删除文档。
- `POST /api/notes/upload-file`：上传文字纪要或附件。
- `POST /api/notes/upload-image`：上传图片资料。

## 后续优化清单

- 给静态版加更醒目的“不会保存历史”提示。
- 支持 `.srt`、`.vtt` 等字幕/转写格式。
- 为 `structureNotes.ts` 增加更多模板，例如“课堂笔记”“读书笔记”“会议纪要”。
- 增加完整版本的文档编辑功能。
- 增加上传文件类型白名单和更清晰的错误提示。
- 增加可选本地 OCR。
- 增加搜索和按课程筛选。
