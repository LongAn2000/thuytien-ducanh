import './style.css';
import * as C from './config.js';

const BASE = import.meta.env.BASE_URL;
const url = path => (/^(https?:|data:|\/)/.test(path) ? path : BASE + path);
const esc = value =>
  String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
const HEART = 'M12 21S1.8 14.3 1.8 7.6A5.6 5.6 0 0 1 12 4.4a5.6 5.6 0 0 1 10.2 3.2C22.2 14.3 12 21 12 21Z';
const star = '<span class="btn__star" aria-hidden="true">★</span>';

const state = {
  guest: null,
  locked: true,
};

/* ---------- shared bits ---------- */

function decor({ src, x, y, w, r = '0deg', opacity = 1, motion = 'sway', duration = '7s', delay = '0s', hideOnMobile = false }) {
  const cls = ['decor', motion === 'none' ? '' : motion, hideOnMobile ? 'decor--desktop' : ''].filter(Boolean).join(' ');
  return `<img src="${url(`art/${src}.webp`)}" alt="" aria-hidden="true" class="${cls}" style="--x:${x};--y:${y};--w:${w};--r:${r};--o:${opacity};--dur:${duration};--delay:${delay}">`;
}

const reveal = (inner, { cls = '', delay = 0, attrs = '' } = {}) =>
  `<div class="reveal${cls ? ` ${cls}` : ''}" style="--delay:${delay}ms"${attrs}>${inner}</div>`;

function observeReveals(root = document) {
  const items = root.querySelectorAll('.reveal:not(.is-in)');
  items.forEach(el => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    );
    io.observe(el);
  });
}

const invitationType = () => state.guest?.type ?? 'general';

/* ---------- Hero ---------- */

function heroHtml() {
  const { couple, dateLabel: d, hero, music } = C;
  const dear = state.guest
    ? `<p class="hero__dear">Dear ${esc(state.guest.name)},<span class="hero__invite">${esc(hero.invite)}</span></p>`
    : '';
  return `
  <section class="section section--red section--red-stripe hero__hero" aria-label="Trang bìa" id="hero">
    ${decor({ src: 'beige/letters', x: '-6%', y: '7%', w: 'clamp(80px, 20vw, 180px)', r: '-9deg', motion: 'sway', duration: '9s', opacity: 0.85 })}
    ${decor({ src: 'beige/bouquet', x: '80%', y: '3%', w: 'clamp(70px, 17vw, 145px)', r: '8deg', motion: 'float', duration: '8s', delay: '-2s', opacity: 0.85 })}
    ${decor({ src: 'beige/champagne', x: '0%', y: '80%', w: 'clamp(56px, 13vw, 112px)', r: '-5deg', motion: 'sway', duration: '8.5s', delay: '-4s', opacity: 0.85 })}
    ${decor({ src: 'beige/cupcake', x: '82%', y: '82%', w: 'clamp(56px, 13vw, 114px)', r: '7deg', motion: 'float', duration: '9s', delay: '-2.5s', opacity: 0.85 })}
    ${decor({ src: 'beige/sparkle', x: '14%', y: '26%', w: 'clamp(26px, 6vw, 62px)', motion: 'twinkle', duration: '4.5s', opacity: 0.7 })}
    ${decor({ src: 'beige/starburst', x: '84%', y: '52%', w: 'clamp(28px, 6.5vw, 68px)', r: '12deg', motion: 'twinkle', duration: '5.5s', delay: '-2s', opacity: 0.7 })}
    ${decor({ src: 'beige/cherry', x: '86%', y: '28%', w: 'clamp(70px, 9vw, 130px)', r: '-12deg', motion: 'sway', duration: '9.5s', delay: '-1.5s', opacity: 0.85, hideOnMobile: true })}
    ${decor({ src: 'beige/bow', x: '-1%', y: '38%', w: 'clamp(88px, 12vw, 170px)', r: '10deg', motion: 'sway', duration: '10s', delay: '-3s', opacity: 0.85, hideOnMobile: true })}
    ${decor({ src: 'beige/dove', x: '62%', y: '90%', w: 'clamp(64px, 8vw, 116px)', r: '-6deg', motion: 'float', duration: '7s', delay: '-1s', opacity: 0.85, hideOnMobile: true })}
    ${decor({ src: 'beige/ribbon', x: '20%', y: '88%', w: 'clamp(70px, 9vw, 130px)', r: '6deg', motion: 'sway', duration: '11s', delay: '-5s', opacity: 0.8, hideOnMobile: true })}
    <div class="hero__top">
      <p class="eyebrow">Save the date</p>
      <p class="hero__monogram">${esc(couple.groom.at(0))} &amp; ${esc(couple.bride.at(0))}<img class="hero__monogramBow wobble" src="${url('art/beige/bow.webp')}" alt="" aria-hidden="true"></p>
    </div>
    <div class="hero__stage">
      <img class="hero__printer" src="${url('art/printer.webp')}" alt="" aria-hidden="true">
      <div class="hero__slot" aria-live="polite">
        <div class="hero__photo stamp">
          <img class="stamp__photo" src="${url(hero.photo)}" alt="${esc(couple.groomFull)} và ${esc(couple.brideFull)}" width="708" height="1008">
          <img class="stamp__frame" src="${url('art/stamp-frame.webp')}" alt="" aria-hidden="true">
        </div>
      </div>
      <div class="hero__cta">
        <button type="button" class="btn btn--stamp" data-print>${star}Print now${star}</button>
        <p class="hero__hint">Bấm để in tấm hình của tụi mình</p>
      </div>
    </div>
    <div class="hero__after">
      <div class="hero__afterInner">
        ${dear}
        <div class="hero__names">
          <h1 class="hero__name">${esc(couple.groom)}</h1>
          <span class="hero__amp"><img class="hero__ampSparkle twinkle" src="${url('art/beige/sparkle.webp')}" alt="" aria-hidden="true">&amp;<img class="hero__ampSparkle twinkle" src="${url('art/beige/sparkle.webp')}" alt="" aria-hidden="true"></span>
          <p class="hero__name">${esc(couple.bride)}</p>
          <p class="hero__dateline"><i></i>${d.day}.${d.month}.${d.year}<i></i></p>
        </div>
        <button type="button" class="hero__scrollCue" data-scroll-cue>Cuộn xuống nha</button>
      </div>
    </div>
    ${
      music.src
        ? `<audio src="${url(music.src)}" loop preload="none"></audio>
    <button type="button" class="hero__music" aria-pressed="false" aria-label="Bật nhạc nền"><span class="hero__musicBars" aria-hidden="true"><i></i><i></i><i></i><i></i></span></button>`
        : ''
    }
  </section>`;
}

