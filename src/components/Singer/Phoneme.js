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

// static getVowelSequence(baseVowel) {
//   var diphthongs = {
//     "AW": ["AE","UW"],
//     "AY": ["AA","IY"],
//     "ER": ["AH","UH"],
//     "EY": ["EH","IY"],
//     "OW": ["AH","UW"],
//     "OY": ["AO","IY"],
//   }
//   return (
//     dipthongs.hasOwnProperty(baseVowel) ? diphthongs[baseVowel] : [baseVowel, baseVowel]
//   )
// }

export default class Phoneme {
  static get

  static isVowel(phoneme) {
    return "AEIOU".indexOf(phoneme.charAt(0))>-1;
  }

  static getEvents(phoneme) {
    var out = null;

    switch(phoneme) {
      case "EH":
      out = [
        {
          formants: FORMANTS["EH"]
        },
        {
          formants: FORMANTS["EH"]
        }
      ]
      break;

      case "IY":
      out = [
        {
          formants: FORMANTS["IY"]
        },
        {
          formants: FORMANTS["IY"]
        }
      ]
      break;

      case "EY":
      out = [
        {
          formants: FORMANTS["EH"]
        },
        {
          formants: FORMANTS["IY"]
        }
      ]
      break;

      case "S":
      out = [
        {
          tractOpen: false
        },
        {
          tractOpen: false
        }
      ]
      break;

      case "Y":
      out = [
        {
          formants: FORMANTS["IY"]
        }
      ]
      break;

      case "W":
      out = [
        {
          formants: FORMANTS["UW"]
        }
      ]
      break;
    }
    return JSON.parse(JSON.stringify(out));
  }
}
