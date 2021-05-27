import React from 'react';
import {Image,View} from 'react-native';

const Filter1 = ({
face : {
    bounds : {
        size :  {width : faceWidth,height : faceHeight}
    },
   leftEyePosition,
   rightEyePosition,
   noseBasePosition
}
}) => {
const filterWidth = faceWidth
const filterHeight = faceHeight/3
const transFormAngle = (angleRad = Math.atan((rightEyePosition.y - leftEyePosition.y)/(rightEyePosition.x - leftEyePosition.x))) => {
angleRad = (angleRad*180)/Math.PI
}
return(
    <View style = {{position:'absolute',left : leftEyePosition.x - filterWidth*0.675,top : leftEyePosition.y - filterHeight*0.5}}>
        <Image source = {require("./assets/crown-pic1.png")}
         style={{width : filterWidth , 
            height : filterHeight,
            resizeMode : "contain",
            transform : [{rotate : `${ transFormAngle()}deg`}]
            }}/>
    </View>
)
}
export default Filter1 