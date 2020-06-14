// propと関数コンポーネントについて

//  以下の二つは、等価である
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
//  propsを引数に入れる必要がない
class Welcome extends React.Component {
  render() {
    return <h1>Welcome {this.props.name}</h1>;
  }
}

//  関数コンポーネントをrenderすることができる   nameはprops.nameと記述することで引き出すことができる
const element = <Welcome name="Sara" />;

// DOMに反映させる
ReactDOM.render(element, document.getElementById("root"));

//  propsと関数コンポーネントを使うとうまく使い回しができる
function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Kaede" />
      <Welcome name="Yoshiko" />
    </div>
  );
}

//  reactの基本形の完成
ReactDOM.render(<App />, document.getElementById("root"));

//  コンポーネントの抽出をしてみる
// 原型
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img
          className="Avater"
          src={props.author.avaterUrl}
          alt={props.author.name}
        />
        <div className="UserrInfo-name">{props.author.name}</div>
        <div className="Comment-text">{props.text}</div>
        <div className="Comment-date">{formatDate(props.date)}</div>
      </div>
    </div>
  );
}

// コンポーネントの切り出し開始
function Avater(props) {
  return (
    <img
      className="Avater"
      src={props.author.avaterUrl}
      alt={props.author.name}
    />
  );
}

function UserInfo(props){
  return (
    <Avater user={props.user} />
    <div className="UserrInfo-name">{props.user.name}>
    </div>
  )
}

// 抽出した結果
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo" user={props.author}/>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
