//const curso = require('./curso.json');

//console.log(curso.temas);

let infoCurso = {
    "titulo": "Aprende Node.jd",
    "numVistas": 45642,
    "numLikes": 21123,
    "temas": [
        "JavaScript",
        "Node.js"
    ],
    "esPublico": true
};

let infoCursoJSON = JSON.stringify(infoCurso);

console.log(infoCursoJSON);
console.log(typeof infoCursoJSON);

let infoCursoOBJ = JSON.parse(infoCursoJSON);

console.log(infoCursoOBJ);
console.log(typeof infoCursoOBJ);