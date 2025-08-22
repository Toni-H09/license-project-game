
// Constants for step IDs
const STEP_IDS = {
  FACULTY: {
    STEP_1: 'FACULTY_STEP_1',
    STEP_2: 'FACULTY_STEP_2',
    STEP_3: 'FACULTY_STEP_3',
  },
  JOB: {
    STEP_1: 'JOB_STEP_1',
    STEP_2: 'JOB_STEP_2',
    STEP_3: 'JOB_STEP_3',
  },
  HOUSING: {
    STEP_1: 'HOUSING_STEP_1',
    STEP_2: 'HOUSING_STEP_2',
    STEP_3: 'HOUSING_STEP_3',
  },
} as const;

// Constants for choice IDs
const CHOICE_IDS = {
  FACULTY: {
    STEP_1: {
      CHOICE_1: 'FACULTY_STEP_1_CHOICE_1',
      CHOICE_2: 'FACULTY_STEP_1_CHOICE_2',
      CHOICE_3: 'FACULTY_STEP_1_CHOICE_3',
    },
    STEP_2: {
      CHOICE_1: 'FACULTY_STEP_2_CHOICE_1',
      CHOICE_2: 'FACULTY_STEP_2_CHOICE_2',
      CHOICE_3: 'FACULTY_STEP_2_CHOICE_3',
      CHOICE_4: 'FACULTY_STEP_2_CHOICE_4',
      CHOICE_5: 'FACULTY_STEP_2_CHOICE_5',
    },
    STEP_3: {
      CHOICE_1: 'FACULTY_STEP_3_CHOICE_1',
      CHOICE_2: 'FACULTY_STEP_3_CHOICE_2',
      CHOICE_3: 'FACULTY_STEP_3_CHOICE_3',
      CHOICE_4: 'FACULTY_STEP_3_CHOICE_4',
      CHOICE_5: 'FACULTY_STEP_3_CHOICE_5',
    },
  },
  JOB: {
    STEP_1: {
      CHOICE_1: 'JOB_STEP_1_CHOICE_1',
      CHOICE_2: 'JOB_STEP_1_CHOICE_2',
      CHOICE_3: 'JOB_STEP_1_CHOICE_3',
    },
    STEP_2: {
      CHOICE_1: 'JOB_STEP_2_CHOICE_1',
      CHOICE_2: 'JOB_STEP_2_CHOICE_2',
      CHOICE_3: 'JOB_STEP_2_CHOICE_3',
      CHOICE_4: 'JOB_STEP_2_CHOICE_4',
      CHOICE_5: 'JOB_STEP_2_CHOICE_5',
    },
    STEP_3: {
      CHOICE_1: 'JOB_STEP_3_CHOICE_1',
      CHOICE_2: 'JOB_STEP_3_CHOICE_2',
      CHOICE_3: 'JOB_STEP_3_CHOICE_3',
      CHOICE_4: 'JOB_STEP_3_CHOICE_4',
      CHOICE_5: 'JOB_STEP_3_CHOICE_5',
    },
  },
  HOUSING: {
    STEP_1: {
      CHOICE_1: 'HOUSING_STEP_1_CHOICE_1',
      CHOICE_2: 'HOUSING_STEP_1_CHOICE_2',
      CHOICE_3: 'HOUSING_STEP_1_CHOICE_3',
    },
    STEP_2: {
      CHOICE_1: 'HOUSING_STEP_2_CHOICE_1',
      CHOICE_2: 'HOUSING_STEP_2_CHOICE_2',
      CHOICE_3: 'HOUSING_STEP_2_CHOICE_3',
      CHOICE_4: 'HOUSING_STEP_2_CHOICE_4',
      CHOICE_5: 'HOUSING_STEP_2_CHOICE_5',
    },
    STEP_3: {
      CHOICE_1: 'HOUSING_STEP_3_CHOICE_1',
      CHOICE_2: 'HOUSING_STEP_3_CHOICE_2',
      CHOICE_3: 'HOUSING_STEP_3_CHOICE_3',
      CHOICE_4: 'HOUSING_STEP_3_CHOICE_4',
      CHOICE_5: 'HOUSING_STEP_3_CHOICE_5',
    },
  },
} as const;

export interface Choice {
  id: string;
  text: string;
  personalStateChange: number;
  socialRelationsChange: number;
  blocks?: string[]; // Which choice IDs this choice blocks in future questions
}

