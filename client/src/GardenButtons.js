import React from 'react'
import { Card, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'

class GardenButtons extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  
  handleGardenClick(newGardenId) {
    this.props.callbackFromParent(newGardenId);
  }
  

  render() {
    const { selectedGardenId, gardenArray } = this.props;
    
    gardenArray.sort(function(a, b){
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    });
    
    const self = this;
    return (
      <div>
        <h2 class="ui dividing header">Gardens</h2>
          {gardenArray.map(garden => {
            
            var styleClass = "ui toggle fluid button";
            if(selectedGardenId == garden.id) {
              styleClass = "ui green toggle fluid button"
            }
            
            var buttonComp = React.createElement('button', {class: styleClass, 
              onMouseOver: function (){ self.handleGardenClick(garden.id)}}, garden.name);
            
            const dividerComp = React.createElement('div', {class: 'ui hidden divider'}, null);
            
            return [dividerComp, buttonComp];
            
          })}
      </div>
    );
  }
  
}

export default GardenButtons;
