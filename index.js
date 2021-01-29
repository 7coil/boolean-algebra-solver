const symbols = {
  true: {
    type: 'boolean',
    precedence: 0,
    associativity: null,
    regex: /^t(rue)?/i
  },
  false: {
    type: 'boolean',
    precedence: 0,
    associativity: null,
    regex: /^f(alse)?/i
  },
  not: {
    type: 'operator',
    precedence: 4,
    associativity: true,
    regex: /^(not|¬)/i
  },
  xor: {
    type: 'operator',
    precedence: 3,
    associativity: false,
    regex: /^(xor|⊕)/i
  },
  and: {
    type: 'operator',
    precedence: 3,
    associativity: false,
    regex: /^(and|∧)/i
  },
  or: {
    type: 'operator',
    precedence: 3,
    associativity: false,
    regex: /^(or|∨)/i,
  },
  open_p: {
    type: 'operator',
    precedence: 3,
    associativity: false,
    regex: /^(\()/,
  },
  close_p: {
    type: 'operator',
    precedence: 3,
    associativity: false,
    regex: /^(\))/,
  },
};

const audit = [
  [true, '((¬((FALSE ⊕ TRUE) ⊕ FALSE ⊕ (TRUE ⊕ ¬FALSE)) ⊕ (((FALSE ⊕ TRUE) ∨ FALSE ∨ TRUE) ⊕ (¬TRUE ∧ TRUE) ⊕ (FALSE ⊕ FALSE ⊕ TRUE)) ⊕ (TRUE ⊕ (FALSE ∨ TRUE) ⊕ FALSE)) ∨ (((FALSE ∧ TRUE) ∧ FALSE) ⊕ ((FALSE ⊕ TRUE) ∨ ((TRUE ∧ ¬FALSE) ⊕ (¬TRUE ∨ FALSE) ⊕ TRUE) ∨ (FALSE ∨ FALSE) ∨ ((FALSE ∧ TRUE) ⊕ TRUE)) ⊕ (FALSE ∧ (TRUE ∧ FALSE ∧ TRUE ∧ FALSE) ∧ TRUE ∧ (FALSE ∧ TRUE ∧ FALSE) ∧ TRUE)) ∨ ¬((FALSE ⊕ FALSE ⊕ ¬TRUE) ∧ (TRUE ∧ TRUE ∧ TRUE) ∧ (TRUE ∨ TRUE)))'],
  [true, '((((TRUE ∨ FALSE) ⊕ (¬TRUE ∧ FALSE ∧ FALSE)) ∨ (TRUE ∧ (TRUE ∨ TRUE ∨ TRUE) ∧ (¬FALSE ∨ FALSE ∨ FALSE) ∧ FALSE)) ⊕ (¬(((FALSE ∨ FALSE) ⊕ TRUE) ∨ (TRUE ⊕ FALSE ⊕ TRUE) ∨ ¬(FALSE ∨ (FALSE ⊕ TRUE))) ∧ (((FALSE ∧ FALSE) ∧ (TRUE ∨ FALSE ∨ TRUE) ∧ ¬((TRUE ⊕ FALSE ⊕ TRUE ⊕ TRUE) ∧ TRUE ∧ (TRUE ∨ ¬FALSE) ∧ FALSE)) ∨ (((TRUE ⊕ FALSE ⊕ FALSE) ⊕ (FALSE ∧ TRUE) ⊕ FALSE) ⊕ (FALSE ∨ TRUE ∨ ¬FALSE)) ∨ ((FALSE ∧ FALSE ∧ FALSE) ⊕ FALSE ⊕ (¬FALSE ⊕ TRUE ⊕ FALSE ⊕ FALSE ⊕ ¬FALSE) ⊕ (¬FALSE ⊕ FALSE) ⊕ (FALSE ∨ TRUE ∨ ¬FALSE ∨ FALSE)) ∨ ((FALSE ∨ TRUE ∨ FALSE) ⊕ (¬TRUE ∨ FALSE ∨ ¬FALSE))) ∧ (((FALSE ∧ TRUE ∧ TRUE) ∧ FALSE) ∧ (FALSE ⊕ ¬FALSE ⊕ TRUE) ∧ (FALSE ⊕ TRUE)) ∧ ((FALSE ∨ TRUE ∨ FALSE) ∨ ¬(FALSE ∧ FALSE) ∨ (TRUE ∧ FALSE ∧ (TRUE ∧ TRUE ∧ TRUE) ∧ FALSE) ∨ (TRUE ⊕ FALSE))) ⊕ (((FALSE ⊕ FALSE ⊕ (FALSE ∨ TRUE ∨ TRUE ∨ TRUE) ⊕ (TRUE ⊕ TRUE)) ⊕ ((TRUE ∧ TRUE) ∨ ¬(FALSE ∧ TRUE ∧ TRUE) ∨ (FALSE ∧ TRUE) ∨ ¬(¬TRUE ⊕ TRUE ⊕ TRUE ⊕ TRUE)) ⊕ (¬(TRUE ⊕ FALSE ⊕ FALSE) ∧ ((TRUE ⊕ FALSE) ∧ FALSE ∧ (FALSE ∧ TRUE ∧ FALSE) ∧ (FALSE ⊕ TRUE ⊕ FALSE ⊕ FALSE) ∧ (TRUE ∧ FALSE ∧ ¬FALSE ∧ FALSE ∧ TRUE)) ∧ (TRUE ∧ FALSE)) ⊕ ((TRUE ∧ TRUE) ∨ ¬TRUE ∨ FALSE ∨ FALSE)) ⊕ (((FALSE ∨ FALSE ∨ FALSE) ∧ (FALSE ⊕ TRUE) ∧ (FALSE ∨ TRUE ∨ TRUE)) ⊕ ((TRUE ⊕ TRUE) ∨ FALSE ∨ (TRUE ⊕ FALSE)))) ⊕ ((((TRUE ∧ TRUE) ∨ (TRUE ∨ FALSE)) ∧ ((FALSE ⊕ FALSE ⊕ TRUE) ∧ (FALSE ⊕ TRUE ⊕ FALSE ⊕ FALSE) ∧ (FALSE ∨ FALSE ∨ TRUE)) ∧ ((¬FALSE ⊕ FALSE ⊕ FALSE) ⊕ TRUE) ∧ (TRUE ∧ (¬FALSE ⊕ FALSE ⊕ FALSE))) ∨ (((FALSE ∧ FALSE) ∨ (FALSE ⊕ FALSE)) ∧ ¬(FALSE ∧ (FALSE ∧ FALSE))) ∨ ((FALSE ∨ FALSE ∨ TRUE) ∨ (TRUE ∧ FALSE ∧ TRUE ∧ TRUE) ∨ (TRUE ∧ ¬(FALSE ∨ TRUE)))) ⊕ ((FALSE ∨ (FALSE ∨ TRUE)) ∨ (FALSE ⊕ ¬FALSE ⊕ (FALSE ∨ TRUE)) ∨ (((FALSE ⊕ TRUE) ⊕ TRUE ⊕ TRUE) ∧ (FALSE ∨ FALSE)) ∨ ¬(¬(FALSE ∧ FALSE ∧ TRUE ∧ FALSE) ⊕ ¬TRUE ⊕ (TRUE ∧ TRUE))))'],
  [true, '((((TRUE ⊕ FALSE) ∨ FALSE ∨ TRUE) ⊕ (FALSE ⊕ FALSE ⊕ FALSE) ⊕ (TRUE ∨ ¬FALSE ∨ TRUE ∨ TRUE)) ∨ ((TRUE ∧ TRUE ∧ (TRUE ∧ FALSE)) ∧ ¬(TRUE ∧ (FALSE ⊕ FALSE) ∧ TRUE) ∧ (TRUE ⊕ ¬TRUE ⊕ FALSE)) ∨ (TRUE ⊕ (FALSE ⊕ TRUE ⊕ TRUE)))'],
  [true, '(((FALSE ∨ ¬(TRUE ∨ FALSE)) ∧ ((FALSE ∧ TRUE) ∨ (TRUE ∨ TRUE))) ∨ (((FALSE ∧ FALSE) ∧ TRUE) ∨ (¬TRUE ∨ (TRUE ⊕ TRUE)) ∨ ((FALSE ⊕ FALSE) ⊕ (FALSE ⊕ (TRUE ⊕ TRUE)))) ∨ ¬(((TRUE ∨ TRUE) ∧ (FALSE ∧ TRUE)) ∧ (TRUE ∧ FALSE)))'],
  [false, '((FALSE ∨ FALSE ∨ FALSE) ⊕ (FALSE ⊕ FALSE ⊕ FALSE ⊕ FALSE ⊕ TRUE ⊕ FALSE) ⊕ (((TRUE ∧ FALSE ∧ TRUE) ⊕ FALSE ⊕ (FALSE ⊕ TRUE) ⊕ FALSE) ⊕ (FALSE ⊕ FALSE ⊕ FALSE ⊕ FALSE ⊕ TRUE) ⊕ (FALSE ∧ TRUE ∧ FALSE ∧ TRUE ∧ FALSE) ⊕ ((TRUE ∧ TRUE ∧ TRUE ∧ TRUE) ∨ FALSE ∨ (FALSE ⊕ TRUE ⊕ FALSE ⊕ ¬TRUE ⊕ TRUE) ∨ (¬TRUE ∨ ¬FALSE))) ⊕ ((FALSE ∨ FALSE ∨ TRUE ∨ FALSE ∨ TRUE) ⊕ FALSE ⊕ TRUE ⊕ ¬(TRUE ⊕ FALSE) ⊕ (FALSE ∨ FALSE ∨ FALSE ∨ TRUE ∨ TRUE)) ⊕ ((FALSE ∧ TRUE ∧ TRUE) ∨ FALSE ∨ (FALSE ∧ (TRUE ∧ ¬TRUE ∧ TRUE ∧ FALSE) ∧ TRUE) ∨ (TRUE ⊕ TRUE ⊕ FALSE ⊕ ¬FALSE ⊕ TRUE) ∨ (FALSE ∨ TRUE ∨ FALSE ∨ TRUE)) ⊕ (¬FALSE ∧ FALSE ∧ TRUE ∧ TRUE ∧ FALSE ∧ TRUE ∧ TRUE))'],
  [false, '(((FALSE ∨ (TRUE ∨ FALSE ∨ FALSE)) ∧ (TRUE ∧ TRUE ∧ TRUE)) ⊕ ((TRUE ∧ (FALSE ∨ TRUE ∨ FALSE ∨ FALSE)) ∧ ((FALSE ∨ FALSE ∨ FALSE ∨ FALSE) ∨ (TRUE ⊕ TRUE ⊕ TRUE ⊕ TRUE ⊕ TRUE) ∨ TRUE ∨ (FALSE ∨ TRUE ∨ TRUE) ∨ ¬TRUE)) ⊕ ((FALSE ⊕ TRUE) ∨ (TRUE ∧ TRUE)) ⊕ ((TRUE ∨ TRUE) ⊕ (TRUE ∧ ¬TRUE)) ⊕ (((TRUE ∧ TRUE ∧ FALSE) ∧ (FALSE ∧ FALSE ∧ FALSE) ∧ ((FALSE ∨ TRUE) ⊕ FALSE ⊕ TRUE ⊕ FALSE) ∧ (FALSE ∨ TRUE ∨ (FALSE ⊕ TRUE ⊕ TRUE) ∨ FALSE)) ⊕ (((FALSE ∧ FALSE) ∨ TRUE ∨ FALSE) ∧ (TRUE ∧ FALSE) ∧ (FALSE ⊕ FALSE)) ⊕ (FALSE ∧ TRUE ∧ (TRUE ∧ TRUE ∧ TRUE))))'],
  [false, '(((TRUE ⊕ TRUE ⊕ ¬FALSE ⊕ FALSE ⊕ FALSE) ⊕ ((TRUE ∧ FALSE ∧ FALSE) ∨ FALSE ∨ (FALSE ∨ TRUE)) ⊕ (FALSE ∨ TRUE ∨ (FALSE ∧ TRUE)) ⊕ (FALSE ∧ TRUE ∧ FALSE) ⊕ ((TRUE ∧ TRUE) ∨ TRUE ∨ (FALSE ∧ FALSE))) ∨ (FALSE ∧ ¬TRUE) ∨ ((FALSE ∨ TRUE) ∧ ¬((FALSE ⊕ TRUE ⊕ FALSE) ⊕ TRUE ⊕ (TRUE ∧ FALSE ∧ FALSE) ⊕ TRUE) ∧ ((FALSE ⊕ FALSE ⊕ FALSE) ⊕ FALSE) ∧ (FALSE ⊕ FALSE ⊕ TRUE ⊕ TRUE)) ∨ ((FALSE ∧ (FALSE ∧ FALSE ∧ TRUE) ∧ (TRUE ⊕ TRUE ⊕ TRUE ⊕ FALSE)) ∧ (TRUE ⊕ TRUE)))'],
  [true, '(¬((¬(TRUE ∧ FALSE) ⊕ ((TRUE ∨ TRUE ∨ TRUE) ∨ (FALSE ∨ FALSE) ∨ FALSE) ⊕ (TRUE ⊕ FALSE)) ⊕ (((FALSE ∨ TRUE) ∨ (FALSE ⊕ FALSE)) ⊕ (((FALSE ∧ ¬FALSE) ⊕ TRUE) ∧ (TRUE ⊕ TRUE)) ⊕ (((FALSE ∧ TRUE) ⊕ (FALSE ∨ TRUE)) ∧ ((FALSE ∨ FALSE) ∧ TRUE)))) ∨ ((((FALSE ⊕ ¬FALSE) ∧ (FALSE ∧ ¬FALSE)) ∨ (TRUE ⊕ (TRUE ⊕ TRUE))) ∨ (((TRUE ⊕ FALSE) ⊕ ¬(FALSE ∨ ¬FALSE)) ⊕ ((TRUE ∨ FALSE) ⊕ (TRUE ∨ FALSE ∨ ¬FALSE))) ∨ (((TRUE ∨ FALSE) ∨ (FALSE ⊕ TRUE)) ∧ ((FALSE ∨ TRUE) ∧ ¬(FALSE ⊕ FALSE)))) ∨ (((¬TRUE ∧ TRUE ∧ TRUE) ∧ TRUE ∧ FALSE) ⊕ ((FALSE ⊕ TRUE) ∨ (FALSE ⊕ ¬(FALSE ∨ FALSE ∨ TRUE)) ∨ ¬(FALSE ⊕ TRUE ⊕ FALSE))) ∨ (((TRUE ∧ ¬FALSE) ⊕ (FALSE ⊕ FALSE)) ∧ ((¬FALSE ∧ TRUE ∧ FALSE) ∧ ((TRUE ⊕ FALSE ⊕ TRUE ⊕ FALSE) ∨ (FALSE ∧ (TRUE ⊕ TRUE ⊕ TRUE)) ∨ ¬(FALSE ⊕ (TRUE ⊕ TRUE ⊕ FALSE) ⊕ FALSE) ∨ (TRUE ⊕ ¬TRUE ⊕ (TRUE ∧ TRUE ∧ TRUE) ⊕ FALSE))) ∧ (((FALSE ∧ FALSE ∧ FALSE) ⊕ (FALSE ⊕ ¬TRUE) ⊕ (TRUE ∨ FALSE)) ∨ (((TRUE ∨ FALSE) ∧ TRUE) ∨ (FALSE ⊕ TRUE) ∨ ((TRUE ∨ FALSE) ∧ (FALSE ∨ TRUE))) ∨ ((FALSE ∨ ¬FALSE) ⊕ (FALSE ∨ FALSE ∨ TRUE) ⊕ (¬(TRUE ∧ TRUE) ⊕ (TRUE ⊕ FALSE))))))']
];

