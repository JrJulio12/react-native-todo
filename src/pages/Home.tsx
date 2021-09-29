import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const taskAlreadyExists = tasks.find( item => item.title === newTaskTitle );

    if(taskAlreadyExists !== undefined){
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
      return;
    }

    let newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const newTasks = [...tasks];

    const taskId = newTasks.findIndex( item => item.id === id);

    newTasks[taskId].done = !newTasks[taskId].done;

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    let confirmed = false;

    Alert.alert(
      'Remover item', 
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          onPress: () => {
            setTasks(oldState => oldState.filter(
              item => item.id !== id
            ));
          }
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})