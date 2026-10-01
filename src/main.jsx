import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ExamApp from './ExamApp.jsx'
import './styles.css'

const examMode = new URLSearchParams(location.search).get('mode') === 'exam'
if (examMode) document.title = 'Math Atlas · 2026 Math Mock Exam'
createRoot(document.getElementById('root')).render(examMode ? <ExamApp /> : <App />)
