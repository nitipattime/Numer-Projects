import React, { Component } from 'react'
import { Card, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
var api;
const InputStyle = {
    background: "#1890ff",
    color: "white",
    fontWeight: "bold",
    fontSize: "24px"

};

var A = [], B = [], X, matrixA = [], matrixB = [], output = []
class Gauss extends Component {

    constructor() {
        super();
        this.state = {
            row: 0,
            column: 0,
            showDimentionForm: true,
            showMatrixForm: false,
            showOutputCard: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.gauss = this.gauss.bind(this);

    }

    gauss(n) {
        this.initMatrix()
        if (A[0][0] === 0) { //pivoting
            var tempRow = JSON.parse(JSON.stringify(A[0]));
            var tempColumn = B[0];
            A[0] = A[1];
            A[1] = tempRow;
            B[0] = B[1];
            B[1] = tempColumn;
        }
        //Forward eliminated
        for (var k = 0; k < n; k++) {
            for (var i = k + 1; i < n; i++) {
                var factor = A[i][k] / A[k][k];
                for (var j = k; j < n; j++) {
                    A[i][j] = A[i][j] - factor * A[k][j];
                }
                B[i] = B[i] - factor * B[k];
            }
        }
        //Backward Substitution
        X = new Array(n);
        X[n - 1] = Math.round(B[n - 1] / A[n - 1][n - 1]); //find Xn
        for (i = n - 2; i >= 0; i--) { //find Xn-1 to X1
            var sum = B[i];
            for (j = i + 1; j < n; j++) {
                sum = sum - A[i][j] * X[j];
            }
            X[i] = Math.round(sum / A[i][i]);
        }
        for (i = 0; i < n; i++) {
            output.push("x" + (i + 1) + " = " + X[i]);
            output.push(<br />)
        }

        this.setState({
            showOutputCard: true
        });

    }
    createMatrix(row, column) {
        A = []
        B = []
        X = []
        matrixA = []
        matrixB = []
        output = []
        for (var i = 1; i <= row; i++) {
            for (var j = 1; j <= column; j++) {
                matrixA.push(<Input style={{
                    width: "18%",
                    height: "50%",
                    // backgroundColor: "#06d9a0",
                    marginInlineEnd: "5%",
                    marginBlockEnd: "5%",
                    // color: "white",
                    fontSize: "18px",
                    fontWeight: "bold"
                }}
                    id={"a" + i + "" + j} key={"a" + i + "" + j} placeholder={"a" + i + "" + j} />)
            }
            matrixA.push(<br />)
            matrixB.push(<Input style={{
                width: "18%",
                height: "50%",
                // backgroundColor: "black",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                // color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"b" + i} key={"b" + i} placeholder={"b" + i} />)


        }

        this.setState({
            showDimentionForm: true,
            showMatrixForm: true,
        })


    }
    initMatrix() {
        for (var i = 0; i < this.state.row; i++) {
            A[i] = []
            for (var j = 0; j < this.state.column; j++) {
                A[i][j] = (parseFloat(document.getElementById("a" + (i + 1) + "" + (j + 1)).value));
            }
            B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    async dataapi() {
        await axios({
          method: "get",
          url: "http://localhost:5000/database/gauss",
        }).then((response) => {
          console.log("response: ", response.data);
          api = response.data;
        });
        await this.setState({
          row: api.row,
          column: api.column,
        });
        matrixA = [];
        matrixB = [];
        await this.createMatrix(api.row, api.column);
        for (let i = 1; i <= api.row; i++) {
          for (let j = 1; j <= api.column; j++) {
            document.getElementById("a" + i + "" + j).value =
              api.matrixA[i - 1][j - 1];
          }
          document.getElementById("b" + i).value = api.matrixB[i - 1];
        }
        this.gauss(this.state.row);
      }

    render() {
        return (
            <div style={{ background: "#FFFF", padding: "30px" }}>
                <h1 style={{ textAlign: 'center',fontSize:'30px' }}>Gauss Elimination</h1>
                <div className="row">
                    <div className="col" style = {{textAlign: 'center',fontSize:'21px'}}onChange={this.handleChange}>
                        {this.state.showDimentionForm &&
                            <div>
                                <h4>Row  : &nbsp;&nbsp;<Input size="large" name="row" value={this.state.row}style={{ width: 150 }}></Input></h4><br />
                                <h4>Column  : &nbsp;&nbsp;<Input size="large" name="column" value={this.state.column}style={{ width: 150 }}></Input></h4><br />
                                <Button id="dimention_button" size="large" onClick={
                                    () => this.createMatrix(this.state.row, this.state.column)
                                }
                                    style={{ background: "#008080", color: "white" }}>
                                    Submit<br></br>
                                </Button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button type="submit"   size="large"
                                    style={{ color:'black',background:'#f7c602'}}
                                    onClick={() => this.dataapi()}>
                                        Function
                                    </Button>
                            </div>
                        }

                        {this.state.showMatrixForm &&
                            <div>
                                <br />
                                <h2 style = {{textAlign: 'center',fontSize:'30px'}}>Matrix [A]</h2><br />{matrixA}
                                <h2 style = {{textAlign: 'center',fontSize:'30px'}}>Vector [B]<br /></h2>{matrixB}
                                <br/>
                                <Button
                                    size="large"
                                    id="matrix_button"
                                    style={{ width: 150 ,background: "#f7c602", color: "black" }}
                                    onClick={() => this.gauss(this.state.row)}>
                                    Submit
                                </Button>
                            </div>
                        }
                    </div>
                    <br />
                    <div className="col">
                        {this.state.showOutputCard &&
                            <Card
                                title={"Output"}
                                bordered={true}
                                style={{ background: "while", color: "black" }}
                                onChange={this.handleChange} id="answerCard">
                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{output}</p>
                            </Card>
                        }                        
                    </div>
                </div>
            </div>
        );
    }
}
export default Gauss;



