# Trăiește viața în scaun cu rotile

Un joc educațional interactiv de tip storytelling care explorează experiența de viață a unei persoane cu dizabilități, dezvoltat în React Native cu Expo.

## 📱 Despre Joc

Acest joc oferă o experiență narativă interactivă care ajută jucătorii să înțeleagă provocările și triumfurile vieții cu dizabilități. Prin alegeri multiple și consecințe realiste, jocul promovează empatia și conștientizarea asupra experiențelor persoanelor în scaun cu rotile.

### 🎯 Obiective

- **Educațional**: Creșterea conștientizării asupra provocărilor dizabilității
- **Empatic**: Dezvoltarea înțelegerii și empatiei
- **Inclusiv**: Promovarea incluziunii sociale și accesibilității

## 🎮 Caracteristici

### Gameplay
- **3 Scene Principale**: Facultatea, Locul de Muncă, Viața în Locuință
- **Sistem de Alegeri**: Decizii multiple care afectează progresul
- **Bare de Progres**: Urmărirea stării personale și relațiilor sociale
- **Momente Introspective**: Reflecții la sfârșitul fiecărei scene
- **Finaluri Multiple**: Rezultate bazate pe alegerile jucătorului
- **Selecție Personaj**: Alege între personaje masculine și feminine cu nume personalizat

### Interface
- **Design Accesibil**: Contrast ridicat și tipografie clară
- **Animații Subtile**: Tranziții fluide și feedback vizual
- **Responsive**: Optimizat pentru dispozitive mobile
- **Navigare Intuitivă**: Tab-uri pentru secțiuni diferite
- **Gradient-uri Moderne**: Design vizual atractiv cu culori vibrante

## 🛠️ Tehnologii Utilizate

- **React Native** - Framework pentru dezvoltare mobilă
- **Expo** - Platformă de dezvoltare și deployment
- **TypeScript** - Tipizare statică pentru JavaScript
- **Expo Router** - Navigare bazată pe fișiere
- **React Native Reanimated** - Animații performante
- **Lucide React Native** - Iconuri moderne
- **Expo Linear Gradient** - Gradient-uri vizuale

## 📦 Instalare și Rulare

### Cerințe
- Node.js (versiunea 18 sau mai nouă)
- npm sau yarn
- Expo CLI (opțional, pentru comenzi suplimentare)

### Pași de instalare

1. **Clonează repository-ul**
```bash
git clone [repository-url]
cd project-licenta-joc-educational
```

2. **Instalează dependențele**
```bash
npm install
```

3. **Pornește aplicația**
```bash
npm run dev
```

4. **Accesează aplicația**
- **Web**: Deschide browserul la adresa afișată în terminal
- **Mobile**: Scanează QR code-ul cu aplicația Expo Go

## 🎯 Structura Jocului

### Scene și Progresie

#### 1. Facultatea
- Prima zi în cămin (lift defect)
- Organizarea în grupuri pentru proiecte
- Invitații sociale și accesibilitate

#### 2. Locul de Muncă
- Primul job și adaptările necesare
- Team building și activități sociale
- Gestionarea comentariilor nepotrivite

#### 3. Viața în Locuință
- Căutarea unui apartament
- Relații cu vecinii
- Planificarea călătoriilor

### Sistem de Progres

#### Stare Personală (0-100%)
- **Încredere**: Sentimentul de siguranță în propriile abilități
- **Speranță**: Optimismul față de viitor
- **Resemnare**: Acceptarea pasivă a situațiilor
- **Dezamăgire**: Sentimentele negative față de experiențe

#### Relații Sociale (0-100%)
- **Sociabilitate**: Capacitatea de a interacționa cu alții
- **Integrare**: Sentimentul de apartenență la comunitate
- **Izolare**: Tendința de retragere socială
- **Suport**: Rețeaua de sprijin disponibilă

### Finaluri Posibile

#### 🌟 Pozitiv - "Integrare și Succes"
- Stare medie: 70%+
- Relații puternice și stare emoțională pozitivă
- Devine avocat pentru incluziune

