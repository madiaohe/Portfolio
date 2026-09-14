# Writing 详情结构分析

2026-09-09。范围：桌面端 1280 × 1000，阅读结构、内容模块及局部交互。未修改网站代码。

来源：[Building a Toast Component](https://emilkowal.ski/ui/building-a-toast-component)、[Developing Taste](https://emilkowal.ski/ui/developing-taste)、[Friction as a Feature](https://emilkowal.ski/ui/friction-as-a-feature)。

结论：共同的阅读容器搭配自由编排的内容。模块由具体论述需要决定，不是每篇文章必须填满的字段。这里描述的是页面呈现与可复用设计思路，未检查作者内部 CMS 或源代码架构。

## 检查步骤与截图

1. Sonner 开篇：作者身份后直接进入背景与问题。文字结构清楚；截图仅记录媒体的瞬间画面，不评价其完整播放效果。

![01 开篇](/Users/xianyu/Workspace/IDEA/portfolio/output/playwright/writing-review/01-toast-opening.png)

2. 命名段落：章节标题、行内代码、词典式解释。模块与命名话题关联明确，是按内容定制表达的实例。

![02 命名](/Users/xianyu/Workspace/IDEA/portfolio/output/playwright/writing-review/02-naming.png)

3. 动画演示：文字给出操作任务，两个演示支持对照，图注指出观察重点。点击 Add toast 已产生通知；没有逐项验证所有演示或手势。

![03 演示](/Users/xianyu/Workspace/IDEA/portfolio/output/playwright/writing-review/03-demo.png)

4. 实现说明：行内代码使用等宽字、浅背景和 1px 边框；独立代码块承载完整片段。两者层级清晰，不能把行内代码视为任意关键词的装饰高亮。

![04 代码](/Users/xianyu/Workspace/IDEA/portfolio/output/playwright/writing-review/04-code.png)

5. 引用：大字号衬线文字、来源署名和外链形成阅读停顿。来源可追溯；引用样式与自己的结论应保持语义区别。

![05 引用](/Users/xianyu/Workspace/IDEA/portfolio/output/playwright/writing-review/05-quote.png)

6. Developing Taste 开篇：显式标题、正文、引用。结构清楚，说明标题呈现与模块组合并非所有文章一致。

![06 标题](/Users/xianyu/Workspace/IDEA/portfolio/output/playwright/writing-review/06-taste-opening.png)

7. Developing Taste 结尾：编号尾注在前，Previous / Next 在后。正文编号链接可进入尾注区，存在返回引用位置的按钮；本次未完整验证返回滚动结束的位置。

![07 尾注与导航](/Users/xianyu/Workspace/IDEA/portfolio/output/playwright/writing-review/07-footnotes.png)

8. Friction 开篇：直接以短段落展开观点。轻量表达成立，不依赖视频、代码或交互模块。

![08 短文](/Users/xianyu/Workspace/IDEA/portfolio/output/playwright/writing-review/08-friction.png)

## 适用于 Xu Xianyu 的规划

固定作者区、阅读宽度、排版和导航规则；基础模块包括段落、标题、图片及说明、引用、列表、尾注；随真实文章添加对比、观察记录、系统关系图、设计取舍、原型等专用模块。

先明确读者要理解的观点，再选择证据与表达媒介。可以用文字准确表达时不必加入交互；需要亲自操作才能理解差异时，再制作交互示例。

可访问性观察与限制：图注字号和颜色较弱，代码长行、视频动效及交互仍需在移动端、键盘和减少动态效果设置下验证；本次未进行完整可访问性审查，未核验所有媒体播放、外链目的地或所有 Writing 页面。
