// Calendario del HEMISFERIO NORTE
const DAYS = [
  ['Lunes', 'Astelehena'], ['Martes', 'Asteartea'], ['Miércoles', 'Asteazkena'],
  ['Jueves', 'Osteguna'], ['Viernes', 'Ostirala'], ['Sábado', 'Larunbata'], ['Domingo', 'Igandea'],
];
const MONTHS = [
  ['Enero', 'Urtarrila'], ['Febrero', 'Otsaila'], ['Marzo', 'Martxoa'], ['Abril', 'Apirila'],
  ['Mayo', 'Maiatza'], ['Junio', 'Ekaina'], ['Julio', 'Uztaila'], ['Agosto', 'Abuztua'],
  ['Septiembre', 'Iraila'], ['Octubre', 'Urria'], ['Noviembre', 'Azaroa'], ['Diciembre', 'Abendua'],
];
// Primavera: mar-may, Verano: jun-ago, Otoño: sep-nov, Invierno: dic-feb
const SEASONS = [
  ['Primavera', 'Udaberria', [2, 3, 4]],
  ['Verano', 'Uda', [5, 6, 7]],
  ['Otoño', 'Udazkena', [8, 9, 10]],
  ['Invierno', 'Negua', [11, 0, 1]],
];

const SEASON_OF_MONTH = {};
SEASONS.forEach((s, i) => s[2].forEach(m => (SEASON_OF_MONTH[m] = i)));

