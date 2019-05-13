import React from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoiaHVuYWluYWxpIiwiYSI6ImNqYXVsZXE1YjAwNG8zM3BjMW5sNDZxcXEifQ.VR6zCCdNeYORRc1XIBjt1Q';

class GardenMap extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      lng: -92.723266,
      lat: 41.743269,
      zoom: 13
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    
    var map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v9',
      center: [lng, lat],
      zoom
    });
    
    this.state.map = map;
  }
  
  componentWillReceiveProps (newProps) {
    var newGardenArray = newProps.gardenArray;
    if(this.props.gardenArray != newGardenArray) {
      this.populateGardenMarkers(newGardenArray);
    }
   }
  
  
  populateGardenMarkers(gardenArray) {
    gardenArray.map(garden => {
      this.createMarker(garden.id, garden.lat, garden.long);
    })
  }
  
  createMarker(id, latitude, longitude) {
    let self = this;
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.cursor = "pointer";
    el.style.height = '22px';
    el.style.width = '22px';
    el.style.backgroundColor = '#00FF00';
    el.style.border = '3px solid black';
    
    el.addEventListener('click', function(){
      self.flyTowards(latitude, longitude);
      self.props.callbackFromParent(id);
    });
  
    var marker = new mapboxgl.Marker(el)
    .setLngLat([longitude, latitude])
    .addTo(this.state.map);
    
   }
  
  flyTowards(lat, long) {
    if(this.state.map != null) { 
      this.state.map.flyTo({
          center: [long, lat],
          zoom: 16,
          speed: 1,
          curve: 2 
        });
      }
  }
  

  render() {
    const { selectedGardenId, gardenArray } = this.props;
    
    var selectedGarden = gardenArray.find(obj => {
      return obj.id == selectedGardenId;
    })
    if(selectedGarden!=null) {
      this.flyTowards(selectedGarden.lat, selectedGarden.long);
    }
    
    return (
      <div>
        <div ref={el => this.mapContainer = el} className='mapComp'> </div>
      </div>
    );
  }
}

export default GardenMap;

