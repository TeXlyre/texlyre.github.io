const https = require('https');
const fs = require('fs');
const { parseStringPromise } = require('xml2js');

const INDEXNOW_KEY = 'caab63b53d9193d17a61b9a81315928bda1ba8f243bb439856d1ea39eac0c187';
const SITEMAP_PATH = './sitemap.xml';
const DOMAIN = 'texlyre.org';

async function parseSitemap() {
    const xml = fs.readFileSync(SITEMAP_PATH, 'utf8');
    const result = await parseStringPromise(xml);
    return result.urlset.url.map(entry => {
        const url = entry.loc[0];
        return url.replace('https://texlyre.github.io', `https://${DOMAIN}`);
    });
}

function submitToIndexNow(urls) {
    const data = JSON.stringify({
        host: DOMAIN,
        key: INDEXNOW_KEY,
        urlList: urls
    });

    const options = {
        hostname: 'api.indexnow.org',
        path: '/indexnow',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            console.log(`Status: ${res.statusCode}`);
            res.on('data', (d) => process.stdout.write(d));
            res.on('end', () => resolve());
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

async function main() {
    try {
        const urls = await parseSitemap();
        console.log(`Submitting ${urls.length} URLs to IndexNow`);
        await submitToIndexNow(urls);
        console.log('Submission complete');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();