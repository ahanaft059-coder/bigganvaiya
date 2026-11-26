/* বিজ্ঞান ভাইয়া: পাতা তৈরির কোড। লেখা বদলাতে চাইলে শুধু data.js বদলালেই হবে। */
(function () {
  var S = window.SITE;
  var root = document.getElementById('root');
  var page = root.getAttribute('data-page');

  var MONTHS = ['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
  var DAYS = ['রবিবার','সোমবার','মঙ্গলবার','বুধবার','বৃহস্পতিবার','শুক্রবার','শনিবার'];
  var DIG = '০১২৩৪৫৬৭৮৯';
  function bn(n) { return String(n).replace(/\d/g, function (d) { return DIG[d]; }); }
  function date(iso) { var p = iso.split('-'); return bn(parseInt(p[2], 10)) + ' ' + MONTHS[parseInt(p[1], 10) - 1] + ' ' + bn(p[0]); }
  function dayName(iso) { return DAYS[new Date(iso + 'T00:00:00').getDay()]; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }
  function byDateDesc(a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; }
  function paras(arr) { return (arr || []).map(function (t) { return '<p>' + esc(t) + '</p>'; }).join(''); }
  function link(url, label, cls) { return url ? '<a class="btn ' + (cls || '') + '" href="' + esc(url) + '" target="_blank" rel="noopener">' + label + '</a>' : ''; }

  /* আজকের তারিখ: ভবিষ্যতের লেখা লুকানো থাকে, #preview দিলে সব দেখা যায় */
  var now = new Date();
  var todayISO = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2);
  var preview = location.hash === '#preview';
  function visible(p) { return preview || p.date <= todayISO; }
  function daysUntil(iso) { return Math.round((new Date(iso + 'T00:00:00') - new Date(todayISO + 'T00:00:00')) / 86400000); }

  var daily = S.daily.filter(visible).sort(byDateDesc);
  var qa = S.qa.filter(visible).sort(byDateDesc);
  var articles = S.articles.filter(visible).sort(byDateDesc);
  var notices = S.notices.filter(visible);

  var NAV = [
    ['index', 'index.html', 'হোম', 'c-amber'],
    ['rojkar', 'rojkar.html', 'রোজকার বিজ্ঞান', 'c-sky'],
    ['question', 'question.html', 'প্রশ্ন', 'c-violet'],
    ['article', 'article.html', 'আর্টিকেল', 'c-teal'],
    ['notice', 'notice-board.html', 'নোটিশ বোর্ড', 'c-coral']
  ];

  var ORBIT = '<svg class="orbit" viewBox="0 0 200 200" fill="none" stroke-width="1.2" aria-hidden="true"><ellipse cx="100" cy="100" rx="92" ry="32" stroke="#FFB020" stroke-opacity=".7"/><ellipse cx="100" cy="100" rx="92" ry="32" transform="rotate(60 100 100)" stroke="#4FE3D2" stroke-opacity=".7"/><ellipse cx="100" cy="100" rx="92" ry="32" transform="rotate(120 100 100)" stroke="#FF6FA8" stroke-opacity=".7"/><circle cx="100" cy="100" r="10" fill="#FFB020" stroke="none"/><circle cx="188" cy="86" r="4" fill="#4FE3D2" stroke="none"/><circle cx="54" cy="20" r="4" fill="#FF6FA8" stroke="none"/></svg>';
  var ORBS = '<i class="orb o1"></i><i class="orb o2"></i><i class="orb o3"></i><i class="orb o4"></i>';
  var TAGC = { 'পদার্থবিজ্ঞান': 'sky', 'রসায়ন': 'violet', 'জীববিজ্ঞান': 'teal', 'জানো কি?': 'amber', 'কেন?': 'coral', 'ঘরে করি': 'teal', 'পরীক্ষা': 'teal', 'বিজ্ঞানী': 'violet', 'খেলা': 'violet', 'চ্যালেঞ্জ': 'pink', 'শুভেচ্ছা': 'pink', 'পরিচিতি': 'amber', 'PDF': 'coral' };
  var PALETTE = ['sky', 'violet', 'teal', 'amber', 'coral', 'pink'];
  function tagColor(tag) {
    if (TAGC[tag]) return 'c-' + TAGC[tag];
    var h = 0; String(tag || '').split('').forEach(function (ch) { h = (h * 31 + ch.charCodeAt(0)) % 997; });
    return 'c-' + PALETTE[h % PALETTE.length];
  }
  var TYPEC = { 'নোটিশ': 'c-amber', 'রোজকার বিজ্ঞান': 'c-sky', 'প্রশ্ন': 'c-violet', 'আর্টিকেল': 'c-teal' };
  function head(kicker, title, sub, cls) { return '<div class="page-head ' + cls + '"><span class="kicker">' + kicker + '</span><h1 class="page-title">' + title + '</h1><p class="page-sub">' + sub + '</p></div>'; }
  var IC = {
    sun: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></svg>',
    q: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5"/><path d="M9.2 9.3a2.9 2.9 0 1 1 4.2 2.6c-.9.5-1.4 1-1.4 2"/><circle cx="12" cy="17.2" r=".6" fill="currentColor"/></svg>',
    pen: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l4.2-1 11-11a2.1 2.1 0 0 0-3-3l-11 11L4 20z"/><path d="M14.5 6.5l3 3"/></svg>',
    bell: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16z"/><path d="M10 20.5a2 2 0 0 0 4 0"/></svg>'
  };

  function header() {
    var nav = NAV.map(function (n) {
      return '<a class="' + n[3] + '" href="' + n[1] + '"' + (n[0] === page ? ' aria-current="page"' : '') + '><i></i>' + n[2] + '</a>';
    }).join('');
    var lines = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>';
    return '<header class="site-header bleed"><div class="wrap">' +
      '<a class="brand" href="index.html"><span class="mark" aria-hidden="true">?</span><span class="name">' + esc(S.name) + '</span></a>' +
      '<div class="hdr-actions"><button class="theme-btn" id="themeBtn" type="button" aria-label="থিম বদলাও">◐</button>' +
      '<button class="menu-btn" id="menuBtn" type="button" aria-label="মেনু" aria-expanded="false" aria-controls="menu">' + lines + '</button></div></div>' +
      '<nav class="menu" id="menu" aria-label="মূল মেনু" hidden><div class="wrap menu-in">' + nav + '</div></nav></header>';
  }

  function footer() {
    var l = S.links;
    return '<footer class="site-footer bleed"><div class="wrap">' +
      '<div><b>' + esc(S.name) + '</b> · প্রতিদিন নতুন বিজ্ঞান</div>' +
      '<div class="links">' +
      (l.questionForm ? '<a href="' + esc(l.questionForm) + '" target="_blank" rel="noopener">প্রশ্ন পাঠাও</a>' : '') +
      (l.articleForm ? '<a href="' + esc(l.articleForm) + '" target="_blank" rel="noopener">আর্টিকেল পাঠাও</a>' : '') +
      (l.instagram ? '<a href="' + esc(l.instagram) + '" target="_blank" rel="noopener">ইনস্টাগ্রাম</a>' : '') +
      (l.facebook ? '<a href="' + esc(l.facebook) + '" target="_blank" rel="noopener">ফেসবুক</a>' : '') +
      (l.clubSite ? '<a href="' + esc(l.clubSite) + '" target="_blank" rel="noopener">ক্লাব ওয়েবসাইট</a>' : '') +
      '<span>ইমেইল: <b>' + esc(S.email) + '</b></span></div>' +
      '</div></footer>';
  }

  function emptyBox(title, text) { return '<div class="empty"><h3>' + title + '</h3><p>' + text + '</p></div>'; }
  function soon() { return emptyBox('প্রথম লেখা আসছে ' + date(S.launch), 'তারিখ এলে নিজে থেকেই এখানে দেখা যাবে।'); }

  /* ---------- রোজকার বিজ্ঞান ---------- */
  function dailyCard(p, big) {
    var c = tagColor(p.tag);
    var tryIt = p.tryIt ? '<div class="try"><b>নিজে করে দেখো:</b> ' + esc(p.tryIt) + '</div>' : '';
    var dd = p.date.split('-');
    if (big) {
      return '<article class="today ' + c + '"><div class="today-in"><div class="meta"><span class="chip solid">' + esc(p.tag) + '</span><span class="mono">' + date(p.date) + ', ' + dayName(p.date) + '</span></div>' +
        '<h2>' + esc(p.title) + '</h2>' + paras(p.body) + tryIt + '</div></article>';
    }
    return '<article class="post ' + c + '"><div class="datetile"><b class="mono">' + bn(parseInt(dd[2], 10)) + '</b><span>' + MONTHS[parseInt(dd[1], 10) - 1] + '</span></div>' +
      '<div class="body"><div class="meta"><span class="chip">' + esc(p.tag) + '</span><span>' + dayName(p.date) + '</span></div><h3>' + esc(p.title) + '</h3>' + paras(p.body) + tryIt + '</div></article>';
  }

  /* ---------- আর্টিকেল ---------- */
  function articleCard(a) {
    var byVaiya = a.kind !== 'student';
    var who = byVaiya ? '<span class="chip solid c-amber">বিজ্ঞান ভাইয়া</span>' :
      '<span class="chip solid c-pink">' + esc(a.author) + (a.cls ? ' · ' + esc(a.cls) + ' শ্রেণি' : '') + '</span>';
    var extra = '';
    if (a.materials && a.materials.length) extra += '<b>যা লাগবে</b><ul class="plain">' + a.materials.map(function (m) { return '<li>' + esc(m) + '</li>'; }).join('') + '</ul>';
    if (a.steps && a.steps.length) extra += '<b>যেভাবে করবে</b><ol class="steps">' + a.steps.map(function (m) { return '<li>' + esc(m) + '</li>'; }).join('') + '</ol>';
    if (a.why) extra += '<div class="try"><b>কেন এমন হয়?</b> ' + esc(a.why) + '</div>';
    if (a.safety) extra += '<p class="safety" style="margin-top:12px">সাবধানতা: ' + esc(a.safety) + '</p>';
    if (a.pdf) extra += '<div class="actions" style="margin-top:6px"><a class="btn" href="' + esc(a.pdf) + '" target="_blank" rel="noopener">PDF খোলো</a></div>';
    return '<article class="card article ' + tagColor(a.tag) + '" style="border-top:5px solid var(--c)" data-kind="' + (byVaiya ? 'vaiya' : 'student') + '">' +
      '<div class="meta">' + who + '<span class="chip">' + esc(a.tag) + '</span><span class="mono">' + date(a.date) + '</span></div>' +
      '<h3>' + esc(a.title) + '</h3>' + paras(a.body) + extra + '</article>';
  }

  /* ---------- নোটিশ ---------- */
  function allNotices() {
    var items = [];
    notices.forEach(function (n) { items.push({ date: n.date, pin: !!n.pin, type: 'নোটিশ', title: n.title, text: n.text, href: '' }); });
    daily.forEach(function (p) { items.push({ date: p.date, type: 'রোজকার বিজ্ঞান', title: 'আজকের বিজ্ঞান: ' + p.title, text: '', href: 'rojkar.html' }); });
    qa.forEach(function (x) { items.push({ date: x.date, type: 'প্রশ্ন', title: 'নতুন উত্তর: ' + x.q, text: '', href: 'question.html' }); });
    articles.forEach(function (a) {
      items.push({ date: a.date, type: 'আর্টিকেল', title: 'নতুন লেখা: ' + a.title, text: (a.kind === 'student' ? 'লেখক: ' + a.author : 'লেখক: বিজ্ঞান ভাইয়া'), href: 'article.html' });
    });
    return items;
  }
  function noticeRow(n) {
    var t = '<div class="notice ' + (TYPEC[n.type] || 'c-amber') + (n.pin ? ' pinned' : '') + '" style="border-left:6px solid var(--c)"><div class="meta"><span class="chip">' + n.type + '</span>' + (n.pin ? '<span class="chip solid c-amber">📌 আটকানো</span>' : '') + '<span class="mono">' + date(n.date) + '</span></div>' +
      '<h3>' + esc(n.title) + '</h3>' + (n.text ? '<p>' + esc(n.text) + '</p>' : '') + '</div>';
    return n.href ? '<a class="notice-link" href="' + n.href + '">' + t + '</a>' : t;
  }

  /* ---------- হোম ---------- */
  function pageIndex() {
    var latest = daily[0];
    var d = daysUntil(S.launch);
    var banner = d > 0 && !preview ?
      '<div class="banner"><b>শুরু হচ্ছে ' + date(S.launch) + ' (' + dayName(S.launch) + ')</b><span>আর ' + bn(d) + ' দিন বাকি। প্রতিদিন একটি করে নতুন বিজ্ঞান আসবে।</span></div>' : '';
    var tiles = [
      ['rojkar.html', daily.length, 'রোজকার বিজ্ঞান', 'প্রতিদিনের নতুন তথ্য'],
      ['question.html', qa.length, 'প্রশ্ন', 'তোমাদের প্রশ্নের উত্তর'],
      ['article.html', articles.length, 'আর্টিকেল', 'ভাইয়ার ও তোমাদের লেখা'],
      ['notice-board.html', allNotices().length, 'নোটিশ বোর্ড', 'প্রতিদিনের সব খবর']
    ].map(function (t, k) {
      return '<a class="card tile ' + ['c-sky', 'c-violet', 'c-teal', 'c-coral'][k] + '" href="' + t[0] + '">' + IC[['sun', 'q', 'pen', 'bell'][k]] + '<span class="num mono">' + bn(t[1]) + '</span><span class="lbl">' + t[2] + '</span><span class="hint">' + t[3] + '</span></a>';
    }).join('');
    var recentNotices = allNotices().sort(function (a, b) { return (b.pin ? 1 : 0) - (a.pin ? 1 : 0) || byDateDesc(a, b); }).slice(0, 4).map(noticeRow).join('');
    var recentArticles = articles.slice(0, 3).map(articleCard).join('');
    return '<section class="hero bleed">' + ORBIT + ORBS + '<div class="wrap">' +
      '<div class="eyebrow">✦ প্রতিদিন নতুন বিজ্ঞান</div>' +
      '<h1>' + esc(S.name) + '</h1><p class="lead">' + esc(S.tagline) + '</p>' +
      '<div class="actions">' + link(S.links.questionForm, 'প্রশ্ন পাঠাও') + '<a class="btn ghost" href="rojkar.html">রোজকার বিজ্ঞান দেখো</a></div></div></section>' +
      '<main class="wrap">' + banner +
      '<section class="section" style="margin-top:0"><h2>আজকের বিজ্ঞান</h2>' + (latest ? dailyCard(latest, true) : soon()) + '</section>' +
      '<section class="section"><h2>সব বিভাগ</h2><div class="grid tiles">' + tiles + '</div></section>' +
      '<section class="section"><div class="head-row"><h2>নোটিশ বোর্ড</h2><a href="notice-board.html">সব দেখো</a></div><div class="list">' + (recentNotices || soon()) + '</div></section>' +
      (recentArticles ? '<section class="section"><div class="head-row"><h2>নতুন আর্টিকেল</h2><a href="article.html">সব দেখো</a></div><div class="list">' + recentArticles + '</div></section>' : '') +
      '</main>';
  }

  /* ---------- রোজকার বিজ্ঞান ---------- */
  function pageRojkar() {
    var tags = [];
    daily.forEach(function (p) { if (tags.indexOf(p.tag) < 0) tags.push(p.tag); });
    return '<main class="wrap">' + head('DAILY SCIENCE', 'রোজকার বিজ্ঞান', 'প্রতিদিন একটি করে নতুন বিজ্ঞানের তথ্য। সবচেয়ে নতুনটি সবার ওপরে।', 'c-sky') +
      '<div class="toolbar"><input class="search" id="q" type="search" placeholder="খুঁজে দেখো" aria-label="খুঁজো">' +
      '<div class="filters" id="filters"><button type="button" data-tag="" aria-pressed="true">সব</button>' +
      tags.map(function (t) { return '<button type="button" data-tag="' + esc(t) + '" aria-pressed="false">' + esc(t) + '</button>'; }).join('') +
      '</div></div><div class="list" id="out"></div></main>';
  }
  function wireRojkar() {
    var tag = '', q = '';
    var out = document.getElementById('out');
    function draw() {
      var list = daily.filter(function (p) { return (!tag || p.tag === tag) && (!q || (p.title + ' ' + p.body.join(' ')).indexOf(q) >= 0); });
      out.innerHTML = list.length ? list.map(function (p) { return dailyCard(p, false); }).join('') : (daily.length ? emptyBox('কিছু পাওয়া যায়নি', 'অন্য শব্দ দিয়ে খুঁজে দেখো।') : soon());
    }
    document.getElementById('q').addEventListener('input', function (e) { q = e.target.value.trim(); draw(); });
    document.getElementById('filters').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      tag = b.getAttribute('data-tag');
      Array.prototype.forEach.call(document.querySelectorAll('#filters button'), function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      draw();
    });
    draw();
  }

  /* ---------- প্রশ্ন ---------- */
  function pageQuestion() {
    return '<main class="wrap">' + head('Q &amp; A', 'প্রশ্ন ও উত্তর', 'বিজ্ঞান নিয়ে তোমার যেকোনো প্রশ্ন নিচের বোতামে ক্লিক করে পাঠাও। বাছাই করা প্রশ্নের উত্তর এখানে জমা হবে।', 'c-violet') +
      '<div class="actions" style="margin:0 0 18px">' + (link(S.links.questionForm, 'প্রশ্ন পাঠাও') || '<span class="chip">ফর্ম শীঘ্রই আসছে</span>') + '</div>' +
      '<div class="toolbar"><input class="search" id="q" type="search" placeholder="প্রশ্ন খুঁজো" aria-label="প্রশ্ন খুঁজো"></div>' +
      '<div id="out"></div></main>';
  }
  function wireQuestion() {
    var out = document.getElementById('out');
    function draw(q) {
      var list = qa.filter(function (x) { return !q || (x.q + ' ' + x.a).indexOf(q) >= 0; });
      out.innerHTML = list.length ? list.map(function (x) {
        return '<details class="qa"><summary>' + esc(x.q) + '</summary><div class="ans">' + esc(x.a) +
          '<div class="meta" style="margin-top:8px">' + date(x.date) + (x.askedBy ? ' · জিজ্ঞাসা করেছে: ' + esc(x.askedBy) : '') + ' · উত্তর দিয়েছে: বিজ্ঞান ভাইয়া</div></div></details>';
      }).join('') : (qa.length ? emptyBox('কিছু পাওয়া যায়নি', 'অন্য শব্দ দিয়ে খুঁজে দেখো, বা নিজের প্রশ্ন পাঠাও।') : soon());
    }
    document.getElementById('q').addEventListener('input', function (e) { draw(e.target.value.trim()); });
    draw('');
  }

  /* ---------- আর্টিকেল ---------- */
  function pageArticle() {
    return '<main class="wrap">' + head('ARTICLES', 'আর্টিকেল', 'বিজ্ঞান ভাইয়ার লেখা আসে "বিজ্ঞান ভাইয়া" নামে। তোমাদের পাঠানো নির্বাচিত লেখা ছাপা হয় তোমাদের নিজের নামে।', 'c-teal') +
      '<div class="actions" style="margin:0 0 18px">' + (link(S.links.articleForm, 'নিজের লেখা পাঠাও') || '<span class="chip">লেখা পাঠানোর ফর্ম শীঘ্রই আসছে</span>') + '</div>' +
      '<div class="toolbar"><div class="filters" id="filters">' +
      '<button type="button" data-kind="" aria-pressed="true">সব</button>' +
      '<button type="button" data-kind="vaiya" aria-pressed="false">বিজ্ঞান ভাইয়ার লেখা</button>' +
      '<button type="button" data-kind="student" aria-pressed="false">তোমাদের লেখা</button></div></div>' +
      '<div class="grid" id="out" style="grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr))"></div></main>';
  }
  function wireArticle() {
    var kind = '';
    var out = document.getElementById('out');
    function draw() {
      var list = articles.filter(function (a) { return !kind || (a.kind === 'student' ? 'student' : 'vaiya') === kind; });
      var html = list.map(articleCard).join('');
      if (!html) html = kind === 'student' || !articles.length ? emptyBox('এখানে এখনো কোনো লেখা নেই', 'প্রথম লেখাটি তোমার হতে পারে। ফর্মে নিজের লেখা পাঠাও।') : soon();
      else if (kind === 'student' || kind === '') { /* তোমাদের লেখা না থাকলে নিচে একটি আমন্ত্রণ */
        var hasStudent = list.some(function (a) { return a.kind === 'student'; });
        if (!hasStudent) html += '<div style="grid-column:1/-1">' + emptyBox('তোমাদের লেখা এখানে ছাপা হবে', 'নির্বাচিত লেখা তোমার নিজের নামে এখানে আসবে। প্রথম লেখাটি তোমার হতে পারে।') + '</div>';
      }
      out.innerHTML = html;
    }
    document.getElementById('filters').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      kind = b.getAttribute('data-kind');
      Array.prototype.forEach.call(document.querySelectorAll('#filters button'), function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      draw();
    });
    draw();
  }

  /* ---------- নোটিশ বোর্ড ---------- */
  function pageNotice() {
    var types = ['নোটিশ', 'রোজকার বিজ্ঞান', 'প্রশ্ন', 'আর্টিকেল'];
    return '<main class="wrap">' + head('NOTICE BOARD', 'নোটিশ বোর্ড', 'প্রতিদিনের সব খবর এখানে। নতুন বিজ্ঞান, নতুন উত্তর, নতুন লেখা ও দরকারি ঘোষণা, সবই।', 'c-coral') +
      '<div class="toolbar"><div class="filters" id="filters"><button type="button" data-type="" aria-pressed="true">সব</button>' +
      types.map(function (t) { return '<button type="button" data-type="' + t + '" aria-pressed="false">' + t + '</button>'; }).join('') +
      '</div></div><div id="out"></div></main>';
  }
  function wireNotice() {
    var type = '';
    var out = document.getElementById('out');
    function draw() {
      var items = allNotices().filter(function (n) { return !type || n.type === type; });
      if (!items.length) { out.innerHTML = soon(); return; }
      var pinned = items.filter(function (n) { return n.pin; });
      var rest = items.filter(function (n) { return !n.pin; }).sort(function (a, b) { return byDateDesc(a, b); });
      var html = pinned.map(noticeRow).join('');
      var last = '';
      rest.forEach(function (n) {
        if (n.date !== last) { html += '<h3 class="month">' + date(n.date) + ' · ' + dayName(n.date) + '</h3>'; last = n.date; }
        html += noticeRow(n);
      });
      out.innerHTML = html;
    }
    document.getElementById('filters').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      type = b.getAttribute('data-type');
      Array.prototype.forEach.call(document.querySelectorAll('#filters button'), function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      draw();
    });
    draw();
  }

  var PAGES = { index: pageIndex, rojkar: pageRojkar, question: pageQuestion, article: pageArticle, notice: pageNotice };
  var WIRE = { rojkar: wireRojkar, question: wireQuestion, article: wireArticle, notice: wireNotice };

  root.innerHTML = header() + (PAGES[page] || pageIndex)() + footer();
  if (WIRE[page]) WIRE[page]();

  /* তিন দাগের মেনু */
  var menuBtn = document.getElementById('menuBtn'), menu = document.getElementById('menu');
  function setMenu(open) { menu.hidden = !open; menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  menuBtn.addEventListener('click', function (e) { e.stopPropagation(); setMenu(menu.hidden); });
  document.addEventListener('click', function (e) { if (!menu.hidden && !menu.contains(e.target)) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuBtn.focus(); } });

  /* থিম বদল (শুধু এই ব্রাউজারে মনে থাকে) */
  var de = document.documentElement;
  try { var saved = localStorage.getItem('bv-theme'); if (saved) de.setAttribute('data-theme', saved); } catch (e) {}
  document.getElementById('themeBtn').addEventListener('click', function () {
    var cur = de.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = cur === 'dark' ? 'light' : 'dark';
    de.setAttribute('data-theme', next);
    try { localStorage.setItem('bv-theme', next); } catch (e) {}
  });
})();