function initHero() {
  const section = document.getElementById('hero');
  const photo = section.querySelector('.hero__photo');
  const audio = section.querySelector('audio');
  const musicBtn = section.querySelector('.hero__music');
  let phase = 'idle';
  let timer;

  const setPhase = next => {
    section.classList.remove(`hero__${phase}`);
    phase = next;
    section.classList.add(`hero__${phase}`);
  };

  const setPlaying = on => {
    musicBtn.classList.toggle('hero__playing', on);
    musicBtn.setAttribute('aria-pressed', String(on));
    musicBtn.setAttribute('aria-label', on ? 'Tắt nhạc nền' : 'Bật nhạc nền');
  };
  const play = async () => {
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  section.querySelector('[data-print]').addEventListener('click', () => {
    if (phase !== 'idle') return;
    setPhase('printing');
    timer = window.setTimeout(() => phase === 'printing' && setPhase('done'), 3200);
    if (audio) play();
  });
  photo.addEventListener('transitionend', e => {
    if (e.target === photo && e.propertyName === 'transform' && phase === 'printing') {
      window.clearTimeout(timer);
      setPhase('done');
    }
  });
  section.querySelector('[data-scroll-cue]').addEventListener('click', () => {
    document.getElementById('album')?.scrollIntoView({ behavior: 'smooth' });
  });
  musicBtn?.addEventListener('click', () => {
    if (audio.paused) play();
    else {
      audio.pause();
      setPlaying(false);
    }
  });
}

/* ---------- Gallery + Puzzle ---------- */

function galleryHtml() {
  const g = C.gallery;
  const p = C.puzzle;
  const frames = g.shots
    .map(
      s => `<figure class="gallery__frame">
        <img class="gallery__photo" src="${url(s.src)}" alt="${esc(s.alt)}" width="760" height="541">
        <img class="gallery__film" src="${url('art/film-frame.webp')}" alt="" aria-hidden="true">
      </figure>`,
    )
    .join('');
  const puzzle = `<div class="puzzle__wrap">
      <p class="puzzle__title">${esc(p.title)}</p>
      <svg class="puzzle__defs" aria-hidden="true"><defs>
        <clipPath id="pz-tab" clipPathUnits="objectBoundingBox"><path d="M0,0 H0.8200000000000001 V0.35 C0.9,0.27 1,0.37 1,0.5 C1,0.63 0.9,0.73 0.8200000000000001,0.65 V1 H0 Z"/></clipPath>
        <clipPath id="pz-notch" clipPathUnits="objectBoundingBox"><path d="M0,0 H1 V1 H0 V0.65 C0.08,0.73 0.18,0.63 0.18,0.5 C0.18,0.37 0.08,0.27 0,0.35 Z"/></clipPath>
      </defs></svg>
      <div class="puzzle__board">
        <figure class="puzzle__slot" style="clip-path:url(#pz-tab)"><img src="${url(p.pieces[0].src)}" alt="${esc(p.pieces[0].alt)}" width="620" height="620" draggable="false"></figure>
        <div class="puzzle__piece" style="clip-path:url(#pz-notch);--fx:0.52;--fy:0.2" role="button" tabindex="0" aria-disabled="false"
          aria-label="${esc(p.pieces[1].alt)} — kéo hoặc dùng phím mũi tên để ghép vào mảnh bên trái"><img src="${url(p.pieces[1].src)}" alt="${esc(p.pieces[1].alt)}" width="620" height="620" draggable="false"></div>
      </div>
      <p class="puzzle__prompt" aria-live="polite">${esc(p.prompt)}</p>
    </div>`;
  return `
  <section id="album" class="section section--beige section--beige-light section--grain" aria-labelledby="album-title">
    <div class="container">
      ${reveal(`<p class="eyebrow">${esc(g.eyebrow)}</p><h2 id="album-title" class="h2">${esc(g.title)}</h2><p class="lead">${esc(g.note)}</p>`, { cls: 'section-head', delay: 60 })}
    </div>
    <div class="gallery__reel">
      <img class="gallery__can" src="${url('art/film-can.webp')}" alt="" aria-hidden="true">
      <div class="gallery__track" tabindex="0" role="group" aria-label="${esc(g.title)}">${frames}</div>
      <div class="gallery__fade" aria-hidden="true"></div>
    </div>
    <p class="gallery__hint">${esc(g.hint)}<span class="gallery__arrow" aria-hidden="true">→</span></p>
    <div class="container container--content">
      ${reveal(puzzle, { cls: 'gallery__puzzle', delay: 120 })}
    </div>
  </section>`;
}

function initGallery() {
  const reel = document.querySelector('.gallery__reel');
  const track = reel.querySelector('.gallery__track');
  const hint = document.querySelector('.gallery__hint');
  let canOut = false;

  track.addEventListener('scroll', () => {
    const left = track.scrollLeft;
    hint.toggleAttribute('data-done', left > 24);
    canOut = canOut ? left > 40 : left > 120;
    reel.toggleAttribute('data-can-out', canOut);
  });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (track.scrollLeft > 24) return;
        track.scrollTo({ left: 64, behavior: 'smooth' });
        window.setTimeout(() => track.scrollTo({ left: 0, behavior: 'smooth' }), 620);
      },
      { threshold: 0.35 },
    );
    io.observe(track);
  }

  initPuzzle();
}

