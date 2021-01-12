import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";

export default class Loading extends React.Component {
  render() {
    return (
      <View style={this.props.style}>
        <ActivityIndicator size={this.props.size} color={this.props.color} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  
});
