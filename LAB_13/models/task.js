const tareas = [];

module.exports = class Task {
    constructor(titulo, descripcion) {
        this.titulo = titulo;
        this.descripcion = descripcion;
    }

    save() {
        tareas.push(this);
    }

    static fetchAll() {
        return tareas;
    }

    static searchByTitle(query) {
    return tareas.filter(t => t.titulo.toLowerCase().includes(query.toLowerCase()));
}

}
