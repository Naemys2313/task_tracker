import { Statuses } from '../enums/Statuses';
import { Task } from '../models/task';
import fs from 'fs';

const TASKS_FILE_PATH = '../out/tasks.json';

export function addTask(description: string) {
  const tasks = loadTasks();
  
  let lastId = 0;
  const tasksLength = tasks.length;

  if (tasksLength > 0) {
    lastId = tasks[tasksLength - 1]!.id;
  }

  const currentId = lastId + 1;
  const currentDate: Date = new Date();

  const task = new Task(
    currentId,
    description,
    Statuses.TODO,
    currentDate,
    currentDate
  );

  tasks.push(task);
  
  saveTasks(tasks);
}

export function loadTasksByStatus(status: string): Task[] {
  const tasks = loadTasks();
  const newTasks: Task[] = [];

  tasks.forEach((task) => {
    if (task.status === status) {
      newTasks.push(task);
    }
  });

  return newTasks;
}

export function loadTasks(): Task[] {
  const result = fs.readFileSync(TASKS_FILE_PATH);
  const tasksJSON = result.toString();

  const tasks = JSON.parse(tasksJSON);
  if (tasks) {
    return tasks;
  }

  return [];
}

export function updateTask(taskId: number, description: string) {
  const tasks = loadTasks();
  tasks.forEach((task) => {
    if (task.id === taskId) {
      task.description = description;
      task.updatedAt = new Date();
    }
  });

  saveTasks(tasks);
}

export function deleteTask(taskId: number) {
  const tasks = loadTasks();
  const newTasks: Task[] = [];

  tasks.forEach((task) => {
    if (task.id === taskId) {
      return;
    }

    newTasks.push(task);
  });

  saveTasks(newTasks);
}

export function updateStatus(taskId: number, status: Statuses) {
  const tasks = loadTasks();

  tasks.forEach((task) => {
    if (task.id === taskId) {
      task.status = status;
      task.updatedAt = new Date();
    }
  });

  saveTasks(tasks);
}

function saveTasks(tasks: Task[]) {
  const tasksJSON = JSON.stringify(tasks);
  fs.writeFileSync(TASKS_FILE_PATH, tasksJSON);
}