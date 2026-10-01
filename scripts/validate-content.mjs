import { modules } from '../src/modules.js'

const fail = message => { throw new Error(message) }
const all = modules.flatMap(module => module.practice)
if (modules.length !== 9) fail(`Expected 9 modules, found ${modules.length}`)
if (all.length !== 27) fail(`Expected 27 exercises, found ${all.length}`)
if (new Set(modules.map(module => module.id)).size !== 9) fail('Module IDs repeat')
if (new Set(all.map(question => question.id)).size !== 27) fail('Question IDs repeat')
for (const module of modules) {
  if (module.practice.length !== 3) fail(`${module.id}: expected 3 exercises`)
  if (!module.route?.length || module.concepts.length < 3 || module.formulas.length < 3 || module.traps.length < 3 || module.desmos.length < 2) fail(`${module.id}: incomplete concept breakdown`)
  if (!module.example?.prompt || !module.example?.answer || module.example.steps.length < 3 || module.example.desmosSteps.length < 2 || !module.example.why) fail(`${module.id}: incomplete guided example`)
  if (module.example.type === 'mcq' && (!module.example.options?.includes(module.example.answer) || new Set(module.example.options).size !== 4)) fail(`${module.id}: bad example options`)
  if (!module.practice.some(question => question.type === 'mcq') || !module.practice.some(question => question.type === 'grid')) fail(`${module.id}: missing response format`)
  for (const question of module.practice) {
    if (!question.prompt || !question.answer || !question.hint || question.steps.length < 1 || question.issue) fail(`${question.id}: incomplete support`)
    if (question.type === 'mcq' && (question.options.length !== 4 || new Set(question.options).size !== 4 || !question.options.includes(question.answer))) fail(`${question.id}: bad options/answer`)
    if (question.type === 'grid' && (!question.accepted.includes(question.answer) || question.answer.length > (question.answer.startsWith('-') ? 6 : 5))) fail(`${question.id}: bad grid answer`)
  }
}
const counts = all.reduce((result, question) => ({ ...result, [question.type]: (result[question.type] || 0) + 1 }), {})
const letters = Object.fromEntries('ABCD'.split('').map(letter => [letter, 0]))
for (const question of all.filter(question => question.type === 'mcq')) letters['ABCD'[question.options.indexOf(question.answer)]]++
if (Math.max(...Object.values(letters)) - Math.min(...Object.values(letters)) > 1) fail(`Unbalanced MCQ answer letters: ${JSON.stringify(letters)}`)
console.log(`Validated ${modules.length} modules, ${all.length} original exercises (${counts.mcq} MCQ, ${counts.grid} grid-in), 9 worked examples, notes and supports. MCQ keys: ${JSON.stringify(letters)}.`)
