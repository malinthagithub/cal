import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from "./components/Button"; // Assume Button is implemented correctly
import Row from "./components/Row"; // Assume Row is implemented correctly
import calculator, { initialState } from "./logic/calculator";

export default class App extends Component {
  state = {
    ...initialState,
  };

  handleTap = (type, value) => {
    this.setState((state) => calculator(type, value, state));
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <Text style={styles.expression}>
            {this.state.expression || "0"}
          </Text>
          <Text style={styles.value}>
            {this.state.currentValue}
          </Text>
          <Row>
            <Button text="AC" theme="accent" onPress={() => this.handleTap("clear")} />
            <Button text="( )" theme="accent" onPress={() =>this.handleTap("parentheses")} />
            <Button text="%" theme="accent" onPress={() => this.handleTap("percent")} />
            <Button text="/" theme="accent" onPress={() => this.handleTap("operator", "/")} />
          </Row>
          <Row>
            <Button text="7" onPress={() => this.handleTap("number", "7")} />
            <Button text="8" onPress={() => this.handleTap("number", "8")} />
            <Button text="9" onPress={() => this.handleTap("number", "9")} />
            <Button text="X" theme="accent" onPress={() => this.handleTap("operator", "*")} />
          </Row>
          <Row>
            <Button text="4" onPress={() => this.handleTap("number", "4")} />
            <Button text="5" onPress={() => this.handleTap("number", "5")} />
            <Button text="6" onPress={() => this.handleTap("number", "6")} />
            <Button text="-" theme="accent" onPress={() => this.handleTap("operator", "-")} />
          </Row>
          <Row>
            <Button text="1" onPress={() => this.handleTap("number", "1")} />
            <Button text="2" onPress={() => this.handleTap("number", "2")} />
            <Button text="3" onPress={() => this.handleTap("number", "3")} />
            <Button text="+" theme="accent" onPress={() => this.handleTap("operator", "+")} />
          </Row>
          <Row>
            <Button text="." onPress={() => this.handleTap("number", ".")} />
            <Button text="0" onPress={() => this.handleTap("number", "0")} />
            <Button text="⌫" theme="buttonequle" onPress={() => this.handleTap("backspace")} />
            <Button text="=" theme="accent" onPress={() => this.handleTap("equal")} />
          </Row>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "black",
    justifyContent: "flex-end",
  },
  expression: {
    color: "white",
    fontSize: 24,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 5,
  },
  value: {
    color: "white",
    fontSize: 42,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },
});
