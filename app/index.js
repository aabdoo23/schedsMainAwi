import { View, Text, TextInput, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
// import MongoClient from 'mongodb';

import { coursesDataa, connect } from '../server/connect.js';

// async function connectToDB() {

//     const client = await MongoClient.connect("mongodb+srv://aabdoo2304:MNMN1234@cluster0.rnptjs1.mongodb.net/?retryWrites=true&w=majority");
//     const db = client.db("scheds");
//     const collection = db.collection("coursesData");
//     return collection;
// }

// async function connectToDB(){
//     return ['a','b','c','d'];
// }

const Home = () => {
    
    const [searchText, setSearchText] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);

    // useEffect(async () => {
    //     try {
    //         await connect();
    //         console.log('Connected to MongoDB');
    //     } catch (error) {
    //         console.error('Error connecting to MongoDB:', error);
    //     }
    // }, []);

    const handleItemPress = (item) => {
        setSelectedItems([...selectedItems, item]);
        setSearchText('');
    };
    const handleSelectedItemPress = (item) => {
        setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
        setSearchText('');
    };
    const handleSearch = (searchText) => {

    }
    const handleGeneratePress = () => {
        // Add your logic for generating based on selected items
        console.log('Generating with selected items:', selectedItems);
    };
    const windowWidth = Dimensions.get('window').width;
    const maxButtonWidth = Math.min(windowWidth - 40, 400);
    return (
        <View style={{ padding: 16 }}>
            <TextInput
                placeholder="Search for course"
                placeholderTextColor="grey"
                value={searchText}
                onChangeText={handleSearch}
                style={styles.input}
            />

            {searchText.length > 0 && (
                <ScrollView style={{ maxHeight: 150, marginBottom: 16 }}>
                    {[]
                        .filter(item => item.toLowerCase().includes(searchText.toLowerCase()))
                        .map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleItemPress(item)}
                                style={styles.autocompleteItem}
                            >
                                <Text style={styles.typeFont}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                </ScrollView>
            )}

            <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold' }}>Selected Courses:</Text>
            <ScrollView>
                {selectedItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleSelectedItemPress(item)}
                        style={styles.selectedItem}
                    >
                        <Text style={styles.typeFont}>{item}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity
                    onPress={handleGeneratePress}
                    style={[styles.generateButton, { width: maxButtonWidth }]}
                >
                    <Text style={{ color: '#fff', fontSize: 16, alignSelf: 'center', fontWeight: 'bold' }}>Generate</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>

    )
}
const styles = {
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 10,
    },
    autocompleteItem: {
        margin: 4,
        borderRadius: 10,
        borderColor: '#007BFF',
        backgroundColor: '#fff',
        padding: 10,
    },
    selectedItem: {
        margin: 4,
        borderRadius: 10,
        borderColor: '#28A745',
        backgroundColor: '#D4EDDA',
        padding: 10,
    },
    scrollContainer: {
        padding: 16,
    },
    typeFont: {
        fontSize: 16,
        // alignSelf:'center',
        fontWeight: 'bold'
    },
    generateButton: {
        marginTop: 20,
        paddingVertical: 10,
        backgroundColor: '#007BFF',
        borderRadius: 10,
        alignSelf: 'center',
    },
};

export default Home;