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
              <Header image='https://scontent.xx.fbcdn.net/v/t1.0-1/c0.1.50.50a/p50x50/72250_10151735220225342_873865100_n.jpg?_nc_cat=110&_nc_ht=scontent.xx&oh=c50771d79e9ebe7e4f939631984cd34a&oe=5D6F0FAE' content='About Imagine Grinnell' />
              <Modal.Content>
                <p>In 2019, Imagine Grinnell will celebrate its 35th year of helping to make Grinnell a healthier and more sustainable community. Thanks to friends and supporters like you, IG has worked hard to increased access to healthy locally-grown food and outdoor activities, reduce our town’s environmental footprint through solar and energy efficiency programs, increase recycling and water-quality improvement projects, to name just a few!
                </p><p>In 2018, our staff and volunteers completed a three-year fundraising campaign for the new skatepark, hosted educational events and expanded our Giving Gardens. We worked with Ahrens Park to make their facilities more environmentally-friendly. We also held the area’s first gravel-riding bike tour, raising awareness of our bicycle-friendly community and attracting cyclists from across the region.
                </p><p>This year, we will be launching new initiatives, including an annual gravel-biking festival, new solar and recycling projects,healthy food and outdoor activity programs, and much more.
                </p><p>If your budget allows, we hope that you will consider making a tax deductible gift to Imagine Grinnell’s operational fund to help us continue to do the special projects that add to our town’s resilliency, vibrancy and unique character. You can send a check to: Imagine Grinnell, PO Box 538, Grinnell, Iowa, 50112. Or <a href="https://imaginegrinnell.org/donate/" target="_blank">donate online</a>!
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