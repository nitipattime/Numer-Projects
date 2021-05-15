import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd';
import 'antd/dist/antd.css';
import { error, func, funcDiff } from '../services/Services';
import axios from 'axios';
var api;
const InputStyle = {
    background: "#1890ff",
    color: "white",
    fontWeight: "bold",
    fontSize: "24px"

};
var dataInTable;
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
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

class Newton extends Component {

    constructor() {
        super();
        this.state = {
            fx: "",
            x0: 0,
            showOutputCard: false,
            showGraph: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.newton_raphson = this.newton_raphson.bind(this);
    }

    newton_raphson(xold) {
        console.log(funcDiff(xold))
        var xnew = 0;
        var epsilon = parseFloat(0.000000);
        var n = 0;
        var data = []
        data['x'] = []
        data['error'] = []
        do {
            xnew = xold - (func(this.state.fx, xold) / funcDiff(this.state.fx,xold));
            epsilon = error(xnew, xold)
            data['x'][n] = xnew.toFixed(8);
            data['error'][n] = Math.abs(epsilon).toFixed(8);
            n++;
            xold = xnew;
        } while (Math.abs(epsilon) > 0.000001);

        this.createTable(data['x'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })


    }
    createTable(x, error) {
        dataInTable = []
        for (var i = 0; i < x.length; i++) {
            dataInTable.push({
                key:i,
                iteration: i + 1,
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
    async dataapi() {
        await axios({method: "get",url: "http://localhost:5000/database/newtonraphson",}).then((response) => {console.log("response: ", response.data);api = response.data;});
        await this.setState({
            fx:api.fx,
          x0:api.x0
          
        })
        this.newton_raphson(this.state.x0)
      }
    render() {
        let { fx, x0 } = this.state;
        return (
            <div style={{ background: "#FFFF", padding: "30px" }}>
                {/* <h2 style={{ color: "black", fontWeight: "bold" }}>Newton Raphson</h2> */}
                <h1 style = {{textAlign: 'center',fontSize:'30px'}}>Newton Raphson</h1>
                {/* <div className="row">
                    <div className="col">
                        <Card
                            bordered={true}
                            style={{ background: "gray", borderRadius:"15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                        >
                            <h2>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                            <h2>X<sub>0</sub></h2><Input size="large" name="x0" style={InputStyle}></Input>
                            <Button id="submit_button" onClick={
                                () => this.newton_raphson(parseFloat(x0))
                            }
                                style={{ background: "#4caf50", color: "white" }}>Submit</Button>

                        </Card>
                    </div>
                    <div className="col">
                        {this.state.showGraph && <Graph fx={fx} title="Newton-Raphson" />}
                    </div>
                </div> */}

                <form style = {{textAlign: 'center',fontSize:'21px'}}>
                    <h4>Equation  : &nbsp;&nbsp;               
                      <Input size="large" placeholder="Input your Function" name ="fx" value={this.state.fx}style={{ width: 300 }}
                      onChange={this.handleChange}
                      />
                    </h4>
                    <br></br>
                    <h4>X0 : &nbsp;&nbsp;
                      <Input size="large" placeholder="Input your X0" name ="x0" value={this.state.x0}style={{ width: 200 }}
                      onChange={this.handleChange}
                      />
                    </h4>
                    <br></br>
                    
                    
                    <Button type="submit"   size="large"
                    style={{ color:'#ffffff',background:'#008080'}}
                    onClick={() => this.newton_raphson(parseFloat(x0))}
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
export default Newton;