const KEY = 'bp-records';
const form = document.getElementById('bp-form');
const list = document.getElementById('list');
const empty = document.getElementById('empty');

let records = JSON.parse(localStorage.getItem(KEY) || '[]');

function save() {
  localStorage.setItem(KEY, JSON.stringify(records));
}

function render() {
  list.innerHTML = '';
  empty.style.display = records.length ? 'none' : 'block';
  records.forEach((r, i) => {
    const tr = document.createElement('tr');
    [r.time, r.systolic, r.diastolic, r.pulse, r.medication, r.note].forEach(v => {
      const td = document.createElement('td');
      td.textContent = v;
      tr.appendChild(td);
    });
    const td = document.createElement('td');
    const btn = document.createElement('button');
    btn.textContent = '刪除';
    btn.className = 'del';
    btn.type = 'button';
    btn.onclick = () => { records.splice(i, 1); save(); render(); };
    td.appendChild(btn);
    tr.appendChild(td);
    list.appendChild(tr);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  records.unshift({
    time: new Date().toLocaleString('zh-TW', { hour12: false }),
    systolic: document.getElementById('systolic').value,
    diastolic: document.getElementById('diastolic').value,
    pulse: document.getElementById('pulse').value,
    medication: document.getElementById('medication').value,
    note: document.getElementById('note').value.trim()
  });
  save();
  render();
  form.reset();
});

render();
