import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Link, Redirect } from 'react-router-dom'
import axios from "axios";



class register extends Component {


    // Constructor for form data

    constructor(props) {
        super(props);
        this.state = {
            form: {
                southWestLongitude:0,
                southWestLatitude:0,
                northEastLongitude:0,
                northEastLatitude:0,
                terms:[]
            },
            formErrorMsg: {
                Name: '',
                email: '',
                contact: '',
                password: '',
                cnf_password: ''
            },
            formValid: {
                Name: false,
                email: false,
                contact: false,
                password: false,
                cnf_password: false,
                buttonActive: false
            },
            finalData:{
                southWestLongitude:'',
                southWestLatitude:'',
                northEastLongitude:'',
                northEastLatitude:'',
                terms:[]


            },
            successMsg: '',
            errorMsg: '',
            terms:[],
            redirecthome:false
        }
    }

    //submit handler

    handleSubmit = async(event) => {
        event.preventDefault();
        let dummy=this.state.form

        console.log(event.target[0].value)
        if(event.target[0].value==='india')
        {
            dummy.northEastLongitude=80.764801
            dummy.northEastLatitude=15.912900
            dummy.southWestLongitude=13.678342
            dummy.southWestLatitude=15.895431
            dummy.terms=[...this.state.terms]
            

       
        }
        else if(event.target[0].value==='australia')
        {
            dummy.northEastLongitude=10.764801
            dummy.northEastLatitude=20.912900
            dummy.southWestLongitude=30.678342
            dummy.southWestLatitude=15.895431
            dummy.terms=[...this.state.terms]
            

       
        }
        this.setState({form:{...dummy}})
        this.setState({redirecthome:true})

        await axios.post('http://www.localhost:8080/start',dummy)


    }

    // on change handler
    handleChange = (event) => {
        let { name, value } = event.target;
        let formDum = this.state.form;
        formDum[name] = value;
        this.setState({ form: formDum });
        this.validateField(name, value);

    }

    // field validation

    validateField = (fieldName, val) => {
        //let pass = this.state.form.password;
        let formErrorMsgDum = this.state.formErrorMsg;
        let formValidDum = this.state.formValid;

        let errmsg = "";
        const reg = /^[a-zA-Z0-9._-]+@+[a-zA-z]+.com$/;
        if (fieldName === 'Name') {
            if (val === '') {
                errmsg = 'Name required'
            }
            formErrorMsgDum.Name = errmsg;
            formValidDum.Name = errmsg ? false : true;
        }
        else if (fieldName === 'email') {
            if (val === '') {
                errmsg = 'Field Required'
            } else if (!reg.test(val)) {
                errmsg = 'Invalid Email ID'
            }
            formErrorMsgDum.email = errmsg;
            formValidDum.email = errmsg ? false : true;

        } else if (fieldName === 'contact') {
            //this.setState({})
            if (val === '') {
                errmsg = 'Contact Required'
            } else if (val.toString().length < 10 || val.toString().length > 10) {
                errmsg = 'Inavlid Contact'
            }
            formErrorMsgDum.contact = errmsg;
            formValidDum.contact = errmsg ? false : true;

        } else if (fieldName === 'password') {
            if (val === '') {
                errmsg = 'Password required'
            } else if (val.toString().length < 8) {
                errmsg = 'Password too weak (min 8 charcter)';
            }
            formErrorMsgDum.password = errmsg;
            formValidDum.password = errmsg ? false : true;

        } else if (fieldName === 'cnf_password') {
            if (this.state.form.password === '') {
                errmsg = 'Please Enter password field first'
            } else if (val === '') {
                errmsg = 'Please Enter confirm password'
            } else if (val !== this.state.form.password) {
                errmsg = 'Comfirm password doesnt match'
            }
            formErrorMsgDum.cnf_password = errmsg;
            formValidDum.cnf_password = errmsg ? false : true;
        }

        formValidDum.buttonActive = formValidDum.Name && formValidDum.email && formValidDum.contact && formValidDum.password && formValidDum.cnf_password;
        this.setState({ formErrorMsg: formErrorMsgDum, formValid: formValidDum })

    }
    remove=(event,index)=>{
        event.preventDefault()
        let dummyarray=this.state.terms
        dummyarray.splice(index,1)
        this.setState({terms:[...dummyarray]})
        // console.log(dummyarray)
        // console.log(dummyarray)


    }
    add=(event)=>{
        event.preventDefault();
        let dummyarray=this.state.terms
        dummyarray.push(event.target.form[0].value)
        this.setState({terms:[...dummyarray]})



    }
 
    words=(data,index)=>{

        return(<span key={index} style={{}}>{data} <button className='btn' onClick={(e)=>{this.remove(e,index)}}><i className="fa fa-times" aria-hidden="true"></i></button></span>)

    }




    // redering item

    render() {
        console.log(this.state.redirecthome)
        
        if(this.state.redirecthome)
        {
            return <Redirect to='/dank'/>
        }
        return (
            <div className="container bg-image" style={{ margin: '0px', padding: '0px', backgroundImage: 'url("/Images/bg-img.jpg")', maxWidth: '100%', height: '1920px' }}>
                <div className="row">
                    <div className="col-md-4 col-sm-2"></div>
                    <div className="col-md-4 card bg-light col-sm-8" style={{ marginTop: '2rem', marginBottom: '1rem' }}>
                        <form onSubmit={(e)=>this.handleSubmit(e)}>

                            <div className="h3 text-center py-3 card-header">TwitIT</div>

                            <div classsName="form-group" style={{ marginTop: '1rem' }} >
                                <div className="row">
                                <label htmlFor="countries" className="col-sm-3" name="email" style={{ fontSize: '18px', color: "#696969", fontWeight: "bolder" }}>Country</label>
                                    <div className="col-sm-9">
                                    <select name="countries" id="countries" className='form-control'>
                                        <option value="india">India</option>
                                        <option value="australia">Australia</option>
                                        <option value="china">China</option>
                                        <option value="japan">Japan</option>

                                    </select>
                                    </div>

                                </div>
                            </div>
                            <br />

                            <div classsName="form-group">
                                <div className="row">
                                    <label htmlFor="" className="col-sm-3" name="email" style={{ fontSize: '18px', color: "#696969", fontWeight: "bolder" }}>Words</label>

                                    <div className="col-sm-9">
                                        <form>
                                            <input className='form-control' name='words' />
                                            <button className='btn' type='submit' onClick={(e)=>this.add(e)}></button>


                                        </form>
                                        {this.state.terms.map((data,index)=>this.words(data,index))}

                                        
                                    </div>
                                </div>
                            </div>
                            <br />




                            

                            <div >
                                <button className="btn btn-success form-control mt-3 mb-3"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                            </div>

                        </form>
                    </div>
                    <div className="col-md-4 col-sm-2"></div>
                </div>
            </div>
        )
    }
}

export default register