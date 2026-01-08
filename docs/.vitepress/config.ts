import { defineConfig } from 'vitepress'

export default defineConfig({
  // 站点基础配置
  title: 'Awesome Full Stack',
  description: '全栈开发资源与知识库',
  lang: 'zh-CN',

  // 主题配置
  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '资源列表', link: '/awesome/index.html' },
      {
        text: '知识库',
        items: [
          { text: 'AI', link: '/AI/' },
          { text: '前端', link: '/Frontend/' },
          { text: '后端', link: '/Backend/' },
          { text: '运维', link: '/Ops/' },
          { text: '工具', link: '/Tools/' },
          { text: '产品&运营', link: '/PM/' },
        ]
      },
      { text: 'GitHub', link: 'https://github.com/Phil-Fan/Awesome-full-stack' }
    ],

    // 侧边栏 - 按目录分类
    sidebar: {
      '/AI/': [
        {
          text: 'AI',
          collapsed: false,
          items: [
            { text: 'LSP', link: '/AI/LSP' },
            { text: 'MCP', link: '/AI/MCP' },
            { text: 'Skills', link: '/AI/Skills' },
          ]
        }
      ],
      '/Frontend/': [
        {
          text: '前端开发',
          collapsed: false,
          items: [
            { text: 'HTML', link: '/Frontend/html' },
            { text: 'CSS', link: '/Frontend/css' },
            { text: 'JavaScript', link: '/Frontend/javascript' },
            { text: 'Next.js', link: '/Frontend/nextjs' },
            { text: 'Ruby', link: '/Frontend/ruby' },
            { text: 'Jekyll', link: '/Frontend/jekyii' },
            { text: '爬虫', link: '/Frontend/crawl' },
          ]
        }
      ],
      '/Backend/': [
        {
          text: '后端开发',
          collapsed: false,
          items: [
            { text: 'Python', link: '/Backend/python' },
            { text: 'Java', link: '/Backend/java' },
            { text: 'Node.js', link: '/Backend/nodejs' },
            { text: 'PHP', link: '/Backend/php' },
            { text: 'Dart', link: '/Backend/dart' },
            { text: '开发规范', link: '/Backend/rules' },
            {
              text: '数据库',
              collapsed: false,
              items: [
                { text: 'SQL', link: '/Backend/db/sql' },
              ]
            },
            {
              text: '平台',
              collapsed: false,
              items: [
                { text: 'Android', link: '/Backend/platform/android' },
                { text: 'Electron', link: '/Backend/platform/electron' },
                { text: 'Flutter', link: '/Backend/platform/flutter' },
                { text: 'HarmonyOS', link: '/Backend/platform/harmony' },
                { text: 'Xcode', link: '/Backend/platform/xcode' },
              ]
            }
          ]
        }
      ],
      '/Cloud/': [
        {
          text: '云服务',
          collapsed: false,
          items: [
            { text: '阿里云', link: '/Cloud/aliyun' },
            { text: 'CI/CD', link: '/Cloud/cicd' },
            { text: 'Docker', link: '/Cloud/docker' },
            { text: 'Kubernetes', link: '/Cloud/k8s' },
          ]
        }
      ],
      '/Ops/': [
        {
          text: '运维',
          collapsed: false,
          items: [
            { text: '概述', link: '/Ops/index' },
            {
              text: 'Linux',
              collapsed: false,
              items: [
                { text: '概述', link: '/Ops/linux/index' },
                { text: '文件管理', link: '/Ops/linux/01-File' },
                { text: 'Shell', link: '/Ops/linux/02-Shell' },
                { text: '数据处理', link: '/Ops/linux/03-DataProcess' },
                { text: '用户管理', link: '/Ops/linux/04-User' },
                { text: '管理员', link: '/Ops/linux/05-Admin' },
              ]
            },
            {
              text: '环境配置',
              collapsed: false,
              items: [
                { text: 'Linux Kali', link: '/Ops/env/linux-kali' },
                { text: 'Linux ROS', link: '/Ops/env/linux-ros' },
                { text: 'Linux', link: '/Ops/env/linux' },
                { text: 'macOS', link: '/Ops/env/macos' },
                { text: '路由器', link: '/Ops/env/router' },
                { text: '服务器', link: '/Ops/env/server' },
                { text: '软件', link: '/Ops/env/software' },
                { text: 'Windows WSL', link: '/Ops/env/windows-wsl' },
                { text: 'Windows', link: '/Ops/env/windows' },
              ]
            }
          ]
        }
      ],
      '/Tools/': [
        {
          text: '工具',
          collapsed: false,
          items: [
            { text: 'Git', link: '/Tools/git' },
            { text: 'Vim', link: '/Tools/vim' },
            { text: 'LaTeX', link: '/Tools/latex' },
            { text: 'Makefile', link: '/Tools/makefile' },
            { text: 'Markdown', link: '/Tools/markdown' },
            { text: 'MkDocs', link: '/Tools/mkdcos' },
            { text: 'Reveal-md', link: '/Tools/reveal-md' },
            { text: 'Typst', link: '/Tools/typst' },
            { text: 'Tampermonkey', link: '/Tools/tampermonkey' },
            { text: 'Filebrowser', link: '/Tools/filebrowser' },
            { text: 'GDB', link: '/Tools/gdb' },
          ]
        }
      ],
      '/PM/': [
        {
          text: '产品与运营',
          collapsed: false,
          items: [
            { text: '钉钉机器人', link: '/PM/dingbot' },
          ]
        }
      ],
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Phil-Fan/Awesome-full-stack' }
    ],

    // 页脚
    footer: {
      message: '基于 CC0 1.0 Universal 许可发布',
      copyright: 'Copyright © 2024-present Phil Fan'
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/Phil-Fan/Awesome-full-stack/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'short'
      }
    },

    // 搜索
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },

    // 外链图标
    externalLinkIcon: true,
  },

  // Markdown 配置
  markdown: {
    // 代码块行号
    lineNumbers: true,
  },

  // 构建优化
  vite: {
    build: {
      chunkSizeWarningLimit: 1000
    }
  }
})
