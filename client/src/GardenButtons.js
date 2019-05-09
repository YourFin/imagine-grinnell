import React from 'react'
import { Card, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'

class GardenButtons extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      gardenArray: [],
      selectedGardenId: 0,
    };
    
    this.state.selectedGardenId = this.props.selectedGardenId;
  }

  componentDidMount() {
  }
  
  
//   populateGardens() {
//     const { gardenArray } = this.props;
//     let self = this;
//     for(var i=0; i<gardenArray.length; i++) {
//       let garden = gardenArray[i];
//       self.createMarker(i, garden.lat, garden.long);
//     }
//   }
  
  handleClick(newGardenId) {
    //this.setState({selectedGardenId: newGardenId});
    this.props.callbackFromParent(newGardenId);
  }
  

  render() {
    const { selectedGardenId, gardenArray } = this.props;
    const self = this;
    return (
      <div>
        <h2 class="ui dividing header">Gardens</h2>
        <div class="ui hidden divider"></div>
          {gardenArray.map((garden, index) => {
            var buttonComp = React.createElement('button', {class: "ui toggle fluid button", onClick: function (){ self.handleClick(garden.id)}}, `${garden.name}`);
            if(selectedGardenId == garden.id) {
              buttonComp = React.createElement('button', {class: "ui green toggle fluid button", onClick: function (){ self.handleClick(garden.id)}}, `${garden.name}`);
            }
            const dividerComp = React.createElement('div', {class: 'ui hidden divider'}, null);
            return [buttonComp, dividerComp];
            
          })}
      </div>
    );
  }
}

export default GardenButtons;