export interface StoryNode {
  id: string;
  text: string;
  situation?: string;
  sceneId: string;
  stepIndex: number;
  allChoices: Choice[]; // All possible choices for this question
}

export interface ChoiceEdge {
  id: string; // Same as choice.id
  fromNode: string; // Which question this choice comes from
  toNode: string; // Which question this choice leads to (always next in sequence)
  choice: Choice; // The actual choice data
  blocks: string[]; // Which choice IDs this edge blocks
}

export interface StoryGraph {
  nodes: Map<string, StoryNode>;
  edges: Map<string, ChoiceEdge>;
}

export interface Step {
  id: string;
  text: string;
  situation?: string;
  choices: Choice[];
}

export interface Introspection {
  text: string;
  positiveChoice: string;
  negativeChoice: string;
}

export interface Scene {
  title: string;
  steps: Step[];
  introspection: Introspection;
}

export interface Ending {
  title: string;
  text: string;
}

export interface Character {
  id: 'male' | 'female';
  name: string;
  description: string;
  avatar: string;
}

export interface GameState {
  currentScene: number;
  currentStep: number;
  personalState: number;
  socialRelations: number;
  decisions: string[];
  introspectionMode: boolean;
  selectedCharacter?: Character;
  characterSelected: boolean;
  activeRelationships: string[];
}

export interface ChoiceNode {
  id: string;
  text: string;
  personalStateChange: number;
  socialRelationsChange: number;
  blocks: string[];
}

export const characters: Character[] = [
  {
    id: 'male',
    name: '',
    description: 'Un tânăr ambițios care își începe călătoria prin viață',
    avatar: '👨‍🦽'
  },
  {
    id: 'female',
    name: '',
    description: 'O tânără determinată care își urmează visurile',
    avatar: '👩‍🦽'
  }
];

