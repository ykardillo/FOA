import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import Loading from "../Util/Loading";
import * as api from "../../Api/Api";

export default class UsersImage extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      image1: null,
      image2: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({ isLoading: true });
    if (this._isMounted) {
      const { usersId } = this.props;
      if (usersId.length == 1) {
        api.getImageFromId(usersId[0].userId, (success, data, error) => {
          if (this._isMounted) {
            this.setState({
              image1: data,
              isLoading: false,
            });
          }
        });
      } else if (usersId.length == 2) {
        api.getImageFromId(usersId[0].userId, (success, data, error) => {
          if (this._isMounted) {
            this.setState({
              image1: data,
            });
          }
        });
        api.getImageFromId(usersId[1].userId, (success, data, error) => {
          if (this._isMounted) {
            this.setState({
              image2: data,
              isLoading: false,
            });
          }
        });
      } else if (usersId.length > 2) {
        api.getImageFromId(usersId[0].userId, (success, data, error) => {
          if (this._isMounted) {
            this.setState({
              image1: data,
              isLoading: false,
            });
          }
        });
      }
    }
  }

  _displayLoading() {
    return <Loading style={{ top: 5 }} size={"small"} color={"#1f78fe"} />;
  }
  _displayUser1() {
    if (this.state.isLoading && !this._isMounted) {
      return this._displayLoading();
    } else {
      return (
        <Image
          source={{
            uri: this.state.image1,
          }}
          style={[styles.image_users_size, styles.image_users]}
        />
      );
    }
  }
  _displayUser2() {
    if (this.state.isLoading && !this._isMounted) {
      return this._displayLoading();
    } else {
      return (
        <>
          <Image
            source={{
              uri: this.state.image2,
            }}
            style={[styles.image_users_size, styles.image_users_plus]}
          />
          <Image
            source={{
              uri: this.state.image1,
            }}
            style={[styles.image_users_size, styles.image_users]}
          />
        </>
      );
    }
  }

  _displayUser3() {
    const { usersId } = this.props;
    if (this.state.isLoading && !this._isMounted) {
      return this._displayLoading();
    } else {
      return (
        <>
          <View style={[styles.image_users_size, styles.image_users_plus]}>
            <Text style={styles.text_users_plus}>+{usersId.length - 2}</Text>
          </View>
          <Image
            source={{
              uri: this.state.image1,
            }}
            style={[styles.image_users_size, styles.image_users]}
          />
        </>
      );
    }
  }

  render() {
    const { usersId } = this.props;
    if (usersId.length == 1) {
      return this._displayUser1();
    } else if (usersId.length == 2) {
      return this._displayUser2();
    } else if (usersId.length > 2) {
      return this._displayUser3();
    }
    return null;
  }
}

const styles = StyleSheet.create({
  loading_container: { flex: 1 },
  image_users_size: {
    borderColor: "lightgray",
    borderWidth: 1,
    top: 5,
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  image_users: {
    marginRight: 60,
    marginLeft: 5,
  },
  image_users_plus: {
    marginRight: -57,
    marginLeft: 60,
  },
  text_users_plus: {
    fontSize: 13,
    paddingTop: 5,
    paddingLeft: 8,
    color: "gray",
  },
});
