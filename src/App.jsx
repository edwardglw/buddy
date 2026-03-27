import { useState } from 'react'

// ─── Palette ──────────────────────────────────────────────────────────────────
const PALETTE = [
  '#e63946','#f4a261','#2a9d8f','#457b9d','#6a4c93',
  '#e76f51','#264653','#2196f3','#8338ec','#fb5607',
  '#06d6a0','#118ab2','#ef476f','#ffd166','#073b4c',
  '#3a86ff','#ff006e','#8ecae6','#023047','#c77dff',
  '#52b788','#b5838d','#6d6875','#e9c46a','#219ebc',
  '#023e8a','#d62828','#f77f00','#fcbf49','#eae2b7',
]

function getColour(topic, allTopics) {
  const i = allTopics.indexOf(topic)
  return i >= 0 ? PALETTE[i % PALETTE.length] : '#9ca3af'
}

// ─── Topics ───────────────────────────────────────────────────────────────────
const CLOUD_TOPICS = [
  'AWS','Azure','Cloud Migration','Cloud Networking','Cloud Security & DevSecOps',
  'Cloud Storage & Databases','Data Engineering','FinOps & Cloud Cost Management',
  'Google Cloud Platform','Infrastructure as Code','Kubernetes & Containers',
  'Multi-Cloud Strategy','Platform Engineering','Serverless Architecture',
  'Site Reliability Engineering (SRE)',
]

const AI_TOPICS = [
  'AI Agents & Automation','AI Ethics & Governance','AI in Cybersecurity',
  'Computer Vision','Data Science & Analytics','Fine-tuning & Model Adaptation',
  'Generative AI for Business','Large Language Models (LLMs)',
  'Machine Learning Fundamentals','MLOps & Model Deployment',
  'Natural Language Processing (NLP)','Prompt Engineering','Responsible AI',
  'Retrieval-Augmented Generation (RAG)','UX / Front-End AI Tooling',
]

