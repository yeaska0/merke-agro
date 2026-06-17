// Vercel Serverless Function — /api/save
// Saves data.json to GitHub using GITHUB_TOKEN env variable
// No token in client code!

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = process.env.GITHUB_TOKEN;
  if (!token) return res.status(500).json({ error: 'GITHUB_TOKEN not configured in Vercel env' });

  const owner = 'yeaska0';
  const repo = 'merke-agro';
  const file = 'data.json';
  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${file}`;

  const headers = {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };

  try {
    // 1. Get current file SHA
    const infoRes = await fetch(apiBase, { headers });
    const info = await infoRes.json();
    if (info.message) return res.status(500).json({ error: info.message });

    // 2. Encode new content
    const content = Buffer.from(JSON.stringify(req.body, null, 2)).toString('base64');

    // 3. Push update
    const putRes = await fetch(apiBase, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: 'Admin update ' + new Date().toISOString(),
        content,
        sha: info.sha,
      }),
    });
    const put = await putRes.json();

    if (!put.content) return res.status(500).json({ error: put.message || 'GitHub push failed' });

    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
