export const NAV_LINKS = [
  { label: 'Approach', href: '#about' },
  { label: 'Technology', href: '#technology' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Impact', href: '#impact' },
  { label: 'Insights', href: '#research' },
] as const

export const TECH_CARDS = [
  {
    index: '01',
    title: 'Computational Biology',
    body: 'Turning complex biological systems into measurable, interpretable data that researchers can query like software.',
  },
  {
    index: '02',
    title: 'AI-Driven Discovery',
    body: 'Using machine intelligence to accelerate research cycles and surface meaningful patterns hidden in molecular noise.',
  },
  {
    index: '03',
    title: 'Molecular Engineering',
    body: 'Designing biological systems with the precision, repeatability, and scalability of an engineering discipline.',
  },
  {
    index: '04',
    title: 'Precision Analytics',
    body: 'Transforming raw biological signal into calibrated decisions research teams can act on with confidence.',
  },
] as const

export const CAPABILITIES = [
  {
    index: '01',
    title: 'Biological Research',
    body: 'Wet-lab programs designed around measurable hypotheses and instrumented from day one.',
  },
  {
    index: '02',
    title: 'Computational Modeling',
    body: 'Mechanistic and statistical models that make living systems predictable enough to engineer.',
  },
  {
    index: '03',
    title: 'AI-Assisted Discovery',
    body: 'Learning systems that propose, rank, and refine candidate molecules across design cycles.',
  },
  {
    index: '04',
    title: 'Molecular Engineering',
    body: 'Design–build–test loops that treat molecules as versioned, testable components.',
  },
  {
    index: '05',
    title: 'Data Intelligence',
    body: 'A unified signal layer connecting instruments, models, and researchers in real time.',
  },
] as const

export const STATS = [
  { value: 98.4, suffix: '%', decimals: 1, label: 'Data precision' },
  { value: 4.8, suffix: '×', decimals: 1, label: 'Faster analysis' },
  { value: 12, suffix: 'M+', decimals: 0, label: 'Biological signals processed' },
  { value: 27, suffix: '', decimals: 0, label: 'Research models' },
] as const

export const INSIGHTS = [
  {
    index: '01',
    category: 'Perspective',
    title: 'The rise of programmable biology',
    body: 'Why treating living systems as an engineering substrate changes what research teams can attempt.',
  },
  {
    index: '02',
    category: 'Research',
    title: 'AI is changing biological discovery',
    body: 'Learning systems now shape which experiments are worth running — before a single sample is prepared.',
  },
  {
    index: '03',
    category: 'Platform',
    title: 'Precision is becoming scalable',
    body: 'Instrumented pipelines make single-experiment accuracy repeatable across entire research programs.',
  },
] as const

export const SYSTEM_STAGES = [
  { label: 'Biology', detail: 'Living systems observed at molecular resolution.' },
  { label: 'Data', detail: 'Signals captured, cleaned, and structured continuously.' },
  { label: 'Computation', detail: 'Models simulate, predict, and rank what to test next.' },
  { label: 'Discovery', detail: 'Validated findings emerge from tighter research loops.' },
  { label: 'Impact', detail: 'Results translate into healthier, more sustainable outcomes.' },
] as const
