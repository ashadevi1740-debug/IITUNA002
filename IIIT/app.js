/* =========================
   SCREEN CONTROL
========================= */
function go(id) {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.remove("active")
  );
  document.getElementById(id).classList.add("active");
}

/* =========================
   GLOBAL STATE
========================= */
let currentLang = "";
let letterIndex = 0;
let lessonIndex = 0;

// Quiz state
let quizLevel = 1;
let quizIndex = 0;
let quizScore = 0;
let quizQuestions = [];

/* =========================
   SPEECH
========================= */
function speak(text, lang = "hi-IN") {
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  speechSynthesis.speak(u);
}

/* =========================
   DATA (UNCHANGED)
========================= */
const data = {
  hindi: {
    type: "alphabet",
    alphabets: [
      {letter:"अ", image:"images/hindi/a.jpg", word:"अनार"},
        {letter:"आ", image:"images/hindi/aa.jpg", word:"आम"},
        {letter:"इ", image:"images/hindi/i.jpg", word:"इमली"},
        {letter:"ई", image:"images/hindi/ii.jpg", word:"ईख"},
        {letter:"उ", image:"images/hindi/u.jpg", word:"उल्लू"},
        {letter:"ऊ", image:"images/hindi/uu.jpg", word:"ऊँट"},
        {letter:"ऋ", image:"images/hindi/ri.jpg", word:"ऋषि"},
        {letter:"ए", image:"images/hindi/e.jpg", word:"एक"},
        {letter:"ऐ", image:"images/hindi/ai.jpg", word:"ऐनक"},
        {letter:"ओ", image:"images/hindi/o.jpg", word:"ओखली"},
        {letter:"औ", image:"images/hindi/au.jpg", word:"औरत"},
        {letter:"क", image:"images/hindi/ka.jpg", word:"कबूतर"},
        {letter:"ख", image:"images/hindi/kha.jpg", word:"खरगोश"},
        {letter:"ग", image:"images/hindi/ga.jpg", word:"गमला"},
        {letter:"घ", image:"images/hindi/gha.jpg", word:"घर"},
        {letter:"ङ", image:"images/hindi/nga.jpg", word:"ङगूर"},
        {letter:"च", image:"images/hindi/cha.jpg", word:"चमचा"},
        {letter:"छ", image:"images/hindi/chha.jpg", word:"छाता"},
        {letter:"ज", image:"images/hindi/ja.jpg", word:"जहाज"},
        {letter:"झ", image:"images/hindi/jha.jpg", word:"झंडा"},
        {letter:"ञ", image:"images/hindi/nya.jpg", word:"ञा"},
        {letter:"ट", image:"images/hindi/ta.jpg", word:"टमाटर"},
        {letter:"ठ", image:"images/hindi/tha.jpg", word:"ठेला"},
        {letter:"ड", image:"images/hindi/da.jpg", word:"डमरू"},
        {letter:"ढ", image:"images/hindi/dha.jpg", word:"ढोल"},
        {letter:"ण", image:"images/hindi/na.jpg", word:"णक"},
        {letter:"त", image:"images/hindi/ta2.jpg", word:"तरबूज"},
        {letter:"थ", image:"images/hindi/tha2.jpg", word:"थैला"},
        {letter:"द", image:"images/hindi/da2.jpg", word:"दरवाज़ा"},
        {letter:"ध", image:"images/hindi/dha2.jpg", word:"धूप"},
        {letter:"न", image:"images/hindi/na2.jpg", word:"नल"},
        {letter:"प", image:"images/hindi/pa.jpg", word:"पतंग"},
        {letter:"फ", image:"images/hindi/pha.jpg", word:"फूल"},
        {letter:"ब", image:"images/hindi/ba.jpg", word:"बतख"},
        {letter:"भ", image:"images/hindi/bha.jpg", word:"भालू"},
        {letter:"म", image:"images/hindi/ma.jpg", word:"मकड़ी"},
        {letter:"य", image:"images/hindi/ya.jpg", word:"यज्ञ"},
        {letter:"र", image:"images/hindi/ra.jpg", word:"रोटि"},
        {letter:"ल", image:"images/hindi/la.jpg", word:"लट्टू"},
        {letter:"व", image:"images/hindi/va.jpg", word:"वृक्ष"},
        {letter:"श", image:"images/hindi/sha.jpg", word:"शेर"},
        {letter:"ष", image:"images/hindi/sha2.jpg", word:"षट्कोण"},
        {letter:"स", image:"images/hindi/sa.jpg", word:"सूरज"},
        {letter:"ह", image:"images/hindi/ha.jpg", word:"हाथी"},
        {letter:"क्ष", image:"images/hindi/ksha.jpg", word:"क्षत्रिय"},
        {letter:"त्र", image:"images/hindi/tra.jpg", word:"त्रिकोण"},
        {letter:"ज्ञ", image:"images/hindi/gya.jpg", word:"ज्ञान"}
    ]
  },

  punjabi: {
    type: "alphabet",
    alphabets: [
      {letter:"ਓ", image:"images/punjabi/a.jpg", word:"ਓਖਲੀ"},
        {letter:"ਅ", image:"images/punjabi/aa.jpg", word:"ਅੰਬ"},
        {letter:"ੲ", image:"images/punjabi/i.jpg", word:"ਇਕ"},
        {letter:"ਸ", image:"images/punjabi/ii.jpg", word:"ਸੱਪ"},
        {letter:"ਹ", image:"images/punjabi/sa.jpg", word:"ਹਾਥੀ"},
        {letter:"ਕ", image:"images/punjabi/ha.jpg", word:"ਕਬੂਤਰ"},
        {letter:"ਖ", image:"images/punjabi/u.jpg", word:"ਖਰਗੋਸ਼"},
        {letter:"ਗ", image:"images/punjabi/uu.jpg", word:"ਗੱਡੀ"},
        {letter:"ਘ", image:"images/punjabi/e.jpg", word:"ਘਰ"},
        {letter:"ਙ", image:"images/punjabi/ai.jpg", word:"ਙਾ"},
        {letter:"ਚ", image:"images/punjabi/o.jpg", word:"ਚੰਨ"},
        {letter:"ਛ", image:"images/punjabi/au.jpg", word:"ਛਾਤੀ"},
        {letter:"ਜ", image:"images/punjabi/ka.jpg", word:"ਜਹਾਜ਼"},
        {letter:"ਝ", image:"images/punjabi/kha.jpg", word:"ਝੰਡਾ"},
        {letter:"ਞ", image:"images/punjabi/ga.jpg", word:"ਞਾ"},
        {letter:"ਟ", image:"images/punjabi/cha.jpg", word:"ਟਮਾਟਰ"},
        {letter:"ਠ", image:"images/punjabi/chha.jpg", word:"ਠੇਲਾ"},
        {letter:"ਡ", image:"images/punjabi/ja.jpg", word:"ਡੰਡਾ"},
        {letter:"ਢ", image:"images/punjabi/jha.jpg", word:"ਢੋਲ"},
        {letter:"ਣ", image:"images/punjabi/nya.jpg", word:"ਣਾ"},
        {letter:"ਤ", image:"images/punjabi/ta.jpg", word:"ਤਾਰਾ"},
        {letter:"ਥ", image:"images/punjabi/tha.jpg", word:"ਥੈਲਾ"},
        {letter:"ਦ", image:"images/punjabi/da.jpg", word:"ਦਰਵਾਜ਼ਾ"},
        {letter:"ਧ", image:"images/punjabi/dha.jpg", word:"ਧੂਪ"},
        {letter:"ਨ", image:"images/punjabi/na.jpg", word:"ਨਾਰੀਅਲ"},
        {letter:"ਪ", image:"images/punjabi/ta2.jpg", word:"ਪਤੰਗ"},
        {letter:"ਫ", image:"images/punjabi/tha2.jpg", word:"ਫੁੱਲ"},
        {letter:"ਬ", image:"images/punjabi/da2.jpg", word:"ਬਤਖ"},
        {letter:"ਭ", image:"images/punjabi/dha2.jpg", word:"ਭਾਲੂ"},
        {letter:"ਮ", image:"images/punjabi/na2.jpg", word:"ਮਕੜੀ"},
        {letter:"ਯ", image:"images/punjabi/va.jpg", word:"ਯਗਯ"},
        {letter:"ਰ", image:"images/punjabi/sha.jpg", word:"ਰੋਟੀ"},
        {letter:"ਲ", image:"images/punjabi/sa.jpg", word:"ਲੱਤ"},
        {letter:"ਵ", image:"images/punjabi/ha.jpg", word:"ਵਾਹਨ"},
        {letter:"ੜ", image:"images/punjabi/la2.jpg", word:"ੜਾ"},
        {letter:"ਸ਼", image:"images/punjabi/ssa.jpg", word:"ਸ਼ੇਰ"},
        {letter:"ਖ਼", image:"images/punjabi/sa.jpg", word:"ਖ਼ਰਗੋਸ਼"},
        {letter:"ਗ਼", image:"images/punjabi/ppe.jpg", word:"ਗ਼ਜ਼ਲ"},
        {letter:"ਜ਼", image:"images/punjabi/jje.jpg", word:"ਜ਼ਮੀਨ"},
        {letter:"ਫ਼", image:"images/punjabi/ffe.jpg", word:"ਫ਼ਰਿਸ਼ਤਾ"},
        {letter:"ਲ਼", image:"images/punjabi/lle.jpg", word:"ਲ਼ੜਕਾ"}
    ]
  },

  kangri:{type:"lesson",lessons:[]},
  mandeali:{type:"lesson",lessons:[]},
  pahadi:{type:"lesson",lessons:[]}
};

