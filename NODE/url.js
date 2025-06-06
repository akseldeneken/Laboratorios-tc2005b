const miUrl = new URL('https://www.ejemplo.org/cursos/programacion?ordenar=vistas&nivel=1');

console.log(miUrl.hostname);

console.log(miUrl.pathname);

console.log(miUrl.searchParams.get('ordenar'));