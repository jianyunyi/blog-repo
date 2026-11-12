---
category: ai-tools
---

# Pollinations 免 Key 接口实测：图片文案还能白嫖

**一句话导读：** 网上 2026 年 9–10 月的盘点都说 Pollinations“没 Key 就 401”，我 2026 年 11 月 2 日当天不带任何 Key 连测 6 次，图片和文案接口都通了——但免费的边界确实已经变了，这篇把能白嫖的部分和不能的部分一次讲清。

**最后核实：2026-11-02**

## 前置条件（需要什么）

- 一个浏览器；想批量跑的话再加一个能跑 `curl` 的终端（Mac / Linux 自带，Windows 可用 Git Bash / WSL）。
- **不需要账号、不需要手机号、不需要信用卡。** 本篇所有实测请求都没有带任何 Key。
- 网络条件提醒：本次实测经境外网络环境完成；有中文资料称国内直连需要特殊网络条件，国内直连情况本文未验证。
- 心理准备：这是一条“今天能用、不保证明天”的免费路线，不适合押上正式业务。

## 实测总览：6 次请求，5 次成功，1 次失败

| # | 请求 | 结果 | 耗时 |
|---|---|---|---|
| 1 | 旧图片端点 `image.pollinations.ai/prompt/...`，无 Key | 成功，768×768 JPEG，约 52KB | 7.5 秒 |
| 2 | 旧文本端点 `text.pollinations.ai/...`，无 Key | 成功，返回 `Hello!` | 1.0 秒 |
| 3 | 新版统一端点 `gen.pollinations.ai/image/...?model=flux`，无 Key | 成功，768×768 JPEG，约 143KB，元数据里模型确为 flux | 1.1 秒 |
| 4 | 旧图片端点带参数（z-image-turbo、seed、尺寸、nologo） | 成功，768×768 JPEG，约 39KB | 7.4 秒 |
| 5 | 文本端点写 20 词英文产品描述 | 成功，136 字节英文文案，可直接用 | 7.7 秒 |
| 6 | 旧教程里的语音 GET 写法 `?model=openai-audio&voice=nova` | **失败，404** | 0.9 秒 |

总花费：**0 美元**。全程耗时约 10 分钟（含每次请求之间 16 秒以上的间隔）。

## 步骤一：浏览器里拼 URL，直接出图

Pollinations 最早出圈的用法就是“URL 本身就是 API”：把提示词拼进网址，打开就是一张图。

打开官网先认认门：

![Pollinations 官网首页](img/2026-11-02-pollinations/step1.png)

然后在浏览器地址栏打开下面这个链接（提示词里的空格用 `%20` 代替）：

```
https://image.pollinations.ai/prompt/a%20cat%20coding%20in%20a%20small%20shop
```

回车后等几秒，浏览器里直接出现这张图——这是本次实测第 1 次请求原样返回的结果：

![实测第 1 次请求返回的图片：一只猫在小店里写代码](img/2026-11-02-pollinations/step2.png)

**这一步的要点：** 不用点任何注册按钮，不用填表。图片 URL 可以直接右键另存为，也能直接嵌进自己的网页、社媒帖子里。

## 步骤二：带参数出产品图，控制尺寸和随机种子

光出图不够，做跨境小生意要的是“能复用、能批量”的图。给 URL 加参数就能控制模型、尺寸和随机种子：

```
https://image.pollinations.ai/prompt/minimal%20product%20photo%20of%20a%20white%20ceramic%20mug%20on%20wooden%20table?model=z-image-turbo&width=768&height=768&seed=7&nologo=true
```

参数含义：

- `model=z-image-turbo`：指定图片模型（本次实测用它出图正常）；
- `width` / `height`：出图尺寸，这里是 768×768；
- `seed=7`：固定随机种子，同一提示词 + 同一种子，出图风格更稳定，方便同一批产品图保持一致；
- `nologo=true`：去掉角标。

返回结果（本次实测第 4 次请求原图）：

![实测第 4 次请求返回的产品图：木桌上的白色陶瓷杯](img/2026-11-02-pollinations/step3.png)

