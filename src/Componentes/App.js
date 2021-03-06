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
      gtin: '',
      comorbidade: 'diabetes',
      data: {
        image: '',
        description: '',
      },
      recomendados: [],
      camera: false,
      buscouGTIN: false,
      buscouRecomendados: false,
    }

    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeOne = this.handleChangeOne.bind(this);
    this.handleChangeTwo = this.handleChangeTwo.bind(this);
    this.onDetected = this.onDetected.bind(this);
    this.handleEscanearClick = this.handleEscanearClick.bind(this);
  }

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
    this.setState(prevState => {
      return {
        ...prevState,
        camera: false,
        data: {
          image: '',
          description: '',
        },
      recomendados: [],
      buscouGTIN: false,
      buscouRecomendados: false,
      }
    })
    try {
      fetch(`http://localhost:5000/api/${this.state.gtin}`)
      .then(res => res.json())
      .then(dataResponse => {
        console.log(dataResponse)
        this.setState(prevState => {
          let data = Object.assign({}, prevState.data);  // creating copy of state variable jasper
          data.image = dataResponse.barcode_image;
          data.description = dataResponse.description;
          return {data}
        })
        this.setState({buscouGTIN: true})
        return dataResponse
      })
      .then(response => {
        fetch(`http://localhost:5000/api/info/${response.description}`)
        .catch(e => console.log(e))
        .then(data => data.json())
        .then(resTACO => {
          let atributosTraduzidos = traduzir(resTACO);
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
              return resTACO[i].attributes = traduzir(item);
            }) 
            this.setState({buscouRecomendados: true})
            return resTACO;
          })
          .then(data => this.setState({recomendados: data}))
          .catch(err => console.log(err))
        })
        .catch(err => {
          this.setState({ buscouGTIN: true})
          console.log('Erro fetch TACO - PRODUTO N??O ENCONTRADO', err)
        })
        })
    } catch (err) {
      console.log(err)
    }
  }

  onDetected(result) {
    this.setState({camera: false});
    if(this.state.gtin !== result){
      this.setState({gtin: result}, () => {
        this.handleClick();
      })
    }
  }
  handleEscanearClick(){
    this.setState(prevState => {
      return {
        ...prevState,
        camera: !prevState.camera,
        gtin: '',
        data: {
          image: '',
          description: '',
        },
      recomendados: [],
      buscouGTIN: false,
      buscouRecomendados: false,
      }
    })
  }

  render(){
    return (
      <div className="App">
        <div className="comorbidades">
          <h3>Selecione sua Comorbidade:</h3>
          <Checkbox
            label="Diabetes"
            value={this.state.checkedOne}
            onChange={this.handleChangeOne}
          />
          <Checkbox
            label="Hipertens??o"
            value={this.state.checkedTwo}
            onChange={this.handleChangeTwo}
          />
        </div>
      
        <div className="codigoBarras">
          <div className="Digitar">
            <label htmlFor="gtin">Digite o N??mero do C??digo de Barras: 
              <input type="text" value={this.state.gtin} id="gtin" onChange={this.handleNumberChange} />
            </label>
          </div>
          <button onClick={this.handleClick} disabled={!(this.state.checkedOne || this.state.checkedTwo)}>Buscar</button>
          <div className="Scanner">
            <button onClick={this.handleEscanearClick} disabled={!(this.state.checkedOne || this.state.checkedTwo)}>
              {this.state.camera ? "Parar" : "Escanear"}
            </button>
            <div className="container" style={{display: this.state.camera ? 'block' : 'none' }}>
              {this.state.camera && <Scanner onDetected={this.onDetected} />}
            </div>
          </div>
        </div>

        {this.state.buscouGTIN && 
          <div className='Produto'>
            <ShowInfo description={this.state.data.description} image={this.state.data.image} />
            <ShowNutritionalInfo nutritionalInfo={this.state.data.nutritionalInfo} />
          </div>
        }
        { 
           this.state.buscouRecomendados && <ShowRecomendados recomendados={this.state.recomendados} />
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

const ShowInfo = ({description, image}) => {
  if(description){
    return <Info description={description} image={image} />
  } else {
    return <p className='erro'>Produto n??o encontrado na tabela TACO.</p>
  }
}

const ShowNutritionalInfo = ({nutritionalInfo}) => {
  if(nutritionalInfo){
    return <NutritionalInfo nutritionalInfo={nutritionalInfo} />
  } else {
    return <p className='erro'>Produto n??o encontrado na tabela TACO.</p>
  }
}
const ShowRecomendados = ({recomendados}) => {
  if(recomendados?.length>0){
    return <Recomendados recomendados={recomendados}/>
  } else {
    return <p className='erro'>Nenhum produto encontrado para recomenda????o.</p>
  }
}