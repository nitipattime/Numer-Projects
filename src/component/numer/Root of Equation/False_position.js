import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd';
// import '../../screen.css';
import 'antd/dist/antd.css';
import axios from 'axios';
import { error, func } from '../services/Services';
// import Graph from '../../components/Graph';

const InputStyle = {
    background: "#1890ff",
    color: "white",
    fontWeight: "bold",
    fontSize: "24px"

};
var dataInTable = []
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "XL",
        dataIndex: "xl",
        key: "xl"
    },
    {
        title: "XR",
        dataIndex: "xr",
        key: "xr"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];

class FalsePosition extends Component {

    constructor() {
        super();
        this.state = {
            fx: "",
            xl: 0,
            xr: 0,
            showOutputCard: false,
            showGraph: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.false_position = this.false_position.bind(this);
    }

    false_position(xl, xr) {
        var increaseFunction = false;
        var xi = 0;
        var epsilon = parseFloat(0.000000);
        var n = 0;
        var data = []
        data['xl'] = []
        data['xr'] = []
        data['x'] = []
        data['error'] = []
        if (func(this.state.fx, xl) < func(this.state.fx, xr)) {
            increaseFunction = true;
        }
        do {
            xi = (xl * func(this.state.fx, xr) - xr * func(this.state.fx, xl)) / (func(this.state.fx, xr) - func(this.state.fx, xl));
            if (func(this.state.fx, xi) * func(this.state.fx, xr) < 0) {
                epsilon = error(xi, xr);
                if (increaseFunction) {
                    xl = xi;
                }
                else {
                    xr = xi;
                }

            }
            else {
                epsilon = error(xi, xl);
                if (increaseFunction) {
                    xr = xi;
                }
                else {
                    xl = xi;
                }

            }
            data['xl'][n] = xl;
            data['xr'][n] = xr;
            data['x'][n] = xi.toFixed(8);
            data['error'][n] = Math.abs(epsilon).toFixed(8);
            n++;

        } while (Math.abs(epsilon) > 0.000001);

        this.createTable(data['xl'], data['xr'], data['x'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })


    }

    createTable(xl, xr, x, error) {
        dataInTable = []
        for (var i = 0; i < xl.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                xl: xl[i],
                xr: xr[i],
                x: x[i],
                error: error[i]
            });
        }

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    dataapi = async()=>{
        var response = await axios.get('http://localhost:5000/false-position').then(res => {return res.data});
        console.log(response)
        this.setState({
            fx:response['fx'],
            xl:response['xl'],
            xr:response['xr']
        })
        
        this.false_position(this.state.xl,this.state.xr);
        
    }
    render() {
        let { fx, xl, xr } = this.state;
        return (
            <div style={{ background: "#FFFF", padding: "30px" }}>
                {/* <h2 style={{ color: "black", fontWeight: "bold" }}>False Position</h2> */}
                <h1 style = {{textAlign: 'center',fontSize:'30px'}}>False Position </h1>
                {/* <div className="row">
                    <div className="col">
                        <Card
                            bordered={true}
                            style={{ background: "gray", borderRadius:"15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                        >
                            <h2>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                            <h2>X<sub>L</sub></h2><Input size="large" name="xl" style={InputStyle}></Input>
                            <h2>X<sub>R</sub></h2><Input size="large" name="xr" style={InputStyle}></Input><br /><br />
                            <Button id="submit_button" onClick={
                                () => this.false_position(parseFloat(xl), parseFloat(xr))
                            }
                                style={{ background: "#4caf50", color: "white" }}>Submit</Button>

                        </Card>
                    </div>
                    <div className="col">
                        {this.state.showGraph && <Graph fx={fx} title="False Position" />}
                    </div>
                </div> */}

                <form style = {{textAlign: 'center',fontSize:'21px'}}
                  
                  >
                    <h4>Equation  : &nbsp;&nbsp;               
                      <Input size="large" placeholder="Input your Function" name ="fx" style={{ width: 300 }}
                      onChange={this.handleChange}
                      />
                    </h4>
                    <br></br>
                    <h4>XL : &nbsp;&nbsp;
                      <Input size="large" placeholder="Input your Xl" name ="xl" style={{ width: 200 }}
                      onChange={this.handleChange}
                      />
                    </h4>
                    <br></br>
                    <h4>XR : &nbsp;&nbsp;
                      <Input size="large" placeholder="Input your Xr" name = "xr"style={{ width: 200 }}
                      onChange={this.handleChange}
                      />
                    </h4>
                    <br></br>
                    
                    <Button type="submit"   size="large"
                    style={{ color:'#ffffff',background:'#008080'}}
                    onClick={() => this.false_position(parseFloat(xl), parseFloat(xr))}
                    >
                      Submit
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button type="submit"   size="large"
                    style={{ color:'#ffffff',background:'#f7c602'}}
                    onClick={() => this.dataapi()}
                    >
                      Function
                    </Button>
                  </form>
                  <br></br>
                <div className="row">
                    {this.state.showOutputCard &&
                        // <Card
                        //     title={"Output"}
                        //     bordered={true}
                        //     style={{ width: "100%", background: "#2196f3", color: "#FFFFFFFF" }}
                        //     id="outputCard"
                        // >
                            <Table columns={columns} bordered={true} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}
                            ></Table>
                        // </Card>
                    }
                </div>
            </div>
        );
    }
}
export default FalsePosition;