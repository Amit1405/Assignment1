import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import EIcon from 'react-native-vector-icons/EvilIcons'

function BoxItem(props) {
  const removeItem=()=>{
    props.setShowBoxButton(!props.showBoxButton)
  }
  return (
    <View style={styles.toolsBox}>
      <Pressable style={styles.toolsImageUpload} onPress={props.pressedImg}>
        <TouchableOpacity style={styles.deleteIconContainer} onPress={() => removeItem()}>
          <EIcon name='trash' color="white" size={25} className="fas fa-play" />
        </TouchableOpacity>
        <Image style={[styles.toolsImageStyle,{ backgroundColor: props.backgroundColor,}]} source={props.path} />
      </Pressable>
      <Pressable style={styles.addActionClick} onPress={props.pressedAction}>
        <View style={[styles.actionTextContainer,{opacity: props.visibleAction}]}>
          <Text style={styles.actionText}>Add Actions</Text>
        </View>
      </Pressable>

    </View>
  );
}

export default BoxItem;

const styles=StyleSheet.create({
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
  deleteIconContainer: {
    position: "absolute",
    right: -1,
    top: -6,
    padding: 2,
    borderRadius: 18,
    backgroundColor: "dodgerblue"
  },
  actionTextContainer:{
    backgroundColor: "blue",
    width: "100%",
    height: '100%',
    color: "white",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  actionText: {
    color: "white"
  },

  toolsImageStyle: {
    width: '100%',
    height: '70%',
    resizeMode: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  toolsImageUpload: {
    flex: 7,
    width: '100%',
    height: '100%',
  },
  addActionClick:{
    flex: 2,
    width: '100%',
    height: '100%'
  }
});