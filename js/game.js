'use strict';

/* =========================================================================
   ДЕТЕКТОР ЛЖИ: ПОЙМАЙ ОБМАНЩИКА
   Чистый HTML5 / CSS / JavaScript. Без внешних ассетов и тяжёлых движков.
   ========================================================================= */

const $ = (sel) => document.querySelector(sel);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (a, b) => a + Math.random() * (b - a);
const randInt = (a, b) => Math.floor(rand(a, b + 1));
const choice = (arr) => arr[Math.floor(Math.random() * arr.length)];
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t) => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);

const app = $('#app');
const canvas = $('#scene');
const ctx = canvas.getContext('2d');

const ui = {
  score: $('#score'),
  best: $('#best'),
  lives: $('#lives'),
  combo: $('#combo'),
  soundBtn: $('#soundBtn'),
  dialogue: $('#dialogue'),
  speech: $('#speech'),
  speaker: $('#speaker'),
  caseNo: $('#caseNo'),
  speechText: $('#speechText'),
  resultBadge: $('#resultBadge'),
  timerFill: $('#timerFill'),
  timerSec: $('#timerSec'),
  timerWrap: $('#timerWrap'),
  floatPoints: $('#floatPoints'),
  btnTruth: $('#btnTruth'),
  btnLie: $('#btnLie'),
  startScreen: $('#startScreen'),
  gameOverScreen: $('#gameOverScreen'),
  overKicker: $('#overKicker'),
  overTitle: $('#overTitle'),
  finalScore: $('#finalScore'),
  finalCorrect: $('#finalCorrect'),
  finalCombo: $('#finalCombo'),
  finalBest: $('#finalBest'),
  newRecord: $('#newRecord'),
  btnStart: $('#btnStart'),
  btnRestart: $('#btnRestart'),
  btnMenu: $('#btnMenu'),
  btnRevive: $('#btnRevive'),
  btnDouble: $('#btnDouble'),
  recordsStart: $('#recordsStart'),
  toast: $('#toast'),
  flash: $('#flash'),
  adOverlay: $('#adOverlay'),
  adProgress: $('#adProgress'),
  adCount: $('#adCount'),
  adClose: $('#adClose'),
};

/* ------------------------------- ДАННЫЕ -------------------------------- */

const PHRASES = [
  'Я встаю в шесть утра. Каждый день. Даже в субботу.',
  'Я не смотрел этот сериал, просто знаю, чем он закончится.',
  'Мой кот сам открывает холодильник. Я его не учил.',
  'Я бросил сахар. Правда, кладу три ложки, но это для вкуса.',
  'Я прочитал всю инструкцию. Ну, первые две строчки.',
  'Я не боюсь стоматолога. Просто предпочитаю умирать с зубами.',
  'У меня дома идеальный порядок. Если не открывать шкаф.',
  'Я занимаюсь спортом каждый день. Пульт — тоже спортивный снаряд.',
  'Я не ем ночью. Я просто проверяю, не испортился ли торт.',
  'Я запомнил твоё имя с первого раза. Как тебя, кстати?',
  'Я экономлю. Поэтому купил третью пару кроссовок.',
  'Я не ревнивый. Просто проверяю твой телефон из любви.',
  'Я умею готовить. Главное — не отходить от телефона с доставкой.',
  'Я рано ложусь спать. В четыре утра, как все нормальные люди.',
  'Я никогда не опаздываю. Я просто прихожу в своё время.',
  'Я люблю свою работу. Особенно пятницу и зарплату.',
  'Я не сплю на совещаниях. Просто моргаю очень долго.',
  'Я всё помню. Где ключи — это другое дело.',
  'Я умею слушать. Пока не начнётся что-то интересное в телефоне.',
  'Я не курю. Только когда стресс. А стресс у меня всегда.',
  'Я посадил дерево, построил дом и вырастил сына. В Sims.',
  'Я не боюсь пауков. Просто прошу кого-то убить его за меня.',
  'Я читаю книги. Ну, обложки точно читаю.',
  'Я пью только по праздникам. А праздник — это вторник.',
  'Я не вру. Просто рассказываю правду в удобной редакции.',
  'У меня нет чувства юмора. Это была шутка.',
  'Я не забыл про твой день рождения. Просто жду сюрприза.',
  'Я хожу в зал. Правда, только мимо.',
  'Я не злюсь. У меня просто лицо такое.',
  'Я закончил ремонт. Осталась только одна стена и всё остальное.',
  'Я не храплю. Это кот. Кот весом девяносто килограммов.',
  'Я умею хранить секреты. Если мне их не рассказывать.',
  'Я не пью кофе. Только пять чашек, и то для бодрости.',
  'Я всё спланировал. Экспромт — часть плана.',
  'Я не смотрю цены. Просто плачу и плачу.',
  'Я в отличной форме. Круглой, но отличной.',
  'Я не боюсь высоты. Просто люблю крепко держаться за перила.',
  'Я готов к зиме. Купил мороженое и плед.',
  'Я не завишу от телефона. Два процента? Я спокоен. Я СПОКОЕН!',
  'Я не ем фастфуд. Просто иногда провожу там инспекцию.',
  'Я умею танцевать. Пока никто не смотрит и не снимает.',
  'Я не откладываю дела. Просто даю им время созреть.',
  'Я просыпаюсь с мыслью о работе. Потом переворачиваюсь и сплю дальше.',
  'Я не боюсь темноты. Просто оставляю свет во всей квартире.',
  'Я честный человек. Вру только в целях самообороны.',
  'Я умею торговаться. Поэтому купил за полную цену, но с гордостью.',
  'Я не сентиментальный. Просто смотрю рекламу и плачу.',
  'Я идеальный водитель. Просто педаль иногда путаю.',
  'Я не ревную к прошлому. Просто изучаю твои архивы.',
  'Я на диете. С завтрашнего дня. Вот уже три года.',
  'Я никогда не теряю носки. Они просто уходят в лучший мир.',
  'Я не спорю с навигатором. Я просто еду по-своему.',
  'Я умею отдыхать. Правда, потом неделю отдыхаю от отдыха.',
  'Я не собираю пакеты. Это стратегический запас на апокалипсис.',
  'Я занимаюсь йогой. В основном в позе «лежа на диване».',
];

const NAMES = [
  'Гоша', 'Люся', 'Витя', 'Тося', 'Марк', 'Нонна', 'Стас', 'Клава',
  'Борис', 'Зина', 'Федя', 'Рита', 'Костя', 'Муся', 'Лёва', 'Ася',
  'Гена', 'Валя', 'Тимур', 'Дина', 'Прохор', 'Соня', 'Эдик', 'Глаша',
];

const JOBS = [
  'сантехник-философ', 'блогер без подписчиков', 'менеджер по снам',
  'фрилансер на обеде', 'бариста-психолог', 'коллекционер пакетов',
  'профессиональный кот', 'водитель маршрутки', 'дизайнер выходных',
  'шеф-повар из доставки', 'специалист по прокрастинации', 'владелец трёх котов',
  'эксперт по сериалам', 'тренер по дивану', 'переговорщик с холодильником',
  'свидетель по делу о печеньках', 'менеджер по счастью', 'программист на кофеине',
  'мастер спорта по пятницам', 'хранитель чужих секретов', 'пилот картонного самолёта',
  'дегустатор чая из пакетика', 'министр уютных вечеров',
];

const SKINS = ['#f2c9a0', '#e8b184', '#c98a5e', '#9a6240', '#f7d7b8', '#b97a52', '#d9a06f'];
const HAIRS = ['#17142c', '#3a2418', '#6b3a1f', '#c96a2a', '#f0c75e', '#7b5cff', '#26e6ff', '#ff2d95', '#d9d9e8', '#8a4b2a'];
const SHIRTS = ['#26e6ff', '#ff2d95', '#7b5cff', '#39ffa5', '#ffb020', '#ff6b3d', '#4b7bff', '#e8e8f0', '#ff4d88', '#4ad9c0'];
const PANTS = ['#1a2148', '#2b2b46', '#3b2a55', '#243b4a', '#4a2b33', '#20243a'];

const STORAGE = {
  records: 'lieDetector.records.v1',
  muted: 'lieDetector.muted.v1',
};

/* ------------------------------ ХРАНИЛИЩЕ ------------------------------ */

function storageGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    /* Приватный режим — играем без сохранения. */
  }
}

