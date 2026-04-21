const ASCII_A = 65;
const ASCII_a = 97;
const TOT_LETTERE = 26;

// funzione modulo: come n % m (ma funziona anche coi numeri negativi)
function mod(n, m) {
    return ((n % m) + m) % m;
}

function cifraCesare(testo, chiave) {
    return testo.replace(/[a-zA-Z]/g, function(char) {
        const base = char <= 'Z' ? ASCII_A : ASCII_a;
        const nuovaPosizione = mod(char.charCodeAt(0) - base + chiave, TOT_LETTERE);
        
        return String.fromCharCode(nuovaPosizione + base);
    });
}

function decifraCesare(testo, chiave) {
    return cifraCesare(testo, -chiave);
}

function isMaiuscola(asciiCode) {
    return asciiCode >= ASCII_A && asciiCode < ASCII_A+TOT_LETTERE;
}
function isMinuscola(asciiCode) {
    return asciiCode >= ASCII_a && asciiCode < ASCII_a+TOT_LETTERE;
}

function calcolaFrequenzaLettere(testo) {
    const risultato = {};
    for (let i = 0; i < TOT_LETTERE; i++) {
        const lettera = String.fromCodePoint(ASCII_a + i);
        risultato[lettera] = 0;
    }

    let totale = 0;
    for (const carattere of testo) {
        let codiceAscii = carattere.charCodeAt(0);

        let carattereDaConteggiare = null;
        if (isMaiuscola(codiceAscii)) {
            carattereDaConteggiare = String.fromCharCode(codiceAscii + ASCII_a - ASCII_A);
        }
        else if (isMinuscola(codiceAscii)) {
            carattereDaConteggiare = String.fromCharCode(codiceAscii);
        }

        if (carattereDaConteggiare !== null) {
            if (!risultato[carattereDaConteggiare]) risultato[carattereDaConteggiare] = 1;
            else risultato[carattereDaConteggiare]++;

            totale++;
        }
    }

    Object.keys(risultato).forEach(carattere => {
        risultato[carattere] /= totale;
    });

    return risultato;
}

const frequenzaLettereIT = {
    a: 0.1174,
    b: 0.0092,
    c: 0.0450,
    d: 0.0373,
    e: 0.1179,
    f: 0.0095,
    g: 0.0164,
    h: 0.0154,
    i: 0.1128,
    l: 0.0651,
    m: 0.0251,
    n: 0.0688,
    o: 0.0983,
    p: 0.0305,
    q: 0.0051,
    r: 0.0637,
    s: 0.0498,
    t: 0.0562,
    u: 0.0301,
    v: 0.0210,
    z: 0.0049
};

function trovaLaChiave(testoCifrato) {
    const frequenzaLettereCifrato = calcolaFrequenzaLettere(testoCifrato);

    // rimuovi pure questa stampa se non ti piace
    console.log('Frequenza lettere nel messaggio cifrato:', frequenzaLettereCifrato);

    // TODO trovare la chiave usando l'analisi delle frequenze:
    // per OGNI POSSIBILE CHIAVE (da 0 a 26) calcolare l'errore: cioe' una
    // misura di quanto frequenzaLettereIT e' diverso da frequenzaLettereCifrato
    // ricordandosi di tenere in considerazione lo shift dato dalla chiave.

    return 0; // TODO restituire la chiave corrisponde all'errore minimo
}

const messaggioOriginale = "Ciao Mondo! Questo e' un test 123.";
const chiaveSegreta = 5;

const messaggioCifrato = cifraCesare(messaggioOriginale, chiaveSegreta);
console.log("Cifrato:", messaggioCifrato);

const chiaveTrovata = trovaLaChiave(messaggioCifrato);
console.log('Chiave trovata:', chiaveTrovata);

const messaggioDecifrato = decifraCesare(messaggioCifrato, chiaveTrovata);
console.log('Messaggio decifrato:', messaggioCifrato);


