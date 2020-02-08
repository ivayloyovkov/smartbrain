import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const particleSettings = {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "speed": 4,
                "size_min": 0.3
            }
        },
        "line_linked": {
            "enable": false
        },
        "move": {
            "random": true,
            "speed": 0.3,
            "direction": "top",
            "out_mode": "out"
        }
    },
    "interactivity": {
        "events": {
            "onhover": {
                "enable": true,
                "mode": "bubble"
            },
            "onclick": {
                "enable": true,
                "mode": "repulse"
            }
        },
        "modes": {
            "bubble": {
                "distance": 250,
                "duration": 2,
                "size": 0,
                "opacity": 0
            },
            "repulse": {
                "distance": 400,
                "duration": 4
            }
        }
    }
};

const initialState = {
    input: '',
    imageUrl: '',
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
        this.state = initialState;
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById("inputimage");
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            botRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        this.setState({ box: box })
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    }
    onPictureSubmit = () => {
        this.setState({ imageUrl: this.state.input });
        fetch('https://smartbrain-iy.herokuapp.com/imageurl', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    input: this.state.input
                })
            })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    fetch('https://smartbrain-iy.herokuapp.com/image', {
                            method: 'put',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                id: this.state.user.id
                            })
                        })
                        .then(response => response.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, { entries: count }))
                        })
                        .catch(err => console.log(err));

                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err));
    }

    onRouteChange = (route) => {
        if (route === 'signedout') {
            this.setState(initialState)
        } else if (route === 'home') {
            this.setState({ isSignedIn: true })
        };;
        this.setState({ route: route })
    }

    render() {
        const { isSignedIn, imageUrl, route, box } = this.state;
        return (
            <main className="App">
            <Particles params={particleSettings} className='particles' />
                <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange} />
                { route === 'home'
                ? <div>
                  <Logo /> 
                  <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                  <ImageLinkForm onInputChange = {this.onInputChange} onPictureSubmit = {this.onPictureSubmit} />
                  <FaceRecognition imageUrl = {imageUrl} box = {box} /> </div>
                : (
                    route === 'signin'
                    ?<Signin onRouteChange = {this.onRouteChange} loadUser = {this.loadUser} />
                    :<Register onRouteChange = {this.onRouteChange}  loadUser = {this.loadUser} />

                  )
                }
              </main>
        );
    }
}

export default App;