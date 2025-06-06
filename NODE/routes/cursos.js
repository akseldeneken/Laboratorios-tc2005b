const { info } = require("console")

let infoCursos = {
    'programacion' : [
        {
            id: 1,
            titulo: 'aprende pyhton',
            lenguaje: 'python',
            vistas: 3929293,
            nivel: 'basico'
        },
        {
            id: 2,
            titulo: 'python intermedio',
            lenguaje: 'python',
            vistas: 399293,
            nivel: 'intermedio'
        },
        {
            id: 3,
            titulo: 'Aprende Javascript',
            lenguaje: 'JavaScript',
            vistas: 203843,
            nivel: 'basico'
        }
    ],
    'matematicas': [
        {
            id: 1,
            titulo: 'Aprende Calculo',
            tema: 'Calculo',
            vistas: 98993,
            nivel: 'basico'
        },
        {
           id: 2,
           titulo: 'Aprende Algebra',
           tema: 'algebra',
           vistas: 39820,
           nivel: 'intermedio' 
        }

    ]
}

module.exports.infoCursos = infoCursos;