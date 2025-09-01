
# Graph Theory Implementation in Educational Game

## Overview

This educational game uses **graph theory** to create a dynamic, choice-driven narrative system where player decisions influence future available options. The implementation creates a **directed acyclic graph (DAG)** that represents the story flow and choice dependencies.

## Core Concepts

### 1. Story Graph Structure

The game's narrative is modeled as a **directed graph** where:
- **Nodes** represent story steps/questions
- **Edges** represent player choices that connect story steps
- **Edge weights** represent the impact on player stats (personal state, social relations)

```typescript
interface StoryNode {
  id: string;           // Unique identifier (e.g., "FACULTY_STEP_1")
  text: string;         // Story content
  situation?: string;   // Context description
  sceneId: string;      // Which scene this belongs to
  stepIndex: number;    // Position within the scene
  allChoices: Choice[]; // All possible choices for this step
}

interface ChoiceEdge {
  id: string;           // Same as choice.id
  fromNode: string;     // Source story step
  toNode: string;       // Destination story step
  choice: Choice;       // The actual choice data
  blocks: string[];     // Which future choice IDs this edge blocks
}
```

### 2. Graph Traversal and State Management

The game engine maintains a **current node** and tracks player state through:
- **Stat changes** from each choice
- **Choice blocking** to prevent invalid paths
- **Dynamic path generation** based on current state

```typescript
export class StoryGraphManager {
  private storyGraph: StoryGraph;
  private blockedChoices: Set<string> = new Set();
  
  constructor(storyGraph: StoryGraph) {
    this.storyGraph = storyGraph;
  }
  
  getBlockedChoices(): string[] {
    return Array.from(this.blockedChoices);
  }

  blockChoicesFromDecision(choiceId: string): void {
    const edge = this.findEdgeByChoiceId(choiceId);
    if (edge) {
      edge.blocks.forEach(blockedId => this.blockedChoices.add(blockedId));
    }
  }

  getAvailableEdgesFromNode(nodeId: string): ChoiceEdge[] {
    const allEdges = this.getAllEdgesFromNode(nodeId);
    return allEdges.filter(edge => !this.blockedChoices.has(edge.choice.id));
  }

  getAllEdgesFromNode(nodeId: string): ChoiceEdge[] {
    return Array.from(this.storyGraph.edges.values()).filter(edge => edge.fromNode === nodeId);
  }

  navigateViaEdge(choiceId: string): string | null {
    const edge = this.findEdgeByChoiceId(choiceId);
    return edge ? edge.toNode : null;
  }

  private findEdgeByChoiceId(choiceId: string): ChoiceEdge | undefined {
    return Array.from(this.storyGraph.edges.values()).find(edge => edge.choice.id === choiceId);
  }

  resetBlockedChoices(): void {
    this.blockedChoices.clear();
  }
}
```

### 3. Diagram Schema

The game's structure is a **linear progression of story nodes**, but with **dynamic choices**. A choice made at one step determines the set of available choices at the next step, even though the story event itself is the same.

This diagram illustrates how different choices from a single node (`STEP 1`) all lead to the same next node (`STEP 2`), but the choice taken (`1A`, `1B`, or `1C`) influences which choices are available later.

```
[START] --> (Choice A) --> [Node 1]
            |
            |---> (Choice B) --> [Node 2]
            |
            |---> (Choice C) --> [Node 3]

[Node 1] --> (Choice D) --> [Node 4]
           |
           |---> (Choice E) --> [Node 5]
           |
           |---> (Choice F) --> [Node 6]

[Node 2] --> (Choice G) --> [Node 7]
           |
           |---> (Choice H) --> [Node 8]
           |
           |---> (Choice I) --> [Node 9]

[Node 3] --> (Choice J) --> [Node 10]
           |
           |---> (Choice K) --> [Node 11]
           |
           |---> (Choice L) --> [Node 12]
```

Each node represents a story step with multiple choice options, and edges represent valid transitions between story steps based on player decisions and state constraints.

### 4. Complete Game Flow Example

Here's how the game flow works from start to finish:

1. **Initialization**: Game loads initial story nodes and choice edges
2. **Player Interaction**: Player selects a choice from available options
3. **State Update**: Game processes choice effects on player stats
4. **Path Restriction**: Blocked choices are removed from future options
5. **Next Step**: New available choices are presented to player
6. **Loop**: Steps 2-5 repeat until end of story path

Example flow:
- Player starts at [START] node
- Chooses "Choice A" → moves to [Node 1]
- At [Node 1], player sees choices D, E and F
- If player chooses D, they go to [Node 4]
- If player chooses E, they go to [Node 5]
- If player chooses F, they go to [Node 6]
- Each choice may block certain future paths
- Game continues until no more choices are available
