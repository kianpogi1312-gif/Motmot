/* ==========================================================================
   LOVE LETTER — SCRIPT
   Everything you'd want to personalize is grouped in the CONFIG block below.
   ========================================================================== */

// ============================= //
// CONFIG — CUSTOMIZE HERE       //
// ============================= //

const CONFIG = {
  // CUSTOMIZE: the recipient's name (also shown in the HTML as a fallback)
  recipientName: "MommyBear",

  // CUSTOMIZE: the sender's name
  senderName: "Daddy Bear",

  // CUSTOMIZE THE LETTER TEXT HERE.
  // Each string in this array becomes one paragraph, typed out in order.
  // Keep lines short-to-medium so the typing animation feels natural.
  letterLines: [
    "52 (64 hehe) months. Ang tagal na rin pala natin. Almost 6 yrs of choosing each other, learning about each other, growing together, and going through so many different moments na hindi naman lahat naging madali. When I think about those 52 months, I realize na hindi lang pala memories yung nabuo natin. We also became different people along the way, hopefully better versions of ourselves because of everything we've experienced together.",
    "Thank you for these 52 months, Putot. Thank you sa lahat ng moments na magkasama tayo, whether personal man or through LDR. Kahit minsan simple lang yung ginagawa natin, those moments still became memories that I genuinely treasure. Yung mga random conversations, tawanan, kwentuhan, kahit yung mga ordinary days na parang walang special na nangyari, looking back, sila pala yung mga moments na naging malaking part ng relationship natin.",
    "Hindi rin naman naging perfect ang relationship natin. Marami tayong pinagdaanan, lalo na yung mga away natin. May times na hindi tayo nagkaintindihan, may nasabi o nagawa tayong hindi natin intention na makasakit, at may moments na pareho tayong nahirapan. Pero kahit gano'n, I'm grateful na nalagpasan natin. Every disagreement taught us something about each other, about ourselves, and about how to understand and love each other better. Hindi man naging madali lahat, I think those difficult moments helped make what we have more real and meaningful.",
    "One of the things I appreciate most about you is how caring you are. Minsan baka hindi ko nasasabi, or baka hindi ko napapansin agad, pero I see the little things you do. Yung concern mo, yung way mo of checking on me, yung presence mo kapag kailangan kita, and even the small things you do without expecting anything in return. Those things mean more to me than you probably realize.",
    "I also want you to know how much I appreciate your patience and understanding. Alam kong hindi rin ako perfect na boyfriend. May mga pagkakataong I could have handled things better, communicated better, or understood you more. Kaya I'm thankful na through all those moments, you still gave me chances to learn and grow.",
    "After 52 months, I still choose you, not because everything between us has always been easy, but because I've seen enough of our relationship to know that what we have is something worth taking care of. I've seen us at our happiest, but I've also seen us when things weren't okay. And despite everything, ikaw pa rin yung taong gusto kong kasama sa mga susunod pang chapters ng buhay ko.",
    "I don't want to take what we have for granted. 52 months is not just a number to me. It's 52 months of memories, lessons, laughter, conversations, challenges, forgiveness, patience, and countless little moments that brought us here. And I'm genuinely thankful na ikaw yung kasama ko through all of it.",
    "I hope we continue to grow, not just as a couple, but also as individuals. I hope we get to experience more places, more memories, more random conversations, more laughs, and even more ordinary days that we'll eventually look back on and miss. And kapag may challenges ulit, I hope we continue choosing to understand each other, communicate, and work through things together.",
    "Thank you for being you, Mum. Thank you for caring, for staying, for understanding, and for being part of my life for these 52 months. I may not always find the perfect words to show you how much you mean to me, but I hope through the way I stay, care, and choose you, you feel how important you are to me.",
    "Happy 52nd monthsary, love. I'm proud of everything we've been through, grateful for everything we've shared, and excited for everything that's still ahead of us.",
    "After 52 months, I'm still grateful that it's you.",
    "I love you, Putot. ❤️"
  ],

  // Typing speed in milliseconds per character (lower = faster)
  typingSpeedMs: 35,
};

// ============================= //
// APPLY CONFIG TO THE PAGE      //
// ============================= //

document.getElementById("recipientName").textContent = CONFIG.recipientName;
document.getElementById("senderName").textContent = CONFIG.senderName;

// ============================= //
// FLOATING HEARTS & SPARKLES    //
// ============================= //

