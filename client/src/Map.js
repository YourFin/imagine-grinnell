import React from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoiaHVuYWluYWxpIiwiYSI6ImNqYXVsZXE1YjAwNG8zM3BjMW5sNDZxcXEifQ.VR6zCCdNeYORRc1XIBjt1Q';

class Map extends React.Component {
  
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
    
    this.populateGardens();
  }
  
  
  populateGardens() {
    const { gardenArray } = this.props;
    let self = this;
    for(var i=0; i<gardenArray.length; i++) {
      let garden = gardenArray[i];
      self.createMarker(i, garden.lat, garden.long);
    }
  }
  
  createMarker(id, latitude, longitude) {
    let self = this;
    var el = document.createElement('div');
    el.className = 'marker';
    el.id = id;
    el.style.cursor = "pointer";
    el.style.height = '20px';
    el.style.width = '20px';
    el.style.backgroundColor = '#76FF03';
    el.style.border = '2px solid black';
    console.log(el.id);
    
    el.addEventListener('click', function(){
      alert(self.props.gardenArray[this.id].name)
    });
  
  
    var marker = new mapboxgl.Marker(el)
    .setLngLat([longitude, latitude])
    .addTo(this.state.map);
   }
  
  
  

  render() {
    const { lng, lat, zoom } = this.state;
    this.populateGardens();
    console.log("Map Render");
    return (
      <div>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
      </div>
    );
  }
}

export default Map;
