// https://ja.reactjs.org/docs/introducing-jsx.html
//  ２章 JSXの導入

//  1.JSXの基本----------------
const element = <h1> Hello,World!!</h1>;

// 2.react の基本セット--------------------
const name = "Josh Perez";
// {}で文字列の中に変数を組み込める
const element = <h1>Hello,{name}</h1>;

//  直訳すると、HTMLのid = root 場所にelementをrenderする、という意味になるc
ReactDOM.render(
  element,
  document.getElementById('root')
);


// 3.メソッドをjsx内で呼び出し方  reactはフロントなので、ViewModel的な実装になるっぽい----------------------
// viewmodel
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}
// model
const user = {
  firstName: "Tomo",
  lastName: "Tanaka"
};

// view部分
const element = (
  <h1>
    Hello,{formatName(user)}
  </h1>
);
// viewをid = root に適用する
ReactDOM.render(
  element,
  document.getElementById('root');
);

//  jsxを関数の中に仕込むこともできる --------------
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName}</h1>
  } else {
    return <h1>Hello,Strenger.</h1>
  }
};

//  jsxでの属性指定-------------
// 文字列リテラルを属性として指定
const element = <div tabIndex="0"></div>;
// とにかく{}で囲めばfunctionや変数をjsxの中に組み込むことができる
const element = <img src={user.avatarUrl}></img>;

// 閉じタグは省略することも可能
const element = <img src={user.avatarUrl} />;

// jsxは、htmlと同様に子要素を持つことができる
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good night</h2>
  </div>
);

// Babelによるコンパイルもできる-----------------------------------
// 以下の二つは等価である
// パターン１ htmlに近い記法 実はBebelによってコンパイルされている
const element = (
  <h1 className="greeting" >
    Hello World!
  </h1>
);

// パターン２ Reactを生に記述するならこっち
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello World!'
);

//  パターン２がコンパイルされると以下のような要素となる
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    chirdren: 'Hello World!'
  }
};
