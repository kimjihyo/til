const { Client } = require("@notionhq/client");
const fs = require("fs");
const path = require("path");

const { NotionToMarkdown } = require("notion-to-md");

require("dotenv").config();

if (!process.env.NOTION_TOKEN || !process.env.TIL_DB_ID) {
  console.log(process.env);
  throw new Error("some envs do not exist");
}

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

async function syncDb(dbId, dbName) {
  const tags = new Set();
  const pagesByTag = {};
  let pageCount = 0;

  // sync til pages
  const pages = await notion.databases.query({ database_id: dbId });
  for (const page of pages.results) {
    try {
      pageCount += 1;
      const tag = page.properties.Tags.multi_select[0].name;
      const title = page.properties.Name.title[0].plain_text.replace(
        /\//g,
        "-"
      );
      const relPath = `pages/${dbName}/${tag}`;
      const dirPath = path.join(__dirname, relPath);
      const fileName = `${title}.md`;
      const fullFilePath = path.join(dirPath, fileName);

      tags.add(tag);
      if (!pagesByTag[tag]) {
        pagesByTag[tag] = [];
      }

      pagesByTag[tag].push({ title, href: path.join(relPath, fileName) });

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`created a directory: ${dirPath}`);
      }
      if (!fs.existsSync(fullFilePath)) {
        const mdblocks = await n2m.pageToMarkdown(page.id);
        const mdstring = n2m.toMarkdownString(mdblocks);
        fs.writeFileSync(fullFilePath, mdstring.parent, "utf-8");
        console.log(`${fullFilePath} created`);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return {
    tags: tags.values(),
    pagesByTag,
    pageCount,
  };
}

(async () => {
  const tilInfo = await syncDb(process.env.TIL_DB_ID, "til");
  await syncDb(process.env.KNOU_DB_ID, "knou");

  const readme = [];
  readme.push("# TIL");
  readme.push(`Total ${tilInfo.pageCount} TIL's created`);
  readme.push("## Categories");
  for (tag of tilInfo.tags) {
    readme.push(`[${tag}](${path.join("pages/til", tag.replace(" ", "%20"))})`);
  }

  Object.keys(tilInfo.pagesByTag).forEach((tag) => {
    readme.push(`### ${tag}`);
    tilInfo.pagesByTag[tag].forEach((page) => {
      readme.push(`[${page.title}](${page.href})`);
    });
  });

  fs.writeFileSync(
    path.join(__dirname, "README.md"),
    readme.join(" </br>\n"),
    "utf-8"
  );
})();
