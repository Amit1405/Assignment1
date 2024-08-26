import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet,PanResponder, Animated,FlatList, TouchableOpacity } from 'react-native';
import useStore from '../Store';
import EIcon from 'react-native-vector-icons/EvilIcons'

const DraggableItem = ({ item, index, onDrop }) => {
  const position = useRef(new Animated.ValueXY()).current;
  const [dragging, setDragging] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setDragging(true);
      },
      onPanResponderMove: Animated.event(
        [null, { dx: position.x, dy: position.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gestureState) => {
        setDragging(false);
        if (gestureState.moveX > 200) { // Adjust this value based on your layout
          onDrop(item);
        }
        position.setValue({ x: 0, y: 0 }); // Reset position
      },
    })
  ).current;

  return (
    <View style={{marginTop:25,left:20}}>
      <Animated.View
        style={[styles.droppedItem, {transform: position.getTranslateTransform()}]}
        {...panResponder.panHandlers}>
        <Text style={styles.text}>{item.name}</Text>
      </Animated.View>
    </View>
  );
};

const ActionList = () => {
    const [droppedItems, setDroppedItems] = useState([]);
    const [activeAction,setActiveAction]=useState("")
    const addActionList = useStore((state) => state.addActionList);

    const handleDrop = (item) => {
        setDroppedItems((prevItems) => [...prevItems, item]);

    };
    useEffect(()=>{
      addActionList(droppedItems);
    },[droppedItems])


    const dragItemData = [
        { id: 1, name: "Add X=50" },
        { id: 2, name: "Add Y=50" },
        { id: 3, name: "Add X=50 & Y=50" },
        { id: 4, name: "Rotate 360" },
    ];

    const removeItem=(id)=>{
      setDroppedItems(droppedItems.filter(item => item.id !== id));
    }
    return (
      <Animated.View style={styles.container}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1,padding: 10,backgroundColor: 'yellow',textAlign: "center"}}>CODE</Text>
            <Text style={{flex: 1,padding: 10,backgroundColor: 'green',color: 'white',textAlign: "center"}}>ACTION</Text>
          </View>
          <View style={styles.leftContainer}>
            <FlatList
              data={dragItemData}
              renderItem={({item,index}) => (
                <DraggableItem
                  item={item}
                  index={index}
                  onDrop={handleDrop}
                />
              )}
              keyExtractor={(item) => item.id}
            />
            <View style={styles.rightContainer}>
              {droppedItems.map((item) => (
                <View style={{flexDirection: "row"}}>
                  <View key={item.id} style={styles.droppedItem}>
                    <Text style={styles.text}>{item.name}</Text>
                  </View>
                  <TouchableOpacity style={styles.deleteIconContainer} onPress={()=>removeItem(item?.id)}>
                  <EIcon name='trash' color="white" size={25} className="fas fa-play" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Animated.View>
    );
};

const styles = StyleSheet.create({
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    dragItems: {
        width: '40%',
        padding: 10,
        borderRadius: 5,
    },
    dragItemText:{
      textAlign:"center",
      textAlignVertical:"center",
      justifyContent:"center",
      alignItems:"center"
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
      width:"100%",
      height:"100%",
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    leftContainer: {
      flexDirection:"row"
    },
    rightContainer: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "flex-end",
      top:2,
      padding:10,
      position:"absolute",
      right:3,
      borderWidth:1,
      borderColor:"gray",
      width:"48%",
      paddingBottom:500
    },
    text: {
      color: 'black',
      fontSize: 16,
    },
    droppedItem: {
      width: 140,
      padding:8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'lightblue',
      borderRadius: 5,
      marginBottom: 20,
    },
    deleteIconContainer:{
      position: "absolute",
      right: -4,
      top:-4,
      padding:3,
      borderRadius:18,
      backgroundColor:"red"
    }
});

export default ActionList;