/* =========================
   LESSON SENTENCES (ALL 10)
========================= */
const sentences = [
  {en:"What are you doing?", hi:"क्या कर रहे हो?", kangri:"क्या करदा ऐं?", mandeali:"क्या करदे ऐं?", pahadi:"क्या करि रये हो?"},
  {en:"Where are you going?", hi:"कहाँ जा रहे हो?", kangri:"कित्थे जांदा ऐं?", mandeali:"कुत्थे जांदे ऐं?", pahadi:"क्यां जा रये हो?"},
  {en:"What happened?", hi:"क्या हुआ?", kangri:"क्या होया?", mandeali:"क्या होया?", pahadi:"क्या हो ग्या?"},
  {en:"Have you eaten food?", hi:"खाना खाया?", kangri:"रोटी खाई?", mandeali:"रोटी खादी?", pahadi:"खानो खा ल्यो?"},
  {en:"I am fine", hi:"मैं ठीक हूँ", kangri:"मैं ठीक ऐं", mandeali:"मैं ठीक ऐं", pahadi:"मैं ठीक छूं"},
  {en:"Come here", hi:"यहाँ आओ", kangri:"इत्ते आ", mandeali:"इत्ते आ", pahadi:"इजै आ"},
  {en:"Sit here", hi:"यहाँ बैठो", kangri:"इत्ते बेह", mandeali:"इत्ते बेह", pahadi:"इजै बैस"},
  {en:"I don’t know", hi:"मुझे नहीं पता", kangri:"मैनू नी पता", mandeali:"मैनू नी पता", pahadi:"मैंनू नी पता"},
  {en:"What is your name?", hi:"तुम्हारा नाम क्या है?", kangri:"तेरा नांऽ क्या ऐ?", mandeali:"तेरा नांऽ क्या ऐ?", pahadi:"तेरो नांऽ क्या छा?"},
  {en:"Let’s go", hi:"चलो चलते हैं", kangri:"चलिये चलां", mandeali:"चलिये चलां", pahadi:"चलां जा"}
];

