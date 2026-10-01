# Math Atlas — 2026 Digital SAT Math guide and mock exam

An independent study webpage covering nine Digital SAT Math topics plus a complete, original two-module Math mock exam. Every study module has a concept breakdown, an annotated hard example with algebra and Desmos methods, three practice exercises, and a final answer key. The study guide includes 18 multiple-choice questions and 9 student-produced responses.

The exam adds **44 questions** in two timed 35-minute modules, including **33 four-option multiple-choice questions** and **11 student-produced responses**. It includes local autosave, navigation, review flags, a reference sheet, a Desmos calculator panel, automatic time expiry, raw practice scoring, domain breakdowns, and fully worked post-exam solutions. Open it from the study guide sidebar or use `?mode=exam` on the app URL.

## Run

```powershell
npm install
npm run validate:content
npm run audit:math
npm run validate:exam
npm run audit:exam
npm run dev
```

Open the local URL printed by Vite. `npm run build` creates a deployable `dist` folder. Study and exam progress are saved separately in this browser's local storage. Both the study guide and completed exam review can be printed.

## Content and scope

The exam mirrors the 2026 Math structure: each module has 22 items in 35 minutes. In each module, 20 questions count toward the raw practice score and two are unscored pretest items. The difficulty percentages requested for this project apply exactly to the 20 scored items:

| Module | Easy | Medium | Hard | Advanced | Unscored pretest |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1 | 4 (20%) | 4 (20%) | 12 (60%) | 0 | 2 |
| 2 | 2 (10%) | 2 (10%) | 12 (60%) | 4 (20%) | 2 |

The 44 questions cover the four official content domains with approximate official weights: 15 Algebra, 15 Advanced Math, 7 Problem Solving and Data Analysis, and 7 Geometry and Trigonometry. Thirteen questions are contextual. Question difficulty generally rises within each module.

This is original practice, not an official College Board product. The second module is a fixed harder path rather than a score-routed adaptive module. The result is a raw score out of 40, **not** an official 200–800 SAT Math score. Multiple-choice responses have four options; student-produced responses accept equivalent valid fractions and decimals where applicable.

Format and domain information was checked against the [College Board Math overview](https://satsuite.collegeboard.org/sat/whats-on-the-test/math/overview), [Math alignment and structure](https://satsuite.collegeboard.org/k12-educators/about/alignment/math), [student-produced response guidance](https://satsuite.collegeboard.org/sat/whats-on-the-test/math/student-produced), and [content domains](https://satsuite.collegeboard.org/practice/content-domains). Desmos syntax is described by the [Desmos Help Center](https://help.desmos.com/hc/en-us/articles/204349605-Log-Mode).
