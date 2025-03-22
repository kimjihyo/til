
There is no built-in way to add custom fonts to code-server. I have searched through the Internet for the workaround, but I counldn’t be able to find anything that worked for me. So here I share a solution for custom-font in code-server that worked for me.


The code-server version I used here is 4.98.0-rc.1 with Code 1.98.0. And the remote server is x86_64 Debian on Google Cloud Platform.


Here are steps to add custom fonts to your code-server

1. Navigate to `/lib/code-server/lib/vscode/out/vs/code/browser/workbench`
2. Create a folder to store your custom fonts. I named it as `fonts`
3. Download the font file to the folder you just created. I chose JetBrains Mono. Here are steps to download the font from url on the command line interface.
    1. `curl -OL <link-to-the-font-zip-file>`  -O flag is for writing output to a local file named like the remote file we get. And the -L flag is for making sure curl redo the request if the original url redirects to another location.
    2. `unzip <the-file-name-downloaded>` This is the command to unzip the file you just downloaded.
4. Create a CSS file, this will have @font-face rules for the custom fonts. I named the file as `fonts.css`
5. Add @font-face rules in the CSS file. Here is an example of mine:

```css
@font-face {
  font-family: 'JetBrainsMono';
  src: url('./fonts/JetBrainsMono-Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'JetBrainsMono';
  src: url('./fonts/JetBrainsMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'JetBrainsMono';
  src: url('./fonts/JetBrainsMono-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'JetBrainsMono';
  src: url('./fonts/JetBrainsMono-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: 'JetBrainsMono';
  src: url('./fonts/JetBrainsMono-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}
```

1. Open `/lib/code-server/lib/vscode/out/vs/code/browser/workbench/workbench.html` and add link to the CSS file that contains font-face rules. In my case `<link rel="stylesheet" href="{{WORKBENCH_WEB_BASE_URL}}/out/vs/code/browser/workbench/fonts.css">`
2. Run `sudo systemctl restart code-server@$USER`  to restart the code-server service.
3. Open code-server in the browser open up the font settings. Change the font. In my case, I entered `JetBrainsMono, monospace`
