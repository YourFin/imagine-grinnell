import React from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoiaHVuYWluYWxpIiwiYSI6ImNqYXVsZXE1YjAwNG8zM3BjMW5sNDZxcXEifQ.VR6zCCdNeYORRc1XIBjt1Q';

class GardenMap extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      gardenArray: [],
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

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      // this.setState({
      //   lng: lng.toFixed(4),
      //   lat: lat.toFixed(4),
      //   zoom: map.getZoom().toFixed(2)
      // });
    });
    
    this.state.map = map;
  }
  
  
  populateGardens() {
    const { gardenArray } = this.props;
    let self = this;
    for(var i=0; i<gardenArray.length; i++) {
      let garden = gardenArray[i];
      self.createMarker(garden.id, garden.lat, garden.long);
    }
  }
  
  createMarker(id, latitude, longitude) {
    let self = this;
    var el = document.createElement('div');
    el.className = 'marker';
    el.id = id;
    el.style.cursor = "pointer";
    el.style.height = '22px';
    el.style.width = '22px';
    el.style.backgroundColor = '#00FF00';
    el.style.border = '3px solid black';
    
    el.addEventListener('click', function(){
      //alert(self.props.gardenArray[this.id].name)
      //self.flyTowards(latitude, longitude);
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
    if (this.props.selectedGardenId != null) {
      const lat = this.props.gardenArray[this.props.selectedGardenId-1].lat;
      const lng = this.props.gardenArray[this.props.selectedGardenId-1].long;
      this.flyTowards(lat, lng);
    }
    this.populateGardens();
    return (
      <div>
        <div ref={el => this.mapContainer = el} className='mapComp'> </div>
      </div>
    );
  }
}

export default GardenMap;
