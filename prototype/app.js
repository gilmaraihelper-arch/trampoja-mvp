/* TrampoJá — prototype SPA (hash routing) with fake data.
   No backend. State persisted in localStorage.
*/

const LS_KEY = 'trampoja_prototype_state_v1';

const nowISO = () => new Date().toISOString();
const fmtBRL = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const fmtDate = (iso) => new Date(iso).toLocaleString('pt-BR', { dateStyle: 'medium', timeStyle: 'short' });

const seed = () => ({
  role: 'freelancer',
  freelancer: {
    id: 'f_001',
    name: 'Ana Souza',
    rating: 4.8,
    skills: ['Garçom(ete)', 'Bar', 'Caixa'],
    docs: { cpf: true, pix: true, backgroundCheck: false },
    wallet: { balance: 210.50, pending: 180.00, lastPayoutAt: '2025-12-12T14:00:00.000Z' },
  },
  restaurant: {
    id: 'r_021',
    name: 'Bistrô do Centro',
    cnpjVerified: true,
    address: 'Av. Paulista, 1000 — São Paulo/SP',
    rating: 4.6,
    wallet: { monthSpend: 3480.00 }
  },
  shifts: [
    {
      id: 's_1001',
      title: 'Garçom — Sexta (jantar)',
      restaurantId: 'r_021',
      restaurantName: 'Bistrô do Centro',
      location: 'Av. Paulista, 1000',
      startsAt: '2026-02-06T20:00:00.000Z',
      endsAt: '2026-02-07T02:00:00.000Z',
      payPerHour: 22,
      bonus: 25,
      requirements: ['Experiência salão', 'Uniforme preto', 'Pontualidade'],
      headcount: 3,
      filled: 1,
      status: 'open', // open | closed | canceled
    },
    {
      id: 's_1002',
      title: 'Bar — Sábado (noite)',
      restaurantId: 'r_021',
      restaurantName: 'Bistrô do Centro',
      location: 'Av. Paulista, 1000',
      startsAt: '2026-02-07T22:00:00.000Z',
      endsAt: '2026-02-08T04:00:00.000Z',
      payPerHour: 26,
      bonus: 0,
      requirements: ['Coquetelaria básica', 'Agilidade'],
      headcount: 2,
      filled: 2,
      status: 'closed',
    },
    {
      id: 's_2001',
      title: 'Caixa — Domingo (almoço)',
      restaurantId: 'r_032',
      restaurantName: 'Cantina Bella',
      location: 'R. Augusta, 80',
      startsAt: '2026-02-08T14:00:00.000Z',
      endsAt: '2026-02-08T19:00:00.000Z',
      payPerHour: 24,
      bonus: 10,
      requirements: ['Experiência caixa', 'Boa comunicação'],
      headcount: 1,
      filled: 0,
      status: 'open',
    },
  ],
  applications: [
    {
      id: 'a_5001',
      shiftId: 's_1002',
      freelancerId: 'f_001',
      status: 'approved', // draft | applied | approved | rejected | canceled
      appliedAt: '2026-01-20T11:10:00.000Z',
      note: 'Tenho 2 anos de bar em eventos.',
    },
    {
      id: 'a_5002',
      shiftId: 's_2001',
      freelancerId: 'f_001',
      status: 'applied',
      appliedAt: '2026-01-22T09:40:00.000Z',
      note: 'Disponível e com experiência em POS.',
    }
  ],
  work: [
    {
      id: 'w_7001',
      shiftId: 's_1002',
      freelancerId: 'f_001',
      status: 'scheduled', // scheduled | checked_in | completed | no_show
      checkInAt: null,
      checkOutAt: null,
      approvedByRestaurantAt: null,
      totalPay: null,
      payoutStatus: 'pending', // pending | paid
    }
  ],
  payments: [
    {
      id: 'p_9001',
      freelancerId: 'f_001',
      amount: 210.50,
      status: 'paid',
      createdAt: '2025-12-12T14:00:00.000Z',
      method: 'PIX'
    }
  ],
  restaurantShifts: [
    // mirror for restaurant view, linked by id in shifts
  ],
});

function loadState(){
  try{
    const raw = localStorage.getItem(LS_KEY);
    if(!raw) return seed();
    const s = JSON.parse(raw);
    return s;
  }catch{
    return seed();
  }
}

function saveState(){
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}

let state = loadState();

