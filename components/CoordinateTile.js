import React from 'react'
import {StyleSheet, Text, View} from 'react-native';

const CoordinateTile=(props) => {
    return (
        <View style={styles.coordinates}>
            <Text>Co-ordinates</Text>
            <View style={{flex: 1,flexDirection: "row",alignItems: "center"}}>
                <View style={styles.coordinatesValueRow}>
                    <Text style={{marginTop: 8}}>Sprite</Text>
                    <Text style={styles.coordinatesValueBox}>{props.name}</Text>
                </View>

                <View style={styles.coordinatesValueRow}>
                    <Text style={{marginTop: 8}}>X</Text>
                    <Text style={styles.coordinatesValueBox}>{props.xPos.toFixed(2)}</Text>
                </View>
                <View style={styles.coordinatesValueRow}>
                    <Text style={{marginTop: 8}}>Y</Text>
                    <Text style={styles.coordinatesValueBox}>{props.yPos.toFixed(2)}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    coordinates:{
        flex: 1,
        width: '98%',
        padding: 8,
        backgroundColor: 'white',
        margin: 4,
    },

    coordinatesValueRow:{
        flex:1,
        flexDirection: 'row',
        width: '33%',
    },

    coordinatesValueBox:{
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        padding: 8,
        marginStart: 8
    },
});
export default CoordinateTile
