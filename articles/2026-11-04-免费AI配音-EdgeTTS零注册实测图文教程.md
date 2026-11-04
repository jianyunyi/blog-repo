# 零注册、不绑卡，Edge-TTS 免费 AI 配音 2026 年 11 月实测：微软神经音色随便用，但有两条边界

**一句话导读：** 做跨境视频最烧钱的一环往往是配音——我 2026 年 11 月 4 日实测了一条零注册路线：不用账号、不用信用卡，一行命令就能调用微软 Edge 同款神经音色，中英文产品文案 1–2 秒出 MP3，全程 0 美元；但它有两条必须先知道的边界，文末一次讲清。

**最后核实：2026-11-04**

## 前置条件（需要什么）

- 一台能跑 Python 的电脑（Mac / Linux / Windows 均可，Python 3.10 以上）。
- 一个终端（Mac 自带终端，Windows 可用 PowerShell 或 WSL）。
- **不需要账号、不需要手机号、不需要信用卡。** 本篇所有实测都没有注册任何账号、没有填任何 Key。
- 网络条件提醒：本次实测在境外 Linux 主机上直连完成；如果你在公司代理后面，见文末坑点。

## 实测总览：7 次操作，全部成功，花费 0 美元

| # | 操作 | 结果 | 耗时 |
|---|---|---|---|
| 1 | 安装 edge-tts 7.3.1 | 成功 | 约 30 秒（含下载依赖） |
| 2 | 列出全部音色 `--list-voices` | 成功，共 323 个音色 | 0.7 秒 |
| 3 | 英文产品文案配音（Aria） | 成功，MP3 24,768 字节 | 1.3 秒 |
| 4 | 中文产品文案配音（晓晓） | 成功，MP3 45,072 字节 | 1.5 秒 |
| 5 | 语速 +20% + 生成字幕 | 成功，MP3 35,280 字节，字幕 5.88 秒 | 1.1 秒 |
| 6 | 约 110 字中文长段落（云扬） | 成功，MP3 125,424 字节 | 1.9 秒 |
| 7 | 验证音频格式 | 均为标准 MP3（48kbps、24kHz、单声道） | — |

总花费：**0 美元**。全程约 10 分钟（含安装和一次环境排障，见坑点）。

## 步骤一：安装 edge-tts

edge-tts 是一个开源 Python 工具，它直接调用微软 Edge 浏览器“朗读”功能背后的在线语音服务——不需要装 Edge、不需要 Windows、不需要 API Key。

```bash
pip install edge-tts
```

![edge-tts 项目主页，README 里写明无需 Edge、无需 Windows、无需 API Key](img/2026-11-04-免费AI配音-EdgeTTS/step1.png)

注意一个新手坑：Debian / Ubuntu 新版系统直接 `pip install` 会报 PEP 668 错误（系统不让往全局装包）。标准解法是先建虚拟环境，再装：

```bash
python3 -m venv venv
./venv/bin/pip install edge-tts
```

装完验证一下版本号，我实测当天是 7.3.1：

```bash
edge-tts --version
# edge-tts 7.3.1
```

## 步骤二：查音色——323 个里先锁定你要的那个

```bash
edge-tts --list-voices
```

这条命令会返回全部可用音色，我当天数到 **323 个**。中文（大陆）有 8 个，挑产品的口播一般就够了：

| 音色 | 性别 | 适合场景 | 特点 |
|---|---|---|---|
| zh-CN-XiaoxiaoNeural（晓晓） | 女 | 新闻、小说 | 温暖，通用首选 |
| zh-CN-XiaoyiNeural（晓伊） | 女 | 卡通、小说 | 活泼 |
| zh-CN-YunjianNeural（云健） | 男 | 体育、小说 | 有激情 |
| zh-CN-YunxiNeural（云希） | 男 | 小说 | 清朗、阳光 |
| zh-CN-YunxiaNeural（云夏） | 男 | 卡通、小说 | 可爱 |
| zh-CN-YunyangNeural（云扬） | 男 | 新闻 | 专业、稳重，适合产品介绍 |
| zh-CN-liaoning-XiaobeiNeural（晓北） | 女 | 方言 | 幽默，辽宁口音 |
| zh-CN-shaanxi-XiaoniNeural（晓妮） | 女 | 方言 | 明亮，陕西口音 |

另外还有粤语（zh-HK，3 个）和台湾国语（zh-TW，3 个）。英文默认音色是 en-US-EmmaMultilingualNeural；做英文口播我实测用 en-US-AriaNeural，听感偏自然。

![edge-tts 用法与音色说明：上百个神经音色，覆盖几十种语言](img/2026-11-04-免费AI配音-EdgeTTS/step2.png)

## 步骤三：生成第一条配音——中英文各一条

英文产品文案（Aria 音色）：

```bash
edge-tts --text "Hello, this is a free voice test for a product video." \
  --voice en-US-AriaNeural --write-media test-en.mp3
```

