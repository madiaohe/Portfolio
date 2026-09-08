export type ExperienceProject = {
  id: string;
  name: string;
  year: string;
  summary: string;
  image: string;
  imageAlt: string;
  context: string;
  contribution: string;
  outcome: string;
};

export type Experience = {
  id: string;
  start: string;
  end: string;
  company: string;
  role: string;
  location: string;
  introduction: string;
  responsibilities: string;
  projects: ExperienceProject[];
};

// Illustrative content only. Replace these entries with verified career details.
// Imagery is reused from the portfolio's existing concept assets.
export const experiences: Experience[] = [
  {
    id: 'independent',
    start: '2025',
    end: 'Present',
    company: 'Independent practice',
    role: 'Product & Interaction Designer',
    location: 'China / Remote',
    introduction:
      'Working at the intersection of digital products and physical experiences. Partnering with small teams to turn complex ideas into clear, considered tools.',
    responsibilities:
      'Shaping products from the first question to the final interaction: research, information architecture, interface design and working prototypes.',
    projects: [
      {
        id: 'ambient-dial',
        name: 'Ambient Dial',
        year: '2025',
        summary:
          'A quieter way to understand and adjust the spaces we live in.',
        image: '/media/work-categories/digital-products.png',
        imageAlt:
          'Concept product photography for the Ambient Dial example project',
        context:
          'Home controls often separate information from action. This concept explores how one physical interface could make the room’s conditions easier to understand.',
        contribution:
          'Mapped everyday scenarios, simplified the control hierarchy and prototyped the relationship between a physical dial and its digital feedback.',
        outcome:
          'An interaction prototype and a set of interface states covering adjustment, confirmation and recovery. The concept remains an exploration, not a shipped product.',
      },
      {
        id: 'field-notes',
        name: 'Field Notes',
        year: '2025',
        summary:
          'An evolving visual language for an independent design practice.',
        image: '/media/work-categories/brand-systems.png',
        imageAlt:
          'Concept imagery illustrating the Field Notes visual identity project',
        context:
          'An independent practice needs a recognisable voice that works across project stories, proposals and a portfolio.',
        contribution:
          'Explored typography, editorial layouts and image direction, then brought the rules together into reusable presentation templates.',
        outcome:
          'A compact identity toolkit with layout principles and examples for digital and printed applications.',
      },
    ],
  },
  {
    id: 'fieldwork',
    start: '2022',
    end: '2025',
    company: 'Fieldwork Studio',
    role: 'Senior Product Designer',
    location: 'Shanghai / Hybrid',
    introduction:
      'A small multidisciplinary studio building tools for everyday work. Connecting product strategy with the details that make an interface feel natural.',
    responsibilities:
      'Led interaction design across connected devices and web applications, working with engineering to test assumptions early and carry design decisions through implementation.',
    projects: [
      {
        id: 'field-console',
        name: 'Field Console',
        year: '2024',
        summary:
          'Making complex equipment easier to operate, one decision at a time.',
        image: '/media/work-categories/experiments.png',
        imageAlt:
          'Concept product imagery for the Field Console example project',
        context:
          'Operators need to understand system status quickly, especially when something changes. Dense screens can hide the next useful action.',
        contribution:
          'Reorganised key tasks around operating states, designed a consistent hierarchy for alerts and built prototypes for normal, interrupted and recovery flows.',
        outcome:
          'A tested interaction direction, documented state transitions and a component specification ready for an engineering review.',
      },
    ],
  },
  {
    id: 'northstar',
    start: '2020',
    end: '2022',
    company: 'Northstar Labs',
    role: 'Product Designer',
    location: 'Hangzhou / On-site',
    introduction:
      'An early-stage team exploring the relationship between people, objects and software. Learning to turn open-ended problems into tangible experiments.',
    responsibilities:
      'Worked across discovery, user journeys and detailed UI. Built a shared component library and paired with developers to refine interaction states.',
    projects: [
      {
        id: 'resonance-one',
        name: 'Resonance One',
        year: '2021',
        summary:
          'Bringing a connected listening experience into everyday routines.',
        image: '/media/work-categories/selected-objects.png',
        imageAlt:
          'Concept object photography for the Resonance One example project',
        context:
          'Connected products should feel approachable before their companion app is even opened. This concept focused on the first few minutes of use.',
        contribution:
          'Designed onboarding, pairing and playback flows, with particular attention to feedback when a connection was lost or a step needed to be repeated.',
        outcome:
          'An end-to-end onboarding prototype and a reusable set of connection, loading and error states.',
      },
    ],
  },
  {
    id: 'beginnings',
    start: '2018',
    end: '2020',
    company: 'Form & Function',
    role: 'Visual & Digital Designer',
    location: 'Shanghai / On-site',
    introduction:
      'Where the practice began. Exploring visual identity, websites and small objects, and discovering how much good design depends on asking the right questions.',
    responsibilities:
      'Supported brand and digital projects through visual research, layout studies and production. Developed a lasting interest in typography, systems and the craft of making.',
    projects: [],
  },
];
