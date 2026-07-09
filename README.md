# OpenWrite

OpenWrite 是一个课堂资料结构化整理工具：把豆包“录音纪要”导出的文字稿、课堂零散笔记、docx/pdf、图片资料导入进来，整理成核心摘要、知识点清单和复习文档。

项目提供两个版本，按需求选择：

- **纯静态版本**：`static/index.html`，一次性资料整理工具，不保存历史。
- **完整前后端版本**：`frontend/` + `backend/`，支持保存历史文档和上传附件。

## 怎么选

### 纯静态版本

适合：

- 临时整理一次资料。
- 不想安装 MongoDB。
- 不想启动后端服务。
- 只需要整理后导出 Markdown / PDF。

缺点和提醒：

- 无法保存历史数据。
- 刷新页面或关闭浏览器后，当前整理内容可能丢失。
- 图片只在当前页面会话中临时预览，不会长期保存。
- 整理完成后必须自己导出 Markdown 或 PDF。
- docx/pdf 解析依赖浏览器端脚本；完全离线时，txt/Markdown 和手动粘贴最稳定。

使用方式：

```powershell
git clone https://github.com/biounm2/openwrite.git openwrite
cd openwrite
start static\index.html
```

也可以直接双击：

```text
static/index.html
```

### 完整前后端版本

适合：

- 需要保存历史文档。
- 需要保存上传的图片和附件。
- 需要列表页、详情页，多次打开查看整理结果。

需要准备：

- Node.js
- pnpm
- MongoDB

运行：

```powershell
git clone https://github.com/biounm2/openwrite.git openwrite
cd openwrite
copy backend\.env.example backend\.env
pnpm run deploy:local
```

启动成功后打开：

```text
http://127.0.0.1:5050
```

如果要让同一局域网里的其他设备访问，把 `backend/.env` 改成：

```text
HOST=0.0.0.0
PORT=5050
```

然后用当前电脑的局域网 IP 访问，例如：

```text
http://192.168.1.23:5050
```

## 功能

- 导入 `.txt`、`.md`、`.markdown`、`.docx`、`.pdf` 等纪要文件。
- 粘贴豆包录音纪要或课堂零散笔记。
- 导入图片资料。
- 本地整理核心摘要、知识点清单和结构化文档。
- 导出 Markdown 文件，或通过浏览器打印保存为 PDF。
- 完整前后端版本可以保存历史和附件。

## 项目结构

```text
.
├── static
│   └── index.html        # 纯静态一次性版本
├── frontend              # 完整版本前端
├── backend               # 完整版本后端
├── README.md
├── REMIND_ME.md
└── package.json
```

## 开发模式

完整版本开发时可以前后端分开启动。

后端：

```powershell
cd backend
pnpm install
pnpm run dev
```

前端：

```powershell
cd frontend
pnpm install
pnpm run dev
```

前端开发服务器会把 `/api` 请求代理到后端 `http://127.0.0.1:5050`。

## 当前限制

- 不做语音识别：音频转文字交给豆包录音纪要。
- 不做 OCR：图片内容需要用户手动补充文字说明。
- 本地知识点整理是启发式规则，不是大模型推理。
- 纯静态版本不保存历史，必须导出文件自己保存。

更多交接说明见 [REMIND_ME.md](./REMIND_ME.md)。