function loadRecords() {
  const data = storageGet(STORAGE.records, []);
  if (!Array.isArray(data)) return [];
  return data
    .filter((r) => r && Number.isFinite(r.score) && r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function saveRecords(records) {
  storageSet(STORAGE.records, records.slice(0, 5));
}

/* -------------------------------- ЗВУК --------------------------------- */

const AudioFX = {
  ctx: null,
  master: null,
  muted: !!storageGet(STORAGE.muted, false),
  ready: false,

  init() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try {
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.55;
      this.master.connect(this.ctx.destination);
      this.ready = true;
    } catch (e) {
      this.ctx = null;
    }
  },

  resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  },

  setMuted(muted) {
    this.muted = !!muted;
    storageSet(STORAGE.muted, this.muted);
    if (this.master && this.ctx) {
      const now = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setTargetAtTime(this.muted ? 0 : 0.55, now, 0.02);
    }
  },

  tone(freq, dur = 0.15, opts = {}) {
    if (!this.ctx || this.muted) return;
    const { type = 'sine', vol = 0.2, slide = null, delay = 0, attack = 0.008 } = opts;
    try {
      const t0 = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(Math.max(20, freq), t0);
      if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(20, slide), t0 + dur);
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol), t0 + attack);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(gain);
      gain.connect(this.master);
      osc.start(t0);
      osc.stop(t0 + dur + 0.03);
    } catch (e) {}
  },

  noise(dur = 0.2, vol = 0.12, cutoff = 1200) {
    if (!this.ctx || this.muted) return;
    try {
      const length = Math.max(1, Math.floor(this.ctx.sampleRate * dur));
      const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
      const src = this.ctx.createBufferSource();
      src.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = cutoff;
      const gain = this.ctx.createGain();
      const t0 = this.ctx.currentTime;
      gain.gain.setValueAtTime(vol, t0);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.master);
      src.start(t0);
    } catch (e) {}
  },

  click() {
    this.tone(760, 0.05, { type: 'square', vol: 0.045, slide: 980 });
  },

  correct(combo) {
    const base = 523.25;
    this.tone(base, 0.1, { type: 'triangle', vol: 0.16 });
    this.tone(base * 1.25, 0.11, { type: 'triangle', vol: 0.15, delay: 0.075 });
    this.tone(base * 1.5, 0.2, { type: 'triangle', vol: 0.16, delay: 0.15 });
    if (combo >= 3) {
      this.tone(base * 2, 0.25, { type: 'sine', vol: 0.11, delay: 0.22 });
    }
    if (combo >= 5) {
      this.tone(base * 2.5, 0.3, { type: 'sine', vol: 0.08, delay: 0.28 });
    }
  },

  wrong() {
    this.tone(190, 0.32, { type: 'sawtooth', vol: 0.16, slide: 65 });
    this.tone(130, 0.3, { type: 'square', vol: 0.1, slide: 50, delay: 0.03 });
    this.noise(0.25, 0.13, 900);
  },

  tick() {
    this.tone(1080, 0.035, { type: 'square', vol: 0.035 });
  },

  gameOver() {
    [392, 329.63, 261.63, 196].forEach((f, i) => {
      this.tone(f, 0.28, { type: 'triangle', vol: 0.13, delay: i * 0.16 });
    });
    this.noise(0.4, 0.06, 600);
  },

  reward() {
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => {
      this.tone(f, 0.22, { type: 'sine', vol: 0.12, delay: i * 0.07 });
    });
  },

  revive() {
    [261.63, 392, 523.25, 659.25].forEach((f, i) => {
      this.tone(f, 0.3, { type: 'triangle', vol: 0.13, delay: i * 0.1 });
    });
  },
};

/* ------------------------------- СЦЕНА --------------------------------- */

let W = window.innerWidth;
let H = window.innerHeight;
let DPR = 1;

const layout = {
  portrait: false,
  groundY: 0,
  inspector: { x: 0, y: 0, h: 300 },
  suspect: { x: 0, y: 0, h: 300 },
};

function resizeScene() {
  W = Math.max(280, window.innerWidth);
  H = Math.max(320, window.innerHeight);
  const pixels = W * H;
  const dprCap = pixels > 4000000 ? 1.25 : pixels > 2200000 ? 1.5 : 2;
  DPR = Math.min(window.devicePixelRatio || 1, dprCap);
  canvas.width = Math.round(W * DPR);
  canvas.height = Math.round(H * DPR);
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  computeLayout();
}

function computeLayout() {
  const portrait = W < 760 || H > W * 1.12;
  const short = H < 640;
  const footer = portrait ? 112 : short ? 74 : 132;
  const groundY = H - footer - (portrait ? 4 : 6);
  layout.portrait = portrait;
  layout.groundY = groundY;

  if (portrait) {
    const suspectH = Math.min(H * 0.44, W * 0.9, (groundY - H * 0.32) / 1.08);
    const inspectorH = Math.min(H * 0.33, W * 0.68, suspectH * 0.8);
    layout.suspect = { x: W * 0.57, y: groundY, h: suspectH };
    layout.inspector = { x: W * 0.15, y: groundY + 2, h: inspectorH };
  } else if (short) {
    const tiny = H < 500;
    const suspectH = Math.min(H * (tiny ? 0.37 : 0.43), W * 0.3);
    const inspectorH = Math.min(H * (tiny ? 0.4 : 0.46), W * 0.26);
    layout.suspect = { x: W * 0.68, y: groundY, h: suspectH };
    layout.inspector = { x: W * 0.21, y: groundY, h: inspectorH };
  } else {
    const suspectH = Math.min(H * 0.52, W * 0.34, 620);
    const inspectorH = Math.min(H * 0.56, W * 0.3, 680);
    layout.suspect = { x: W * 0.68, y: groundY, h: suspectH };
    layout.inspector = { x: W * 0.2, y: groundY, h: inspectorH };
  }
}

function rr(x, y, w, h, r) {
  const rad = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.arcTo(x + w, y, x + w, y + h, rad);
  ctx.arcTo(x + w, y + h, x, y + h, rad);
  ctx.arcTo(x, y + h, x, y, rad);
  ctx.arcTo(x, y, x + w, y, rad);
  ctx.closePath();
}

function circle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, Math.max(0.1, r), 0, Math.PI * 2);
}

function ell(x, y, rx, ry, rot = 0) {
  ctx.beginPath();
  ctx.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), rot, 0, Math.PI * 2);
}

function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

function limb(x1, y1, x2, y2, width, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

/* --------------------------- ФОН И ЧАСТИЦЫ ----------------------------- */

const dust = Array.from({ length: 70 }, () => ({
  x: Math.random(),
  y: Math.random(),
  r: rand(0.5, 2.1),
  ph: rand(0, Math.PI * 2),
  sp: rand(0.15, 0.7),
}));

const particles = [];

function burst(x, y, colors, count = 24, power = 1) {
  for (let i = 0; i < count; i++) {
    const angle = rand(0, Math.PI * 2);
    const speed = rand(60, 300) * power;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - rand(40, 140),
      g: rand(300, 620),
      life: rand(0.5, 1.1),
      max: 1.1,
      size: rand(1.5, 4.6),
      color: choice(colors),
    });
  }
}

function updateParticles(dt) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += p.g * dt;
    p.vx *= 1 - dt * 1.4;
    p.life -= dt;
    if (p.life <= 0) particles.splice(i, 1);
  }
}

function drawParticles() {
  if (!particles.length) return;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  for (const p of particles) {
    const a = clamp(p.life / p.max, 0, 1);
    ctx.globalAlpha = a;
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 12;
    circle(p.x, p.y, p.size * (0.6 + a * 0.6));
    ctx.fill();
  }
  ctx.restore();
}

function drawGlow(x, y, radius, color) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
  g.addColorStop(0, color);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
}

function drawBackground(t) {
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#05081c');
  bg.addColorStop(0.5, '#080f30');
  bg.addColorStop(1, '#03050f');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  drawGlow(W * 0.16, H * 0.3, Math.min(W, H) * 0.52, 'rgba(255,45,149,0.13)');
  drawGlow(W * 0.84, H * 0.22, Math.min(W, H) * 0.55, 'rgba(38,230,255,0.12)');
  drawGlow(W * 0.52, H * 0.88, Math.min(W, H) * 0.6, 'rgba(123,92,255,0.14)');

  /* Пыль / звёзды */
  ctx.save();
  for (const d of dust) {
    const x = d.x * W + Math.sin(t * d.sp + d.ph) * 18;
    const y = (d.y * H - t * d.sp * 7) % H;
    const yy = y < 0 ? y + H : y;
    const tw = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * 1.6 + d.ph));
    ctx.globalAlpha = 0.16 + tw * 0.32;
    ctx.fillStyle = d.ph > 3.14 ? '#26e6ff' : '#9fb4ff';
    circle(x, yy, d.r);
    ctx.fill();
  }
  ctx.restore();

  /* Неоновая сетка пола */
  const horizon = H * 0.55;
  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(38,230,255,0.075)';
  for (let i = -10; i <= 10; i++) {
    ctx.beginPath();
    ctx.moveTo(W / 2 + i * W * 0.012, horizon);
    ctx.lineTo(W / 2 + i * W * 0.11, H + 20);
    ctx.stroke();
  }
  const speed = (t * 0.07) % 1;
  for (let i = 0; i < 16; i++) {
    const p = (i + speed) / 16;
    const y = horizon + (H - horizon) * p * p;
    ctx.globalAlpha = 0.03 + p * 0.18;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  ctx.restore();

  /* Сканер за подозреваемым */
  const cx = layout.suspect.x;
  const cy = layout.suspect.y - layout.suspect.h * 0.52;
  const R = Math.max(70, layout.suspect.h * 0.56);
  ctx.save();
  const spotlight = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
  spotlight.addColorStop(0, 'rgba(38,230,255,0.075)');
  spotlight.addColorStop(0.7, 'rgba(123,92,255,0.035)');
  spotlight.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = spotlight;
  ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

  ctx.translate(cx, cy);
  ctx.rotate(t * 0.11);
  ctx.strokeStyle = 'rgba(38,230,255,0.16)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 18]);
  circle(0, 0, R);
  ctx.stroke();
  ctx.rotate(-t * 0.31);
  ctx.strokeStyle = 'rgba(255,45,149,0.13)';
  ctx.setLineDash([2, 14]);
  circle(0, 0, R * 0.82);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();

  /* Линия пола */
  const floor = ctx.createLinearGradient(0, layout.groundY - 2, 0, layout.groundY + 20);
  floor.addColorStop(0, 'rgba(38,230,255,0.2)');
  floor.addColorStop(1, 'rgba(38,230,255,0)');
  ctx.fillStyle = floor;
  ctx.fillRect(0, layout.groundY, W, 20);
}

/* ------------------------------ ПЕРСОНАЖИ ------------------------------ */