export const gameData = {
  scenes: [
    {
      title: "Facultatea",
      steps: [
        {
          id: STEP_IDS.FACULTY.STEP_1,
          text: "Este prima ta zi la facultate. Intri în căminul universitar și observi că liftul este defect. Dormitorul tău este la etajul 3.",
          situation: "Cămin Universitar - Ziua 1",
          choices: [
            {
              id: CHOICE_IDS.FACULTY.STEP_1.CHOICE_1,
              text: "Ceri ajutorul altor studenți să te ducă pe scări",
              personalStateChange: 5,
              socialRelationsChange: 10,
              blocks: [CHOICE_IDS.FACULTY.STEP_2.CHOICE_3, CHOICE_IDS.FACULTY.STEP_2.CHOICE_4]
            },
            {
              id: CHOICE_IDS.FACULTY.STEP_1.CHOICE_2,
              text: "Aștepți până se repară liftul, chiar dacă întârzii",
              personalStateChange: -5,
              socialRelationsChange: 0,
              blocks: [CHOICE_IDS.FACULTY.STEP_2.CHOICE_2, CHOICE_IDS.FACULTY.STEP_2.CHOICE_5]
            },
            {
              id: CHOICE_IDS.FACULTY.STEP_1.CHOICE_3,
              text: "Te plângi administrației despre infrastructura inadecvată",
              personalStateChange: 10,
              socialRelationsChange: -5,
              blocks: [CHOICE_IDS.FACULTY.STEP_2.CHOICE_1, CHOICE_IDS.FACULTY.STEP_2.CHOICE_3]
            }
          ],
        },
        {
          id: STEP_IDS.FACULTY.STEP_2,
          text: "La prima lecție, profesorul organizează studenții în grupuri pentru un proiect. Observi că majoritatea meselor sunt prea înalte pentru tine.",
          situation: "Sala de Curs - Prima Lecție",
          choices: [
            {
              id: CHOICE_IDS.FACULTY.STEP_2.CHOICE_1,
              text: "Te adaptezi și lucrezi cum poți, fără să spui nimic",
              personalStateChange: -10,
              socialRelationsChange: 5,
              blocks: [CHOICE_IDS.FACULTY.STEP_3.CHOICE_1, CHOICE_IDS.FACULTY.STEP_3.CHOICE_4]
            },
            {
              id: CHOICE_IDS.FACULTY.STEP_2.CHOICE_2,
              text: "Explici situația profesorului și ceri o soluție",
              personalStateChange: 5,
              socialRelationsChange: 5,
              blocks: [CHOICE_IDS.FACULTY.STEP_3.CHOICE_3, CHOICE_IDS.FACULTY.STEP_3.CHOICE_5]
            },
            {
              id: CHOICE_IDS.FACULTY.STEP_2.CHOICE_3,
              text: "Pleci din sală, simțindu-te exclus",
              personalStateChange: -15,
              socialRelationsChange: -10,
              blocks: [CHOICE_IDS.FACULTY.STEP_3.CHOICE_1, CHOICE_IDS.FACULTY.STEP_3.CHOICE_2]
            },
            {
              id: CHOICE_IDS.FACULTY.STEP_2.CHOICE_4,
              text: "Ceri ajutorul colegilor să îți găsească o soluție",
              personalStateChange: 0,
              socialRelationsChange: 10,
              blocks: [CHOICE_IDS.FACULTY.STEP_3.CHOICE_2, CHOICE_IDS.FACULTY.STEP_3.CHOICE_3]
            },
            {
              id: CHOICE_IDS.FACULTY.STEP_2.CHOICE_5,
              text: "Cauți o masă mai potrivită în altă parte a sălii",
              personalStateChange: 5,
              socialRelationsChange: 0,
              blocks: [CHOICE_IDS.FACULTY.STEP_3.CHOICE_5, CHOICE_IDS.FACULTY.STEP_3.CHOICE_4]
            }
          ],
        },
        {
          id: STEP_IDS.FACULTY.STEP_3,
          text: "În pauză, un grup de colegi discută despre o ieșire în oraș la o locație pe care o știi că nu are acces pentru scaune cu rotile.",
          situation: "Curtea Facultății - Pauza",
          choices: [
            {
              id: CHOICE_IDS.FACULTY.STEP_3.CHOICE_1,
              text: "Sugerezi o locație alternativă accesibilă",
              personalStateChange: 10,
              socialRelationsChange: 10,
              blocks: []
            },
            {
              id: CHOICE_IDS.FACULTY.STEP_3.CHOICE_2,
              text: "Refuzi politicos să vii, inventând o scuză",
              personalStateChange: -5,
              socialRelationsChange: -5,
              blocks: []
            },
            {
              id: CHOICE_IDS.FACULTY.STEP_3.CHOICE_3,
              text: "Nu spui nimic și sperai să nu te invite",
              personalStateChange: -10,
              socialRelationsChange: -10,
              blocks: []
            },
            {
              id: CHOICE_IDS.FACULTY.STEP_3.CHOICE_4,
              text: "Accepți să vii, sperând că vei găsi o soluție",
              personalStateChange: -5,
              socialRelationsChange: 15,
              blocks: []
            },
            {
              id: CHOICE_IDS.FACULTY.STEP_3.CHOICE_5,
              text: "Inventezi o scuză medicală pentru a nu participa",
              personalStateChange: -8,
              socialRelationsChange: -3,
              blocks: []
            }
          ],
        },
      ],
      introspection: {
        text: "Prima săptămână de facultate s-a încheiat. Te gândești la experiențele trăite și la cum te-au afectat.",
        positiveChoice: "Mă concentrez pe momentele în care am reușit să mă integrez și să-mi fac prieteni",
        negativeChoice: "Mă gândesc doar la momentele dificile și la cât de diferit sunt",
      },
    },

    {
      title: "Locul de Muncă",
      steps: [
        {
          id: STEP_IDS.JOB.STEP_1,
          text: "Este primul tău job după facultate. Ajungi la birou și realizezi că baia nu este adaptată pentru scaune cu rotile.",
          situation: "Primul Zi de Lucru",
          choices: [
            {
              id: CHOICE_IDS.JOB.STEP_1.CHOICE_1,
              text: "Discuți cu HR-ul despre adaptările necesare",
              personalStateChange: 10,
              socialRelationsChange: 5,
              blocks: [CHOICE_IDS.JOB.STEP_2.CHOICE_3, CHOICE_IDS.JOB.STEP_2.CHOICE_5]
            },
            {
              id: CHOICE_IDS.JOB.STEP_1.CHOICE_2,
              text: "Încerci să te descurci singur fără să deranjezi pe nimeni",
              personalStateChange: -5,
              socialRelationsChange: 0,
              blocks: [CHOICE_IDS.JOB.STEP_2.CHOICE_1, CHOICE_IDS.JOB.STEP_2.CHOICE_4]
            },
            {
              id: CHOICE_IDS.JOB.STEP_1.CHOICE_3,
              text: "Te simți o povară și îți pare rău că ai acceptat jobul",
              personalStateChange: -15,
              socialRelationsChange: -5,
              blocks: [CHOICE_IDS.JOB.STEP_2.CHOICE_2, CHOICE_IDS.JOB.STEP_2.CHOICE_5]
            }
          ],
        },
        {
          id: STEP_IDS.JOB.STEP_2,
          text: "Colegii de echipă organizează o activitate de team building la un loc care pare inaccesibil.",
          situation: "Team Building",
          choices: [
            {
              id: CHOICE_IDS.JOB.STEP_2.CHOICE_1,
              text: "Propui o activitate alternativă inclusivă",
              personalStateChange: 15,
              socialRelationsChange: 15,
              blocks: [CHOICE_IDS.JOB.STEP_3.CHOICE_2, CHOICE_IDS.JOB.STEP_3.CHOICE_4]
            },
            {
              id: CHOICE_IDS.JOB.STEP_2.CHOICE_2,
              text: "Participi oricum, chiar dacă va fi dificil",
              personalStateChange: 5,
              socialRelationsChange: 10,
              blocks: [CHOICE_IDS.JOB.STEP_3.CHOICE_1, CHOICE_IDS.JOB.STEP_3.CHOICE_3]
            },
            {
              id: CHOICE_IDS.JOB.STEP_2.CHOICE_3,
              text: "Nu participi și lucrezi de acasă",
              personalStateChange: -10,
              socialRelationsChange: -15,
              blocks: [CHOICE_IDS.JOB.STEP_3.CHOICE_5, CHOICE_IDS.JOB.STEP_3.CHOICE_4]
            },
            {
              id: CHOICE_IDS.JOB.STEP_2.CHOICE_4,
              text: "Ceri organizatorilor să găsească o soluție pentru tine",
              personalStateChange: 5,
              socialRelationsChange: 5,
              blocks: [CHOICE_IDS.JOB.STEP_3.CHOICE_4, CHOICE_IDS.JOB.STEP_3.CHOICE_2]
            },
            {
              id: CHOICE_IDS.JOB.STEP_2.CHOICE_5,
              text: "Sugerezi ca activitatea să aibă și o componentă online",
              personalStateChange: 10,
              socialRelationsChange: 8,
              blocks: [CHOICE_IDS.JOB.STEP_3.CHOICE_3, CHOICE_IDS.JOB.STEP_3.CHOICE_5]
            }
          ],
        },
        {
          id: STEP_IDS.JOB.STEP_3,
          text: "Un coleg face remarci nepotrivite despre dizabilitatea ta, aparent în glumă, în fața altor colegi.",
          situation: "Birou - Comentarii Nepotrivite",
          choices: [
            {
              id: CHOICE_IDS.JOB.STEP_3.CHOICE_1,
              text: "Îi explici direct de ce comentariile sunt nepotrivite",
              personalStateChange: 10,
              socialRelationsChange: 5,
              blocks: []
            },
            {
              id: CHOICE_IDS.JOB.STEP_3.CHOICE_2,
              text: "Râzi împreună, deși te simți rănit",
              personalStateChange: -10,
              socialRelationsChange: 5,
              blocks: []
            },
            {
              id: CHOICE_IDS.JOB.STEP_3.CHOICE_3,
              text: "Raportezi incidentul la HR",
              personalStateChange: 5,
              socialRelationsChange: -10,
              blocks: []
            },
            {
              id: CHOICE_IDS.JOB.STEP_3.CHOICE_4,
              text: "Rămâi tăcut dar îți exprimi dezaprobarea prin limbajul corpului",
              personalStateChange: -5,
              socialRelationsChange: 0,
              blocks: []
            },
            {
              id: CHOICE_IDS.JOB.STEP_3.CHOICE_5,
              text: "Îl confrunți public în fața tuturor colegilor",
              personalStateChange: 15,
              socialRelationsChange: -5,
              blocks: []
            }
          ],
        },
      ],
      introspection: {
        text: "După câteva luni la serviciu, reflectezi asupra experienței tale profesionale și a relațiilor cu colegii.",
        positiveChoice: "Sunt mândru de contribuțiile mele și de progresul făcut în carieră",
        negativeChoice: "Simt că mereu voi fi tratat diferit, indiferent de performanțele mele",
      },
    },

    {
      title: "Locuința",
      steps: [
        {
          id: STEP_IDS.HOUSING.STEP_1,
          text: "Cauți un apartament să închiriezi. Proprietarul pare reticent când vede scaunul cu rotile.",
          situation: "Căutarea Apartamentului",
          choices: [
            {
              id: CHOICE_IDS.HOUSING.STEP_1.CHOICE_1,
              text: "Îi explici drepturile tale și îl asiguri că vei avea grijă",
              personalStateChange: 10,
              socialRelationsChange: 5,
              blocks: [CHOICE_IDS.HOUSING.STEP_2.CHOICE_3, CHOICE_IDS.HOUSING.STEP_2.CHOICE_5]
            },
            {
              id: CHOICE_IDS.HOUSING.STEP_1.CHOICE_2,
              text: "Oferi să plătești o garanție suplimentară",
              personalStateChange: -5,
              socialRelationsChange: 10,
              blocks: [CHOICE_IDS.HOUSING.STEP_2.CHOICE_1, CHOICE_IDS.HOUSING.STEP_2.CHOICE_4]
            },
            {
              id: CHOICE_IDS.HOUSING.STEP_1.CHOICE_3,
              text: "Pleci în tăcere și continui căutarea",
              personalStateChange: -10,
              socialRelationsChange: -5,
              blocks: [CHOICE_IDS.HOUSING.STEP_2.CHOICE_2, CHOICE_IDS.HOUSING.STEP_2.CHOICE_1]
            }
          ],
        },
        {
          id: STEP_IDS.HOUSING.STEP_2,
          text: "Vecinii organizează o întâlnire în curtea comună pentru a discuta probleme ale blocului. Locul de întâlnire nu este accesibil.",
          situation: "Întâlnirea Vecinilor",
          choices: [
            {
              id: CHOICE_IDS.HOUSING.STEP_2.CHOICE_1,
              text: "Sugerezi să mutați întâlnirea într-un loc accesibil",
              personalStateChange: 15,
              socialRelationsChange: 10,
              blocks: [CHOICE_IDS.HOUSING.STEP_3.CHOICE_3, CHOICE_IDS.HOUSING.STEP_3.CHOICE_2]
            },
            {
              id: CHOICE_IDS.HOUSING.STEP_2.CHOICE_2,
              text: "Ceri să te țină la curent cu ce s-a discutât",
              personalStateChange: 0,
              socialRelationsChange: 5,
              blocks: [CHOICE_IDS.HOUSING.STEP_3.CHOICE_1, CHOICE_IDS.HOUSING.STEP_3.CHOICE_4]
            },
            {
              id: CHOICE_IDS.HOUSING.STEP_2.CHOICE_3,
              text: "Nu te implici deloc în problemele comunității",
              personalStateChange: -10,
              socialRelationsChange: -15,
              blocks: [CHOICE_IDS.HOUSING.STEP_3.CHOICE_1, CHOICE_IDS.HOUSING.STEP_3.CHOICE_5]
            },
            {
              id: CHOICE_IDS.HOUSING.STEP_2.CHOICE_4,
              text: "Propui să organizezi tu întâlnirea într-un loc accesibil",
              personalStateChange: 12,
              socialRelationsChange: 15,
              blocks: [CHOICE_IDS.HOUSING.STEP_3.CHOICE_3, CHOICE_IDS.HOUSING.STEP_3.CHOICE_2]
            },
            {
              id: CHOICE_IDS.HOUSING.STEP_2.CHOICE_5,
              text: "Te plângi administrației despre lipsa de accesibilitate",
              personalStateChange: 8,
              socialRelationsChange: -5,
              blocks: [CHOICE_IDS.HOUSING.STEP_3.CHOICE_2, CHOICE_IDS.HOUSING.STEP_3.CHOICE_5]
            }
          ],
        },
        {
          id: STEP_IDS.HOUSING.STEP_3,
          text: "O persoană dragă îți propune să mergeți într-o călătorie împreună, dar îți exprimă îngrijorarea legată de planificarea necesară pentru nevoile tale.",
          situation: "Planuri de Călătorie",
          choices: [
            {
              id: CHOICE_IDS.HOUSING.STEP_3.CHOICE_1,
              text: "Propui să planificați împreună călătoria",
              personalStateChange: 15,
              socialRelationsChange: 15,
              blocks: []
            },
            {
              id: CHOICE_IDS.HOUSING.STEP_3.CHOICE_2,
              text: "Îți asumi toată responsabilitatea planificării",
              personalStateChange: -5,
              socialRelationsChange: 5,
              blocks: []
            },
            {
              id: CHOICE_IDS.HOUSING.STEP_3.CHOICE_3,
              text: "Refuzi călătoria pentru a nu crea probleme",
              personalStateChange: -15,
              socialRelationsChange: -10,
              blocks: []
            },
            {
              id: CHOICE_IDS.HOUSING.STEP_3.CHOICE_4,
              text: "Cercetezi opțiuni accesibile și prezinți alternative",
              personalStateChange: 10,
              socialRelationsChange: 12,
              blocks: []
            },
            {
              id: CHOICE_IDS.HOUSING.STEP_3.CHOICE_5,
              text: "Sugerezi o călătorie mai scurtă și mai accesibilă",
              personalStateChange: 5,
              socialRelationsChange: 8,
              blocks: []
            }
          ],
        },
      ],
      introspection: {
        text: "Privind înapoi la experiențele tale de viață independentă, îți evaluezi parcursul și relațiile construite.",
        positiveChoice: "Am demonstrat că pot trăi independent și am construit relații valoroase",
        negativeChoice: "Viața mea va fi mereu o luptă, iar eu voi fi mereu o povară pentru alții",
      },
    },
  ],

  endings: {
    positive: {
      title: "Integrare și Succes",
      text: "Ai reușit să navighezi cu succes provocările vieții, construind relații puternice și menținându-ți o stare emoțională pozitivă. Experiențele tale au devenit o sursă de inspirație pentru alții, iar tu ai devenit un avocat pentru incluziune și accesibilitate. Viața ta demonstrează că dizabilitatea nu defineește limitele unei persoane.",
    },
    neutral: {
      title: "Echilibru și Acceptare",
      text: "Ai găsit un echilibru în viață, cu momente bune și rele. Deși încă mai întâmpini provocări, ai dezvoltat strategii de adaptare și ai construit o rețea de sprijin solidă. Continui să crești și să înveți, acceptând că viața are ups și downs pentru toată lumea.",
    },
    negative: {
      title: "Reflecție și Speranță",
      text: "Călătoria ta a fost dificilă și ai trecut prin momente întunecate. Important este să îți amintești că nu ești singur și că există întotdeauna ajutor disponibil. Fiecare zi nouă oferă o șansă de schimbare și îmbunătățire. Te rugăm să contactezi o linie de ajutor dacă ai nevoie de sprijin: 116 123 (Telefonul de Suflet).",
    },
  },
};

