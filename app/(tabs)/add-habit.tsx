import { database, DATABASE_ID, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { ID } from "react-native-appwrite";
import { useAuth } from "@/lib/auth-context";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text} from "react-native";
import { SegmentedButtons, TextInput, Button, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";

const FREQUENCIES = ["daily", "weekly", "monthly"];
type Frequency = (typeof FREQUENCIES)[number];

export default function AddHabitScreen() {
  const [frequency, setFrequency] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("daily");
  const [error, setError] = useState<string>("");
  const {user} = useAuth();
  const router = useRouter();
  const theme = useTheme();

  const handleSubmit = async () => {
    if (!user) return;

    try {
       await database.createDocument(
        DATABASE_ID!, 
        HABITS_COLLECTION_ID!, 
        ID.unique(), 
        {
            user_id: user.$id,
            title,
            description,
            frequency,
            streak_count: 0,
            last_completed: new Date().toString(),
            created_at: new Date().toString(),
        }
        );

        router.back() 
    } catch(error) {
        if (error instanceof Error) {
            setError(error.message)
            return
        }
        setError("There was an error creating the habit")
    }

    
  };

  return (
    <View style={styles.container}>
      <TextInput 
        label="Title" 
        mode="outlined" 
        onChangeText={setTitle}
        style={styles.input} 
      />

      <TextInput 
        label="Description" 
        mode="outlined" 
        onChangeText={setDescription}
        style={styles.input} 
      />

      <View style={styles.frequencyContainer}>
         <SegmentedButtons
        value={frequency}
        onValueChange={(value) => setFrequency(value as Frequency)}
        buttons={FREQUENCIES.map((freq) => ({
          value: freq,
          label: freq.charAt(0).toUpperCase() + freq.slice(1),
        }))}
      />
      </View>
        <Button 
        mode="contained" 
        disabled={!title || !description}
        onPress={handleSubmit}
        >Add Habit</Button>

        {error && <Text style={{color: theme.colors.error}}>{error}</Text>}
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "f5f5f5",
    },
    input: {
        marginBottom: 16,
    },
    frequencyContainer: {
        marginBottom: 24,
    },
})