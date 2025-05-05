function countLetters(word) {
    let count = {};
    let split = word.split('')
    for (let i of split) {
        if (count[i]) {
            count[i]++;
        } else {
            count[i] = 1;
        }        
    }
    console.log("Conteo de letras:");
for (let letra in count) {
    console.log(`${letra}: ${count[letra]}`);
}
}

countLetters("banana");
