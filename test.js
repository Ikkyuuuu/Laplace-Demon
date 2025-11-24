import LaplaceDemon from "laplace-demon";

// 1. Initialize (Top-level await works in ES Modules!)
console.log("👾 Demon Initializing...\n");
const demon = await LaplaceDemon.create();

// 2. Inspect Entropy
const sources = demon.getEntropyDetails();
if (sources) sources.forEach(s => console.log(`🔹 ${s}`));

// 3. Generate
console.log(`\n🎲 Float:  ${demon.random()}`);
console.log(`🎲 Int:    ${demon.randomInt(1, 100)}`);
console.log(`🔐 Salt:   ${demon.randomHex(32)}\n`);

// 4. Time Travel
const seed = demon.exportSeed();
console.log(`💾 Seed:   ${seed}\n`);

const replay = new LaplaceDemon(seed);
console.log(`🔄 Replay: ${replay.random()}\n`);