import './App.css';
import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: '0',
      previous: '',
      selectedoperator: '',
      calculator: {
      ac: "AC",
      ps: "+/-",
      procent: '%',
      divide: '/',
      seven: 7,
      eight: 8,
      nine: 9,
      multiply: '*',
      four: 4,
      five: 5,
      six: 6, 
      subtract: "-",
      one: 1,
      two: 2,
      three: 3,
      plus: '+',
      zero: 0,
      decimal: '.',
      equal: "=",
      }
    }
  }

  numberSelected = (e) => {
    let val = e.target.innerText;
    let regexNumber = /^[0-9.]*$/;
    if(regexNumber.test(val)){
      this.setState({
        calculator: {
          ...this.state.calculator,
          ac: 'C',
        }
      });
      if(val === '.' && this.state.current.includes(".")) return;
      this.setState({
        current: this.state.current + val,
      }, () => {
      if(this.state.current.startsWith('0') && this.state.current.startsWith(`${Number(val)}`, 1)){
           this.setState({
             current: this.state.current.slice(1),
           })
        } else if(this.state.current.startsWith('.')){
          this.setState({
            current: this.state.current.slice(1),
          })
        } else {
          this.setState({
            current: this.state.current,
          })
        }
      });
    }
  }

  chooseOperator = (e) => {
    let valop = e.target.innerText;
    let regexOp = /^([^0-9.AC]*)$|(^\+\/-$)/;
    if(regexOp.test(valop) && this.state.current !== ''){
      this.setState({
        previous: this.state.current,
      }, () => {});
      this.setState({
        selectedoperator: valop,
      });
      if(this.state.previous !== '' && valop === '=' && this.state.current !== '') {
       return this.runCalculation();
      } else if (valop === "%" && this.state.current !== ''){
        this.setState({
          current: Number(this.state.current)/ 100,
        });
        return this.state.current
      } else if(valop === "+/-" && this.state.current !== ''){
         if(this.state.current > 0){
          this.setState({
            current: -Math.abs(Number(this.state.current))
          });
          return this.state.current;
         } else {
          this.setState({
            current: Math.abs(Number(this.state.current))
          })
          return this.state.current;
         }
      }
      this.setState({
        current: '',
      });
    } 
  }

  runCalculation = (e) => {
    switch(this.state.selectedoperator) {
      case "+":
        this.setState({
          current:  Number(this.state.previous) + Number(this.state.current),
        }, () => {});
        break;
      case '-':
        this.setState({
          current: Number(this.state.previous) - Number(this.state.current),
        }, () => {});
        break;
      case '/':
        this.setState({
          current:  Number(this.state.previous) / Number(this.state.current),
        }, () => {});
        break;
      case "*": 
      this.setState({
        current:  Number(this.state.previous) * Number(this.state.current),
      }, () => {});
        break;
        default:
          break;
    }
  }

  clearNumbers = (e) => {
    let valclear = e.target.innerText;
    let regexclear = /^([^0-9.+/-=%*-]*)$/;
    if(regexclear.test(valclear)){
      this.setState({
        calculator: {
          ...this.state.calculator,
          ac: 'AC',
        }
      });
      this.setState({
        current: '0',
      });
      this.setState({
        previous: '',
      });
      this.setState({
        selectedoperator: '',
      });
    }
  }

  render() {
    return ( <div className="App">
    <h1>Calculator App</h1>
    <div className="Calculatorcontainer">
      <div className="Calculator-app">
        <div className="Displaynumber">
        <span>{this.state.current}</span>
        </div>
        <div className="Number-container">
         {Object.keys(this.state.calculator).map((item, index) => 
          <span onClick={ (e) => {this.numberSelected(e); this.chooseOperator(e); this.clearNumbers(e)}}
          key={index} >{this.state.calculator[item]}</span>
         )}
        </div>
      </div>
    </div>
  </div>);
  }
}

export default App
