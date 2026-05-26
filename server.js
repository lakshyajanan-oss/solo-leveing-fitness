const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Trusted Algorithmic Fitness Planner based on NASM & ACE Guidelines
app.post('/api/generate-plan', (req, res) => {
    const { weight, height, age, goal, daysPerWeek, unit } = req.body;
    
    // Convert units internally to metric for scientific formulas if imperial provided
    const weightKg = unit === 'lbs' ? Math.round(weight * 0.453592) : parseInt(weight);
    const heightCm = parseInt(height);
    
    // Calculate Base Metabolic Rate (BMR) via Mifflin-St Jeor Equation
    const bmr = Math.round((10 * weightKg) + (6.25 * heightCm) - (5 * parseInt(age)) + 5);
    
    let trainingBlock = '';
    let dailyQuests = [];

    // Algorithmic Selection Based on Professional Fitness Goals
    if (goal === 'fat_loss') {
        trainingBlock = 'High-Density Metabolic Conditioning Block';
        dailyQuests = [
            { name: "Shadow Step Sprint", desc: "4 Rounds: 30s High Knees, 30s Mountain Climbers, 30s Rest", category: "AGI", points: 15 },
            { name: "Iron Will Circuit", desc: "3 Sets: 15 Bodyweight Squats, 12 Push-ups, 30s Plank", category: "STR", points: 20 },
            { name: "Gate Clearance", desc: "30 Minutes of continuous LISS Cardiovascular work (Paced Walking/Jogging)", category: "VIT", points: 25 },
            { name: "Hunter Rejuvenation", desc: "Consume target hydration volume & complete 10 mins targeted stretching", category: "INT", points: 10 }
        ];
    } else if (goal === 'muscle_gain') {
        trainingBlock = 'Hypertrophy Mechanical Tension Block';
        dailyQuests = [
            { name: "Monarch Overload Push", desc: "4 Sets: 12 Decline Push-Ups (or weighted pushups), 10 Diamond Push-Ups", category: "STR", points: 25 },
            { name: "Beast King Lower Core", desc: "4 Sets: 15 Deep Bulgarian Split Squats per leg, 20 Calf Raises", category: "STR", points: 25 },
            { name: "Explosive Burst Work", desc: "3 Sets: 10 Squat Jumps, 12 Burpees for fast twitch muscle recruitment", category: "AGI", points: 15 },
            { name: "Mana Replenishment", desc: "Consume optimal protein target requirement and follow with complete sleep cycles", category: "INT", points: 10 }
        ];
    } else { // Balance / Athletic Performance
        trainingBlock = 'Functional General Physical Preparedness Block';
        dailyQuests = [
            { name: "Dominator Pull-Push Matrix", desc: "3 Sets: Maximum Pull-Ups/Inverted Rows, 15 Classic Form Push-Ups", category: "STR", points: 20 },
            { name: "Hunters Agility Drill", desc: "15 Minutes Shadowboxing or Jump Rope high pace intervals", category: "AGI", points: 20 },
            { name: "Endurance Awakening", desc: "20 Minutes Steady State Zone 2 Running or Cycling", category: "VIT", points: 20 },
            { name: "Mobility Protocol", desc: "Full-body dynamic yoga and active joint decompression sequence", category: "INT", points: 15 }
        ];
    }

    res.json({
        success: true,
        blockName: trainingBlock,
        bmrEstimate: bmr,
        quests: dailyQuests,
        targetDays: daysPerWeek
    });
});

// Always route back to Index for clean frontend SPA operations
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`The System is active on terminal node port: ${PORT}`);
});
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
