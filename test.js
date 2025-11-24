import LaplaceDemon from "laplace-demon";

console.log("👾 Demon Initializing...\n");
const demon = await LaplaceDemon.create();

const sources = demon.getEntropyDetails();
if (sources) sources.forEach(s => console.log(`🔹 ${s}`));

console.log(`\n🎲 Float:  ${demon.random()}`);
console.log(`🎲 Int:    ${demon.randomInt(1, 100)}`);
console.log(`🔐 Salt:   ${demon.randomHex(32)}\n`);

const seed = demon.exportSeed();
console.log(`💾 Seed:   ${seed}\n`);

const replay = new LaplaceDemon(seed);
console.log(`🔄 Replay: ${replay.random()}\n`);