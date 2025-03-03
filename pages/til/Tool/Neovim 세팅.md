
Neovim의 세팅과 플러그인 관리는 ~/.config/nvim 에서 합니다. 해당 위치에 init.lua 스크립트를 작성하여 사용자 입맛대로 neovim을 커스터마이징할 수 있습니다. 


처음에는 잘 몰라서 [https://github.com/nvim-lua/kickstart.nvim](https://github.com/nvim-lua/kickstart.nvim) 에서 ctrl c + v 해서 사용했습니다. 그렇기에 제가 필요하지 않은 플러그인들이 같이 딸려와서 무언가 무거운 느낌을 받았고 제가 따로 수정하려고 해도 어디를 어떻게 고칠지 찾느라 시간이 오래걸렸고 무엇인가 제 입맛대로 정돈돼 있지않아 어지러웠습니다. 


그래서 오늘은 제 입맛대로 처음부터 저 스스로 neovim 공부와 커스터마이징하는 시간을 가졌습니다. 


neovim의 장점은 설정을 lua 스크립트를 통해서 할 수 있다는 점 입니다. 그래서 저는 설정파일들의 구조를 아래와 같이 가져갔습니다.


```plain text
📂 ~/.config/nvim
├── 📂 lua
│  ├── 📁 plugins	
│  │  ├── 🌑 colorscheme.lua
│  │  ├── 🌑 lsp.lua
│  │  ├── 🌑 telescope.lua
│  │  └── 🌑 treesitter.lua
│  └── 📂 config
│     ├── 🌑 autocmds.lua
│     ├── 🌑 keymappings.lua
│     ├── 🌑 lazy.lua
│     └── 🌑 options.lua
└── 🇻 init.lua
```


init.lua가 neovim 설정의 entry point 입니다. init.vim 으로 사용해도 상관없지만 lua 스크립트의 기능을 이용하지 못합니다.


저의 init.lua 는 설정의 다른 lua 파일들을 불러오는 시작점의 역할만 할 뿐 여기서 vim의 설정을 하지는 않습니다. 


```lua
require("config.options")
require("config.keymappings")
require("config.autocmds")
require("config.lazy")
```


위는 제 init.lua 입니다. 첫번째 줄의 `require("config.options")` 은 ./lua/config/options.lua 스크립트 파일을 불러오라 라는 뜻 입니다.


자 그럼 config 폴더에 위치한 각 lua 파일들에 대해서 알아보겠습니다. 파일 이름은 제가 임의로 정한 것 이며 init.lua 만 예약어 이고 다른 어떤 것으로 명명하여도 상관없습니다.


아래는 config/options.lua 입니다. vim의 각종 기본 설정들을 수정했습니다.


```lua
-- enable line number and relative line number
vim.opt.number = true
vim.opt.relativenumber = true

-- width of a tab
vim.opt.shiftwidth = 2
vim.opt.tabstop = 2
vim.opt.softtabstop = 2

-- use number of spaces to insert a <Tab>
vim.opt.expandtab = true

vim.opt.showmode = false
vim.opt.breakindent = true
vim.opt.undofile = true
vim.opt.ignorecase = true
vim.opt.smartcase = true

vim.opt.signcolumn = "yes"
vim.opt.updatetime = 250
vim.opt.timeoutlen = 300

-- Configure how new splits should be opened
vim.opt.splitright = true
vim.opt.splitbelow = true

-- Sets how neovim will display certain whitespace characters in the editor.
--  See `:help 'list'`
--  and `:help 'listchars'`
vim.opt.list = true
vim.opt.listchars = { tab = "» ", trail = "·", nbsp = "␣" }

-- Preview substitutions live, as you type!
vim.opt.inccommand = "split"

-- -- Show which line your cursor is on
vim.opt.cursorline = true

-- Minimal number of screen lines to keep above and below the cursor.
vim.opt.scrolloff = 10
```


아래는 config/keymappings.lua 입니다. vim에서 단축키를 수정하는 곳 입니다. 아직은 저만의 단축키가 하나 밖에 없는 모습입니다. space + pv 를 누르면 :Ex 를 입력한 것처럼 동작합니다.


```lua
vim.g.mapleader = " "
vim.keymap.set("n", "<leader>pv", vim.cmd.Ex)
```


아래는 config/autocmds.lua 입니다. autocmd 란 vim에서 특정 커맨드를 실행하면 자동으로 사용자가 원하는 행동을 추가적으로 실행시킬 수 있습니다. 저는 텍스트를 복사(yank)하면 복사된 부분을 하이라이트하게 했습니다.


```lua
-- Highlight when yanking (copying) text
vim.api.nvim_create_autocmd("TextYankPost", {
        desc = "Highlight when yanking (copying) text",
        group = vim.api.nvim_create_augroup("kickstart-highlight-yank", { clear = true }),
        callback = function()
                vim.highlight.on_yank()
				end,
})
```


아래는 config/lazy.lua 입니다. lazy란 vim의 플러그인 관리 매니저 입니다. node의 세계에 npm 이나 yarn 이 있다면 vim의 세계에는 lazy가 있습니다. 아래 스크립트는 lazy 를 설치하고 설치할 플러그인에 대해서는 plugins 디렉토리를 보라고 설정하고 있습니다.


```lua
-- Install `lazy.nvim` plugin manager
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
        local lazyrepo = "https://github.com/folke/lazy.nvim.git"
        local out = vim.fn.system({ "git", "clone", "--filter=blob:none", "--branch=stable", lazyrepo, lazypath })
        if vim.v.shell_error ~= 0 then
                error("Error cloning lazy.nvim:\n" .. out)
        end
end ---@diagnostic disable-next-line: undefined-field
vim.opt.rtp:prepend(lazypath)
require("lazy").setup("plugins")
```


plugins 디렉토리에는 여러가지 플러그인 별 설정 코드들이 들어있습니다. vim에서의 파일탐색기/fuzzy finder 플러그인인 telescope를 예를 들어서 보겠습니다. 설명은 주석으로 적도록 하겠습니다.


```lua
return {
   {
      "nvim-telescope/telescope.nvim", -- github 주소입니다. 저기서 플러그인을 다운받으라는 말 입니다.
      tag = "0.1.8",
      dependencies = { "nvim-lua/plenary.nvim" }, -- 추가적인 디펜던시를 넣을 수 있습니다. 마찬가지로 다운받아올 github 주소입니다.
      opts = { -- telescope 관련 기타 설정을 하는 곳 입니다.
         defaults = {
            file_ignore_patterns = { "node_modules", ".git", ".next" },
         },
      },
      init = function()
		     -- 단축키를 재설정 했습니다. 
         local builtin = require("telescope.builtin")
         vim.keymap.set("n", "<leader>sh", builtin.help_tags, { desc = "[S]earch [H]elp" })
				 vim.keymap.set("n", "<leader>sk", builtin.keymaps, { desc = "[S]earch [K]eymaps" })
				 vim.keymap.set("n", "<leader>sf", builtin.find_files, { desc = "[S]earch [F]iles" })
				 vim.keymap.set("n", "<leader>ss", builtin.builtin, { desc = "[S]earch [S]elect Telescope" })
				 vim.keymap.set("n", "<leader>sw", builtin.grep_string, { desc = "[S]earch current [W]ord" })
				 vim.keymap.set("n", "<leader>sg", builtin.live_grep, { desc = "[S]earch by [G]rep" })
				 vim.keymap.set("n", "<leader>sd", builtin.diagnostics, { desc = "[S]earch [D]iagnostics" })
				 vim.keymap.set("n", "<leader>sr", builtin.resume, { desc = "[S]earch [R]esume" })
				 vim.keymap.set("n", "<leader>s.", builtin.oldfiles, { desc = '[S]earch Recent Files ("." for repeat)' })
				 vim.keymap.set("n", "<leader><leader>", builtin.buffers, { desc = "[ ] Find existing buffers" })
       end,
   },
   {
      "piersolenski/telescope-import.nvim",
      dependencies = "nvim-telescope/telescope.nvim",
      config = function()
         require("telescope").load_extension("import")
         vim.keymap.set("n", "<leader>i", ":Telescope import<cr>", {})
      end,
   },
}
```