function drawShadow(x, y, rx, alpha = 0.5) {
  ctx.save();
  ctx.globalAlpha = alpha;
  const g = ctx.createRadialGradient(x, y, 0, x, y, rx);
  g.addColorStop(0, 'rgba(0,0,0,0.55)');
  g.addColorStop(0.65, 'rgba(0,0,0,0.28)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(x - rx, y - rx * 0.35, rx * 2, rx * 0.7);
  ctx.restore();
}

function drawInspector(now, t) {
  const base = layout.inspector;
  const s = base.h / 300;
  const bob = Math.sin(t * 1.8) * 1.6;
  const mood = game.mood;
  const moodK = clamp((game.moodUntil - now) / 600, 0, 1);
  const win = mood === 'win' && moodK > 0;
  const lose = mood === 'lose' && moodK > 0;
  const shake = lose ? Math.sin(now * 0.045) * 3 * moodK : 0;

  drawShadow(base.x, base.y + 4, s * 58, 0.55);

  ctx.save();
  ctx.translate(base.x + shake, base.y);
  ctx.scale(s, s);

  /* Ноги */
  ctx.fillStyle = '#1b2145';
  rr(-32, -74, 24, 68, 10); ctx.fill();
  rr(8, -74, 24, 68, 10); ctx.fill();
  ctx.fillStyle = '#0c0f22';
  rr(-39, -14, 35, 16, 8); ctx.fill();
  rr(4, -14, 35, 16, 8); ctx.fill();

  ctx.translate(0, bob);

  /* Толстовка */
  const hoodie = '#6f4dff';
  const hoodieDark = '#5435d6';
  ctx.fillStyle = hoodie;
  ctx.beginPath();
  ctx.moveTo(-40, -181);
  ctx.quadraticCurveTo(0, -199, 40, -181);
  ctx.lineTo(47, -86);
  ctx.quadraticCurveTo(0, -74, -47, -86);
  ctx.closePath();
  ctx.fill();

  /* Тени на толстовке */
  ctx.fillStyle = hoodieDark;
  ctx.globalAlpha = 0.55;
  rr(-47, -104, 14, 28, 6); ctx.fill();
  ctx.globalAlpha = 1;

  /* Карман */
  ctx.strokeStyle = 'rgba(20,10,60,0.45)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(-25, -126);
  ctx.quadraticCurveTo(0, -116, 25, -126);
  ctx.stroke();

  /* Шнурки */
  ctx.strokeStyle = '#c9baff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-12, -182);
  ctx.lineTo(-15, -154);
  ctx.moveTo(12, -182);
  ctx.lineTo(15, -154);
  ctx.stroke();
  ctx.fillStyle = '#c9baff';
  circle(-15, -152, 2.4); ctx.fill();
  circle(15, -152, 2.4); ctx.fill();

  /* Значок */
  ctx.save();
  ctx.translate(24, -150);
  ctx.rotate(-0.08);
  ctx.fillStyle = '#0e1435';
  rr(-13, -9, 26, 18, 5); ctx.fill();
  ctx.strokeStyle = '#26e6ff';
  ctx.lineWidth = 1.6;
  rr(-13, -9, 26, 18, 5); ctx.stroke();
  ctx.fillStyle = '#26e6ff';
  ctx.font = '900 9px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('ЛИ', 0, 1);
  ctx.restore();

  /* Левая рука в кармане */
  limb(-38, -170, -48, -118, 17, hoodie);
  ctx.fillStyle = '#eec39a';
  circle(-47, -114, 9); ctx.fill();

  /* Правая рука с лупой */
  const armAngle = win ? -0.35 : lose ? 0.3 : 0;
  ctx.save();
  ctx.translate(38, -170);
  ctx.rotate(armAngle);
  limb(0, 0, 20, 44, 17, hoodie);
  ctx.fillStyle = '#eec39a';
  circle(21, 49, 9.5); ctx.fill();
  ctx.restore();

  /* Лупа */
  const magX = win ? 66 : 58;
  const magY = win ? -148 : -116;
  ctx.save();
  ctx.translate(magX, magY);
  ctx.rotate(win ? -0.5 : 0.35);
  ctx.strokeStyle = '#26e6ff';
  ctx.lineWidth = 5;
  ctx.shadowColor = '#26e6ff';
  ctx.shadowBlur = 12;
  circle(0, 0, 14);
  ctx.stroke();
  ctx.shadowBlur = 0;
  const glass = ctx.createRadialGradient(-4, -4, 1, 0, 0, 14);
  glass.addColorStop(0, 'rgba(160,245,255,0.4)');
  glass.addColorStop(1, 'rgba(38,230,255,0.05)');
  ctx.fillStyle = glass;
  circle(0, 0, 13); ctx.fill();
  ctx.strokeStyle = '#ff2d95';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(10, 10);
  ctx.lineTo(24, 24);
  ctx.stroke();
  ctx.restore();

  /* Шея */
  ctx.fillStyle = '#eec39a';
  rr(-12, -202, 24, 26, 8); ctx.fill();

  /* Голова */
  ctx.fillStyle = '#f2c9a0';
  circle(0, -229, 47); ctx.fill();
  ctx.fillStyle = '#eec39a';
  circle(-46, -230, 9); ctx.fill();
  circle(46, -230, 9); ctx.fill();

  /* Волосы: тёмные с бирюзовой прядью */
  ctx.fillStyle = '#17142c';
  ctx.beginPath();
  ctx.ellipse(0, -238, 49, 43, -0.08, Math.PI * 0.98, Math.PI * 2.03);
  ctx.quadraticCurveTo(48, -262, 34, -271);
  ctx.quadraticCurveTo(8, -282, -22, -270);
  ctx.quadraticCurveTo(-50, -258, -49, -224);
  ctx.closePath();
  ctx.fill();

  /* Объёмная прядь и виски */
  ctx.fillStyle = '#241d45';
  ctx.beginPath();
  ctx.moveTo(-36, -258);
  ctx.quadraticCurveTo(-8, -286, 27, -268);
  ctx.quadraticCurveTo(10, -263, -2, -250);
  ctx.quadraticCurveTo(-16, -262, -36, -258);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#17142c';
  rr(-49, -243, 8, 26, 4); ctx.fill();
  rr(41, -243, 8, 26, 4); ctx.fill();

  ctx.fillStyle = '#26e6ff';
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.moveTo(-16, -272);
  ctx.quadraticCurveTo(4, -280, 20, -270);
  ctx.quadraticCurveTo(6, -264, -12, -266);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;

  /* Брови */
  ctx.strokeStyle = '#17142c';
  ctx.lineWidth = 4.5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-27, -246);
  ctx.lineTo(-9, -249);
  ctx.moveTo(9, -249);
  ctx.lineTo(27, -245);
  ctx.stroke();

  /* Глаза */
  if (lose) {
    ctx.strokeStyle = '#17142c';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-24, -231);
    ctx.lineTo(-10, -227);
    ctx.moveTo(10, -227);
    ctx.lineTo(24, -231);
    ctx.stroke();
  } else if (win) {
    ctx.strokeStyle = '#17142c';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(-16, -227, 8, Math.PI * 1.08, Math.PI * 1.92);
    ctx.arc(16, -227, 8, Math.PI * 1.08, Math.PI * 1.92);
    ctx.stroke();
  } else {
    const blink = (t * 0.8 + 1.7) % 4.2 < 0.11;
    if (blink) {
      ctx.strokeStyle = '#17142c';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-23, -229);
      ctx.lineTo(-9, -229);
      ctx.moveTo(9, -229);
      ctx.lineTo(23, -229);
      ctx.stroke();
    } else {
      ctx.fillStyle = '#fff';
      ell(-16, -229, 8, 9); ctx.fill();
      ell(16, -229, 8, 9); ctx.fill();
      ctx.fillStyle = '#17142c';
      circle(-15, -228, 4); ctx.fill();
      circle(17, -228, 4); ctx.fill();
      ctx.fillStyle = '#fff';
      circle(-14, -230, 1.5); ctx.fill();
      circle(18, -230, 1.5); ctx.fill();
    }
  }

  /* Нос */
  ctx.strokeStyle = '#d9a06f';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(2, -222);
  ctx.quadraticCurveTo(6, -214, 1, -212);
  ctx.stroke();

  /* Улыбка / огорчение */
  ctx.strokeStyle = '#8a4b4b';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.beginPath();
  if (lose) {
    ctx.arc(0, -200, 12, Math.PI * 1.15, Math.PI * 1.85);
  } else if (win) {
    ctx.arc(0, -209, 15, Math.PI * 0.15, Math.PI * 0.85);
  } else {
    ctx.moveTo(-11, -204);
    ctx.quadraticCurveTo(1, -197, 14, -205);
  }
  ctx.stroke();

  /* Гарнитура на шее */
  ctx.strokeStyle = '#26e6ff';
  ctx.lineWidth = 4;
  ctx.globalAlpha = 0.9;
  ctx.beginPath();
  ctx.arc(0, -195, 31, Math.PI * 0.12, Math.PI * 0.88);
  ctx.stroke();
  ctx.fillStyle = '#26e6ff';
  circle(-30, -190, 5); ctx.fill();
  circle(30, -190, 5); ctx.fill();
  ctx.globalAlpha = 1;

  /* Щетина */
  ctx.fillStyle = 'rgba(30,20,50,0.18)';
  ell(0, -204, 20, 12); ctx.fill();

  ctx.restore();
}

function makeSuspect() {
  const hairStyles = [0, 0, 0, 1, 2, 2, 3, 4, 5, 6, 7];
  const glassesPool = [0, 0, 0, 0, 1, 2, 3, 4];
  const facialPool = [0, 0, 0, 0, 1, 2, 3];
  const hatPool = [0, 0, 0, 0, 0, 1, 2, 3];
  return {
    name: choice(NAMES),
    job: choice(JOBS),
    skin: choice(SKINS),
    hair: choice(HAIRS),
    hairStyle: choice(hairStyles),
    shirt: choice(SHIRTS),
    shirtStyle: choice([0, 0, 1, 2, 3]),
    pants: choice(PANTS),
    glasses: choice(glassesPool),
    facial: choice(facialPool),
    hat: choice(hatPool),
    earring: Math.random() < 0.24,
    freckles: Math.random() < 0.3,
    blush: Math.random() < 0.5,
    phase: rand(0, Math.PI * 2),
    height: rand(0.92, 1.08),
    blinkSeed: rand(0, 4),
    sway: rand(-1, 1),
  };
}

function torsoPath() {
  ctx.beginPath();
  ctx.moveTo(-38, -180);
  ctx.quadraticCurveTo(0, -197, 38, -180);
  ctx.lineTo(47, -88);
  ctx.quadraticCurveTo(0, -76, -47, -88);
  ctx.closePath();
}

