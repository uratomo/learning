// 条件つきrender
// ログインしているかでボタン表示を変更する

//  propsで管理していると結構簡単に見える
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up .</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  <Greeting isLoggedIn={false} />,
  document.getElementById("root")
);
// 要素変数 パーツ作成

function LoginButton(props) {
  return <button onClick={props.onClick}>Login</button>;
}

function LogoutButton(props) {
  return <button onClick={props.onClick}>Logout</button>;
}

//  ここからstateを使用した実装 props.xxx の値がどんどん子コンポーネントに引き継がれている
class LoginControl extends React.Component {
  constructor(props) {
    super(props),
      (this.handleLoginClick = this.handleLoginClick.bind(this)),
      (this.handleLogoutClick = this.handleLogoutClick.bind(this));
    this.state = { isLoggedIn: false };
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    // 下準備
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    // 実際に仮想DOMに入れるJSX
    return (
      <div>
        <Creeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(<LoginControl />, document.getElementById("root"));
