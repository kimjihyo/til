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

// function ensureDirectory(directoryName) {
//     const directoryPath = path.join(__dirname, directoryName);
//     if (!fs.existsSync(directoryPath)) {
//         fs.mkdirSync(directoryPath, { recursive: true });
//         console.log(`Directory ${directoryName} created.`);
//     } else {
//         console.log(`Directory ${directoryName} already exists.`);
//     }
//     return directoryPath;
// }

// function writeToFile(path, text) {
//     try {
//         fs.writeFileSync(filePath, text, 'utf-8');
//         console.log(`File ${fileName} created.`);
//     } catch (error) {
//         console.error('An error occurred:', error.message);
//         return null;

//     }
//     return fileName;
// }

async function syncDb(dbId, dbName) {
    // sync til pages
    const pages = await notion.databases.query({ database_id: dbId});
    for (const page of pages.results) {
        try {
            const tag = page.properties.Tags.multi_select[0].name;
            const title = page.properties.Name.title[0].plain_text.replace(/\//g, '-');
            const dirPath = path.join(__dirname, `pages/${dbName}/${tag}`);
            const fileName = `${title}.md`; 
            const fullFilePath = path.join(dirPath, fileName);

            // check if dir path exists
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
}


(async () => {
    await syncDb(process.env.TIL_DB_ID, 'til');
    await syncDb(process.env.KNOU_DB_ID, 'knou');
})();