// --- UI helpers
const $ = (sel, root=document) => root.querySelector(sel);
const el = (tag, attrs={}, children=[]) => {
  const node = document.createElement(tag);
  for (const [k,v] of Object.entries(attrs)){
    if(k === 'class') node.className = v;
    else if(k === 'html') node.innerHTML = v;
    else if(k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  }
  for (const c of (Array.isArray(children) ? children : [children])){
    if(c == null) continue;
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return node;
};

function toast(title, body){
  const t = $('#toast');
  t.innerHTML = '';
  t.appendChild(el('div',{class:'toastTitle'}, title));
  t.appendChild(el('div',{class:'toastBody'}, body));
  t.classList.add('show');
  window.clearTimeout(toast._t);
  toast._t = window.setTimeout(()=>t.classList.remove('show'), 2600);
}

function route(){
  try {
    const hash = location.hash.replace('#','') || '/f/home';
    const [path, qs] = hash.split('?');
    const query = Object.fromEntries(new URLSearchParams(qs || '').entries());
    setActiveNav(path);
    render(path, query);
  } catch (err) {
    console.error(err);
    const view = $('#view');
    if (view) {
      view.innerHTML = '';
      view.appendChild(el('div',{class:'card'},[
        el('div',{class:'cardBody'},[
          el('div',{class:'cardTitle'},'Erro no protótipo'),
          el('div',{class:'cardMeta'},'Algo falhou ao renderizar esta tela. (Abra e recarregue com Ctrl+F5; se persistir, use “Resetar protótipo”.)'),
          el('pre',{class:'code', style:'white-space:pre-wrap; margin-top:10px;'}, String(err && (err.stack||err.message||err)))
        ])
      ]));
    }
    toast('Erro', 'Falha ao renderizar. Tente Ctrl+F5 ou resetar o protótipo.');
  }
}

function setActiveNav(path){
  document.querySelectorAll('.navLink').forEach(a=>{
    a.classList.toggle('active', a.dataset.route === path);
  });
}

function setRole(role){
  state.role = role;
  saveState();
  $('#roleLabel').textContent = role === 'freelancer' ? 'Freelancer' : 'Restaurante';
  toast('Perfil alterado', role === 'freelancer' ? 'Você está simulando o app do Freelancer.' : 'Você está simulando o painel do Restaurante.');
}

function currentRoleHome(){
  return state.role === 'freelancer' ? '/f/home' : '/r/home';
}

function ensureRoleForPath(path){
  if(path.startsWith('/f/') && state.role !== 'freelancer') setRole('freelancer');
  if(path.startsWith('/r/') && state.role !== 'restaurant') setRole('restaurant');
}

// --- Derived data
function getShift(shiftId){
  return state.shifts.find(s=>s.id === shiftId);
}

function getApplicationByShift(shiftId){
  return state.applications.find(a=>a.shiftId === shiftId && a.freelancerId === state.freelancer.id);
}

function getWorkByShift(shiftId){
  return state.work.find(w=>w.shiftId === shiftId && w.freelancerId === state.freelancer.id);
}

function calcShiftHours(shift){
  const ms = new Date(shift.endsAt) - new Date(shift.startsAt);
  return Math.max(0, ms / (1000*60*60));
}

function estimateShiftPay(shift){
  const h = calcShiftHours(shift);
  return Math.round((h * shift.payPerHour + (shift.bonus||0)) * 100) / 100;
}

function restaurantOwnedShifts(){
  return state.shifts.filter(s=>s.restaurantId === state.restaurant.id);
}

function applicantsForShift(shiftId){
  // fake pool + real applicant (Ana)
  const base = [
    { id:'f_019', name:'Bruno Lima', rating:4.5, skills:['Garçom(ete)'], lastJobs:12, reliability:93 },
    { id:'f_044', name:'Camila Rocha', rating:4.9, skills:['Bar','Salão'], lastJobs:27, reliability:97 },
    { id:'f_061', name:'Diego Alves', rating:4.2, skills:['Caixa'], lastJobs:8, reliability:88 },
  ];
  const ana = { id: state.freelancer.id, name: state.freelancer.name, rating: state.freelancer.rating, skills: state.freelancer.skills, lastJobs: 19, reliability: 95 };
  // if Ana applied for this shift, include her first
  const app = state.applications.find(a=>a.shiftId === shiftId && a.status !== 'draft');
  const list = app ? [ana, ...base] : base;
  return list;
}

// --- Actions (Freelancer)
function applyToShift(shiftId, note){
  const shift = getShift(shiftId);
  if(!shift || shift.status !== 'open'){
    toast('Não foi possível', 'Esse plantão não está aberto.');
    return;
  }
  const existing = getApplicationByShift(shiftId);
  if(existing && ['applied','approved'].includes(existing.status)){
    toast('Já enviado', 'Você já se candidatou para este plantão.');
    return;
  }
  const a = {
    id: 'a_' + Math.floor(Math.random()*90000 + 10000),
    shiftId,
    freelancerId: state.freelancer.id,
    status: 'applied',
    appliedAt: nowISO(),
    note: (note||'').slice(0,240)
  };
  if(existing){
    Object.assign(existing, a);
  } else {
    state.applications.push(a);
  }
  saveState();
  toast('Candidatura enviada', `Enviado para: ${shift.title} • ${shift.restaurantName}`);
  location.hash = '#/f/applications';
}

function cancelApplication(appId){
  const a = state.applications.find(x=>x.id === appId);
  if(!a) return;
  if(a.status === 'approved'){
    toast('Bloqueado', 'Neste protótipo: cancelamento após aprovação exigiria regras (penalidade/janela).');
    return;
  }
  a.status = 'canceled';
  saveState();
  toast('Cancelado', 'Sua candidatura foi cancelada.');
  route();
}

function checkIn(shiftId){
  let w = getWorkByShift(shiftId);
  const shift = getShift(shiftId);
  if(!shift) return;
  if(!w){
    w = {
      id: 'w_' + Math.floor(Math.random()*90000 + 10000),
      shiftId,
      freelancerId: state.freelancer.id,
      status: 'scheduled',
      checkInAt: null,
      checkOutAt: null,
      approvedByRestaurantAt: null,
      totalPay: null,
      payoutStatus: 'pending'
    };
    state.work.push(w);
  }
  w.status = 'checked_in';
  w.checkInAt = nowISO();
  saveState();
  toast('Check-in realizado', `Boa jornada! (${shift.title})`);
  route();
}

function checkOut(shiftId){
  const w = getWorkByShift(shiftId);
  const shift = getShift(shiftId);
  if(!w || !shift) return;
  w.status = 'completed';
  w.checkOutAt = nowISO();
  w.totalPay = estimateShiftPay(shift);
  // restaurant approval simulated later
  saveState();
  toast('Check-out enviado', 'Aguardando validação do restaurante.');
  route();
}

// --- Actions (Restaurant)
function createShift(data){
  const id = 's_' + Math.floor(Math.random()*90000 + 10000);
  const shift = {
    id,
    title: data.title,
    restaurantId: state.restaurant.id,
    restaurantName: state.restaurant.name,
    location: data.location,
    startsAt: data.startsAt,
    endsAt: data.endsAt,
    payPerHour: Number(data.payPerHour),
    bonus: Number(data.bonus||0),
    requirements: (data.requirements||'').split(',').map(s=>s.trim()).filter(Boolean),
    headcount: Number(data.headcount||1),
    filled: 0,
    status: 'open'
  };
  state.shifts.unshift(shift);
  saveState();
  toast('Plantão criado', `${shift.title} • ${fmtBRL(shift.payPerHour)}/h`);
  location.hash = '#/r/shifts';
}

function setShiftStatus(shiftId, status){
  const s = getShift(shiftId);
  if(!s) return;
  s.status = status;
  saveState();
  toast('Atualizado', `Status do plantão: ${status}`);
  route();
}

function approveFreelancerForShift(shiftId, freelancerId){
  const shift = getShift(shiftId);
  if(!shift) return;
  // update application if exists
  let app = state.applications.find(a=>a.shiftId===shiftId && a.freelancerId===freelancerId);
  if(!app){
    app = { id:'a_'+Math.floor(Math.random()*90000+10000), shiftId, freelancerId, status:'applied', appliedAt: nowISO(), note:'' };
    state.applications.push(app);
  }
  app.status = 'approved';

  // create/update work record
  let w = state.work.find(w=>w.shiftId===shiftId && w.freelancerId===freelancerId);
  if(!w){
    w = { id:'w_'+Math.floor(Math.random()*90000+10000), shiftId, freelancerId, status:'scheduled', checkInAt:null, checkOutAt:null, approvedByRestaurantAt:null, totalPay:null, payoutStatus:'pending' };
    state.work.push(w);
  }

  // fill spot if possible
  if(shift.filled < shift.headcount) shift.filled += 1;
  if(shift.filled >= shift.headcount) shift.status = 'closed';

  saveState();
  toast('Aprovado', 'Freelancer aprovado para o plantão.');
  route();
}

function validateWorkAndReleasePayment(shiftId, freelancerId){
  const w = state.work.find(w=>w.shiftId===shiftId && w.freelancerId===freelancerId);
  const shift = getShift(shiftId);
  if(!w || !shift) return;
  if(w.status !== 'completed'){
    toast('Não disponível', 'Só é possível validar após check-out (completed).');
    return;
  }
  if(!w.totalPay) w.totalPay = estimateShiftPay(shift);
  w.approvedByRestaurantAt = nowISO();
  w.payoutStatus = 'paid';
  // update freelancer wallet
  state.freelancer.wallet.balance = Math.round((state.freelancer.wallet.balance + w.totalPay) * 100) / 100;
  // add payment record
  state.payments.unshift({
    id: 'p_' + Math.floor(Math.random()*90000+10000),
    freelancerId,
    amount: w.totalPay,
    status: 'paid',
    createdAt: nowISO(),
    method: 'PIX'
  });
  saveState();
  toast('Pagamento liberado', `${fmtBRL(w.totalPay)} via PIX (simulado).`);
  route();
}

// --- Views
function layoutTitle(title, subtitle){
  return el('div',{},[
    el('div',{class:'h1'}, title),
    subtitle ? el('div',{class:'sub'}, subtitle) : null
  ]);
}

function kpis(items){
  const wrap = el('div',{class:'grid'});
  items.forEach(k=>{
    wrap.appendChild(el('div',{class:'kpi'},[
      el('div',{class:'kpiLabel'}, k.label),
      el('div',{class:'kpiValue'}, k.value),
      el('div',{class:'kpiHint'}, k.hint || '')
    ]));
  });
  return wrap;
}

function badgeStatus(label, kind=''){ return el('span',{class:`badge ${kind}`}, label); }

function viewFreelancerHome(){
  const pendingApps = state.applications.filter(a=>a.freelancerId===state.freelancer.id && a.status==='applied').length;
  const approved = state.applications.filter(a=>a.freelancerId===state.freelancer.id && a.status==='approved').length;
  const openCount = state.shifts.filter(s=>s.status==='open').length;

  return el('div',{},[
    layoutTitle(`Olá, ${state.freelancer.name.split(' ')[0]} 👋`.replace(' 👋',''), 'Escolha um caminho: buscar plantões, acompanhar candidaturas ou fazer check-in/out.'),
    kpis([
      { label:'Plantões abertos', value: String(openCount), hint:'Vagas disponíveis no marketplace' },
      { label:'Candidaturas pendentes', value: String(pendingApps), hint:'Aguardando resposta do restaurante' },
      { label:'Aprovadas', value: String(approved), hint:'Plantões confirmados' },
    ]),
    el('div',{style:'height:12px'}),
    el('div',{class:'card'},[
      el('div',{class:'cardBody'},[
        el('div',{class:'row'},[
          el('button',{class:'btn primary', onClick:()=>location.hash='#/f/gigs'}, 'Ver plantões'),
          el('button',{class:'btn', onClick:()=>location.hash='#/f/applications'}, 'Minhas candidaturas'),
          el('button',{class:'btn', onClick:()=>location.hash='#/f/wallet'}, 'Carteira'),
        ]),
        el('div',{class:'cardMeta', style:'margin-top:10px'}, 'Neste protótipo, os dados e estados são simulados e persistem no navegador (localStorage).')
      ])
    ])
  ]);
}

function viewGigList(){
  const open = state.shifts.filter(s=>s.status==='open');
  const list = el('div',{},[
    layoutTitle('Plantões disponíveis', 'Selecione um plantão para ver detalhes e se candidatar.'),
  ]);

  open.forEach(s=>{
    const existing = getApplicationByShift(s.id);
    const est = estimateShiftPay(s);
    const card = el('div',{class:'card'},[
      el('div',{class:'cardBody'},[
        el('div',{class:'row', style:'justify-content:space-between'},[
          el('div',{},[
            el('div',{class:'cardTitle'}, s.title),
            el('div',{class:'cardMeta'}, `${s.restaurantName} • ${s.location}`),
          ]),
          el('div',{class:'row'},[
            badgeStatus(`${fmtBRL(s.payPerHour)}/h`, 'ok'),
            (s.bonus>0? badgeStatus(`Bônus ${fmtBRL(s.bonus)}`, 'warn') : null),
            badgeStatus(`Estimado ${fmtBRL(est)}`, ''),
          ])
        ]),
        el('div',{class:'cardMeta', style:'margin-top:8px'}, `⏱️ ${fmtDate(s.startsAt)} → ${fmtDate(s.endsAt)} • Vagas: ${s.filled}/${s.headcount}`),
        el('div',{class:'row', style:'margin-top:10px'},[
          el('button',{class:'btn', onClick:()=>location.hash=`#/f/gig?shiftId=${encodeURIComponent(s.id)}`}, 'Ver detalhes'),
          existing?.status==='applied' ? badgeStatus('Candidatura enviada', 'warn') : null,
          existing?.status==='approved' ? badgeStatus('Aprovado', 'ok') : null,
        ])
      ])
    ]);
    list.appendChild(card);
  });

  if(open.length===0){
    list.appendChild(el('div',{class:'card'},[
      el('div',{class:'cardBody'},[
        el('div',{class:'cardTitle'}, 'Sem plantões abertos agora'),
        el('div',{class:'cardMeta'}, 'No protótipo: altere status no painel do restaurante.')
      ])
    ]));
  }

  return list;
}

function viewGigDetail({shiftId}){
  const s = getShift(shiftId);
  if(!s) return el('div',{},[layoutTitle('Não encontrado', 'Esse plantão não existe no protótipo.')]);
  const existing = getApplicationByShift(s.id);
  const est = estimateShiftPay(s);

  const noteId = 'note';

  return el('div',{},[
    layoutTitle('Detalhe do plantão', `${s.restaurantName} • ${s.location}`),
    el('div',{class:'card'},[
      el('div',{class:'cardBody'},[
        el('div',{class:'row', style:'justify-content:space-between'},[
          el('div',{},[
            el('div',{class:'cardTitle'}, s.title),
            el('div',{class:'cardMeta'}, `⏱️ ${fmtDate(s.startsAt)} → ${fmtDate(s.endsAt)}`),
            el('div',{class:'cardMeta'}, `Vagas: ${s.filled}/${s.headcount} • Status: ${s.status}`),
          ]),
          el('div',{class:'row'},[
            badgeStatus(`${fmtBRL(s.payPerHour)}/h`, 'ok'),
            (s.bonus>0? badgeStatus(`Bônus ${fmtBRL(s.bonus)}`, 'warn') : null),
            badgeStatus(`Total estimado ${fmtBRL(est)}`, ''),
          ])
        ]),

        el('div',{style:'height:10px'}),
        el('div',{class:'cardTitle'}, 'Requisitos'),
        el('div',{class:'cardMeta'}, s.requirements.length? '• '+s.requirements.join('\n• ') : 'Sem requisitos'),

        el('div',{style:'height:12px'}),
        el('div',{class:'row', style:'align-items:flex-end'},[
          el('div',{style:'flex:1; min-width:220px'},[
            el('label',{for:noteId}, 'Mensagem opcional'),
            el('input',{id:noteId, class:'input', placeholder:'Ex: Tenho experiência e chego 15 min antes…', style:'width:100%; margin-top:6px'})
          ]),
          el('button',{class:'btn primary', onClick:()=>applyToShift(s.id, $('#'+noteId).value)}, existing && existing.status!=='canceled' ? 'Reenviar (atualizar)' : 'Candidatar-se')
        ]),

        existing ? el('div',{class:'row', style:'margin-top:10px'},[
          badgeStatus(`Status: ${existing.status}`, existing.status==='approved'?'ok':(existing.status==='applied'?'warn':'bad')),
          el('span',{class:'badge'}, `Enviado em: ${fmtDate(existing.appliedAt)}`)
        ]) : null,

        el('div',{style:'height:10px'}),
        el('div',{class:'row'},[
          el('button',{class:'btn', onClick:()=>history.back()}, 'Voltar'),
          el('button',{class:'btn', onClick:()=>location.hash='#/f/applications'}, 'Minhas candidaturas')
        ])
      ])
    ])
  ]);
}

function viewApplications(){
  const apps = state.applications.filter(a=>a.freelancerId===state.freelancer.id).slice().sort((a,b)=> (b.appliedAt||'').localeCompare(a.appliedAt||''));

  const wrap = el('div',{},[
    layoutTitle('Minhas candidaturas', 'Acompanhe status: aplicada → aprovada/rejeitada. Após aprovada, aparece em “Meus plantões”.'),
  ]);

  if(apps.length===0){
    wrap.appendChild(el('div',{class:'card'},[
      el('div',{class:'cardBody'},[
        el('div',{class:'cardTitle'}, 'Nenhuma candidatura ainda'),
        el('div',{class:'cardMeta'}, 'Vá em Plantões e candidate-se.')
      ])
    ]));
    return wrap;
  }

  apps.forEach(a=>{
    const s = getShift(a.shiftId);
    const kind = a.status==='approved'?'ok':(a.status==='applied'?'warn':(a.status==='canceled'?'':'bad'));
    wrap.appendChild(el('div',{class:'card'},[
      el('div',{class:'cardBody'},[
        el('div',{class:'row', style:'justify-content:space-between'},[
          el('div',{},[
            el('div',{class:'cardTitle'}, s ? s.title : '(Plantão removido)'),
            el('div',{class:'cardMeta'}, s ? `${s.restaurantName} • ${fmtDate(s.startsAt)}` : ''),
          ]),
          el('div',{class:'row'},[
            badgeStatus(a.status, kind),
            s ? badgeStatus(fmtBRL(estimateShiftPay(s))) : null
          ])
        ]),
        el('div',{class:'cardMeta', style:'margin-top:8px'}, a.note ? `“${a.note}”` : 'Sem mensagem.'),
        el('div',{class:'row', style:'margin-top:10px'},[
          s ? el('button',{class:'btn', onClick:()=>location.hash=`#/f/gig?shiftId=${encodeURIComponent(s.id)}`}, 'Ver plantão') : null,
          (a.status==='applied') ? el('button',{class:'btn danger', onClick:()=>cancelApplication(a.id)}, 'Cancelar') : null,
          (a.status==='approved') ? el('button',{class:'btn ok', onClick:()=>location.hash='#/f/shifts'}, 'Ir para Meus plantões') : null,
        ])
      ])
    ]));
  });

  return wrap;
}

function viewMyShifts(){
  const approvedApps = state.applications.filter(a=>a.freelancerId===state.freelancer.id && a.status==='approved');
  const wrap = el('div',{},[
    layoutTitle('Meus plantões', 'Fluxo do MVP: aprovado → check-in → check-out → validação → pagamento.'),
  ]);

  if(approvedApps.length===0){
    wrap.appendChild(el('div',{class:'card'},[
      el('div',{class:'cardBody'},[
        el('div',{class:'cardTitle'}, 'Nenhum plantão aprovado'),
        el('div',{class:'cardMeta'}, 'Aguarde aprovação ou candidate-se a outros plantões.')
      ])
    ]));
    return wrap;
  }

  approvedApps.forEach(a=>{
    const s = getShift(a.shiftId);
    const w = getWorkByShift(a.shiftId);
    const status = w?.status || 'scheduled';
    wrap.appendChild(el('div',{class:'card'},[
      el('div',{class:'cardBody'},[
        el('div',{class:'row', style:'justify-content:space-between'},[
          el('div',{},[
            el('div',{class:'cardTitle'}, s?.title || '(Plantão removido)'),
            el('div',{class:'cardMeta'}, s ? `${s.restaurantName} • ${fmtDate(s.startsAt)}` : ''),
          ]),
          el('div',{class:'row'},[
            badgeStatus(`Work: ${status}`, status==='completed'?'ok':(status==='checked_in'?'warn':'')),
            s ? badgeStatus(fmtBRL(estimateShiftPay(s))) : null
          ])
        ]),
        el('div',{class:'row', style:'margin-top:10px'},[
          (status==='scheduled') ? el('button',{class:'btn primary', onClick:()=>checkIn(s.id)}, 'Check-in') : null,
          (status==='checked_in') ? el('button',{class:'btn ok', onClick:()=>checkOut(s.id)}, 'Check-out') : null,
          (status==='completed') ? badgeStatus(w?.approvedByRestaurantAt ? 'Validado pelo restaurante' : 'Aguardando validação', w?.approvedByRestaurantAt?'ok':'warn') : null,
          el('button',{class:'btn', onClick:()=>location.hash=`#/f/gig?shiftId=${encodeURIComponent(s.id)}`}, 'Ver detalhes')
        ]),
        w?.checkInAt ? el('div',{class:'cardMeta', style:'margin-top:8px'}, `Check-in: ${fmtDate(w.checkInAt)}`) : null,
        w?.checkOutAt ? el('div',{class:'cardMeta'}, `Check-out: ${fmtDate(w.checkOutAt)}`) : null,
      ])
    ]));
  });

  return wrap;
}

function viewWallet(){
  const w = state.freelancer.wallet;
  const pay = state.payments.filter(p=>p.freelancerId===state.freelancer.id);

  const wrap = el('div',{},[
    layoutTitle('Carteira', 'Saldo e histórico de pagamentos (simulado).'),
    kpis([
      { label:'Saldo disponível', value: fmtBRL(w.balance), hint:'No MVP: PIX instantâneo (após validação)' },
      { label:'Pendente', value: fmtBRL(w.pending||0), hint:'Reservado / aguardando eventos' },
      { label:'Último pagamento', value: w.lastPayoutAt ? fmtDate(w.lastPayoutAt) : '—', hint:'Registro fake' },
    ]),
    el('div',{style:'height:12px'}),
    el('div',{class:'card'},[
      el('div',{class:'cardBody'},[
        el('div',{class:'cardTitle'}, 'Pagamentos'),
        el('div',{style:'height:8px'}),
        renderPaymentsTable(pay)
      ])
    ])
  ]);
  return wrap;
}

function renderPaymentsTable(pay){
  if(pay.length===0) return el('div',{class:'cardMeta'}, 'Nenhum pagamento ainda.');
  const table = el('table',{class:'table'});
  table.appendChild(el('thead',{}, el('tr',{},[
    el('th',{},'Data'),
    el('th',{},'Valor'),
    el('th',{},'Status'),
    el('th',{},'Método'),
  ])));
  const tb = el('tbody');
  pay.forEach(p=>{
    tb.appendChild(el('tr',{},[
      el('td',{}, fmtDate(p.createdAt)),
      el('td',{}, fmtBRL(p.amount)),
      el('td',{}, p.status),
      el('td',{}, p.method),
    ]));
  });
  table.appendChild(tb);
  return table;
}

function viewFreelancerProfile(){
  const f = state.freelancer;
  return el('div',{},[
    layoutTitle('Perfil do freelancer', 'Dados principais e status de verificação (simulado).'),
    el('div',{class:'card'},[
      el('div',{class:'cardBody'},[
        el('div',{class:'row', style:'justify-content:space-between'},[
          el('div',{},[
            el('div',{class:'cardTitle'}, f.name),
            el('div',{class:'cardMeta'}, `⭐ ${f.rating} • Habilidades: ${f.skills.join(', ')}`)
          ]),
          el('div',{class:'row'},[
            badgeStatus(f.docs.cpf?'CPF OK':'CPF pendente', f.docs.cpf?'ok':'warn'),
            badgeStatus(f.docs.pix?'PIX OK':'PIX pendente', f.docs.pix?'ok':'warn'),
            badgeStatus(f.docs.backgroundCheck?'Background OK':'Background pendente', f.docs.backgroundCheck?'ok':'warn'),
          ])
        ]),
        el('div',{style:'height:12px'}),
        el('div',{class:'row'},[
          el('button',{class:'btn', onClick:()=>{ f.docs.backgroundCheck = !f.docs.backgroundCheck; saveState(); toast('Atualizado','Background check alternado (simulado).'); route(); }}, 'Alternar background check'),
          el('button',{class:'btn danger', onClick:()=>{ localStorage.removeItem(LS_KEY); state = seed(); setRole('freelancer'); location.hash='#/f/home'; toast('Reset','Estado do protótipo reiniciado.'); }}, 'Resetar protótipo')
        ]),
      ])
    ])
  ]);
}

// Restaurant views
function viewRestaurantHome(){
  const owned = restaurantOwnedShifts();
  const open = owned.filter(s=>s.status==='open').length;
  const closed = owned.filter(s=>s.status==='closed').length;
  const pendingValidation = state.work.filter(w=>{
    const s = getShift(w.shiftId);
    return s?.restaurantId===state.restaurant.id && w.status==='completed' && !w.approvedByRestaurantAt;
  }).length;

  return el('div',{},[
    layoutTitle(`Painel — ${state.restaurant.name}`, 'Crie plantões, aprove candidatos e valide check-out para liberar pagamento.'),
    kpis([
      { label:'Plantões abertos', value: String(open), hint:'Publicados no marketplace' },
      { label:'Plantões fechados', value: String(closed), hint:'Sem vagas restantes' },
      { label:'Pendências de validação', value: String(pendingValidation), hint:'Check-outs aguardando aprovação' },
    ]),
    el('div',{style:'height:12px'}),
    el('div',{class:'card'},[
      el('div',{class:'cardBody'},[
        el('div',{class:'row'},[
          el('button',{class:'btn primary', onClick:()=>location.hash='#/r/shifts'}, 'Gerenciar plantões'),
          el('button',{class:'btn', onClick:()=>location.hash='#/r/applicants'}, 'Ver candidatos'),
          el('button',{class:'btn', onClick:()=>location.hash='#/r/payments'}, 'Pagamentos'),
        ]),
        el('div',{class:'cardMeta', style:'margin-top:10px'}, 'Dica: Aprove a Ana em um plantão → ela verá em “Meus plantões” e poderá fazer check-in/out. Depois valide aqui para liberar pagamento (simulado).')
      ])
    ])
  ]);
}

function viewRestaurantShifts(){
  const owned = restaurantOwnedShifts().slice().sort((a,b)=> (a.startsAt||'').localeCompare(b.startsAt||''));

  const form = el('div',{class:'card'},[
    el('div',{class:'cardBody'},[
      el('div',{class:'cardTitle'}, 'Criar novo plantão'),
      el('div',{class:'cardMeta'}, 'Campos mínimos para simular publicação.'),
      el('div',{style:'height:10px'}),
      shiftCreateForm()
    ])
  ]);

  const wrap = el('div',{},[
    layoutTitle('Plantões (restaurante)', 'Gerencie status e vagas. Aprovação de candidatos fica na aba “Candidatos”.'),
    form,
    el('div',{style:'height:12px'}),
  ]);

  owned.forEach(s=>{
    wrap.appendChild(el('div',{class:'card'},[
      el('div',{class:'cardBody'},[
        el('div',{class:'row', style:'justify-content:space-between'},[
          el('div',{},[
            el('div',{class:'cardTitle'}, s.title),
            el('div',{class:'cardMeta'}, `⏱️ ${fmtDate(s.startsAt)} → ${fmtDate(s.endsAt)} • ${s.location}`),
            el('div',{class:'cardMeta'}, `Vagas: ${s.filled}/${s.headcount}`),
          ]),
          el('div',{class:'row'},[
            badgeStatus(s.status, s.status==='open'?'ok':(s.status==='closed'?'warn':'')),
            badgeStatus(`${fmtBRL(s.payPerHour)}/h`, 'ok'),
          ])
        ]),
        el('div',{class:'row', style:'margin-top:10px'},[
          el('button',{class:'btn', onClick:()=>location.hash=`#/r/shift?shiftId=${encodeURIComponent(s.id)}`}, 'Ver detalhes'),
          el('button',{class:'btn', onClick:()=>setShiftStatus(s.id,'open')}, 'Abrir'),
          el('button',{class:'btn', onClick:()=>setShiftStatus(s.id,'closed')}, 'Fechar'),
          el('button',{class:'btn danger', onClick:()=>setShiftStatus(s.id,'canceled')}, 'Cancelar'),
        ])
      ])
    ]));
  });

  if(owned.length===0){
    wrap.appendChild(el('div',{class:'card'},[
      el('div',{class:'cardBody'},[
        el('div',{class:'cardTitle'}, 'Nenhum plantão do restaurante ainda'),
        el('div',{class:'cardMeta'}, 'Crie acima para começar.')
      ])
    ]));
  }

  return wrap;
}

function shiftCreateForm(){
  const id = (x)=>`sc_${x}`;

  const defaults = {
    title: 'Garçom — Terça (almoço)',
    location: state.restaurant.address,
    startsAt: '2026-02-10T14:00',
    endsAt: '2026-02-10T19:00',
    payPerHour: 24,
    bonus: 15,
    headcount: 2,
    requirements: 'Uniforme preto, Pontualidade'
  };

  const form = el('div',{},[
    el('div',{class:'grid'},[
      fieldText('Título', id('title'), defaults.title, 12),
      fieldText('Local', id('loc'), defaults.location, 12),
      fieldText('Início (ISO local)', id('start'), defaults.startsAt, 6),
      fieldText('Fim (ISO local)', id('end'), defaults.endsAt, 6),
      fieldText('R$/hora', id('pph'), String(defaults.payPerHour), 4),
      fieldText('Bônus (opcional)', id('bonus'), String(defaults.bonus), 4),
      fieldText('Vagas (headcount)', id('hc'), String(defaults.headcount), 4),
      fieldText('Requisitos (separar por vírgula)', id('req'), defaults.requirements, 12),
    ]),
    el('div',{class:'row', style:'margin-top:10px'},[
      el('button',{class:'btn primary', onClick:()=>{
        const title = $('#'+id('title')).value.trim();
        const location = $('#'+id('loc')).value.trim();
        const startsAt = new Date($('#'+id('start')).value).toISOString();
        const endsAt = new Date($('#'+id('end')).value).toISOString();
        const payPerHour = Number($('#'+id('pph')).value);
        const bonus = Number($('#'+id('bonus')).value);
        const headcount = Number($('#'+id('hc')).value);
        const requirements = $('#'+id('req')).value;
        if(!title || !location || !payPerHour || !headcount){
          toast('Campos obrigatórios', 'Preencha título, local, R$/hora e vagas.');
          return;
        }
        createShift({title, location, startsAt, endsAt, payPerHour, bonus, headcount, requirements});
      }}, 'Publicar plantão')
    ])
  ]);

  return form;
}

function fieldText(labelText, id, value, span=12){
  return el('div',{style:`grid-column: span ${span};`},[
    el('label',{for:id}, labelText),
    el('input',{class:'input', id, value, style:'width:100%; margin-top:6px'})
  ]);
}

function viewRestaurantShiftDetail({shiftId}){
  const s = getShift(shiftId);
  if(!s) return el('div',{},[layoutTitle('Não encontrado', 'Esse plantão não existe no protótipo.')]);
  if(s.restaurantId !== state.restaurant.id){
    return el('div',{},[layoutTitle('Sem acesso', 'No protótipo: só mostra detalhes do restaurante selecionado.')]);
  }

  const apps = state.applications.filter(a=>a.shiftId===s.id && a.status!=='draft' && a.status!=='canceled');

  return el('div',{},[
    layoutTitle('Detalhe do plantão (restaurante)', `${s.title}`),
    el('div',{class:'card'},[
      el('div',{class:'cardBody'},[
        el('div',{class:'row', style:'justify-content:space-between'},[
          el('div',{},[
            el('div',{class:'cardTitle'}, s.title),
            el('div',{class:'cardMeta'}, `${fmtDate(s.startsAt)} → ${fmtDate(s.endsAt)}`),
            el('div',{class:'cardMeta'}, `Vagas: ${s.filled}/${s.headcount} • ${s.location}`),
          ]),
          el('div',{class:'row'},[
            badgeStatus(s.status, s.status==='open'?'ok':(s.status==='closed'?'warn':'')),
            badgeStatus(`${fmtBRL(s.payPerHour)}/h`, 'ok'),
            s.bonus>0? badgeStatus(`Bônus ${fmtBRL(s.bonus)}`, 'warn'):null,
          ])
        ]),
        el('div',{style:'height:12px'}),
        el('div',{class:'cardTitle'}, 'Candidaturas (no protótipo)'),
        el('div',{class:'cardMeta'}, apps.length ? `Total: ${apps.length}` : 'Sem candidaturas registradas.'),
        el('div',{style:'height:10px'}),
        el('div',{class:'row'},[
          el('button',{class:'btn', onClick:()=>location.hash=`#/r/applicants?shiftId=${encodeURIComponent(s.id)}`}, 'Ver candidatos'),
          el('button',{class:'btn', onClick:()=>history.back()}, 'Voltar')
        ])
      ])
    ])
  ]);
}

function viewRestaurantApplicants({shiftId}){
  const owned = restaurantOwnedShifts();
  const selected = shiftId || (owned[0]?.id || null);
  const s = selected ? getShift(selected) : null;

  const sel = el('select', { class:'input', style:'min-width:260px', onChange:(e)=>{
    location.hash = `#/r/applicants?shiftId=${encodeURIComponent(e.target.value)}`;
  }});

  owned.forEach(x=>{
    sel.appendChild(el('option',{value:x.id, ...(x.id===selected?{selected:'selected'}:{})}, `${x.title} (${x.filled}/${x.headcount})`));
  });

  const list = el('div',{});
  if(!s){
    list.appendChild(el('div',{class:'card'}, el('div',{class:'cardBody'},[
      el('div',{class:'cardTitle'}, 'Nenhum plantão para mostrar'),
      el('div',{class:'cardMeta'}, 'Crie um plantão na aba Plantões.')
    ])));
  } else {
    const applicants = applicantsForShift(s.id);
    applicants.forEach(f=>{
      const app = state.applications.find(a=>a.shiftId===s.id && a.freelancerId===f.id);
      const isApproved = app?.status==='approved';
      list.appendChild(el('div',{class:'card'},[
        el('div',{class:'cardBody'},[
          el('div',{class:'row', style:'justify-content:space-between'},[
            el('div',{},[
              el('div',{class:'cardTitle'}, f.name),
              el('div',{class:'cardMeta'}, `⭐ ${f.rating} • ${f.skills.join(', ')}`),
              el('div',{class:'cardMeta'}, `Jobs: ${f.lastJobs} • Confiabilidade: ${f.reliability}%`),
            ]),
            el('div',{class:'row'},[
              isApproved ? badgeStatus('Aprovado', 'ok') : (app? badgeStatus('Candidatou-se', 'warn') : badgeStatus('Sugestão', '')),
            ])
          ]),
          el('div',{class:'row', style:'margin-top:10px'},[
            el('button',{class:'btn primary', onClick:()=>approveFreelancerForShift(s.id, f.id)}, isApproved ? 'Reaprovar' : 'Aprovar'),
            el('button',{class:'btn', onClick:()=>toast('Detalhe (MVP)','No MVP: abrir perfil completo, docs, histórico e chat.')}, 'Ver perfil'),
          ])
        ])
      ]));
    });
  }

  return el('div',{},[
    layoutTitle('Candidatos', 'Selecione um plantão e aprove freelancers. Isso alimenta o fluxo do app do freelancer.'),
    el('div',{class:'card'},[
      el('div',{class:'cardBody'},[
        el('div',{class:'row'},[
          el('div',{},[
            el('label',{},'Plantão'),
            el('div',{style:'height:6px'}),
            sel,
          ]),
          s ? el('div',{class:'badge'}, `Status: ${s.status}`) : null,
          s ? el('div',{class:'badge'}, `Vagas: ${s.filled}/${s.headcount}`) : null,
        ])
      ])
    ]),
    el('div',{style:'height:12px'}),
    list
  ]);
}

function viewRestaurantPayments(){
  // show validations and payment releases for restaurant's shifts
  const rows = state.work
    .map(w=>({ w, s: getShift(w.shiftId) }))
    .filter(x=>x.s && x.s.restaurantId===state.restaurant.id)
    .sort((a,b)=> (b.w.checkOutAt||'').localeCompare(a.w.checkOutAt||''));

  const wrap = el('div',{},[
    layoutTitle('Pagamentos & validação', 'No MVP: validação (geolocalização/QR), contestação, e repasse automático via PIX.'),
  ]);

  wrap.appendChild(el('div',{class:'card'},[
    el('div',{class:'cardBody'},[
      el('div',{class:'cardTitle'}, 'Pendências / Histórico'),
      el('div',{style:'height:8px'}),
      rows.length ? renderRestaurantPayTable(rows) : el('div',{class:'cardMeta'}, 'Sem registros ainda. Aprove alguém e faça check-in/out no app do freelancer.')
    ])
  ]));

  return wrap;
}

function renderRestaurantPayTable(rows){
  const table = el('table',{class:'table'});
  table.appendChild(el('thead',{}, el('tr',{},[
    el('th',{},'Plantão'),
    el('th',{},'Freelancer'),
    el('th',{},'Status'),
    el('th',{},'Valor'),
    el('th',{},'Ação'),
  ])));
  const tb = el('tbody');

  rows.forEach(({w,s})=>{
    const freelancerName = (w.freelancerId===state.freelancer.id) ? state.freelancer.name : w.freelancerId;
    const pay = w.totalPay ?? (s ? estimateShiftPay(s) : 0);
    const status = w.approvedByRestaurantAt ? 'validado/pago' : w.status;
    const canValidate = (w.status==='completed' && !w.approvedByRestaurantAt);

    const actionCell = canValidate
      ? el('button',{class:'btn ok', onClick:()=>validateWorkAndReleasePayment(s.id, w.freelancerId)}, 'Validar & pagar')
      : el('span',{class:'badge'}, w.approvedByRestaurantAt ? `Pago ${fmtDate(w.approvedByRestaurantAt)}` : '—');

    tb.appendChild(el('tr',{},[
      el('td',{}, s.title),
      el('td',{}, freelancerName),
      el('td',{}, status),
      el('td',{}, fmtBRL(pay)),
      el('td',{}, actionCell),
    ]));
  });

  table.appendChild(tb);
  return table;
}

function viewRestaurantProfile(){
  const r = state.restaurant;
  return el('div',{},[
    layoutTitle('Perfil do restaurante', 'Dados da empresa e status de verificação (simulado).'),
    el('div',{class:'card'},[
      el('div',{class:'cardBody'},[
        el('div',{class:'row', style:'justify-content:space-between'},[
          el('div',{},[
            el('div',{class:'cardTitle'}, r.name),
            el('div',{class:'cardMeta'}, r.address),
            el('div',{class:'cardMeta'}, `⭐ ${r.rating}`),
          ]),
          el('div',{class:'row'},[
            badgeStatus(r.cnpjVerified?'CNPJ verificado':'CNPJ pendente', r.cnpjVerified?'ok':'warn'),
          ])
        ]),
        el('div',{style:'height:12px'}),
        el('div',{class:'row'},[
          el('button',{class:'btn', onClick:()=>{ r.cnpjVerified = !r.cnpjVerified; saveState(); toast('Atualizado','Verificação CNPJ alternada (simulado).'); route(); }}, 'Alternar CNPJ verificado'),
          el('button',{class:'btn', onClick:()=>toast('MVP','Próximo: equipe, permissões (gerente/caixa), e faturamento.')}, 'Ver roadmap')
        ])
      ])
    ])
  ]);
}

function viewAbout(){
  return el('div',{},[
    layoutTitle('Sobre este protótipo', 'Objetivo: demonstrar fluxos do MVP TrampoJá com estados e telas, sem backend.'),

    el('div',{class:'card'},[
      el('div',{class:'cardBody'},[
        el('div',{class:'cardTitle'}, 'Como usar (demo rápida)'),
        el('div',{class:'cardMeta', html: `
          <ol>
            <li>Comece em <b>Restaurante → Candidatos</b> e <b>Aprove</b> a Ana em um plantão.</li>
            <li>Troque o perfil para <b>Freelancer</b> (botão no topo) e vá em <b>Meus plantões</b>.</li>
            <li>Faça <b>Check-in</b> → <b>Check-out</b>.</li>
            <li>Volte ao perfil <b>Restaurante → Pagamentos</b> e clique <b>Validar & pagar</b>.</li>
            <li>Veja o saldo do freelancer em <b>Freelancer → Carteira</b>.</li>
          </ol>
        `})
      ])
    ]),

    el('div',{style:'height:12px'}),

    el('div',{class:'card'},[
      el('div',{class:'cardBody'},[
        el('div',{class:'cardTitle'}, 'Estados simulados (MVP)'),
        el('div',{class:'cardMeta', html:`
          <ul>
            <li><b>Plantão</b>: open | closed | canceled</li>
            <li><b>Candidatura</b>: applied | approved | rejected | canceled</li>
            <li><b>Execução (work)</b>: scheduled | checked_in | completed | no_show</li>
            <li><b>Pagamento</b>: pending | paid</li>
          </ul>
        `})
      ])
    ]),

    el('div',{style:'height:12px'}),

    el('div',{class:'card'},[
      el('div',{class:'cardBody'},[
        el('div',{class:'cardTitle'}, 'O que falta (próximos passos)'),
        el('div',{class:'cardMeta', html:`
          <ul>
            <li>Autenticação + escolha de perfil</li>
            <li>Geolocalização/QR para check-in/out</li>
            <li>Chat e notificações (aprovação, lembretes, cancelamentos)</li>
            <li>Regras: janela de cancelamento, penalidades, lista de espera</li>
            <li>Pagamentos PIX (split), KYC, antifraude e disputas</li>
            <li>Painel admin: suporte, moderação e métricas</li>
          </ul>
        `})
      ])
    ])
  ]);
}

function render(path, query){
  ensureRoleForPath(path);
  const view = $('#view');
  view.innerHTML='';

  const routes = {
    '/f/home': viewFreelancerHome,
    '/f/gigs': viewGigList,
    '/f/gig': () => viewGigDetail(query),
    '/f/applications': viewApplications,
    '/f/shifts': viewMyShifts,
    '/f/wallet': viewWallet,
    '/f/profile': viewFreelancerProfile,

    '/r/home': viewRestaurantHome,
    '/r/shifts': viewRestaurantShifts,
    '/r/shift': () => viewRestaurantShiftDetail(query),
    '/r/applicants': () => viewRestaurantApplicants(query),
    '/r/payments': viewRestaurantPayments,
    '/r/profile': viewRestaurantProfile,

    '/about': viewAbout,
  };

  const fn = routes[path] || (()=> el('div',{},[layoutTitle('Rota não encontrada', path)]));
  view.appendChild(fn());
}

// PWA install prompt (best-effort)
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e)=>{
  e.preventDefault();
  deferredPrompt = e;
  $('#btnInstall').style.display = 'inline-block';
});

$('#btnInstall').addEventListener('click', async ()=>{
  if(!deferredPrompt){
    toast('Instalação', 'Se seu navegador suportar, use o menu “Instalar app”.');
    return;
  }
  deferredPrompt.prompt();
  const choice = await deferredPrompt.userChoice;
  deferredPrompt = null;
  toast('Instalação', `Resposta: ${choice.outcome}`);
});

$('#btnRole').addEventListener('click', ()=>{
  const next = state.role === 'freelancer' ? 'restaurant' : 'freelancer';
  setRole(next);
  location.hash = '#' + currentRoleHome();
});

// init role label
$('#roleLabel').textContent = state.role === 'freelancer' ? 'Freelancer' : 'Restaurante';

window.addEventListener('hashchange', route);
window.addEventListener('load', ()=>{
  // service worker
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
  }
  if(!location.hash) location.hash = '#' + currentRoleHome();
  route();
});