function initPuzzle() {
  const board = document.querySelector('.puzzle__board');
  const piece = board.querySelector('.puzzle__piece');
  const prompt = document.querySelector('.puzzle__prompt');
  let pos = { x: 0.52, y: 0.2 };
  let dragging = false;
  let solved = false;

  const paint = () => {
    piece.style.setProperty('--fx', pos.x);
    piece.style.setProperty('--fy', pos.y);
    piece.classList.toggle('puzzle__dragging', dragging);
  };
  const setDragging = on => {
    dragging = on;
    paint();
  };
  const moveTo = (x, y) => {
    if (Math.hypot(x, y) <= 0.17) {
      pos = { x: 0, y: 0 };
      solved = true;
      dragging = false;
      paint();
      board.classList.add('puzzle__solved');
      piece.tabIndex = -1;
      piece.setAttribute('aria-disabled', 'true');
      prompt.textContent = C.puzzle.done;
      unlockDetails();
      return;
    }
    pos = { x, y };
    paint();
  };

  piece.addEventListener('pointerdown', e => {
    if (solved) return;
    const rect = piece.getBoundingClientRect();
    piece.setPointerCapture(e.pointerId);
    piece.dataset.ox = String(e.clientX - pos.x * rect.width);
    piece.dataset.oy = String(e.clientY - pos.y * rect.width);
    piece.dataset.w = String(rect.width);
    setDragging(true);
  });
  piece.addEventListener('pointermove', e => {
    if (!dragging || !piece.hasPointerCapture(e.pointerId)) return;
    const w = Number(piece.dataset.w);
    if (w) moveTo((e.clientX - Number(piece.dataset.ox)) / w, (e.clientY - Number(piece.dataset.oy)) / w);
  });
  piece.addEventListener('pointerup', () => setDragging(false));
  piece.addEventListener('pointercancel', () => setDragging(false));
  piece.addEventListener('keydown', e => {
    if (solved) return;
    const step = { ArrowLeft: [-0.07, 0], ArrowRight: [0.07, 0], ArrowUp: [0, -0.07], ArrowDown: [0, 0.07] }[e.key];
    if (step) {
      e.preventDefault();
      moveTo(pos.x + step[0], pos.y + step[1]);
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      moveTo(0, 0);
    }
  });
}