const parse = (string = '', tokens = []) => {
  string = string.trim();

  const symbol = Object.entries(symbols)
    .find(([type, symbol]) => symbol.regex.test(string));

  if (symbol) {
    const [type, s] = symbol;
    const { regex } = s;
    const textRepresentation = regex.exec(string)[0];

    return parse(
      string.slice(textRepresentation.length),
      [...tokens, type]
    );
  }

  return tokens;
}

// https://gist.github.com/aaditmshah/6683499
const shunt = (input = []) => {
  const length = input.length;
  const output = [];
  const stack = [];
  let index = 0;

  while (index < length) {
    let token = input[index++];

    switch (token) {
      case 'open_p':
        stack.unshift(token);
        break;
      case 'close_p':
        while (stack.length) {
          token = stack.shift();
          if (token === 'open_p') break;
          else output.push(token);
        }

        if (token !== 'open_p')
          throw new Error("Mismatched parentheses.");
        break;
      default:
        if (symbols.hasOwnProperty(token) && symbols[token].type === 'operator') {
          while (stack.length) {
            const punctuator = stack[0];

            if (punctuator === 'open_p') break;

            const operator = symbols[token];
            const precedence = operator.precedence;
            const antecedence = symbols[punctuator].precedence;

            if (precedence > antecedence ||
              precedence === antecedence &&
              operator.associativity) break;
            else output.push(stack.shift());
          }

          stack.unshift(token);
        } else output.push(token);
    }
  }

  while (stack.length) {
    var token = stack.shift();
    if (token !== 'open_p') output.push(token);
    else throw new Error("Mismatched parentheses.");
  }

  return output;
}

