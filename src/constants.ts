export interface DataSource {
  id: string;
  name: string;
  provider: string;
  category: '貿易' | '經濟' | '人口' | '健康' | '地理';
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
    name: 'UN Comtrade (聯合國商品貿易數據庫)',
    provider: '聯合國',
    category: '貿易',
    description: '全球商品貿易分析的黃金標準，擁有超過 10 億條記錄。',
    url: 'https://comtrade.un.org/',
    qualityScore: 98,
  },
  {
    id: 'wb-open-data',
    name: '世界銀行開放數據',
    provider: '世界銀行',
    category: '經濟',
    description: '涵蓋教育、健康、環境和基礎設施的長期序列數據。',
    url: 'https://data.worldbank.org/',
    qualityScore: 95,
  },
  {
    id: 'imf-data',
    name: 'IMF 數據',
    provider: '國際貨幣基金組織',
    category: '經濟',
    description: '具有高透明度和國際可比性的宏觀經濟數據。',
    url: 'https://www.imf.org/en/Data',
    qualityScore: 96,
  },
  {
    id: 'un-population',
    name: '聯合國人口司',
    provider: '聯合國',
    category: '人口',
    description: '用於社會政策研究的詳細生育率、死亡率和遷移數據。',
    url: 'https://population.un.org/wpp/',
    qualityScore: 94,
  },
];

export const COMPLIANCE_PATHS: CompliancePath[] = [
  {
    id: 'important-data',
    type: '重要數據',
    threshold: '任何數量',
    requirement: '安全評估',
    description: '必須申報安全評估。由相關部門定義。',
  },
  {
    id: 'sensitive-personal',
    type: '敏感個人信息',
    threshold: '>= 10,000 人',
    requirement: '安全評估',
    description: '如果達到閾值，需要進行全面的安全評估。',
  },
  {
    id: 'standard-personal',
    type: '個人信息',
    threshold: '10萬 - 100萬人',
    requirement: '標準合同',
    description: '簽署標準合同或獲得認證。',
  },
  {
    id: 'exempt-personal',
    type: '個人信息',
    threshold: '< 100,000 人',
    requirement: '豁免',
    description: '非關鍵信息基礎設施運營者（非CIIO）豁免安全評估和標準合同。',
  },
];