const particleField = document.getElementById("particleField");
const PARTICLE_SYMBOLS = { heart: ["❤", "♥", "💗"], sparkle: ["✦", "✧", "・゚"] };

function spawnParticle() {
  const isHeart = Math.random() > 0.45;
  const el = document.createElement("span");
  el.className = "particle " + (isHeart ? "heart" : "sparkle");
  const symbols = isHeart ? PARTICLE_SYMBOLS.heart : PARTICLE_SYMBOLS.sparkle;
  el.textContent = symbols[Math.floor(Math.random() * symbols.length)];

  const startX = Math.random() * 100; // vw %
  const drift = (Math.random() * 120 - 60) + "px";
  const duration = 9 + Math.random() * 8; // seconds
  const delay = Math.random() * 2;

  el.style.left = startX + "vw";
  el.style.setProperty("--drift", drift);
  el.style.animationDuration = duration + "s";
  el.style.animationDelay = delay + "s";

  particleField.appendChild(el);

  // Clean up after the animation completes so the DOM doesn't grow forever
  setTimeout(() => el.remove(), (duration + delay) * 1000 + 500);
}

// Keep a light, steady stream of particles (kept sparse for smooth mobile performance)
function startParticleField() {
  for (let i = 0; i < 6; i++) setTimeout(spawnParticle, i * 400);
  setInterval(spawnParticle, 900);
}
startParticleField();

// ============================= //
// SCREEN TRANSITION              //
// ============================= //

const introScreen = document.getElementById("introScreen");
const letterScreen = document.getElementById("letterScreen");
const openLetterBtn = document.getElementById("openLetterBtn");

let letterOpened = false;

openLetterBtn.addEventListener("click", () => {
  if (letterOpened) return;
  letterOpened = true;

  // Try to start the background music on this first user interaction,
  // since browsers block autoplay without one.
  playMusic();

  introScreen.style.transition = "opacity 0.6s ease";
  introScreen.style.opacity = "0";

  setTimeout(() => {
    introScreen.hidden = true;
    letterScreen.hidden = false;
    startTypingAnimation();
  }, 600);
});

// ============================= //
// TYPING ANIMATION FOR THE LETTER //
// ============================= //

const letterBodyEl = document.getElementById("letterBody");
const signatureEl = document.querySelector(".signature");
const finalMessageEl = document.getElementById("finalMessage");

function startTypingAnimation() {
  const lines = CONFIG.letterLines;
  let lineIndex = 0;
  let charIndex = 0;

  letterBodyEl.textContent = "";
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  letterBodyEl.appendChild(cursor);

  function typeNextChar() {
    if (lineIndex >= lines.length) {
      cursor.remove();
      revealSignatureAndMessage();
      return;
    }

    const currentLine = lines[lineIndex];

    if (charIndex < currentLine.length) {
      const char = document.createTextNode(currentLine.charAt(charIndex));
      letterBodyEl.insertBefore(char, cursor);
      charIndex++;
      setTimeout(typeNextChar, CONFIG.typingSpeedMs);
    } else {
      // finished this paragraph — add a line break and move to the next
      letterBodyEl.insertBefore(document.createElement("br"), cursor);
      letterBodyEl.insertBefore(document.createElement("br"), cursor);
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNextChar, CONFIG.typingSpeedMs * 8);
    }
  }

  setTimeout(typeNextChar, 400);
}

function revealSignatureAndMessage() {
  signatureEl.classList.add("visible");
  setTimeout(() => finalMessageEl.classList.add("visible"), 900);
}

// ============================= //
// BACKGROUND MUSIC              //
// ============================= //
// CUSTOMIZE: place your own royalty-free track as "music.mp3" in this same
// folder (or edit the <source> in index.html to point at your filename).

const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");

let musicPlaying = false;

function playMusic() {
  bgMusic.volume = 0.5;
  bgMusic.play()
    .then(() => setMusicState(true))
    .catch(() => {
      // Autoplay was blocked — that's fine, the user can press the button.
      setMusicState(false);
    });
}

function pauseMusic() {
  bgMusic.pause();
  setMusicState(false);
}

function setMusicState(playing) {
  musicPlaying = playing;
  musicToggle.classList.toggle("playing", playing);
  musicIcon.classList.toggle("spinning", playing);
  musicIcon.textContent = playing ? "♫" : "♪";
  musicToggle.setAttribute("aria-label", playing ? "Pause background music" : "Play background music");
}

musicToggle.addEventListener("click", () => {
  if (musicPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});
