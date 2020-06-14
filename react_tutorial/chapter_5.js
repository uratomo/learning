// https://ja.reactjs.org/docs/state-and-lifecycle.html
// ５章 stateについて
//  stateは、ライフサイクルメソッドで、変更のタイミングを決める => setStateで、仮想DOMの更新を行うことができる

function tick() {
  const element = (
    <div>
      <h1>Hello</h1>
      <h2>It is {new Date().toLocaleTimeString()}</h2>
    </div>
  );
}

ReactDOM.render(element, document.getElementById("root"));

setInterval(tick(), 1000);

//  カプセル化すると...
function Clock(props) {
  return (
    <div>
      <h1>Hello</h1>
      <h2>It is {props.date.toLocaleTimeString}</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(<Clock date={new Date()} />, document.getElementById("root"));
}

setInterval(tick, 1000);
//  しかし、上記だと、setInterval()で、更新を無理やり設定している。本来は、更新作業も <Clock />で完結している必要がある

//  以下、stateを用いた実装手順
// 1.React.Component を継承する同名の ES6 クラスを作成する。
// 2.render() と呼ばれる空のメソッドを 1 つ追加する。
// 3.関数の中身を render() メソッドに移動する。
// 4.render() 内の props を this.props に書き換える。
// 5.this.state の初期状態を設定するクラスコンストラクタを追加する：
// 5.空になった関数の宣言部分を削除する。

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return (
      <div>
        <h1>Hello,world!</h1>
        {/* <h2>It is {this.props.date.toLocaleTimeString()}</h2>  */}
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById("root"));

//  下準備完了,次に、クラスにライフサイクルメソッドを追加し、仮装DOMの更新タイミングを設定する

// extendsによる継承が重要。これがあるから、ライフサイクルメソッドなどが自由に使える
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  // コンポーネントがマウントされた直後に呼び出される(つまり、render直後)
  componentDidMount() {
    // データフロー(仮想DOM)に関係しないデータは、this.xxxで手動で、クラスに追加することができる
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  // 生成した DOM が削除されるとき。タイマーを停止させたいときに使用すること
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  //  stateを上書きするときは、setStateメソッドでやること。このメソッドを使用しないと、renderに変更が反映されない
  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById("root"));

// stateの管理は、単一方向データフローとなっている
// ex) Clockの子コンポーネントへのstateの渡し方。

<FormattedDate date={this.state.date} />;

function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