// ─── Learning links ───────────────────────────────────────────────────────────
const LINKS = {
  'AWS': [
    { title: 'AWS Documentation', url: 'https://docs.aws.amazon.com' },
    { title: 'AWS Skill Builder', url: 'https://skillbuilder.aws' },
    { title: 'AWS Well-Architected', url: 'https://aws.amazon.com/architecture/well-architected/' },
    { title: 'A Cloud Guru', url: 'https://acloudguru.com/aws-cloud-training' },
    { title: 'freeCodeCamp AWS', url: 'https://www.freecodecamp.org/news/tag/aws/' },
  ],
  'Azure': [
    { title: 'Microsoft Learn – Azure', url: 'https://learn.microsoft.com/en-us/azure/' },
    { title: 'Azure Architecture Center', url: 'https://learn.microsoft.com/en-us/azure/architecture/' },
    { title: 'AZ-900 Fundamentals', url: 'https://learn.microsoft.com/en-us/certifications/azure-fundamentals/' },
    { title: 'Azure Friday Videos', url: 'https://learn.microsoft.com/en-us/shows/azure-friday/' },
    { title: "John Savill's Azure Course", url: 'https://www.youtube.com/@NTFAQGuy' },
  ],
  'Google Cloud Platform': [
    { title: 'Google Cloud Skills Boost', url: 'https://cloudskillsboost.google' },
    { title: 'GCP Documentation', url: 'https://cloud.google.com/docs' },
    { title: 'Coursera – Google Cloud', url: 'https://www.coursera.org/googlecloud' },
    { title: 'Google Cloud Blog', url: 'https://cloud.google.com/blog' },
    { title: 'GCP YouTube Channel', url: 'https://www.youtube.com/@googlecloud' },
  ],
  'Cloud Migration': [
    { title: 'AWS Migration Hub', url: 'https://aws.amazon.com/migration-hub/' },
    { title: 'Azure Migrate', url: 'https://azure.microsoft.com/en-us/products/azure-migrate/' },
    { title: 'Google Cloud Migration', url: 'https://cloud.google.com/solutions/migration-center' },
    { title: 'Gartner Cloud Migration', url: 'https://www.gartner.com/en/information-technology/topics/cloud-migration' },
    { title: 'CNCF Projects', url: 'https://www.cncf.io/projects/' },
  ],
  'Cloud Networking': [
    { title: 'AWS Networking Fundamentals', url: 'https://aws.amazon.com/getting-started/hands-on/net-to-vpc/' },
    { title: 'Azure Networking Overview', url: 'https://learn.microsoft.com/en-us/azure/networking/fundamentals/networking-overview' },
    { title: 'GCP VPC Docs', url: 'https://cloud.google.com/vpc/docs/overview' },
    { title: 'Cloudflare Learning', url: 'https://www.cloudflare.com/learning/cloud/what-is-cloud-networking/' },
    { title: 'CNCF Networking', url: 'https://www.cncf.io/projects/' },
  ],
  'Cloud Security & DevSecOps': [
    { title: 'OWASP Cloud Security', url: 'https://owasp.org/www-project-cloud-native-application-security-top-10/' },
    { title: 'AWS Security Best Practices', url: 'https://aws.amazon.com/architecture/security-identity-compliance/' },
    { title: 'DevSecOps – GitLab', url: 'https://about.gitlab.com/topics/devsecops/' },
    { title: 'NIST Cloud Security', url: 'https://www.nist.gov/programs-projects/nist-cloud-computing-program' },
    { title: 'Snyk Learn', url: 'https://learn.snyk.io' },
  ],
  'Cloud Storage & Databases': [
    { title: 'AWS Database Services', url: 'https://aws.amazon.com/products/databases/' },
    { title: 'Azure Data Services', url: 'https://azure.microsoft.com/en-us/products/category/databases/' },
    { title: 'GCP Storage Options', url: 'https://cloud.google.com/storage-options' },
    { title: 'MongoDB Cloud', url: 'https://www.mongodb.com/cloud' },
    { title: 'Coursera Database Design', url: 'https://www.coursera.org/learn/intro-to-databases' },
  ],
  'Data Engineering': [
    { title: 'DataTalks.Club', url: 'https://datatalks.club' },
    { title: 'dbt Learn', url: 'https://courses.getdbt.com' },
    { title: 'Apache Spark Docs', url: 'https://spark.apache.org/docs/latest/' },
    { title: 'Airflow Docs', url: 'https://airflow.apache.org/docs/' },
    { title: 'Fundamentals of Data Eng.', url: 'https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/' },
  ],
  'FinOps & Cloud Cost Management': [
    { title: 'FinOps Foundation', url: 'https://www.finops.org' },
    { title: 'AWS Cost Explorer', url: 'https://aws.amazon.com/aws-cost-management/aws-cost-explorer/' },
    { title: 'Azure Cost Management', url: 'https://azure.microsoft.com/en-us/products/cost-management/' },
    { title: 'GCP Cost Management', url: 'https://cloud.google.com/cost-management' },
    { title: 'FinOps Certification', url: 'https://learn.finops.org' },
  ],
  'Infrastructure as Code': [
    { title: 'Terraform Learn', url: 'https://developer.hashicorp.com/terraform/tutorials' },
    { title: 'Pulumi Docs', url: 'https://www.pulumi.com/docs/' },
    { title: 'AWS CloudFormation', url: 'https://docs.aws.amazon.com/cloudformation/' },
    { title: 'Ansible Docs', url: 'https://docs.ansible.com' },
    { title: 'HashiCorp IaC Best Practices', url: 'https://www.hashicorp.com/resources/infrastructure-as-code-best-practices' },
  ],
  'Kubernetes & Containers': [
    { title: 'Kubernetes Docs', url: 'https://kubernetes.io/docs/home/' },
    { title: 'Docker Getting Started', url: 'https://docs.docker.com/get-started/' },
    { title: 'CNCF Training', url: 'https://www.cncf.io/training/' },
    { title: 'KodeKloud K8s', url: 'https://kodekloud.com/courses/kubernetes-for-beginners/' },
    { title: 'Play with Kubernetes', url: 'https://labs.play-with-k8s.com' },
  ],
  'Multi-Cloud Strategy': [
    { title: 'Gartner Multi-Cloud', url: 'https://www.gartner.com/en/information-technology/topics/multicloud' },
    { title: 'Azure Arc', url: 'https://azure.microsoft.com/en-us/products/azure-arc/' },
    { title: 'GCP Anthos', url: 'https://cloud.google.com/anthos' },
    { title: 'AWS Outposts', url: 'https://aws.amazon.com/outposts/' },
    { title: 'CNCF Multi-Cloud', url: 'https://www.cncf.io/projects/' },
  ],
  'Platform Engineering': [
    { title: 'Platform Engineering Org', url: 'https://platformengineering.org' },
    { title: 'Backstage (IDP)', url: 'https://backstage.io' },
    { title: 'CNCF Platform White Paper', url: 'https://tag-app-delivery.cncf.io/whitepapers/platforms/' },
    { title: 'Internal Developer Platforms', url: 'https://internaldeveloperplatform.org' },
    { title: 'Team Topologies', url: 'https://teamtopologies.com' },
  ],
  'Serverless Architecture': [
    { title: 'AWS Lambda Docs', url: 'https://docs.aws.amazon.com/lambda/' },
    { title: 'Azure Functions', url: 'https://learn.microsoft.com/en-us/azure/azure-functions/' },
    { title: 'GCP Cloud Functions', url: 'https://cloud.google.com/functions/docs' },
    { title: 'Serverless Framework', url: 'https://www.serverless.com/framework/docs' },
    { title: 'Serverless Land', url: 'https://serverlessland.com' },
  ],
  'Site Reliability Engineering (SRE)': [
    { title: 'Google SRE Book (free)', url: 'https://sre.google/sre-book/table-of-contents/' },
    { title: 'SRE Weekly', url: 'https://sreweekly.com' },
    { title: 'Coursera SRE Course', url: 'https://www.coursera.org/learn/site-reliability-engineering-slos' },
    { title: 'OpenSLO Standard', url: 'https://openslo.com' },
    { title: 'Incident.io Blog', url: 'https://incident.io/blog' },
  ],
  'AI Agents & Automation': [
    { title: 'LangChain Docs', url: 'https://python.langchain.com/docs/get_started/introduction' },
    { title: 'CrewAI Framework', url: 'https://www.crewai.com' },
    { title: 'Microsoft AutoGen', url: 'https://microsoft.github.io/autogen/' },
    { title: 'AutoGPT', url: 'https://github.com/Significant-Gravitas/AutoGPT' },
    { title: 'Agent Protocol', url: 'https://agentprotocol.ai' },
  ],
  'AI Ethics & Governance': [
    { title: 'EU AI Ethics Guidelines', url: 'https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai' },
    { title: 'NIST AI RMF', url: 'https://www.nist.gov/artificial-intelligence' },
    { title: 'Partnership on AI', url: 'https://partnershiponai.org' },
    { title: 'AI Now Institute', url: 'https://ainowinstitute.org' },
    { title: 'Algorithm Watch', url: 'https://algorithmwatch.org' },
  ],
  'AI in Cybersecurity': [
    { title: 'MITRE ATLAS', url: 'https://atlas.mitre.org' },
    { title: 'OWASP AI Security', url: 'https://owasp.org/www-project-ai-security-and-privacy-guide/' },
    { title: 'NCSC AI Security', url: 'https://www.ncsc.gov.uk/collection/ai-security' },
    { title: 'Google Security Blog', url: 'https://security.googleblog.com' },
    { title: 'Darktrace Research', url: 'https://darktrace.com/research' },
  ],
  'Computer Vision': [
    { title: 'OpenCV Docs', url: 'https://docs.opencv.org' },
    { title: 'Fast.ai Computer Vision', url: 'https://course.fast.ai' },
    { title: 'Roboflow Learn', url: 'https://roboflow.com/learn' },
    { title: 'Papers With Code – CV', url: 'https://paperswithcode.com/area/computer-vision' },
    { title: 'HuggingFace Vision Models', url: 'https://huggingface.co/models?pipeline_tag=image-classification' },
  ],
  'Data Science & Analytics': [
    { title: 'Kaggle Learn', url: 'https://www.kaggle.com/learn' },
    { title: 'DataCamp', url: 'https://www.datacamp.com' },
    { title: 'Towards Data Science', url: 'https://towardsdatascience.com' },
    { title: 'StatQuest (YouTube)', url: 'https://www.youtube.com/@statquest' },
    { title: 'Mode Analytics Blog', url: 'https://mode.com/blog/' },
  ],
  'Fine-tuning & Model Adaptation': [
    { title: 'HuggingFace PEFT', url: 'https://huggingface.co/docs/peft/index' },
    { title: 'LoRA Paper', url: 'https://arxiv.org/abs/2106.09685' },
    { title: 'Fast.ai Practical DL', url: 'https://course.fast.ai' },
    { title: 'Axolotl Fine-tuning', url: 'https://github.com/axolotl-ai-cloud/axolotl' },
    { title: 'Unsloth', url: 'https://github.com/unslothai/unsloth' },
  ],
  'Generative AI for Business': [
    { title: 'McKinsey – Gen AI', url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai' },
    { title: 'AWS Generative AI', url: 'https://aws.amazon.com/generative-ai/' },
    { title: 'Microsoft Copilot Adoption', url: 'https://adoption.microsoft.com/en-us/copilot/' },
    { title: 'Google Vertex AI Gen', url: 'https://cloud.google.com/vertex-ai/generative-ai/docs/overview' },
    { title: 'HBR – AI for Business', url: 'https://hbr.org/topic/subject/artificial-intelligence' },
  ],
  'Large Language Models (LLMs)': [
    { title: 'Andrej Karpathy (YouTube)', url: 'https://www.youtube.com/@AndrejKarpathy' },
    { title: 'HuggingFace NLP Course', url: 'https://huggingface.co/learn/nlp-course/chapter1/1' },
    { title: 'LLM Leaderboard', url: 'https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard' },
    { title: "Lilian Weng's Blog", url: 'https://lilianweng.github.io' },
    { title: 'The Batch – Andrew Ng', url: 'https://www.deeplearning.ai/the-batch/' },
  ],
  'Machine Learning Fundamentals': [
    { title: 'Fast.ai Practical ML', url: 'https://course.fast.ai' },
    { title: 'Google ML Crash Course', url: 'https://developers.google.com/machine-learning/crash-course' },
    { title: 'Andrew Ng – ML Spec.', url: 'https://www.coursera.org/specializations/machine-learning-introduction' },
    { title: 'Scikit-learn User Guide', url: 'https://scikit-learn.org/stable/user_guide.html' },
    { title: '3Blue1Brown – Neural Nets', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi' },
  ],
  'MLOps & Model Deployment': [
    { title: 'MLflow Docs', url: 'https://mlflow.org/docs/latest/index.html' },
    { title: 'Weights & Biases', url: 'https://wandb.ai/site' },
    { title: 'Made With ML', url: 'https://madewithml.com' },
    { title: 'Evidently AI', url: 'https://www.evidentlyai.com' },
    { title: 'BentoML', url: 'https://www.bentoml.com' },
  ],
  'Natural Language Processing (NLP)': [
    { title: 'HuggingFace NLP Course', url: 'https://huggingface.co/learn/nlp-course/chapter1/1' },
    { title: 'spaCy Docs', url: 'https://spacy.io/usage' },
    { title: 'Stanford NLP', url: 'https://nlp.stanford.edu' },
    { title: 'NLTK Book (free)', url: 'https://www.nltk.org/book/' },
    { title: 'Papers With Code – NLP', url: 'https://paperswithcode.com/area/natural-language-processing' },
  ],
  'Prompt Engineering': [
    { title: 'Anthropic Prompt Library', url: 'https://docs.anthropic.com/en/prompt-library/library' },
    { title: 'OpenAI Prompt Guide', url: 'https://platform.openai.com/docs/guides/prompt-engineering' },
    { title: 'Learn Prompting (free)', url: 'https://learnprompting.org' },
    { title: 'Prompting Guide', url: 'https://www.promptingguide.ai' },
    { title: 'DAIR.AI Prompt Course', url: 'https://github.com/dair-ai/Prompt-Engineering-Guide' },
  ],
  'Responsible AI': [
    { title: 'Google Responsible AI', url: 'https://ai.google/responsibility/responsible-ai-practices/' },
    { title: 'Microsoft Responsible AI', url: 'https://www.microsoft.com/en-us/ai/responsible-ai' },
    { title: 'IBM AI Ethics', url: 'https://www.ibm.com/artificial-intelligence/ethics' },
    { title: 'Fast.ai Ethics Course', url: 'https://ethics.fast.ai' },
    { title: 'Algorithmic Justice League', url: 'https://www.ajl.org' },
  ],
  'Retrieval-Augmented Generation (RAG)': [
    { title: 'LlamaIndex Docs', url: 'https://docs.llamaindex.ai' },
    { title: 'LangChain RAG Guide', url: 'https://python.langchain.com/docs/use_cases/question_answering/' },
    { title: 'Pinecone Learn', url: 'https://www.pinecone.io/learn/' },
    { title: 'RAG Survey Paper', url: 'https://arxiv.org/abs/2312.10997' },
    { title: 'Weaviate RAG Guide', url: 'https://weaviate.io/learn/recipes/rag' },
  ],
  'UX / Front-End AI Tooling': [
    { title: 'Vercel v0', url: 'https://v0.dev' },
    { title: 'Figma AI Features', url: 'https://www.figma.com/ai/' },
    { title: 'GitHub Copilot', url: 'https://github.com/features/copilot' },
    { title: 'Framer AI', url: 'https://www.framer.com/ai' },
    { title: 'Builder.io AI', url: 'https://www.builder.io/ai' },
  ],
}

const FALLBACK_LINKS = [
  { title: 'Coursera Technology', url: 'https://www.coursera.org/browse/information-technology' },
  { title: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning/' },
  { title: 'Pluralsight', url: 'https://www.pluralsight.com' },
  { title: "O'Reilly Learning", url: 'https://www.oreilly.com' },
  { title: 'edX Technology', url: 'https://www.edx.org/learn/technology' },
]

function getLinks(topic, offset) {
  const pool = LINKS[topic] || FALLBACK_LINKS
  return [0, 1, 2].map(i => pool[(offset * 3 + i) % pool.length])
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function isValidName(name) {
  return /^[A-Za-z]+(?: [A-Za-z])?$/.test(name.trim())
}

function avatarColour(name) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h)
  return PALETTE[Math.abs(h) % PALETTE.length]
}

function initials(name) {
  const p = name.trim().split(' ')
  return p.length >= 2 ? (p[0][0] + p[p.length - 1][0]).toUpperCase() : name.slice(0, 2).toUpperCase()
}

function pairingType(members) {
  const lvls = members.map(m => m.level)
  return lvls.every(l => l === lvls[0]) ? 'Peer pairing' : 'Mentor / Mentee'
}

// ─── Default data ─────────────────────────────────────────────────────────────
const ALL_TOPICS = [...CLOUD_TOPICS, ...AI_TOPICS]

const DEFAULT_DATA = {
  topics: ALL_TOPICS,
  entries: [],
  groups: [{
    id: 1,
    topic: 'UX / Front-End AI Tooling',
    members: [
      { name: 'Ed L', level: 'Intermediate' },
      { name: 'James R', level: 'Intermediate' },
    ],
  }],
}

// ─── Shared styles ────────────────────────────────────────────────────────────
const inputStyle = {
  width: '100%', padding: '10px 12px', border: '1.5px solid #e5e7eb',
  borderRadius: 8, fontSize: 14, color: '#111827', outline: 'none',
  background: '#fff',
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ name, size = 36 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: avatarColour(name),
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 700, fontSize: size * 0.38,
      flexShrink: 0, letterSpacing: 0.5, userSelect: 'none',
    }}>
      {initials(name)}
    </div>
  )
}

