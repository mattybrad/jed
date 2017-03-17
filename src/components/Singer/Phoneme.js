const FORMANTS = {
  "AA": [677,1083,2540],
  "AE": [748,1746,2460],
  "AH": [722,1236,2537],
  "AO": [599,891,2605],
  "EH": [569,1965,2636],
  "IH": [356,2098,2696],
  "IY": [285,2373,3088],
  "UH": [376,950,2440],
  "UW": [309,939,2320],
}

const DIPHTHONGS = {
  "AW": ["AE","UW"],
  "AY": ["AA","IY"],
  "ER": ["AH","UH"],
  "EY": ["EH","IY"],
  "OW": ["AH","UW"],
  "OY": ["AO","IY"],
}

export default class Phoneme {

  static isVowel(phoneme) {
    return "AEIOU".indexOf(phoneme.charAt(0))>-1;
  }

  static getEvents(phoneme, prevVowel, nextVowel) {
    var vowel = "UH";
    if(prevVowel) vowel = prevVowel;
    else if(nextVowel) vowel = nextVowel;

    var out = null;

    if(FORMANTS.hasOwnProperty(phoneme)) {
      out = {
        relativeDuration: 3,
        formants: [
          {position: 0, formants: FORMANTS[phoneme]},
          {position: 1, formants: FORMANTS[phoneme]},
        ],
        voiced: [
          {position: 0, voiced: 1},
          {position: 1, voiced: 1},
        ],
        constriction: [
          {position: 0, shape: null, amount: 0},
          {position: 1, shape: null, amount: 0},
        ]
      }
    }

    if(DIPHTHONGS.hasOwnProperty(phoneme)) {
      var diphthong = DIPHTHONGS[phoneme];
      out = {
        relativeDuration: 5,
        formants: [
          {position: 0, formants: FORMANTS[diphthong[0]]},
          {position: 1, formants: FORMANTS[diphthong[1]]},
        ],
        voiced: [
          {position: 0, voiced: 1},
          {position: 1, voiced: 1},
        ],
        constriction: [
          {position: 0, shape: null, amount: 0},
          {position: 1, shape: null, amount: 0},
        ]
      }
    }

    switch(phoneme) {
      case "S":
      out = {
        relativeDuration: 2,
        formants: [
          {position: 0, formants: FORMANTS[vowel]},
          {position: 1, formants: FORMANTS[vowel]},
        ],
        voiced: [
          {position: 0, voiced: 0},
          {position: 1, voiced: 0},
        ],
        constriction: [
          {position: 0, shape: "s", amount: 1},
          {position: 1, shape: "s", amount: 1},
        ]
      }
      break;

      case "Z":
      out = {
        relativeDuration: 2,
        formants: [
          {position: 0, formants: FORMANTS[vowel]},
          {position: 1, formants: FORMANTS[vowel]},
        ],
        voiced: [
          {position: 0, voiced: 1},
          {position: 1, voiced: 1},
        ],
        constriction: [
          {position: 0, shape: "s", amount: 1},
          {position: 1, shape: "s", amount: 1},
        ]
      }
      break;

      case "TH":
      out = {
        relativeDuration: 2,
        formants: [
          {position: 0, formants: FORMANTS[vowel]},
          {position: 1, formants: FORMANTS[vowel]},
        ],
        voiced: [
          {position: 0, voiced: 0},
          {position: 1, voiced: 0},
        ],
        constriction: [
          {position: 0, shape: "th", amount: 1},
          {position: 1, shape: "th", amount: 1},
        ]
      }
      break;

      case "DH":
      out = {
        relativeDuration: 2,
        formants: [
          {position: 0, formants: FORMANTS[vowel]},
          {position: 1, formants: FORMANTS[vowel]},
        ],
        voiced: [
          {position: 0, voiced: 1},
          {position: 1, voiced: 1},
        ],
        constriction: [
          {position: 0, shape: "th", amount: 1},
          {position: 1, shape: "th", amount: 1},
        ]
      }
      break;

      case "SH":
      out = {
        relativeDuration: 2,
        formants: [
          {position: 0, formants: FORMANTS[vowel]},
          {position: 1, formants: FORMANTS[vowel]},
        ],
        voiced: [
          {position: 0, voiced: 0},
          {position: 1, voiced: 0},
        ],
        constriction: [
          {position: 0, shape: "sh", amount: 1},
          {position: 1, shape: "sh", amount: 1},
        ]
      }
      break;

      case "ZH":
      out = {
        relativeDuration: 2,
        formants: [
          {position: 0, formants: FORMANTS[vowel]},
          {position: 1, formants: FORMANTS[vowel]},
        ],
        voiced: [
          {position: 0, voiced: 1},
          {position: 1, voiced: 1},
        ],
        constriction: [
          {position: 0, shape: "sh", amount: 1},
          {position: 1, shape: "sh", amount: 1},
        ]
      }
      break;

      case "F":
      out = {
        relativeDuration: 2,
        formants: [
          {position: 0, formants: FORMANTS[vowel]},
          {position: 1, formants: FORMANTS[vowel]},
        ],
        voiced: [
          {position: 0, voiced: 0},
          {position: 1, voiced: 0},
        ],
        constriction: [
          {position: 0, shape: "f", amount: 1},
          {position: 1, shape: "f", amount: 1},
        ]
      }
      break;

      case "V":
      out = {
        relativeDuration: 2,
        formants: [
          {position: 0, formants: FORMANTS[vowel]},
          {position: 1, formants: FORMANTS[vowel]},
        ],
        voiced: [
          {position: 0, voiced: 1},
          {position: 1, voiced: 1},
        ],
        constriction: [
          {position: 0, shape: "f", amount: 1},
          {position: 1, shape: "f", amount: 1},
        ]
      }
      break;

      case "W":
      out = {
        relativeDuration: 2,
        formants: [
          {position: 0, formants: FORMANTS["UW"]},
        ],
        voiced: [
          {position: 0, voiced: 1},
          {position: 1, voiced: 1},
        ],
        constriction: [
          {position: 0, shape: null, amount: 0},
          {position: 1, shape: null, amount: 0},
        ]
      }
      break;

      case "Y":
      out = {
        relativeDuration: 2,
        formants: [
          {position: 0, formants: FORMANTS["IY"]},
        ],
        voiced: [
          {position: 0, voiced: 1},
          {position: 1, voiced: 1},
        ],
        constriction: [
          {position: 0, shape: null, amount: 0},
          {position: 1, shape: null, amount: 0},
        ]
      }
      break;
    }
    return JSON.parse(JSON.stringify(out));
  }
}
