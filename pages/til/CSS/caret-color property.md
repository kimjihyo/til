
I've been coding on code-server using my iPad, and it works great. However, there are a few things that annoy me. One of them is the overlapping blinking cursors in the editor—one from Safari and the other from VS Code.


Try using VS Code on mobile Safari, and you'll see what I mean. I'll upload a video to demonstrate it


The issue was quite easy to fix—just adding a single CSS rule solved it: `caret-color: transparent`.


I opened the CSS file responsible for the VS Code workbench at `/lib/code-server/lib/vscode/out/vs/code/browser/workbench/workbench.css` and added the following rule:


```css
textarea { caret-color: transparent; }
```


I restarted code-server, and wow—the annoying built-in Safari cursor is gone!

