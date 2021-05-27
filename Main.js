import React,{Component} from 'react';
import { StyleSheet, Text, View,SafeAreaView,Platform,Image,TouchableOpacity,ScrollView } from 'react-native';

import {StatusBar} from 'expo-status-bar';
import * as FaceDetector from 'expo-face-detector';
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import Filter1 from '../components/Filter1'


export default class MainScreen extends React.Component{
constructor(props){
        super(props)
        this.state = {
            hasCameraPermissions : null,
            faces : []
        }
    }
    componentDidMount(){
        Permissions.askAsync(Permissions.CAMERA).then(this.onCameraPermission)
        }
        onCameraPermission = (status) =>{
            this.setState({
                hasCameraPermissions : status.status === "granted"
            })
        }
        onFacesDetected = (faces) => {
            this.setState({
                faces : faces
            })
        }
   
        onFaceDectectionError = (err) => {
            console.log(err)
        }
render(){
    const {hasCameraPermissions} = this.state;
    if(hasCameraPermissions == null){
        return <View/>
    }
    if(hasCameraPermissions == false){
        return(
            <View style = {styles.container}>
            <Text> You Have No Excess To The Camera</Text>
            </View>
        )
    }
return(
    <View style = {styles.middlecontainer}>
    <SafeAreaView style= {styles.droidSafeArea}/>
    <View style = {styles.upperContainer}>
    <Text style = {styles.titleText}>Look At Me App</Text>
    </View>
    <View style = {styles.cameraStyle}>
    <Camera style = {{flex : 1}}type = {Camera.Constants.Type.front}
    faceDetectorSettings = {{
        mode : FaceDetector.Constants.Mode.fast,
        detectLandmarks : FaceDetector.Constants.Landmarks.all,
        runClassifications : FaceDetector.Constants.Classifications.all,
    }}
    onFacesDetected = {this.onFacesDetected}
    onFaceDetectionError = {this.onFaceDetectionError}
    />
    {
        this.state.faces.map(face => {
            return <Filter1 key = {face.faceID}face = {face}/>
        })
    }
    </View>
    <View style = {styles.actionContainer}>
    
    </View>
    </View>
)
}
}

const styles = StyleSheet.create({
container : {
    flex: 1
},
middleContainer : {
    flex: 1   
},
droidSafeArea : {
    marginTop : Platform.OS === "android"?StatusBar.currentHeight : 0
},
upperContainer : {
    flex: 0.1,
    alignItems: 'center',
    justifyContent : 'center',
},
titleText : {
    fontSize : 29
},
cameraStyle : {
    flex : 0.66
},
actionContainer: {

}
})