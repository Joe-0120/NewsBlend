# NewsBlend Prototype

**NewsBlend** is a mobile-first news aggregator tailored for Generation Z. It features a modern UI, interactive features, and delivers credible news from trusted sources — all built with React Native (Expo) and Flask.

---

## Tech Stack

- **Frontend**: React Native (Expo + TypeScript + Expo Router)
- **Backend**: Flask (Python) with mock news API
- **API Communication**: REST (JSON)
- **Design Tools**: Figma (UI/UX)
- **Testing**: Expo Go or simulator

---

## Folder Structure

```
newsblend/
├── backend/           # Flask server
│   ├── app.py
│   └── requirements.txt
│
├── frontend/          # Expo + TS + Router app
│   ├── app/
│   │   └── (tabs)/
│   │       └── index.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
│
└── README.md
```

---

## Getting Started

### Backend Setup (Flask)

1. Open a terminal and navigate to the project folder:

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Start the server:

   ```bash
   python app.py
   ```

4. The API will run at:

   ```
   http://localhost:5000/api/news
   ```

---

### Frontend Setup (Expo + TypeScript)

#### Step 1: Navigate to the frontend directory
```bash
cd frontend
```

#### Step 2: Install dependencies
```bash
npm install -g expo-cli
npm install
```

#### Step 3: Start the Expo development server
```bash
npx expo start --no-dev --minify
```

This will:
- Launch the Metro Bundler in your terminal or browser
- Display a QR code to open the app in **Expo Go**

---

### Running the App on a Physical Device

1. Install **Expo Go** from the Play Store or App Store
2. Make sure your phone is on the **same Wi-Fi network** as your computer
3. Scan the QR code from the terminal or browser
4. The app will launch automatically

---

## Team

- Anh Vi Mac
- Jananaa Mahathevan
- Oleksandra Tsurkan
- Othmane Sbi
- Youssef Ouakaa
