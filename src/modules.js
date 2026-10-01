// Every prompt and explanation in this guide is original. Bold spans are marked **like this**.
export const modules = [
  {
    id: 'probability', title: 'Probability & combinatorics', domain: 'Problem-Solving and Data Analysis',
    summary: 'Count the right sample space before you divide. A condition changes the denominator.',
    route: ['Name the event and the given condition.', 'Count equally likely outcomes in the restricted sample space.', 'Divide favorable by possible; reduce the fraction.'],
    concepts: [
      ['Probability', 'For equally likely outcomes, P(A) = favorable outcomes / all possible outcomes. Always identify what one outcome represents.'],
      ['Conditional probability', 'P(A | B) = P(A ∩ B) / P(B). Read “given B” as “only outcomes in B remain possible.”'],
      ['Independence', 'A and B are independent only if P(A | B) = P(A), equivalently P(A ∩ B) = P(A)P(B). Drawing without replacement is usually dependent.'],
      ['Counting', 'Permutations arrange objects when order matters; combinations choose groups when order does not.']
    ],
    formulas: [
      ['Complement', 'P(not A) = 1 − P(A)', 'Often faster for “at least one.”'],
      ['Conditional', 'P(A | B) = P(A ∩ B) / P(B)', 'The denominator is the given event.'],
      ['Ordered choices', 'nPᵣ = n! / (n − r)!', 'Use for distinct roles or ordered codes.'],
      ['Unordered groups', 'nCᵣ = n! / [r!(n − r)!]', 'Use for committees or selections.']
    ],
    traps: ['Using the original total after the question says “given.”', 'Treating draws without replacement as independent.', 'Using permutations for a group whose order is irrelevant.'],
    desmos: ['Use factorial arithmetic, such as 4!/(2!2!), to check combination counts.', 'Enter the favorable and restricted totals separately, then divide. Desmos checks arithmetic; it does not choose the right sample space for you.'],
    example: {
      type: 'mcq', prompt: 'A club has 6 juniors and 4 seniors. Three members are selected at random. Given that at least one selected member is a senior, what is the probability that exactly 2 selected members are seniors?',
      options: ['3/10', '9/25', '3/8', '1/2'], answer: '9/25',
      steps: [
        ['Restrict the total', 'There are **10C3 = 120** groups of three. The 6C3 = 20 all-junior groups are excluded. Thus the given condition leaves **120 − 20 = 100** possible groups.'],
        ['Count the target', 'Choose 2 of the 4 seniors and 1 of the 6 juniors: **4C2 × 6C1 = 6 × 6 = 36** groups.'],
        ['Divide and simplify', '**P(exactly 2 seniors | at least 1 senior) = 36/100 = 9/25.**']
      ],
      desmosSteps: ['Compute 10!/(3!7!) − 6!/(3!3!) to get 100.', 'Compute [4!/(2!2!)] × 6 and divide by 100. The display is 0.36 = **9/25**.'],
      why: 'The tempting 36/120 uses all groups, including groups ruled out by “given.”'
    },
    practice: [
      { id: 'p1', level: 'Medium', type: 'mcq', prompt: 'A bag contains 5 red marbles and 3 blue marbles. Two marbles are selected without replacement. What is the probability that both marbles are red?', options: ['1/7', '5/14', '2/7', '5/8'], answer: '5/14', hint: 'Multiply the two changing probabilities, or count pairs.', steps: ['**(5/8)(4/7) = 20/56 = 5/14.**', 'Equivalently, 5C2 / 8C2 = 10/28 = 5/14.'] },
      { id: 'p2', level: 'Medium', type: 'grid', prompt: 'A committee of 3 is selected at random from 8 people. What is the probability that a particular person is on the committee?', answer: '3/8', accepted: ['3/8', '.375', '0.375'], hint: 'Fix that person, then choose two of the other seven.', steps: ['Favorable groups: 7C2 = 21. All groups: 8C3 = 56.', '**P = 21/56 = 3/8.**'] },
      { id: 'p3', level: 'Advanced', type: 'mcq', prompt: 'A code has two different letters selected from A, B, C, and D, followed by one digit from 0 through 9. How many different codes are possible?', options: ['80', '160', '240', '120'], answer: '120', hint: 'The order of the two letters matters.', steps: ['There are **4 × 3 = 12** ordered letter pairs and 10 digit choices.', '**12 × 10 = 120** codes.'] }
    ]
  },
  {
    id: 'tangency', title: 'Nonlinear equations & tangency', domain: 'Advanced Math',
    summary: 'A tangent line meets a parabola at exactly one point. That turns a system into a repeated root.',
    route: ['Set the line and parabola equal.', 'Write the resulting quadratic as Ax² + Bx + C = 0.', 'For tangency, set B² − 4AC = 0; then check the contact point.'],
    concepts: [
      ['Intersection', 'A solution to a quadratic–linear system is an ordered pair on both graphs. Substitute one equation into the other.'],
      ['Discriminant', 'For Ax² + Bx + C = 0, D = B² − 4AC. D > 0 gives two distinct real roots; D = 0 gives one; D < 0 gives none.'],
      ['Tangency', 'A line tangent to a parabola has one intersection, so the substituted quadratic has a double root. Its x-coordinate is −B/(2A).'],
      ['Parameter questions', 'A letter such as k can be solved by imposing a condition on D. Check whether every resulting k fits the original restrictions.']
    ],
    formulas: [
      ['Discriminant', 'D = B² − 4AC', 'Sets the intersection count.'],
      ['Double root', 'x = −B/(2A) when D = 0', 'Gives the point of contact.'],
      ['Vertex form', 'A(x − h)² + j', 'Makes the turning point (h, j) visible.']
    ],
    traps: ['Setting the original parabola’s discriminant to zero instead of the substituted intersection equation’s.', 'Assuming “one solution” means the x-coordinate is zero.', 'Rounding a graph until two close intersections look like one.'],
    desmos: ['Graph both equations with a slider for the unknown constant; adjust until the graphs touch once.', 'Use the graph as a check. For an exact constant, solve D = 0 algebraically.'],
    example: {
      type: 'mcq', prompt: 'The line y = 2x + 1 is tangent to the parabola y = x² − 6x + k. What is the value of k?',
      options: ['13', '15', '17', '19'], answer: '17',
      steps: [
        ['Set the equations equal', '2x + 1 = x² − 6x + k, so **x² − 8x + (k − 1) = 0**.'],
        ['Require exactly one x-value', 'Set the discriminant to zero: **(−8)² − 4(1)(k − 1) = 0**.'],
        ['Solve and check', '64 − 4k + 4 = 0, so **k = 17**. The double root is x = 4; both equations give y = 9.']
      ],
      desmosSteps: ['Graph y = 2x + 1 and y = x² − 6x + k with a slider for k.', 'At **k = 17**, the graphs touch at (4, 9). Zooming is a check; the discriminant proves the exact value.'],
      why: 'Tangency means one shared point, not just that the line crosses the y-axis near the parabola.'
    },
    practice: [
      { id: 't1', level: 'Medium', type: 'mcq', prompt: 'For what value of c is the line y = −2x + 5 tangent to y = x² + 4x + c?', options: ['9', '14', '16', '20'], answer: '14', hint: 'Set the equations equal before finding D.', steps: ['The intersection equation is x² + 6x + (c − 5) = 0.', '**D = 36 − 4(c − 5) = 0**, giving **c = 14**.'] },
      { id: 't2', level: 'Advanced', type: 'grid', prompt: 'The line y = mx − 1 is tangent to y = x² − 2x + 3. If m is positive, what is m?', answer: '2', accepted: ['2'], hint: 'The condition m > 0 selects one of two discriminant solutions.', steps: ['Set equal: x² − (m + 2)x + 4 = 0.', 'Tangency gives (m + 2)² − 16 = 0, so m = 2 or −6.', '**The positive value is 2.**'] },
      { id: 't3', level: 'Advanced', type: 'mcq', prompt: 'The graphs of y = 3x − 2 and y = x² + px + 7 intersect at exactly one point. Which pair contains all possible values of p?', options: ['−9 and 3', '0 and 6', '3 and 9', '−3 and 9'], answer: '−3 and 9', hint: 'The constant term after substitution is 9.', steps: ['The intersection equation is x² + (p − 3)x + 9 = 0.', '**(p − 3)² − 36 = 0**, so p − 3 = ±6 and **p = −3 or 9**.'] }
    ]
  },
  {
    id: 'circles', title: 'Circles: area, arcs & equations', domain: 'Geometry and Trigonometry',
    summary: 'Move between a circle’s equation, its radius, and the fraction of a full turn.',
    route: ['Complete the square or read the radius.', 'Decide whether the question asks for length or area.', 'Use the central angle as a fraction of 360° or use radians directly.'],
    concepts: [
      ['Circle equation', 'Standard form (x − h)² + (y − k)² = r² has center (h, k) and radius r. Take the square root of r².'],
      ['Circumference and area', 'Circumference measures boundary length: C = 2πr. Area measures the inside: A = πr².'],
      ['Arc and sector', 'An arc is part of the circumference; a sector is part of the area. Both use the same central-angle fraction.'],
      ['Radians', 'π radians = 180°. If θ is in radians, arc length s = rθ and sector area A = ½r²θ. These formulas require radians.']
    ],
    formulas: [
      ['Arc in degrees', 's = (θ/360) × 2πr', 'θ is measured in degrees.'],
      ['Sector in degrees', 'A = (θ/360) × πr²', 'Area scales with r².'],
      ['Radian conversion', 'θ radians = θ° × π/180', 'Convert before using s = rθ.'],
      ['Complete the square', 'x² + bx = (x + b/2)² − (b/2)²', 'Apply to x and y separately.']
    ],
    traps: ['Using r² as the radius.', 'Using ½r²θ with θ still in degrees.', 'Adding constants to only one side when completing the square.'],
    desmos: ['Graph the completed-square circle equation to check its center and radius.', 'For numerical checks, type (θ/360)πr² or rθ after converting θ to radians. Keep exact π in the written answer when options use π.'],
    example: {
      type: 'mcq', prompt: 'A circle in the xy-plane has equation x² + y² − 6x + 8y = 0. What is the area of a sector with central angle 72°?',
      options: ['2π', '4π', '5π', '10π'], answer: '5π',
      steps: [
        ['Complete both squares', 'x² − 6x = (x − 3)² − 9 and y² + 8y = (y + 4)² − 16. Therefore **(x − 3)² + (y + 4)² = 25**.'],
        ['Read the radius', 'The radius is **r = 5**, so the full circle area is 25π.'],
        ['Take the sector fraction', '72°/360° = 1/5. Thus **sector area = (1/5)(25π) = 5π** square units.']
      ],
      desmosSteps: ['Graph (x − 3)² + (y + 4)² = 25 to confirm center (3, −4) and radius 5.', 'Compute (72/360)π(5²). The display is about 15.708, matching **5π**.'],
      why: 'The arc length is 2π here; that is a length, not the requested area.'
    },
    practice: [
      { id: 'c1', level: 'Medium', type: 'mcq', prompt: 'A circle has radius 12. What is the length of an arc with central angle 150°?', options: ['5π', '8π', '20π', '10π'], answer: '10π', hint: 'Use the fraction 150/360 of the full circumference.', steps: ['**s = (150/360)(2π × 12) = (5/12)(24π) = 10π.**'] },
      { id: 'c2', level: 'Medium', type: 'grid', prompt: 'A circle has equation x² + y² + 4x − 10y + 13 = 0. What is its radius?', answer: '4', accepted: ['4'], hint: 'The new constants from completing the squares are 4 and 25.', steps: ['Rewrite as (x + 2)² + (y − 5)² = 16.', '**r = √16 = 4.**'] },
      { id: 'c3', level: 'Advanced', type: 'mcq', prompt: 'A sector of a circle with radius 9 has area 27π. What is the sector’s central angle, in radians?', options: ['π/3', '2π/3', 'π/2', '4π/3'], answer: '2π/3', hint: 'Compare 27π with the full area 81π, then take the same fraction of 2π radians.', steps: ['The sector is 27π/81π = 1/3 of the circle.', '**θ = (1/3)(2π) = 2π/3 radians**, which is 120°.'] }
    ]
  },
  {
    id: 'exponential', title: 'Two-variable exponential models', domain: 'Problem-Solving and Data Analysis',
    summary: 'In y = a(b)^x, a is the value at x = 0 and b is the multiplier for one x-unit.',
    route: ['Identify the spacing between x-values in the table.', 'Find the multiplier per one unit, not per row.', 'Use y = a(b)^x; interpret a and b with units.'],
    concepts: [
      ['Initial value', 'In y = a(b)^x, a is y when x = 0, even if the table begins at another x-value.'],
      ['Growth and decay', 'If b > 1, the quantity grows by (b − 1) × 100% per x-unit. If 0 < b < 1, it decreases by (1 − b) × 100%.'],
      ['Uneven table spacing', 'If x increases by d and y is multiplied by R, then b^d = R, so b = R^(1/d). Do not call R the per-unit multiplier unless d = 1.'],
      ['Regression', 'For noisy data, an exponential regression estimates a and b. A fitted model is approximate; round predictions to the precision requested and avoid claiming exact growth.']
    ],
    formulas: [
      ['Model', 'y = a(b)^x', 'a is the value at x = 0.'],
      ['From two data points', 'b = (y₂/y₁)^[1/(x₂ − x₁)]', 'For positive y-values.'],
      ['Find the initial value', 'a = y₁/b^x₁', 'Backtrack from a known row.'],
      ['Percent change', '(b − 1) × 100%', 'Negative means decay.']
    ],
    traps: ['Reading the first table entry as a when its x-value is not zero.', 'Calling a two-year multiplier the yearly growth factor.', 'Interpreting b = 0.82 as an 82% decrease rather than an 18% decrease.'],
    desmos: ['Enter the data in a table, then type y₁ ~ a b^(x₁) to fit an exponential model; the tilde is regression, not equality.', 'For exact two-point data, calculate b from the ratio first. Evaluate the model at the requested x and check units and rounding.'],
    example: {
      type: 'mcq', prompt: 'The table shows values of an exponential model y = a(b)^x. At x = 1, 3, and 5, the corresponding y-values are 60, 135, and 303.75. What is a?',
      options: ['30', '40', '45', '60'], answer: '40',
      steps: [
        ['Read the spacing', 'From x = 1 to x = 3 is **2** units. The output ratio is 135/60 = 2.25, so **b² = 2.25**.'],
        ['Get the one-unit multiplier', 'Because an exponential base is positive, **b = 1.5**. The x = 5 row checks: 135(1.5)² = 303.75.'],
        ['Backtrack to x = 0', 'At x = 1, 60 = a(1.5). Therefore **a = 60/1.5 = 40**.']
      ],
      desmosSteps: ['Enter (1, 60), (3, 135), and (5, 303.75) in a Desmos table.', 'Type y₁ ~ a b^(x₁). The fitted parameters are **a = 40** and b = 1.5. Because all rows follow one exact model, the fit is exact.'],
      why: '60 is the first listed output, but a is the output at x = 0.'
    },
    practice: [
      { id: 'e1', level: 'Medium', type: 'mcq', prompt: 'A quantity is modeled by y = 250(0.8)^t, where t is years after the start. By what percent does the quantity decrease each year?', options: ['8%', '25%', '80%', '20%'], answer: '20%', hint: 'Subtract the multiplier from 1.', steps: ['Each year retains 80% of the previous value.', '**1 − 0.8 = 0.2 = 20% decrease.**'] },
      { id: 'e2', level: 'Advanced', type: 'grid', prompt: 'An exponential model has value 27 at x = 0 and value 75 at x = 2. What is its value at x = 3?', answer: '125', accepted: ['125'], hint: 'First find b² = 75/27, then b.', steps: ['a = 27 and b² = 75/27 = 25/9, so b = 5/3.', '**y(3) = 27(5/3)³ = 125.**'] },
      { id: 'e3', level: 'Advanced', type: 'mcq', prompt: 'A table lists (x, y) values (0, 101), (1, 121), (2, 145), and (3, 174). Which exponential model best fits the data?', options: ['y = 101(1.2)^x', 'y = 101(0.8)^x', 'y = 20(1.2)^x', 'y = 121(2)^x'], answer: 'y = 101(1.2)^x', hint: 'Check both the x = 0 value and the approximate ratio between successive y-values.', steps: ['The initial value is near 101; successive ratios are about 1.20.', '**y ≈ 101(1.2)^x** predicts 121.2, 145.44, and 174.53 for x = 1, 2, 3.'] }
    ]
  },
  {
    id: 'similarity', title: 'Similar shapes: area & volume', domain: 'Geometry and Trigonometry',
    summary: 'Lengths scale by k, areas by k², and volumes by k³.',
    route: ['Identify what type of measure the given ratio describes.', 'Convert that ratio to the linear scale factor k.', 'Raise k to the correct power for the requested measure.'],
    concepts: [
      ['Similarity', 'Similar figures have equal corresponding angles and proportional corresponding lengths. Solids must be similar for the volume rule to apply.'],
      ['Linear scale', 'Every corresponding length, including perimeter and circumference, changes by k.'],
      ['Area scale', 'Every area changes by k² because two dimensions scale. This includes surface area of similar solids.'],
      ['Volume scale', 'Volume changes by k³ because three dimensions scale. Square or cube the ratio in the same direction as the question.']
    ],
    formulas: [
      ['Length ratio', 'L₂/L₁ = k', 'Compare corresponding measures.'],
      ['Area ratio', 'A₂/A₁ = k²', 'Use for faces or total surface area.'],
      ['Volume ratio', 'V₂/V₁ = k³', 'Use only for similar 3D figures.'],
      ['Recover k', 'k = √(area ratio) = ∛(volume ratio)', 'Reverse the exponent first.']
    ],
    traps: ['Multiplying area by k instead of k².', 'Taking a square root of a volume ratio; volume needs a cube root.', 'Reversing small-to-large ratios halfway through.'],
    desmos: ['Enter sqrt(A₂/A₁) to find the linear factor from areas.', 'Then compute V₁k³. A calculator helps with radicals; write which power you used.'],
    example: {
      type: 'grid', prompt: 'Two solids are similar. The smaller solid has surface area 150 square centimeters and volume 125 cubic centimeters. The larger solid has surface area 294 square centimeters. What is the volume, in cubic centimeters, of the larger solid?',
      answer: '343',
      steps: [
        ['Use the area ratio', 'Larger/smaller surface area = **294/150 = 49/25**.'],
        ['Recover the length ratio', 'Since area scales by k², **k = √(49/25) = 7/5**.'],
        ['Cube for volume', 'Larger volume = **125(7/5)³ = 125(343/125) = 343** cubic centimeters.']
      ],
      desmosSteps: ['Enter sqrt(294/150) to get 1.4.', 'Evaluate 125(1.4)^3 to get **343**.'],
      why: 'Multiplying 125 by 49/25 would apply the area factor to a volume.'
    },
    practice: [
      { id: 's1', level: 'Medium', type: 'mcq', prompt: 'Two similar triangles have corresponding side lengths 8 and 12. If the smaller triangle has area 40, what is the larger triangle’s area?', options: ['60', '80', '90', '135'], answer: '90', hint: 'The linear factor is 12/8.', steps: ['k = 12/8 = 3/2. Area factor = (3/2)² = 9/4.', '**40 × 9/4 = 90.**'] },
      { id: 's2', level: 'Medium', type: 'grid', prompt: 'Two rectangular prisms are similar. Corresponding lengths have ratio 2:3 from smaller to larger. The smaller prism has volume 64. What is the larger prism’s volume?', answer: '216', accepted: ['216'], hint: 'Use the cube of 3/2.', steps: ['Larger/smaller volume factor = (3/2)³ = 27/8.', '**64 × 27/8 = 216.**'] },
      { id: 's3', level: 'Advanced', type: 'mcq', prompt: 'The volumes of similar spheres A and B are in the ratio 27:64. What is the ratio of their surface areas, A:B?', options: ['3:4', '27:64', '81:256', '9:16'], answer: '9:16', hint: 'First cube-root the volume ratio.', steps: ['The radii have ratio ∛27:∛64 = 3:4.', '**Surface areas have ratio 3²:4² = 9:16.**'] }
    ]
  },
  {
    id: 'nonlinear-systems', title: 'Nonlinear systems of equations', domain: 'Advanced Math',
    summary: 'Solutions are shared points. Substitution and graph shape reveal how many there are.',
    route: ['Choose the simpler equation to substitute.', 'Solve every real candidate, including repeated roots.', 'Return to the original system to obtain ordered pairs and count distinct points.'],
    concepts: [
      ['System solution', 'An ordered pair (x, y) is a solution only if it satisfies every equation in the system.'],
      ['Circle with a line or curve', 'Substitution can yield a quadratic or a higher-degree equation. Each distinct real x may give a point.'],
      ['Quadratic systems', 'Equate the y-expressions, factor or use the quadratic formula, and then recover y.'],
      ['Exponential intersections', 'A graph can suggest the number of intersections, but use algebra or sign/shape reasoning when exactness matters.']
    ],
    formulas: [
      ['Circle', '(x − h)² + (y − k)² = r²', 'Points are distance r from the center.'],
      ['Substitution', 'Replace y with the other equation’s expression', 'Makes one equation in x.'],
      ['Count distinct roots', 'A repeated x-root counts as one point', 'Do not count multiplicity twice.']
    ],
    traps: ['Reporting x-values instead of ordered pairs when coordinates are requested.', 'Counting a repeated root as two intersections.', 'Squaring an equation and keeping candidates that fail the original.'],
    desmos: ['Graph both original equations and count distinct intersection points, including points near the edge of the window.', 'Use a wide window before concluding “no solutions”; a graph is especially useful for exponential systems where exact algebra may be difficult.'],
    example: {
      type: 'grid', prompt: 'How many distinct ordered pairs (x, y) satisfy both x² + y² = 25 and y = x² − 5?',
      answer: '3',
      steps: [
        ['Substitute y', 'x² + (x² − 5)² = 25. Expanding gives **x⁴ − 9x² = 0**.'],
        ['Factor', '**x²(x² − 9) = x²(x − 3)(x + 3) = 0**. The distinct x-values are 0, 3, and −3.'],
        ['Recover points', 'y = x² − 5 gives **(0, −5), (3, 4), and (−3, 4)**. There are **3** distinct ordered pairs.']
      ],
      desmosSteps: ['Graph x² + y² = 25 and y = x² − 5.', 'The plots meet at (0, −5), (−3, 4), and (3, 4): **3** intersections.'],
      why: 'x = 0 appears as a double algebraic root but represents only one point.'
    },
    practice: [
      { id: 'n1', level: 'Medium', type: 'mcq', prompt: 'How many distinct ordered pairs satisfy y = x² − 1 and y = 3?', options: ['0', '1', '2', '3'], answer: '2', hint: 'Set x² − 1 equal to 3.', steps: ['x² − 1 = 3 gives x = ±2.', '**The two points are (−2, 3) and (2, 3).**'] },
      { id: 'n2', level: 'Medium', type: 'grid', prompt: 'The system x² + y² = 25 and y = 0 has two solutions. What is the product of their x-coordinates?', answer: '-25', accepted: ['-25', '−25'], hint: 'Substitute y = 0 into the circle.', steps: ['x² = 25, so x = −5 or 5.', '**Their product is −25.**'] },
      { id: 'n3', level: 'Advanced', type: 'mcq', prompt: 'How many real ordered pairs satisfy y = 2^x and y = x + 2?', options: ['0', '1', '2', '3'], answer: '2', hint: 'Compare near x = −2, −1, 0, and 2; then use graph shape.', steps: ['At x = −2, 2^x > x + 2; at x = −1, 2^x < x + 2, so one intersection lies between −2 and −1.', 'At x = 2, both sides equal 4, giving another. The strictly convex function 2^x − x − 2 has at most two zeros.', '**There are 2 real solutions.**'] }
    ]
  },
  {
    id: 'linear', title: 'Linear equations in two variables', domain: 'Algebra',
    summary: 'Slope describes change; intercept describes a value at zero. Compare both to classify a system.',
    route: ['Put equations in y = mx + b when comparing lines.', 'Interpret the slope and intercept with the units in the question.', 'For systems, compare slopes first, then intercepts.'],
    concepts: [
      ['Slope and intercept', 'In y = mx + b, m = change in y per one unit of x and b = y at x = 0. A context may restrict whether x = 0 is meaningful.'],
      ['Parallel and perpendicular', 'Different parallel lines have equal slopes. Nonvertical perpendicular lines have slopes whose product is −1. Vertical and horizontal lines are perpendicular.'],
      ['System outcomes', 'Different slopes give one solution. Equal slopes with different intercepts give none. The same equation gives infinitely many.'],
      ['Standard form', 'Ax + By = C can be rearranged to y = (−A/B)x + C/B when B ≠ 0. Compare scaled equations carefully.']
    ],
    formulas: [
      ['Slope from points', 'm = (y₂ − y₁)/(x₂ − x₁)', 'Requires x₂ ≠ x₁.'],
      ['Slope-intercept', 'y = mx + b', 'm is rate; b is starting value.'],
      ['Point-slope', 'y − y₁ = m(x − x₁)', 'Useful for a given point.'],
      ['Perpendicular', 'm₁m₂ = −1', 'For nonvertical lines.']
    ],
    traps: ['Negating a slope without taking its reciprocal for a perpendicular line.', 'Calling two equivalent equations “parallel with no solution.”', 'Ignoring units or domain when interpreting an intercept.'],
    desmos: ['Graph both equations to inspect a crossing, overlap, or distinct parallel lines.', 'A graph cannot prove two close lines are identical. Compare coefficients and constants algebraically.'],
    example: {
      type: 'grid', prompt: 'For what value of k + c does the system 3x − 2y = 12 and kx + 4y = c have infinitely many solutions?',
      answer: '-30',
      steps: [
        ['Use the infinite-solutions condition', 'The second equation must be an exact multiple of the first, including its constant.'],
        ['Match the y-coefficient', 'To turn −2y into +4y, multiply the first equation by **−2**. This gives −6x + 4y = −24.'],
        ['Read both constants', '**k = −6** and **c = −24**, so **k + c = −30**.']
      ],
      desmosSteps: ['Graph 3x − 2y = 12 and kx + 4y = c.', 'Set k = −6 and c = −24; the graphs overlap. Algebra confirms every coefficient and constant has the same factor.'],
      why: 'Matching only the x and y coefficients while changing c would give distinct parallel lines.'
    },
    practice: [
      { id: 'l1', level: 'Medium', type: 'mcq', prompt: 'Which equation represents the line through (2, 5) that is perpendicular to 3x − 2y = 7?', options: ['2x + 3y = 19', '3x − 2y = −4', '3x + 2y = 16', '2x − 3y = −11'], answer: '2x + 3y = 19', hint: 'The given line has slope 3/2.', steps: ['3x − 2y = 7 has slope 3/2, so a perpendicular slope is −2/3.', 'Through (2, 5): y − 5 = −(2/3)(x − 2), or **2x + 3y = 19**.'] },
      { id: 'l2', level: 'Advanced', type: 'grid', prompt: 'For what value of m does the system 5x + 2y = 14 and y = mx + 5 have no solution?', answer: '-5/2', accepted: ['-5/2', '−5/2', '-2.5', '−2.5'], hint: 'Make the slopes equal, then compare the y-intercepts.', steps: ['The first equation is y = −(5/2)x + 7. Equal slope requires m = −5/2.', 'The second intercept is 5, not 7, so the lines are distinct and parallel. **m = −5/2.**'] },
      { id: 'l3', level: 'Medium', type: 'mcq', prompt: 'A delivery cost, in dollars, is modeled by C = 45 + 0.12m, where m is the number of miles driven. What does 0.12 represent?', options: ['The fixed fee in dollars', 'The added cost in dollars per mile', 'The number of miles included', 'The total cost after 1 mile'], answer: 'The added cost in dollars per mile', hint: 'Look at the coefficient of m and attach units.', steps: ['When m increases by 1 mile, C increases by $0.12.', '**0.12 is the added cost in dollars per mile.**'] }
    ]
  },
  {
    id: 'statistics', title: 'Statistical studies & generalization', domain: 'Problem-Solving and Data Analysis',
    summary: 'The method of collection determines what a result can support.',
    route: ['Identify the target population and how participants entered the sample.', 'Separate an estimate from a certain count.', 'Ask whether random assignment supports causation and random sampling supports generalization.'],
    concepts: [
      ['Population and sample', 'The population is everyone the question asks about. The sample is who was actually measured. A sample statistic estimates a population value.'],
      ['Random sampling', 'A well-designed random sample reduces selection bias and can support population inference. Larger size alone cannot repair a biased sampling method.'],
      ['Margin of error', 'A reported estimate p with margin m gives an approximate interval from p − m to p + m at the stated confidence level; it is not a guarantee about each individual.'],
      ['Experiments and causation', 'Random assignment to treatment groups supports a causal comparison. Random sampling and random assignment answer different questions. Observational association alone does not prove causation.']
    ],
    formulas: [
      ['Estimate interval', 'sample percent ± margin of error', 'Keep percentages in percentage points.'],
      ['Estimated count', 'population size × estimated proportion', 'Use decimal form of the proportion.'],
      ['Response rate', 'responses / people contacted', 'Low response can raise nonresponse concerns.']
    ],
    traps: ['Generalizing a voluntary online poll to everyone in a city.', 'Treating “±4 percentage points” as ±4% of the reported estimate.', 'Claiming cause and effect from a correlation or observational survey.'],
    desmos: ['Use the calculator for interval endpoints and estimated counts, such as 0.52 × 8000.', 'The calculator cannot diagnose sampling bias or turn an observational study into a randomized experiment.'],
    example: {
      type: 'mcq', prompt: 'A city randomly samples 400 residents from its 8,000 residents. In the sample, 56% support a proposed park. The survey reports a margin of error of 4 percentage points at its stated confidence level. Which conclusion is best supported?',
      options: ['Exactly 4,480 city residents support the park.', 'A plausible interval is about 4,160 to 4,800 residents who support the park.', 'The park proposal caused 56% of residents to support it.', 'The results apply only to the 400 sampled residents.'],
      answer: 'A plausible interval is about 4,160 to 4,800 residents who support the park.',
      steps: [
        ['Form the proportion interval', '**56% ± 4 percentage points = 52% to 60%**.'],
        ['Scale to the city', '0.52 × 8000 = 4160 and 0.60 × 8000 = 4800.'],
        ['State the strength of the claim', 'Because the sample was random, **about 4,160 to 4,800** is a plausible interval at the stated confidence level, not an exact count or a causal result.']
      ],
      desmosSteps: ['Enter (0.56 − 0.04) × 8000 and (0.56 + 0.04) × 8000.', 'The endpoints are **4160** and **4800**. The sampling design, not the calculator, supports the inference.'],
      why: 'Margin of error does not tell us exactly how many residents support the proposal.'
    },
    practice: [
      { id: 'st1', level: 'Medium', type: 'mcq', prompt: 'A school posts a survey link on its website, and 600 students choose to respond. Which conclusion is justified?', options: ['The sample is random because it is large.', 'The results can be generalized to all students at the school.', 'The responses describe the students who chose to reply, but selection bias limits generalization.', 'The survey proves the school website caused the opinions.'], answer: 'The responses describe the students who chose to reply, but selection bias limits generalization.', hint: 'Ask how the 600 students entered the sample.', steps: ['Students self-selected into a voluntary response sample.', '**The responses describe respondents; they do not reliably represent all students.**'] },
      { id: 'st2', level: 'Advanced', type: 'grid', prompt: 'In a random sample of 500 residents, 48% support a measure. The reported margin of error is 3 percentage points. For a population of 4,000, what is the upper endpoint of the approximate interval for the number who support it?', answer: '2040', accepted: ['2040'], hint: 'Add 3 percentage points to 48%, then multiply by 4,000.', steps: ['Upper proportion = 48% + 3 percentage points = 51%.', '**0.51 × 4000 = 2040.**'] },
      { id: 'st3', level: 'Advanced', type: 'mcq', prompt: 'Researchers randomly assign 100 volunteers to a treatment or a placebo, then compare outcomes. Which statement best describes what the design can support?', options: ['A causal comparison for these volunteers, but not automatic generalization to all people', 'Generalization to all people, but no causal comparison', 'Both population generalization and causation for all people', 'Neither any comparison nor any conclusion'], answer: 'A causal comparison for these volunteers, but not automatic generalization to all people', hint: 'Distinguish random assignment from random sampling.', steps: ['Random assignment helps isolate the treatment’s effect in the experimental group.', 'Because participants were volunteers rather than a random population sample, **generalization to all people is not automatic**.'] }
    ]
  },
  {
    id: 'rational', title: 'Rational expressions & equations', domain: 'Advanced Math',
    summary: 'Factor first, record excluded values, and check every proposed solution in the original equation.',
    route: ['Record values that make any original denominator zero.', 'Factor and simplify or clear denominators carefully.', 'Solve, then reject candidates outside the original domain.'],
    concepts: [
      ['Rational expression', 'A quotient of polynomials. It is undefined where its original denominator equals zero.'],
      ['Equivalent simplification', 'A common factor can cancel, but its zero stays excluded from the domain; cancellation does not fill a hole.'],
      ['Rational equation', 'Multiplying by a variable expression can create candidates at excluded values. Verify all candidates in the original equation.'],
      ['Graph behavior', 'A noncanceled denominator zero may be a vertical asymptote. A canceled factor creates a removable hole. For equal polynomial degrees, the horizontal asymptote is the ratio of leading coefficients, after simplification.']
    ],
    formulas: [
      ['Difference of squares', 'a² − b² = (a − b)(a + b)', 'Useful before canceling.'],
      ['Domain restriction', 'original denominator ≠ 0', 'Write before multiplying.'],
      ['Cross multiplication', 'a/b = c/d ⇒ ad = bc, if b,d ≠ 0', 'The condition is essential.'],
      ['Horizontal asymptote', 'equal degrees ⇒ y = leading-coefficient ratio', 'Applies to reduced rational form.']
    ],
    traps: ['Keeping a root created by multiplying by zero.', 'Claiming a canceled factor is a vertical asymptote.', 'Canceling terms across addition, such as (x + 2)/x → 2.'],
    desmos: ['Graph the original equation’s two sides to check valid intersections; an excluded x-value may show a misleading nearby trace.', 'Graph the original rational function and inspect behavior near denominator zeros. Algebra distinguishes a hole from an asymptote exactly.'],
    example: {
      type: 'mcq', prompt: 'What is the solution to (x + 1)/(x − 2) = 12/(x² − 4)?',
      options: ['−5 only', '2 only', '−5 and 2', 'No solution'], answer: '−5 only',
      steps: [
        ['Record exclusions', 'x² − 4 = (x − 2)(x + 2), so **x ≠ 2** and **x ≠ −2**.'],
        ['Clear denominators', 'For allowed x, multiply by (x − 2)(x + 2): **(x + 1)(x + 2) = 12**. Thus x² + 3x − 10 = 0.'],
        ['Factor and check', '**(x + 5)(x − 2) = 0** gives −5 or 2. But 2 is excluded. Substitution confirms x = −5 works, so **−5 only**.']
      ],
      desmosSteps: ['Graph y = (x + 1)/(x − 2) and y = 12/(x² − 4).', 'The valid intersection is at x = **−5**. The algebraic candidate x = 2 lies where both original expressions are undefined.'],
      why: 'Cross multiplication creates the candidate 2 after multiplying by an expression that is zero there.'
    },
    practice: [
      { id: 'r1', level: 'Medium', type: 'mcq', prompt: 'For x ≠ 4, which expression is equivalent to (x² − 16)/(x − 4)?', options: ['x − 4', 'x + 4', 'x² + 4', '1/(x + 4)'], answer: 'x + 4', hint: 'Factor a difference of squares.', steps: ['x² − 16 = (x − 4)(x + 4).', '**The expression equals x + 4 for x ≠ 4.**'] },
      { id: 'r2', level: 'Medium', type: 'grid', prompt: 'What value of x satisfies 5/(x − 1) = 2/(x + 2)?', answer: '-4', accepted: ['-4', '−4'], hint: 'Exclude x = 1 and −2, then cross multiply.', steps: ['5(x + 2) = 2(x − 1), so 5x + 10 = 2x − 2.', '**x = −4**, which is allowed.'] },
      { id: 'r3', level: 'Advanced', type: 'mcq', prompt: 'For f(x) = (x² − 1)/(x² − 3x + 2), which statement is true?', options: ['There is a hole at x = 1 and a vertical asymptote at x = 2.', 'There is a vertical asymptote at x = 1 and a hole at x = 2.', 'There are vertical asymptotes at both x = 1 and x = 2.', 'There are no excluded x-values.'], answer: 'There is a hole at x = 1 and a vertical asymptote at x = 2.', hint: 'Factor both polynomials and identify the canceled factor.', steps: ['f(x) = [(x − 1)(x + 1)]/[(x − 1)(x − 2)] = (x + 1)/(x − 2), with x ≠ 1, 2.', '**x = 1 is a hole; x = 2 is a vertical asymptote.** The horizontal asymptote is y = 1.'] }
    ]
  }
]