/* ---------- Details (calendar, families, venue) ---------- */

const DOW = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
const MONTHS = ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai'];

function calendarHtml() {
  const date = new Date(C.weddingDate);
  const base = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const day = offset => {
    const d = new Date(base + 864e5 * offset);
    return { day: String(d.getUTCDate()).padStart(2, '0'), dow: DOW[d.getUTCDay()] };
  };
  const quiet = [day(-9), day(-8), day(-7)];
  const countdown = [day(-2), day(-1)];
  const wedding = day(0);
  const { calendar: cal, couple, dateLabel: d } = C;
  const alt = `${esc(couple.groom)} và ${esc(couple.bride)} trong bộ ảnh cưới`;
  return `<figure class="calendar__pad">
    <div class="calendar__rings" aria-hidden="true">${'<i></i>'.repeat(11)}</div>
    <div class="calendar__page">
      <header class="calendar__head">
        <h3 class="calendar__month">${MONTHS[new Date(base).getUTCMonth()]} <span class="calendar__year">${new Date(base).getUTCFullYear()}</span></h3>
        <p class="calendar__headHand">${esc(cal.headHand)}</p>
      </header>
      <div class="calendar__grid">
        ${quiet.map(q => `<span class="calendar__dow">${q.dow}</span>`).join('')}
        <div class="calendar__cell calendar__quiet">
          <span class="calendar__num">${quiet[0].day}</span>
          <figure class="calendar__polaroid">
            <img src="${url('art/beige/tape.webp')}" alt="" aria-hidden="true" class="calendar__tape">
            <img src="${url(cal.photos[0])}" alt="${alt}" width="560" height="700">
          </figure>
        </div>
        <div class="calendar__cell calendar__quiet">
          <span class="calendar__num">${quiet[1].day}</span>
          <p class="calendar__note calendar__noteA">${esc(cal.notes.countdown)}</p>
          <img class="calendar__sparkle twinkle" src="${url('art/red/sparkle.webp')}" alt="" aria-hidden="true">
          <span class="calendar__star calendar__starA" aria-hidden="true"></span>
        </div>
        <div class="calendar__cell calendar__quiet">
          <span class="calendar__num">${quiet[2].day}</span>
          <figure class="calendar__snap sway"><img src="${url(cal.photos[1])}" alt="${alt}" width="440" height="550"></figure>
        </div>
        <div class="calendar__cell">
          <span class="calendar__num">${countdown[0].day}</span>
          <p class="calendar__note">${esc(cal.notes.twoDays)}</p>
          <span class="calendar__star calendar__starA" aria-hidden="true"></span>
          <span class="calendar__star calendar__starB" aria-hidden="true"></span>
        </div>
        <div class="calendar__cell">
          <span class="calendar__num">${countdown[1].day}</span>
          <p class="calendar__note">${esc(cal.notes.oneNight)}</p>
          <img class="calendar__bow sway" src="${url('art/red/bow.webp')}" alt="" aria-hidden="true">
        </div>
        <div class="calendar__cell calendar__mark">
          <span class="calendar__star calendar__bigStar twinkle" aria-hidden="true"></span>
          <span class="calendar__num calendar__markNum">${wedding.day}</span>
          <p class="calendar__markLabel">${wedding.dow}</p>
          <p class="calendar__markTitle">${esc(cal.notes.wedding)}</p>
          <svg class="calendar__heart" viewBox="0 0 24 22" fill="currentColor" aria-hidden="true"><path d="${HEART}"/></svg>
        </div>
      </div>
      <figcaption class="calendar__strip">
        <span class="calendar__stripLabel">Save the date</span>
        <span class="calendar__stripDate">${d.day}.${d.month}.${d.year}</span>
      </figcaption>
    </div>
  </figure>`;
}

