type Pizza = {
  name: string;
  price: number;
};

type Order = {
  id: number;
  pizza: Pizza;
  status: "ordered" | "completed";
};

const menu = [
  { name: "Margherita", price: 8 },
  { name: "Pepperoni", price: 10 },
  { name: "Hawaiian", price: 10 },
  { name: "Veggie", price: 9 },
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
  const order = orderQueue.push({
    id: ++nextId,
    pizza,
    status: "ordered",
  });
  return order;
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

// use case

addNewPizza({ name: "Banana", price: 9 });
placeOrder("Banana");
completeOrder(1);

console.log("Menu:", menu);
console.log("Orders:", orderQueue);
console.log("Register: $", cashInRegister);
