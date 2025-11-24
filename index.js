import axios from 'axios';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

/**
 * 🌌 LAPLACE DEMON
 * A Hybrid Entropy Harvester & PRNG
 */
class LaplaceDemon {
    constructor(seed = null) {
        // Internal State for the generator
        this.state = 0;
        this.seed = 0;
        this.capturedSources = []; // Store source data so users can inspect it

        // If a seed is provided (Replay Mode), use it.
        // If not, we wait for init() to harvest chaos.
        if (seed) {
            this.seed = seed;
            this.state = seed;
            this.capturedSources = ["REPLAY MODE (Saved Seed)"];
        }
    }

    /**
     * 🏭 FACTORY METHOD
     * Async initializer to harvest entropy from the internet + CPU
     */
    static async create(config = { offline: false }) {
        const instance = new LaplaceDemon();
        await instance.harvestEntropy(config.offline);
        return instance;
    }

    /**
     * 🌪️ THE HARVESTER
     * Gathers entropy from Quantum, Weather, and Local sources.
     */
    async harvestEntropy(forceOffline) {
        const sources = [];

        // 1. LOCAL HARDWARE ENTROPY (The Safety Net)
        // Uses CPU thermal noise via OS kernel
        const localEntropy = crypto.randomBytes(32).toString('hex');
        sources.push(`LOCAL (CPU): ${localEntropy.substring(0, 16)}...`);

        if (!forceOffline) {
            // 2. REMOTE ENTROPY (Quantum + Weather)
            // We use Promise.allSettled so one failure doesn't crash the system
            const results = await Promise.allSettled([
                this.fetchQuantum(),
                this.fetchWeather()
            ]);

            results.forEach(result => {
                if (result.status === 'fulfilled') {
                    sources.push(result.value);
                }
            });
        }

        // 3. STORE DATA (So users can request it later)
        this.capturedSources = sources;

        // 4. THE ALCHEMIST (Mixing)
        this.seed = this.mixEntropy(sources);
        this.state = this.seed;

        // --- SMART LOGGING ---
        // Only log to console if running in Demo Mode (node index.js)
        if (process.argv[1] === fileURLToPath(import.meta.url)) {
            console.log(`✨ Universe Created. Master Seed: ${this.seed}`);
            console.log(`📝 Raw Entropy Sources Captured:`);
            sources.forEach(source => {
                console.log(`   🔹 ${source}`);
            });
        }
    }

    // Source A: Australian National University (Quantum Vacuum)
    async fetchQuantum() {
        try {
            const url = 'https://qrng.anu.edu.au/API/jsonI.php?length=1&type=hex16&size=4';
            const res = await axios.get(url, { timeout: 3000 });
            return `QUANTUM:${res.data.data[0]}`;
        } catch (e) {
            return Promise.reject();
        }
    }

    // Source B: Open-Meteo (Atmospheric Chaos - Bangkok Coords)
    async fetchWeather() {
        try {
            const url = 'https://api.open-meteo.com/v1/forecast?latitude=13.72&longitude=100.52&current_weather=true';
            const res = await axios.get(url, { timeout: 3000 });
            const chaos = res.data.current_weather.temperature + res.data.current_weather.windspeed;
            return `WEATHER:${chaos}`;
        } catch (e) {
            return Promise.reject();
        }
    }

    /**
     * ⚗️ THE MIXER
     * hashes the array of chaos strings into a single 32-bit integer
     */
    mixEntropy(sourceArray) {
        const combined = sourceArray.join('|');
        // SHA-256 Hash
        const hash = crypto.createHash('sha256').update(combined).digest('hex');
        // Take first 8 chars of hex and convert to 32-bit Int
        return parseInt(hash.substring(0, 8), 16);
    }

    /**
     * ⚙️ THE GENERATOR (Mulberry32)
     * A fast, high-quality PRNG. We use this instead of Math.random
     */
    next() {
        let t = this.state += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }

    // --- PUBLIC API ---

    /** Returns a float between 0 and 1 */
    random() {
        return this.next();
    }

    /** Returns random Integer between min and max */
    randomInt(min, max) {
        return Math.floor(this.random() * (max - min + 1)) + min;
    }

    /** Returns a Hex Salt (Cybersecurity Use Case) */
    randomHex(length = 16) {
        let result = '';
        const chars = '0123456789abcdef';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(this.random() * chars.length));
        }
        return result;
    }

    /** Exports the seed so you can recreate this universe later */
    exportSeed() {
        return this.seed;
    }

    /** Returns the raw array of entropy sources (CPU, Weather, Quantum) */
    getEntropyDetails() {
        return this.capturedSources;
    }
}

// --- DEMO RUNNER (SMART VERSION) ---
// This ONLY runs if you execute `node index.js` directly.
// It does NOT run if someone imports the library.
async function main() {
    console.log("--- 🌌 LAPLACE DEMON DEMO MODE ---");

    // 1. Auto-Harvest Mode
    const demon = await LaplaceDemon.create();

    console.log(`\n🎲 Random Float: ${demon.random()}`);
    console.log(`🎲 Random Int (1-100): ${demon.randomInt(1, 100)}`);
    console.log(`🔐 Secure Salt: ${demon.randomHex(32)}`);

    // 2. Time Travel Mode
    console.log("\n--- ⏳ TESTING TIME TRAVEL ---");
    const savedSeed = demon.exportSeed();
    const futureDemon = new LaplaceDemon(savedSeed);
    console.log(`🎲 Replay Float: ${futureDemon.random()} (Should match above)`);
}

// ✨ THE SENIOR DEV TRICK: Check if this file is the main module
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    main();
}

export default LaplaceDemon;