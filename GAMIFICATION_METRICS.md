
# Gamification and Player Engagement Metrics

This document outlines key metrics for evaluating the effectiveness, engagement, and educational impact of the "Trăiește viața în scaun cu rotile" game.

## Currently Implemented Metrics

The following metrics are actively tracked and stored locally on each device:

### Basic Engagement Metrics
- `playthroughsStarted`: Number of times a player has started the game (character selection completed)
- `playthroughsCompleted`: Number of times a player has reached an ending
- `characterSelections.male`: Count of times male character was selected
- `characterSelections.female`: Count of times female character was selected

### Outcome Metrics
- `endings.positive`: Count of positive endings achieved (avgState >= 70)
- `endings.neutral`: Count of neutral endings achieved (40 <= avgState < 70)
- `endings.negative`: Count of negative endings achieved (avgState < 40)

### Choice Analytics
- `choices`: Object mapping each choice ID to the number of times it was selected
  - Tracks all player decisions across all scenes and steps
  - Enables analysis of choice popularity and player behavior patterns

### Player State Tracking
- **Stare Personală (Personal State)**: Currently displayed in final stats (0-100 scale)
- **Relații Sociale (Social Relations)**: Currently displayed in final stats (0-100 scale)

## Top 5 Recommended Additional Metrics

### 1. Final State Distribution Tracking
Track the distribution of final `personalState` and `socialRelations` values across all completed games. This would provide insights into the overall emotional journey and social integration success of players.

### 2. Session Duration Analytics
Measure time spent from character selection to game completion. This indicates engagement level and can help identify if the game length is appropriate for the target audience.

### 3. Introspection Choice Analysis
Track positive vs negative introspection choices at the end of each scene. This directly measures the player's emotional state and perception of their journey through each life area.

### 4. Completion Rate Calculation
Implement automatic calculation of completion rate (`playthroughsCompleted / playthroughsStarted * 100`) to measure how compelling the narrative is in retaining players until the end.

### 5. Scene-Specific Drop-off Tracking
Identify at which specific scene or step players are most likely to exit the game. This helps pinpoint parts of the story that may be confusing, frustrating, or disengaging, allowing for targeted improvements.
