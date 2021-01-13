import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as api from "../../../Api/Api";
import Util from "../../../Model/Util";
import ButtonAdd from "../../Util/ButtonAdd";
import ModalInfoToDo from "./ModalInfoToDo";

class DetailToDo extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      creator: [],
      modalInfo: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    const { toDo } = this.props.route.params;

    this._isMounted = true;
    api.getUserfromId(toDo.creatorId, (success, data, error) => {
      if (this._isMounted) {
        this.setState({
          creator: data,
        });
      }
    });
  }
  _openInfoModal() {
    this.setState({
      modalInfo: true,
    });
  }
  _closeModalInfo = () => {
    this.setState({ modalInfo: false });
  };

  _setModalInfoStatus = (value) => {
    this.setState({ modalInfo: value });
  };


  _displayIsDone() {
    const { toDo } = this.props.route.params;
    if (toDo.isDone == "true") {
      return (
        <View style={styles.isDone_View}>
          <View style={styles.isDone_View_finished}>
            <Text style={styles.isDone_text}>Finished</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.isDone_View}>
          <View style={styles.isDone_View_todo}>
            <Text style={styles.isDone_text}>To do</Text>
          </View>
        </View>
      );
    }
  }

  render() {
    const { toDo } = this.props.route.params;
    const { creator, newToDo } = this.state;
    if (toDo != undefined) {
      return (
        <View style={styles.main_container}>
          <View style={styles.view}>
            <View style={styles.description}>
              {this._displayIsDone()}
              <TouchableOpacity
                onPress={() => this._openInfoModal()}
                style={{ marginTop: 15 }}
              >
                <Text style={styles.today} numberOfLines={1}>
                  For {Util.getDate(Number(toDo.executionDate))}
                </Text>
              </TouchableOpacity>
              <Text style={styles.overview}>{toDo.overview}</Text>
              <Text style={styles.creator}>
                Create by {creator.lastname} {creator.firstname}
              </Text>
            </View>
          </View>
          {/* <ButtonAdd action={() => console.log("this._openModal()")} /> */}

          <ModalInfoToDo
            modalStatus={this.state.modalInfo}
            closeModal={this._closeModalInfo}
            setModalStatus={this._setModalInfoStatus}
            toDo={toDo}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.loading_container}>
          <Text style={styles.text}> No information ¯ \ _(ツ) _ / ¯ </Text>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  view: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 25,
  },
  description: {
    marginLeft: 16,
    marginTop: 20,
  },
  main_container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
  },
  title_view: {
    flexDirection: "row",
  },
  isDone_View: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 15,
    marginLeft: 5,
  },
  isDone_View_todo: {
    backgroundColor: "#1f78fe",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    shadowColor: "#1f78fe",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  isDone_View_finished: {
    backgroundColor: "#bbbbbc",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  isDone_text: {
    color: "white",
    fontFamily: "Muli-Bold",
    bottom: 1,
  },
  text: {
    color: "#bbbbbc",
    fontFamily: "Muli",
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  today: {
    color: "#2d2d2d",
    fontFamily: "Muli-Bold",
    fontSize: 18,
    fontStyle: "normal",
    letterSpacing: 0.13,
  },
  overview: {
    fontFamily: "Muli",
    margin: 5,
    textAlign: "justify",
    paddingRight: 15,
    paddingLeft: 7,
  },
  creator: {
    fontFamily: "Muli",
    fontStyle: "italic",
    color: "grey",
    textAlign: "right",
    margin: 5,
    marginRight: 10,
  },
  default_text: {
    marginLeft: 5,
  }
});

export default DetailToDo;
