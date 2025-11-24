# 🌌 Laplace Demon
**Laplace Demon** is a hybrid Random Number Generator (RNG) that challenges classical determinism. It combines **Quantum Vacuum Fluctuations** (via API) with **Atmospheric Chaos** and **Local Hardware Noise** to create a cryptographically secure, decentralized entropy pool.

It is designed for developers who need "True" randomness but refuse to trust a single point of failure (hardware or API).

> *"We may regard the present state of the universe as the effect of its past and the cause of its future... for such an intellect nothing would be uncertain."* — **Pierre-Simon Laplace (1814)**

<br>




## 🧠 The Philosophy
In classical physics, if you know the inputs, you can predict the outputs — this is Determinism. In theory, if you possessed an impossibly fast computer and knew the exact position and properties of every atom in the universe, you could calculate the entire future from the present moment. This thought experiment is known as **Laplace's Demon**. 

Most standard RNGs (`Math.random`) behave just like the Demon: they appear random, but their outputs are fully determined by their initial seed.

**Quantum Mechanics killed the Demon.** By integrating Heisenberg's Uncertainty Principle via quantum entropy sources, this library introduces fundamental indeterminacy into your code, bridging the gap between digital systems and metaphysical reality.
<br><br><br>




## 🎲 Pseudo Random VS True Random
The difference between Pseudo-Random (PRNG) and True Random (TRNG) isn't the output—it's the **predictability of the input (The Seed)**.

### 1. Pseudo-Random (PRNG)
PRNGs use a mathematical algorithm (like `Math.random()`). It requires a starting number, called a **Seed**, to begin the calculation.
* **The Flaw:** Most systems default to using **System Time** as the seed.
* **The "Loot Box" Exploit:** Imagine a game generates a "Legendary Sword" only when the internal clock ends in `.007`.
    * If a hacker knows the seed is based on time, they can write a script to open the box at the exact millisecond required.
    * The result is not random; it is **Deterministic**. If you know the *When*, you control the *What*.

### 2. True Random (TRNG)
TRNGs do not rely on linear time. They rely on **Entropy**—chaotic physical events that have no pattern.
* **The Fix:** `Laplace Demon` doesn't care what time it is. It cares about the fluctuation of vacuum energy and atmospheric pressure.
* **The Result:** Even if a hacker knows the exact millisecond you pressed the button, they cannot predict the outcome because they cannot predict the state of the universe at that moment.
<br><br><br>




## 🚀 Key Features  

### 1. Decentralized Entropy
Hardware RNGs (like Intel's `RdRand`) are "Black Boxes" that require implicit trust in the manufacturer.
* **The Problem:** History (e.g., the <a href="https://en.wikipedia.org/wiki/Dual_EC_DRBG">NSA/RSA Dual_EC_DRBG scandal</a>) shows that hardware can have backdoors.
* **The Solution:** We utilize **Entropy Aggregation**. By XOR-ing multiple independent sources (Quantum + Weather + CPU), the system remains secure even if one source is compromised.
* *As long as one source remains truly random, the final seed remains unpredictable.*

### 2. Full Control
Standard randomness is ephemeral. Once a number is generated, it is lost forever.
* **The Feature:** `Laplace Demon` allows you to **export and import seeds**.
* **Use Case:** Generate a unique universe for a game or simulation, save the seed, and reload it 10 years later to generate the *exact same* chaotic sequence.

### 3. Hybrid Architecture
True Randomness (TRNG) is physically slow.
* **The Architecture:** We use the slow, expensive "True" randomness only once to generate a high-entropy **Master Seed**.
* **The Result:** This seed fuels a high-performance Pseudo-Random Number Generator (PRNG), giving you the security of physics with the speed of mathematics.
<br><br><br>




## 🛡️ Cybersecurity Use Cases
Randomness is the backbone of digital security. `Laplace Demon` mitigates attack vectors based on seed prediction.

### 🔐 1. Cryptographic Salting
Prevent Rainbow Table attacks by generating high-entropy salts for password hashing.
$$Hash = \text{SHA256}(\text{Password} + \text{TrueRandomSalt})$$

### 🎟️ 2. Session Token Generation
Protect against **Session Hijacking**. By using quantum-derived seeds, session tokens become mathematically impossible for an attacker to predict, even if they know the server time.

### ⛓️ 3. Cryptographic Nonces
Generate "Numbers Used Once" (Nonces) for Blockchain transactions and replay-attack prevention, ensuring uniqueness at a subatomic level.
<br><br><br>




## 🌩️ Entropy Sources
| Source                | Description                                            |
| --------------------- | ------------------------------------------------------ |
| **Quantum API**       | Vacuum fluctuation data (QRNG)                         |
| **Atmospheric Noise** | Weather-based entropy (pressure, humidity, turbulence) |
| **Hardware Noise**    | CPU timing jitter, local thermal noise                 |
| **OS Entropy Pool**   | System randomness (e.g., `/dev/random`)                |

<br>



## 📦 Installation

```bash
npm install laplace-demon
```
<br>




## 🔧 Quick Start

```javascript
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
```
<br>
