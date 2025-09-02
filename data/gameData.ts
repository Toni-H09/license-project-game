
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

export interface Character {
  gender: 'male' | 'female';
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
}

export const characters: Character[] = [
  {
    gender: 'male',
    name: '',
    description: 'Un tânăr ambițios care își începe călătoria prin viață',
    avatar: '👨‍🦽'
  },
  {
    gender: 'female',
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
          text: "Este prima zi la facultate și ești entuziasmat de noua etapă. Ajungi la facultate și observi că nu există rampă sau ușă de acces în clădire accesibile.",
          situation: "Prima zi la facultate",
          choices: [
            {
              id: CHOICE_IDS.FACULTY.STEP_1.CHOICE_1,
              text: "Refuzi orice ajutor și pleci acasă",
              personalStateChange: -5,
              socialRelationsChange: -5,
              blocks: [CHOICE_IDS.FACULTY.STEP_2.CHOICE_1, CHOICE_IDS.FACULTY.STEP_2.CHOICE_5]
            },
            {
              id: CHOICE_IDS.FACULTY.STEP_1.CHOICE_2,
              text: "Suni un prieten să te ajute și explici calm cum să procedeze",
              personalStateChange: 5,
              socialRelationsChange: 5,
              blocks: [CHOICE_IDS.FACULTY.STEP_2.CHOICE_2, CHOICE_IDS.FACULTY.STEP_2.CHOICE_4]
            },
            {
              id: CHOICE_IDS.FACULTY.STEP_1.CHOICE_3,
              text: "Spui nemulțumirea portarului, fără rezultat",
              personalStateChange: 0,
              socialRelationsChange: -5,
              blocks: [CHOICE_IDS.FACULTY.STEP_2.CHOICE_3, CHOICE_IDS.FACULTY.STEP_2.CHOICE_5]
            }
          ],
        },
        {
          id: STEP_IDS.FACULTY.STEP_2,
          text: "Ai reușit să ajungi în clădire, dar te confrunți cu o ușă greu accesibilă pentru a intra în amfiteatru.",
          situation: "Acces în amfiteatru",
          choices: [
            {
              id: CHOICE_IDS.FACULTY.STEP_2.CHOICE_1,
              text: "Încerci să o deschizi singur treptat, deși îți va lua mult timp și va fi greu",
              personalStateChange: 5,
              socialRelationsChange: 0,
              blocks: [CHOICE_IDS.FACULTY.STEP_3.CHOICE_4, CHOICE_IDS.FACULTY.STEP_3.CHOICE_5]
            },
            {
              id: CHOICE_IDS.FACULTY.STEP_2.CHOICE_2,
              text: "Chemi pe cineva să te ajute",
              personalStateChange: 5,
              socialRelationsChange: 5,
              blocks: [CHOICE_IDS.FACULTY.STEP_3.CHOICE_1, CHOICE_IDS.FACULTY.STEP_3.CHOICE_3]
            },
            {
              id: CHOICE_IDS.FACULTY.STEP_2.CHOICE_3,
              text: "Aștepți până o să vină un profesor",
              personalStateChange: 0,
              socialRelationsChange: 0,
              blocks: [CHOICE_IDS.FACULTY.STEP_3.CHOICE_2, CHOICE_IDS.FACULTY.STEP_3.CHOICE_4]
            },
            {
              id: CHOICE_IDS.FACULTY.STEP_2.CHOICE_4,
              text: "Îți modifici locul și stai la o altă intrare mai ușor accesibilă",
              personalStateChange: 0,
              socialRelationsChange: 5,
              blocks: [CHOICE_IDS.FACULTY.STEP_3.CHOICE_1, CHOICE_IDS.FACULTY.STEP_3.CHOICE_2]
            },
            {
              id: CHOICE_IDS.FACULTY.STEP_2.CHOICE_5,
              text: "Renunți să participi la curs",
              personalStateChange: -5,
              socialRelationsChange: -5,
              blocks: [CHOICE_IDS.FACULTY.STEP_3.CHOICE_2, CHOICE_IDS.FACULTY.STEP_3.CHOICE_5]
            }
          ],
        },
        {
          id: STEP_IDS.FACULTY.STEP_3,
          text: "În pauză, realizezi că nu există baie accesibilă pentru persoanele în scaun cu rotile.",
          situation: "Probleme cu grupurile sanitare",
          choices: [
            {
              id: CHOICE_IDS.FACULTY.STEP_3.CHOICE_1,
              text: "Mergi la primul magazin cu baie accesibilă",
              personalStateChange: 5,
              socialRelationsChange: 5,
              blocks: []
            },
            {
              id: CHOICE_IDS.FACULTY.STEP_3.CHOICE_2,
              text: "Pleci acasă nervos",
              personalStateChange: -5,
              socialRelationsChange: -5,
              blocks: []
            },
            {
              id: CHOICE_IDS.FACULTY.STEP_3.CHOICE_3,
              text: "Chemi pe cineva să te ajute",
              personalStateChange: 0,
              socialRelationsChange: 5,
              blocks: []
            },
            {
              id: CHOICE_IDS.FACULTY.STEP_3.CHOICE_4,
              text: "Aștepți să se elibereze o altă baie",
              personalStateChange: 5,
              socialRelationsChange: 0,
              blocks: []
            },
            {
              id: CHOICE_IDS.FACULTY.STEP_3.CHOICE_5,
              text: "Folosești o soluție improvizată în siguranță",
              personalStateChange: 0,
              socialRelationsChange: 0,
              blocks: []
            }
          ],
        },
      ],
      introspection: {
        text: "Prima săptămână de facultate s-a încheiat. Te gândești la experiențele trăite și la cum te-au afectat relațiile personale și integrarea în societate.",
        positiveChoice: "Valoarea mea nu este dată de un cărucior cu rotile",
        negativeChoice: "Este foarte greu să fiu iubit în această ipostază",
      },
    },

    {
      title: "Locul de Muncă",
      steps: [
        {
          id: STEP_IDS.JOB.STEP_1,
          text: "Încerci să găsești un loc de muncă în IT după accident, dar colegii pun la îndoială capacitățile tale.",
          situation: "Domeniu de aplicare – IT",
          choices: [
            {
              id: CHOICE_IDS.JOB.STEP_1.CHOICE_1,
              text: "Le explici ce poți face",
              personalStateChange: 5,
              socialRelationsChange: 5,
              blocks: [CHOICE_IDS.JOB.STEP_2.CHOICE_1, CHOICE_IDS.JOB.STEP_2.CHOICE_5]
            },
            {
              id: CHOICE_IDS.JOB.STEP_1.CHOICE_2,
              text: "Ignori și acumulezi durerea în tine",
              personalStateChange: -5,
              socialRelationsChange: -5,
              blocks: [CHOICE_IDS.JOB.STEP_2.CHOICE_1, CHOICE_IDS.JOB.STEP_2.CHOICE_3]
            },
            {
              id: CHOICE_IDS.JOB.STEP_1.CHOICE_3,
              text: "Le răspunzi cu duritate, făcându-i să se simtă rușinați",
              personalStateChange: 5,
              socialRelationsChange: -5,
              blocks: [CHOICE_IDS.JOB.STEP_2.CHOICE_2, CHOICE_IDS.JOB.STEP_2.CHOICE_4]
            }
          ],
        },
        {
          id: STEP_IDS.JOB.STEP_2,
          text: "Ți se spune că un task este prea greu pentru tine din cauza condiției tale.",
          situation: "Task dificil",
          choices: [
            {
              id: CHOICE_IDS.JOB.STEP_2.CHOICE_1,
              text: "Încerci să le demonstrezi că poți să-l faci",
              personalStateChange: 5,
              socialRelationsChange: -5,
              blocks: [CHOICE_IDS.JOB.STEP_3.CHOICE_1, CHOICE_IDS.JOB.STEP_3.CHOICE_2]
            },
            {
              id: CHOICE_IDS.JOB.STEP_2.CHOICE_2,
              text: "Ai răbdare și nu renunți până când reușești",
              personalStateChange: 5,
              socialRelationsChange: 0,
              blocks: [CHOICE_IDS.JOB.STEP_3.CHOICE_1, CHOICE_IDS.JOB.STEP_3.CHOICE_3]
            },
            {
              id: CHOICE_IDS.JOB.STEP_2.CHOICE_3,
              text: "Renunți",
              personalStateChange: -5,
              socialRelationsChange: -5,
              blocks: [CHOICE_IDS.JOB.STEP_3.CHOICE_2, CHOICE_IDS.JOB.STEP_3.CHOICE_3]
            },
            {
              id: CHOICE_IDS.JOB.STEP_2.CHOICE_4,
              text: "Ceri modificarea task-ului sau ajutor suplimentar",
              personalStateChange: 0,
              socialRelationsChange: 5,
              blocks: [CHOICE_IDS.JOB.STEP_3.CHOICE_3, CHOICE_IDS.JOB.STEP_3.CHOICE_5]
            },
            {
              id: CHOICE_IDS.JOB.STEP_2.CHOICE_5,
              text: "Îi întrebi pe alți colegi cum au reușit ei să facă task-uri similare",
              personalStateChange: 5,
              socialRelationsChange: 5,
              blocks: [CHOICE_IDS.JOB.STEP_3.CHOICE_3, CHOICE_IDS.JOB.STEP_3.CHOICE_4]
            }
          ],
        },
        {
          id: STEP_IDS.JOB.STEP_3,
          text: "În interacțiunea cu clienții, observi că mulți te privesc cu compasiune exagerată sau îți plâng de milă.",
          situation: "Interacțiunea cu clienții",
          choices: [
            {
              id: CHOICE_IDS.JOB.STEP_3.CHOICE_1,
              text: "Le spui că ești capabil și nu vrei mila lor",
              personalStateChange: 5,
              socialRelationsChange: 0,
              blocks: []
            },
            {
              id: CHOICE_IDS.JOB.STEP_3.CHOICE_2,
              text: "Ignori și acumulezi durerea în tine",
              personalStateChange: -5,
              socialRelationsChange: -5,
              blocks: []
            },
            {
              id: CHOICE_IDS.JOB.STEP_3.CHOICE_3,
              text: "Renunți și pleci de la muncă",
              personalStateChange: -5,
              socialRelationsChange: -5,
              blocks: []
            },
            {
              id: CHOICE_IDS.JOB.STEP_3.CHOICE_4,
              text: "Încerci să explici cu răbdare că poți face job-ul",
              personalStateChange: 5,
              socialRelationsChange: 5,
              blocks: []
            },
            {
              id: CHOICE_IDS.JOB.STEP_3.CHOICE_5,
              text: "Râzi și iei situația cu umor pentru a detensiona atmosfera",
              personalStateChange: 0,
              socialRelationsChange: 0,
              blocks: []
            }
          ],
        },
      ],
      introspection: {
        text: "După câteva luni la serviciu, reflectezi asupra capacităților tale profesionale și nevoii de sprijin.",
        positiveChoice: "Faptul că nu mă pot deplasa nu înseamnă că nu am alte capabilități",
        negativeChoice: "Nu am abilități pentru a putea munci",
      },
    },

    {
      title: "Locuința",
      steps: [
        {
          id: STEP_IDS.HOUSING.STEP_1,
          text: "Ești singur acasă și te confrunți cu dificultăți fizice majore. Ai căzut din pat și nu poți ajunge la cărucior.",
          situation: "Cădere din pat",
          choices: [
            {
              id: CHOICE_IDS.HOUSING.STEP_1.CHOICE_1,
              text: "Încerci să ajungi la telefon și depui mult efort",
              personalStateChange: 0,
              socialRelationsChange: 0,
              blocks: [CHOICE_IDS.HOUSING.STEP_2.CHOICE_2, CHOICE_IDS.HOUSING.STEP_2.CHOICE_5]
            },
            {
              id: CHOICE_IDS.HOUSING.STEP_1.CHOICE_2,
              text: "Suni un prieten să te ajute",
              personalStateChange: 5,
              socialRelationsChange: 5,
              blocks: [CHOICE_IDS.HOUSING.STEP_2.CHOICE_1, CHOICE_IDS.HOUSING.STEP_2.CHOICE_2]
            },
            {
              id: CHOICE_IDS.HOUSING.STEP_1.CHOICE_3,
              text: "Încerci să ridici singur scaunul, chiar dacă e foarte greu și te va extenua",
              personalStateChange: -5,
              socialRelationsChange: -5,
              blocks: [CHOICE_IDS.HOUSING.STEP_2.CHOICE_3, CHOICE_IDS.HOUSING.STEP_2.CHOICE_4]
            }
          ],
        },
        {
          id: STEP_IDS.HOUSING.STEP_2,
          text: "Frigiderul este greu accesibil și ai nevoie să iei mâncare.",
          situation: "Acces mâncare",
          choices: [
            {
              id: CHOICE_IDS.HOUSING.STEP_2.CHOICE_1,
              text: "Folosești un clește / alt ajutor și ceri sprijin prietenilor",
              personalStateChange: 5,
              socialRelationsChange: 5,
              blocks: [CHOICE_IDS.HOUSING.STEP_3.CHOICE_1, CHOICE_IDS.HOUSING.STEP_3.CHOICE_5]
            },
            {
              id: CHOICE_IDS.HOUSING.STEP_2.CHOICE_2,
              text: "Încerci singur și te frustrezi",
              personalStateChange: 0,
              socialRelationsChange: 0,
              blocks: [CHOICE_IDS.HOUSING.STEP_3.CHOICE_2, CHOICE_IDS.HOUSING.STEP_3.CHOICE_4]
            },
            {
              id: CHOICE_IDS.HOUSING.STEP_2.CHOICE_3,
              text: "Renunți și rămâi fără mâncare pentru moment",
              personalStateChange: -5,
              socialRelationsChange: -5,
              blocks: [CHOICE_IDS.HOUSING.STEP_3.CHOICE_2, CHOICE_IDS.HOUSING.STEP_3.CHOICE_3]
            },
            {
              id: CHOICE_IDS.HOUSING.STEP_2.CHOICE_4,
              text: "Cauți alternative mai accesibile",
              personalStateChange: 0,
              socialRelationsChange: 5,
              blocks: [CHOICE_IDS.HOUSING.STEP_3.CHOICE_4, CHOICE_IDS.HOUSING.STEP_3.CHOICE_5]
            },
            {
              id: CHOICE_IDS.HOUSING.STEP_2.CHOICE_5,
              text: "Ceri ajutor la livrare sau de la vecin",
              personalStateChange: 0,
              socialRelationsChange: 5,
              blocks: [CHOICE_IDS.HOUSING.STEP_3.CHOICE_3, CHOICE_IDS.HOUSING.STEP_3.CHOICE_5]
            }
          ],
        },
        {
          id: STEP_IDS.HOUSING.STEP_3,
          text: "Este o zi toridă și geamurile sunt greu accesibile pentru tine.",
          situation: "Ventilare",
          choices: [
            {
              id: CHOICE_IDS.HOUSING.STEP_3.CHOICE_1,
              text: "Ceri ajutorul unui prieten sau vecin",
              personalStateChange: 5,
              socialRelationsChange: 5,
              blocks: []
            },
            {
              id: CHOICE_IDS.HOUSING.STEP_3.CHOICE_2,
              text: "Încerci singur și te frustrezi",
              personalStateChange: 0,
              socialRelationsChange: 0,
              blocks: []
            },
            {
              id: CHOICE_IDS.HOUSING.STEP_3.CHOICE_3,
              text: "Nu faci nimic, te adaptezi",
              personalStateChange: -5,
              socialRelationsChange: -5,
              blocks: []
            },
            {
              id: CHOICE_IDS.HOUSING.STEP_3.CHOICE_4,
              text: "Folosești ventilatoare sau aer condiționat",
              personalStateChange: 0,
              socialRelationsChange: 0,
              blocks: []
            },
            {
              id: CHOICE_IDS.HOUSING.STEP_3.CHOICE_5,
              text: "Încerci să improvizezi un sistem de deschidere accesibil",
              personalStateChange: 0,
              socialRelationsChange: 5,
              blocks: []
            }
          ],
        },
      ],
      introspection: {
        text: "Privind înapoi la experiențele tale de viață independentă, reflectezi asupra sprijinului primit de la alții.",
        positiveChoice: "Da, întotdeauna vor exista oameni de încredere",
        negativeChoice: "Am încercat și nu a mers, poate ar trebui să renunț",
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
      text: "Ai găsit un echilibru în viață, cu momente bune și rele. Deși încă mai întâmpini provocări, ai dezvoltat strategii de adaptare și ai construit o rețea de sprijin solidă. Continui să crești și să înveți, acceptând că viața are suișuri și coborâșuri pentru toată lumea.",
    },
    negative: {
      title: "Reflecție și Speranță",
      text: "Călătoria ta a fost dificilă și ai trecut prin momente întunecate. Important este să îți amintești că nu ești singur și că există întotdeauna ajutor disponibil. Fiecare zi nouă oferă o șansă de schimbare și îmbunătățire. Te rugăm să contactezi o linie de ajutor dacă ai nevoie de sprijin.",
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