// ─── Badge ────────────────────────────────────────────────────────────────────
function Badge({ level }) {
  const c = { Beginner: ['#dbeafe','#1d4ed8'], Intermediate: ['#fef3c7','#b45309'], Expert: ['#dcfce7','#15803d'] }[level] || ['#f3f4f6','#374151']
  return <span style={{ background: c[0], color: c[1], fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99 }}>{level}</span>
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ title, children, onClose }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 440, maxHeight: 'calc(100vh - 32px)', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 0' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, color: '#9ca3af', cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: '16px 24px 24px' }}>{children}</div>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  )
}

// ─── MemberCard ───────────────────────────────────────────────────────────────
function MemberCard({ member, onRemove }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, minWidth: 150, position: 'relative' }}
    >
      <Avatar name={member.name} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{member.name}</div>
        <div style={{ marginTop: 4 }}><Badge level={member.level} /></div>
      </div>
      {hovered && (
        <button
          onClick={onRemove}
          aria-label={`Remove ${member.name}`}
          style={{ position: 'absolute', top: 6, right: 8, background: 'none', border: 'none', color: '#6b7280', fontSize: 18, cursor: 'pointer', lineHeight: 1, padding: 2 }}
        >×</button>
      )}
    </div>
  )
}

// ─── SuggestedLearning ────────────────────────────────────────────────────────
function SuggestedLearning({ group, offset, onRefresh }) {
  const links = getLinks(group.topic, offset)
  return (
    <div style={{ width: 210, flexShrink: 0, background: '#f8f9fb', borderRadius: 10, border: '1px solid #e5e7eb', padding: '14px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 0.8 }}>Suggested Learning</span>
        <button
          onClick={onRefresh}
          title="Refresh links"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: 15, lineHeight: 1, padding: 0 }}
        >↻</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 13, color: '#2563eb', textDecoration: 'none',
              display: 'flex', alignItems: 'flex-start', gap: 6, lineHeight: 1.4,
            }}
          >
            <span style={{ marginTop: 2, flexShrink: 0, fontSize: 10 }}>↗</span>
            <span style={{ borderBottom: '1px solid transparent' }}
              onMouseEnter={e => e.currentTarget.style.borderBottomColor = '#2563eb'}
              onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'transparent'}
            >{link.title}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