function detailsHtml() {
  const v = C.venue;
  const families = C.families
    .map(
      f => `<div class="details__family">
        <p class="eyebrow">${esc(f.side)}</p>
        <ul class="details__parents">${f.people
          .map(p => `<li><span class="details__role">${esc(p.role)}</span><span class="details__parentName">${esc(p.name)}</span></li>`)
          .join('')}</ul>
      </div>`,
    )
    .join('');
  return `
  <section id="thong-tin" class="section section--stripe details__locked" aria-labelledby="thong-tin-title">
    ${decor({ src: 'red/dove', x: '82%', y: '7%', w: 'clamp(66px, 16vw, 134px)', r: '-8deg', motion: 'float', duration: '8s' })}
    ${decor({ src: 'red/bouquet', x: '-2%', y: '80%', w: 'clamp(66px, 16vw, 140px)', r: '-7deg', motion: 'float', duration: '9.5s', delay: '-2s' })}
    <p class="details__lockNote"><span class="details__lockIcon" aria-hidden="true">✦</span>${esc(C.puzzle.locked)}</p>
    <div class="details__gate">
      <div class="container container--content sheet">
        <img class="seal" src="${url('art/seal.webp')}" alt="" aria-hidden="true">
        ${reveal('<p class="eyebrow">Thông tin lễ cưới</p><h2 id="thong-tin-title" class="h2">Ngày tụi mình về chung một nhà</h2>', { cls: 'section-head', delay: 60 })}
        ${reveal(calendarHtml(), { delay: 120 })}
        <hr class="details__divider">
        ${reveal(families, { cls: 'details__families', delay: 150 })}
        <hr class="details__divider">
        ${reveal(
          `<img class="details__illustration sway" src="${url(v.illustration)}" alt="" aria-hidden="true">
          <p class="eyebrow">Địa điểm</p>
          <h3 class="h3">${esc(v.name)}</h3>
          <p class="h4">${esc(v.hall)}</p>
          <p class="muted">${esc(v.address)}</p>
          <p class="script">${esc(v.note)}</p>
          <a class="btn btn--stamp" href="${esc(v.mapUrl)}" target="_blank" rel="noreferrer noopener">${star}Xem bản đồ${star}</a>`,
          { cls: 'details__venue', delay: 180 },
        )}
      </div>
    </div>
  </section>`;
}

function unlockDetails() {
  if (!state.locked) return;
  state.locked = false;
  const section = document.getElementById('thong-tin');
  section.classList.remove('details__locked');
  section.querySelector('.details__lockNote')?.remove();
}

function initDetails() {
  document.getElementById('thong-tin').addEventListener('focusin', () => unlockDetails());
}

/* ---------- Agenda ---------- */

function minutes(time) {
  const [h, m] = time.split(':').map(Number);
  return 60 * h + m;
}

function durationLabel(start, end) {
  let total = minutes(end) - minutes(start);
  if (total < 0) total += 1440;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h ? (m ? `${h} tiếng ${m} phút` : `${h} tiếng`) : `${m} phút`;
}

const agendaState = { selected: 'main', scrolled: false, likes: {} };
const agendaParties = () => C.agenda.parties.filter(p => p.id !== 'intimate' || invitationType() === 'intimate');
const currentParty = () => agendaParties().find(p => p.id === agendaState.selected) ?? agendaParties()[0];

function agendaHtml() {
  return `
  <section id="agenda" class="section section--red section--red-deep section--grain" aria-label="Chương trình">
    ${decor({ src: 'beige/sparkle', x: '4%', y: '18%', w: 'clamp(26px, 6.5vw, 58px)', motion: 'twinkle', duration: '4.8s' })}
    ${decor({ src: 'beige/starburst', x: '90%', y: '74%', w: 'clamp(26px, 6.5vw, 58px)', motion: 'twinkle', duration: '5.6s', delay: '-2s' })}
    ${decor({ src: 'beige/bouquet', x: '-2%', y: '82%', w: 'clamp(58px, 14vw, 124px)', r: '8deg', motion: 'sway', duration: '9.5s', delay: '-3s', hideOnMobile: true })}
    <div class="container container--content">
      ${reveal('', { cls: 'section-head', attrs: ' data-agenda-head' })}
      ${reveal('', { cls: 'agenda__panel', delay: 80, attrs: ' data-agenda-panel' })}
    </div>
  </section>`;
}

