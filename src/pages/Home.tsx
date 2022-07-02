import React, { useEffect, useState } from 'react';
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

interface SkillData {
    id: string;
    skill: string;
    created_at: Date;
}

export function Home() {
    const [newSkill, setNewSkill] = useState('');
    const [skills, setSkills] = useState<SkillData[]>([]);
    const [gretting, setGretting] = useState('');

    function handleAddNewSkill() {

        if (newSkill) {
            const data = {
                id: String(new Date().getTime()),
                skill: newSkill,
                created_at: new Date()
            }

            setSkills(oldState => [...oldState, data]);
            setNewSkill('');
        }

    }

    function handleRemoveSkill(id: string) {
        setSkills(oldState => oldState.filter(
            skill => skill.id !== id
        ))
    }

    useEffect(() => {
        const currentHour = new Date().getHours();

        if (currentHour < 12) {
            setGretting('Good morning')
        } else if (currentHour >= 12 && currentHour < 18) {
            setGretting('Good afternoon')
        } else {
            setGretting('Good night')
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, Anderson</Text>

            <Text style={styles.gretting}>{gretting}</Text>

            <TextInput
                style={styles.input}
                placeholder="New skill"
                placeholderTextColor="#555"
                value={newSkill}
                onChangeText={setNewSkill}
            />

            <Button onPress={handleAddNewSkill} title="Add" />

            <Text style={[styles.title, { marginVertical: 50 }]}>
                My Skills
            </Text>

            <FlatList
                data={skills}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <SkillCard skill={item.skill} onPress={() => handleRemoveSkill(item.id)} />}
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
    },
    gretting: {
        color: '#FFF',
    }
})