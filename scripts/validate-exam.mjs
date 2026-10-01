import assert from 'node:assert/strict'
import { allExamQuestions, examModules, isCorrect, numericResponse } from '../src/examQuestions.js'

assert.equal(examModules.length, 2)
assert.equal(allExamQuestions.length, 44)
assert.equal(new Set(allExamQuestions.map(q => q.id)).size, 44)
const expectedDifficulty = [
  { Easy: 4, Medium: 4, Hard: 12, Advanced: 0 },
  { Easy: 2, Medium: 2, Hard: 12, Advanced: 4 }
]
for (const [index, module] of examModules.entries()) {
  assert.equal(module.length, 22)
  assert.equal(module.filter(q => q.unscored).length, 2)
  const scored = module.filter(q => !q.unscored)
  assert.equal(scored.length, 20)
  for (const [difficulty, count] of Object.entries(expectedDifficulty[index]))
    assert.equal(scored.filter(q => q.difficulty === difficulty).length, count, `Module ${index + 1} ${difficulty}`)
  assert.equal(module.filter(q => q.type === 'spr').length, index === 0 ? 5 : 6)
  assert.deepEqual(module.map(q => q.position), Array.from({length:22},(_,i)=>i+1))
  assert.ok(module.every(q => q.module === index + 1))
}
const domains = {
  Algebra: 15,
  'Advanced Math': 15,
  'Problem Solving and Data Analysis': 7,
  'Geometry and Trigonometry': 7
}
for (const [domain,count] of Object.entries(domains)) assert.equal(allExamQuestions.filter(q=>q.domain===domain).length,count,domain)
assert.ok(allExamQuestions.filter(q=>q.context).length >= 13)
assert.equal(allExamQuestions.filter(q=>q.type==='mcq').length,33)
const letters = [0,0,0,0]
for (const q of allExamQuestions) {
  assert.ok(q.prompt.length >= 20, `${q.id}: prompt too short`)
  assert.ok(q.steps.length >= 2, `${q.id}: need annotated steps`)
  assert.ok(isCorrect(q, q.answer), `${q.id}: key cannot be scored`)
  if (q.type === 'mcq') {
    assert.equal(q.options.length, 4, `${q.id}: option count`)
    assert.equal(new Set(q.options).size, 4, `${q.id}: duplicate options`)
    const answerIndex = q.options.indexOf(q.answer)
    assert.ok(answerIndex >= 0, `${q.id}: key absent`)
    letters[answerIndex]++
  } else {
    assert.ok(Number.isFinite(numericResponse(q.answer)), `${q.id}: invalid grid key`)
    assert.ok(q.answer.length <= 5, `${q.id}: grid key too long`)
  }
}
assert.ok(Math.max(...letters) - Math.min(...letters) <= 1, `unbalanced key ${letters}`)
console.log(`Exam validated: 44 unique questions, 40 scored, 4 pretest, 33 MCQ, 11 SPR, ${allExamQuestions.filter(q=>q.context).length} contextual.`)
console.log(`MCQ key balance A/B/C/D: ${letters.join('/')}`)
