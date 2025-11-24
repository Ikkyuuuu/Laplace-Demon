import LaplaceDemon from "laplace-demon";

// Main Async Wrapper
async function runTest() {
    console.log("--- 🧪 STARTING SYSTEM TEST ---");

    // 1. INITIALIZE (Harvest Entropy)
    console.log("\n📡 Initializing Demon...");
    const demon = await LaplaceDemon.create();

    // 2. INSPECT THE SOURCES (The new feature!)
    // This proves to the user exactly where the randomness came from.
    console.log("\n📝 Entropy Source Inspection:");
    const sources = demon.getEntropyDetails();

    if (sources && sources.length > 0) {
        sources.forEach(source => {
            console.log(`   🔹 ${source}`);
        });
    } else {
        console.log("   ⚠️ No source details available (Did you update the library?)");
    }

    // 3. GENERATE VALUES
    console.log("\n🎲 Generation Test:");
    const floatVal = demon.random();
    const intVal = demon.randomInt(1, 100);
    const hexSalt = demon.randomHex(32);

    console.log(`   TYPE      | VALUE`);
    console.log(`   ----------|----------------------------------------`);
    console.log(`   Float     | ${floatVal}`);
    console.log(`   Integer   | ${intVal}`);
    console.log(`   Salt      | ${hexSalt}`);

    // 4. TIME TRAVEL TEST (Determinism Check)
    console.log("\n⏳ Time Travel (Replay) Test:");

    // A. Export the seed
    const savedSeed = demon.exportSeed();
    console.log(`   💾 Saved Universe Seed:  ${savedSeed}`);

    // B. Create a NEW demon using that OLD seed
    const replayDemon = new LaplaceDemon(savedSeed);

    // C. Generate the "next" number from the replay demon
    // (It should mathematically match the 'floatVal' we generated earlier if we reset state, 
    // but since 'floatVal' was already consumed, let's verify the NEXT number in the sequence)
    // NOTE: A fresh demon with the same seed starts at the BEGINNING.
    // So replayDemon.random() should equal the VERY FIRST floatVal we got above.

    const replayVal = replayDemon.random();
    console.log(`   🔄 Replayed Value:       ${replayVal}`);

    // 5. VERIFICATION
    if (floatVal === replayVal) {
        console.log("\n✅ SUCCESS: Determinism Confirmed. The universe was reloaded perfectly.");
    } else {
        console.log("\n❌ FAILURE: Values do not match. Check seeding logic.");
    }

    console.log("\n--- 🏁 TEST COMPLETE ---");
}

runTest();