const { Client } = require("@notionhq/client");
const fs = require("fs");
const path = require("path");

const { NotionToMarkdown } = require("notion-to-md");

require("dotenv").config();

const { NOTION_TOKEN, TIL_DB_ID } = process.env;

if (!NOTION_TOKEN || !TIL_DB_ID) {
  throw new Error("Required environment variables do not seem to exist.");
}

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

function ensureFolderExists(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

async function sync() {
  const categoryToPages = new Map();

  // Retrieve all pages from the notion database
  const pages = await notion.databases.query({ database_id: TIL_DB_ID });

  // Loop through the pages
  for (const page of pages.results) {
    try {
      // A page can have multiple tags, but I made every page have only one tag.
      // So just get the first from the tag list as it will only have one.
      const category = page.properties.Tags.multi_select[0].name;
      // Cannot use a slash in a file name.
      const title = page.properties.Name.title[0].plain_text.replace(
        /\//g,
        "-"
      );
      // Relative path to the md file.
      const href = `${category}/${title}.md`;
      // Absolute path to the md file.
      const filePath = path.join(__dirname, href);
      // Absolute path to the category folder.
      const categoryPath = path.join(__dirname, category);

      if (!categoryToPages.has(category)) {
        categoryToPages.set(category, []);
      }

      categoryToPages.get(category).push({
        title,
        href,
      });

      // Check if the md file was already created
      if (fs.existsSync(filePath)) {
        // Determine whether it needs to be updated or not.
        // Get the last modified time and compare it with the updated time of notion's
        const { mtime } = fs.statSync(filePath);
        const lastEditedTime = new Date(page.last_edited_time);
        if (lastEditedTime < mtime) {
          continue;
        }
      }
      n2m.pageToMarkdown(page.id).then((blocks) => {
        const markdownString = n2m.toMarkdownString(blocks);
        console.log(`Writing to ${href}`);
        ensureFolderExists(categoryPath);
        fs.writeFileSync(filePath, markdownString.parent, "utf-8");
      });
    } catch (error) {
      console.error(error);
    }
  }

  let readme = `
# TIL

> Today I Learned

_${Array.from(categoryToPages.values()).flat().length} TILs_

### Categories
`;

  for (const category of categoryToPages.keys()) {
    readme += `* [${category}](#${category.replaceAll(" ", "%20")})\n`;
  }

  for (const category of categoryToPages.keys()) {
    readme += `\n### ${category}\n`;
    for (const page of categoryToPages.get(category)) {
      readme += `- [${page.title}](${page.href.replaceAll(" ", "%20")})\n`;
    }
  }

  readme += "\n&copy; 2025 Jihyo Kim\n";

  fs.writeFileSync(path.join(__dirname, "README.md"), readme, "utf-8");
}

sync();
