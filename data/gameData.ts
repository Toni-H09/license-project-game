export interface Choice {
  id: string;
  text: string;
  personalStateChange: number;
  socialRelationsChange: number;
}

export interface Step {
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
}

export const characters: Character[] = [
  {
    id: 'male',
    name: '', // Nu mai avem nume default
    description: 'Un tânăr ambițios care își începe călătoria prin viață',
    avatar: '👨‍🦽'
  },
  {
    id: 'female',
    name: '', // Nu mai avem nume default
    description: 'O tânără determinată care își urmează visurile',
    avatar: '👩‍🦽'
  }
];

export const gameData = {
  scenes: [
    // Scena 1: Facultatea
    {
      title: "Facultatea",
      steps: [
        {
          text: "Este prima ta zi la facultate. Intri în căminul universitar și observi că liftul este defect. Dormitorul tău este la etajul 3.",
          situation: "Cămin Universitar - Ziua 1",
          choices: [
            {
              id: "f1_ask_help",
              text: "Ceri ajutorul altor studenți să te ducă pe scări",
              personalStateChange: 5,
              socialRelationsChange: 10,
            },
            {
              id: "f1_wait_lift",
              text: "Aștepți până se repară liftul, chiar dacă întârzii",
              personalStateChange: -5,
              socialRelationsChange: 0,
            },
            {
              id: "f1_complain",
              text: "Te plângi administrației despre infrastructura inadecvată",
              personalStateChange: 10,
              socialRelationsChange: -5,
            },
          ],
        },
        {
          text: "La prima lecție, profesorul organizează studenții în grupuri pentru un proiect. Observi că majoritatea meselor sunt prea înalte pentru tine.",
          situation: "Sala de Curs - Prima Lecție",
          choices: [
            {
              id: "f2_adapt",
              text: "Te adaptezi și lucrezi cum poți, fără să spui nimic",
              personalStateChange: -10,
              socialRelationsChange: 5,
            },
            {
              id: "f2_explain",
              text: "Explici situația profesorului și ceri o soluție",
              personalStateChange: 5,
              socialRelationsChange: 5,
            },
            {
              id: "f2_leave",
              text: "Pleci din sală, simțindu-te exclus",
              personalStateChange: -15,
              socialRelationsChange: -10,
            },
          ],
        },
        {
          text: "În pauză, un grup de colegi discută despre o ieșire în oraș la o locație pe care o știi că nu are acces pentru scaune cu rotile.",
          situation: "Curtea Facultății - Pauza",
          choices: [
            {
              id: "f3_suggest",
              text: "Sugerezi o locație alternativă accesibilă",
              personalStateChange: 10,
              socialRelationsChange: 10,
            },
            {
              id: "f3_decline",
              text: "Refuzi politicos să vii, inventând o scuză",
              personalStateChange: -5,
              socialRelationsChange: -5,
            },
            {
              id: "f3_ignore",
              text: "Nu spui nimic și sperai să nu te invite",
              personalStateChange: -10,
              socialRelationsChange: -10,
            },
          ],
        },
      ],
      introspection: {
        text: "Prima săptămână de facultate s-a încheiat. Te gândești la experiențele trăite și la cum te-au afectat.",
        positiveChoice: "Mă concentrez pe momentele în care am reușit să mă integrez și să-mi fac prieteni",
        negativeChoice: "Mă gândesc doar la momentele dificile și la cât de diferit sunt",
      },
    },
    
    // Scena 2: Job-ul
    {
      title: "Locul de Muncă",
      steps: [
        {
          text: "Este primul tău job după facultate. Ajungi la birou și realizezi că baia nu este adaptată pentru scaune cu rotile.",
          situation: "Primul Zi de Lucru",
          choices: [
            {
              id: "j1_hr_discuss",
              text: "Discuți cu HR-ul despre adaptările necesare",
              personalStateChange: 10,
              socialRelationsChange: 5,
            },
            {
              id: "j1_manage_alone",
              text: "Încerci să te descurci singur fără să deranjezi pe nimeni",
              personalStateChange: -5,
              socialRelationsChange: 0,
            },
            {
              id: "j1_feel_burden",
              text: "Te simți o povară și îți pară rău că ai acceptat jobul",
              personalStateChange: -15,
              socialRelationsChange: -5,
            },
          ],
        },
        {
          text: "Colegii de echipă organizează o activitate de team building la un loc care pare inaccesibil.",
          situation: "Team Building",
          choices: [
            {
              id: "j2_propose_alternative",
              text: "Propui o activitate alternativă inclusivă",
              personalStateChange: 15,
              socialRelationsChange: 15,
            },
            {
              id: "j2_attend_anyway",
              text: "Participi oricum, chiar dacă va fi dificil",
              personalStateChange: 5,
              socialRelationsChange: 10,
            },
            {
              id: "j2_skip_event",
              text: "Nu participi și lucrezi de acasă",
              personalStateChange: -10,
              socialRelationsChange: -15,
            },
          ],
        },
        {
          text: "Un coleg face remarci nepotrivite despre dizabilitatea ta, aparent în glumă, în fața altor colegi.",
          situation: "Birou - Comentarii Nepotrivite",
          choices: [
            {
              id: "j3_address_directly",
              text: "Îi explici direct de ce comentariile sunt nepotrivite",
              personalStateChange: 10,
              socialRelationsChange: 5,
            },
            {
              id: "j3_laugh_along",
              text: "Râzi împreună, deși te simți rănit",
              personalStateChange: -10,
              socialRelationsChange: 5,
            },
            {
              id: "j3_report_hr",
              text: "Raportezi incidentul la HR",
              personalStateChange: 5,
              socialRelationsChange: -10,
            },
          ],
        },
      ],
      introspection: {
        text: "După câteva luni la serviciu, reflectezi asupra experienței tale profesionale și a relațiilor cu colegii.",
        positiveChoice: "Sunt mândru de contribuțiile mele și de progresul făcut în carieră",
        negativeChoice: "Simt că mereu voi fi tratat diferit, indiferent de performanțele mele",
      },
    },
    
    // Scena 3: Viața în Locuință
    {
      title: "Locuința",
      steps: [
        {
          text: "Cauți un apartament să închiriezi. Proprietarul pare reticent când vede scaunul cu rotile.",
          situation: "Căutarea Apartamentului",
          choices: [
            {
              id: "l1_explain_rights",
              text: "Îi explici drepturile tale și îl asiguri că vei avea grijă",
              personalStateChange: 10,
              socialRelationsChange: 5,
            },
            {
              id: "l1_offer_extra",
              text: "Oferi să plătești o garanție suplimentară",
              personalStateChange: -5,
              socialRelationsChange: 10,
            },
            {
              id: "l1_leave_quietly",
              text: "Pleci în tăcere și continui căutarea",
              personalStateChange: -10,
              socialRelationsChange: -5,
            },
          ],
        },
        {
          text: "Vecinii organizează o întâlnire în curtea comună pentru a discuta probleme ale blocului. Locul de întâlnire nu este accesibil.",
          situation: "Întâlnirea Vecinilor",
          choices: [
            {
              id: "l2_suggest_accessible",
              text: "Sugerezi să mutați întâlnirea într-un loc accesibil",
              personalStateChange: 15,
              socialRelationsChange: 10,
            },
            {
              id: "l2_ask_update",
              text: "Ceri să te țină la curent cu ce s-a discutat",
              personalStateChange: 0,
              socialRelationsChange: 5,
            },
            {
              id: "l2_isolate",
              text: "Nu te implici deloc în problemele comunității",
              personalStateChange: -10,
              socialRelationsChange: -15,
            },
          ],
        },
        {
          text: "O persoană dragă îți propune să mergeti într-o călătorie împreună, dar îți exprimă îngrijorarea legată de planificarea necesară pentru nevoile tale.",
          situation: "Planuri de Călătorie",
          choices: [
            {
              id: "l3_plan_together",
              text: "Propui să planificați împreună călătoria",
              personalStateChange: 15,
              socialRelationsChange: 15,
            },
            {
              id: "l3_take_burden",
              text: "Îți asumi toată responsabilitatea planificării",
              personalStateChange: -5,
              socialRelationsChange: 5,
            },
            {
              id: "l3_decline_trip",
              text: "Refuzi călătoria pentru a nu crea probleme",
              personalStateChange: -15,
              socialRelationsChange: -10,
            },
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
