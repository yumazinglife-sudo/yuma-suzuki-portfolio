import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  FiArrowRight,
  FiBriefcase,
  FiCpu,
  FiDatabase,
  FiGithub,
  FiLayers,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiStar,
} from 'react-icons/fi'
import './App.css'

const metrics = [
  { label: 'Years in Software', value: '8+' },
  { label: 'AI systems shipped', value: '20+' },
  { label: 'Enterprise integrations', value: '15+' },
  { label: 'Tokyo based', value: 'Japan' },
]

const skills = [
  'Large Language Models',
  'RAG Systems',
  'AI Agents',
  'Python APIs',
  'Cloud Deployment',
  'Enterprise Integration',
  'Vector Search',
  'MLOps',
  'Prompt Design',
  'Data Architecture',
  'Production ML',
]

const capabilities = [
  {
    title: 'Enterprise AI systems',
    detail: 'Production-grade LLM products and knowledge workflows shaped for real business constraints.',
  },
  {
    title: 'Agentic automation',
    detail: 'Reasoning layers, orchestration logic, and API-driven tools for resilient operational workflows.',
  },
  {
    title: 'Cloud-native delivery',
    detail: 'Architecture, monitoring, and deployment patterns that turn prototypes into maintainable systems.',
  },
]

const timeline = [
  {
    period: '2023 — Present',
    company: 'ITOCHU Techno-Solutions Corporation (CTC)',
    role: 'Senior AI Engineer',
    description:
      'Designing enterprise-grade AI systems, LLM workflows, retrieval pipelines, and autonomous information processing for production use.',
  },
  {
    period: '2020 — 2023',
    company: 'REGALIA',
    role: 'AI / Machine Learning Engineer',
    description:
      'Built ML-powered applications, backend services, NLP automation, and cloud-native deployment workflows for business systems.',
  },
  {
    period: '2018 — 2020',
    company: 'MODE, Inc.',
    role: 'Software Engineer',
    description:
      'Developed web apps, internal business systems, and backend services with a strong focus on reliability and performance.',
  },
]

const projects = [
  {
    title: 'AI Workflow Automation',
    type: 'Autonomous systems',
    description:
      'Agent-based orchestration combining reasoning, APIs, and internal tools to automate document analysis and business workflows.',
  },
  {
    title: 'Enterprise RAG Knowledge Assistant',
    type: 'Knowledge intelligence',
    description:
      'Context-aware assistant powered by document ingestion, embeddings, reranking, vector retrieval, and LLM-driven answer generation.',
  },
  {
    title: 'Production AI Platform',
    type: 'Cloud-native delivery',
    description:
      'Built operational AI services with monitoring, deployment readiness, and maintainable architecture for production environments.',
  },
]

