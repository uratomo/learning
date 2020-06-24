// リストとkey

//  リストの根本的な思想はmapメソッド
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => {
  number * 2;
});
console.log(doubled);

// 上記をJSXに変換すると
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => {
  <li>{number}</li>;
});

ReactDOM.render(<ul>{listItems}</ul>, document.getElementById("root"));

// もうちょいReactっぽく
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => {
    <li>{number}</li>;
  });
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];

ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById("root")
);

//  keyをつけないと怒られるので、つける

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => (
  <li key={number.toString()}>{number}</li>
));
//  keyは配列を特定するのに使用されるので基本的に必須
const todoItems = todos.map((todo) => <li key={todo.id}>{todo.text}</li>);

// keyに該当する値がない場合は、indexを作ることも可能
const todoItems = todos.map((todo, index) => (
  // Only do this if items have no stable IDs
  <li key={index}>{todo.text}</li>
));

// listItemは配列の中身だけを定義すること&& keyは外から指定すること(mapのなかでkeyを指定すると覚えると良い)

function ListItem(props) {
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const ListItems = mumbers.map((number) => {
    <ListItem key={number.toString()} value={number} />;
  });

  return <ul>{ListItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById("root")
);
