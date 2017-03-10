import PronunciationTool from '../PronunciationTool';

class Phoneme {
  static isVowel(rawPhoneme) {
    return "AEIOU".indexOf(rawPhoneme.charAt(0))>-1;
  }
}

class Syllable {
  constructor() {

  }
}

class Word {
  constructor(rawWord) {
    this.rawPronunciation = PronunciationTool.getPronunciation(rawWord.toUpperCase());
    console.log(Word.getSyllables(this.rawPronunciation));
  }

  static getSyllables(rawPronunciation) {
    var rawPhonemes = rawPronunciation.split(" ");
    var syllablePhase = 1; // 1 = initial consonant, 2 = vowel, 3 = end consonant
    var isVowel;
    var thisSyllablePhonemes = [];
    var syllables = [];
    for(var i = 0; i < rawPhonemes.length; i ++) {
      isVowel = Phoneme.isVowel(rawPhonemes[i])
      if(thisSyllablePhonemes.length == 0) {
        syllablePhase = isVowel ? 2 : 1; // skip to phase 2 if no initial consonant
      } else {
        if(syllablePhase == 1 && isVowel) {
          // go to phase 2 if no more initial consonants
          syllablePhase = 2;
        } else if(syllablePhase == 2 && !isVowel) {
          // go to phase 3 if there is another consonant to go to
          syllablePhase = 3;
        } else if(syllablePhase != 1 && isVowel) {
          // end of syllable if any vowel is found when you were in phase 3
          // also, if in phase 2, end of syllable if second vowel found
          syllablePhase = 1;
          syllables.push(thisSyllablePhonemes);
          thisSyllablePhonemes = [];
        }
      }
      thisSyllablePhonemes.push(rawPhonemes[i]);
      if(i == rawPhonemes.length - 1 && thisSyllablePhonemes.length) {
        syllables.push(thisSyllablePhonemes);
      }
    }
    return syllables;
  }
}

export default class Singer {
  constructor() {
    this.wordQueue = [];
    this.currentWord = null;
    var actx = new AudioContext();
    var osc = actx.createOscillator();
    var gain = actx.createGain();
    var f1 = actx.createBiquadFilter();
    var f2 = actx.createBiquadFilter();
    var f1Gain = actx.createGain();
    var f2Gain = actx.createGain();
    var coeffs = [
      0.5683183637542948,
      0,
      -0.20266376469502198,
      0.8183087507382304,
      -0.2121875583982202,
      -0.15916152075922674,
      -0.022529841092825992,
      0.10610718715843336,
      -0.042426789753242065,
      -0.07957974129576073,
      -0.008119739939413038,
      0.06366373652213493,
      -0.0181753274170227,
      -0.05305262252485824,
      -0.004149023500164641,
      0.04547409001237547,
      -0.01009105854964838,
      -0.039792008129391765,
      -0.002515607982438431,
      0.03536907880079574,
      -0.006416325337835517,
      -0.03183225521001353,
      -0.0016883569368657224,
      0.028938651831404552,
      -0.004438777814701214,
      -0.02652697485807588,
      -0.0012135775436436613,
      0.024486503677765115,
      -0.003250549047160823,
      -0.022737477461720126,
      -0.0009138392696324555,
      0.021221743904193742,
      -0.0024822469025427255,
      -0.019895508848766497,
      -0.0007150881555659621,
      0.018724733659594293,
      -0.001956844138199723,
      -0.01768405666349069,
      -0.0005755531679761028,
      0.01675328940861156,
      -0.0015825588313612775,
      -0.015916574321731304,
      -0.0004742604940544036,
      0.015158214892329809,
      -0.0013031147485775359,
      -0.014469419781280251,
      -0.000396293469072143,
      0.01384032889290098,
      -0.0010940244013832462,
      -0.013262960853691566,
      -0.0003386054608763792,
      0.012733227104761859,
      -0.0009303320312708788,
      -0.012243129268481211,
      -0.0002913413363799394,
      0.011798455938572249,
      -0.0007994476609286844,
      -0.011368760542686127,
      -0.00025585995865903995,
      0.010976324417762336,
      -0.0006935658367769693,
      -0.010610015589813369,
      -0.00022381640745383508,
      0.010268741260522775,
      -0.0006083068480969351,
      -0.009948024454888139,
      -0.00019987020156856901,
      0.009646366965827454,
      -0.0005370510972419417,
      -0.009362770889036162,
      -0.00017942527568216133,
      0.009094999014435466,
      -0.0004784236130413878,
      -0.008842567731269891,
      -0.00016171892589309997,
      0.008603602020382711,
      -0.000426534096956178,
      -0.008376596671231178,
      -0.00014608714942437434,
      0.008162218646674222,
      -0.0003844781490959799,
      -0.00795858419701824,
      -0.00013446481522986177,
      0.007764260768365991,
      -0.00034709637182542453,
      -0.007579447463278271,
      -0.00012341918411329532,
      0.007403317028148483,
      -0.00031483957495465217,
      -0.007234975336519672,
      -0.00011453037789217025,
      0.007074034576481307,
      -0.00028695629210960386,
      -0.006919956116386732,
      -0.00010559147991110569,
      0.006773192156989699,
      -0.0002622075226719631,
      -0.006632010680853017,
      -0.0000979654930191521,
      0.006496758441068296,
    ]
    var real = new Float32Array(coeffs.length / 2);
    var imag = new Float32Array(coeffs.length / 2);
    for(var i = 0; i < coeffs.length / 2; i ++) {
      real[i] = coeffs[2*i];
      imag[i] = coeffs[2*i+1];
    }
    osc.setPeriodicWave(actx.createPeriodicWave(real,imag));
    osc.frequency.value = 130;
    f1.type = f2.type = "bandpass";
    f1.frequency.value = f2.frequency.value = 10; // starting value
    f1.Q.value = f2.Q.value = 1;
    osc.connect(f1);
    osc.connect(f2);
    // osc.connect(gain);
    //f1.connect(f1Gain);
    f2.connect(f2Gain);
    f1Gain.connect(gain);
    f2Gain.connect(gain);
    gain.connect(actx.destination);
    gain.gain.value = 0.1;
    osc.start();
    this.oscillator = osc;
    this.gain = gain;
    this.filter1 = f1;
    this.filter2 = f2;
    this.filter1Gain = f1Gain;
    this.filter2Gain = f2Gain;
    this.setFormant();
    setInterval(this.nextWord.bind(this), 1000); // using an interval for now to simulate flow of words
  }

  setFormant() {
    this.filter1.frequency.value = 250;
    this.filter1.Q.value = 10;
    this.filter1Gain.gain.value = 1;
    this.filter2.frequency.value = 595;
    this.filter2.Q.value = 10;
    this.filter2Gain.gain.value = 1;
    // this.filter1.frequency.value = 240;
    // this.filter1.Q.value = 10;
    // this.filter1Gain.gain.value = 1;
    // this.filter2.frequency.value = 2400;
    // this.filter2.Q.value = 10;
    // this.filter2Gain.gain.value = 1;
  }

  addToWordQueue(words) {
    this.wordQueue = this.wordQueue.concat(words);
  }

  nextWord() {
    if(this.wordQueue.length) {
      this.currentWord = new Word(this.wordQueue.shift());
    } else {
      this.currentWord = null;
    }
    if(this.currentWord) console.log(this.currentWord);
  }
}