function drawSuspectBody(c, reaction) {
  /* Ноги */
  ctx.fillStyle = c.pants;
  rr(-31, -76, 24, 68, 10); ctx.fill();
  rr(7, -76, 24, 68, 10); ctx.fill();
  ctx.fillStyle = '#0d1024';
  rr(-38, -15, 35, 16, 8); ctx.fill();
  rr(3, -15, 35, 16, 8); ctx.fill();

  /* Руки */
  const armsUp = reaction === 'shock';
  const wave = reaction === 'happy';
  const crossed = reaction === 'smug';
  if (armsUp) {
    limb(-37, -169, -61, -209, 16, c.shirt);
    limb(37, -169, 61, -209, 16, c.shirt);
    ctx.fillStyle = c.skin;
    circle(-64, -215, 10); ctx.fill();
    circle(64, -215, 10); ctx.fill();
  } else if (wave) {
    limb(-37, -169, -52, -118, 16, c.shirt);
    limb(37, -169, 58, -203, 16, c.shirt);
    ctx.fillStyle = c.skin;
    circle(-52, -113, 9.5); ctx.fill();
    circle(60, -210, 10); ctx.fill();
  } else if (crossed) {
    limb(-37, -166, 26, -126, 15, c.shirt);
    limb(37, -166, -26, -126, 15, c.shirt);
    ctx.fillStyle = c.skin;
    circle(-27, -123, 9); ctx.fill();
    circle(27, -123, 9); ctx.fill();
  } else {
    limb(-37, -169, -53, -114, 16, c.shirt);
    limb(37, -169, 53, -114, 16, c.shirt);
    ctx.fillStyle = c.skin;
    circle(-54, -108, 9.5); ctx.fill();
    circle(54, -108, 9.5); ctx.fill();
  }

  /* Торс */
  ctx.fillStyle = c.shirt;
  torsoPath();
  ctx.fill();

  /* Узор одежды */
  ctx.save();
  torsoPath();
  ctx.clip();
  if (c.shirtStyle === 1) {
    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.lineWidth = 5;
    for (let y = -168; y < -84; y += 16) {
      ctx.beginPath();
      ctx.moveTo(-52, y);
      ctx.lineTo(52, y);
      ctx.stroke();
    }
  } else if (c.shirtStyle === 2) {
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -180);
    ctx.lineTo(0, -84);
    ctx.stroke();
    ctx.fillStyle = 'rgba(0,0,0,0.14)';
    rr(-24, -130, 48, 30, 9); ctx.fill();
  } else if (c.shirtStyle === 3) {
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -178);
    ctx.lineTo(0, -80);
    ctx.stroke();
    ctx.fillStyle = 'rgba(0,0,0,0.16)';
    ctx.beginPath();
    ctx.moveTo(-30, -182);
    ctx.lineTo(-6, -160);
    ctx.lineTo(-28, -150);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(30, -182);
    ctx.lineTo(6, -160);
    ctx.lineTo(28, -150);
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.fillStyle = 'rgba(255,255,255,0.16)';
    circle(24, -146, 7); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.18)';
    ctx.lineWidth = 2;
    circle(24, -146, 10); ctx.stroke();
  }
  ctx.restore();

  /* Ворот */
  ctx.strokeStyle = 'rgba(0,0,0,0.22)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, -182, 14, Math.PI * 0.1, Math.PI * 0.9);
  ctx.stroke();
}