const ES = 0, EU = 1;
const LANG = ['Español', 'Euskera'];
const mod = (n, m) => ((n % m) + m) % m;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const shuffle = arr => arr.map(v => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
const makeHint = (answer, clue) => {
  const letters = [...answer];
  return `${clue} Empieza por «${letters[0].toLocaleUpperCase('es')}» y tiene ${letters.length} letras.`;
};

// Cada generador devuelve { q, answer, pool, hint }
const generators = [
  () => { const l = pick([ES, EU]), m = pick(MONTHS); const o = 1 - l;
    return { q: `¿Cómo se dice ${m[l]} en ${LANG[o]}?`, answer: m[o], pool: MONTHS.map(x => x[o]),
      hint: answer => makeHint(answer, `Es un mes del año en ${LANG[o]}.`) }; },
  () => { const l = pick([ES, EU]), d = pick(DAYS); const o = 1 - l;
    return { q: `¿Cómo se dice ${d[l]} en ${LANG[o]}?`, answer: d[o], pool: DAYS.map(x => x[o]),
      hint: answer => makeHint(answer, `Es un día de la semana en ${LANG[o]}.`) }; },
  () => { const l = pick([ES, EU]), s = pick(SEASONS); const o = 1 - l;
    return { q: `¿Cómo se dice ${s[l]} en ${LANG[o]}?`, answer: s[o], pool: SEASONS.map(x => x[o]),
      hint: answer => makeHint(answer, `Es una estación del año en ${LANG[o]}.`) }; },
  () => { const l = pick([ES, EU]);
    return { q: `¿Cuál es el primer mes del año? (en ${LANG[l]})`, answer: MONTHS[0][l], pool: MONTHS.map(x => x[l]),
      hint: answer => makeHint(answer, 'Es el mes que abre el calendario anual.') }; },
  () => { const l = pick([ES, EU]);
    return { q: `¿Cuál es el último mes del año? (en ${LANG[l]})`, answer: MONTHS[11][l], pool: MONTHS.map(x => x[l]),
      hint: answer => makeHint(answer, 'Es el mes que cierra el calendario anual.') }; },
  () => { const l = pick([ES, EU]), i = Math.floor(Math.random() * 12);
    return { q: `¿Qué mes viene después de ${MONTHS[i][l]}? (en ${LANG[l]})`, answer: MONTHS[mod(i + 1, 12)][l], pool: MONTHS.map(x => x[l]),
      hint: answer => makeHint(answer, `Avanza un mes desde ${MONTHS[i][l]} en el calendario.`) }; },
  () => { const l = pick([ES, EU]), i = Math.floor(Math.random() * 12);
    return { q: `¿Qué mes viene antes de ${MONTHS[i][l]}? (en ${LANG[l]})`, answer: MONTHS[mod(i - 1, 12)][l], pool: MONTHS.map(x => x[l]),
      hint: answer => makeHint(answer, `Retrocede un mes desde ${MONTHS[i][l]} en el calendario.`) }; },
  () => { const l = pick([ES, EU]), i = Math.floor(Math.random() * 7);
    return { q: `¿Qué día viene después de ${DAYS[i][l]}? (en ${LANG[l]})`, answer: DAYS[mod(i + 1, 7)][l], pool: DAYS.map(x => x[l]),
      hint: answer => makeHint(answer, `Sigue el orden de la semana a partir de ${DAYS[i][l]}.`) }; },
  () => { const l = pick([ES, EU]), i = Math.floor(Math.random() * 7);
    return { q: `¿Qué día viene antes de ${DAYS[i][l]}? (en ${LANG[l]})`, answer: DAYS[mod(i - 1, 7)][l], pool: DAYS.map(x => x[l]),
      hint: answer => makeHint(answer, `Retrocede en el orden de la semana desde ${DAYS[i][l]}.`) }; },
  () => { const l = pick([ES, EU]), n = Math.floor(Math.random() * 7);
    return { q: `¿Qué día de la semana es el número ${n + 1}? (en ${LANG[l]})`, answer: DAYS[n][l], pool: DAYS.map(x => x[l]),
      hint: answer => makeHint(answer, `Cuenta ${n + 1} días empezando por lunes.`) }; },
  () => { const l = pick([ES, EU]), m = Math.floor(Math.random() * 12);
    return { q: `¿En qué estación está ${MONTHS[m][l]}? (en ${LANG[l]})`, answer: SEASONS[SEASON_OF_MONTH[m]][l], pool: SEASONS.map(x => x[l]),
      hint: answer => makeHint(answer, `Recuerda qué estación incluye a ${MONTHS[m][l]} en el hemisferio norte.`) }; },
  () => { const l = pick([ES, EU]), s = pick(SEASONS);
    return { q: `Nombra un mes de ${s[l]} (en ${LANG[l]})`, answer: s[2].map(m => MONTHS[m][l]), pool: MONTHS.map(x => x[l]),
      hint: answer => makeHint(answer, `Es uno de los tres meses consecutivos de ${s[l]}.`) }; },
  () => { const l = pick([ES, EU]), s = pick(SEASONS);
    return { q: `¿Cuál es el primer mes de ${s[l]}? (en ${LANG[l]})`, answer: MONTHS[s[2][0]][l], pool: MONTHS.map(x => x[l]),
      hint: answer => makeHint(answer, `Busca el mes que inicia ${s[l]} en el hemisferio norte.`) }; },
  () => { const l = pick([ES, EU]), s = pick(SEASONS);
    return { q: `¿Cuál es el último mes de ${s[l]}? (en ${LANG[l]})`, answer: MONTHS[s[2][2]][l], pool: MONTHS.map(x => x[l]),
      hint: answer => makeHint(answer, `Busca el mes que termina ${s[l]} en el hemisferio norte.`) }; },
  () => { const l = pick([ES, EU]), i = Math.floor(Math.random() * 4);
    return { q: `¿Qué estación viene después de ${SEASONS[i][l]}? (en ${LANG[l]})`, answer: SEASONS[mod(i + 1, 4)][l], pool: SEASONS.map(x => x[l]),
      hint: answer => makeHint(answer, `Sigue el ciclo anual después de ${SEASONS[i][l]}.`) }; },
];

function buildQuestion() {
  const g = pick(generators)();
  const answers = Array.isArray(g.answer) ? g.answer : [g.answer];
  const correct = pick(answers);
  const wrong = shuffle([...new Set(g.pool)].filter(x => !answers.includes(x))).slice(0, 3);
  return { q: g.q, correct, answers, hint: g.hint(correct), options: shuffle([correct, ...wrong]) };
}

// Imágenes
const IMG = 'public/img/';
const BALLOON = `${IMG}baloon6.webp`;
const BALLOON_STAGES = 6;
const KID_FRAMES = [1, 2, 3, 4, 5, 6].map(n => `${IMG}kid${n}.webp`);
const EXPLOSION = `${IMG}explosion.webp`;
const SQUISHED_KID = `${IMG}niño_aplstado.webp`;

const $ = id => document.getElementById(id);
const el = {
  kid: $('kid'), balloon: $('balloon'), explosion: $('explosion'), stage: $('stage'),
  start: $('start'), quiz: $('quiz'), question: $('question'), options: $('options'),
  feedback: $('feedback'), hint: $('hint'), continue: $('continue'),
  end: $('end'), endMsg: $('endMsg'), restart: $('restart'),
};

let kidFrames = [];
let balloonState = 0; // índice 0..5
let locked = false;
let current = null;
let lastAnswerCorrect = false;
let squishedKid = null;
let impactTimer = null;

const sleep = ms => new Promise(r => setTimeout(r, ms));
const load = src => new Promise(res => {
  const i = new Image();
  i.onload = () => res(src);
  i.onerror = () => res(null);
  i.src = src;
});

async function preload() {
  const frames = await Promise.all(KID_FRAMES.map(load));
  kidFrames = frames.filter(Boolean);
  const [, , squished] = await Promise.all([BALLOON, EXPLOSION, SQUISHED_KID].map(load));
  squishedKid = squished;
  el.kid.src = kidFrames[0] || KID_FRAMES[0];
  el.balloon.src = BALLOON;
  showBalloon();
}

async function animateKid() {
  for (const f of kidFrames) { el.kid.src = f; await sleep(300); }
  if (kidFrames.length) el.kid.src = kidFrames[0];
}

function showBalloon() {
  const scale = (0.42 + balloonState * 0.15).toFixed(3);
  el.balloon.style.setProperty('--balloon-scale', scale);
}

function explainQuestion(question, answer) {
  const text = question.toLowerCase();
  if (text.includes('cómo se dice')) {
    return `Truco: ${answer} es la traducción correcta. ¡Puedes repetirla en voz alta!`;
  }
  if (text.includes('primer mes del año')) {
    return 'El año comienza en enero, que es el mes número 1.';
  }
  if (text.includes('último mes del año')) {
    return 'Diciembre es el mes número 12 y cierra el año.';
  }
  if (text.includes('mes viene después')) {
    return `${answer} viene justo después del mes que aparece en la pregunta.`;
  }
  if (text.includes('mes viene antes')) {
    return `${answer} viene justo antes del mes que aparece en la pregunta.`;
  }
  if (text.includes('día viene después')) {
    return `${answer} es el día que sigue en el orden de la semana.`;
  }
  if (text.includes('día viene antes')) {
    return `${answer} es el día anterior en el orden de la semana.`;
  }
  if (text.includes('número')) {
    return 'La semana empieza en lunes y continúa hasta domingo.';
  }
  if (text.includes('en qué estación')) {
    return `En el hemisferio norte, ${answer} corresponde a los meses indicados en el calendario de esa estación.`;
  }
  if (text.includes('nombra un mes')) {
    return `${answer} pertenece a la estación que aparece en la pregunta.`;
  }
  if (text.includes('primer mes de')) {
    return `${answer} es el primer mes de la estación indicada.`;
  }
  if (text.includes('último mes de')) {
    return `${answer} es el último mes de la estación indicada.`;
  }
  if (text.includes('estación viene después')) {
    return `${answer} es la estación que sigue en el ciclo del año.`;
  }
  return `La respuesta correcta es ${answer}.`;
}

function nextQuestion() {
  current = buildQuestion();
  el.question.textContent = current.q;
  el.feedback.textContent = '';
  el.feedback.className = '';
  el.options.innerHTML = '';
  el.hint.disabled = false;
  el.continue.hidden = true;
  current.options.forEach(opt => {
    const b = document.createElement('button');
    b.textContent = opt;
    b.onclick = () => answer(b, opt);
    el.options.appendChild(b);
  });
  locked = false;
}

function showHint() {
  if (locked) return;
  el.feedback.className = 'hint';
  el.feedback.textContent = current.hint;
  el.hint.disabled = true;
}

async function answer(btn, opt) {
  if (locked) return;
  locked = true;
  el.hint.disabled = true;
  const ok = current.answers.includes(opt);
  lastAnswerCorrect = ok;
  [...el.options.children].forEach(b => {
    b.disabled = true;
    if (current.answers.includes(b.textContent)) b.classList.add('ok');
  });
  if (!ok) {
    btn.classList.add('bad');
    el.feedback.className = 'wrong';
    el.feedback.textContent = `✗ Todavía no.\nLa respuesta correcta es: ${current.correct}\n${explainQuestion(current.q, current.correct)}`;
  } else {
    el.feedback.className = 'correct';
    el.feedback.textContent = `✓ ¡Correcto! / Zuzen!\n${explainQuestion(current.q, current.correct)}`;
  }
  el.continue.textContent = balloonState === BALLOON_STAGES - 1 && ok
    ? '💥 Ver explosión / Ikusi eztanda'
    : 'Continuar / Jarraitu';
  el.continue.hidden = false;
}

async function continueAfterAnswer() {
  el.continue.hidden = true;
  if (!lastAnswerCorrect) return nextQuestion();
  if (balloonState === BALLOON_STAGES - 1) return explode();
  await animateKid();
  balloonState++;
  showBalloon();
  nextQuestion();
}

function explode() {
  el.explosion.src = EXPLOSION;
  el.explosion.hidden = false;
  el.stage.classList.add('exploded');
  el.quiz.hidden = true;
  el.end.hidden = false;
  el.endMsg.textContent = '💥 ¡BOOM! ¡Has explotado el globo! / Zorionak!';
  if (squishedKid) {
    impactTimer = setTimeout(() => {
      el.kid.src = squishedKid;
      el.kid.classList.add('squished');
      impactTimer = null;
    }, 260);
  }
}

function resetStage() {
  if (impactTimer) {
    clearTimeout(impactTimer);
    impactTimer = null;
  }
  balloonState = 0;
  el.explosion.hidden = true;
  el.stage.classList.remove('exploded');
  el.kid.classList.remove('squished');
  el.kid.src = kidFrames[0] || KID_FRAMES[0];
  showBalloon();
  locked = false;
  lastAnswerCorrect = false;
}

function returnToMain() {
  resetStage();
  el.start.hidden = false;
  el.quiz.hidden = true;
  el.end.hidden = true;
}

function startGame() {
  resetStage();
  el.start.hidden = true;
  el.end.hidden = true;
  el.quiz.hidden = false;
  nextQuestion();
}

el.start.onclick = startGame;
el.restart.onclick = startGame;
el.hint.onclick = showHint;
el.continue.onclick = continueAfterAnswer;
document.addEventListener('click', event => {
  if (!el.stage.classList.contains('exploded')) return;
  event.preventDefault();
  event.stopPropagation();
  returnToMain();
}, true);
preload();