sentences.forEach(s=>{
  data.kangri.lessons.push({en:s.en,hi:s.hi,local:s.kangri});
  data.mandeali.lessons.push({en:s.en,hi:s.hi,local:s.mandeali});
  data.pahadi.lessons.push({en:s.en,hi:s.hi,local:s.pahadi});
});

/* =========================
   LANGUAGE SELECT
========================= */
function selectLanguage(lang){
  currentLang=lang;
  langTitle.innerText=lang.toUpperCase();
  btnAlphabet.style.display=data[lang].type==="alphabet"?"inline-block":"none";
  btnQuiz.style.display=data[lang].type==="alphabet"?"inline-block":"none";
  btnGame.style.display=data[lang].type==="alphabet"?"inline-block":"none";
  btnLesson.style.display=data[lang].type==="lesson"?"inline-block":"none";
  go("menu");
}

/* =========================
   ALPHABET
========================= */
function startAlphabet(){
  letterIndex=0;
  showLetter();
  go("alphabet");
}
function showLetter(){
  const d=data[currentLang].alphabets[letterIndex];
  letter.innerText=d.letter;
  word.innerText=d.word;
  letterImg.src=d.image;
}
function nextLetter(){letterIndex=(letterIndex+1)%data[currentLang].alphabets.length;showLetter();}
function prevLetter(){letterIndex=(letterIndex-1+data[currentLang].alphabets.length)%data[currentLang].alphabets.length;showLetter();}
function playAudio(){const d=data[currentLang].alphabets[letterIndex];speak(d.letter+" "+d.word);}