function drawHairBack(c) {
  ctx.fillStyle = c.hair;
  if (c.hairStyle === 1) {
    ctx.beginPath();
    ctx.ellipse(0, -230, 58, 62, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (c.hairStyle === 7) {
    ctx.beginPath();
    ctx.moveTo(-44, -258);
    ctx.quadraticCurveTo(-72, -206, -58, -152);
    ctx.quadraticCurveTo(-40, -146, -30, -160);
    ctx.lineTo(-30, -235);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(44, -258);
    ctx.quadraticCurveTo(72, -206, 58, -152);
    ctx.quadraticCurveTo(40, -146, 30, -160);
    ctx.lineTo(30, -235);
    ctx.closePath();
    ctx.fill();
  }
}

function drawHairFront(c) {
  ctx.fillStyle = c.hair;
  switch (c.hairStyle) {
    case 0: {
      ctx.beginPath();
      ctx.ellipse(0, -238, 50, 42, -0.05, Math.PI * 0.98, Math.PI * 2.02);
      ctx.quadraticCurveTo(44, -258, 28, -266);
      ctx.quadraticCurveTo(2, -276, -24, -264);
      ctx.quadraticCurveTo(-48, -252, -48, -226);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 1: {
      ctx.beginPath();
      ctx.ellipse(0, -241, 52, 43, 0, Math.PI, Math.PI * 2);
      ctx.lineTo(50, -232);
      ctx.quadraticCurveTo(36, -244, 18, -248);
      ctx.quadraticCurveTo(-8, -240, -50, -244);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 2: {
      ctx.beginPath();
      ctx.ellipse(0, -240, 50, 38, 0, Math.PI, Math.PI * 2);
      ctx.fill();
      const spikes = [[-42, -262], [-30, -280], [-20, -258], [-8, -286], [4, -258], [16, -282], [26, -258], [38, -274], [46, -254]];
      ctx.beginPath();
      for (let i = 0; i < spikes.length; i += 2) {
        ctx.moveTo(spikes[i][0], spikes[i][1]);
        ctx.lineTo(spikes[i + 1] ? spikes[i + 1][0] : spikes[i][0] + 8, spikes[i + 1] ? spikes[i + 1][1] : spikes[i][1] - 16);
        ctx.lineTo(spikes[i][0] + 12, -246);
      }
      ctx.fill();
      break;
    }
    case 3: {
      ctx.beginPath();
      ctx.ellipse(-44, -250, 13, 8, -0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(44, -250, 13, 8, 0.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 4: {
      ctx.beginPath();
      ctx.ellipse(0, -242, 50, 38, 0, Math.PI * 0.98, Math.PI * 2.02);
      ctx.fill();
      circle(0, -283, 16); ctx.fill();
      break;
    }
    case 5: {
      const curls = [[-38, -256], [-24, -268], [-6, -274], [12, -272], [30, -264], [42, -250], [-46, -238], [46, -236]];
      for (const p of curls) {
        circle(p[0], p[1], 15); ctx.fill();
      }
      break;
    }
    case 6: {
      ctx.beginPath();
      ctx.ellipse(0, -244, 40, 32, 0, Math.PI * 0.95, Math.PI * 2.05);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-10, -264);
      ctx.lineTo(-6, -298);
      ctx.lineTo(2, -270);
      ctx.lineTo(8, -302);
      ctx.lineTo(15, -268);
      ctx.lineTo(22, -292);
      ctx.lineTo(24, -260);
      ctx.closePath();
      ctx.fill();
      break;
    }
    default: {
      ctx.beginPath();
      ctx.ellipse(0, -240, 51, 40, 0, Math.PI * 0.98, Math.PI * 2.02);
      ctx.quadraticCurveTo(38, -258, 18, -252);
      ctx.quadraticCurveTo(0, -236, -24, -252);
      ctx.quadraticCurveTo(-44, -260, -50, -236);
      ctx.closePath();
      ctx.fill();
      break;
    }
  }
}

function drawHat(c) {
  if (!c.hat) return;
  if (c.hat === 1) {
    ctx.fillStyle = '#ff2d95';
    ctx.beginPath();
    ctx.ellipse(0, -256, 44, 34, 0, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ff5fae';
    rr(-16, -268, 32, 16, 6); ctx.fill();
    ctx.fillStyle = '#c31370';
    rr(-46, -252, 70, 8, 4); ctx.fill();
    ctx.fillStyle = '#ffd166';
    circle(34, -260, 4); ctx.fill();
  } else if (c.hat === 2) {
    ctx.fillStyle = '#26e6ff';
    ctx.beginPath();
    ctx.ellipse(0, -250, 44, 40, 0, Math.PI * 0.94, Math.PI * 2.06);
    ctx.fill();
    ctx.fillStyle = '#0d9bb0';
    rr(-46, -252, 92, 12, 6); ctx.fill();
    ctx.fillStyle = '#d6fbff';
    circle(0, -296, 9); ctx.fill();
  } else if (c.hat === 3) {
    ctx.fillStyle = '#7b5cff';
    ctx.beginPath();
    ctx.ellipse(-4, -266, 50, 18, -0.12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#4a2fbf';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -282);
    ctx.lineTo(2, -292);
    ctx.stroke();
    ctx.fillStyle = '#ff2d95';
    circle(18, -274, 4); ctx.fill();
  }
}

function drawMouth(c, t, reaction, talking) {
  ctx.lineCap = 'round';
  if (reaction === 'shock') {
    ctx.fillStyle = '#4a2530';
    ell(0, -199, 9, 12); ctx.fill();
  } else if (reaction === 'happy') {
    ctx.strokeStyle = '#7d3a48';
    ctx.lineWidth = 3.4;
    ctx.beginPath();
    ctx.arc(0, -207, 14, Math.PI * 0.18, Math.PI * 0.82);
    ctx.stroke();
  } else if (reaction === 'smug') {
    ctx.strokeStyle = '#7d3a48';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-11, -199);
    ctx.quadraticCurveTo(2, -193, 14, -201);
    ctx.stroke();
  } else if (talking) {
    const open = 3 + Math.abs(Math.sin(t * 9 + c.phase)) * 6;
    ctx.fillStyle = '#5c2b37';
    ell(0, -201, 8, open); ctx.fill();
    ctx.fillStyle = '#ff8d9e';
    ell(0, -201 + open * 0.4, 5, open * 0.4); ctx.fill();
  } else {
    ctx.strokeStyle = '#7d3a48';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-9, -201);
    ctx.quadraticCurveTo(0, -195, 10, -202);
    ctx.stroke();
  }
}

function drawFace(c, t, reaction, talking) {
  const eyeY = -228;
  const dx = 17;

  /* Брови */
  ctx.strokeStyle = c.hair;
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  if (reaction === 'shock') {
    ctx.moveTo(-28, -250); ctx.lineTo(-8, -254);
    ctx.moveTo(8, -254); ctx.lineTo(28, -250);
  } else if (reaction === 'smug') {
    ctx.moveTo(-28, -245); ctx.lineTo(-8, -249);
    ctx.moveTo(8, -248); ctx.lineTo(28, -243);
  } else {
    ctx.moveTo(-27, -247); ctx.lineTo(-9, -249);
    ctx.moveTo(9, -249); ctx.lineTo(27, -247);
  }
  ctx.stroke();

  /* Глаза */
  if (reaction === 'happy') {
    ctx.strokeStyle = '#231a2e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(-dx, eyeY, 8, Math.PI * 1.1, Math.PI * 1.9);
    ctx.arc(dx, eyeY, 8, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();
  } else if (reaction === 'shock') {
    ctx.fillStyle = '#fff';
    ell(-dx, eyeY, 10, 12); ctx.fill();
    ell(dx, eyeY, 10, 12); ctx.fill();
    ctx.fillStyle = '#231a2e';
    circle(-dx + 1, eyeY, 4.2); ctx.fill();
    circle(dx + 1, eyeY, 4.2); ctx.fill();
  } else {
    const blinkCycle = (t * 0.85 + c.blinkSeed) % 4.4;
    const blink = blinkCycle < 0.12;
    if (blink) {
      ctx.strokeStyle = '#231a2e';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-dx - 8, eyeY); ctx.lineTo(-dx + 8, eyeY);
      ctx.moveTo(dx - 8, eyeY); ctx.lineTo(dx + 8, eyeY);
      ctx.stroke();
    } else {
      ctx.fillStyle = '#fff';
      ell(-dx, eyeY, 8, 9); ctx.fill();
      ell(dx, eyeY, 8, 9); ctx.fill();
      ctx.fillStyle = '#231a2e';
      const look = reaction === 'smug' ? 1 : 0;
      circle(-dx + look, eyeY, 4); ctx.fill();
      circle(dx + look, eyeY, 4); ctx.fill();
      ctx.fillStyle = '#fff';
      circle(-dx + look + 1, eyeY - 2, 1.4); ctx.fill();
      circle(dx + look + 1, eyeY - 2, 1.4); ctx.fill();
    }
  }

  /* Нос */
  ctx.strokeStyle = 'rgba(90,50,40,0.5)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(1, -220);
  ctx.quadraticCurveTo(5, -213, 0, -211);
  ctx.stroke();

  /* Рот */
  drawMouth(c, t, reaction, talking);

  /* Щёки и веснушки */
  if (c.blush) {
    ctx.fillStyle = 'rgba(255,90,130,0.18)';
    ell(-30, -210, 10, 6); ctx.fill();
    ell(30, -210, 10, 6); ctx.fill();
  }
  if (c.freckles) {
    ctx.fillStyle = 'rgba(120,70,50,0.45)';
    for (const p of [[-28, -215], [-22, -211], [-33, -211], [24, -215], [30, -211], [19, -211]]) {
      circle(p[0], p[1], 1.3); ctx.fill();
    }
  }
}

function drawGlasses(c) {
  if (!c.glasses) return;
  const eyeY = -228;
  const dx = 17;
  if (c.glasses === 4) {
    ctx.fillStyle = 'rgba(15,16,35,0.92)';
    rr(-36, eyeY - 12, 28, 22, 8); ctx.fill();
    rr(8, eyeY - 12, 28, 22, 8); ctx.fill();
    ctx.strokeStyle = '#0a0b18';
    ctx.lineWidth = 3;
    rr(-36, eyeY - 12, 28, 22, 8); ctx.stroke();
    rr(8, eyeY - 12, 28, 22, 8); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-8, eyeY - 3); ctx.lineTo(8, eyeY - 3);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-30, eyeY - 6); ctx.lineTo(-22, eyeY - 6);
    ctx.moveTo(14, eyeY - 6); ctx.lineTo(22, eyeY - 6);
    ctx.stroke();
  } else if (c.glasses === 1) {
    ctx.strokeStyle = '#ffd166';
    ctx.lineWidth = 2.6;
    circle(-dx, eyeY, 13); ctx.stroke();
    circle(dx, eyeY, 13); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-4, eyeY); ctx.lineTo(4, eyeY);
    ctx.moveTo(-30, eyeY - 1); ctx.lineTo(-45, eyeY - 3);
    ctx.moveTo(30, eyeY - 1); ctx.lineTo(45, eyeY - 3);
    ctx.stroke();
  } else if (c.glasses === 2) {
    ctx.strokeStyle = '#26e6ff';
    ctx.lineWidth = 2.6;
    rr(-34, eyeY - 11, 25, 21, 6); ctx.stroke();
    rr(9, eyeY - 11, 25, 21, 6); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-9, eyeY - 2); ctx.lineTo(9, eyeY - 2);
    ctx.stroke();
  } else {
    ctx.strokeStyle = '#f2f2ff';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.arc(-dx, eyeY, 12, 0, Math.PI * 2);
    ctx.arc(dx, eyeY, 12, 0, Math.PI * 2);
    ctx.moveTo(-5, eyeY); ctx.lineTo(5, eyeY);
    ctx.stroke();
    ctx.fillStyle = 'rgba(150,230,255,0.12)';
    circle(-dx, eyeY, 12); ctx.fill();
    circle(dx, eyeY, 12); ctx.fill();
  }
}

function drawFacialHair(c) {
  if (!c.facial) return;
  ctx.fillStyle = c.hair;
  if (c.facial === 1) {
    ell(-11, -209, 12, 5, -0.12); ctx.fill();
    ell(11, -209, 12, 5, 0.12); ctx.fill();
  } else if (c.facial === 2) {
    ctx.beginPath();
    ctx.moveTo(-34, -218);
    ctx.quadraticCurveTo(-38, -190, 0, -176);
    ctx.quadraticCurveTo(38, -190, 34, -218);
    ctx.quadraticCurveTo(20, -198, 0, -196);
    ctx.quadraticCurveTo(-20, -198, -34, -218);
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.moveTo(-10, -196);
    ctx.quadraticCurveTo(0, -184, 10, -196);
    ctx.quadraticCurveTo(4, -190, 0, -190);
    ctx.quadraticCurveTo(-4, -190, -10, -196);
    ctx.closePath();
    ctx.fill();
  }
}

function drawSuspect(now, t) {
  const round = game.round;
  if (!round) return;
  const base = layout.suspect;
  const c = round.char;
  const s = (base.h * c.height) / 300;
  const enter = clamp((now - round.enterAt) / 460, 0, 1);
  const e = easeOutCubic(enter);
  const offsetX = (1 - e) * Math.min(W * 0.2, 210);
  const offsetY = (1 - e) * 18;

  let jump = 0;
  let shakeX = 0;
  let lean = 0;
  const reaction = round.answered ? round.reaction : null;
  if (round.answered) {
    const a = (now - round.answerAt) / 1000;
    if (reaction === 'shock') {
      jump = -Math.abs(Math.sin(Math.min(a * 10, Math.PI * 2))) * 16;
      shakeX = Math.sin(a * 46) * 3;
    } else if (reaction === 'happy') {
      jump = -Math.abs(Math.sin(a * 8)) * 9;
    } else if (reaction === 'smug') {
      lean = Math.sin(a * 4) * 1.5;
    }
  }

  drawShadow(base.x + offsetX, base.y + 5, s * 60, 0.45 * e);

  ctx.save();
  ctx.globalAlpha = e;
  ctx.translate(base.x + offsetX + shakeX, base.y + offsetY + jump);
  ctx.scale(s, s);
  ctx.rotate(lean * 0.004);

  const bob = Math.sin(t * 2.2 + c.phase) * 2;
  ctx.save();
  ctx.translate(0, bob);

  drawSuspectBody(c, reaction);

  /* Шея */
  ctx.fillStyle = c.skin;
  rr(-12, -202, 24, 26, 8); ctx.fill();

  /* Голова */
  drawHairBack(c);
  ctx.fillStyle = c.skin;
  circle(0, -229, 48); ctx.fill();
  ctx.fillStyle = c.skin;
  circle(-47, -230, 9); ctx.fill();
  circle(47, -230, 9); ctx.fill();

  const talking = !round.answered && now - round.startAt < 1300;
  drawFace(c, t, reaction, talking);
  drawFacialHair(c);
  if (c.facial === 2) drawMouth(c, t, reaction, talking);
  drawHairFront(c);
  drawGlasses(c);
  drawHat(c);

  if (c.earring) {
    ctx.fillStyle = '#ffd166';
    circle(-47, -217, 3.4); ctx.fill();
    ctx.strokeStyle = '#ffd166';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(-47, -214, 4, 0, Math.PI);
    ctx.stroke();
  }

  ctx.restore();
  ctx.restore();

  /* Нервные капли у пойманного лжеца */
  if (reaction === 'shock') {
    const a = (now - round.answerAt) / 1000;
    ctx.save();
    ctx.globalAlpha = clamp(1 - a * 0.5, 0, 1);
    ctx.fillStyle = '#9ee8ff';
    const dropY = base.y - base.h * 0.72 + a * 26;
    ell(base.x - s * 55, dropY, 4, 7); ctx.fill();
    ell(base.x + s * 52, dropY + 18, 3.4, 6); ctx.fill();
    ctx.restore();
  }
}

function getBulbState(now) {
  const round = game.round;
  if (!round) return { on: false, color: '#26e6ff', scan: false, liar: false };
  if (round.answered) {
    return {
      on: true,
      color: round.truth ? '#39ffa5' : '#ff335c',
      steady: true,
      liar: !round.truth,
      final: true,
    };
  }
  const elapsed = now - round.startAt;
  if (elapsed < 560) {
    const flick = Math.sin(elapsed * 0.052 + round.seed) > -0.15;
    const alt = Math.sin(elapsed * 0.031 + round.seed * 1.7) > 0;
    return { on: flick, color: alt ? '#26e6ff' : '#ff2d95', scan: true, liar: false };
  }
  if (round.truth) {
    return { on: true, color: '#39ffa5', steady: true, liar: false };
  }
  const cycle = Math.max(420, 900 - game.score * 0.09);
  const flash = Math.max(75, 210 - game.score * 0.03);
  const p = (((elapsed - 560 + round.seed * 11) % cycle) + cycle) % cycle;
  return { on: p < flash, color: '#ff335c', baseColor: '#2a3c66', liar: true };
}

function drawBulb(now, t) {
  const round = game.round;
  if (!round) return;
  const base = layout.suspect;
  const s = (base.h * round.char.height) / 300;
  const bx = base.x;
  const by = base.y - 323 * s;
  const headTop = base.y - 274 * s;
  const state = getBulbState(now);
  const visualColor = state.on ? state.color : (state.baseColor || state.color);
  const glowR = Math.max(42, 92 * s);

  /* Провод */
  ctx.save();
  ctx.strokeStyle = 'rgba(160,190,255,0.5)';
  ctx.lineWidth = Math.max(1.8, 2.6 * s);
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(bx, headTop - 2);
  ctx.quadraticCurveTo(bx + 6 * s, by + 28 * s, bx, by + 16 * s);
  ctx.stroke();
  ctx.restore();

  /* Свечение */
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  let intensity = 0;
  if (state.on) {
    intensity = state.liar ? 1 : state.final ? 0.95 : 0.72 + 0.2 * Math.sin(t * 3.2);
  } else {
    intensity = state.liar ? 0.14 : 0.12;
  }
  const g = ctx.createRadialGradient(bx, by, 0, bx, by, glowR);
  g.addColorStop(0, hexA(visualColor, 0.8 * intensity));
  g.addColorStop(0.35, hexA(visualColor, 0.32 * intensity));
  g.addColorStop(1, hexA(visualColor, 0));
  ctx.fillStyle = g;
  circle(bx, by, glowR);
  ctx.fill();

  /* Лучи */
  if (state.on && !state.scan) {
    ctx.translate(bx, by);
    ctx.rotate(t * 0.5);
    ctx.strokeStyle = hexA(visualColor, 0.45);
    ctx.lineWidth = Math.max(1.5, 2 * s);
    for (let i = 0; i < 8; i++) {
      ctx.rotate(Math.PI / 4);
      ctx.beginPath();
      ctx.moveTo(26 * s, 0);
      ctx.lineTo(38 * s, 0);
      ctx.stroke();
    }
  }
  ctx.restore();

  /* Сканирующее кольцо */
  if (state.scan) {
    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(t * 3);
    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 8]);
    circle(0, 0, 27 * s);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  /* Цоколь */
  ctx.save();
  ctx.fillStyle = '#252b4d';
  rr(bx - 9 * s, by + 13 * s, 18 * s, 11 * s, 3 * s);
  ctx.fill();
  ctx.fillStyle = '#3d456f';
  rr(bx - 7 * s, by + 21 * s, 14 * s, 3 * s, 2 * s);
  ctx.fill();

  /* Стекло */
  const glass = ctx.createRadialGradient(bx - 5 * s, by - 6 * s, 1, bx, by, 17 * s);
  if (state.on) {
    glass.addColorStop(0, '#ffffff');
    glass.addColorStop(0.32, visualColor);
    glass.addColorStop(1, hexA(visualColor, 0.35));
  } else {
    glass.addColorStop(0, hexA(visualColor, 0.55));
    glass.addColorStop(1, hexA(visualColor, 0.08));
  }
  ctx.fillStyle = glass;
  circle(bx, by, 16 * s);
  ctx.fill();
  ctx.strokeStyle = hexA(visualColor, state.on ? 0.9 : 0.35);
  ctx.lineWidth = Math.max(1, 1.8 * s);
  circle(bx, by, 16 * s);
  ctx.stroke();

  /* Нить накаливания */
  ctx.strokeStyle = state.on ? 'rgba(255,255,255,0.9)' : 'rgba(120,90,100,0.7)';
  ctx.lineWidth = Math.max(1, 1.6 * s);
  ctx.beginPath();
  ctx.moveTo(bx - 5 * s, by + 8 * s);
  ctx.lineTo(bx - 2 * s, by - 2 * s);
  ctx.lineTo(bx + 2 * s, by + 4 * s);
  ctx.lineTo(bx + 5 * s, by - 6 * s);
  ctx.stroke();

  /* Блик */
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ell(bx - 6 * s, by - 7 * s, 3.4 * s, 5 * s, -0.5);
  ctx.fill();
  ctx.restore();
}

/* ------------------------------ РЕНДЕР КАДРА ---------------------------- */

function drawScene(now) {
  const t = now / 1000;
  drawBackground(t);
  drawInspector(now, t);
  drawSuspect(now, t);
  drawBulb(now, t);
  drawParticles();
}

/* ------------------------------ ИГРОВОЕ ЯДРО --------------------------- */

const game = {
  active: false,
  over: true,
  ending: false,
  score: 0,
  lives: 3,
  combo: 1,
  maxCombo: 1,
  correct: 0,
  rounds: 0,
  round: null,
  pendingRoundAt: 0,
  locked: true,
  reviveUsed: false,
  doubleUsed: false,
  records: loadRecords(),
  best: 0,
  recordEntry: null,
  mood: 'idle',
  moodUntil: 0,
  lastTruth: null,
  truthStreak: 0,
  recentPhrases: [],
  lastTick: 0,
  adBusy: false,
  toastTimer: 0,
  newRecord: false,
  pausedAt: 0,
};
game.best = game.records.length ? game.records[0].score : 0;

const HEART_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.1l-1.45-1.32C5.4 15.1 2 12.05 2 8.3 2 5.25 4.35 3 7.35 3c1.7 0 3.3.8 4.65 2.3C13.35 3.8 14.95 3 16.65 3 19.65 3 22 5.25 22 8.3c0 3.75-3.4 6.8-8.55 11.48L12 21.1z"/></svg>';

function formatScore(n) {
  return Math.round(n).toLocaleString('ru-RU');
}

function updateHUD(bumpScore = false) {
  ui.score.textContent = formatScore(game.score);
  ui.best.textContent = formatScore(Math.max(game.best, game.score));
  const comboStrong = ui.combo.querySelector('strong');
  comboStrong.textContent = 'x' + game.combo;
  ui.combo.classList.toggle('hot', game.combo > 1);
  if (bumpScore) {
    ui.score.classList.remove('bump');
    void ui.score.offsetWidth;
    ui.score.classList.add('bump');
  }
}

function renderLives() {
  let html = '';
  for (let i = 0; i < 3; i++) {
    html += `<span class="heart${i >= game.lives ? ' lost' : ''}">${HEART_SVG}</span>`;
  }
  ui.lives.innerHTML = html;
}

function renderRecords(target) {
  if (!target) return;
  if (!game.records.length) {
    target.innerHTML = '<li class="empty">Пока пусто — стань первым легендарным детективом</li>';
    return;
  }
  target.innerHTML = game.records
    .map((r, i) => {
      const date = new Date(r.date || Date.now()).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
      return `<li><span class="rank">${i + 1}</span><span>Дело закрыто</span><span class="r-score">${formatScore(r.score)}</span><span class="r-date">${date}</span></li>`;
    })
    .join('');
}

function showToast(text, ms = 2300) {
  ui.toast.textContent = text;
  ui.toast.classList.add('show');
  clearTimeout(game.toastTimer);
  game.toastTimer = setTimeout(() => ui.toast.classList.remove('show'), ms);
}

function showFloat(text, kind) {
  ui.floatPoints.textContent = text;
  ui.floatPoints.className = 'float-points';
  void ui.floatPoints.offsetWidth;
  ui.floatPoints.classList.add('show', kind);
}

function flashScreen(kind) {
  ui.flash.className = 'flash';
  void ui.flash.offsetWidth;
  ui.flash.classList.add(kind);
  setTimeout(() => { ui.flash.className = 'flash'; }, 460);
}

function shakeApp() {
  app.classList.remove('shake');
  void app.offsetWidth;
  app.classList.add('shake');
  setTimeout(() => app.classList.remove('shake'), 430);
}

function setAnswerEnabled(enabled) {
  ui.btnTruth.disabled = !enabled;
  ui.btnLie.disabled = !enabled;
}

function pickPhrase() {
  let index = randInt(0, PHRASES.length - 1);
  let guard = 0;
  while (game.recentPhrases.includes(index) && guard++ < 40) {
    index = randInt(0, PHRASES.length - 1);
  }
  game.recentPhrases.push(index);
  if (game.recentPhrases.length > 12) game.recentPhrases.shift();
  return PHRASES[index];
}

function roundDuration() {
  const speed = clamp(game.score / 4200, 0, 1);
  return Math.round(4400 - speed * 2300);
}

function resetDialogue() {
  ui.dialogue.classList.remove('show');
  ui.speech.classList.remove('good', 'bad', 'pop');
  ui.resultBadge.className = 'result-badge';
  ui.resultBadge.textContent = '';
  ui.timerFill.className = 'timer-fill';
  ui.timerFill.style.width = '0%';
}

function startRound(now) {
  if (!game.active) return;

  let truth = Math.random() < 0.5;
  if (game.truthStreak >= 3) truth = !game.lastTruth;
  game.truthStreak = truth === game.lastTruth ? game.truthStreak + 1 : 1;
  game.lastTruth = truth;

  const char = makeSuspect();
  const round = {
    char,
    phrase: pickPhrase(),
    truth,
    startAt: now,
    duration: roundDuration(),
    enterAt: now,
    seed: rand(0, 900),
    answered: false,
    answerAt: 0,
    reaction: null,
    result: null,
    timeout: false,
    gain: 0,
    remaining: 1,
  };

  game.round = round;
  game.rounds += 1;
  game.locked = false;
  game.lastTick = 0;

  ui.speaker.textContent = `${char.name} · ${char.job}`;
  ui.caseNo.textContent = 'ДЕЛО #' + String(game.rounds).padStart(3, '0');
  ui.speechText.textContent = round.phrase;
  ui.resultBadge.className = 'result-badge';
  ui.resultBadge.textContent = '';
  ui.speech.classList.remove('good', 'bad');
  ui.speech.classList.remove('pop');
  void ui.speech.offsetWidth;
  ui.speech.classList.add('pop');
  ui.dialogue.classList.add('show');
  ui.timerFill.className = 'timer-fill';
  ui.timerFill.style.width = '100%';
  ui.timerSec.textContent = (round.duration / 1000).toFixed(1);
  ui.timerFill.classList.remove('low', 'win', 'fail', 'freeze');
  setAnswerEnabled(true);
}

function resolveAnswer(saysTruth) {
  if (!game.active || game.locked || !game.round || game.round.answered) return;
  const round = game.round;
  const now = performance.now();
  const timeout = saysTruth === null;
  const correct = !timeout && saysTruth === round.truth;
  const elapsed = clamp((now - round.startAt) / round.duration, 0, 1);
  round.remaining = 1 - elapsed;
  round.answered = true;
  round.answerAt = now;
  round.timeout = timeout;
  game.locked = true;
  setAnswerEnabled(false);
  ui.timerFill.classList.add('freeze');
  ui.timerFill.style.width = (round.remaining * 100).toFixed(1) + '%';
  ui.timerSec.textContent = (Math.max(0, (round.duration - (now - round.startAt)) / 1000)).toFixed(1);

  const headX = layout.suspect.x;
  const headY = layout.suspect.y - layout.suspect.h * 0.7;

  if (correct) {
    round.result = 'correct';
    round.reaction = round.truth ? 'happy' : 'shock';
    game.correct += 1;
    game.combo = Math.min(5, game.combo + 1);
    game.maxCombo = Math.max(game.maxCombo, game.combo);
    const gain = Math.round((100 + round.remaining * 90) * game.combo);
    round.gain = gain;
    game.score += gain;
    game.mood = 'win';
    game.moodUntil = now + 1100;
    ui.speech.classList.add('good');
    ui.timerFill.classList.add('win');
    ui.resultBadge.className = 'result-badge show';
    ui.resultBadge.textContent = round.truth ? 'Точно! Это была правда' : 'Пойман! Он лгал';
    showFloat('+' + formatScore(gain), 'good');
    flashScreen('good');
    burst(headX, headY, ['#39ffa5', '#26e6ff', '#d9fff0', '#ffd166'], 28, 1);
    AudioFX.correct(game.combo);
    updateHUD(true);
  } else {
    round.result = 'wrong';
    round.reaction = 'smug';
    game.combo = 1;
    game.lives = Math.max(0, game.lives - 1);
    game.mood = 'lose';
    game.moodUntil = now + 1200;
    ui.speech.classList.add('bad');
    ui.timerFill.classList.add('fail');
    ui.resultBadge.className = 'result-badge show bad';
    ui.resultBadge.textContent = timeout
      ? (round.truth ? 'Время вышло! Это была правда' : 'Время вышло! Он лгал')
      : (round.truth ? 'Мимо! Это была правда' : 'Мимо! Он лгал');
    showFloat(timeout ? 'ВРЕМЯ!' : '−1 ЖИЗНЬ', 'bad');
    flashScreen('bad');
    shakeApp();
    burst(headX, headY, ['#ff335c', '#ff7b9a', '#ffb020'], 22, 0.8);
    AudioFX.wrong();
    updateHUD();
    renderLives();
  }
}

function updateGame(now) {
  if (!game.active) return;

  if (!game.round) {
    if (now >= game.pendingRoundAt) startRound(now);
    return;
  }

  const round = game.round;

  if (round.answered) {
    const delay = round.result === 'correct' ? 920 : 1180;
    if (now - round.answerAt > delay) {
      if (game.lives <= 0) {
        endGame();
      } else {
        startRound(now);
      }
    }
    return;
  }

  const elapsed = now - round.startAt;
  const remain = clamp(1 - elapsed / round.duration, 0, 1);
  ui.timerFill.style.width = (remain * 100).toFixed(2) + '%';
  ui.timerSec.textContent = (Math.max(0, round.duration - elapsed) / 1000).toFixed(1);
  ui.timerFill.classList.toggle('low', remain < 0.36);

  if (remain < 0.42 && now - game.lastTick > 360) {
    game.lastTick = now;
    AudioFX.tick();
  }

  if (elapsed >= round.duration) {
    resolveAnswer(null);
  }
}

function commitRecord() {
  if (game.score <= 0) return;
  if (!game.recordEntry) {
    game.recordEntry = { id: 'r' + Date.now() + '_' + randInt(100, 999), score: game.score, date: Date.now() };
  } else {
    game.recordEntry.score = game.score;
    game.recordEntry.date = Date.now();
  }
  game.records = game.records.filter((r) => r && r.id !== game.recordEntry.id);
  game.records.push(game.recordEntry);
  game.records.sort((a, b) => b.score - a.score);
  game.records = game.records.slice(0, 5);
  saveRecords(game.records);
  game.best = game.records.length ? game.records[0].score : 0;
}

function endGame() {
  if (!game.active || game.ending) return;
  game.ending = true;
  game.active = false;
  game.over = true;
  game.locked = true;
  setAnswerEnabled(false);
  game.mood = 'lose';
  game.moodUntil = performance.now() + 5000;
  const storedBest = game.records.length ? game.records[0].score : 0;
  game.newRecord = game.score > storedBest && game.score > 0;
  commitRecord();
  updateHUD();
  Platform.gameplayStop();
  AudioFX.gameOver();
  flashScreen('bad');

  ui.overKicker.textContent = game.newRecord ? 'НОВЫЙ РЕКОРД' : 'ДЕЛО ЗАКРЫТО';
  ui.overTitle.textContent = game.correct > 2 ? 'ОБМАНЩИК СБЕЖАЛ!' : 'ДЕЛО ПРОВАЛЕНО';
  ui.finalScore.textContent = formatScore(game.score);
  ui.finalCorrect.textContent = formatScore(game.correct);
  ui.finalCombo.textContent = 'x' + game.maxCombo;
  ui.finalBest.textContent = formatScore(game.best);
  ui.newRecord.classList.toggle('hidden', !game.newRecord);

  ui.btnRevive.disabled = game.reviveUsed;
  ui.btnDouble.disabled = game.doubleUsed || game.score <= 0;
  ui.btnRevive.querySelector('.reward-title').textContent = game.reviveUsed ? 'ЖИЗНЬ ИСПОЛЬЗОВАНА' : 'ВТОРАЯ ЖИЗНЬ';
  ui.btnDouble.querySelector('.reward-title').textContent = game.doubleUsed
    ? 'ОЧКИ УДВОЕНЫ'
    : game.score <= 0
      ? 'НЕТ ОЧКОВ'
      : 'УДВОИТЬ ОЧКИ';

  setTimeout(() => {
    if (!game.over) return;
    ui.gameOverScreen.classList.remove('hidden');
    renderRecords(ui.recordsStart);
  }, 520);

  game.ending = false;
}

function startGame() {
  AudioFX.resume();
  AudioFX.click();
  Platform.gameplayStart();
  ui.startScreen.classList.add('hidden');
  ui.gameOverScreen.classList.add('hidden');
  ui.adOverlay.classList.add('hidden');
  resetDialogue();

  game.active = true;
  game.over = false;
  game.ending = false;
  game.score = 0;
  game.lives = 3;
  game.combo = 1;
  game.maxCombo = 1;
  game.correct = 0;
  game.rounds = 0;
  game.round = null;
  game.pendingRoundAt = performance.now() + 420;
  game.locked = true;
  game.reviveUsed = false;
  game.doubleUsed = false;
  game.recordEntry = null;
  game.newRecord = false;
  game.mood = 'idle';
  game.moodUntil = 0;
  game.lastTruth = null;
  game.truthStreak = 0;
  game.recentPhrases = [];
  game.lastTick = 0;

  ui.btnRevive.disabled = false;
  ui.btnDouble.disabled = false;
  ui.btnRevive.querySelector('.reward-title').textContent = 'ВТОРАЯ ЖИЗНЬ';
  ui.btnDouble.querySelector('.reward-title').textContent = 'УДВОИТЬ ОЧКИ';
  setAnswerEnabled(false);
  updateHUD();
  renderLives();
}

/* ------------------------- YANDEX GAMES SDK / ADS ----------------------- */

const MockAd = {
  active: false,
  kind: 'fullscreen',
  resolve: null,
  timer: 0,

  show(kind) {
    if (this.active) return Promise.resolve(false);
    this.active = true;
    this.kind = kind;
    return new Promise((resolve) => {
      this.resolve = resolve;
      ui.adOverlay.classList.remove('hidden');
      ui.adClose.classList.add('hidden');
      ui.adClose.disabled = false;
      ui.adProgress.style.width = '0%';
      ui.adCount.textContent = 'Осталось: 3';
      const started = performance.now();
      const duration = 3000;
      const tick = () => {
        if (!this.active) return;
        const p = clamp((performance.now() - started) / duration, 0, 1);
        ui.adProgress.style.width = (p * 100).toFixed(1) + '%';
        const left = Math.max(0, Math.ceil((duration - (performance.now() - started)) / 1000));
        ui.adCount.textContent = left > 0 ? `Осталось: ${left}` : 'Реклама просмотрена';
        if (p < 1) {
          this.timer = setTimeout(tick, 70);
        } else {
          ui.adClose.classList.remove('hidden');
          ui.adClose.focus({ preventScroll: true });
        }
      };
      tick();
    });
  },

  close() {
    if (!this.active) return;
    const resolve = this.resolve;
    const kind = this.kind;
    this.active = false;
    this.resolve = null;
    clearTimeout(this.timer);
    ui.adOverlay.classList.add('hidden');
    AudioFX.click();
    if (resolve) resolve(kind === 'rewarded');
  },
};

const Platform = {
  mode: 'mock',
  sdk: null,
  lastFullscreen: 0,

  async init() {
    const host = location.hostname;
    const isLocal =
      location.protocol === 'file:' ||
      !host ||
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host.endsWith('.local') ||
      /^(\d{1,3}\.){3}\d{1,3}$/.test(host);

    if (isLocal) {
      this.mode = 'mock';
      console.info('[Yandex Games] Локальный запуск: активна безопасная заглушка рекламы.');
      return;
    }

    try {
      if (!window.YaGames) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = '/sdk.js';
          script.async = true;
          script.onload = resolve;
          script.onerror = () => reject(new Error('sdk.js not found'));
          document.head.appendChild(script);
          setTimeout(() => reject(new Error('sdk timeout')), 5000);
        });
      }

      if (!window.YaGames || typeof window.YaGames.init !== 'function') {
        throw new Error('YaGames is unavailable');
      }
      this.sdk = await window.YaGames.init();
      this.mode = 'sdk';
      try {
        if (this.sdk.features && this.sdk.features.LoadingAPI) this.sdk.features.LoadingAPI.ready();
      } catch (e) {}
      console.info('[Yandex Games] SDK успешно инициализирован.');
      if (game.active) this.gameplayStart();
    } catch (e) {
      this.mode = 'mock';
      console.info('[Yandex Games] SDK недоступен, включена безопасная заглушка.');
    }
  },

  gameplayStart() {
    if (this.mode !== 'sdk' || !this.sdk) return;
    try {
      if (this.sdk.features && this.sdk.features.GameplayAPI) this.sdk.features.GameplayAPI.start();
    } catch (e) {}
  },

  gameplayStop() {
    if (this.mode !== 'sdk' || !this.sdk) return;
    try {
      if (this.sdk.features && this.sdk.features.GameplayAPI) this.sdk.features.GameplayAPI.stop();
    } catch (e) {}
  },

  fullscreen() {
    if (this.mode !== 'sdk' || !this.sdk) {
      return MockAd.show('fullscreen');
    }
    const now = performance.now();
    if (now - this.lastFullscreen < 60000) return Promise.resolve(false);
    this.lastFullscreen = now;
    return new Promise((resolve) => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        resolve(true);
      };
      try {
        this.sdk.adv.showFullscreenAdv({
          callbacks: {
            onClose: finish,
            onError: finish,
          },
        });
      } catch (e) {
        finish();
      }
      setTimeout(finish, 20000);
    });
  },

  rewarded() {
    if (this.mode !== 'sdk' || !this.sdk) {
      return MockAd.show('rewarded');
    }
    return new Promise((resolve) => {
      let rewarded = false;
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        resolve(rewarded);
      };
      try {
        this.sdk.adv.showRewardedVideo({
          callbacks: {
            onRewarded: () => { rewarded = true; },
            onClose: finish,
            onError: finish,
          },
        });
      } catch (e) {
        finish();
      }
      setTimeout(finish, 45000);
    });
  },
};

