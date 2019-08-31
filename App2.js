/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
  } from 'react-native';




class App extends Component {
  constructor(){
    super()
    this.state={
      resultText : "",
      calculationText : ""
    }
    this.operations =['DEL','+','-','*','/'] 
  }
  
  calculateResult(){
    const text = this.state.resultText
    this.setState({
      calculationText : eval(text)
    })
  }
  
  validate(){
    const text = this.state.resultText
    switch (text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false      
    }
    return true
  }
  
  operate(operation){
    switch (operation) {
      case 'DEL':
          let text = this.state.resultText.split('')
                text.pop()
                this.setState(
                  {
                    resultText : text.join('')
                  }
                )    
        break
      case '+':
      case '-':
      case '*':        
      case '/':
          const lastChar = this.state.resultText.split('').pop()
          if(this.operations.indexOf(lastChar)>0) return
          
          if(this.state.text=="") return
          this.setState(
            {
              resultText : this.state.resultText + operation
            }
          )
      
    }

  }

  buttonPressed (text){

    if (text=='=') {
      return this.validate() && this.calculateResult()
    }
    
    this.setState(
      {
        resultText : this.state.resultText + text
      }
    )    
  }

  render(){
    console.log("(this) in render():",this) 
    let rows = []
    let nums = [[7,8,9],[4,5,6],[1,2,3],['.',0,'=']]
    for (let i = 0; i < 4; i++) {
      let row = []
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity key={j} style={styles.btn} onPress={()=>this.buttonPressed(nums[i][j])}>
              <Text style={styles.btntext}>{nums[i][j]}</Text>
          </TouchableOpacity>
        )      
      }
      rows.push(<View key={i} style={styles.row}>{row}</View>)
    }
    
    let ops =[]
    for (let i = 0; i < 5; i++) {
      ops.push(
        <TouchableOpacity key={i} style={styles.btn} onPress={()=>this.operate(this.operations[i])}>
              <Text style={[styles.btntext,styles.white]}>{this.operations[i]}</Text>
          </TouchableOpacity>
      )
      
    }
  return (
    <View style={styles.container}>
      <View style={styles.result}>
          <Text style={styles.resultText}>
            {this.state.resultText}</Text>
      </View>
      <View style={styles.calculation}>
      <Text style={styles.calculationText}>{this.state.calculationText}</Text>
      </View>
      <View style={styles.buttons}>
          <View style={styles.numbers}>
              {rows}
          </View>
          <View style={styles.operation}>
               {ops}                
          </View>
      </View>
    </View>
          );
  }
}

const styles=StyleSheet.create({
    container:{
      flex : 1
  },
    btntext:{
      fontSize : 30,
      color:'white'
  },  
    white :{
      color : 'white'
  },
    result:{
      flex : 2,
      backgroundColor : 'white',
      alignItems : 'flex-end',
      justifyContent :'center'
  },
    btn:{
      flex : 1,
      alignItems : 'center',
      alignSelf : 'stretch',
      justifyContent : 'center'
  },
    resultText:{
      fontSize : 30,
      color : 'black'
  },
    calculation:{
      flex : 1,
      backgroundColor : 'white',
      alignItems : 'flex-end',
      justifyContent :'center'
  },  
    calculationText:{
      fontSize : 24,
      color : 'black'
  },
    buttons:{
      flex : 7,
      flexDirection : 'row'
  },
    numbers:{
      flex : 3,
      backgroundColor : '#434343' 
  },
    operation:{
      flex : 1,
      justifyContent : 'space-around',
      backgroundColor : '#636363'
  },
    row:{
      flexDirection : 'row',
      flex : 1,
      justifyContent : 'space-around',
      alignItems : 'center'
  }
})

export default App;
