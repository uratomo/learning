// formについて
//  htmlを普通に記述したりできるが、それだけでなく、アクションを加える時にreactは便利である。

//  baseの書き方
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(thid);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted" + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      //  jqueryと違い、直接発火地点に、methodを書く
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

//  jsxでのinputの様々な書き方

// textarea
<textarea value={this.state.value} onChange={this.handleChange} />;

// select
this.state = { value: "coconut" };
// valueが一致した値がselectedとなる
<select value={this.state.value} onChange={this.handleChange}>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>;
