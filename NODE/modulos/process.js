console.log(process);
console.log(process.env);
console.log(process.argv[2]);
console.log(process.argv[3]);

for (let i = 2; i < process.argv.length; i++) {
    console.log(process.argv[i]);
}

console.log(process.memoryUsage());