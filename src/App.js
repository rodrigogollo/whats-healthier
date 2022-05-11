import React, {Component} from 'react';
import './App.css';
import Quagga from '@ericblade/quagga2'; // ES6
import Info from './Info';
import NutritionalInfo from './NutritionalInfo';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      file: [],
      gtin: 7891991000826,
      comorbidade: 'diabetes',
      data: {
        image: '',
        description: '',
      }
    }
    const Quagga = require('@ericblade/quagga2').default; 
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  // React.useEffect(() => {
  //  fetch("https://api.cosmos.bluesoft.com.br/gtins/7891991000826")
  //  .then((res) => res.json())
  //  .then((data) => console.log(data.message));
  // }, []);


  //REFRIGERANTE GUARANÁ = 7891991000826
  //PAÇOCA - 7896181711971 - deu ruim
  //PRINGLES - 7896004006482 - deu ruim
  //REPOLHO - 7898108111369
  //MELADO - 7898916045016
  //LEITE CONDENSADO - 7896590817035
  //BISCOITO TRAQUINAS - 7622210592750

  handleFileChange(e){
    this.setState({file: e.target.files[0]})

    Quagga.decodeSingle({
      decoder: {
        readers : ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader",
        "2of5_reader", "code_93_reader", "code_32_reader"]
      },
      locate: true, // try to locate the barcode in the image
      src: e.target.value // or 'data:image/jpg;base64,' + data
  }, function(result){
      if(result.codeResult) {
          console.log("result", result.codeResult.code);
      } else {
          console.log("not detected");
      }
  });
  }

  handleNumberChange(e){
    this.setState({gtin:e.target.value})
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
        console.log('respo', response)
        fetch(`http://localhost:5000/api/info/${response.description}`)
        .then(data => data.json())
        .then(resTACO => {
          console.log('resTACO', resTACO)
          this.setState(prevState => {
            let data = Object.assign({}, prevState.data)
            data.nutritionalInfo = resTACO
            return {data}
          })
          return resTACO
        })
        .then(responseTACO => {
          fetch(`http://localhost:5000/api/recomendar/${responseTACO.description}/${this.state.comorbidade}`)
          .then(response => response.json())
          .then(data => this.setState({recomendados: data}))
          .catch(err => console.log(err))
        })
        .catch(err => console.log('Erro fetch TACO - PRODUTO NÃO ENCONTRADO', err))
      })
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount(){
    Quagga.init({
      inputStream : {
        name : "Live",
        type : "LiveStream",
        target: this.state.file   // Or '#yourElement' (optional)
      },
      decoder : {
        readers : ["code_128_reader"]
      }
    }, function(err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });
    Quagga.onDetected((data)=> {
      console.log("detectado")
      console.log(data);
    })
  }

  render(){
    return (
      <div className="App">
        <label htmlFor='imageFile'>Selecione um código de barras</label>
        <br />
        <input type="file" id="imageFile" capture="user" accept="image/*" onChange={this.handleFileChange} />
        <br />
        <label htmlFor="gtin">Digite o Número do Código de Barras:</label>
        <br />
        <input type="text" value={this.state.gtin} id="gtin" onChange={this.handleNumberChange} />
        <button onClick={this.handleClick}>Submit</button>
        {
          this.state.data ? <Info description={this.state.data.description} image={this.state.data.image} /> : <p></p>
        }
        {
          this.state.data.nutritionalInfo? <NutritionalInfo nutritionalInfo={this.state.data.nutritionalInfo} /> : <p>Informações não encontradas</p>
        }
      </div>
    );
  }
}

export default App;
