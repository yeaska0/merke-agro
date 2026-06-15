export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = process.env.GITHUB_TOKEN;
  const owner = 'yeaska0';
  const repo = 'merke-agro';
  const file = 'submissions.json';

  if (!token) return res.status(500).json({ error: 'Token not configured' });

  const { name, phone, subject, message } = req.body || {};
  if (!name || !phone) return res.status(400).json({ error: 'Missing fields' });

  const headers = {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
  };

  // Get existing submissions
  let submissions = [];
  let sha = null;
  try {
    const r = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${file}`, { headers });
    if (r.ok) {
      const data = await r.json();
      sha = data.sha;
      submissions = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'));
    }
  } catch (e) {}

  // Add new entry
  submissions.unshift({
    id: Date.now(),
    date: new Date().toLocaleString('kk-KZ', { timeZone: 'Asia/Almaty' }),
    name, phone,
    subject: subject || '—',
    message: message || '—',
    read: false
  });

  const content = Buffer.from(JSON.stringify(submissions, null, 2), 'utf-8').toString('base64');

  const putRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${file}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: `Жаңа хабарлама: ${name}`,
      content,
      ...(sha ? { sha } : {})
    })
  });

  if (!putRes.ok) {
    const err = await putRes.json();
    return res.status(500).json({ error: err.message });
  }

  return res.status(200).json({ success: true });
}
