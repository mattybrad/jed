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

export default class Phoneme {

  static isVowel(phoneme) {
    return "AEIOU".indexOf(phoneme.charAt(0))>-1;
  }

  static getEvents(phoneme) {
    var out = null;
    switch(phoneme) {
      case "S":
      out = {
        relativeDuration: 1,
        formants: [
          {position: 0, formants: FORMANTS["IY"]},
          {position: 1, formants: FORMANTS["IY"]},
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
        relativeDuration: 1,
        formants: [
          {position: 0, formants: FORMANTS["IY"]},
          {position: 1, formants: FORMANTS["IY"]},
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

      case "DH":
      out = {
        relativeDuration: 1,
        formants: [
          {position: 0, formants: FORMANTS["IY"]},
          {position: 1, formants: FORMANTS["IY"]},
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

      case "IY":
      out = {
        relativeDuration: 5,
        formants: [
          {position: 0, formants: FORMANTS["IY"]},
          {position: 1, formants: FORMANTS["IY"]},
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

      case "EY":
      out = {
        relativeDuration: 5,
        formants: [
          {position: 0, formants: FORMANTS["EH"]},
          {position: 1, formants: FORMANTS["IY"]},
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
    }
    return JSON.parse(JSON.stringify(out));
  }
}
