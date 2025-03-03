const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

const { NotionToMarkdown } = require('notion-to-md');

require('dotenv').config();

if (!process.env.NOTION_TOKEN || !process.env.TIL_DB_ID) {
    console.log(process.env);
    throw new Error('some envs do not exist');
}

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

async function syncDb(dbId, dbName) {
    const tags = new Set();
    const pageList = [];

    // sync til pages
    const pages = await notion.databases.query({ database_id: dbId});
    for (const page of pages.results) {
        try {
            const tag = page.properties.Tags.multi_select[0].name;
            const title = page.properties.Name.title[0].plain_text.replace(/\//g, '-');
            const relPath = `pages/${dbName}/${tag}`;
            const dirPath = path.join(__dirname, relPath);
            const fileName = `${title}.md`; 
            const fullFilePath = path.join(dirPath, fileName);

            tags.add(tag);
            pageList.push({ link: path.join(relPath, fileName), title, tag });

            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true});
                console.log(`created a directory: ${dirPath}`)
            }
            if (!fs.existsSync(fullFilePath)) {
                const mdblocks = await n2m.pageToMarkdown(page.id);
                const mdstring = n2m.toMarkdownString(mdblocks);
                fs.writeFileSync(fullFilePath, mdstring.parent, 'utf-8');
                console.log(`${fullFilePath} created`);
            }
        } catch (error) {
            console.error(error);
        }
    }
    return {
        tags: tags.values(),
        pages: pageList,
    }
}


(async () => {
    const tilInfo = await syncDb(process.env.TIL_DB_ID, 'til');
    await syncDb(process.env.KNOU_DB_ID, 'knou');

    const readme = [];
    readme.push('#TIL');
    readme.push(`Total ${tilInfo.pages.length} TIL's created`);
    for (tag of tilInfo.tags) {
        readme.push(`[${tag}](${path.join('pages/til', tag)})`);
    }

    fs.writeFileSync(path.join(__dirname, 'README.md'), readme.join('</br>'), "utf-8")
})();