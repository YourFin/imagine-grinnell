import React from 'react';
import GardenMap from './GardenMap';
import GardenButtons from './GardenButtons';
import GardenCard from './GardenCard';
import { Card, Header, Segment, Button, Icon, Dimmer, Loader, Divider, Modal } from 'semantic-ui-react'

class Home extends React.Component {
    
    
  constructor(props) {
    super(props);
      this.state = {
        selectedGardenId: null,
        gardenArray:[],
        produceArray:[],
        gardenProduceArray:[]
      };
  }
  
  componentDidMount() {
    let self = this;
    fetch('https://igv5-realhunion.c9users.io:8081/gardens')
      .then(response => response.json())
      .then(function(data) {
        self.setState({ gardenArray: data })
      });
      
    fetch('https://igv5-realhunion.c9users.io:8081/produces')
      .then(response => response.json())
      .then(function(data) {
        self.setState({ produceArray: data });
      });
      
    fetch('https://igv5-realhunion.c9users.io:8081/garden_produces')
      .then(response => response.json())
      .then(function(data) {
        self.setState({ gardenProduceArray: data });
      });
      
      
      console.log(this.props.gardenProduceArray);
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



    selectedGardenChanged = (newGardenId) => {
        this.setState({ selectedGardenId: newGardenId });
    }
  
  
    render() {
    let self = this;
    return (
      <div> 
      
        <div className='navContainer'>
          <div class="ui fluid horizontal menu">
            <div class="item">
              <h3 class="ui header">Imagine Gardens</h3>
            </div>
            <a class="item active">Home</a>
            <Modal size='small' trigger={<a class='item'>About</a>} closeIcon>
              <Header icon='info circle' content='About Imagine Grinnell' />
              <Modal.Content>
                <p>Imagine Grinnell turns imagination into action to create a more vibrant, sustainable, and healthy Grinnell. Our roots deepen relationships and enrich the community we serve.
                </p><p>Imagine Grinnell has worked as a valued member of the Grinnellian community since its founding in 1983. Brought forth during the midst of the Farm Crisis, their initial goal was to provide sustainable infrastructure to the city of Grinnell, as well as resources for its low-income community. Previous projects have included working with the city to institute its first recycling program and increase the quality of its water supply, enabling outdoor activities such as the recent renovation of the skate park, and the establishment and maintenance of its Giving Gardens program.
                </p><p>The Giving Gardens is a collective program composed of community partners across the city of Grinnell, including several churches among other civically-minded individuals. The basic premise is that each garden is supervised and administered by a partner of Imagine Grinnell, who then works with their individual constituencies to plant, foster, and ultimately provide no-cost, fresh produce the community in need.
                </p>
              </Modal.Content>
            </Modal>
          </div>
        </div>
        
        <div className='mainContainer'> 
        
          <div className='mapContainer'>
            <GardenMap selectedGardenId={self.state.selectedGardenId} gardenArray={self.state.gardenArray} callbackFromParent={this.selectedGardenChanged} />
          </div>
          
          <div className='buttonContainer'>
            <GardenButtons selectedGardenId={self.state.selectedGardenId} gardenArray={self.state.gardenArray} callbackFromParent={this.selectedGardenChanged} />
          </div>
          
          <div className='cardContainer'>
            <GardenCard selectedGardenId={self.state.selectedGardenId} gardenArray={self.state.gardenArray} gardenProduceArray={self.state.gardenProduceArray} produceArray={self.state.produceArray} />
          </div>
  
        </div>
      </div>
    );
  }
  
}

export default Home;