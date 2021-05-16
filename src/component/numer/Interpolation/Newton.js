import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
var api;
var columns = [
    {
        title: "No.",
        dataIndex: "no",
        key: "no"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Y",
        dataIndex: "y",
        key: "y"
    }
];
var x, y, tableTag, interpolatePoint, tempTag, fx

class Newton extends Component {

    constructor() {
        super();
        x = []
        y = []
        interpolatePoint = []
        tempTag = []
        tableTag = []

        this.state = {
            nPoints: 0,
            X: 0,
            interpolatePoint: 0,
            showInputForm: true,
            showTableInput: false,
            showOutputCard: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.newton_difference = this.newton_difference.bind(this);

    }
    createTableInput(n) {
        for (var i = 1; i <= n; i++) {
            x.push(<Input style={{
                width: "50%",
                height: "40%",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "black",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"x" + i} key={"x" + i} placeholder={"x" + i} />);
            y.push(<Input style={{
                width: "50%",
                height: "40%",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "black",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"y" + i} key={"y" + i} placeholder={"y" + i} />);
            tableTag.push({
                no: i,
                x: x[i - 1],
                y: y[i - 1]
            });
        }


        this.setState({
            showInputForm: false,
            showTableInput: true,
        })
    }
    createInterpolatePointInput() {
        for (var i = 1; i <= this.state.interpolatePoint; i++) {
            tempTag.push(<Input style={{
                width: "10%",
                height: "40%",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "black",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"p" + i} key={"p" + i} placeholder={"p" + i} />)
        }
    }

    initialValue() {
        x = []
        y = []
        for (var i = 1; i <= this.state.nPoints; i++) {
            x[i] = parseFloat(document.getElementById("x" + i).value);
            y[i] = parseFloat(document.getElementById("y" + i).value);
        }
        for (i = 1; i <= this.state.interpolatePoint; i++) {
            interpolatePoint[i] = parseInt(document.getElementById("p" + i).value);
        }
    }
    C(n) {
        if (n === 1) {
            return 0
        }
        else {
            return ((y[interpolatePoint[n]] - y[interpolatePoint[n - 1]]) / (x[interpolatePoint[n]] - x[interpolatePoint[n - 1]])) - this.C(n - 1)
        }

    }
    findX(n, X) {
        if (n < 1) {
            return 1
        }
        else {
            console.log(X + " - " + x[interpolatePoint[n]])
            return (X - x[interpolatePoint[n]]) * this.findX(n - 1, X)
        }
    }
    newton_difference(n, X) {
        this.initialValue()
        fx = y[1]
        if (n === 2) { //if linear interpolate
            fx += ((y[interpolatePoint[2]] - y[interpolatePoint[1]]) / (x[interpolatePoint[2]] - x[interpolatePoint[1]])) * (X - x[interpolatePoint[1]])
        }
        else {
            for (var i = 2; i <= n; i++) {
                fx += (this.C(i) / (x[interpolatePoint[i]] - x[interpolatePoint[1]])) * this.findX(i - 1, X)
            }
        }

        this.setState({
            showOutputCard: true
        })

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async dataapi() {
        await axios({
          method: "get",
          url: "http://localhost:5000/database/newtondivide",
        }).then((response) => {
          console.log("response: ", response.data);
          api = response.data;
        });
        await this.setState({
            nPoints: api.nPoints,
            X: api.X,
<<<<<<< HEAD
            interpolatePoint: api.interpolateinput
=======
            interpolateinput: api.interpolateinput
>>>>>>> 7e6d19a1a8d8b8e877415c23d01132855e795070
        });
        x = []
        y = []
        interpolatePoint = []
        tempTag = []
        tableTag = []
        await this.createInterpolatePointInput();
        await this.createTableInput(api.nPoints);
        for (let i = 1; i <= api.nPoints; i++) {
<<<<<<< HEAD
            document.getElementById("x" + i ).value = api.arrayX[i - 1];
            document.getElementById("y" + i).value = api.arrayY[i - 1];
        }
        for (let i = 1; i <= api.interpolateinput; i++) {
            document.getElementById("p" + i ).value = api.interpolatePoint[i - 1];
=======
          
            document.getElementById("x" + i ).value = api.arrayX[i - 1];
          
          document.getElementById("y" + i).value = api.arrayY[i - 1];
>>>>>>> 7e6d19a1a8d8b8e877415c23d01132855e795070
        }
        this.newton_difference(parseInt(this.state.interpolatePoint), parseFloat(this.state.X));
      }
    
    render() {
        return (
            <div style={{ background: "#FFFF", padding: "30px" }}>
                <h1 style = {{textAlign: 'center',fontSize:'30px'}}>Newton's Divided Differences Interpolation</h1>

                <div className="row">
                    <div className="col">
                        {/* 1  nPoints  X  interpolatePoint*/}
                            {this.state.showInputForm &&
                                
                                    <form style = {{textAlign: 'center',fontSize:'21px'}} id="inputCard">
                                        <h4>Number of points(n)  : &nbsp;&nbsp;               
                                            <Input size="large" name ="nPoints" style={{ width: 300 }}
                                            onChange={this.handleChange}
                                            />
                                        </h4>
                                        <br></br>
                                        <h4>X : &nbsp;&nbsp;
                                            <Input size="large" name ="X" style={{ width: 200 }}
                                            onChange={this.handleChange}
                                            />
                                        </h4>
                                        <br></br>
                                        <h4>interpolatePoint : &nbsp;&nbsp;
                                            <Input size="large" name = "interpolatePoint"style={{ width: 200 }}
                                            onChange={this.handleChange}
                                            />
                                        </h4>
                                        <br></br>
                                        
                                        <Button type="submit"   size="large"
                                        style={{ color:'#ffffff',background:'#008080'}}
                                        onClick={() => {this.createTableInput(parseInt(this.state.nPoints));this.createInterpolatePointInput()}}>
                                            Submit
                                        </Button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button type="submit"   size="large"
                                        style={{ color:'#ffffff',background:'#f7c602'}}
                                        onClick={() => this.dataapi()}>
                                            Function
                                        </Button>
                                        </form>
                            }
                            {/* 2  tempTag  tableTag*/}
                            {this.state.showTableInput &&
                                <div>
                                    <Table columns={columns} dataSource={tableTag} pagination={false} bordered={true} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black", overflowY: "scroll", minWidth: 80, maxHeight: 300 }}></Table>
                                    <br /><h2>InterpolatePoint {parseInt(this.state.interpolatePoint) === 2 ? "(Linear)" :
                                        parseInt(this.state.interpolatePoint) === 3 ? "(Quadratic)" :
                                            "(Polynomial)"}</h2>
                                            
                                            {tempTag}
                                    <Button
                                        id="matrix_button"
                                        style={{ color:'#ffffff',background: "#008080" }}
                                        onClick={() => this.newton_difference(parseInt(this.state.interpolatePoint), parseFloat(this.state.X))}>
                                        Submit
                                </Button>
                                </div>
                            }

                            
                        
                    </div>
                    <div className="col">
                        {this.state.showOutputCard &&
                            <Card
                                title={"Output"}
                                bordered={true}
                                style={{  background: "while", color: "black" }}
                            >
                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{fx}</p>

                            </Card> 
                        }
                    </div>

                </div>


            </div>
        );
    }
}
export default Newton;