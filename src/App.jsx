import React, { useEffect, useState } from 'react'
import { modules } from './modules.js'

const STORAGE_KEY = 'math-atlas-2026-v1'
const numericValue = input => {
  const value = String(input || '').trim().replace('−', '-')
  const fraction = value.match(/^([+-]?\d+)\/([+-]?\d+)$/)
  if (fraction) return Number(fraction[2]) === 0 ? NaN : Number(fraction[1]) / Number(fraction[2])
  return /^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(value) ? Number(value) : NaN
}
const isGridCorrect = (value, answer) => Number.isFinite(numericValue(value)) && Math.abs(numericValue(value) - numericValue(answer)) < 1e-9
const loadProgress = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    return { answers: parsed.answers || {}, checked: parsed.checked || {} }
  } catch {
    return { answers: {}, checked: {} }
  }
}

function Rich({ children }) {
  return String(children).split(/(\*\*.*?\*\*)/g).map((part, index) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={index}>{part.slice(2, -2)}</strong>
      : <span key={index}>{part}</span>
  )
}

function Icon({ name, size = 18 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  if (name === 'arrow') return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  if (name === 'external') return <svg {...common}><path d="M13 5h6v6M19 5l-9 9" /><path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" /></svg>
  if (name === 'check') return <svg {...common}><path d="m4 12 5 5L20 6" /></svg>
  if (name === 'cross') return <svg {...common}><path d="M5 5l14 14M19 5 5 19" /></svg>
  if (name === 'book') return <svg {...common}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z" /><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20" /></svg>
  if (name === 'print') return <svg {...common}><path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M7 14h10v7H7zM17 11h.01" /></svg>
  return null
}

function SectionHeading({ number, title, subtitle, id }) {
  return <div className="section-heading" id={id}>
    <span className="section-number">{number}</span>
    <div><h2>{title}</h2><p>{subtitle}</p></div>
  </div>
}

function StepList({ steps }) {
  return <ol className="steps">{steps.map(([title, body], index) =>
    <li key={title}>
      <span className="step-index">{String(index + 1).padStart(2, '0')}</span>
      <div><h4>{title}</h4><p><Rich>{body}</Rich></p></div>
    </li>
  )}</ol>
}

function PracticeCard({ question, number, value, checked, onAnswer, onCheck }) {
  const [hintOpen, setHintOpen] = useState(false)
  const correct = checked && (question.type === 'mcq' ? value === question.answer : isGridCorrect(value, question.answer))
  return <article className={`practice-card ${checked ? (correct ? 'is-correct' : 'is-incorrect') : ''}`}>
    <div className="practice-topline"><span>Question {number}</span><span>{question.level} · {question.type === 'grid' ? 'Student-produced response' : 'Multiple choice'}</span></div>
    <h3>{question.prompt}</h3>
    {question.type === 'mcq' ? <fieldset className="options" aria-label={`Choices for question ${number}`}>
      {question.options.map((option, index) => <label key={option} className={`option ${value === option ? 'selected' : ''}`}>
        <input type="radio" name={question.id} value={option} checked={value === option} onChange={() => onAnswer(question.id, option)} />
        <span className="choice-letter">{'ABCD'[index]}</span><span>{option}</span>
      </label>)}
    </fieldset> : <div className="grid-entry">
      <label htmlFor={`entry-${question.id}`}>Enter your answer</label>
      <input id={`entry-${question.id}`} inputMode="text" autoComplete="off" maxLength={value?.startsWith('-') || value?.startsWith('−') ? 6 : 5} placeholder="e.g., 3/8" value={value || ''} onChange={event => onAnswer(question.id, event.target.value)} />
      <small>Fractions and decimals are accepted where equivalent. Use / for a fraction.</small>
    </div>}
    <div className="practice-actions">
      <button type="button" className="primary-button" disabled={!value?.trim()} onClick={() => onCheck(question.id)}>Check answer <Icon name="arrow" size={16} /></button>
      <button type="button" className="text-button" onClick={() => setHintOpen(!hintOpen)} aria-expanded={hintOpen}>{hintOpen ? 'Hide hint' : 'Show hint'}</button>
    </div>
    {hintOpen && <p className="hint"><strong>Hint.</strong> {question.hint}</p>}
    {checked && <div className={`feedback ${correct ? 'correct' : 'incorrect'}`} role="status">
      <div className="feedback-title"><Icon name={correct ? 'check' : 'cross'} size={16} /> {correct ? 'Correct.' : `The answer is ${question.answer}${/[.!?]$/.test(question.answer) ? '' : '.'}`}</div>
      <ol>{question.steps.map((step, index) => <li key={index}><Rich>{step}</Rich></li>)}</ol>
    </div>}
  </article>
}

export default function App() {
  const [activeId, setActiveId] = useState(() => location.hash.slice(1) || modules[0].id)
  const [progress, setProgress] = useState(loadProgress)
  const [menuOpen, setMenuOpen] = useState(false)
  const [resetArmed, setResetArmed] = useState(false)
  const active = modules.find(module => module.id === activeId) || modules[0]
  const practiced = Object.keys(progress.checked).filter(id => progress.checked[id]).length
  const total = modules.reduce((sum, module) => sum + module.practice.length, 0)
  const activePracticed = active.practice.filter(question => progress.checked[question.id]).length

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)) }, [progress])
  useEffect(() => {
    const syncHash = () => setActiveId(location.hash.slice(1) || modules[0].id)
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  const answer = (id, value) => setProgress(old => ({ answers: { ...old.answers, [id]: value }, checked: { ...old.checked, [id]: false } }))
  const check = id => setProgress(old => ({ ...old, checked: { ...old.checked, [id]: true } }))
  const navigate = id => { setActiveId(id); location.hash = id; setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'auto' }) }
  const reset = () => { setProgress({ answers: {}, checked: {} }); setResetArmed(false) }
  const topicIndex = modules.findIndex(module => module.id === active.id)
  return <div className="app-shell">
    <aside className={`sidebar ${menuOpen ? 'open' : ''}`} aria-label="Topics">
      <div className="brand"><span className="brand-mark"><Icon name="book" size={22} /></span><div><strong>Math Atlas</strong><small>Digital SAT Math · 2026</small></div></div>
      <div className="sidebar-label">Nine study modules</div>
      <nav className="module-nav" aria-label="Study modules">
        {modules.map((module, index) => <button type="button" key={module.id} onClick={() => navigate(module.id)} className={module.id === active.id ? 'active' : ''} aria-current={module.id === active.id ? 'page' : undefined}>
          <span>{String(index + 1).padStart(2, '0')}</span><span>{module.title}</span><Icon name="arrow" size={15} />
        </button>)}
      </nav>
      <div className="sidebar-bottom"><p>Your work is saved in this browser.</p>{resetArmed ? <div className="reset-actions"><button type="button" onClick={reset}>Confirm reset</button><button type="button" onClick={() => setResetArmed(false)}>Cancel</button></div> : <button type="button" onClick={() => setResetArmed(true)}>Reset practice progress</button>}</div>
    </aside>
    {menuOpen && <button className="sidebar-backdrop" aria-label="Close topics" onClick={() => setMenuOpen(false)} />}
    <div className="page-area">
      <header className="topbar">
        <button className="mobile-menu" type="button" onClick={() => setMenuOpen(true)} aria-label="Open topics">☰</button>
        <div className="progress-label"><strong>{practiced} of {total}</strong> practiced <span className="progress-track"><span style={{ width: `${(practiced / total) * 100}%` }} /></span></div>
        <div className="top-actions"><button type="button" onClick={() => window.print()}><Icon name="print" size={17} /><span>Print module</span></button><a href="https://www.desmos.com/calculator" target="_blank" rel="noreferrer"><Icon name="external" size={18} /><span>Open Desmos</span></a></div>
      </header>
      <div className="content-grid">
        <main className="lesson">
          <div className="module-header">
            <div className="module-meta"><span>MODULE {String(topicIndex + 1).padStart(2, '0')} / 09</span><span className="meta-dot" />{active.domain}</div>
            <h1>{active.title}</h1><p className="module-summary">{active.summary}</p>
            <div className="module-status"><span>{activePracticed}/3 practice questions checked</span><span>Original DSAT-style questions</span></div>
          </div>
          <section aria-labelledby="concepts-title">
            <SectionHeading number="01" title="Deep-dive concepts" subtitle="Definitions, equations, traps, and the fastest route through the question." id="concepts-title" />
            <div className="route-box"><h3>The direct route</h3><ol>{active.route.map(step => <li key={step}>{step}</li>)}</ol></div>
            <div className="concept-list">{active.concepts.map(([term, description]) => <div className="concept-row" key={term}><h3>{term}</h3><p>{description}</p></div>)}</div>
            <h3 className="subheading">Core equations</h3>
            <div className="formula-table">{active.formulas.map(([label, formula, why]) => <div className="formula-row" key={label}><span>{label}</span><strong>{formula}</strong><small>{why}</small></div>)}</div>
            <div className="two-column-notes"><div className="trap-box"><h3>Common DSAT traps</h3><ul>{active.traps.map(item => <li key={item}>{item}</li>)}</ul></div><div className="desmos-box"><h3>Desmos shortcut</h3><ol>{active.desmos.map(item => <li key={item}>{item}</li>)}</ol></div></div>
          </section>
          <section aria-labelledby="example-title">
            <SectionHeading number="02" title="Guided hard example" subtitle="Read the question, then follow both the algebraic and calculator routes." id="example-title" />
            <div className="exemplar">
              <div className="exemplar-top"><span>{active.example.type === 'grid' ? 'Student-produced response' : 'Multiple choice'}</span><span>Hard level</span></div>
              <h3>{active.example.prompt}</h3>
              {active.example.options && <div className="example-options">{active.example.options.map((option, index) => <span key={option}><b>{'ABCD'[index]}</b>{option}</span>)}</div>}
              <div className="solution-block"><div className="solution-label">Algebraic method</div><StepList steps={active.example.steps} /></div>
              <div className="calculator-method"><div className="solution-label">Desmos method</div><ol>{active.example.desmosSteps.map((step, index) => <li key={index}><Rich>{step}</Rich></li>)}</ol></div>
              <p className="why-note"><strong>Why this is tricky:</strong> {active.example.why}</p>
              <div className="final-answer">Final answer <strong>{active.example.answer}</strong></div>
            </div>
          </section>
          <section aria-labelledby="practice-title">
            <SectionHeading number="03" title="Practice exercises" subtitle="Try medium to advanced questions. Check each answer for a worked explanation." id="practice-title" />
            <div className="practice-list">{active.practice.map((question, index) => <PracticeCard key={question.id} question={question} number={index + 1} value={progress.answers[question.id] || ''} checked={progress.checked[question.id]} onAnswer={answer} onCheck={check} />)}</div>
            <div className="answer-key"><div><span>END OF MODULE</span><h3>Absolute final answers</h3><p>Use these to check your work after all three questions.</p></div><ol>{active.practice.map((question, index) => <li key={question.id}><span>{String(index + 1).padStart(2, '0')} · {question.type === 'grid' ? 'Grid-in' : 'MCQ'}</span><strong>{question.answer}</strong></li>)}</ol></div>
          </section>
          <div className="module-next">{topicIndex < modules.length - 1 ? <button type="button" onClick={() => navigate(modules[topicIndex + 1].id)}>Next module <strong>{modules[topicIndex + 1].title}</strong><Icon name="arrow" /></button> : <button type="button" onClick={() => navigate(modules[0].id)}>Return to first module <Icon name="arrow" /></button>}</div>
          <footer><p>Independent, original study material. This page is not affiliated with College Board. “Digital SAT,” “Bluebook,” and “Desmos” are used descriptively.</p><p>Format references: <a href="https://satsuite.collegeboard.org/sat/whats-on-the-test/math/overview" target="_blank" rel="noreferrer">College Board Math overview</a> · <a href="https://satsuite.collegeboard.org/sat-school-day/taking-the-test/structure" target="_blank" rel="noreferrer">Test structure</a> · <a href="https://satsuite.collegeboard.org/practice/content-domains" target="_blank" rel="noreferrer">Content domains</a></p></footer>
        </main>
        <aside className="right-rail" aria-label="Study reference"><div className="sticky-rail"><div className="rail-callout"><span>STUDY METHOD</span><h2>Solve first.<br />Check second.</h2><p>Read the direct route, work the example, then answer all three practice items before using the answer key.</p></div><div className="rail-links"><a href="#concepts-title">01 <span>Concepts</span></a><a href="#example-title">02 <span>Guided example</span></a><a href="#practice-title">03 <span>Practice</span></a></div><div className="format-note"><h3>2026 Math format</h3><p>Two 35-minute modules, 44 questions total. Questions include four-choice MCQ and student-produced responses. A calculator is available throughout Math.</p><p>This guide is topic practice, so it has no timer.</p></div></div></aside>
      </div>
    </div>
  </div>
}
