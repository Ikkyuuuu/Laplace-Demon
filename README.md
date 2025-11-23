# 🌌 Laplace Demon

**Laplace Demon** is a hybrid Random Number Generator (RNG) that challenges classical determinism. It combines **Quantum Vacuum Fluctuations** (via API) with **Atmospheric Chaos** and **Local Hardware Noise** to create a cryptographically secure, decentralized entropy pool.

It is designed for developers who need "True" randomness but refuse to trust a single point of failure (hardware or API).

> *"We may regard the present state of the universe as the effect of its past and the cause of its future... for such an intellect nothing would be uncertain."* — **Pierre-Simon Laplace (1814)**

## 🧠 The Philosophy
In classical physics, if you know the inputs, you can predict the outputs (Determinism). This concept is known as **Laplace's Demon**. Most standard RNGs (`Math.random`) are demons: they look random, but they are mathematically predictable.

**Quantum Mechanics killed the Demon.** By integrating Heisenberg's Uncertainty Principle via quantum entropy sources, this library introduces fundamental indeterminacy into your code, bridging the gap between digital systems and metaphysical reality.

## 🚀 Key Features

### 1. Decentralized Entropy ("The Snowden Defense")
Hardware RNGs (like Intel's `RdRand`) are "Black Boxes" that require implicit trust in the manufacturer.
* **The Problem:** History (e.g., the NSA/RSA Dual_EC_DRBG scandal) shows that hardware can have backdoors.
* **The Solution:** We utilize **Entropy Aggregation**. By XOR-ing multiple independent sources (Quantum + Weather + CPU), the system remains secure even if one source is compromised.
* *As long as one source remains truly random, the final seed remains unpredictable.*

### 2. Full Control (Time Travel Mode)
Standard randomness is ephemeral. Once a number is generated, it is lost forever.
* **The Feature:** `laplace-demon` allows you to **export and import seeds**.
* **Use Case:** Generate a unique universe for a game or simulation, save the seed, and reload it 10 years later to generate the *exact same* chaotic sequence.

### 3. Hybrid Architecture (Infinite Speed)
True Randomness (TRNG) is physically slow.
* **The Architecture:** We use the slow, expensive "True" randomness only once to generate a high-entropy **Master Seed**.
* **The Result:** This seed fuels a high-performance Pseudo-Random Number Generator (PRNG), giving you the security of physics with the speed of mathematics.

## 🛡️ Cybersecurity Use Cases
Randomness is the backbone of digital security. `laplace-demon` mitigates attack vectors based on seed prediction.

### 🔐 1. Cryptographic Salting
Prevent Rainbow Table attacks by generating high-entropy salts for password hashing.
$$Hash = \text{SHA256}(\text{Password} + \text{TrueRandomSalt})$$

### 🎟️ 2. Session Token Generation
Protect against **Session Hijacking**. By using quantum-derived seeds, session tokens become mathematically impossible for an attacker to predict, even if they know the server time.

### ⛓️ 3. Cryptographic Nonces
Generate "Numbers Used Once" (Nonces) for Blockchain transactions and replay-attack prevention, ensuring uniqueness at a subatomic level.

## 📦 Installation

```bash
npm install laplace-demon
