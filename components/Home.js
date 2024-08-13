import "react-native-gesture-handler";
import {StyleSheet, TouchableOpacity, View,} from "react-native";
import Draggable from "react-native-draggable";
import CoordinateTile from "./CoordinateTile";
import BoxItem from "../components/BoxItem";
import { useEffect, useRef, useState } from "react";
import useStore from "../Store";
import EIcon from 'react-native-vector-icons/EvilIcons'
import FIcon from 'react-native-vector-icons/Foundation'
import RNPhotoManipulator from 'react-native-photo-manipulator'
import Animated, { useSharedValue,interpolate, useAnimatedStyle, useDerivedValue, withTiming, withRepeat, } from "react-native-reanimated";

const  Home =({navigation,route})=> {

  const[toolBoxImgVisible, setToolBoxImageVisible] = useState(0)
  const[ballBoxImgVisible, setBallBoxImageVisible] = useState(0)
  const[visibleScratchAction, setScratchActionVisible] = useState(0)
  const[visibleBallAction, setBallActionVisible] = useState(0)
  const[ballBG, setBallBG] = useState('white');
  const[scratchBG, setScratchBG] = useState('white');
  const[sprite,setSprite] = useState("");
  const[X,setXP] = useState(0);
  const[Y,setYP] = useState(0);
  const [degreeValue, setDegreeValue] = useState(0);

  const { actionList} =useStore((state) => ({actionList: state.actionList,}));




  const animation = useSharedValue(0)

  const rotation = useDerivedValue(() => {

    return interpolate(animation.value,
      [0,360],
      [0,1080],)
  })

  const animationStyle = useAnimatedStyle(() => {
    return{

      transform:[
        {
          rotate: rotation.value + 'deg'
        }
      ]
    }
  })
  function toolBoxPressed(){
    if(toolBoxImgVisible==0){
      setToolBoxImageVisible(100);
      setScratchActionVisible(100);
      setScratchBG('green');
      setSprite("Cat")
    }
    else{
      setToolBoxImageVisible(0);
      setScratchActionVisible(0);
      setScratchBG('white');
    }

  }

  function scratchActionPressed(){
    navigation.navigate('action-list')
  }

  function ballActionPressed(){
    navigation.navigate('action-list')
  }

  function ballBoxPressed(){
    if(ballBoxImgVisible==0){
      setBallBoxImageVisible(100);
      setBallActionVisible(100);
      setBallBG('green');
      setSprite("Ball");
    }
    else{
      setBallBoxImageVisible(0);
      setBallActionVisible(0);
      setBallBG('white');
      setSprite("");
    }
  }

  function setPosition(evt){
    setXP(evt.nativeEvent.locationX);
    setYP(evt.nativeEvent.locationY);
  }

  const playButton=()=>{
    actionList?.map((item)=>{
      if(item?.id==4){
        animation.value = withTiming(120,{
          duration : 2000
        })
      }
    })
  }
  const refreshButtonClick=()=>{
    setToolBoxImageVisible(0);
    setScratchActionVisible(0);
    setBallActionVisible(0);
    setBallBG('white');
    setScratchBG('white');
    setSprite("");
    setYP(0);
    setXP(0);
  }
  return (
    <View style = {styles.container}>
      <View style = {styles.playground}>
        <View style={styles.refreshButton}>
          <TouchableOpacity onPress={refreshButtonClick}>
            <FIcon name="refresh" color="green" size={24} />
          </TouchableOpacity>
        </View>
        <View style={{opacity:toolBoxImgVisible}}>
        <Animated.View style={[animationStyle]}>
        <Draggable
          id = 'scratch'
          imageSource={require('../assets/icn_scratch.png')}
          renderSize = {50}
          x={0}
          y={0}
          onPressIn = {()=> setSprite("Cat")}
          onRelease = {()=> console.log('out press')}
          onDragRelease = {setPosition}
          style={{ transform: [{ rotateY: `${degreeValue}deg` }] }}
        />
        </Animated.View>
        </View>

        <View style = {{opacity:ballBoxImgVisible}}>
        <Draggable
          imageSource={require('../assets/ball.png')}
          renderSize = {50}
          x={0}
          y={50}
          onPressIn = {()=> setSprite("Ball")}
          onRelease = {()=> console.log('out press')}
          onDragRelease = {setPosition}
        />
        </View>
        {
          sprite.length!=0?
            <TouchableOpacity style={styles.playButton} onPress={() => playButton()}>
              <EIcon name='play' color="black" size={50} className="fas fa-play" />
            </TouchableOpacity>
            :null
        }
      </View>

      <CoordinateTile
        name = {sprite}
        xPos = {X}
        yPos = {Y}
      />
      <View style={styles.tools}>
          <BoxItem
            path= {require('../assets/icn_scratch.png')}
            backgroundColor = {scratchBG}
            pressedImg = {toolBoxPressed}
            pressedAction = {scratchActionPressed}
            visibileAction = {visibleBallAction}
            />
          <BoxItem
          path = {require('../assets/ball.png')}
          backgroundColor = {ballBG}
          visibileAction = {visibleBallAction}
          pressedImg = {ballBoxPressed}
          pressedAction = {ballActionPressed}
          />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#e5e5e5',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  playground:{
    flex: 7,
    width: '98%',
    backgroundColor: 'white',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    margin: 4,
    color: 'white',
    position: "relative",

  },


  tools:{
    flex: 3,
    width: '98%',
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    margin: 8,
  },
  playButton : {
    bottom:2,
    right:-5,
    position:"absolute"
  },
  refreshButton:{
    position:"absolute",
    top:1,
    right:2
  },
});
export default Home;
