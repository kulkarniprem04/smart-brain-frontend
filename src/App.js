import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Imagelinkform from './components/ImageLinkForm/Imagelinkform';
import Rank from './components/Rank/Rank';
import Image from './components/Image/Image';

import './App.css';

const particleOptions = {
    particles: {
      number : {
        value: 100,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
}



 const initialstate = {
  input: '',
    imageURL: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
 }

class App extends Component {

  constructor() {
    super();
    this.state = initialstate;
  }

  loaduser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  claculateFaceLocation = (data) => {
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
    leftcol: clarifaiFace.left_col * width,
    toprow: clarifaiFace.top_row * height,
    rightcol: width - (clarifaiFace.right_col * width),
    bottomrow: height - (clarifaiFace.bottom_row * height)  
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  OnInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  OnButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    fetch(`https://dry-reef-22080.herokuapp.com/imageUrl`, {
      method: 'post',
      headers: {
          'Content-type': 'application/json',
      },
      body: JSON.stringify({
          input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
          if(response) {
            fetch(`https://dry-reef-22080.herokuapp.com/image`, {
              method: 'put',
              headers: {
                  'Content-type': 'application/json',
              },
              body: JSON.stringify({
                  id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, { entries: count}));
              })
              .catch(error => response.json('error loading entries'))
          }
          this.displayFaceBox(this.claculateFaceLocation(response))
        })
        .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialstate)
    }
    else if (route === 'home') {
      this.setState({isSignedIn: true })
    }
    this.setState({route: route })
  }


  render() {
    const {isSignedIn, route, box, imageURL} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
                params={ particleOptions }
              />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
        ? <div>
        <Logo/>
        <Rank name={this.state.user.name} entries={this.state.user.entries} />
        <Imagelinkform OnInputChange={this.OnInputChange} OnButtonSubmit={this.OnButtonSubmit} />
        <Image box={box} imageURL={imageURL} />
        </div> 
        :( route === 'signin'
          ? <Signin loaduser={this.loaduser} onRouteChange={this.onRouteChange} />
          : <Register loaduser={this.loaduser} onRouteChange={this.onRouteChange} />
        )
    
        }
      </div>
    );
  }
};

export default App;
