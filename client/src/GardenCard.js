import React from 'react'
import { Card, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'

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
      const selectedGardenId = this.props.selectedGardenId;
      if (gardenArray[selectedGardenId-1] != null) {
        return <img src="https://www.goodnet.org/photos/620x0/29079.jpg"/>;
      } else {
          return <div class="ui fluid placeholder"> <div class="image"></div> </div>;
    }
  }
  
  returnGardenName() {
      const gardenArray = this.props.gardenArray;
      const selectedGardenId = this.props.selectedGardenId;
      if (gardenArray[selectedGardenId-1] != null) {
        return gardenArray[selectedGardenId-1].name;
      } else {
          return <div class="ui fluid placeholder"> <div class="line"></div> </div>;
    }
  }
  
   returnGardenAddress() {
      const gardenArray = this.props.gardenArray;
      const selectedGardenId = this.props.selectedGardenId;
      if (gardenArray[selectedGardenId-1] != null) {
        return gardenArray[selectedGardenId-1].address;
      } else {
          return <div class="ui fluid placeholder"> <div class="line"></div> </div>;
    }
  }
  
  returnGardenItems() {
    const gardenProduceArray = this.props.gardenProduceArray;
    const selectedGardenId = this.props.selectedGardenId;
    
    const filteredGardenProduceArray = gardenProduceArray.filter(function (i,n){
        return i.garden_id===selectedGardenId;
    });
    
    var gardenProduceCompArray = []
    
    for(var i=0; i<filteredGardenProduceArray.length; i++) {
      const gardenProduce = filteredGardenProduceArray[i];
      const produce = this.getProduceForId(gardenProduce.produce_id);
      
      if(gardenProduce.readiness == 2) {
        const MyComponent = () => {
      return <div class="item"> <a class="ui small green image label"> <img src={produce.image}/> {produce.name} <div class="detail">Available</div> </a> </div>
      }
        gardenProduceCompArray.push(this.myComponent)
      } else if(gardenProduce.readiness == 1) {
        const MyComponent = () => {
      return <div class="item"> <a class="ui small yellow image label"> <img src={produce.image}/> {produce.name} <div class="detail">Ready {produce.available_at}</div> </a> </div>
      }
        gardenProduceCompArray.push(this.myComponent)
      } else {
        const MyComponent = () => {
      return <div class="item"> <a class="ui small yellow image label"> <img src={produce.image}/> {produce.name} <div class="detail">Unavailable</div> </a> </div>
      }
        gardenProduceCompArray.push(this.myComponent)
      }
    }
    
    return <div class="ui relaxed list"> 
      {filteredGardenProduceArray.map((value, index) => {
        const gardenProduce = value;
        const produce = this.getProduceForId(gardenProduce.produce_id);
        
        if(gardenProduce.readiness == 2) {
          return <div class="item"> <a class="ui small green image label"> <img src={produce.image}/> {produce.name} <div class="detail">Available</div> </a> </div>
        } else if(gardenProduce.readiness == 1) {
          const date = gardenProduce.available_at;
          return <div class="item"> <a class="ui small yellow image label"> <img src={produce.image}/> {produce.name} <div class="detail">Ready {date.substring(5,7)}/{date.substring(8,10)}/{date.substring(2,4)}</div> </a> </div>
        } else {
          return <div class="item"> <a class="ui small yellow image label"> <img src={produce.image}/> {produce.name} <div class="detail">Unavailable</div> </a> </div>
        }
      })}
    </div>
  }
  
  
  getProduceForId(produceId) {
    const produceArray = this.props.produceArray;
    const filteredProduceArray = produceArray.filter(function (i,n){
        return i.id===produceId;
    });
    if(filteredProduceArray[0] == []) {
      //error response
    } else {
      return filteredProduceArray[0];
    }
  }
  
  
  

  render() {
    const { selectedGardenId, gardenArray, gardenProduceArray, produceArray } = this.props;
    this.returnGardenItems();
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
