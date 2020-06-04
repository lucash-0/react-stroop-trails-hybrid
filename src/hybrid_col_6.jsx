const rx = 55; //diameter width
const ry = 33; //diameter height

const defaults = {
  words: ["green", "red", "blue", "orange", "purple", "yellow"],
  colours: ["00FF00", "FF0000", "0000FF", "FF7F00", "800080", "FFFF00"],
};

function shuffle(arr1, arr2) {
  for (let i = arr1.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr1[i], arr1[j]] = [arr1[j], arr1[i]];
    [arr2[i], arr2[j]] = [arr2[j], arr2[i]];
  }
}

function combos() {
  let wordarr = defaults.words;
  let colarr = defaults.colours;

  shuffle(wordarr, colarr);

  let combos = [];

  for (let i = 0; i < wordarr.length; i++) {
    if (i === 0) {
      combos.push({ word: "start", colour: colarr[i], coltext: wordarr[i] });
    } else {
      combos.push({
        word: wordarr[i - 1],
        colour: colarr[i],
        coltext: wordarr[i],
      });
    }
  }

  /*colarr.forEach((colour, index) => {
    if (index === 0) {
      combos.push({ word: "start", colour });
      continue;
    }
  });

  for (let i = 0; i < wordarr.length; i++) {
    let word, colour;

    if (i === 0) {
      word = "start";
    } else if (lastCol) {
      word = wordarr.splice(wordarr.indexOf(defaultColObject[lastCol]), 1)[0];
    } else {
      word = wordarr.pop();
    }

    let rand = Math.round(0 + Math.random() * (colarr.length - 1));
    while (defaultColObject[colarr[rand]] === word) {
      rand = Math.round(0 + Math.random() * (colarr.length - 1));
    }
    colour = colarr.splice(rand, 1)[0];
    lastCol = colour;

    combos.push({ word, colour });
  }*/

  return combos;
}

function tokens() {
  const xlowest = 60;
  const xhighest = 710;
  const ylowest = 60;
  const yhighest = 510;
  const dx = rx * 2;
  const dy = ry * 2;

  let tokens = [];
  let xrange = [];
  let yrange = [];

  for (let i = 0; i < 6; i++) {
    const x = Math.round(xlowest + Math.random() * (xhighest - xlowest));
    xrange.push(x);
  }

  let i = 0;
  while (i < 6) {
    const y = Math.round(ylowest + Math.random() * (yhighest - ylowest));

    const ycheck = yrange.every((yr, index) => {
      if (!(y + dy - yr < 0 || yr + dy - y < 0)) {
        return (
          xrange[i] + dx - xrange[index] < 0 ||
          xrange[index] + dx - xrange[i] < 0
        );
      }

      return true;
    });

    if (ycheck) {
      yrange.push(y);
      i++;
    }
  }

  combos().forEach((combo, index) => {
    tokens.push({
      x: xrange[index],
      y: yrange[index],
      text: combo.word,
      colour: combo.colour,
      coltext: combo.coltext,
    });
  });

  //console.log(tokens);
  return tokens;
}

export default function obj() {
  return {
    width: 758,
    height: 558,
    rx: rx,
    ry: ry,
    tokens: tokens(),
  };
}