/* =========================
   QUIZ LEVELS (NEW FEATURE)
========================= */
function startQuiz(){
  quizLevel=1;
  startLevel();
  go("quiz");
}

function startLevel(){
  quizIndex=0;
  quizScore=0;
  const all=data[currentLang].alphabets;

  if(quizLevel===1) quizQuestions=all.slice(0,10);
  else if(quizLevel===2) quizQuestions=all.slice(10,20);
  else quizQuestions=[...all].sort(()=>Math.random()-0.5).slice(0,10);

  loadQuiz();
}

function loadQuiz(){
  if(quizIndex>=quizQuestions.length){
    quizQuestion.innerText=`Level ${quizLevel} Completed 🎉\nScore: ${quizScore}/10`;
    quizOptions.innerHTML="";
    quizResult.innerText=quizLevel<3?"Click Next for Level "+(quizLevel+1):"Quiz Finished ✅";
    return;
  }

  const a=quizQuestions[quizIndex];
  quizQuestion.innerText=`Level ${quizLevel} • Q${quizIndex+1}/10\n${a.word} किस अक्षर से शुरू होता है?`;
  quizOptions.innerHTML="";
  quizResult.innerText="";

  let opts=[a.letter];
  while(opts.length<3){
    const r=quizQuestions[Math.floor(Math.random()*quizQuestions.length)].letter;
    if(!opts.includes(r)) opts.push(r);
  }
  opts.sort(()=>Math.random()-0.5);

  opts.forEach(o=>{
    const b=document.createElement("button");
    b.innerText=o;
    b.onclick=()=>{
      if(o===a.letter){quizScore++;quizResult.innerText="Correct ✅";}
      else quizResult.innerText="Wrong ❌";
    };
    quizOptions.appendChild(b);
  });
}

function nextQuiz(){
  if(quizIndex>=quizQuestions.length){
    if(quizLevel<3){quizLevel++;startLevel();}
    return;
  }
  quizIndex++;
  loadQuiz();
}

/* =========================
   GAME
========================= */
function startGame(){newGame();go("game");}
function newGame(){
  const item=data[currentLang].alphabets[Math.floor(Math.random()*data[currentLang].alphabets.length)];
  gamePrompt.innerText="Match word for: "+item.letter;
  gameOptions.innerHTML="";
  gameResult.innerText="";
  [item.word,"गलत","Wrong"].sort(()=>Math.random()-0.5).forEach(o=>{
    const b=document.createElement("button");
    b.innerText=o;
    b.onclick=()=>gameResult.innerText=o===item.word?"Matched ✅":"Try Again ❌";
    gameOptions.appendChild(b);
  });
}

/* =========================
   LESSON
========================= */
function startLesson(){lessonIndex=0;showLesson();go("lesson");}
function showLesson(){
  const l=data[currentLang].lessons[lessonIndex];
  lessonEnglish.innerText=l.en;
  lessonHindi.innerText=l.hi;
  lessonLocal.innerText=l.local;
  lessonLangName.innerText=currentLang.toUpperCase();
}
function nextLesson(){lessonIndex=(lessonIndex+1)%data[currentLang].lessons.length;showLesson();}
function prevLesson(){lessonIndex=(lessonIndex-1+data[currentLang].lessons.length)%data[currentLang].lessons.length;showLesson();}
function playLessonAudio(){speak(data[currentLang].lessons[lessonIndex].local);}
