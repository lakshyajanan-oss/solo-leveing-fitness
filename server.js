const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simulated Centralized Database Matrix (In-Memory for zero-config Render deployment)
// For permanent production scale, this maps directly to a MongoDB collection
const globalHunterRegistry = {};

// 1. AUTHENTICATION ENGINE: Register Hunter Identity
app.post('/api/auth/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ success: false, error: "Invalid credentials." });
    }
    if (globalHunterRegistry[username.toLowerCase()]) {
        return res.status(400).json({ success: false, error: "Hunter identity already exists." });
    }

    // Initialize default base stats for the new user profile
    globalHunterRegistry[username.toLowerCase()] = {
        password: password, // In production, hash this using bcrypt
        hunterData: {
            level: 1,
            exp: 0,
            nextLevelExp: 100,
            rank: 'E-RANK',
            unit: 'metric',
            stats: { STR: 10, AGI: 10, VIT: 10, INT: 10 },
            selectedDays: [],
            isPenaltyMode: false,
            initialized: false
        }
    };

    res.json({ success: true, message: "Hunter identity successfully registered to the system." });
});

// 2. AUTHENTICATION ENGINE: Login/Awaken Profile
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    const user = globalHunterRegistry[username.toLowerCase()];

    if (!user || user.password !== password) {
        return res.status(401).json({ success: false, error: "Access Denied. Incorrect Identity Signatures." });
    }

    res.json({ success: true, hunterData: user.hunterData });
});

// 3. PERSISTENCE ENGINE: Cloud Save Progress Synchronization
app.post('/api/hunter/sync', (req, res) => {
    const { username, hunterData } = req.body;
    if (!username || !globalHunterRegistry[username.toLowerCase()]) {
        return res.status(404).json({ success: false, error: "Identity link severed." });
    }

    // Save progress instantly to the server database
    globalHunterRegistry[username.toLowerCase()].hunterData = hunterData;
    res.json({ success: true, message: "System core state fully synced to cloud database." });
});

// 4. FITNESS PLANNER: Trusted Scientific Core Engine (NASM/ACE)
app.post('/api/generate-plan', (req, res) => {
    const { weight, height, age, goal, daysPerWeek, unit } = req.body;
    const weightKg = unit === 'lbs' ? Math.round(weight * 0.453592) : parseInt(weight);
    const heightCm = parseInt(height);
    const bmr = Math.round((10 * weightKg) + (6.25 * heightCm) - (5 * parseInt(age)) + 5);
    
    let trainingBlock = 'Functional General Physical Preparedness';
    let dailyQuests = [
        { name: "Dominator Pull-Push Matrix", desc: "3 Sets: Maximum Pull-Ups/Rows, 15 Classic Form Push-Ups", category: "STR", points: 20 },
        { name: "Hunters Agility Drill", desc: "15 Minutes Shadowboxing or Jump Rope high pace intervals", category: "AGI", points: 20 },
        { name: "Endurance Awakening", desc: "20 Minutes Steady State Zone 2 Running or Cycling", category: "VIT", points: 20 },
        { name: "Mobility Protocol", desc: "Full-body dynamic yoga and active joint decompression sequence", category: "INT", points: 15 }
    ];

    if (goal === 'fat_loss') {
        trainingBlock = 'High-Density Metabolic Conditioning Block';
        dailyQuests = [
            { name: "Shadow Step Sprint", desc: "4 Rounds: 30s High Knees, 30s Mountain Climbers, 30s Rest", category: "AGI", points: 15 },
            { name: "Iron Will Circuit", desc: "3 Sets: 15 Bodyweight Squats, 12 Push-ups, 30s Plank", category: "STR", points: 20 },
            { name: "Gate Clearance", desc: "30 Minutes of continuous LISS Cardiovascular work", category: "VIT", points: 25 }
        ];
    } else if (goal === 'muscle_gain') {
        trainingBlock = 'Hypertrophy Mechanical Tension Block';
        dailyQuests = [
            { name: "Monarch Overload Push", desc: "4 Sets: 12 Decline Push-Ups, 10 Diamond Push-Ups", category: "STR", points: 25 },
            { name: "Beast King Lower Core", desc: "4 Sets: 15 Deep Bulgarian Split Squats per leg", category: "STR", points: 25 },
            { name: "Mana Replenishment", desc: "Consume optimal protein target requirement and sleep completely", category: "INT", points: 10 }
        ];
    }

    res.json({ success: true, blockName: trainingBlock, bmrEstimate: bmr, quests: dailyQuests, targetDays: daysPerWeek });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`The Authentication System is active on node port: ${PORT}`);
});
