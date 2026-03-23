const menu = [
  { name: "Margherita", price: 8 },
  { name: "Pepperoni", price: 10 },
  { name: "Hawaiian", price: 10 },
  { name: "Veggie", price: 9 },
];

let cashInRegister = 100;
let nextId = 0;
const orderQueue = [];

const addNewPizza = (pizza) => {
  menu.push(pizza);
};

const placeOrder = (pizzaName) => {
  const pizza = menu.find((item) =>
    item.name.toLowerCase().includes(pizzaName.toLowerCase()),
  );
  cashInRegister += pizza.price;
  const order = orderQueue.push({
    id: ++nextId,
    pizza,
    status: "ordered",
  });
  return order;
};

const completeOrder = (id) => {
  const index = orderQueue.findIndex((item) => item.id === id);
  if (index.length === -1) {
    return `Order not found for id: ${id}`;
  }
  const order = orderQueue[index];
  order.status = "completed";
  return order;
};

// use case

addNewPizza({ name: "Banana", price: 9 });
placeOrder("Banana");
completeOrder(1);

console.log("Menu:", menu);
console.log("Orders:", orderQueue);
console.log("Register: $", cashInRegister);
