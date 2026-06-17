async function save(savedId) {
  const el = savedId ? document.getElementById(savedId) : null;
  if (el) { el.textContent = '⏳ Жариялануда...'; el.classList.add('show'); }
  try {
    const r = await fetch('/api/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(D) });
    const json = await r.json();
    if (!json.success) throw new Error(json.error || 'Қате');
    if (el) { el.textContent = '✅ Сайтқа жарияланды!'; setTimeout(()=>{ el.classList.remove('show'); el.textContent='✅ Сақталды'; }, 4000); }
  } catch(e) {
    if (el) { el.classList.remove('show'); }
    alert('Қате: ' + e.message);
  }
}