import React from 'react';
import Map from './Map';

class Home extends React.Component {
    
    
  constructor(props) {
    super(props);
      this.state = {
        gardenArray:[]
      };
  }
  
  componentDidMount() {
    let self = this;
    fetch('https://igv5-realhunion.c9users.io:8081/gardens')
      .then(response => response.json())
      .then(function(data) {
        
        self.setState({ gardenArray: data })
        
      });
  }
  
  
  

//   handleClick(i) {
//     const squares = this.state.squares.slice();
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }
//     squares[i] = this.state.xIsNext ? 'X' : 'O';
//     this.setState({
//       squares: squares,
//       xIsNext: !this.state.xIsNext,
//     });
//   }



  render() {
    let self = this;
    return (
      <div> 
        <Map gardenArray={self.state.gardenArray} />;
      </div>
    );
  }
  
}

export default Home;