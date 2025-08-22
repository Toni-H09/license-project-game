
interface RelationshipNode {
  id: string;
  name: string;
  type: 'colleague' | 'friend' | 'family' | 'authority' | 'stranger';
  influence: number; // How much they affect your metrics
}

interface RelationshipEdge {
  from: string;
  to: string;
  weight: number; // Relationship strength (-100 to 100)
  type: 'trust' | 'respect' | 'fear' | 'love' | 'conflict';
}

class RelationshipGraph {
  private nodes: Map<string, RelationshipNode> = new Map();
  private edges: Map<string, RelationshipEdge[]> = new Map();

  addNode(id: string, name: string, type: RelationshipNode['type'], influence: number) {
    const node: RelationshipNode = { id, name, type, influence };
    this.nodes.set(id, node);
  }

  addRelationship(from: string, to: string, weight: number, type: RelationshipEdge['type']) {
    const edge: RelationshipEdge = { from, to, weight, type };
    
    if (!this.edges.has(from)) {
      this.edges.set(from, []);
    }
    this.edges.get(from)!.push(edge);
  }

  calculateSocialImpact(choiceId: string, relationships: string[]): number {
    let totalImpact = 0;
    
    relationships.forEach(relationId => {
      const edges = this.edges.get(relationId) || [];
      const influence = edges.reduce((sum, edge) => {
        return sum + (edge.weight * this.getChoiceRelevance(choiceId, edge.type));
      }, 0);
      
      totalImpact += influence;
    });
    
    return Math.max(-50, Math.min(50, totalImpact / relationships.length));
  }

  private getChoiceRelevance(choiceId: string, relationType: string): number {
    // Define how different choice types affect different relationship types
    const relevanceMatrix: Record<string, Record<string, number>> = {
      'ask_help': { 'trust': 0.8, 'respect': 0.6, 'fear': -0.2 },
      'complain': { 'trust': -0.3, 'respect': 0.7, 'conflict': 0.9 },
      'isolate': { 'trust': -0.5, 'respect': -0.4, 'love': -0.8 }
    };
    
    return relevanceMatrix[choiceId]?.[relationType] || 0;
  }
}
