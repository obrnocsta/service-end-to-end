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

const menu: Pizza[] = [
  { id: 1, name: "Margherita", price: 8 },
  { id: 2, name: "Pepperoni", price: 10 },
  { id: 3, name: "Hawaiian", price: 10 },
  { id: 4, name: "Veggie", price: 9 },
];

let cashInRegister = 100;
let nextId = 0;
const orderQueue: Order[] = [];

const addNewPizza = (pizza: Pizza) => {
  menu.push(pizza);
};

const placeOrder = (pizzaName: string) => {
  const pizza = menu.find((item) =>
    item.name.toLowerCase().includes(pizzaName.toLowerCase()),
  );
  if (!pizza) {
    console.error(`${pizza} does not exists in the menu`);
    return;
  }
  cashInRegister += pizza.price;
  const newOrder: Order = {
    id: ++nextId,
    pizza,
    status: "ordered",
  };
  orderQueue.push(newOrder);
  return newOrder;
};

const completeOrder = (id: number) => {
  const order = orderQueue.find((o) => o.id === id);
  if (!order) {
    console.error(`${id} was not found in the orderQueue`);
    return;
  }
  order.status = "completed";
  return order;
};

const getPizzaDetail = (identifier: string | number) => {
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

// use case

addNewPizza({ id: 5, name: "Banana", price: 9 });
placeOrder("Banana");
completeOrder(1);

console.log("Menu:", menu);
console.log("\nOrders:", orderQueue);
console.log("\nRegister: $", cashInRegister);

console.log("\nPizza Detail:", getPizzaDetail(7));
