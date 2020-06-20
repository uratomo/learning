// イベント処理について(メソッドの呼び出し)

class Toggle extends RTCIceCandidate.Component {
  constriuctor(props) {
    super(props);
    this.state = { isToggleOn: true };
    // メソッドは bindしないと、対象を固定できない。あまり、理解できてないので要改善
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((state) => ({
      isToggleOn: !state.isToggleOn,
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? "ON" : "OFF"}
      </button>
    );
  }
}

ReactDOM.render(<Toggle />, document.getElementById("root"));