ui.adClose.addEventListener('click', () => MockAd.close());

/* --------------------------- ДЕЙСТВИЯ ЭКРАНОВ --------------------------- */

async function handleRevive() {
  if (game.adBusy || game.reviveUsed || !game.over) return;
  game.adBusy = true;
  ui.btnRevive.disabled = true;
  ui.btnDouble.disabled = true;
  ui.btnRestart.disabled = true;
  const ok = await Platform.rewarded();
  game.adBusy = false;
  ui.btnRevive.disabled = game.reviveUsed;
  ui.btnDouble.disabled = game.doubleUsed || game.score <= 0;
  ui.btnRestart.disabled = false;

  if (!ok) {
    showToast('Реклама не была просмотрена — награда не получена');
    return;
  }

  game.reviveUsed = true;
  game.over = false;
  game.active = true;
  game.lives = 1;
  game.combo = 1;
  game.round = null;
  game.locked = true;
  game.pendingRoundAt = performance.now() + 600;
  game.mood = 'idle';
  ui.gameOverScreen.classList.add('hidden');
  resetDialogue();
  renderLives();
  updateHUD();
  AudioFX.revive();
  showToast('Вторая жизнь! Дело продолжается.');
  flashScreen('good');
  Platform.gameplayStart();
}

async function handleDouble() {
  if (game.adBusy || game.doubleUsed || !game.over) return;
  if (game.score <= 0) {
    showToast('Сначала заработайте очки, детектив');
    return;
  }
  game.adBusy = true;
  ui.btnRevive.disabled = true;
  ui.btnDouble.disabled = true;
  ui.btnRestart.disabled = true;
  const ok = await Platform.rewarded();
  game.adBusy = false;
  ui.btnRevive.disabled = game.reviveUsed;
  ui.btnDouble.disabled = game.doubleUsed || game.score <= 0;
  ui.btnRestart.disabled = false;

  if (!ok) {
    showToast('Реклама не была просмотрена — очки не удвоены');
    return;
  }

  game.doubleUsed = true;
  game.score *= 2;
  game.best = Math.max(game.best, game.score);
  commitRecord();
  ui.finalScore.textContent = formatScore(game.score);
  ui.finalBest.textContent = formatScore(game.best);
  ui.newRecord.classList.toggle('hidden', !(game.score > 0 && game.score >= game.best));
  ui.btnDouble.disabled = true;
  ui.btnDouble.querySelector('.reward-title').textContent = 'ОЧКИ УДВОЕНЫ';
  updateHUD(true);
  AudioFX.reward();
  showToast('Очки удвоены! Отличная работа, детектив.');
  burst(W * 0.5, H * 0.45, ['#ffd166', '#26e6ff', '#ff2d95', '#39ffa5'], 42, 1.1);
}

