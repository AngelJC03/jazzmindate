
import { useState } from 'react'
import './App.css'

const plans = [
  {
    title: 'A Cozy Night In',
    message: 'Bake something sweet and watch movies.',
    note: "(I won't get mad if you fall asleep.)",
    tone: 'rose',
    stamp: '✿',
  },
  {
    title: 'A Movie Date',
    message: 'Go out and watch a random movie and get food after.',
    note: '(Or before, depends on how hungry you are.)',
    tone: 'peach',
    stamp: '✳',
  },
  {
    title: 'Dinner',
    message: 'Go out to eat somewhere.',
    tone: 'mauve',
    stamp: '❀',
  },
  {
    title: 'Mini Gulf Bar',
    message: 'Go to the mini gulf bar and get a drink and some eats.',
    note: 'Website: https://www.thedustyplanet.com/',
    tone: 'rose',
    stamp: '✧',
  }
]

function Envelope({ plan, index, onOpen, isOpen }) {
  return (
    <button
      className={`choice ${plan.tone} ${isOpen ? 'is-open' : ''}`}
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Open surprise envelope ${index + 1}`}
      aria-expanded={isOpen}
    >
      <span className="envelope-wrap" aria-hidden="true">
        <span className="letter-peek" />
        <span className="envelope">
          <span className="envelope-back" />
          <span className="envelope-front" />
          <span className="flap" />
          <span className="seal">{plan.stamp}</span>
        </span>
      </span>

      <span className="choice-label">Open me ♡</span>
      <span className="choice-count">
        0{index + 1} <i>—</i> a little surprise
      </span>
    </button>
  )
}

function Letter({ plan, onClose }) {
  return (
    <div
      className="reveal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="letter-title"
    >
      <button
        className="close-button"
        type="button"
        onClick={onClose}
        aria-label="Close letter"
      >
        ×
      </button>

      <div className={`open-envelope ${plan.tone}`} aria-hidden="true">
        <span className="open-pocket" />
        <span className="open-flap" />
      </div>

      <article className="letter-card">
        <div className="letter-topline">
          <span>JUST FOR YOU</span>
          <span>♡</span>
        </div>

        <div className="letter-flower" aria-hidden="true">
          ✿
        </div>

        <p className="letter-dear">My favorite person,</p>

        <h2 id="letter-title">{plan.title}</h2>
        <p className="letter-message">{plan.message}</p>

        {plan.note && (
          <p className="letter-note">{plan.note}</p>
        )}

        <div className="letter-signoff">
          With love, <span>♡</span>
          <br />Angel
        </div>
      </article>

      <button className="back-link" type="button" onClick={onClose}>
        ← &nbsp;Back to envelopes
      </button>
    </div>
  )
}

function App() {
  const [openIndex, setOpenIndex] = useState(null)

  const openPlan =
    openIndex === null ? null : plans[openIndex]

  return (
    <main className={`page ${openPlan ? 'has-letter' : ''}`}>
      <div className="ambient" aria-hidden="true">
        <span className="petal petal-one">✿</span>
        <span className="petal petal-two">✧</span>
        <span className="petal petal-three">❀</span>
        <span className="petal petal-four">✧</span>
        <span className="corner-sprig sprig-left">
          ✿<i>⌁</i>
        </span>
        <span className="corner-sprig sprig-right">
          ❀<i>⌁</i>
        </span>
      </div>

      <header className="masthead">
        <span className="tiny-star">✳</span>
        A NOTE FOR YOU
        <span className="tiny-star">✳</span>
      </header>

      <section className="intro">
        <p className="eyebrow">
          a little bit of computer science romance
        </p>

        <h1>
          A Little Something <em>For You</em> <span>♡</span>
        </h1>

        <p className="subtitle">
          Three little envelopes, each hiding a surprise...
          Pick one and see what's waiting for you ♡
        </p>
      </section>

      <section
        className="envelope-area"
        aria-label="Choose a surprise envelope"
      >
        <div className="envelopes">
          {plans.map((plan, index) => (
            <Envelope
              key={plan.title}
              plan={plan}
              index={index}
              onOpen={setOpenIndex}
              isOpen={openIndex === index}
            />
          ))}
        </div>

        <p className="instruction">
          <span />
          Choose an envelope to reveal your surprise
          <span />
        </p>
      </section>

      <footer>
        Made with love <span>♡</span>
      </footer>

      {openPlan && (
        <Letter
          plan={openPlan}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </main>
  )
}

export default App
