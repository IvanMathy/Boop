/**
  {
    "api":1,
    "name":"To NATO Alphabet",
    "description":"Outputs the provided string, substituting letters for the code words from the NATO phonetic alphabet",
    "author":"funkju",
    "icon":"color-wheel",
    "tags":"rgb,hex,convert,color"
  }
**/
const toNato = (str = '') => {
    let nato = {
        a: 'Alfa',
        b: 'Bravo',
        c: 'Charlie',
        d: 'Delta',
        e: 'Echo',
        f: 'Foxtrot',
        g: 'Golf',
        h: 'Hotel',
        i: 'India',
        j: 'Juliett',
        k: 'Kilo',
        l: 'Lima',
        m: 'Mike',
        n: 'November',
        o: 'Oscar',
        p: 'Papa',
        q: 'Quebec',
        r: 'Romeo',
        s: 'Sierra',
        t: 'Tango',
        u: 'Uniform',
        v: 'Victor',
        w: 'Whiskey',
        x: 'Xray',
        y: 'Yankee',
        z: 'Zulu',
        0: 'Zero',
        1: 'One',
        2: 'Two',
        3: 'Three',
        4: 'Four',
        5: 'Five',
        6: 'Six',
        7: 'Seven',
        8: 'Eight',
        9: 'Nine'
    }
    let arr = [...str];
    return arr
        .filter((letter) => letter !== " ")
        .map((letter) => {
            if (/[^a-z0-9]/.test(letter.toLowerCase())) {
                return letter
            } else {
                return nato[letter.toLowerCase()];
            }
        }).join(' ');
};

function main(state) {
    const str = state.fullText;
    state.text = toNato(str);
}