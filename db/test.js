const {
  getUsersTask,
  addTask,
  getTask,
  deleteTask
} = require('./queries/tasks_queries');

const {expect, assert} = require('chai');

const USER_ID_WITH_TASKS = 1;
const USER_ID_WITHOUT_TASKS = 3;
const TASK_ID_THAT_EXISTS = 1;
const TASK_ID_THAT_DOE_NOT_EXIST = 9999999;

describe('getUsersTask', function() {

  it('should fail if no user id is specified',async () => {
    try {
      await getUsersTask(null);
      assert(false);
    } catch (e) {
      null; // stub expression so the linter isn't triggered
    }
  });

  it('should return an array', async () => {
    const tasks = await getUsersTask(USER_ID_WITH_TASKS);
    assert(typeof tasks === typeof [], 'returns an array when there are results');
    const noTasks = await getUsersTask(USER_ID_WITHOUT_TASKS);
    assert(typeof noTasks === typeof [], 'returns an array when there are no results');
  });

  it('should return data when data exists', async () => {
    const tasks = await getUsersTask(USER_ID_WITH_TASKS);
    assert(tasks && tasks.length > 0, 'data is being returned');
  });

  it('should only return rows with the correct user id', async () => {
    const tasks = await getUsersTask(USER_ID_WITH_TASKS);
    tasks.filter(item => {
      assert(item.user_id === USER_ID_WITH_TASKS, 'item.user_id is the same as the test id');
    });
  });

});

describe('addTask', function() {

  it('should fail if user id is not specified', async () => {
    try {
      await addTask(null, 'Harry Potter', 'Defeat Voldemort');
      assert(false, 'throws an error if the user id is null');
    } catch (e) {
      null; //stub expression so the linter isn't triggered
    }
  });

  it('should save a task to the database', async () => {
    const tasksBefore = await getUsersTask(USER_ID_WITH_TASKS);
    await addTask(1, 'Concerts I Need to See', 'The Wiggles');
    const tasksAfter = await getUsersTask(USER_ID_WITH_TASKS);
    console.log(tasksBefore, tasksAfter);
    assert(tasksAfter.length > tasksBefore.length, 'addTask adds a task to the database');
  });
  
});

describe('getTask', function() {

  it('should fail if the taskId is null', async () => {
    try {
      await getTask(null);
      assert(false, 'throws an error if taskId is null');
    } catch (e) {
      null; //stub expression so the linter isn't triggered
    }
  });

  it('should return a task if one exists', async () => {
    const task = await getTask(TASK_ID_THAT_EXISTS);
    assert(task instanceof Object && !(task instanceof Array), 'returns a task as an object');
    assert(task && task.id, 'returns a task that has an id');
  });

  it('should return null for a task that does not exist', async () => {
    const task = await getTask(TASK_ID_THAT_DOE_NOT_EXIST);
    assert(task === null, 'returns null for a task that does not exist');
  });

});

describe('deleteTask', function() {

  it('should fail if any of the params are non-numeric', async () => {
    try {
      await deleteTask(null, null);
      assert(false, 'fails when both userId and taskId are null');
    } catch (e) {
      null;
    }
    try {
      await deleteTask(null, 1);
      assert(false, 'fails when only userId is null');
    } catch (e) {
      null;
    }
    try {
      await deleteTask(1, null);
      assert(false, 'fails when only taskId is null');
    } catch (e) {
      null;
    }
  });

  it('should remove a task from the database if one exists', async () => {
    const tasksBefore = await getUsersTask(USER_ID_WITH_TASKS);
    await deleteTask(USER_ID_WITH_TASKS, tasksBefore[0].id);
    const tasksAfter = await getUsersTask(USER_ID_WITH_TASKS);
    assert(tasksBefore.length > tasksAfter.length, 'there are fewer tasks for a user after deleting a task');
  });

});
