import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value })
    }
    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }
    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }
    onSubmitRegister = () => {
        fetch('https://smartbrain-iy-api.herokuapp.com/register', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                };
            })
            .catch(err => console.log(err));


    }
    render() {
        const { onRouteChange } = this.props;
        return (
            <main className="white-80">
	        <article className="br3 ba white b--black-10 mv4 w-25 w-25-m w-25-l mw10 shadow-5 center">
	          <form className="measure pa4 w-75">
	            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
	              <legend className="f2 fw6 ph0 mh0">Register</legend>
	              <div className="mt3">
	                <label className="db fw6 lh-copy f6 tracked" htmlFor="name">Name</label>
	                <input 
	                className="pa2 input-reset ba b--white-50 bg-transparent hover-white white w-100" 
	                type="name" 
	                name="name" 
	                id="name" 
	                onChange={this.onNameChange}
	                />
	              </div>
	              <div className="mt3">
	                <label className="db fw6 lh-copy f6 tracked" htmlFor="email-address">Email</label>
	                <input 
	                className="pa2 input-reset ba b--white-50 bg-transparent hover-white white w-100" t
	                ype="email" 
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
	              <p onClick={this.onSubmitRegister} className="b ph3 pv2 input-reset white ba b--white bg-transparent grow pointer f6 dib tracked" type="submit">Register</p>
	            </div>
	            <div className="lh-copy mt3">
	              <p onClick={() => onRouteChange('signin')} className="f6 link grow white db tracked pointer">Sign In</p>
	            </div>
	          </form>
	         </article>
        </main>
        );
    }
}

export default Register;