import React, {Component} from 'react';
import './App.css';
import Info from './Info';
import NutritionalInfo from './NutritionalInfo';
import Recomendados from './Recomendados';
import { traduzir } from '../Utils/traduzir';
import Scanner from "./Scanner";


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      checkedOne: true,
      checkedTwo: false,
      gtin: 7891991000826,
      comorbidade: 'diabetes',
      data: {
        image: '',
        description: '',
      },
      camera: false,
      result: null,
    }

    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeOne = this.handleChangeOne.bind(this);
    this.handleChangeTwo = this.handleChangeTwo.bind(this);
    this.onDetected = this.onDetected.bind(this);
  }

  //REFRIGERANTE GUARANÁ = 7891991000826
  //PAÇOCA - 7896181711971 - deu ruim
  //PRINGLES - 7896004006482 - deu ruim
  //REPOLHO - 7898108111369
  //MELADO - 7898916045016
  //LEITE CONDENSADO - 7896590817035
  //BISCOITO TRAQUINAS - 7622210592750
  //MANGA ESPADA - 7898205079357

  handleNumberChange(e){
    this.setState({gtin:e.target.value})
  }

  handleChangeOne(){
    this.setState(prevState => {
      return {
        ...prevState,
        checkedOne: !prevState.checkedOne
      }
    }, () => {
      if(this.state.checkedOne && this.state.checkedTwo) {
        this.setState({comorbidade: 'ambos'})
      } 
      else if(this.state.checkedOne) this.setState({comorbidade: 'diabetes'})
      else if(this.state.checkedTwo) this.setState({comorbidade: 'hipertensao'})
    })
  }
  handleChangeTwo(){
    this.setState(prevState => {
      return {
        ...prevState,
        checkedTwo: !prevState.checkedTwo
      }
    }, () => {
      if(this.state.checkedOne && this.state.checkedTwo) {
        this.setState({comorbidade: 'ambos'})
      } 
      else if(this.state.checkedOne) this.setState({comorbidade: 'diabetes'})
      else if(this.state.checkedTwo) this.setState({comorbidade: 'hipertensao'})
    })
  }

  handleClick() {
    try {
      fetch(`http://localhost:5000/api/${this.state.gtin}`)
      .then(res => res.json())
      .then(dataResponse => {
        this.setState(prevState => {
          let data = Object.assign({}, prevState.data);  // creating copy of state variable jasper
          data.image = dataResponse.barcode_image;
          data.description = dataResponse.description;
          return {data}
        })
        return dataResponse
      })
      .then(response => {
        fetch(`http://localhost:5000/api/info/${response.description}`)
        .then(data => data.json())
        .then(resTACO => {
          let atributosTraduzidos = traduzir(resTACO.attributes);
          resTACO.attributes = atributosTraduzidos;
          return resTACO
        }).then(dataTraduzida => {
          this.setState(prevState => {
            let data = Object.assign({}, prevState.data)
            data.nutritionalInfo = dataTraduzida
            return {data}
          })
          return dataTraduzida
        })
        .then(responseTACO => {
          fetch(`http://localhost:5000/api/recomendar/${responseTACO.description}/${this.state.comorbidade}`)
          .then(response => response.json())
          .then(resTACO => {
            resTACO.map((item, i) => {
              return resTACO[i].attributes = traduzir(item.attributes);
            }) 
            return resTACO;
          })
          .then(data => this.setState({recomendados: data}))
          .catch(err => console.log(err))
        })
        .catch(err => console.log('Erro fetch TACO - PRODUTO NÃO ENCONTRADO', err))
      })
    } catch (err) {
      console.log(err)
    }
  }

  onDetected(result) {
    this.setState({result: result})
  }

  render(){
 
    return (
      <div className="App">
         <div className="Scanner">
          <p>{this.state.result ? this.state.result : "Escaneando..."}</p>
          <button onClick={() => this.setState(prevState => {
            return {
              ...prevState,
              camera: !prevState.camera
            }
          })}>
            {this.state.camera ? "Stop" : "Start"}
          </button>
          <div className="container">
            {this.state.camera && <Scanner onDetected={this.onDetected} />}
          </div>
        </div>

        <div className="comorbidades">
          <h2>Comorbidades</h2>
          <h3>Selecione sua Comorbidade:</h3>
          <Checkbox
            label="Diabetes"
            value={this.state.checkedOne}
            onChange={this.handleChangeOne}
          />
          <Checkbox
            label="Hipertensão"
            value={this.state.checkedTwo}
            onChange={this.handleChangeTwo}
          />
        </div>

        <div className="codigoBarras">
          <div className="Digitar">
            <label htmlFor="gtin">Digite o Número do Código de Barras: 
              <input type="text" value={this.state.gtin} id="gtin" onChange={this.handleNumberChange} />
            </label>
          </div>
        </div>

        <button onClick={this.handleClick}>Buscar</button>
        {
          this.state.data ? <Info description={this.state.data.description} image={this.state.data.image} /> : <p></p>
        }
        {
          this.state.data.nutritionalInfo? <NutritionalInfo nutritionalInfo={this.state.data.nutritionalInfo} /> : <p></p>
        }
        { 
          this.state.recomendados? <Recomendados recomendados={this.state.recomendados}/> : <p></p>
        }
      </div>
    );
  }
}

export default App;

const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};