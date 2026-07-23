import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now().toString(),
      title: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((item) =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    );

    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(
      (item) => item.id !== id
    );

    setTasks(updatedTasks);
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity
        style={styles.taskTextContainer}
        onPress={() => toggleTask(item.id)}
      >
        <Text
          style={[
            styles.taskText,
            item.completed && styles.completedTask,
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => deleteTask(item.id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo App</Text>

      <Text style={styles.counter}>
        Total Tasks: {tasks.length}
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Task"
          value={task}
          onChangeText={setTask}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={addTask}
        >
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No Tasks Added Yet
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    paddingTop: 60,
  },

  heading: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },

  counter: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    color: "#666",
  },

  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
  },

  addButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    justifyContent: "center",
    marginLeft: 10,
    borderRadius: 10,
  },

  addText: {
    color: "#fff",
    fontWeight: "bold",
  },

  taskContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  taskTextContainer: {
    flex: 1,
  },

  taskText: {
    fontSize: 18,
  },

  completedTask: {
    textDecorationLine: "line-through",
    color: "green",
  },

  deleteBtn: {
    backgroundColor: "red",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    color: "#888",
    fontSize: 16,
  },
});