async function handleRestart() {
  if (game.adBusy) return;
  game.adBusy = true;
  ui.btnRestart.disabled = true;
  AudioFX.click();
  await Platform.fullscreen();
  game.adBusy = false;
  ui.btnRestart.disabled = false;
  startGame();
}

function goMenu() {
  AudioFX.click();
  game.active = false;
  game.over = true;
  game.round = null;
  game.locked = true;
  game.score = 0;
  game.lives = 3;
  game.combo = 1;
  game.maxCombo = 1;
  game.correct = 0;
  game.rounds = 0;
  game.reviveUsed = false;
  game.doubleUsed = false;
  game.recordEntry = null;
  game.mood = 'idle';
  resetDialogue();
  setAnswerEnabled(false);
  ui.gameOverScreen.classList.add('hidden');
  ui.startScreen.classList.remove('hidden');
  updateHUD();
  renderLives();
  renderRecords(ui.recordsStart);
  Platform.gameplayStop();
}

/* -------------------------------- ВВОД ---------------------------------- */

function answer(saysTruth) {
  if (!game.active || game.locked || !game.round || game.round.answered) return;
  AudioFX.resume();
  resolveAnswer(saysTruth);
}

function updateSoundButton() {
  ui.soundBtn.classList.toggle('muted', AudioFX.muted);
  ui.soundBtn.setAttribute('aria-label', AudioFX.muted ? 'Включить звук' : 'Выключить звук');
}