中文产品文案（晓晓音色）：

```bash
edge-tts --text "这是一款跨境热卖的便携榨汁机，充电一次可以用一周，现在下单还送两个杯子。" \
  --voice zh-CN-XiaoxiaoNeural --write-media test-zh.mp3
```

两条都在 2 秒内生成，文件用 `file` 命令验过，是标准 MP3，可以直接拖进剪映、CapCut、Premiere 当旁白。

![edge-tts 命令行参数表：--voice 选音色，--rate / --volume / --pitch 调语速音量音调](img/2026-11-04-免费AI配音-EdgeTTS/step4.png)

## 步骤四：调语速、顺手出字幕

短视频口播一般要比默认语速快一点，加 `--rate +20%`；同时加 `--write-subtitles`，字幕文件直接生成，剪视频不用再手打时间轴：

```bash
edge-tts --text "This portable juicer charges in two hours and blends ice in thirty seconds, perfect for morning smoothies." \
  --voice en-US-AriaNeural --rate +20% \
  --write-media test-rate.mp3 --write-subtitles test-rate.vtt
```

实测结果：音频 5.88 秒，字幕文件长这样，开头就是时间轴：

```
1
00:00:00,100 --> 00:00:05,883
This portable juicer charges in two hours and blends ice in thirty seconds, perfect for morning smoothies.
```

常用参数就四个：`--voice` 选音色，`--rate` 调语速（如 `+20%`、`-10%`），`--volume` 调音量，`--pitch` 调音调（如 `+20Hz`）。长文案建议按句子或段落拆成多个文件再拼接，单条过长一旦中途断网要整条重跑。

## 费用、坑点与结论

**费用：0 美元。** 没有账号就没有账单，也没有“免费额度用完”这一说——微软没有给这条非公开入口标价。

**坑点一：这是非官方入口，2026 年已经出过一次 403。** edge-tts 调的是 Edge 朗读服务的内部接口，不是微软公开卖的 Azure 语音服务。2026 年内经典端点曾对大批用户返回 HTTP 403（edge-tts #490），第三方工具 FluentVoice 是靠切到微软的新服务器（api.msedgeservices.com）才恢复的。

![2026 年经典端点 403 的报道：FluentVoice 1.6.3 靠切到微软新服务器恢复](img/2026-11-04-免费AI配音-EdgeTTS/step3.png)我 2026 年 11 月 4 日实测时经典端点是通的，但你要做好“某天突然不通”的心理准备——这是免费的代价，不适合押上正式业务的唯一配音链路。

**坑点二：商用授权不明。** 生成本身免费，但这些音色是微软的服务，变现视频（带货、广告、付费课程）商用前先读微软服务条款；拿不准就只用在非变现内容，或转用付费服务兜底。

**坑点三：公司代理 / 证书拦截环境会报错。** 我实测中另一台走 MITM 代理的主机上，edge-tts 直接报证书验证失败，原因是它把证书校验固定在 Python 的 certifi 包里，不认代理自签的 CA；而且 WebSocket 握手还会被代理拖超时。个人电脑直连一般没这个问题；在公司网环境下，先用 `--proxy` 指定代理，证书问题则需要把代理 CA 补进 certifi 的证书包——搞不定就换直连网络，别在这上面死磕。

**我的结论：** 给跨境短视频、独立站产品演示、课程旁白做配音，这条路线是目前零成本里音质最好的之一：323 个音色、中英粤台全覆盖、1–2 秒出 MP3、还能顺手出字幕。适用人群：个人卖家、独立开发者、做多语言内容的人。不适用人群：要把配音押进正式商用生产线的团队（先备好付费兜底），以及没有终端操作经验、只想点按钮的人（可以先用 Edge 浏览器自带的朗读功能听效果，再决定要不要学这条命令）。

## 来源

- edge-tts 开源项目（rany2）：https://github.com/rany2/edge-tts —— 安装方法、无需 Key 的说明，核实日期 2026-11-04
- VideoSDK《Edge TTS: Free Text-to-Speech for Developers in 2026》：https://www.videosdk.live/developer-hub/ai/edge-tts —— 音色规模与无 Key 机制，核实日期 2026-11-04
- Trickest edge-tts 工具页：https://trickest.com/tools/edge-tts —— CLI 参数与无 Key 说明，2026-10-13 更新，核实日期 2026-11-04
- dev.to《FluentVoice Pro 1.6.3》（2026-10-12）：https://dev.to/nickotmazgin/fluentvoice-pro-163-the-microsoft-online-voices-work-again-plus-a-health-check-that-says-what-2bfh —— 2026 年经典端点 403 与新服务器 failover，核实日期 2026-11-04
- 作者实测（2026-11-04，境外 Linux 主机）：edge-tts 7.3.1，323 个音色，中英文与长段落生成耗时与文件大小见实测总览表
