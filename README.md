# Living Life in a Wheelchair

An interactive educational storytelling game that explores the life experience of a person with disabilities, built with React Native and Expo.

## 📱 About the Game

This game offers an interactive narrative experience that helps players understand the challenges and triumphs of living with disabilities. Through multiple choices and realistic consequences, the game promotes empathy and awareness about the experiences of people in wheelchairs.

### 🎯 Objectives

- **Educational**: Raising awareness about disability challenges
- **Empathetic**: Developing understanding and empathy
- **Inclusive**: Promoting social inclusion and accessibility

## 🎮 Features

### Gameplay
- **3 Main Scenes**: University, Workplace, Housing Life
- **Choice System**: Multiple decisions that affect progression
- **Progress Bars**: Tracking personal state and social relationships
- **Introspective Moments**: Reflections at the end of each scene
- **Multiple Endings**: Results based on player choices
- **Character Selection**: Choose between male and female characters with custom names

### Interface
- **Accessible Design**: High contrast and clear typography
- **Subtle Animations**: Smooth transitions and visual feedback
- **Responsive**: Optimized for mobile devices
- **Intuitive Navigation**: Tabs for different sections
- **Modern Gradients**: Attractive visual design with vibrant colors

## 🛠️ Technologies Used

- **React Native** - Mobile development framework
- **Expo** - Development and deployment platform
- **TypeScript** - Static typing for JavaScript
- **Expo Router** - File-based navigation
- **React Native Reanimated** - High-performance animations
- **Lucide React Native** - Modern icons
- **Expo Linear Gradient** - Visual gradients

## 📦 Installation and Setup

### Requirements
- Node.js (version 18 or newer)
- npm or yarn
- Expo CLI (optional, for additional commands)

### Installation Steps

1. **Clone the repository**
```bash
git clone [repository-url]
cd project-licenta-joc-educational
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the application**
```bash
npm run dev
```

4. **Access the application**
- **Web**: Open browser at address shown in terminal
- **Mobile**: Scan QR code with Expo Go app

## 🎯 Game Structure

### Scenes and Progression

#### 1. University
- First day in dorm (broken elevator)
- Group organization for projects
- Social invitations and accessibility

#### 2. Workplace
- First job and required adaptations
- Team building and social activities
- Managing inappropriate comments

#### 3. Housing Life
- Searching for an apartment
- Relationships with neighbors
- Planning trips

### Progress System

#### Personal State (0-100%)
- **Confidence**: Feeling secure in one's abilities
- **Hope**: Optimism towards the future
- **Resignation**: Passive acceptance of situations
- **Disappointment**: Negative feelings towards experiences

#### Social Relationships (0-100%)
- **Sociability**: Ability to interact with others
- **Integration**: Feeling of belonging to community
- **Isolation**: Tendency to withdraw socially
- **Support**: Available support network

### Possible Endings

#### 🌟 Positive - "Integration and Success"
- Average state: 70%+
- Strong relationships and positive emotional state
- Becomes an advocate for inclusion

#### ⚖️ Neutral - "Balance and Acceptance"
- Average state: 40-69%
- Balance between challenges and successes
- Develops adaptation strategies

#### 🆘 Negative - "Reflection and Hope"
- Average state: under 40%
- Difficult moments and major challenges
- Includes help and support resources

## 📁 Project Structure

```
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Main screen
│   │   ├── game.tsx           # Game logic
│   │   ├── about.tsx          # About game info
│   │   └── _layout.tsx        # Tabs layout
│   ├── _layout.tsx            # Main layout
│   └── +not-found.tsx         # 404 page
├── components/
│   ├── AnimatedCharacter.tsx  # Animated character
│   ├── CharacterSelection.tsx # Character selection
│   ├── ChoiceButton.tsx       # Choice buttons
│   ├── ProgressBar.tsx        # Animated progress bar
│   ├── SceneBackground.tsx    # Scene background
│   └── StoryDisplay.tsx       # Story display
├── data/
│   └── gameData.ts           # Game data and config
├── hooks/
│   └── useFrameworkReady.ts  # Initialization hook
├── utils/
│   ├── gameStateMachine.ts   # Game state machine
│   ├── localMetrics.ts       # Local metrics tracking
│   └── storyGraphManager.ts  # Story graph manager
├── assets/
│   ├── images/
│   │   ├── backgrounds/      # Scene backgrounds
│   │   │   ├── home-bg.jpg
│   │   │   ├── office-bg.jpg
│   │   │   └── university-bg.jpg
│   │   └── icons/           # App icons
│   └── fonts/               # Custom fonts
├── docs/
│   ├── GAMIFICATION_METRICS.md    # Metrics documentation
│   └── GRAPH_THEORY_DOCUMENTATION.md # Graph theory docs
├── package.json             # Dependencies and scripts
├── tsconfig.json           # TypeScript config
├── app.json                # Expo configuration
└── README.md               # Project documentation
```

## 🎨 Design and Accessibility

### Color Palette
- **Primary**: #3B82F6 (Blue)
- **Success**: #10B981 (Green)
- **Attention**: #F59E0B (Yellow)
- **Error**: #EF4444 (Red)
- **Background**: #1E293B → #334155 (Dark gradient)

### Accessibility Principles
- High contrast for text (WCAG AA)
- Large button sizes (min 44px)
- Descriptive icons for all actions
- Clear visual feedback for interactions
- Support for screen readers

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

## 🤝 Contributions

This project was created for educational and awareness purposes. Contributions are welcome, especially:

- Accessibility improvements
- Translations to other languages
- Additional realistic scenarios
- Performance optimizations

### Contribution Guide
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/name-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/name-feature`)
5. Open a Pull Request

## 📄 License

This project is developed for educational and awareness purposes. Commercial use requires explicit permission.

## 🙏 Acknowledgments

Thank you to everyone who contributed their experiences to make this project possible and organizations promoting inclusion and accessibility.


---
