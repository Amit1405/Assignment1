import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import useStore from '../Store';

const ActionList = () => {
    const [droppedItems, setDroppedItems] = useState([]);
    const addActionList = useStore((state) => state.addActionList);

    const handleDrop = (item) => {
        setDroppedItems((prevItems) => [...prevItems, item]);

    };
    useEffect(()=>{
      addActionList(droppedItems);
    },[droppedItems])

    const renderItem = ({ item, index, drag }) => (
        <TouchableOpacity
            onLongPress={drag}
            style={styles.itemContainer}>
            <Text style={styles.dragItemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const dragItemData = [
        { id: 1, name: "Add X=50" },
        { id: 2, name: "Add Y=50" },
        { id: 3, name: "Add X=50 & Y=50" },
        { id: 4, name: "Rotate 360" },
    ];

    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1,padding: 10,backgroundColor: 'yellow',textAlign: "center"}}>Actions</Text>
            <Text style={{flex: 1,padding: 10,backgroundColor: 'green',color: 'white',textAlign: "center"}}>Your Action</Text>
          </View>
          <View style={styles.innerContainer}>
            <View style={styles.dragItems}>
              {dragItemData.map(item => (
                <TouchableOpacity
                  key={item.id}
                  onLongPress={() => handleDrop(item)}
                  style={styles.itemContainer}
                >
                  <Text style={styles.dragItemText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.dropZone}>
              <DraggableFlatList
                data={droppedItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                onDragEnd={({data}) => setDroppedItems(data)}
              />
            </View>
          </View>
        </View>
      </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
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
    dropZone: {
        width: '40%',
        padding: 10,
        borderRadius: 5,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
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
});

export default ActionList;