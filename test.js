import LaplaceDemon from "laplace-demon";

// 1. Initialize (Harvests Entropy from APIs + CPU)
// This is async because it fetches data from Quantum/Weather APIs
const demon = await LaplaceDemon.create();

// 2. Generate a secure random number
const n = demon.random();
console.log(`True Random Value: ${n}`);

// 3. Time Travel (Export & Replay)
// Save the 'seed' to recreate this exact universe later
const seed = demon.exportSeed();
const replay = new LaplaceDemon(seed);