这张图的水准：当社媒配图、店铺氛围图够用；当品牌主视觉、包装印刷图不够——细节经不起放大看，别指望它替代摄影。

## 步骤三：新版统一端点 gen.pollinations.ai，不带 Key 也通了

2026 年 Pollinations 把接口统一到了 `gen.pollinations.ai`，很多盘点文章据此写“现在必须带 Key，不带返回 401”。我当天实测的结果不一样：

```
https://gen.pollinations.ai/image/a%20cat%20in%20space?model=flux
```

不带 Key，1.1 秒返回 200，图片元数据里写明模型就是 `flux`、seed 为 42：

![实测第 3 次请求返回的图片：太空里的猫（新版 gen 端点，模型 flux）](img/2026-11-02-pollinations/step4.png)

**这一步的结论很重要：** 至少在 2026 年 11 月 2 日当天，新版端点的 flux 图片在匿名状态下仍然出图。那些“必须带 Key”的说法，写的是官方文档口径和部分时段的实测，不是当天的全貌。但也正因为口径和实测打架，这条路随时可能收紧——见文末坑点。

## 步骤四：英文产品文案接口，20 词描述一次成型

做跨境 listing 经常要写英文短描述，这个文本接口不用 Key 也能用：

```
https://text.pollinations.ai/Write%20a%2020-word%20English%20product%20description%20for%20a%20handmade%20white%20ceramic%20coffee%20mug.
```

浏览器里打开，页面直接显示返回的文案（下图是该页面截图，文字较少所以页面显得空，内容本身在左上角）：

![文本接口返回的英文产品描述页面](img/2026-11-02-pollinations/step6.png)

完整返回内容（136 字节，7.7 秒）：

```
Savor each sip in this hand-crafted white ceramic mug, boasting smooth finish, sturdy handle, and timeless, earthy charm for mornings.
```

能直接当 Etsy / 独立站短描述的草稿，改两个词就能上。长文案、批量文案建议走下面步骤五的脚本循环，别指望一次返回几百词都稳定。

## 步骤五：给小店批量出图，一个带间隔的脚本

匿名档有速率限制，第三方资料称约 1 次 / 15 秒。本次实测每次请求之间都间隔了 16 秒以上，全部成功；连续高频调用本文没有测试，不要去撞。

下面是能直接跑的批量脚本（把提示词换成自己的产品，每次间隔 20 秒）：

```bash
#!/bin/bash
# 每次请求间隔 20 秒，尊重匿名档限速
prompts=(
  "minimal product photo of a white ceramic mug on wooden table"
  "minimal product photo of a linen tote bag on white background"
  "minimal product photo of a scented candle in glass jar"
)
i=1
for p in "${prompts[@]}"; do
  enc=$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))" "$p")
  curl -s "https://image.pollinations.ai/prompt/${enc}?model=z-image-turbo&width=768&height=768&seed=${i}&nologo=true" -o "product_${i}.jpg"
  echo "saved product_${i}.jpg"
  i=$((i+1))
  sleep 20
done
```

3 张图约 1 分半跑完，全程 0 成本。跑完记得人工挑一遍：AI 图偶尔会多根手指、多条线，直接上架前必须自己看一眼。

## 步骤六：需要 Key 的部分长什么样（只看，不注册）

免费到头的地方在 `enter.pollinations.ai`。我打开了这个页面，没有注册账号，但页面本身的信息量很大，值得截图留证：

![enter.pollinations.ai 页面：2026 年 11 月 1 日更新的 App Keys 说明](img/2026-11-02-pollinations/step5.png)

页面上 2026 年 11 月 1 日刚更新的一条写得非常直白：`pk_` Key 现在只用于标识应用，API 调用必须用 `sk_`；想让用户自己付费，要走 Pollinations Pay。登录方式是 GitHub 或 Google 账号。

结合第三方资料，注册后的免费档（Spore）约每周 1.5 Pollen，1 Pollen 约等于 1 美元算力；但**注册流程和免费档额度是本文未验证的部分**——我没有创建账号，不替它背书。需要稳定额度、高级模型（Claude、GPT 图像等）的人，再去看官方实时价格页，不要按本文的二手数字做预算。

## 费用、耗时、免费边界对照表

