import React from 'react';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signinEmail: '',
            signinPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ signinEmail: event.target.value })
    }
    onPasswordChange = (event) => {
        this.setState({ signinPassword: event.target.value })
    }
    onSubmitSignIn = () => {
        fetch('https://smartbrain-iy.herokuapp.com/signin', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.state.signinEmail,
                    password: this.state.signinPassword
                })
            })
            .then(response => response.json())
            .then(user => {
            	if(user.id){
            		this.props.loadUser(user);
            		this.props.onRouteChange('home');
            	}
            });
    };





    render() {
        const { onRouteChange } = this.props;
        return (
            <main className="white-80">
	        <article className="br3 ba white b--black-10 mv4 w-25 w-25-m w-25-l mw10 shadow-5 center">
	          <section className="measure pa4 w-75">
	            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
	              <legend className="f2 fw6 ph0 mh0">Sign In</legend>
	              <div className="mt3">
	                <label className="db fw6 lh-copy f6 tracked" htmlFor="email-address">Email</label>
	                <input 
	                className="pa2 input-reset ba b--white-50 bg-transparent hover-white white w-100" 
	                type="email" 
	                name="email-address"  
	                id="email-address" 
	                onChange={this.onEmailChange}
	                />
	              </div>
	              <div className="mv3">
	                <label className="db fw6 lh-copy f6 tracked" htmlFor="password">Password</label>
	                <input 
	                className="pa2 input-reset ba b--white-50 bg-transparent hover-white white w-100" 
	                type="password" 
	                name="password"  
	                id="password" 
	                onChange={this.onPasswordChange}
	                />
	              </div>
	            </fieldset>
	            <div className="">
	              <input 
	              onClick={this.onSubmitSignIn} 
	              className="b ph3 pv2 input-reset white ba b--white bg-transparent grow pointer f6 dib tracked" 
	              type="submit" 
	              value="Sign in" />
	            </div>
	            <div className="lh-copy mt3">
	              <p  onClick={() => onRouteChange('register')} className="f6 link grow white db tracked pointer">Register</p>
	            </div>
	          </section>
	         </article>
        </main>
        );
    }
}

export default Signin;