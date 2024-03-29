/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Icon, Badge, Tabs, Card, CardItem, List, ListItem, InputGroup, Input } from 'native-base';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Modal,
  Alert
} from 'react-native';
var {height, width} = Dimensions.get('window');


class UpdateModal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const tempData = (this.props.tempData)?this.props.tempData:{
      name: '',
      email: '',
      facebookId: '',
      id: 0
    };
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.props.updateModal}
        onRequestClose={() => {this.props.toggleUpdateModal()}}
        >
        <View style={styles.updateModalMask}></View>
        <View style={styles.updateModal}>
          <List>
            <ListItem style={{marginTop:12}}>
                <InputGroup>
                    <Icon name="ios-person" />
                    <Input defaultValue={tempData.name.toString()} placeholder="Name" onChangeText={(name) => {tempData.name = name;this.props.updateTempData(tempData)}} />
                </InputGroup>
            </ListItem>

            <ListItem style={{marginTop:12}}>
                <InputGroup>
                    <Icon name="ios-mail" />
                    <Input defaultValue={tempData.email.toString()} keyboardType='email-address' placeholder="Email" onChangeText={(email) => {tempData.email = email;this.props.updateTempData(tempData)}} />
                </InputGroup>
            </ListItem>

            <ListItem style={{marginTop:12}}>
                <InputGroup>
                    <Icon name="ios-apps" />
                    <Input defaultValue={tempData.facebookId.toString()} keyboardType='numeric' placeholder="FacebookId" onChangeText={(facebookId) => {tempData.facebookId = facebookId;this.props.updateTempData(tempData)}} />
                </InputGroup>
            </ListItem>
          </List>
          <Button style={{margin: 15,elevation:0}} block warning onPress={()=>this.updateFriend()} >更新朋友資訊</Button>
        </View>
      </Modal>
    );
  }

  componentDidUpdate(){
  }

  updateFriend(){
    if(this.props.tempData.name && this.props.tempData.email && this.props.tempData.facebookId){
      updateFriendAjax({
        name: this.props.tempData.name,
        email: this.props.tempData.email,
        facebookId: this.props.tempData.facebookId
      }, this.props.tempData.id).then(data => {this.props.toggleUpdateModal();})
    }else{
      Alert.alert('Info','尚有欄位未填寫')
    }
  }

}

const styles = StyleSheet.create({
  updateModal: {
    backgroundColor: 'white',
    marginTop: 150,
    padding: 18,
    elevation: 8,
    margin: 15,
    borderRadius: 5
  },
  updateModalMask: {
    backgroundColor: 'white',
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    top: 0,
    left: 0
  }
});

export default UpdateModal;

function updateFriendAjax(updateData, fid) {
  return new Promise(function(resolve, reject) {
    var str = Object.keys(updateData).map(function(key){
      return encodeURIComponent(key) + '=' + encodeURIComponent(updateData[key]);
    }).join('&');
    fetch('https://sails-sample-sakuxz.c9users.io/friend/update/' + fid,{
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: str
    }).then(res => {
      if (res.ok) {
        res.json().then(function(data) {
          resolve(data)
        });
      } else {
        reject('err')
      }
    })
  });
}