// ─── GroupRow ─────────────────────────────────────────────────────────────────
function GroupRow({ group, linkOffset, onRemoveMember, onRefreshLinks }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>
        {pairingType(group.members)}
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, flex: 1 }}>
          {group.members.map((member, mi) => (
            <MemberCard key={mi} member={member} onRemove={() => onRemoveMember(group.id, mi)} />
          ))}
        </div>
        <SuggestedLearning group={group} offset={linkOffset} onRefresh={onRefreshLinks} />
      </div>
    </div>
  )
}

// ─── CardHeader — shared by TopicCard and WaitingTopicCard ───────────────────
function CardHeader({ topic, allTopics, actionButton }) {
  const colour = getColour(topic, allTopics)
  const category = CLOUD_TOPICS.includes(topic) ? 'Cloud' : AI_TOPICS.includes(topic) ? 'AI' : 'Custom'
  const catStyle = {
    Cloud: { bg: '#eff6ff', text: '#1d4ed8' },
    AI:    { bg: '#f5f3ff', text: '#6d28d9' },
    Custom:{ bg: '#f0fdf4', text: '#15803d' },
  }[category]
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px', borderBottom: '1px solid #f3f4f6' }}>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: colour, flexShrink: 0 }} />
      <span style={{ fontWeight: 700, fontSize: 15, color: '#111827', flex: 1 }}>{topic}</span>
      {actionButton}
      <span style={{ fontSize: 13, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: catStyle.bg, color: catStyle.text }}>{category}</span>
    </div>
  )
}

