// Every word on the site lives in this file. Edit freely; the layout picks it up.
// Text can include simple HTML like <em> or <a href="...">. Anything starting with
// "TODO" is shown with a dashed outline so it's easy to spot before publishing.

window.CONTENT = {
  name: 'Gabriela Yaulli',
  greeting: 'hi, i’m Gabriela Yaulli',
  email: 'cgy4@cornell.edu',
  linkedin: 'https://www.linkedin.com/in/gabriela-yaulli-herrera/',
  github: 'https://github.com/cgyh98',

  intro: [
    'i’m an AI/ML engineer and graduate student studying Urban Tech at Cornell Tech. currently building Allpa, while learning how technology can shape cities, creativity, and the way we live.',
  ],
  location: 'new york, ny',

  // Leave `src` empty to show a placeholder instead.
  photo: { src: 'images/me.jpg', alt: 'Gabriela smiling in front of a window, with the East River and Manhattan at sunset behind her', caption: 'from Roosevelt Island :)' },

  // The home page links to these detail pages.
  pages: [
    { href: 'work.html', title: 'timeline of my work experience' },
    { href: 'education.html', title: 'my educational background' },
    { href: 'projects.html', title: 'my projects' },
    { href: 'talks.html', title: 'my talks' },
    { href: 'about.html', title: 'get to know me better :)' },
  ],

  // Header for each detail page: breadcrumb label and a one-line subtitle.
  headers: {
    work: { label: 'work', subtitle: 'timeline of my work experience' },
    education: { label: 'education', subtitle: 'my educational background' },
    projects: { label: 'projects', subtitle: 'my projects in ML × geospatial and tinkering' },
    talks: { label: 'talks', subtitle: 'talks, panels, teaching and events' },
    about: { label: 'about', subtitle: 'get to know me better :)' },
  },

  // The map on the projects page. `lived` is drawn as one route, in order;
  // `trips` branch off from wherever I lived at the time.
  map: {
    lived: [
      { name: 'Arequipa', coords: [-71.54, -16.41], note: 'grew up' },
      { name: 'Lima', coords: [-77.04, -12.05], note: '2015', href: 'projects.html#p-lima' },
      { name: 'Toronto', coords: [-79.38, 43.65], note: '2022', href: 'work.html#w-flipp' },
      { name: 'New York', coords: [-73.96, 40.75], note: 'now', href: 'projects.html#p-queens', now: true },
    ],
    trips: [
      { name: 'Andorra', coords: [1.52, 42.51], from: 'Lima', note: '2018', href: 'projects.html#p-andorra' },
      { name: 'Boston', coords: [-71.06, 42.36], from: 'Lima', note: 'poster at MIT', href: 'projects.html#p-lima' },
      { name: 'Montreal', coords: [-73.57, 45.5], from: 'Toronto', note: '2024', href: 'projects.html#p-glaciers' },
      { name: 'Nagpur', coords: [79.09, 21.15], from: 'Toronto', note: 'remote, 2023', href: 'projects.html#p-nagpur', offMap: true },
    ],
  },

  about: [
    'I like to start with the why. I use data and AI to solve complex, interdisciplinary problems, picking what actually works over what’s newest. I’m more of a connector than a specialist, and I care most when the work has social impact.',
    'I grew up in Peru, close to the Andes and the Amazon, with a deep respect for these ecosystems and the communities that call them home. As an engineer, that pushes me to build technology responsibly.',
    'Curiosity took me to Andorra, Canada, and now New York, where entrepreneurs, artists, and diverse communities from every field all collide, and I love being in the middle of it. My path hasn’t been linear, and I’m happy about that.',
  ],

  // All projects, newest first.
  projects: [
    {
      place: 'New York, NY',
      title: 'Sewing machine × video game controller',
      context: 'Designing with E-waste, Cornell Tech · Spring 2026',
      description: 'A sewing machine you control with a video game controller.',
    },
    {
      id: 'p-queens', place: 'New York, NY',
      title: 'The contested future of a hyperconnected neighborhood',
      context: 'Urban Systems, Cornell Tech, Fall 2025',
      description: 'Queens Community District 1 (Astoria and Long Island City) is one of NYC’s most transit-rich neighborhoods. That connectivity also drives gentrification, displacement and informal commuting like park-and-ride. I built the analysis around a “transit-induced displacement cycle”, combining spatial analysis, NYC open data and storytelling.',
      outcome: 'It was featured in <em>Concrete and Code</em>, the Substack of Cornell Tech’s Urban Tech Hub.',
      links: [
        { label: 'StoryMap', href: 'https://storymaps.arcgis.com/stories/fd1dd6c2bdb644898194bdefba17ec16' },
        { label: 'Concrete and Code feature', href: 'https://concreteandcode.substack.com/p/5-surprising-truths-about-how-nyc' },
      ],
    },
    {
      id: 'p-glaciers', place: 'Montreal, Canada',
      title: 'Monitoring glacier surface in the Peruvian Andes',
      context: 'Climate Change AI Summer School 2024, Mila',
      description: 'I was selected for the 40-participant in-person program at Mila. In one week, our interdisciplinary team built a prototype pipeline that combines satellite imagery with ML to estimate glacier surface area in the Peruvian Andes year by year.',
      outcome: 'We also animated projections for the Quelccaya glacier.',
      links: [
        { label: 'CCAI recap', href: 'https://www.climatechange.ai/blog/2024-12-04-summer-school-24-in-person' },
        { label: 'Quelccaya projections', href: 'https://www.youtube.com/watch?v=gDrTO2PZ7T0' },
      ],
    },
    {
      id: 'p-nagpur', place: 'remote',
      title: 'Road safety in Nagpur, India',
      context: 'FruitPunch AI, AI for Road Safety Challenge · 2023',
      description: 'With the India Applied AI Research Center (INAI), our team built interactive deck.gl visualizations that combine collision-avoidance alerts with hospital and school data, so stakeholders can spot risk-prone areas.',
      links: [
        { label: 'Blog post', href: 'https://www.fruitpunch.ai/blog/ai-and-visualisations-a-data-driven-all-rounded-approach-for-road-safety' },
        { label: 'Final presentation', href: 'https://youtu.be/FD9A25ZLFUQ?t=2237' },
      ],
    },
    {
      id: 'p-lima', place: 'Lima, Peru',
      title: 'Mapping poverty in Lima with machine learning and satellite imagery',
      context: 'AI Latam SumMIT 2020, Boston',
      description: 'A scalable methodology that combines satellite imagery with AI to map socioeconomic patterns across Lima Metropolitana. I developed the computer vision pipeline, with CNNs for feature extraction and SVM classifiers.',
      outcome: 'I presented it as a poster at the AI Latam SumMIT 2020.',
      links: [{ label: 'Poster (PDF)', href: 'pdf/AIsuMIT_Poster_A1.pdf' }],
    },
    {
      id: 'p-andorra', place: 'Andorra la Vella, Andorra',
      title: 'Tourist mobility in Andorra',
      context: 'Living Lab Andorra, with MIT Media Lab · 2018',
      description: 'I built tourist trajectories from RNC (Radio Network Controller) data and used sub-trajectory clustering to find the most frequent tourist routes.',
      links: [{ label: 'A full day of movement (video)', href: 'https://www.youtube.com/watch?v=T52diroghDc' }],
    },
  ],

  // One line shows by default; `details` appear when the row is opened.
  work: [
    {
      org: 'House IQ', role: 'AI Engineering Intern', place: 'New York', when: 'May–Aug 2026',
      summary: 'Evals and fixes for a LangGraph cost-estimation agent.',
      details: [
        'Designed accuracy evaluations in Langfuse and benchmarked the agent against leading LLMs. Found and fixed a silent web-search fallback failure affecting over 90% of cases with unreliable primary data.',
        'Improved estimate accuracy and geographic coverage, including a Qdrant vector-to-web-search fallback for underserved markets.',
        'Extended the agent to handle compound, multi-task requests and re-price mid-conversation.',
      ],
    },
    {
      org: 'Cornell Tech', role: 'Teaching Assistant', place: 'New York', when: 'Spring 2026',
      summary: 'TA for Productizing ML and for Product Management.',
      details: [],
    },
    {
      id: 'w-flipp',
      org: 'Flipp', role: 'ML Scientist I & II', place: 'Toronto', when: 'Jul 2022–Aug 2025',
      summary: 'Multimodal LLM pipelines and evaluation, search personalization for 5M+ users, and the company’s first reinforcement learning solution.',
      details: [
        'Built AutoTag, a multimodal LLM pipeline that extracts structured metadata from text and images. It replaced an OCR-limited BERT system and processes 100M+ items a day.',
        'Co-developed a production embedding service for hybrid search and item matching, and AutoJudge, an LLM-based evaluation system for pipeline QA.',
        'Personalized search for 5M+ users, improving the average position at first click by 3%. Designed and ran A/B tests across 2M+ users.',
        'Implemented a multi-armed contextual bandit for content recommendation, the company’s first reinforcement learning solution.',
      ],
    },
    {
      org: 'Ontop & QuantumTalent', role: 'Data Scientist', place: 'Lima', when: 'Jul 2021–Jun 2022',
      summary: 'The company’s first data scientist. Led the data lake from idea to two business use cases in one quarter.',
      details: [
        'Built the business case that got leadership buy-in for the first data engineering team, then led the data lake from conception to implementation.',
      ],
    },
    {
      org: 'RIMAC Seguros', role: 'Data Scientist, Growth', place: 'Lima', when: 'Mar 2020–Jun 2021',
      summary: 'Propensity and LTV models, including a 170% quarterly revenue lift on an investment product.',
      details: [
        'Built XGBoost propensity and customer LTV models for the digital growth team: a 170% quarterly revenue lift for a financial investment product and a 50% gain in Meta campaign effectiveness.',
      ],
    },
    {
      org: 'Earlier', role: 'Internships and research', place: 'Lima · Andorra', when: '2017–2020',
      summary: 'Data science at Valia, a research internship at CityScope Andorra, and research assistant at Universidad del Pacífico.',
      details: [],
    },
  ],

  // Newest first.
  talks: [
    { title: 'Co-author of the AI for Transportation tutorial and teaching assistant', where: 'Climate Change AI Virtual Summer School, for 5,000+ participants', when: '2026' },
    { title: 'Co-organizer, Keeping It Urban', where: 'Student-run tech summit during NYC Open Data Week, New York', when: 'Mar 2026',
      description: 'Led operations and volunteer coordination for a summit featuring robotics and AI interfaces, for 150+ attendees.',
      link: { label: 'keepingiturban.com', href: 'https://keepingiturban.com/' } },
    { title: 'Panelist, “Promoting Female Participation in STEM”', where: 'Women in Data Science (WiDS), Universidad del Pacífico, Lima', when: '2021 & 2024' },
    { title: 'Represented Flipp’s AI team', where: 'Spatial Data Science Conference, hosted by CARTO, New York', when: '2022' },
    { title: '“How AI & Remote Sensing Data Can Be Used to Fight Poverty”', where: 'Women in Data Science (WiDS) with Aporta, Lima', when: 'Mar 2020' },
    { title: 'Poster: “Using Machine Learning to Identify Poverty in Lima Metropolitana with Satellite Imagery”', where: 'AI Latin American SumMIT 2020, MIT, Boston', when: '', link: { label: 'Poster (PDF)', href: 'pdf/AIsuMIT_Poster_A1.pdf' } },
    { title: 'Speaker on my CityScope Andorra internship', where: 'International Forum “Smart Cities: Technologies and narratives to create sustainable cities”, Lima', when: 'Apr 2019' },
  ],

  education: [
    { school: 'Cornell Tech, Cornell University', degree: 'MS in Applied Info Science & Info Systems, Urban Tech. Merit Scholarship', when: 'May 2027',
      activities: 'Urban Tech Program Representative, <a href="https://ctsg.tech.cornell.edu/#/members">Cornell Tech Student Government</a>' },
    { school: 'Universidad del Pacífico', degree: 'BS, Information Engineering. Academic Excellence Award', when: 'Aug 2020' },
  ],

  currently: [
    'finishing my master’s at Cornell Tech (May 2027)',
    'leading the Latin American & Hispanic Association and organizing creative tech events at <a href="https://joinvibelab.com/">VibeLab</a>',
    'building a procedural <a href="https://bioluminescent-ocean.web.app/#world">bioluminescent ocean</a>',
  ],

  next: {
    heading: 'next, after May 2027',
    text: 'I want to join a team working on a problem I care about, ideally at a startup. The problem matters as much as the role. I do my best work when I believe in what we’re building. The spaces that excite me most:',
    items: [
      'Urban tech: cities, mobility, and the built environment',
      'Design and creative tech: AI that supports the creative process',
      'Wearables and on-device AI: especially for women’s health',
    ],
  },

  outside: [
    'I love spending time with my loved ones, in nature, and around art and music, which is a big part of my life. Design is close to my heart, and visualization is where my artistic and data sides meet.',
    'I value diversity in people, cultures, industries, and points of view, and I’m always picking up something new. My current hobby is photography.',
  ],

  connect: 'if you’re building something in urban tech, creative tech or on-device AI, or just want to talk about cities, maps or art, i’d love to hear from you.',
};