// Create the story graph from your existing game data
export const storyGraph: StoryGraph = (() => {
  const nodes = new Map<string, StoryNode>();
  const edges = new Map<string, ChoiceEdge>();

  // Build nodes from scenes and steps
  gameData.scenes.forEach((scene, sceneIndex) => {
    scene.steps.forEach((step, stepIndex) => {
      const node: StoryNode = {
        id: step.id,
        text: step.text,
        situation: step.situation,
        sceneId: `scene_${sceneIndex}`,
        stepIndex: stepIndex,
        allChoices: step.choices
      };
      nodes.set(step.id, node);

      // Create edges for each choice
      step.choices.forEach(choice => {
        const nextStepIndex = stepIndex + 1;
        const nextSceneIndex = nextStepIndex >= scene.steps.length ? sceneIndex + 1 : sceneIndex;
        const nextStep = nextStepIndex < scene.steps.length
          ? scene.steps[nextStepIndex]
          : (gameData.scenes[nextSceneIndex]?.steps[0]);

        const toNode = nextStep ? nextStep.id : 'end';

        const edge: ChoiceEdge = {
          id: choice.id,
          fromNode: step.id,
          toNode: toNode,
          choice: choice,
          blocks: choice.blocks || []
        };
        edges.set(choice.id, edge);
      });
    });
  });

  return { nodes, edges };
})();