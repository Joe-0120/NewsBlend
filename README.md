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

1. Navigate to the frontend folder
2. Install dependencies:

```bash
 npm install
```

4. Start the Expo app:

```bash
npm run web
```

---

## Team

- Anh Vi Mac
- Jananaa Mahathevan
- Oleksandra Tsurkan
- Othmane Sbi
- Youssef Ouakaa
