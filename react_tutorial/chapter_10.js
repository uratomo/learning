// stateのリフトアップ
// 一つのトップレベルのコンポーネントを起点に、stateをうまくpropsとして引き渡す

// 温度を二つの値で表現する
const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit",
};

function toCelucius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

// ex: tryConvert('10.22', toFahrenheit) return '50.396'
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

// 入力form  親のstateが変更された時、propsの値も変更される。
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { temperature: "" };
  }
  handleChange(e) {
    //  stateの管理をこのclassだけで完結するなら  this.setState({ temperature: e.target.value });
    this.props.onTempertureChange(e.target.value);
  }
  render() {
    // stateの管理をこのclassだけで完結するなら、 const temperture = this.state.temperture;
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

//  一番上の親
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCeluciusChange = this.handleCeluciusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state({ temperature: "", scale: "c" });
  }

  handleCeluciusChange(temperature) {
    this.setState({ scale: "c", temperature });
  }

  handleFahrenheitChange(temperature) {
    this.setState({ scale: "f", temperature });
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celcius =
      scale === "f" ? tryConvert(temperature, toCelucius) : temperature;
    const fahrenheit =
      scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput
          scale="c"
          temperture={celcius}
          onTempertureChange={this.handleCeluciusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTempertureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict celsius={perseFloat(celsius)} />
      </div>
    );
  }
}