| 档位 | 花费 | 本次实测状态 |
|---|---|---|
| 匿名（无 Key）图片 + 文本 | $0 | 2026-11-02 当天 5/5 成功 |
| 匿名语音（旧 GET 写法） | $0 | 已 404，此路不通 |
| 注册免费档（Spore，第三方资料约 1.5 Pollen/周） | $0 | 未验证注册流程 |
| 付费 Pollen（约 $1 = 1 Pollen，第三方资料） | 按量 | 未验证 |

本次实测总花费 $0，总耗时约 10 分钟。

## 结论：这篇的判断

- **适合谁：** 个人跨境卖家、独立站新手、社媒运营——用来出产品概念图、社媒配图、英文短文案草稿，零成本先把内容跑起来。
- **不适合谁：** 要把出图写进正式生产流程的人、要品牌级主视觉的人、要批量稳定出几百张图的人。匿名档没有 SLA（服务等级保证），规则 11 月 1 日刚变过一次，今天通不代表下个月通。
- **一句话结论：** 把它当“免费草稿机”，不要当“免费生产线”。量产之前，先去注册一个免费 Key 看实时额度，或者换有明确免费额度的服务（例如 Cloudflare Workers AI 的每日免费额度，见来源）。

## 注意事项、坑点

1. **旧教程的语音 GET 写法已死。** `text.pollinations.ai/...?model=openai-audio&voice=nova` 当天返回 404。语音要走 OpenAI 兼容的 POST 写法（本文未验证，动手前先看官方文档）。
2. **“无 Key 返回 401”和实测打架。** 2026 年 9–10 月的多篇盘点写无 Key 会 401，但我 11 月 2 日当天 6 次请求里 5 次成功。规则在变，不要只信二手文章，动手前自己 curl 一下。
3. **11 月 1 日刚收紧过 Key 政策。** `pk_` 不再能直接调 API，要调 API 得 `sk_`。照抄 2025 年老教程的 Key 用法会踩坑。
4. **限速真实存在，别硬刷。** 第三方资料称匿名约 1 次 / 15 秒；本次实测间隔 16 秒以上全部成功。写脚本务必加 sleep，刷爆了被封 IP 是自己的损失。
5. **没有稳定性承诺。** 免费档不保证可用性，重要节点（大促上新、广告投放当天）不要临时指望它出图。
6. **商用前自查官方条款。** 生成图的版权、商用许可、内容政策以官方实时条款为准，本文没有替你核实这一条。
7. **国内直连未验证。** 本次实测经境外网络完成；有资料称国内访问需要特殊网络条件，动手前先确认自己的网络能不能打开上面这些链接。

## 来源

- 官方网站：https://pollinations.ai（首页与产品形态，核实于 2026-11-02）
- 官方控制台与 Key 页面：https://enter.pollinations.ai（App Keys 政策 2026-11-01 更新，核实于 2026-11-02）
- 官方统一 API 端点：https://gen.pollinations.ai（匿名调用实测，核实于 2026-11-02）
- 2026 免费图片 API 盘点（含 Pollinations 改 Key 的说法，2026 年 10 月 10 日数据）：https://blog.laozhang.ai/en/posts/free-ai-image-generation-api
- 2026 免费 AI 图片 API 盘点（含无 Key 401 的说法）：https://apiframe.ai/blog/free-ai-image-generation-api-2026
- 2026 免费 TTS 与 AI 绘画 API 汇总（含 Pollinations 匿名限速、Cloudflare Workers AI 每日免费额度对照，2026 年 9 月资料）：https://waynetalk.com/free-tts-image-api/
- Pollinations 免费档整理（含匿名约 1 次 / 15 秒、Spore 约 1.5 Pollen/周的第三方整理）：https://aicredits.dev/submissions/113-pollinations-ai-free-api-no-signup-required
- Pollinations 平台介绍（官方三域架构：pollinations.ai / gen.pollinations.ai / enter.pollinations.ai）：https://www.anygen.io/showcase/pollinations-ai/index.html
- 其余所有步骤、耗时、返回内容均为作者 2026-11-02 当天亲手实测（curl，无 Key），见正文实测总览表。