function renderAgenda() {
  const parties = agendaParties();
  const party = currentParty();
  const multi = parties.length > 1;
  const head = document.querySelector('[data-agenda-head]');
  const panel = document.querySelector('[data-agenda-panel]');

  head.classList.toggle('agenda__headNoNote', !party.note);
  head.innerHTML = `<p class="eyebrow">${esc(C.agenda.eyebrow)}</p><h2 class="h2">${esc(party.title)}</h2>${party.note ? `<p class="lead">${esc(party.note)}</p>` : ''}`;

  const tabs = multi
    ? `<div class="agenda__tabs" role="tablist" aria-label="Chọn buổi tiệc">${parties
        .map(p => {
          const on = p.id === party.id;
          return `<button type="button" role="tab" id="agenda-tab-${p.id}" class="agenda__tab" aria-selected="${on}" aria-controls="agenda-panel-${p.id}" tabindex="${on ? 0 : -1}" data-tab="${p.id}">${esc(p.tab)}</button>`;
        })
        .join('')}</div>`
    : '';
  const cards = party.items
    .map(item => {
      const key = `${party.id}-${item.time}`;
      const on = !!agendaState.likes[key];
      return `<li class="agenda__card">
        <button type="button" class="agenda__tap" aria-pressed="${on}" aria-label="Thả tim cho ${esc(item.title)} lúc ${esc(item.time)}" data-like="${key}">
          <img class="agenda__photo" src="${url(item.photo)}" alt="${esc(item.alt)}" width="560" height="747">
          <span class="agenda__time" aria-hidden="true">${esc(item.time)}</span>
          <span class="agenda__heart"${on ? ' data-on="true"' : ''} aria-hidden="true"><svg viewBox="0 0 24 22"><path d="${HEART}"/></svg></span>
        </button>
        <div class="agenda__meta">
          <h3 class="agenda__title">${esc(item.title)}</h3>
          ${item.note ? `<p class="agenda__note">${esc(item.note)}</p>` : ''}
        </div>
      </li>`;
    })
    .join('');

  panel.innerHTML = `<span class="agenda__grabber" aria-hidden="true"></span>
    ${tabs}
    <p class="agenda__window"><span class="agenda__clock">${party.start} <span aria-hidden="true">–</span> ${party.end}</span><span class="agenda__duration">khoảng ${durationLabel(party.start, party.end)}</span></p>
    <div id="agenda-panel-${party.id}"${multi ? ` role="tabpanel" aria-labelledby="agenda-tab-${party.id}" tabindex="0"` : ''}>
      <ol class="agenda__track" aria-label="${esc(party.title)}">${cards}</ol>
    </div>
    <p class="agenda__hints"><span class="agenda__hint" hidden>${esc(C.agenda.hint)}<span class="agenda__arrow" aria-hidden="true">→</span></span><span class="agenda__likeHint">${esc(C.agenda.likeHint)}</span></p>`;

  const track = panel.querySelector('.agenda__track');
  const hint = panel.querySelector('.agenda__hint');
  hint.toggleAttribute('data-done', agendaState.scrolled);
  agendaResize?.disconnect();
  agendaResize = new ResizeObserver(() => {
    hint.hidden = !(track.scrollWidth > track.clientWidth + 1);
  });
  agendaResize.observe(track);
  track.addEventListener('scroll', () => {
    agendaState.scrolled = track.scrollLeft > 24;
    hint.toggleAttribute('data-done', agendaState.scrolled);
  });
}
let agendaResize;

function selectParty(id, focus = false) {
  agendaState.selected = id;
  agendaState.scrolled = false;
  renderAgenda();
  if (focus) document.getElementById(`agenda-tab-${id}`)?.focus();
}

