:root{
  --bg:#05081c;
  --bg2:#0a0f33;
  --pink:#ff2d95;
  --pink-soft:#ff6fbd;
  --cyan:#26e6ff;
  --cyan-soft:#8df3ff;
  --green:#39ffa5;
  --red:#ff335c;
  --violet:#7b5cff;
  --text:#eef4ff;
  --muted:#93a4cc;
  --panel:rgba(9,14,40,.9);
  --stroke:rgba(38,230,255,.24);
  --font:'Segoe UI','Trebuchet MS',system-ui,-apple-system,Arial,sans-serif;
  --display:'Arial Black','Segoe UI',system-ui,sans-serif;
}

*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{height:100%;margin:0;overflow:hidden;background:var(--bg)}
body{
  position:fixed;inset:0;color:var(--text);font-family:var(--font);
  overscroll-behavior:none;touch-action:manipulation;
  -webkit-user-select:none;user-select:none;
}
button{font-family:inherit;color:inherit;border:0;background:none;cursor:pointer;touch-action:manipulation}
button:focus-visible{outline:2px solid var(--cyan);outline-offset:3px}
.hidden{display:none!important}
#app{position:relative;width:100%;height:100vh;height:100dvh;overflow:hidden;isolation:isolate;background:#05081c}
#scene{position:absolute;inset:0;width:100%;height:100%;z-index:0;display:block}
.bg-vignette{
  position:absolute;inset:0;z-index:1;pointer-events:none;
  background:
    radial-gradient(120% 80% at 50% 0%,rgba(10,20,70,.1),rgba(3,5,18,.5) 75%),
    linear-gradient(180deg,rgba(3,6,22,.35),transparent 30%,transparent 70%,rgba(2,4,14,.7));
}
.scanlines{
  position:absolute;inset:0;z-index:2;pointer-events:none;opacity:.14;mix-blend-mode:overlay;
  background:repeating-linear-gradient(0deg,rgba(255,255,255,.09) 0 1px,transparent 1px 3px);
}
.flash{position:absolute;inset:0;z-index:18;pointer-events:none;opacity:0;background:transparent}
.flash.good{animation:flashGood .35s ease-out}
.flash.bad{animation:flashBad .4s ease-out}
@keyframes flashGood{0%{opacity:.5;background:radial-gradient(circle at 65% 50%,rgba(57,255,165,.45),transparent 65%)}100%{opacity:0}}
@keyframes flashBad{0%{opacity:.6;background:radial-gradient(circle at 50% 55%,rgba(255,51,92,.5),transparent 70%)}100%{opacity:0}}