const solve = (tokens = []) => {
  const stack = [];
  while(tokens.length > 0) {
    const currentInputToken = tokens.shift();
    let o1;
    let o2;
    switch(currentInputToken) {
      case 'true':
      case 'false':
        stack.unshift(currentInputToken === 'true');
        break;
      case 'xor':
        [ o1, o2 ] = [ stack.shift(), stack.shift() ];
        stack.unshift(o1 !== o2);
        break;
      case 'or':
        [ o1, o2 ] = [ stack.shift(), stack.shift() ];
        stack.unshift(o1 || o2);
        break;
      case 'and':
        [ o1, o2 ] = [ stack.shift(), stack.shift() ];
        stack.unshift(o1 && o2);
        break;
      case 'not':
        o1 = stack.shift();
        stack.unshift(!o1);
        break;
    }
  }

  if (stack.length !== 1) throw new Error('This expression did not end with a single element.');

  return stack[0];
}

audit
  .forEach(([exepcted, input], index) => {
    const actual = solve(shunt(parse(input)));

    console.log(
      `
Audit number: ${index}

${input}

Expected ${exepcted}, got ${actual}
      `
    );
  })

const output = document.getElementById('out');
const input = document.getElementById('in');
// const buddon = document.getElementById('buddon');

document.addEventListener('load', () => {
  input.value = '';
  output.value = '';
})

input.addEventListener('input', () => {
  if (input.value === '') {
    output.value = ''
    return;
  }

  try {
    output.value = solve(shunt(parse(input.value)));
  } catch(e) {
    output.value = e.message + '\n' + e.stack;
  }
})

output.addEventListener('click', () => {
  output.select()
  output.setSelectionRange(0, 99999);
  document.execCommand('copy');
})
