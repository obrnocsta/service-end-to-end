type Pizza = {
  id: number;
  name: string;
  price: number;
};

type Order = {
  id: number;
  pizza: Pizza;
  status: "ordered" | "completed";
};

let cashInRegister = 100;
let nextOrderId = 0;
let nextPizzaId = 0;

const menu: Pizza[] = [
  { id: ++nextPizzaId, name: "Margherita", price: 8 },
  { id: ++nextPizzaId, name: "Pepperoni", price: 10 },
  { id: ++nextPizzaId, name: "Hawaiian", price: 10 },
  { id: ++nextPizzaId, name: "Veggie", price: 9 },
];

const orderQueue: Order[] = [];

const addNewPizza = (pizza: Omit<Pizza, "id">): Pizza => {
  const newPizza = {
    id: ++nextPizzaId,
    ...pizza,
  };
  menu.push(newPizza);
  return newPizza;
};

const placeOrder = (pizzaName: string): Order | undefined => {
  const pizza = menu.find(
    (item) => item.name.toLowerCase() === pizzaName.toLowerCase(),
  );
  if (!pizza) {
    console.error(`${pizzaName} does not exists in the menu`);
    return;
  }
  cashInRegister += pizza.price;
  const newOrder: Order = {
    id: ++nextOrderId,
    pizza,
    status: "ordered",
  };
  orderQueue.push(newOrder);
  return newOrder;
};

const completeOrder = (id: number): Order | undefined => {
  const order = orderQueue.find((o) => o.id === id);
  if (!order) {
    console.error(`${id} was not found in the orderQueue`);
    return;
  }
  order.status = "completed";
  return order;
};

const getPizzaDetail = (identifier: string | number): Pizza | undefined => {
  if (typeof identifier === "string") {
    return menu.find(
      (pizza) => pizza.name.toLowerCase() === identifier.toLowerCase(),
    );
  } else if (typeof identifier === "number") {
    return menu.find((pizza) => pizza.id === identifier);
  } else {
    throw new TypeError(
      `Parameter 'identifier' must be either a string or a number`,
    );
  }
};

// Example of using 'Generic' types

function addToArray<T>(array: T[], item: T): T[] {
  array.push(item);
  return array;
}

// example usage:
addToArray<Pizza>(menu, {
  id: nextPizzaId++,
  name: "Chicken Bacon Ranch",
  price: 12,
});
addToArray<Order>(orderQueue, {
  id: nextOrderId++,
  pizza: menu[2],
  status: "completed",
});

console.log(menu);
console.log(orderQueue);

// use case

// addNewPizza({ name: "Banana", price: 9 });
// placeOrder("Banana");
// completeOrder(1);

// console.log("Menu:", menu);
// console.log("\nOrders:", orderQueue);
// console.log("\nRegister: $", cashInRegister);

// console.log("\nPizza Detail:", getPizzaDetail(2));

// info
// When shoul use 'any'?
// In short: DON'T
// One legitimate use-case: you're in the process of transitioning a code base from JavaScript to TypeScript ad don't immediately have the time to write all your complex types, so you just need a way to 'get around TypeScript' for now.