#### ⚖️ Neutru - "Echilibru și Acceptare"
- Stare medie: 40-69%
- Echilibru între provocări și succese
- Dezvoltă strategii de adaptare

#### 🆘 Negativ - "Reflecție și Speranță"
- Stare medie: sub 40%
- Momente dificile și provocări majore
- Include resurse de ajutor și sprijin

## 🔒 Conținut Sensibil și Siguranță

### Avertismente
- Jocul conține teme sensibile legate de sănătatea mentală
- Include situații de discriminare și provocări sociale
- Poate afecta emoțional unii jucători

### Resurse de Ajutor
- **Telefonul de Suflet**: 116 123 (24/7)
- **Asociația pentru Dizabilități**: 021.222.2222
- **Centrul de Consiliere**: 0800.801.200

### Măsuri de Siguranță
- Disclaimer clar la începutul jocului
- Resurse de ajutor vizibile permanent
- Opțiune de resetare și ieșire din joc
- Conținut educațional, nu glorificare

## 📁 Structura Proiectului

```
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Ecran principal
│   │   ├── game.tsx           # Logica jocului
│   │   ├── about.tsx          # Informații despre joc
│   │   └── _layout.tsx        # Layout tab-uri
│   ├── _layout.tsx            # Layout principal
│   └── +not-found.tsx         # Pagina 404
├── components/
│   ├── ProgressBar.tsx        # Bara de progres animată
│   ├── StoryDisplay.tsx       # Afișarea poveștii
│   └── ChoiceButton.tsx       # Butoane pentru alegeri
├── data/
│   └── gameData.ts           # Date și logica jocului
├── hooks/
│   └── useFrameworkReady.ts  # Hook pentru inițializare
└── assets/                   # Imagini și resurse
```

## 🎨 Design și Accesibilitate

### Paleta de Culori
- **Primar**: #3B82F6 (Albastru)
- **Succes**: #10B981 (Verde)
- **Atenție**: #F59E0B (Galben)
- **Eroare**: #EF4444 (Roșu)
- **Fundal**: #1E293B → #334155 (Gradient întunecat)

### Principii de Accesibilitate
- Contrast ridicat pentru text (WCAG AA)
- Dimensiuni mari pentru butoane (min 44px)
- Iconuri descriptive pentru toate acțiunile
- Feedback vizual clar pentru interacțiuni
- Suport pentru screen readers

## 🚀 Deployment

### Web
```bash
npm run build:web
```

### Mobile (Development Build)
```bash
# iOS
expo build:ios

# Android
expo build:android
```

## 🤝 Contribuții

Acest proiect a fost creat cu scopul educațional și de conștientizare. Contribuțiile sunt binevenite, în special:

- Îmbunătățiri de accesibilitate
- Traduceri în alte limbi
- Scenarii suplimentare realiste
- Optimizări de performanță

### Ghid pentru Contribuții
1. Fork repository-ul
2. Creează o branch pentru feature (`git checkout -b feature/nume-feature`)
3. Commit modificările (`git commit -m 'Adaugă feature nou'`)
4. Push la branch (`git push origin feature/nume-feature`)
5. Deschide un Pull Request

## 📄 Licență

Acest proiect este dezvoltat pentru scopuri educaționale și de conștientizare. Utilizarea comercială necesită permisiune explicită.

## 🙏 Mulțumiri

Mulțumim tuturor persoanelor care au contribuit cu experiențele lor pentru a face acest proiect posibil și organizațiilor care promovează incluziunea și accesibilitatea.

## 📞 Contact și Suport

Pentru întrebări, sugestii sau raportarea problemelor:
- Deschide un issue în repository
- Contactează echipa de dezvoltare

---

**Notă Importantă**: Acest joc abordează teme sensibile. Dacă te simți afectat de conținut, te rugăm să contactezi o linie de ajutor sau să iei o pauză. Sănătatea ta mentală este prioritatea numărul unu.