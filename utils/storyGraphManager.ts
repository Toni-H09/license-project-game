
import { StoryGraph, ChoiceEdge } from '@/data/gameData';

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

  printGraphStructure(): void {
    console.log('=== STORY GRAPH STRUCTURE ===');
    console.log('Nodes:', this.storyGraph.nodes.size);
    console.log('Edges:', this.storyGraph.edges.size);
    console.log('Blocked choices:', Array.from(this.blockedChoices));
    
    Array.from(this.storyGraph.edges.values()).forEach(edge => {
      console.log(`Edge: ${edge.fromNode} -> ${edge.toNode} (choice: ${edge.choice.id})`);
    });
  }

  resetBlockedChoices(): void {
    this.blockedChoices.clear();
  }
}
