import { Actions } from './enums/Actions';
import { Statuses } from './enums/Statuses';
import { Task } from './models/task';
import * as taskService from './services/TaskService';


main();

function main() {
  const args = process.argv.slice(2);

  const action = args[0];

  if (action === Actions.ADD) {
    const description = args[1];
    if (!description) {
      console.log("Укажите описание.");
      return;
    }

    taskService.addTask(description);
  } else if(action === Actions.UPDATE) {
    const taskId = Number(args[1]);

    if (!taskId) {
      console.log("Укажите идентификатор задачи.");
      return;
    }

    const description = args[2]
    if (!description) {
      console.log('Укажите описание задачи.');
      return;
    }

    taskService.updateTask(taskId, description);
  } else if(action === Actions.DELETE) {
    const taskId = Number(args[1]);

    if (!taskId) {
      console.log("Укажите идентификатор задачи.");
      return;
    }

    taskService.deleteTask(taskId);    
  } else if(action === Actions.LIST) {
    const selectedStatus = args[1];

    let tasks: Task[];

    if (selectedStatus) {
      if (selectedStatus !== Statuses.DONE
        && selectedStatus !== Statuses.TODO
        && selectedStatus !== Statuses.IN_PROGRESS
      ) {
        console.log(`Статуса ${selectedStatus} не существует. Выберите статус из списка: ${Statuses.DONE}, ${Statuses.TODO}, ${Statuses.IN_PROGRESS}`);
        return;
      }

      tasks = taskService.loadTasksByStatus(selectedStatus);
    } else {
      tasks = taskService.loadTasks();
    }

    tasks.forEach((task) => {
      console.log(task);
    });
  } else if(action === Statuses.TODO
      || action === Statuses.IN_PROGRESS
      || action === Statuses.DONE) {
    const taskId = Number(args[1]);

    if (!taskId) {
      console.log('Укажите идентификатор задачи.');
      return;
    }

    taskService.updateStatus(taskId, action);
  }
}

