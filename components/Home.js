import "react-native-gesture-handler";
import {StyleSheet,TouchableOpacity,View,Animated,Pressable} from "react-native";
import Draggable from "react-native-draggable";
import CoordinateTile from "./CoordinateTile";
import BoxItem from "../components/BoxItem";
import {useEffect,useRef,useState} from "react";
import useStore from "../Store";
import EIcon from 'react-native-vector-icons/EvilIcons'
import FIcon from 'react-native-vector-icons/Foundation'
import FeatherIcon from 'react-native-vector-icons/Feather'

const Home=({navigation,route}) => {

  const [toolBoxImgVisible,setToolBoxImageVisible]=useState(0)
  const [ballBoxImgVisible,setBallBoxImageVisible]=useState(0)
  const [visibleScratchAction,setScratchActionVisible]=useState(0)
  const [visibleBallAction,setBallActionVisible]=useState(0)
  const [ballBG,setBallBG]=useState('white');
  const [scratchBG,setScratchBG]=useState('white');
  const [sprite,setSprite]=useState("");
  const [X,setXP]=useState(0);
  const [Y,setYP]=useState(0);
  const [showBallBoxButton,setShowBallBoxButton]=useState(false)
  const [showCatBoxButton,setShowCatBoxButton]=useState(true)

  const {actionList}=useStore((state) => ({actionList: state.actionList1}));
  const {actionList2}=useStore((state) => ({actionList2: state.actionList2}));
  const [translateX]=useState(new Animated.Value(0));
  const [translateY]=useState(new Animated.Value(0));
  const [rotate]=useState(new Animated.Value(0));
  const [translateXX]=useState(new Animated.Value(0));
  const [translateYY]=useState(new Animated.Value(0));
  const [rotateTwo]=useState(new Animated.Value(0));

  const rotation=rotate.interpolate({
    inputRange: [0,1],
    outputRange: ['0deg','360deg'],
  });
  const rotationTwo=rotateTwo.interpolate({
    inputRange: [0,1],
    outputRange: ['0deg','360deg'],
  });

  const animationStyle={
    transform: [
      {translateX},
      {translateY},
      {rotate: rotation},
    ],
  };
  const animationStyle2={
    transform: [
      {translateX: translateXX},
      {translateY: translateYY},
      {rotate: rotationTwo},
    ],
  };
  function toolBoxPressed() {
    if(toolBoxImgVisible==0) {
      setToolBoxImageVisible(100);
      setScratchActionVisible(100);
      setScratchBG('green');
      setSprite("Cat")
    }
    else {
      setToolBoxImageVisible(0);
      setScratchActionVisible(0);
      setScratchBG('white');
    }

  }

  function scratchActionPressed() {
    navigation.navigate('action-list')
  }

  function ballActionPressed() {
    navigation.navigate('action-list')
  }

  function ballBoxPressed() {
    if(ballBoxImgVisible==0) {
      setBallBoxImageVisible(100);
      setBallActionVisible(100);
      setBallBG('green');
      setSprite("Ball");
    }
    else {
      setBallBoxImageVisible(0);
      setBallActionVisible(0);
      setBallBG('white');
      setSprite("");
    }
  }

  const playButton=() => {
    const animations2=[];
    const animations=actionList?.map((item) => {
      switch(item?.id) {
        case 1:
          return Animated.timing(translateX,{
            toValue: 50,
            duration: 1000,
            useNativeDriver: true,
          });
        case 2:
          return Animated.timing(translateY,{
            toValue: 50,
            duration: 1000,
            useNativeDriver: true,
          });
        case 3:
          return;
        case 4:
          return Animated.timing(rotate,{
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          });
      }
    }).filter(animation => animation !== null);
    actionList2?.map((item) => {
      if(item?.id==1) {
        animations2.push(
          Animated.timing(translateXX,{
            toValue: 50,
            duration: 1000,
            useNativeDriver: true,
          })
        )
      }
      else if(item?.id==2) {
        animations2.push(
          Animated.timing(translateYY,{
            toValue: 50,
            duration: 1000,
            useNativeDriver: true,
          })
        )
      }
      else if(item?.id==3) {
        //
      }
      else if(item?.id==4) {
        animations2.push(
          Animated.timing(rotateTwo,{
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          })
        )
      }
    })
    Animated.parallel([
      Animated.sequence(animations).start(() => {
      }),
      Animated.sequence(animations2).start(() => {
      })
    ])
  }
  const refreshButtonClick=() => {
    setToolBoxImageVisible(0);
    setBallBoxImageVisible(0)
    setScratchActionVisible(0);
    setBallActionVisible(0);
    setBallBG('white');
    setScratchBG('white');
    setSprite("");
    setYP(0);
    setXP(0);
    setPosition1({ x: 0, y: 0 });
    setPosition2({ x: 0, y: 0 });
  }
  const [position1, setPosition1] = useState({ x: 0, y: 0 });
  const [position2, setPosition2] = useState({ x: 0, y: 0 });
  return (
    <View style={styles.container}>
      <View style={styles.playground}>
        <View style={styles.refreshButton}>
          <TouchableOpacity onPress={refreshButtonClick}>
            <FIcon name="refresh" color="white" size={24} />
          </TouchableOpacity>
        </View>
        <View style={{opacity: toolBoxImgVisible}}>
            <Draggable
              id='scratch'
              x={position1.x}
              y={position1.y}
              onPressIn={() => setSprite("Cat")}
              onRelease={() => console.log('out press')}
              onDragRelease={(e, gestureState, bounds) => {
                setPosition1({ x: e.nativeEvent.locationX, y: e.nativeEvent.locationY });
              }}
            >
            <Animated.Image source={require('../assets/icn_scratch.png')} style={[animationStyle,{width:50,height:50}]}/>
            </Draggable>
        </View>

        <View style={{opacity: ballBoxImgVisible}}>
            <Draggable
              x={0}
              y={50}
              onPressIn={() => setSprite("Ball")}
              onRelease={() => console.log('out press')}
            onDragRelease={(e,gestureState,bounds) => {
              setPosition2({x: e.nativeEvent.locationX,y: e.nativeEvent.locationY});
            }}
            >
              <Animated.Image style={[animationStyle2,,{width:50,height:50}]} source={require('../assets/ball.png')}/>
            </Draggable>
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
        name={sprite}
        xPos={sprite=="Cat" ? position1.x : position2.x}
        yPos={sprite=="Cat" ? position1.y:position2.y}
      />
      <View style={styles.tools}>
        {
          showCatBoxButton?
            <BoxItem
              path={require('../assets/icn_scratch.png')}
              backgroundColor={scratchBG}
              pressedImg={toolBoxPressed}
              pressedAction={scratchActionPressed}
              visibileAction={visibleBallAction}
              showBoxButton={showCatBoxButton}
              setShowBoxButton={setShowCatBoxButton}
            />:
            <TouchableOpacity style={styles.toolsBox} onPress={() => setShowCatBoxButton(!showBallBoxButton)}>
              <FeatherIcon name='plus' color="black" size={25} className="fas fa-play" />
            </TouchableOpacity>
        }
        {
          showBallBoxButton?
            <BoxItem
              path={require('../assets/ball.png')}
              backgroundColor={ballBG}
              visibileAction={visibleBallAction}
              pressedImg={ballBoxPressed}
              pressedAction={ballActionPressed}
              showBoxButton={showBallBoxButton}
              setShowBoxButton={setShowBallBoxButton}
            />:
            <TouchableOpacity style={styles.toolsBox} onPress={() => setShowBallBoxButton(true)}>
              <FeatherIcon name='plus' color="black" size={25} className="fas fa-play" />
            </TouchableOpacity>
        }
      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#e5e5e5',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  playground: {
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


  tools: {
    flex: 3,
    width: '98%',
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    margin: 8,
  },
  playButton: {
    bottom: 2,
    right: -5,
    position: "absolute"
  },
  refreshButton: {
    padding: 4,
    position: "absolute",
    top: -2,
    right: 1,
    backgroundColor: "green",
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 3,
  },
  toolsBox: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
    height: "80%",
    borderRadius: 10,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginLeft: 8,
  },
});
export default Home;
