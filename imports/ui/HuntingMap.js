import React, { Component } from 'react'
import {Map, Marker, Polygon, GoogleApiWrapper} from 'google-maps-react'

export class HuntingMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      clueTry: {}
    }
  }

  onMarkerClick (props, marker) {
    let coordinates = {
      lat: marker.position.lat(),
      lng: marker.position.lng()
    }
    this.props.selectClue(coordinates)
  }

  renderHints () {
    return this.props.hunting.clues.map((clue, i) => {
      if (clue.hint) {
        return (
          <Polygon
            key={i}
            paths={clue.hints}
            strokeColor='#0000FF'
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor='#0000FF'
            fillOpacity={0.35}
          />
        )
      }
    })
  }

  renderClues () {
    return this.props.hunting.clues.map((clue, i) => {
      if (clue.done) {
        return (
          <Marker
            key={i}
            position={{lat: clue.lat, lng: clue.lng}}
            name={'Clue ' + i}
          />
        )
      }
    })
  }

  render () {
    return (
      <Map
        google={this.props.google} zoom={2}
        style={{width: '50em', height: '25em', position: 'relative'}}
        initialCenter={{
          lat: 4.8047737,
          lng: -75.7487812
        }}
      >
        {this.props.clue &&
          <Marker
            position={{lat: this.props.clue.lat, lng: this.props.clue.lng}}
            name={'Selected'}
          />
        }
        {this.renderClues()}
        {this.renderHints()}
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAGdNkCR-fFFr5A_NfR74M5DZ1ne7QL_UA'
})(HuntingMap)
