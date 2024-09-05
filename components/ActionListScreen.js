import React,{useEffect,useRef,useState} from 'react';
import {View,Text,StyleSheet,PanResponder,Animated,FlatList,TouchableOpacity} from 'react-native';
import useStore from '../Store';
import EIcon from 'react-native-vector-icons/EvilIcons'


const ActionList=() => {
  const {actionListGet}=useStore((state) => ({actionListGet: state.actionList1}));
  const {actionListGet2}=useStore((state) => ({actionListGet2: state.actionList2}));
  const [droppedItems1,setDroppedItems1]=useState(actionListGet);
  const [droppedItems2,setDroppedItems2]=useState(actionListGet2);
  const [activeAction,setActiveAction]=useState("1")
  const addActionList=useStore((state) => state.addActionList1);
  const addActionList2=useStore((state) => state.addActionList2);

  const handleDrop=(item) => {
    if(activeAction==="1") {
      setDroppedItems1((prevItems) => [...prevItems,item]);
    } else {
      setDroppedItems2((prevItems) => [...prevItems,item]);
    }
  };
  useEffect(() => {
    addActionList(droppedItems1);
  },[droppedItems1])
  useEffect(() => {
    addActionList2(droppedItems2);
  },[droppedItems2])



  const dragItemData=[
    {id: 1,name: "Add X=50"},
    {id: 2,name: "Add Y=50"},
    {id: 3,name: "Add X=50 & Y=50"},
    {id: 4,name: "Rotate 360"},
  ];

  const removeItem=(id,action) => {
    if(action==1){
      setDroppedItems1(droppedItems1.filter(item => item.id!==id));
    }else{
      setDroppedItems2(droppedItems2.filter(item => item.id!==id));
    }
  }

  const DraggableItem=({item,index,onDrop}) => {
    const position=useRef(new Animated.ValueXY()).current;
    const [dragging,setDragging]=useState(false);

    const panResponder=useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          setDragging(true);
        },
        onPanResponderMove: Animated.event(
          [null,{dx: position.x,dy: position.y}],
          {useNativeDriver: false}
        ),
        onPanResponderRelease: (e,gestureState) => {
          //console.log({e})
          setDragging(false);
          if(gestureState.moveX>200) { // Adjust this value based on your layout
            onDrop(item);
          }
          position.setValue({x: 0,y: 0}); // Reset position
        },
      })
    ).current;

    return (
      <View style={{marginTop: 25,left: 20}}>
        <Animated.View
          style={[styles.dragItems,{transform: position.getTranslateTransform()}]}
          {...panResponder.panHandlers}>
          <Text style={styles.text}>{item.name}</Text>
        </Animated.View>
      </View>
    );
  };
  return (
    <Animated.View style={styles.container}>
      <View>
        <View style={styles.flexRow}>
          <Text style={styles.codeTextStyle}>CODE</Text>
          <Text style={styles.actionTextStyles}>ACTION</Text>
        </View>
        <View style={styles.leftContainer}>
          <FlatList
            data={dragItemData}
            renderItem={({item,index}) => (
              <DraggableItem
                activeAction={activeAction}
                item={item}
                index={index}
                onDrop={handleDrop}
              />
            )}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.rightContainer}>
            <View style={styles.actionButtonContainer}>
              <TouchableOpacity style={[styles.actionButton,{backgroundColor: activeAction=="1" ? "green" : "gray"}]} onPress={() => setActiveAction("1")}>
                <Text style={styles.actionButtonText}>Action 1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton,{backgroundColor: activeAction=="2" ? "green" : "gray"}]} onPress={() => setActiveAction("2")}>
                <Text style={styles.actionButtonText}>Action 2</Text>
              </TouchableOpacity>
            </View>
            {
              activeAction=="1"?
                <Animated.View>
                  {droppedItems1.map((item) => (
                    <View style={styles.flexRow}>
                      <View key={item.id} style={styles.droppedItem}>
                        <Text style={styles.text}>{item.name}</Text>
                      </View>
                      <TouchableOpacity style={styles.deleteIconContainer} onPress={() => removeItem(item?.id,1)}>
                        <EIcon name='trash' color="white" size={25} className="fas fa-play" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </Animated.View>
                :
                <Animated.View>
                  {droppedItems2.map((item) => (
                    <View style={styles.flexRow}>
                      <View key={item.id} style={styles.droppedItem}>
                        <Text style={styles.text}>{item.name}</Text>
                      </View>
                      <TouchableOpacity style={styles.deleteIconContainer} onPress={() => removeItem(item?.id,2)}>
                        <EIcon name='trash' color="white" size={25} className="fas fa-play" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </Animated.View>
            }
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles=StyleSheet.create({
  flexRow:{
    flexDirection:"row"
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  dragItems: {
    //width: '40%',
    //padding: 10,
    //borderRadius: 5,
    width: 140,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 5,
    marginBottom: 20,
  },
  dragItemText: {
    textAlign: "center",
    textAlignVertical: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'lightblue',
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  leftContainer: {
    flexDirection: "row"
  },
  rightContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    top: 2,
    position: "absolute",
    right: 3,
    borderWidth: 1,
    borderColor: "gray",
    width: "48%",
    paddingBottom: 500,
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
  droppedItem: {
    width: 140,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 5,
    marginBottom: 20,
    marginRight:22,
    marginTop:10
  },
  deleteIconContainer: {
    position: "absolute",
    right: 10,
    top: 1,
    padding: 3,
    borderRadius: 18,
    backgroundColor: "red"
  },
  actionButtonContainer:{
    flexDirection:"row",
    width:"100%"
  },
  actionButton: {
    width: "50%",
    padding: 8,
  },
  actionButtonText: {
    color: "white",
    textAlign: "center"
  },
  codeTextStyle:{
    flex: 1,
    padding: 10,
    backgroundColor: 'yellow',
    textAlign: "center",
    color: 'black'
  },
  actionTextStyles:{
    flex: 1,
    padding: 10,
    backgroundColor: 'green',
    color: 'white',
    textAlign: "center"
  }
});

export default ActionList;