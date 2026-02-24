export interface DataSource {
  id: string;
  name: string;
  provider: string;
  category: 'Trade' | 'Economy' | 'Demographics' | 'Health' | 'Geospatial';
  description: string;
  url: string;
  qualityScore: number;
}

export interface CompliancePath {
  id: string;
  type: string;
  threshold: string;
  requirement: string;
  description: string;
}

export const DATA_SOURCES: DataSource[] = [
  {
    id: 'un-comtrade',
    name: 'UN Comtrade',
    provider: 'United Nations',
    category: 'Trade',
    description: 'The gold standard for global trade analysis with over 1 billion records.',
    url: 'https://comtrade.un.org/',
    qualityScore: 98,
  },
  {
    id: 'wb-open-data',
    name: 'World Bank Open Data',
    provider: 'World Bank',
    category: 'Economy',
    description: 'Long-term series data covering education, health, environment, and infrastructure.',
    url: 'https://data.worldbank.org/',
    qualityScore: 95,
  },
  {
    id: 'imf-data',
    name: 'IMF Data',
    provider: 'International Monetary Fund',
    category: 'Economy',
    description: 'Macroeconomic data with high transparency and international comparability.',
    url: 'https://www.imf.org/en/Data',
    qualityScore: 96,
  },
  {
    id: 'un-population',
    name: 'UN Population Division',
    provider: 'United Nations',
    category: 'Demographics',
    description: 'Detailed fertility, mortality, and migration data for social policy research.',
    url: 'https://population.un.org/wpp/',
    qualityScore: 94,
  },
];

export const COMPLIANCE_PATHS: CompliancePath[] = [
  {
    id: 'important-data',
    type: 'Important Data',
    threshold: 'Any amount',
    requirement: 'Security Assessment',
    description: 'Must report for security assessment. Defined by relevant authorities.',
  },
  {
    id: 'sensitive-personal',
    type: 'Sensitive Personal Info',
    threshold: '>= 10,000 people',
    requirement: 'Security Assessment',
    description: 'Requires full security assessment if threshold met.',
  },
  {
    id: 'standard-personal',
    type: 'Personal Info',
    threshold: '100k - 1M people',
    requirement: 'Standard Contract',
    description: 'Sign standard contract or obtain certification.',
  },
  {
    id: 'exempt-personal',
    type: 'Personal Info',
    threshold: '< 100,000 people',
    requirement: 'Exempt',
    description: 'Exempt from security assessment and standard contracts for non-CIIO.',
  },
];
