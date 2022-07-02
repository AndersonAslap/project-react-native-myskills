import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Platform,
    FlatList
} from 'react-native';

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

export function Home() {
    const [newSkill, setNewSkill] = useState('');
    const [skills, setSkills] = useState([]);

    function handleAddNewSkill() {
        setSkills(oldState => [...oldState, newSkill]);
        setNewSkill('');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, Anderson</Text>

            <TextInput
                style={styles.input}
                placeholder="New skill"
                placeholderTextColor="#555"
                value={newSkill}
                onChangeText={setNewSkill}
            />

            <Button onHandleAddNewSkill={handleAddNewSkill} />

            <Text style={[styles.title, { marginVertical: 50 }]}>
                My Skills
            </Text>

            <FlatList
                data={skills}
                keyExtractor={item => item}
                renderItem={({ item }) => <SkillCard skill={item} />}
                showsVerticalScrollIndicator={false}
            />

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingVertical: 70,
        paddingHorizontal: 30
    },
    title: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#1F1E25',
        color: '#FFF',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginTop: 30,
        borderRadius: 7
    }
})