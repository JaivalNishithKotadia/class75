import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ToastAndroid,
  Alert,
} from "react-native";
import * as firebase from "firebase";
export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
    };
  }
  Login=async(email,password)=>{
    if(email && password){
       try{
         const response=await firebase.auth().signInWithEmailAndPassword(email,password)
         if(response){
             this.props.navigation.navigate('Transaction')
         }
       }catch(error){
           switch(error.code){
               case 'auth/user-not-found':
                alert("User Does Not Exist")
                console.log("User Does Not Exist")

                break ;
                case 'auth/invalid-email':
                 alert("Incorrect Email")
                 console.log("Incorrect Email")
                 
                 
                 break;
           }
       }
    }else{
        Alert.alert("Enter Email And Password")
    }
  }
  render() {
    return (
      <KeyboardAvoidingView style={{justifyContent:'center',alignItems:'center',marginTop:20}}>
        <View>
          <Image
            source={require("../assets/booklogo.jpg")}
            style={{ width: 200, height: 200 }}
          />
          <Text style={{ textAlign: 'center', fontSize: 30 }}>Willy</Text>
        </View>
        <View>
          <TextInput
            style={styles.loginBox}
            placeholder="Email Address (abc@example.com)"
            keyboardType='email-address'
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
          />
          <TextInput
            style={styles.loginBox}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
        </View>
        <View>
          <TouchableOpacity
            style={{
              height: 30,
              width: 90,
              borderWidth: 1,
              marginTop: 20,
              paddingTop: 5,
              borderRadius: 7,
            }}
            onPress={() => {
              this.Login(this.state.emailId, this.state.password);
            }}
          >
            <Text style={{ fontWeight: "700" }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  loginBox: {
    width: 350,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
    fontWeight: "500",
    borderRadius:8
  },
});