function initAgenda() {
  const panel = document.querySelector('[data-agenda-panel]');
  panel.addEventListener('click', e => {
    const tab = e.target.closest('[data-tab]');
    if (tab) return selectParty(tab.dataset.tab);
    const like = e.target.closest('[data-like]');
    if (!like) return;
    const key = like.dataset.like;
    const on = !agendaState.likes[key];
    agendaState.likes[key] = on;
    like.setAttribute('aria-pressed', String(on));
    const heart = like.querySelector('.agenda__heart');
    if (on) heart.setAttribute('data-on', 'true');
    else heart.removeAttribute('data-on');
  });
  panel.addEventListener('keydown', e => {
    if (!e.target.closest('[role="tablist"]') || (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft')) return;
    e.preventDefault();
    const parties = agendaParties();
    const i = parties.findIndex(p => p.id === currentParty().id);
    const next = parties[(i + (e.key === 'ArrowRight' ? 1 : parties.length - 1)) % parties.length];
    selectParty(next.id, true);
  });
  renderAgenda();
}

/* ---------- Dresscode ---------- */

function dresscodeHtml() {
  const d = C.dresscode;
  return `
  <section id="dresscode" class="section section--stripe" aria-labelledby="dresscode-title">
    ${decor({ src: 'red/cherry', x: '-3%', y: '8%', w: 'clamp(70px, 17vw, 150px)', r: '-10deg', motion: 'sway', duration: '9s' })}
    ${decor({ src: 'red/cherry', x: '84%', y: '76%', w: 'clamp(62px, 15vw, 132px)', r: '12deg', motion: 'sway', duration: '10.5s', delay: '-3s' })}
    <div class="container container--content sheet">
      <img class="seal" src="${url('art/seal.webp')}" alt="" aria-hidden="true">
      ${reveal(`<p class="eyebrow">Dresscode</p><h2 id="dresscode-title" class="h2">${esc(d.title)}</h2><p class="lead">${esc(d.note)}</p>`, { cls: 'section-head' })}
      ${reveal(
        `<img class="dresscode__frame dresscode__frameA" src="${url(d.frames[0])}" alt="" aria-hidden="true"><img class="dresscode__frame dresscode__frameB" src="${url(d.frames[1])}" alt="Ảnh ${esc(C.couple.groom)} và ${esc(C.couple.bride)}">`,
        { cls: 'dresscode__flipbook', delay: 80 },
      )}
    </div>
  </section>`;
}

/* ---------- RSVP ---------- */

function rsvpHtml() {
  const r = C.rsvp;
  const guest = state.guest;
  const choice = (name, value, label, checked) =>
    `<label class="choice__item"><input type="radio" name="${name}" value="${value}"${checked ? ' checked' : ''}><span>${label}</span></label>`;
  const counter = [choice('companions', 0, esc(r.companions.none), true)]
    .concat(Array.from({ length: r.companions.max }, (_, i) => choice('companions', i + 1, `${i + 1} người`, false)))
    .join('');
  const form = `<form class="rsvp__form">
      ${guest ? '' : `<div class="field"><label class="label" for="rsvp-name">Tên của bạn</label><input class="input" id="rsvp-name" name="name" required autocomplete="name" placeholder="Nguyễn Văn A"></div>`}
      <fieldset class="rsvp__fieldset">
        <legend class="label">${esc(r.attending[invitationType()])}</legend>
        <div class="choice">${choice('attending', 'yes', esc(r.attending.yes), true)}${choice('attending', 'no', esc(r.attending.no), false)}</div>
      </fieldset>
      <fieldset class="rsvp__fieldset" data-when-yes>
        <legend class="label">${esc(r.companions.question)}</legend>
        <div class="rsvp__counter">${counter}</div>
      </fieldset>
      <div class="field" data-when-companions hidden><label class="label" for="rsvp-companions">${esc(r.companions.namesLabel)}</label><input class="input" id="rsvp-companions" name="companionNames" placeholder="${esc(r.companions.namesPlaceholder)}"></div>
      <div class="field"><label class="label" for="rsvp-note">${esc(r.message.label)}</label><textarea class="textarea" id="rsvp-note" name="note" placeholder="${esc(r.message.placeholder)}"></textarea></div>
      <p class="script rsvp__closing">${esc(r.closing)}</p>
      <p class="error" data-error hidden>Gửi chưa được, bạn thử lại giúp tụi mình một lần nữa nha.</p>
      <div class="rsvp__submit">
        <img class="rsvp__blink twinkle" src="${url('art/red/sparkle.webp')}" alt="" aria-hidden="true">
        <button type="submit" class="btn btn--stamp">${star}<span data-submit-label>Xác nhận</span>${star}</button>
        <img class="rsvp__blink twinkle" style="--delay:-2.4s" src="${url('art/red/starburst.webp')}" alt="" aria-hidden="true">
      </div>
    </form>
    <div class="rsvp__done" hidden>
      <img class="rsvp__seal" src="${url('art/seal.webp')}" alt="" aria-hidden="true">
      <h3 class="h3">${esc(r.successTitle)}</h3>
      <p class="script">${esc(r.successNote)}</p>
      <button type="button" class="btn btn--outline" data-edit>Sửa lại câu trả lời</button>
    </div>`;
  return `
  <section id="rsvp" class="section section--red section--red-stripe" aria-labelledby="rsvp-title">
    <div class="container container--narrow sheet">
      <img class="seal" src="${url('art/seal.webp')}" alt="" aria-hidden="true">
      ${reveal(`<p class="eyebrow">RSVP</p><h2 id="rsvp-title" class="h2">${esc(guest ? `${guest.name} ơi, ${r.title.toLowerCase()}` : r.title)}</h2><p class="lead">${esc(r.note)}</p>`, { cls: 'section-head' })}
      ${reveal(form, { delay: 100 })}
    </div>
  </section>`;
}

function initRsvp() {
  const form = document.querySelector('.rsvp__form');
  const done = document.querySelector('.rsvp__done');
  const whenYes = form.querySelector('[data-when-yes]');
  const whenCompanions = form.querySelector('[data-when-companions]');
  const error = form.querySelector('[data-error]');
  const submit = form.querySelector('[type="submit"]');
  const label = form.querySelector('[data-submit-label]');
  const attending = () => form.querySelector('input[name="attending"]:checked').value;
  const companions = () => Number(form.querySelector('input[name="companions"]:checked').value);

  const sync = () => {
    const yes = attending() === 'yes';
    whenYes.hidden = !yes;
    whenCompanions.hidden = !(yes && companions() > 0);
  };
  const setStatus = status => {
    error.hidden = status !== 'error';
    submit.disabled = status === 'sending';
    label.textContent = status === 'sending' ? 'Đang gửi…' : 'Xác nhận';
    form.hidden = status === 'sent';
    done.hidden = status !== 'sent';
  };

  form.addEventListener('change', sync);
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = new FormData(form);
    const yes = attending() === 'yes';
    const count = companions();
    const payload = {
      slug: state.guest?.slug ?? '',
      name: state.guest?.name ?? String(data.get('name') ?? '').trim(),
      attending: attending(),
      companions: yes ? count : 0,
      companionNames: yes && count > 0 ? String(data.get('companionNames') ?? '').trim() : '',
      note: String(data.get('note') ?? '').trim(),
      submittedAt: new Date().toISOString(),
    };
    setStatus('sending');
    try {
      const saved = JSON.parse(localStorage.getItem('rsvp-submissions') ?? '[]');
      localStorage.setItem('rsvp-submissions', JSON.stringify([...saved, payload]));
    } catch {}
    if (!C.sheetEndpoint) return setStatus('sent');
    try {
      await fetch(C.sheetEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  });
  done.querySelector('[data-edit]').addEventListener('click', () => {
    form.querySelectorAll('input:not([type="radio"]), textarea').forEach(field => (field.value = ''));
    setStatus('idle');
  });
  sync();
}

/* ---------- Thank you ---------- */

function thankYouHtml() {
  const t = C.thankYou;
  const human = [
    ['4.6s', '0s'],
    ['5.2s', '-1.2s'],
  ];
  const pet = [
    ['3.8s', '-0.4s'],
    ['4.2s', '-2.1s'],
    ['4.9s', '-3s'],
  ];
  const member = (src, kind, [dur, delay]) =>
    `<img class="thankyou__member thankyou__${kind} wobble" style="--dur:${dur};--delay:${delay}" src="${url(src)}" alt="" aria-hidden="true">`;
  const pets = t.pets.length
    ? `<div class="thankyou__crewRow">${t.pets.map((src, i) => member(src, 'cat', pet[i % pet.length])).join('')}</div>`
    : '';
  return `
  <section id="cam-on" class="section section--beige section--beige-light section--grain" aria-labelledby="cam-on-title">
    ${decor({ src: 'red/lips', x: '80%', y: '8%', w: 'clamp(56px, 14vw, 118px)', r: '-14deg', motion: 'wobble', duration: '7s' })}
    ${decor({ src: 'red/starburst', x: '90%', y: '21%', w: 'clamp(30px, 7vw, 66px)', motion: 'twinkle', duration: '5.4s', delay: '-1.5s' })}
    ${decor({ src: 'red/sparkle', x: '3%', y: '58%', w: 'clamp(30px, 7vw, 66px)', motion: 'twinkle', duration: '4.6s', hideOnMobile: true })}
    ${decor({ src: 'red/sparkle', x: '90%', y: '86%', w: 'clamp(24px, 5.5vw, 52px)', motion: 'twinkle', duration: '6.2s', delay: '-3s', hideOnMobile: true })}
    ${decor({ src: 'red/starburst', x: '2%', y: '88%', w: 'clamp(24px, 5.5vw, 52px)', motion: 'twinkle', duration: '5s', delay: '-2.4s' })}
    <div class="container container--content thankyou__body">
      ${reveal('<p class="eyebrow">Thank you</p><h2 id="cam-on-title" class="h2">Cảm ơn bạn</h2>', { cls: 'section-head thankyou__head', delay: 80 })}
      ${reveal(`<p class="lead">${esc(t.lead)}</p><p class="script">${esc(t.sign)}</p>`, { cls: 'thankyou__words', delay: 140 })}
      ${reveal(
        `<div class="thankyou__crewRow">${t.humans.map((src, i) => member(src, 'human', human[i % human.length])).join('')}</div>
        ${pets}
        ${t.petsCaption ? `<p class="caption thankyou__cats">${esc(t.petsCaption)}</p>` : ''}`,
        { cls: 'thankyou__crew', delay: 200 },
      )}
      ${reveal(`<p class="thankyou__hashtag">${esc(C.couple.hashtag)}</p>`, { cls: 'thankyou__sign', delay: 260 })}
    </div>
  </section>`;
}

/* ---------- boot ---------- */

async function loadGuest() {
  const slug = new URLSearchParams(window.location.search).get('to');
  if (!slug || !C.sheetEndpoint) return;
  try {
    const res = await fetch(`${C.sheetEndpoint}?slug=${encodeURIComponent(slug)}`);
    const data = await res.json();
    if (data?.ok && data.name) state.guest = { slug, name: data.name, type: data.type === 'intimate' ? 'intimate' : 'general' };
  } catch {}
}

async function boot() {
  document.title = C.meta.title;
  await loadGuest();
  document.querySelector('main').innerHTML =
    heroHtml() + galleryHtml() + detailsHtml() + agendaHtml() + dresscodeHtml() + rsvpHtml() + thankYouHtml();
  initHero();
  initGallery();
  initDetails();
  initAgenda();
  initRsvp();
  observeReveals();
}

boot();