// ─── TopicCard ────────────────────────────────────────────────────────────────
function TopicCard({ topic, groups, allTopics, linkOffsets, onJoin, onRemoveMember, onRefreshLinks }) {
  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginBottom: 16, overflow: 'hidden' }}>
      <CardHeader
        topic={topic}
        allTopics={allTopics}
        actionButton={
          <button
            onClick={() => onJoin(groups[0])}
            style={{ background: '#f4a261', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, padding: '6px 14px', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            + Join group
          </button>
        }
      />
      <div style={{ padding: '16px 20px' }}>
        {groups.map(group => (
          <GroupRow
            key={group.id}
            group={group}
            linkOffset={linkOffsets[group.id] || 0}
            onRemoveMember={onRemoveMember}
            onRefreshLinks={() => onRefreshLinks(group.id)}
          />
        ))}
      </div>
    </div>
  )
}

// ─── WaitingTopicCard ─────────────────────────────────────────────────────────
function WaitingTopicCard({ topic, entries, allTopics, linkOffset, onPairWith, onRefreshLinks }) {
  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginBottom: 16, overflow: 'hidden' }}>
      <CardHeader
        topic={topic}
        allTopics={allTopics}
        actionButton={
          <button
            onClick={() => onPairWith(entries[0])}
            style={{ background: '#f4a261', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, padding: '6px 14px', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            + Join group
          </button>
        }
      />
      <div style={{ padding: '16px 20px' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>
          Looking to pair
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, flex: 1 }}>
            {entries.map(entry => (
              <div
                key={entry.id}
                style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, minWidth: 160 }}
              >
                <Avatar name={entry.name} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{entry.name}</div>
                  <div style={{ marginTop: 4 }}><Badge level={entry.level} /></div>
                  <button
                    onClick={() => onPairWith(entry)}
                    style={{ marginTop: 8, background: '#f4a261', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 11, padding: '4px 10px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                  >
                    Pair with {entry.name.split(' ')[0]}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <SuggestedLearning group={{ id: topic, topic }} offset={linkOffset} onRefresh={onRefreshLinks} />
        </div>
      </div>
    </div>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ topics, allTopics, filterTopic, setFilterTopic, onAddTopic }) {
  const [adding, setAdding] = useState(false)
  const [newTopic, setNewTopic] = useState('')

  function submitNewTopic() {
    if (newTopic.trim()) { onAddTopic(newTopic.trim()); setNewTopic(''); setAdding(false) }
  }

  return (
    <aside style={{ width: 236, flexShrink: 0, padding: '24px 0 24px 16px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden', display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>

        {/* Add topic — top, orange */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6', flexShrink: 0 }}>
          {adding ? (
            <div>
              <input
                autoFocus
                value={newTopic}
                onChange={e => setNewTopic(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') submitNewTopic()
                  if (e.key === 'Escape') { setAdding(false); setNewTopic('') }
                }}
                placeholder="Topic name..."
                style={{ ...inputStyle, fontSize: 13, padding: '8px 10px', marginBottom: 8 }}
              />
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={submitNewTopic} style={{ flex: 1, background: '#f4a261', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 0', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Add</button>
                <button onClick={() => { setAdding(false); setNewTopic('') }} style={{ flex: 1, background: '#f3f4f6', color: '#6b7280', border: 'none', borderRadius: 6, padding: '6px 0', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setAdding(true)} style={{ width: '100%', background: '#f4a261', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 0', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
              + Add Topic
            </button>
          )}
        </div>

        {/* Filter header */}
        <div style={{ padding: '10px 16px 6px', flexShrink: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.8 }}>Filter by Topic</span>
        </div>

        {/* Scrollable topic list */}
        <div style={{ overflowY: 'auto', flex: 1, minHeight: 0 }}>
          <button
            onClick={() => setFilterTopic(null)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', background: filterTopic === null ? '#f8f9fb' : 'none', border: 'none', cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid #f9fafb' }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#d1d5db', flexShrink: 0 }} />
            <span style={{ fontSize: 12, fontWeight: filterTopic === null ? 700 : 400, color: filterTopic === null ? '#111827' : '#374151' }}>All topics</span>
          </button>

          <div style={{ padding: '8px 16px 4px', fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1 }}>Cloud</div>
          {topics.filter(t => CLOUD_TOPICS.includes(t)).map(topic => (
            <SidebarTopic key={topic} topic={topic} allTopics={allTopics} active={filterTopic === topic} onClick={() => setFilterTopic(filterTopic === topic ? null : topic)} />
          ))}

          <div style={{ padding: '8px 16px 4px', fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1 }}>AI</div>
          {topics.filter(t => AI_TOPICS.includes(t)).map(topic => (
            <SidebarTopic key={topic} topic={topic} allTopics={allTopics} active={filterTopic === topic} onClick={() => setFilterTopic(filterTopic === topic ? null : topic)} />
          ))}

          {topics.filter(t => !CLOUD_TOPICS.includes(t) && !AI_TOPICS.includes(t)).length > 0 && (
            <>
              <div style={{ padding: '8px 16px 4px', fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1 }}>Custom</div>
              {topics.filter(t => !CLOUD_TOPICS.includes(t) && !AI_TOPICS.includes(t)).map(topic => (
                <SidebarTopic key={topic} topic={topic} allTopics={allTopics} active={filterTopic === topic} onClick={() => setFilterTopic(filterTopic === topic ? null : topic)} />
              ))}
            </>
          )}
          <div style={{ height: 8 }} />
        </div>
      </div>
    </aside>
  )
}

function SidebarTopic({ topic, allTopics, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 10,
        padding: '8px 16px', background: active ? '#f8f9fb' : 'none',
        border: 'none', cursor: 'pointer', textAlign: 'left',
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: getColour(topic, allTopics), flexShrink: 0 }} />
      <span style={{ fontSize: 12, fontWeight: active ? 700 : 400, color: active ? '#111827' : '#4b5563', lineHeight: 1.4 }}>{topic}</span>
    </button>
  )
}

// ─── AddMyselfModal ───────────────────────────────────────────────────────────
function AddMyselfModal({ topics, onClose, onSubmit }) {
  const [name, setName] = useState('')
  const [topic, setTopic] = useState('')
  const [level, setLevel] = useState('Intermediate')
  const nameValid = isValidName(name)
  const canSubmit = nameValid && topic

  const cloud = topics.filter(t => CLOUD_TOPICS.includes(t))
  const ai = topics.filter(t => AI_TOPICS.includes(t))
  const custom = topics.filter(t => !CLOUD_TOPICS.includes(t) && !AI_TOPICS.includes(t))

  return (
    <Modal title="Add Myself" onClose={onClose}>
      <Field label="Your name (First name + last initial, e.g. Ed L)">
        <input style={{ ...inputStyle, borderColor: name && !nameValid ? '#e63946' : '#e5e7eb' }} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Ed L" />
        {name && !nameValid && <p style={{ color: '#e63946', fontSize: 12, marginTop: 4 }}>Use format: First name + last initial (e.g. Ed L)</p>}
      </Field>
      <Field label="Topic">
        <select style={inputStyle} value={topic} onChange={e => setTopic(e.target.value)}>
          <option value="">Select a topic</option>
          {cloud.length > 0 && <optgroup label="Cloud">{cloud.map(t => <option key={t}>{t}</option>)}</optgroup>}
          {ai.length > 0 && <optgroup label="AI">{ai.map(t => <option key={t}>{t}</option>)}</optgroup>}
          {custom.length > 0 && <optgroup label="Custom">{custom.map(t => <option key={t}>{t}</option>)}</optgroup>}
        </select>
      </Field>
      <Field label="Experience level">
        <select style={inputStyle} value={level} onChange={e => setLevel(e.target.value)}>
          <option>Beginner</option><option>Intermediate</option><option>Expert</option>
        </select>
      </Field>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
        <button onClick={onClose} style={{ background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, padding: '8px 16px', cursor: 'pointer' }}>Cancel</button>
        <button disabled={!canSubmit} onClick={() => canSubmit && onSubmit({ name: name.trim(), topic, level })}
          style={{ background: '#f4a261', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, padding: '8px 16px', cursor: canSubmit ? 'pointer' : 'not-allowed', opacity: canSubmit ? 1 : 0.45 }}>
          Add Me
        </button>
      </div>
    </Modal>
  )
}

// ─── PairWithModal ────────────────────────────────────────────────────────────
function PairWithModal({ entry, onClose, onSubmit }) {
  const [name, setName] = useState('')
  const [level, setLevel] = useState('Intermediate')
  const nameValid = isValidName(name)
  const allLevels = [entry.level, level]
  const hint = nameValid
    ? allLevels.every(l => l === allLevels[0]) ? 'Peer pairing' : `Mentor / Mentee pairing`
    : null

  return (
    <Modal title={`Pair with ${entry.name.split(' ')[0]}`} onClose={onClose}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: '#f8f9fb', borderRadius: 10, marginBottom: 20 }}>
        <Avatar name={entry.name} size={44} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{entry.name}</div>
          <div style={{ marginTop: 4 }}><Badge level={entry.level} /></div>
        </div>
      </div>
      <Field label="Your name (First name + last initial, e.g. Ed L)">
        <input style={{ ...inputStyle, borderColor: name && !nameValid ? '#e63946' : '#e5e7eb' }} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Ed L" />
        {name && !nameValid && <p style={{ color: '#e63946', fontSize: 12, marginTop: 4 }}>Use format: First name + last initial (e.g. Ed L)</p>}
      </Field>
      <Field label="Experience level">
        <select style={inputStyle} value={level} onChange={e => setLevel(e.target.value)}>
          <option>Beginner</option><option>Intermediate</option><option>Expert</option>
        </select>
      </Field>
      {hint && <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16, padding: '8px 12px', background: '#f3f4f6', borderRadius: 8 }}>{hint}</p>}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <button onClick={onClose} style={{ background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, padding: '8px 16px', cursor: 'pointer' }}>Cancel</button>
        <button disabled={!nameValid} onClick={() => nameValid && onSubmit(entry, { name: name.trim(), level })}
          style={{ background: '#f4a261', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, padding: '8px 16px', cursor: nameValid ? 'pointer' : 'not-allowed', opacity: nameValid ? 1 : 0.45 }}>
          Pair Up
        </button>
      </div>
    </Modal>
  )
}

// ─── JoinGroupModal ───────────────────────────────────────────────────────────
function JoinGroupModal({ group, onClose, onSubmit }) {
  const [name, setName] = useState('')
  const [level, setLevel] = useState('Intermediate')
  const nameValid = isValidName(name)

  return (
    <Modal title={`Join group — ${group.topic}`} onClose={onClose}>
      <Field label="Your name (First name + last initial, e.g. Ed L)">
        <input style={{ ...inputStyle, borderColor: name && !nameValid ? '#e63946' : '#e5e7eb' }} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Ed L" />
        {name && !nameValid && <p style={{ color: '#e63946', fontSize: 12, marginTop: 4 }}>Use format: First name + last initial (e.g. Ed L)</p>}
      </Field>
      <Field label="Experience level">
        <select style={inputStyle} value={level} onChange={e => setLevel(e.target.value)}>
          <option>Beginner</option><option>Intermediate</option><option>Expert</option>
        </select>
      </Field>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
        <button onClick={onClose} style={{ background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, padding: '8px 16px', cursor: 'pointer' }}>Cancel</button>
        <button disabled={!nameValid} onClick={() => nameValid && onSubmit(group.id, { name: name.trim(), level })}
          style={{ background: '#f4a261', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, padding: '8px 16px', cursor: nameValid ? 'pointer' : 'not-allowed', opacity: nameValid ? 1 : 0.45 }}>
          Join Group
        </button>
      </div>
    </Modal>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [data, setData] = useState(DEFAULT_DATA)
  const [activeTab, setActiveTab] = useState('pairings')
  const [modal, setModal] = useState(null)
  const [filterTopic, setFilterTopic] = useState(null)
  const [linkOffsets, setLinkOffsets] = useState({})
  const [toast, setToast] = useState(null) // { name, topic }

  function persist(newData) { setData({ ...newData }) }

  function addTopic(name) {
    if (!name || data.topics.includes(name)) return
    persist({ ...data, topics: [...data.topics, name] })
  }

  function handleRemoveMember(groupId, memberIndex) {
    const group = data.groups.find(g => g.id === groupId)
    if (!group) return
    const newMembers = group.members.filter((_, i) => i !== memberIndex)
    let newGroups = data.groups
    let newEntries = [...data.entries]
    if (newMembers.length < 2) {
      if (newMembers.length === 1) newEntries.push({ id: Date.now(), name: newMembers[0].name, topic: group.topic, level: newMembers[0].level })
      newGroups = data.groups.filter(g => g.id !== groupId)
    } else {
      newGroups = data.groups.map(g => g.id === groupId ? { ...g, members: newMembers } : g)
    }
    persist({ ...data, groups: newGroups, entries: newEntries })
  }

  function handleJoinGroup(groupId, member) {
    const group = data.groups.find(g => g.id === groupId)
    persist({ ...data, groups: data.groups.map(g => g.id === groupId ? { ...g, members: [...g.members, member] } : g) })
    setModal(null)
    setToast({ name: member.name, topic: group?.topic })
  }

  function handleAddMyself(entry) {
    persist({ ...data, entries: [...data.entries, { id: Date.now(), ...entry }] })
    setModal(null)
  }

  function refreshLinks(key) {
    setLinkOffsets(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }))
  }

  function handlePairWith(entry, me) {
    const newGroup = { id: Date.now(), topic: entry.topic, members: [{ name: entry.name, level: entry.level }, me] }
    persist({ ...data, groups: [...data.groups, newGroup], entries: data.entries.filter(e => e.id !== entry.id) })
    setModal(null)
    setToast({ name: me.name, topic: entry.topic })
  }

  const visibleGroups = filterTopic
    ? data.groups.filter(g => g.topic === filterTopic)
    : data.groups

  const activeTopics = [...new Set(visibleGroups.map(g => g.topic))]

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f0f2f5' }}>

      {/* ── Header ── */}
      <header style={{ background: 'linear-gradient(135deg, #111827 0%, #1e1b4b 100%)', padding: '20px 24px', flexShrink: 0 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: -0.5, marginBottom: 6 }}>
            Cloud &amp; AI Buddy Programme
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 20 }}>
            Connect with peers and mentors across cloud and AI topics. Pair, learn, share, grow.
          </p>
        </div>
      </header>

      {/* ── Tabs ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', flexShrink: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', flex: 1 }}>
            {[
              { key: 'pairings', label: 'Active Pairings', count: data.groups.length },
              { key: 'waiting', label: 'Looking for a Buddy', count: data.entries.length },
            ].map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                background: 'none', border: 'none', padding: '16px 20px', fontSize: 14, fontWeight: 600,
                color: activeTab === tab.key ? '#e63946' : '#6b7280',
                borderBottom: activeTab === tab.key ? '2px solid #e63946' : '2px solid transparent',
                display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
              }}>
                {tab.label}
                <span style={{
                  background: activeTab === tab.key ? '#e63946' : '#f3f4f6',
                  color: activeTab === tab.key ? '#fff' : '#6b7280',
                  fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 99,
                }}>{tab.count}</span>
              </button>
            ))}
          </div>
          {/* Add Myself button in tab bar */}
          <div style={{ padding: '0 16px' }}>
            <button
              onClick={() => setModal({ type: 'addMyself' })}
              style={{ background: '#f4a261', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, padding: '8px 16px', cursor: 'pointer' }}
            >
              + Add Myself
            </button>
          </div>
        </div>
      </div>

      {/* ── Pairing toast ── */}
      {toast && (
        <div style={{ background: '#111827', color: '#fff', flexShrink: 0, borderBottom: '1px solid #374151' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 16 }}>🎉</span>
            <span style={{ flex: 1, fontSize: 13, color: '#e2e8f0' }}>
              <strong style={{ color: '#fff' }}>{toast.name}</strong> has been paired on <strong style={{ color: '#fff' }}>{toast.topic}</strong>.
            </span>
            <button
              onClick={() => { setActiveTab('pairings'); setFilterTopic(toast.topic); setToast(null) }}
              style={{ background: '#f4a261', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 700, fontSize: 12, padding: '5px 12px', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              Find me in Active Pairings →
            </button>
            <button
              onClick={() => setToast(null)}
              style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: 18, cursor: 'pointer', lineHeight: 1, padding: '0 4px' }}
            >×</button>
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', maxWidth: 1200, margin: '0 auto', width: '100%' }}>

        {/* Sidebar */}
        <Sidebar
          topics={data.topics}
          allTopics={data.topics}
          filterTopic={filterTopic}
          setFilterTopic={setFilterTopic}
          onAddTopic={addTopic}
        />

        {/* Main */}
        <main style={{ flex: 1, minWidth: 0, overflowY: 'auto', padding: '24px 16px' }}>

          {/* Reset filter banner */}
          {filterTopic && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 10, padding: '10px 16px', marginBottom: 16 }}>
              <span style={{ fontSize: 13, color: '#92400e', fontWeight: 500 }}>Filtered: <strong>{filterTopic}</strong></span>
              <button onClick={() => setFilterTopic(null)} style={{ background: '#f4a261', color: '#fff', border: 'none', borderRadius: 6, padding: '5px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                × Reset filter
              </button>
            </div>
          )}

          {activeTab === 'pairings' && (
            activeTopics.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9ca3af' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🤝</div>
                <p style={{ fontSize: 16, fontWeight: 600, color: '#6b7280' }}>
                  {filterTopic ? `No active pairings for "${filterTopic}"` : 'No active pairings yet'}
                </p>
                <p style={{ fontSize: 14, marginTop: 4 }}>Add yourself to get started.</p>
              </div>
            ) : (
              activeTopics.map(topic => (
                <TopicCard
                  key={topic}
                  topic={topic}
                  groups={visibleGroups.filter(g => g.topic === topic)}
                  allTopics={data.topics}
                  linkOffsets={linkOffsets}
                  onJoin={group => setModal({ type: 'joinGroup', payload: group })}
                  onRemoveMember={handleRemoveMember}
                  onRefreshLinks={refreshLinks}
                />
              ))
            )
          )}

          {activeTab === 'waiting' && (
            data.entries.length === 0 ? (
              <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', padding: '48px 32px', textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#fff7ed', border: '2px solid #fed7aa', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 26 }}>👋</div>
                <p style={{ fontSize: 17, fontWeight: 700, color: '#111827', marginBottom: 6 }}>Nobody waiting yet</p>
                <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 24 }}>Be the first — add yourself and get matched with someone on the same topic.</p>
                <button
                  onClick={() => setModal({ type: 'addMyself' })}
                  style={{ background: '#f4a261', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14, padding: '10px 24px', cursor: 'pointer' }}
                >
                  + Add Myself
                </button>
              </div>
            ) : (
              [...new Set(
                (filterTopic ? data.entries.filter(e => e.topic === filterTopic) : data.entries).map(e => e.topic)
              )].map(topic => (
                <WaitingTopicCard
                  key={topic}
                  topic={topic}
                  entries={data.entries.filter(e => e.topic === topic)}
                  allTopics={data.topics}
                  linkOffset={linkOffsets[topic] || 0}
                  onPairWith={entry => setModal({ type: 'pairWith', payload: entry })}
                  onRefreshLinks={() => refreshLinks(topic)}
                />
              ))
            )
          )}
        </main>
      </div>

      {/* ── Modals ── */}
      {modal?.type === 'addMyself' && (
        <AddMyselfModal topics={data.topics} onClose={() => setModal(null)} onSubmit={handleAddMyself} />
      )}
      {modal?.type === 'joinGroup' && (
        <JoinGroupModal group={modal.payload} onClose={() => setModal(null)} onSubmit={handleJoinGroup} />
      )}
      {modal?.type === 'pairWith' && (
        <PairWithModal entry={modal.payload} onClose={() => setModal(null)} onSubmit={handlePairWith} />
      )}
    </div>
  )
}
