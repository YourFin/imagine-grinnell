import React from 'react'
import { Card, Header, Segment, Button, Icon, Dimmer, Loader, Divider, Label } from 'semantic-ui-react'

class GardenCard extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        selectedGardenId: 0,
        gardenArray: [],
        gardenProduceArray: [],
        produceArray: []
    };
    
    
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

  
  returnGardenImage() {
      const gardenArray = this.props.gardenArray;
      var selectedGardenId = this.props.selectedGardenId;
      var garden = gardenArray.find(obj => {
        return obj.id == selectedGardenId;
      })
      if (garden != null) {
        return <img src={garden.image} />;
      } else {
          return <div class="ui fluid placeholder"> <div class="image"></div> </div>;
    }
  }
  
  returnGardenName() {
      const gardenArray = this.props.gardenArray;
      var selectedGardenId = this.props.selectedGardenId;
      var garden = gardenArray.find(obj => {
        return obj.id == selectedGardenId;
      })
      if (garden != null) {
        return garden.name;
      } else {
          return <div class="ui fluid placeholder"> <div class="line"></div> </div>;
    }
  }
  
  returnGardenAddress() {
      const gardenArray = this.props.gardenArray;
      var selectedGardenId = this.props.selectedGardenId;
      var garden = gardenArray.find(obj => {
        return obj.id == selectedGardenId;
      })
      if (garden != null) {
        return garden.address;
      } else {
          return <div class="ui fluid placeholder"> <div class="line"></div> </div>;
    }
  }
  
  returnGardenItems() {
    
    const gardenProduceArray = this.props.gardenProduceArray;
    var selectedGardenId = this.props.selectedGardenId;
    var filteredGardenProduceArray = gardenProduceArray.filter(obj => {
        return obj.garden_id == selectedGardenId;
    })
    
    filteredGardenProduceArray.sort(function(a, b){
      if(a.available_at < b.available_at) { return -1; }
      if(a.available_at > b.available_at) { return 1; }
      return 0;
    })
    
    console.log(filteredGardenProduceArray);
    
    if(filteredGardenProduceArray.length == 0 && selectedGardenId!=null) {
      return <div class="ui relaxed list"> <div class="item"> <a class="ui small grey image label"> <img src=""/> Sorry <div class="detail">No Produce available</div> </a> </div> </div>
    } else {
    
    return <div class="ui relaxed list"> 
      {filteredGardenProduceArray.map(obj => {
        const gardenProduce = obj;
        const date = gardenProduce.available_at;
        const produce = this.getProduceForId(gardenProduce.produce_id);
        
        if(gardenProduce.readiness == 2) {
          return <div class="item"> <a class="ui small green image label"> <img src={produce.image}/> {produce.name}s <div class="detail">Available</div> </a> </div>
        } 
        else if(gardenProduce.readiness == 1) {
          return <div class="item"> <a class="ui small yellow image label"> <img src={produce.image}/> {produce.name}s <div class="detail">Ready {date.substring(5,7)}/{date.substring(8,10)}/{date.substring(2,4)}</div> </a> </div>
        } 
        else {
          return <div class="item"> <a class="ui small orange image label"> <img src={produce.image}/> {produce.name}s <div class="detail">Ready {date.substring(5,7)}/{date.substring(8,10)}/{date.substring(2,4)}</div> </a> </div>
        }
      })}
    </div>
    
    }
  }
  
  getProduceForId(produceId) {
      const produceArray = this.props.produceArray;
      var produce = produceArray.find(obj => {
        return obj.id == produceId;
      })
      if (produce != null) {
        return produce
      } else {
          //error message.
    }
  }
  
  
  

  render() {
    console.log(this.props.gardenProduceArray);
    const { selectedGardenId, gardenArray, gardenProduceArray, produceArray } = this.props;
    //this.returnGardenItems();
    return (
      <div>
        <h2 class="ui dividing header">What's Available</h2>
        <div class="ui hidden divider"></div>
        <div class="ui hidden divider"></div>
        <div class="ui fluid card cardComp">
        
          <div class="image"> {this.returnGardenImage()} </div>
          <div class="content">
            <a class="header">{this.returnGardenName()}</a>
            <div class="meta">
              <span class="date">{this.returnGardenAddress()}</span>
            </div>
          </div>
          <div class="extra content">
            {this.returnGardenItems()}
          </div>
        </div>
      </div>
    );
  }
}

export default GardenCard;
