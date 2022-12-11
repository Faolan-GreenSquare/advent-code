import React from "react"

export const App = () => {

  const output = execute();

  return (
    <div>
      <div>Output: {output}</div>
    </div>
  )
}

const execute = (): number => {

  let output = 0;

  interface Monkey {
    items: number[],
    itemsInspected: number,
    operation: {
      x: string | number,
      y: string | number,
      op: string
    },
    test: number,
    targets: number[]
  }

  const monkeys: Record<number, Monkey> = {
    0: { items: [79, 98], itemsInspected: 0, operation: { x: "old", y: 19, op: "*" }, test: 23, targets: [3, 2] },
    1: { items: [54, 65, 75, 74], itemsInspected: 0, operation: { x: "old", y: 6, op: "+" }, test: 19, targets: [0, 2] },
    2: { items: [79, 60, 97], itemsInspected: 0, operation: { x: "old", y: "old", op: "*" }, test: 13, targets: [3, 1] },
    3: { items: [74], itemsInspected: 0, operation: { x: "old", y: 3, op: "+" }, test: 17, targets: [1, 0] }
  }

  const bigMod = 23*19*13*17;

  /*
  const monkeys: Record<number, Monkey> = {
    0: { items: [65, 78], itemsInspected: 0, operation: { x: "old", y: 3, op: "*" }, test: 5, targets: [3, 2] },
    1: { items: [54, 78, 86, 79, 73, 64, 85, 88], itemsInspected: 0, operation: { x: "old", y: 8, op: "+" }, test: 11, targets: [7, 4] },
    2: { items: [69, 97, 77, 88, 87], itemsInspected: 0, operation: { x: "old", y: 2, op: "+" }, test: 2, targets: [3, 5] },
    3: { items: [99], itemsInspected: 0, operation: { x: "old", y: 4, op: "+" }, test: 13, targets: [5, 1] },
    4: { items: [60, 57, 52], itemsInspected: 0, operation: { x: "old", y: 19, op: "*" }, test: 7, targets: [6, 7] },
    5: { items: [91, 82, 85, 73, 84, 53], itemsInspected: 0, operation: { x: "old", y: 5, op: "+" }, test: 3, targets: [1, 4] },
    6: { items: [88, 74, 68, 56], itemsInspected: 0, operation: { x: "old", y: "old", op: "*" }, test: 17, targets: [2, 0] },
    7: { items: [54, 82, 72, 71, 53, 99, 67], itemsInspected: 0, operation: { x: "old", y: 1, op: "+" }, test: 19, targets: [0, 6] }
  }
  */

  const rounds = 10000;
  for (let i = 0; i < rounds; i++) {
    for (const key in monkeys) {
      const monkey = monkeys[key];
      for (let item = 0; item < monkey.items.length; item++) {
        monkey.itemsInspected++;
        const x: number = typeof (monkey.operation.x) === 'string' ? monkey.items[item] : monkey.operation.x;
        const y: number = typeof (monkey.operation.y) === 'string' ? monkey.items[item] : monkey.operation.y;
        const doMaths = {
          '+': function (x, y): number { return x + y },
          '-': function (x, y): number { return x - y },
          '*': function (x, y): number { return x * y },
          '/': function (x, y): number { return x / y }
        }
        monkey.items[item] = Math.floor(doMaths[monkey.operation.op](x, y) / bigMod);
        monkeys[monkey.targets[monkey.items[item] % monkey.test === 0 ? 1 : 0]].items.push(monkey.items[item]);
      }
      monkey.items = [];
    }
    if(i === 0 || i === 19 || i === 999 || i === 1999 || i === 2999 || i === 3999 || i === 4999 || i === 5999 || 
      i === 6999 || i === 7999 || i === 8999 || i === 9999) {
      console.log(`Round: ${i+1}`)
      console.table(monkeys);
    }
  }
  return output;
}