function bindInput() {
  ui.btnTruth.addEventListener('click', () => answer(true));
  ui.btnLie.addEventListener('click', () => answer(false));
  ui.btnStart.addEventListener('click', startGame);
  ui.btnRestart.addEventListener('click', handleRestart);
  ui.btnMenu.addEventListener('click', goMenu);
  ui.btnRevive.addEventListener('click', handleRevive);
  ui.btnDouble.addEventListener('click', handleDouble);

  ui.soundBtn.addEventListener('click', () => {
    AudioFX.resume();
    AudioFX.setMuted(!AudioFX.muted);
    updateSoundButton();
    if (!AudioFX.muted) AudioFX.click();
  });

  window.addEventListener('pointerdown', () => AudioFX.resume(), { passive: true });

  window.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    const startVisible = !ui.startScreen.classList.contains('hidden');
    if (startVisible && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      startGame();
      return;
    }
    if (!game.active) return;
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A' || e.key === 'ф' || e.key === 'Ф') {
      e.preventDefault();
      answer(true);
    } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D' || e.key === 'в' || e.key === 'В') {
      e.preventDefault();
      answer(false);
    }
  });

  let swipeStart = null;
  app.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) {
      swipeStart = null;
      return;
    }
    const touch = e.touches[0];
    swipeStart = { x: touch.clientX, y: touch.clientY, t: performance.now() };
  }, { passive: true });

  app.addEventListener('touchend', (e) => {
    if (!swipeStart) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - swipeStart.x;
    const dy = touch.clientY - swipeStart.y;
    const dt = performance.now() - swipeStart.t;
    swipeStart = null;
    if (dt < 800 && Math.abs(dx) > 46 && Math.abs(dx) > Math.abs(dy) * 1.15) {
      answer(dx < 0);
    }
  }, { passive: true });

  app.addEventListener('contextmenu', (e) => {
    if (e.target === canvas) e.preventDefault();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      game.pausedAt = performance.now();
      return;
    }
    if (game.pausedAt) {
      const delta = performance.now() - game.pausedAt;
      game.pausedAt = 0;
      if (game.round) {
        game.round.startAt += delta;
        if (game.round.answered) game.round.answerAt += delta;
      }
      game.pendingRoundAt += delta;
      lastFrame = performance.now();
    }
  });
}

/* ------------------------------ ИНИЦИАЛИЗАЦИЯ --------------------------- */

let lastFrame = performance.now();

function loop(now) {
  const dt = Math.min(0.05, (now - lastFrame) / 1000);
  lastFrame = now;
  updateParticles(dt);
  updateGame(now);
  drawScene(now);
  requestAnimationFrame(loop);
}

function init() {
  resizeScene();
  window.addEventListener('resize', resizeScene);
  window.addEventListener('orientationchange', () => setTimeout(resizeScene, 140));
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', resizeScene);
  }

  updateSoundButton();
  renderLives();
  updateHUD();
  renderRecords(ui.recordsStart);
  resetDialogue();
  setAnswerEnabled(false);
  bindInput();

  requestAnimationFrame(loop);
  Platform.init();
}

init();





