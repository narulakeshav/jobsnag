export default [
  {
    name: 'lever',
    links: [
      { type: 'linkedin', name: 'LinkedIn' },
      { type: 'twitter', name: 'Twitter' },
      { type: 'github', name: 'GitHub' },
      { type: 'portfolio', name: 'Portfolio' },
      { type: 'other', name: 'Other' },
    ],
    options: [
      { type: 'gender', name: 'gender' },
      { type: 'race', name: 'race' },
      { type: 'veteran', name: 'veteran' },
    ],
  },
  {
    name: 'greenhouse',
    links: [
      { type: 'linkedin', name: 'linkedin-profile' },
      { type: 'portfolio', name: 'website' },
    ],
    options: [
      { type: 'gender', name: 'gender', id: 0 },
      { type: 'hispanic', name: 'hispanic_ethnicity', id: 1 },
      { type: 'race', name: 'race', id: 2 },
      { type: 'veteran', name: 'veteran_status', id: 3 },
      { type: 'disability', name: 'disability_status', id: 4 },
    ],
  },
];
