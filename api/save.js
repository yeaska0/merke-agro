export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const token = process.env.GITHUB_TOKEN;
    if (!token) return res.status(500).json({ error: 'Token not configured' });
    const owner = 'yeaska0', repo = 'merke-agro', file = 'data.json';
    const headers = { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json' };
    try {
        const info = await (await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${file}`, { headers })).json();
        if (info.message) return res.status(500).json({ error: info.message });
        const content = Buffer.from(JSON.stringify(req.body, null, 2)).toString('base64');
        const put = await (await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${file}`, {
            method: 'PUT', headers,
            body: JSON.stringify({ message: 'Admin update ' + new Date().toISOString(), content, sha: info.sha })
        })).json();
        if (!put.content) return res.status(500).json({ error: put.message });
        return res.status(200).json({ success: true });
    } catch(e) { return res.status(500).json({ error: e.message }); }
}