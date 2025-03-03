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

function ensureDirectory(directoryName) {
    const directoryPath = path.join(__dirname, directoryName);
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
        console.log(`Directory ${directoryName} created.`);
    } else {
        console.log(`Directory ${directoryName} already exists.`);
    }
    return directoryPath;
}

function writeToFile(directory, fileName, text, overwrite = false) {
    try {
        const filePath = path.join(path.join(__dirname, directory), fileName);
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, text, 'utf-8');
            console.log(`File ${fileName} created.`);
        } else {
            console.log(`File ${fileName} already exists.`);
            if (overwrite) {
                fs.writeFileSync(filePath, text, 'utf-8');
                console.log(`File ${fileName} overwrited`);
            }
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
        return null;

    }
    return fileName;
}

(async () => {
    // sync til pages
    const tilPages = await notion.databases.query({ database_id: process.env.TIL_DB_ID});
    for (const page of tilPages.results) {
        const tag = page.properties.Tags.multi_select[0].name.replace('\'', '');
        const title = page.properties.Name.title[0].plain_text;
        const directoryName = `pages/til/${tag}`;
        const fileName = `${title}.md`; 

        const mdblocks = await n2m.pageToMarkdown(page.id);
        const mdstring = n2m.toMarkdownString(mdblocks);

        ensureDirectory(directoryName);
        writeToFile(directoryName, fileName, mdstring.parent, true);
    }

    // sync knou pages
})();