function FloatingScene() {
  const groupRef = useRef()
  const starRef = useRef()

  const ringData = useMemo(
    () => [
      { radius: 2.7, color: '#7dd3fc', rotation: [Math.PI / 2, 0, 0] },
      { radius: 3.5, color: '#93c5fd', rotation: [Math.PI / 2, 0.8, 0.6] },
      { radius: 4.2, color: '#c4b5fd', rotation: [Math.PI / 2, 1.2, 0.9] },
    ],
    [],
  )

  const blocks = useMemo(
    () => [
      { position: [-2.3, 0.5, -0.9], scale: 0.7, color: '#7dd3fc' },
      { position: [1.5, 1.2, 0.8], scale: 0.9, color: '#c084fc' },
      { position: [2.2, -0.8, -1.4], scale: 0.8, color: '#60a5fa' },
      { position: [-0.8, -1.1, 1.6], scale: 0.65, color: '#67e8f9' },
    ],
    [],
  )

  const particles = useMemo(() => {
    const positions = new Float32Array(180 * 3)
    for (let i = 0; i < 180; i += 1) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 15
      positions[i3 + 1] = (Math.random() - 0.5) * 12
      positions[i3 + 2] = (Math.random() - 0.5) * 9
    }
    return positions
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.28
    groupRef.current.rotation.x = Math.sin(t * 0.7) * 0.32

    if (starRef.current) {
      starRef.current.rotation.y = -t * 0.35
      starRef.current.rotation.z = Math.sin(t * 0.5) * 0.25
    }
  })

  return (
    <group ref={groupRef}>
      <mesh rotation-x={-Math.PI / 2} position={[0, -1.7, 0]}>
        <circleGeometry args={[4.8, 64]} />
        <meshStandardMaterial color="#07111d" metalness={0.75} roughness={0.3} />
      </mesh>

      <points ref={starRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#dbeafe" transparent opacity={0.8} />
      </points>

      {ringData.map((ring, index) => (
        <mesh key={index} rotation={ring.rotation} position={[0, 0.12 * index, 0]}>
          <torusGeometry args={[ring.radius, 0.05, 16, 120]} />
          <meshStandardMaterial color={ring.color} emissive={ring.color} emissiveIntensity={0.75} />
        </mesh>
      ))}

      {blocks.map((block, index) => (
        <Float key={index} speed={1.7 + index * 0.25} rotationIntensity={2.3} floatIntensity={2.1}>
          <mesh position={block.position} scale={block.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={block.color}
              emissive={block.color}
              emissiveIntensity={0.8}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}

      <Float speed={2.2} rotationIntensity={1.8} floatIntensity={2.4}>
        <mesh position={[0.4, 1.2, 0.7]}>
          <octahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial color="#f8fafc" emissive="#7dd3fc" emissiveIntensity={1} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={2.5} floatIntensity={2.1}>
        <mesh position={[-1.8, -1.2, -1.2]}>
          <icosahedronGeometry args={[0.65, 0]} />
          <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={0.9} />
        </mesh>
      </Float>

      <pointLight position={[2, 4, 5]} intensity={28} color="#60a5fa" />
      <pointLight position={[-4, -2, 2]} intensity={20} color="#c084fc" />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 4]} intensity={1.7} color="#f8fafc" />
    </group>
  )
}

function App() {
  const [pointer, setPointer] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 100
      const y = (event.clientY / window.innerHeight) * 100
      setPointer({ x, y })
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return (
    <div
      className="portfolio-shell"
      style={{
        '--pointer-x': `${pointer.x}%`,
        '--pointer-y': `${pointer.y}%`,
      }}
    >
      <div className="cursor-glow" style={{ left: `${pointer.x}%`, top: `${pointer.y}%` }} />
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-dot" />
          <span>Yuma Suzuki</span>
        </div>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="eyebrow-row">
              <FiStar />
              <span>Senior AI Engineer</span>
            </div>
            <h1>Designing AI systems that move ideas from signal to action.</h1>
            <p className="lead">
              I build production-ready intelligent systems for enterprise teams — turning ambiguity into clarity, workflows into momentum, and complex data into measurable outcomes.
            </p>

            <div className="cta-row">
              <a href="#projects" className="primary-btn">
                View work
                <FiArrowRight />
              </a>
              <a href="#contact" className="secondary-btn">
                Contact me
              </a>
            </div>

            <div className="meta-row">
              <span><FiMapPin /> Tokyo, Japan</span>
              <span><FiBriefcase /> 8+ years of engineering</span>
            </div>
          </motion.div>

          <motion.div
            className="visual-panel"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <div className="glass-frame">
              <div className="canvas-wrap">
                <Canvas camera={{ position: [0, 0, 8], fov: 48 }}>
                  <FloatingScene />
                  <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
              </div>

              <div className="floating-card card-one">
                <span className="card-label">Current focus</span>
                <strong>LLM + RAG systems</strong>
              </div>

              <div className="floating-card card-two">
                <span className="card-label">Primary stack</span>
                <strong>Python · AI · Cloud</strong>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="metrics-grid" aria-label="Key metrics">
          {metrics.map((metric) => (
            <div className="metric-card" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </section>

        <section className="signal-band" aria-label="Core capabilities">
          {capabilities.map((item, index) => (
            <motion.article
              className="signal-card"
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 * index }}
            >
              <span className="signal-index">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </motion.article>
          ))}
        </section>

        <section id="about" className="content-section intro-section">
          <div className="section-heading">
            <span className="kicker">About</span>
            <h2>Designing systems that turn uncertainty into operational clarity.</h2>
          </div>

          <div className="about-grid">
            <div className="portrait-card">
              <img
                src="/photo.jpg"
                alt="Portrait of Yuma Suzuki"
              />
            </div>

            <div className="about-copy">
              <p>
                Senior AI Engineer with 8 years of software engineering and AI experience across three IT companies in Japan. I build production applications, AI systems, LLM-powered workflows, backend services, and enterprise integrations that can move from prototype to deployment with discipline and clarity.
              </p>
              <p>
                My work spans RAG pipelines, AI agents, cloud-native architecture, and intelligent automation for business processes. I enjoy bridging technical depth with product practicality — turning broad ideas into resilient systems that create measurable value.
              </p>
            </div>
          </div>
        </section>

        <section id="experience" className="content-section">
          <div className="section-heading">
            <span className="kicker">Experience</span>
            <h2>From software engineering foundations to AI platform leadership.</h2>
          </div>

          <div className="timeline-list">
            {timeline.map((item) => (
              <article className="timeline-item" key={item.period}>
                <div className="timeline-period">{item.period}</div>
                <div className="timeline-body">
                  <div className="timeline-header">
                    <h3>{item.role}</h3>
                    <span>{item.company}</span>
                  </div>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="content-section">
          <div className="section-heading">
            <span className="kicker">Projects</span>
            <h2>High-impact systems built with intelligence and operational care.</h2>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <motion.article
                key={project.title}
                className="project-card"
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 180, damping: 18 }}
              >
                <div className="project-topline">
                  <span className="project-type">{project.type}</span>
                  <FiLayers />
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="content-section stack-section">
          <div className="section-heading">
            <span className="kicker">Stack</span>
            <h2>Built for reasoning, integration, and production resilience.</h2>
          </div>

          <div className="skill-cloud">
            {skills.map((skill, index) => (
              <span
                key={skill}
                className="skill-pill"
                style={{
                  transform: `translate3d(${(pointer.x - 50) * (0.25 + index * 0.08)}px, ${(pointer.y - 50) * (0.18 + index * 0.06)}px, 0) rotate(${((index % 2) * 2 - 1) * 1.8}deg)`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </main>

      <footer id="contact" className="site-footer">
        <div>
          <span className="kicker">Contact</span>
          <h3>Let’s build something meaningful.</h3>
        </div>

        <div className="footer-links">
          <a href="https://github.com/yumazinglife-sudo" target="_blank" rel="noreferrer">
            <FiGithub /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/yuma-suzuki-b2449b439/" target="_blank" rel="noreferrer">
            <FiLinkedin /> LinkedIn
          </a>
          <a href="mailto:yumazinglife@gmail.com">
            <FiMail /> Email
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