/* ---------- HUD ---------- */
.hud{
  position:absolute;top:0;left:0;right:0;z-index:12;
  display:flex;align-items:flex-start;justify-content:space-between;gap:10px;
  padding:calc(10px + env(safe-area-inset-top)) clamp(10px,2.6vw,30px) 0;
  pointer-events:none;
}
.hud-left{display:flex;gap:8px;flex-wrap:wrap}
.hud-center{display:flex;flex-direction:column;align-items:center;gap:6px;padding-top:1px}
.hud-right{pointer-events:auto}
.stat{
  position:relative;min-width:76px;padding:5px 12px 6px;border-radius:12px;
  background:linear-gradient(180deg,rgba(13,22,58,.82),rgba(6,10,30,.78));
  border:1px solid rgba(38,230,255,.18);
  box-shadow:0 6px 22px rgba(0,0,0,.28),inset 0 1px rgba(255,255,255,.06);
  backdrop-filter:blur(8px);
}
.stat span{display:block;font-size:8px;font-weight:700;letter-spacing:.18em;color:var(--muted)}
.stat strong{display:block;font-family:var(--display);font-size:20px;line-height:1.1;letter-spacing:.02em;color:#fff;text-shadow:0 0 12px rgba(38,230,255,.35)}
.score-card strong{color:var(--cyan-soft);text-shadow:0 0 14px rgba(38,230,255,.6)}
.best-card strong{color:#ffd166;text-shadow:0 0 14px rgba(255,209,102,.45)}
.score-card.bump strong{animation:bump .28s ease-out}
@keyframes bump{0%{transform:scale(1)}45%{transform:scale(1.22)}100%{transform:scale(1)}}

.lives{display:flex;gap:5px;align-items:center;height:22px;filter:drop-shadow(0 0 8px rgba(255,51,92,.5))}
.heart{width:21px;height:21px;color:var(--red);transition:color .25s,opacity .25s,transform .25s}
.heart svg{display:block;width:100%;height:100%;fill:currentColor}
.heart.lost{color:#2a3258;opacity:.55;transform:scale(.86);filter:none}
.heart.pop{animation:heartPop .45s cubic-bezier(.2,1.6,.4,1)}
@keyframes heartPop{0%{transform:scale(1)}40%{transform:scale(1.4) rotate(-8deg)}100%{transform:scale(.86)}}

.combo{
  display:flex;align-items:center;gap:7px;padding:3px 10px;border-radius:999px;
  background:rgba(9,14,40,.72);border:1px solid rgba(123,92,255,.25);
  font-size:9px;letter-spacing:.14em;font-weight:800;color:var(--muted);
  transition:border-color .2s,box-shadow .2s;
}
.combo strong{font-family:var(--display);font-size:14px;color:var(--cyan);letter-spacing:0}
.combo.hot{border-color:rgba(255,45,149,.6);box-shadow:0 0 18px rgba(255,45,149,.28);animation:comboPulse 1s ease-in-out infinite}
.combo.hot strong{color:var(--pink);text-shadow:0 0 12px rgba(255,45,149,.8)}
@keyframes comboPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}

.icon-btn{
  width:46px;height:46px;border-radius:14px;display:grid;place-items:center;
  background:linear-gradient(180deg,rgba(17,26,66,.9),rgba(7,11,32,.9));
  border:1px solid rgba(38,230,255,.28);color:var(--cyan);
  box-shadow:0 6px 22px rgba(0,0,0,.3),inset 0 1px rgba(255,255,255,.08);
  transition:transform .15s,border-color .2s,box-shadow .2s;
}
.icon-btn:hover{border-color:rgba(38,230,255,.7);box-shadow:0 0 20px rgba(38,230,255,.24)}
.icon-btn:active{transform:scale(.94)}
.icon-btn svg{width:23px;height:23px}
.icon-btn .ic-off{display:none}
.icon-btn.muted{color:#ff7b9a;border-color:rgba(255,51,92,.3)}
.icon-btn.muted .ic-on{display:none}
.icon-btn.muted .ic-off{display:block}

/* ---------- Dialogue ---------- */
.stage{position:absolute;inset:0;z-index:6;pointer-events:none}
.dialogue{
  position:absolute;top:calc(82px + env(safe-area-inset-top));left:50%;
  width:min(580px,92vw);transform:translate(-50%,-10px);
  opacity:0;visibility:hidden;transition:opacity .28s ease,transform .28s ease,visibility .28s;
}
.dialogue.show{opacity:1;visibility:visible;transform:translate(-50%,0)}
.speech{
  position:relative;padding:14px 18px 16px;border-radius:18px;
  background:linear-gradient(160deg,rgba(16,24,64,.92),rgba(7,12,34,.93));
  border:1px solid rgba(38,230,255,.32);
  box-shadow:0 16px 46px rgba(0,0,0,.45),0 0 34px rgba(38,230,255,.09),inset 0 1px rgba(255,255,255,.08);
  backdrop-filter:blur(12px);
  transition:border-color .25s,box-shadow .25s;
}
.speech::after{
  content:'';position:absolute;right:58px;bottom:-11px;width:20px;height:20px;
  background:linear-gradient(135deg,transparent 48%,rgba(8,13,36,.95) 50%);
  border-right:1px solid rgba(38,230,255,.32);border-bottom:1px solid rgba(38,230,255,.32);
  transform:rotate(45deg);border-bottom-right-radius:3px;
}
.speech.pop{animation:speechIn .34s cubic-bezier(.2,1.4,.4,1)}
@keyframes speechIn{0%{transform:translateY(8px) scale(.97);opacity:.2}100%{transform:none;opacity:1}}
.speech.good{border-color:rgba(57,255,165,.65);box-shadow:0 16px 46px rgba(0,0,0,.45),0 0 34px rgba(57,255,165,.18)}
.speech.bad{border-color:rgba(255,51,92,.65);box-shadow:0 16px 46px rgba(0,0,0,.45),0 0 34px rgba(255,51,92,.2)}
.speech-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:7px}
.speaker{
  font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--cyan-soft);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-shadow:0 0 12px rgba(38,230,255,.35)
}
.case{flex:none;font-size:9px;font-weight:700;letter-spacing:.14em;color:var(--muted);padding:3px 8px;border:1px solid rgba(147,164,204,.18);border-radius:999px}
.speech-text{
  margin:0;font-size:clamp(16px,2.4vw,20px);line-height:1.38;font-weight:600;color:#f4f8ff;
  text-wrap:balance;text-shadow:0 2px 18px rgba(0,0,0,.4);
}
.speech-text::before{content:'«';color:var(--pink);margin-right:1px}
.speech-text::after{content:'»';color:var(--pink);margin-left:1px}
.result-badge{
  display:none;margin-top:9px;font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;
  color:var(--green);
}
.result-badge.show{display:block;animation:badgeIn .25s ease-out}
.result-badge.bad{color:#ff8ba3}
@keyframes badgeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}

.timer-wrap{width:min(520px,86%);margin:9px auto 0;opacity:0;transition:opacity .25s}
.dialogue.show .timer-wrap{opacity:1}
.timer-label{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;font-size:8px;font-weight:800;letter-spacing:.16em;color:var(--muted)}
.timer-label span:last-child{font-family:var(--display);font-size:12px;letter-spacing:0;color:var(--cyan-soft)}
.timer-bar{height:7px;border-radius:999px;background:rgba(4,8,24,.8);border:1px solid rgba(38,230,255,.16);overflow:hidden;box-shadow:inset 0 1px 3px rgba(0,0,0,.6)}
.timer-fill{
  height:100%;width:100%;border-radius:999px;
  background:linear-gradient(90deg,var(--green),var(--cyan));
  box-shadow:0 0 12px rgba(57,255,165,.55);
  transition:background .2s;
}
.timer-fill.low{background:linear-gradient(90deg,#ffb020,var(--red));box-shadow:0 0 14px rgba(255,51,92,.6)}
.timer-fill.freeze{transition:none}
.timer-fill.win{background:linear-gradient(90deg,var(--green),#b6ffdc);box-shadow:0 0 14px rgba(57,255,165,.8)}
.timer-fill.fail{background:linear-gradient(90deg,var(--red),#ff9a4d);box-shadow:0 0 14px rgba(255,51,92,.8)}

.float-points{
  position:absolute;left:50%;top:43%;transform:translate(-50%,0);z-index:8;
  font-family:var(--display);font-size:clamp(28px,6vw,46px);letter-spacing:.02em;
  opacity:0;pointer-events:none;white-space:nowrap;
}
.float-points.show{animation:floatUp 1s ease-out forwards}
.float-points.good{color:var(--green);text-shadow:0 0 10px rgba(57,255,165,.9),0 0 34px rgba(57,255,165,.6)}
.float-points.bad{color:var(--red);text-shadow:0 0 10px rgba(255,51,92,.9),0 0 34px rgba(255,51,92,.6);font-size:clamp(18px,4.4vw,30px)}
@keyframes floatUp{0%{opacity:0;transform:translate(-50%,18px) scale(.7)}20%{opacity:1;transform:translate(-50%,0) scale(1.08)}55%{opacity:1;transform:translate(-50%,-18px) scale(1)}100%{opacity:0;transform:translate(-50%,-62px) scale(.95)}}

/* ---------- Controls ---------- */
.controls{
  position:absolute;left:0;right:0;bottom:0;z-index:14;
  display:flex;justify-content:center;gap:clamp(10px,2vw,18px);
  padding:0 clamp(10px,4vw,32px) calc(14px + env(safe-area-inset-bottom));
}
.answer{
  position:relative;flex:1 1 0;max-width:340px;height:clamp(68px,10.5vh,90px);
  display:flex;align-items:center;justify-content:center;gap:12px;
  border-radius:20px;overflow:hidden;isolation:isolate;
  transition:transform .12s ease,box-shadow .2s,border-color .2s,opacity .25s;
}
.answer::before{
  content:'';position:absolute;inset:0;z-index:-1;
  background:linear-gradient(180deg,rgba(255,255,255,.1),transparent 45%);
}
.answer.truth{
  background:linear-gradient(180deg,rgba(57,255,165,.26),rgba(7,48,38,.94));
  border:1px solid rgba(57,255,165,.7);
  box-shadow:0 0 26px rgba(57,255,165,.24),0 14px 30px rgba(0,0,0,.4),inset 0 1px rgba(255,255,255,.22);
}
.answer.lie{
  background:linear-gradient(180deg,rgba(255,51,92,.28),rgba(58,8,28,.94));
  border:1px solid rgba(255,51,92,.72);
  box-shadow:0 0 26px rgba(255,51,92,.24),0 14px 30px rgba(0,0,0,.4),inset 0 1px rgba(255,255,255,.2);
}
.answer:hover{transform:translateY(-2px)}
.answer.truth:hover{box-shadow:0 0 38px rgba(57,255,165,.4),0 16px 34px rgba(0,0,0,.42)}
.answer.lie:hover{box-shadow:0 0 38px rgba(255,51,92,.4),0 16px 34px rgba(0,0,0,.42)}
.answer:active{transform:translateY(2px) scale(.985)}
.answer:disabled{opacity:.4;filter:saturate(.35);cursor:default;transform:none}
.answer-icon{
  font-size:26px;font-weight:900;line-height:1;
  width:36px;height:36px;border-radius:50%;display:grid;place-items:center;
  background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.22);
}
.answer.truth .answer-icon{color:var(--green);text-shadow:0 0 14px rgba(57,255,165,.9)}
.answer.lie .answer-icon{color:#ff8098;text-shadow:0 0 14px rgba(255,51,92,.9)}
.answer-label{font-family:var(--display);font-size:clamp(18px,2.7vw,24px);letter-spacing:.04em;line-height:1}
.answer.truth .answer-label{color:#c9ffe6;text-shadow:0 0 18px rgba(57,255,165,.55)}
.answer.lie .answer-label{color:#ffd0da;text-shadow:0 0 18px rgba(255,51,92,.6)}
.answer-sub{display:block;font-size:9px;font-weight:700;letter-spacing:.1em;color:rgba(255,255,255,.5);text-transform:uppercase}
.answer .key{
  position:absolute;top:7px;left:10px;font-size:10px;font-weight:800;color:rgba(255,255,255,.42);
  width:18px;height:18px;border:1px solid rgba(255,255,255,.16);border-radius:5px;display:grid;place-items:center;
}

/* ---------- Toast ---------- */
.toast{
  position:absolute;left:50%;top:calc(14px + env(safe-area-inset-top));z-index:46;
  transform:translate(-50%,-8px);padding:10px 18px;border-radius:999px;
  background:rgba(8,13,38,.95);border:1px solid rgba(38,230,255,.4);
  color:var(--cyan-soft);font-size:12px;font-weight:800;letter-spacing:.05em;
  opacity:0;visibility:hidden;transition:opacity .25s,transform .25s,visibility .25s;
  box-shadow:0 10px 34px rgba(0,0,0,.45),0 0 24px rgba(38,230,255,.14);
  max-width:86vw;text-align:center;
}
.toast.show{opacity:1;visibility:visible;transform:translate(-50%,0)}

@keyframes shakeApp{
  0%,100%{transform:translateX(0)}
  20%{transform:translateX(-7px)}40%{transform:translateX(6px)}
  60%{transform:translateX(-4px)}80%{transform:translateX(3px)}
}
#app.shake{animation:shakeApp .38s ease-out}

/* ---------- Overlays ---------- */
.overlay{
  position:absolute;inset:0;z-index:30;display:flex;align-items:center;justify-content:center;
  padding:max(12px,env(safe-area-inset-top)) 12px max(12px,env(safe-area-inset-bottom));
  background:radial-gradient(90% 70% at 50% 20%,rgba(20,26,80,.35),rgba(2,4,16,.82));
  backdrop-filter:blur(9px);
  animation:overlayIn .3s ease-out;
}
@keyframes overlayIn{from{opacity:0}to{opacity:1}}
.panel{
  position:relative;width:min(520px,100%);max-height:calc(100dvh - 24px);
  overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none;
  padding:clamp(18px,3.2vw,30px);border-radius:26px;
  background:
    radial-gradient(120% 80% at 50% 0%,rgba(123,92,255,.16),transparent 55%),
    linear-gradient(165deg,#0f163e,#05091b);
  border:1px solid rgba(38,230,255,.3);
  box-shadow:0 30px 90px rgba(0,0,0,.6),0 0 70px rgba(123,92,255,.14),inset 0 1px rgba(255,255,255,.08);
  animation:panelIn .38s cubic-bezier(.2,1.2,.4,1);
}
.panel::-webkit-scrollbar{width:0;height:0}
@keyframes panelIn{from{opacity:0;transform:translateY(16px) scale(.97)}to{opacity:1;transform:none}}

.brand{text-align:center;margin-bottom:12px}
.brand-kicker{font-size:9px;font-weight:800;letter-spacing:.34em;color:var(--cyan);margin-bottom:3px}
.logo{
  margin:0;font-family:var(--display);font-size:clamp(38px,9vw,58px);line-height:.88;
  letter-spacing:.02em;color:#f2f6ff;
  text-shadow:0 0 8px rgba(255,255,255,.25),0 0 30px rgba(38,230,255,.4),0 0 60px rgba(38,230,255,.2);
}
.logo span{
  color:var(--pink);
  text-shadow:0 0 10px rgba(255,45,149,.8),0 0 38px rgba(255,45,149,.5),0 0 70px rgba(255,45,149,.3);
}
.brand-sub{
  display:inline-block;margin-top:8px;padding:3px 12px;border-radius:999px;
  font-size:9px;font-weight:900;letter-spacing:.24em;color:var(--pink-soft);
  border:1px solid rgba(255,45,149,.32);background:rgba(255,45,149,.07);
}
.lead{margin:0 0 14px;font-size:13px;line-height:1.55;color:#c2cdeb;text-align:center}
.mini-rules{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;margin-bottom:16px}
.mini-rules div{display:flex;align-items:center;gap:6px;font-size:10px;font-weight:800;letter-spacing:.06em;color:var(--muted);text-transform:uppercase}
.dot{width:7px;height:7px;border-radius:50%;display:inline-block}
.dot.cyan{background:var(--cyan);box-shadow:0 0 8px var(--cyan)}
.dot.pink{background:var(--pink);box-shadow:0 0 8px var(--pink)}
.dot.red{background:var(--red);box-shadow:0 0 8px var(--red)}

.records{
  border:1px solid rgba(38,230,255,.16);border-radius:14px;overflow:hidden;
  background:rgba(4,8,24,.5);margin-bottom:16px;
}
.records-head{
  display:flex;justify-content:space-between;padding:7px 12px;
  font-size:8px;font-weight:900;letter-spacing:.18em;color:var(--muted);
  background:rgba(38,230,255,.05);border-bottom:1px solid rgba(38,230,255,.1);
}
.records ol{list-style:none;margin:0;padding:5px 8px}
.records li{
  display:flex;align-items:center;gap:9px;padding:5px 4px;font-size:12px;font-weight:700;
  border-bottom:1px dashed rgba(147,164,204,.09);
}
.records li:last-child{border-bottom:0}
.records li.empty{justify-content:center;color:var(--muted);font-weight:600;font-size:11px;padding:10px 4px}
.records .rank{width:19px;height:19px;border-radius:6px;display:grid;place-items:center;font-size:10px;font-weight:900;background:rgba(147,164,204,.1);color:var(--muted);flex:none}
.records li:nth-child(1) .rank{background:rgba(255,209,102,.16);color:#ffd166;box-shadow:0 0 10px rgba(255,209,102,.2)}
.records li:nth-child(2) .rank{background:rgba(200,220,255,.14);color:#d5e2ff}
.records li:nth-child(3) .rank{background:rgba(255,140,90,.14);color:#ffad82}
.records .r-score{margin-left:auto;font-family:var(--display);font-size:14px;color:var(--cyan-soft)}
.records .r-date{font-size:9px;font-weight:700;color:var(--muted);letter-spacing:.05em;min-width:34px;text-align:right}

.primary{
  position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;
  width:100%;min-height:58px;padding:10px 18px;border-radius:16px;
  background:linear-gradient(100deg,var(--pink),#b03cff 55%,var(--violet));
  border:1px solid rgba(255,255,255,.24);
  box-shadow:0 12px 34px rgba(255,45,149,.28),0 0 30px rgba(123,92,255,.22),inset 0 1px rgba(255,255,255,.3);
  color:#fff;transition:transform .14s,box-shadow .2s,filter .2s;
  overflow:hidden;
}
.primary::after{
  content:'';position:absolute;top:0;left:-60%;width:40%;height:100%;
  background:linear-gradient(100deg,transparent,rgba(255,255,255,.3),transparent);
  transform:skewX(-18deg);animation:shine 3.4s ease-in-out infinite;
}
@keyframes shine{0%,65%{left:-60%}100%{left:130%}}
.primary span{position:relative;z-index:1;font-family:var(--display);font-size:clamp(17px,2.6vw,20px);letter-spacing:.05em}
.primary small{position:relative;z-index:1;font-size:8px;font-weight:800;letter-spacing:.2em;color:rgba(255,255,255,.66);text-transform:uppercase}
.primary:hover{transform:translateY(-2px);box-shadow:0 16px 40px rgba(255,45,149,.4),0 0 42px rgba(123,92,255,.3)}
.primary:active{transform:translateY(1px) scale(.99)}
.primary:disabled{opacity:.45;filter:saturate(.4);cursor:default;transform:none}
.primary.ghost{
  background:linear-gradient(180deg,rgba(38,230,255,.12),rgba(8,20,48,.7));
  border-color:rgba(38,230,255,.4);
  box-shadow:0 10px 28px rgba(0,0,0,.3),inset 0 1px rgba(255,255,255,.1);
  margin-top:10px;min-height:50px;
}
.primary.ghost span{font-size:15px;color:var(--cyan-soft)}
.primary.small{min-height:46px;margin-top:14px}
.primary.small span{font-size:15px}
.fine{margin:12px 0 0;font-size:9px;line-height:1.5;text-align:center;color:#6f7fa8}

.over-panel{text-align:center}
.over-kicker{font-size:9px;font-weight:900;letter-spacing:.28em;color:var(--cyan);margin-bottom:5px}
.over-title{
  margin:0 0 14px;font-family:var(--display);font-size:clamp(22px,5.4vw,30px);line-height:1.05;
  color:#fff;text-shadow:0 0 22px rgba(255,51,92,.45);letter-spacing:.01em;
}
.over-score{
  position:relative;padding:12px;border-radius:16px;margin-bottom:12px;
  background:radial-gradient(90% 120% at 50% 0%,rgba(38,230,255,.1),rgba(4,8,24,.5));
  border:1px solid rgba(38,230,255,.18);
}
.over-score>span{display:block;font-size:8px;font-weight:900;letter-spacing:.24em;color:var(--muted)}
.over-score strong{
  display:block;font-family:var(--display);font-size:clamp(38px,10vw,52px);line-height:1.05;
  color:var(--cyan-soft);text-shadow:0 0 18px rgba(38,230,255,.6),0 0 50px rgba(38,230,255,.3);
}
.new-record{
  display:inline-block;margin-top:5px;padding:3px 12px;border-radius:999px;
  font-size:9px;font-weight:900;letter-spacing:.14em;color:#0b1020;
  background:linear-gradient(90deg,#ffd166,#ff9f1c);
  box-shadow:0 0 18px rgba(255,209,102,.5);animation:recordPulse .9s ease-in-out infinite;
}
@keyframes recordPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
.over-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px}
.over-stats div{padding:8px 4px;border-radius:12px;background:rgba(4,8,24,.45);border:1px solid rgba(147,164,204,.12)}
.over-stats b{display:block;font-family:var(--display);font-size:18px;color:#fff}
.over-stats span{font-size:8px;font-weight:800;letter-spacing:.1em;color:var(--muted);text-transform:uppercase}

.reward-row{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:4px}
.reward{
  position:relative;display:flex;flex-direction:column;align-items:center;gap:3px;padding:12px 8px 10px;
  border-radius:14px;border:1px solid rgba(255,209,102,.36);
  background:linear-gradient(180deg,rgba(255,209,102,.11),rgba(10,16,42,.85));
  transition:transform .14s,border-color .2s,box-shadow .2s,opacity .2s;
}
.reward:hover{transform:translateY(-2px);border-color:rgba(255,209,102,.7);box-shadow:0 0 24px rgba(255,209,102,.2)}
.reward:active{transform:scale(.98)}
.reward:disabled{opacity:.4;filter:saturate(.3);cursor:default;transform:none}
.ad-badge{
  position:absolute;top:6px;left:7px;padding:1px 5px;border-radius:4px;
  font-size:7px;font-weight:900;letter-spacing:.08em;color:#0b1020;
  background:linear-gradient(90deg,#ffd166,#ffb020);
}
.reward-title{font-family:var(--display);font-size:11px;letter-spacing:.03em;color:#ffe3a1;margin-top:2px}
.reward-sub{font-size:8px;font-weight:600;color:var(--muted);line-height:1.3}
.linkish{
  margin-top:9px;font-size:10px;font-weight:800;letter-spacing:.08em;color:var(--muted);
  text-decoration:underline;text-underline-offset:3px;padding:6px;
}
.linkish:hover{color:var(--cyan-soft)}

/* ---------- Mock ad ---------- */
.ad-overlay{
  position:absolute;inset:0;z-index:50;display:grid;place-items:center;padding:16px;
  background:rgba(1,2,10,.92);backdrop-filter:blur(8px);animation:overlayIn .2s ease-out;
}
.ad-box{
  width:min(520px,100%);padding:16px;border-radius:22px;
  background:linear-gradient(160deg,#10163e,#060a20);
  border:1px solid rgba(38,230,255,.3);
  box-shadow:0 30px 90px rgba(0,0,0,.7),0 0 60px rgba(38,230,255,.1);
}
.ad-top{display:flex;justify-content:space-between;align-items:center;font-size:8px;font-weight:900;letter-spacing:.24em;color:var(--muted);margin-bottom:12px}
.ad-demo{color:var(--pink);letter-spacing:.12em}
.ad-art{
  position:relative;height:min(34vh,230px);border-radius:14px;overflow:hidden;
  display:grid;place-items:center;text-align:center;
  background:
    radial-gradient(80% 100% at 50% 50%,rgba(123,92,255,.28),transparent 65%),
    linear-gradient(140deg,rgba(38,230,255,.08),rgba(255,45,149,.08));
  border:1px solid rgba(123,92,255,.24);
}
.ad-ring{
  position:absolute;width:150px;height:150px;border-radius:50%;
  border:2px dashed rgba(38,230,255,.4);
  animation:spin 9s linear infinite;
}
.ad-ring::after{content:'';position:absolute;inset:16px;border-radius:50%;border:1px solid rgba(255,45,149,.35)}
@keyframes spin{to{transform:rotate(360deg)}}
.ad-text{position:relative;z-index:1;font-size:10px;font-weight:800;letter-spacing:.18em;line-height:1.7;color:#aebbe0}
.ad-text b{font-family:var(--display);font-size:clamp(17px,4vw,23px);letter-spacing:.02em;color:var(--pink-soft);text-shadow:0 0 18px rgba(255,45,149,.5)}
.ad-progress{height:6px;border-radius:999px;background:rgba(4,8,24,.9);margin-top:14px;overflow:hidden;border:1px solid rgba(38,230,255,.14)}
.ad-progress div{height:100%;width:0;border-radius:999px;background:linear-gradient(90deg,var(--cyan),var(--pink));box-shadow:0 0 12px rgba(38,230,255,.5)}
.ad-count{margin-top:8px;text-align:center;font-size:10px;font-weight:800;letter-spacing:.08em;color:var(--muted)}

/* ---------- Responsive ---------- */
@media (max-width:640px){
  .hud{padding-top:calc(8px + env(safe-area-inset-top));gap:6px}
  .hud-left{gap:5px}
  .stat{min-width:64px;padding:4px 9px 5px;border-radius:10px}
  .stat span{font-size:7px;letter-spacing:.14em}
  .stat strong{font-size:17px}
  .icon-btn{width:42px;height:42px;border-radius:12px}
  .icon-btn svg{width:21px;height:21px}
  .lives{height:19px}
  .heart{width:18px;height:18px}
  .combo{padding:2px 8px;font-size:8px}
  .combo strong{font-size:12px}
  .dialogue{top:calc(70px + env(safe-area-inset-top));width:94vw}
  .speech{padding:12px 14px 14px;border-radius:16px}
  .speaker{font-size:9px}
  .case{font-size:8px}
  .speech-text{font-size:clamp(15px,4.1vw,18px)}
  .speech::after{right:42px}
  .timer-wrap{width:90%;margin-top:7px}
  .controls{padding-bottom:calc(10px + env(safe-area-inset-bottom));gap:9px}
  .answer{height:clamp(66px,11.5vh,82px);gap:8px;border-radius:17px}
  .answer-icon{width:30px;height:30px;font-size:21px}
  .answer-sub{display:none}
  .answer .key{top:5px;left:7px}
  .toast{top:calc(10px + env(safe-area-inset-top))}
  .panel{padding:18px 16px;border-radius:20px}
  .reward-title{font-size:10px}
  .reward-sub{display:none}
}
@media (max-width:390px){
  .stat{min-width:56px;padding:3px 7px 4px}
  .stat strong{font-size:15px}
  .stat span{font-size:6px}
  .icon-btn{width:38px;height:38px}
  .answer-label{font-size:17px}
  .answer-icon{width:27px;height:27px;font-size:18px}
  .answer{gap:6px}
}
@media (max-height:640px){
  .hud{padding-top:calc(5px + env(safe-area-inset-top))}
  .stat{padding:3px 9px 4px}
  .stat strong{font-size:16px}
  .stat span{font-size:7px}
  .icon-btn{width:38px;height:38px;border-radius:11px}
  .lives{height:17px}.heart{width:16px;height:16px}
  .combo{display:none}
  .dialogue{top:calc(56px + env(safe-area-inset-top));width:min(560px,86vw)}
  .speech{padding:9px 14px 10px}
  .speech-top{margin-bottom:3px}
  .speech-text{font-size:15px;line-height:1.3}
  .result-badge{margin-top:4px;font-size:9px}
  .timer-wrap{margin-top:5px}
  .timer-label{margin-bottom:2px}
  .controls{padding-bottom:calc(7px + env(safe-area-inset-bottom))}
  .answer{height:56px;border-radius:15px}
  .answer-icon{width:26px;height:26px;font-size:18px}
  .answer-sub{display:none}
  .answer .key{display:none}
  .panel{padding:14px 18px;border-radius:18px}
  .brand{margin-bottom:6px}
  .logo{font-size:34px}
  .lead{font-size:11px;line-height:1.4;margin-bottom:8px}
  .mini-rules{margin-bottom:9px}
  .records{margin-bottom:9px}
  .records li{padding:3px 4px;font-size:11px}
  .primary{min-height:46px}
  .over-title{margin-bottom:8px}
  .over-score{padding:7px}
  .over-score strong{font-size:34px}
  .over-stats{margin-bottom:8px}
  .reward{padding:8px 6px}
  .overlay{padding:8px}
  .ad-art{height:28vh}
}
@media (max-height:500px){
  .dialogue{top:calc(48px + env(safe-area-inset-top))}
  .speech-text{font-size:13px}
  .answer{height:48px}
  .logo{font-size:28px}
  .lead{display:none}
  .mini-rules{margin-bottom:6px}
  .records-head{padding:4px 10px}
  .records li{padding:2px 4px;font-size:10px}
  .fine{display:none}
  .overlay .panel{max-height:calc(100dvh - 10px)}
}
@media (min-width:1100px){
  .answer{max-width:380px;height:92px}
  .stat strong{font-size:22px}
}

