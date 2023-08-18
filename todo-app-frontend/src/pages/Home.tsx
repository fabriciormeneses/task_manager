/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Column, Icon, Input, List, Row, Text } from 'components';
import { Logo } from 'components/Logo/Logo';
import { useTodo } from 'hooks';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';

const SECONDS_DEFAULT = 5;

export const Home = () => {
  const { tasks, getAllTodos, createTodo, updateTodo } = useTodo();
  const [taskname, setTaskName] = useState('');

  const [seconds, setSeconds] = useState(SECONDS_DEFAULT);
  const [timer, setTimer] = useState<any>();
  const [stage, setStage] = useState('ready');

  const [taskIndex, setTaskIndex] = useState(0);

  const handleOkButton = useCallback(async () => {
    await createTodo({ task: taskname, isDone: 0 });
    await getAllTodos();
    setTaskName('');
  }, [createTodo, getAllTodos, taskname]);

  const secondsToTime = (secs: number) => {
    const divisorMinute = secs % 3600;

    const minutes = Math.floor(divisorMinute / 60);
    const seconds = Math.floor(divisorMinute % 60);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const startTimer = () => {
    setStage('in_progress');
    const timerInterval = setInterval(() => {
      setSeconds((previousSeconds) => {
        if (previousSeconds === 0) {
          clearInterval(timerInterval);
          setTimer(undefined);
          setStage('finished');
          return 0;
        }
        return previousSeconds - 1;
      });
    }, 1000);

    setTimer(timerInterval);
  };

  const handlePauseButton = useCallback(() => {
    clearInterval(timer);
    setTimer(undefined);
  }, [timer]);

  const handleStopButton = useCallback(() => {
    handlePauseButton();
    clearInterval(timer);
    setSeconds(0);
    setStage('finished');
  }, [handlePauseButton, timer]);

  const handleRestartButton = useCallback(() => {
    handlePauseButton();
    clearInterval(timer);
    setSeconds(SECONDS_DEFAULT);
    setStage('ready');
  }, [handlePauseButton, timer]);

  const handleDoneButton = useCallback(async () => {
    const task = tasks[taskIndex];
    if (task) {
      await updateTodo(task.id, { task: task.task, isDone: 1 });
      await getAllTodos();
    }
  }, [getAllTodos, taskIndex, tasks, updateTodo]);

  const handleStatus = useMemo(() => {
    switch (stage) {
      case 'ready':
        return 'Ready';
      case 'in_progress':
        return 'Time to Work!';
      case 'finished':
        return 'Finished!';
      default:
        return 'Ready';
    }
  }, [stage]);

  const handleStatusButtons = useMemo(() => {
    switch (stage) {
      case 'in_progress':
        return (
          <Fragment>
            <Button variant="primary" p="10px 20px" mx="5px" onClick={startTimer}>
              <Icon variant="play"></Icon>
            </Button>
            <Button variant="primary" p="10px 20px" mx="5px" onClick={handlePauseButton}>
              <Icon variant="pause"></Icon>
            </Button>
            <Button variant="primary" p="10px 20px" mx="5px" onClick={handleStopButton}>
              <Icon variant="stop"></Icon>
            </Button>
          </Fragment>
        );
      case 'finished':
        return (
          <Fragment>
            <Button variant="primary" p="10px 20px" mx="5px" onClick={handleRestartButton}>
              <Icon variant="restart"></Icon>
            </Button>
            <Button variant="primary" p="10px 20px" mx="5px" onClick={handleDoneButton}>
              <Icon variant="done"></Icon>
            </Button>
          </Fragment>
        );
      case 'ready':
      default:
        return (
          <Fragment>
            <Button variant="primary" onClick={startTimer}>
              <Text fontFamily="secondary" color="primary" fontSize="bodyExtraLarge" fontWeight="bold">
                START
              </Text>
            </Button>
          </Fragment>
        );
    }
  }, [handleDoneButton, handlePauseButton, handleRestartButton, handleStopButton, stage]);

  useEffect(() => {
    getAllTodos();
  }, [getAllTodos]);

  return (
    <div>
      <Column width="600px" margin="0 auto">
        <Column py="25px" width="100%" alignItems="center">
          <Logo />
        </Column>

        <Column
          width="100%"
          minHeight="300px"
          p="20px"
          bg="rgba(255,255,255, 0.2)"
          borderRadius="4px"
          alignItems="center"
        >
          <Text fontFamily="secondary" fontSize="bodyExtraLarge">
            {handleStatus}
          </Text>

          <Text fontFamily="secondary" fontWeight="bold" py="30px" fontSize="displayExtraLarge">
            {secondsToTime(seconds)}
          </Text>
          <Row py={'20px'}>{handleStatusButtons}</Row>
          {/* 
            
            
          </Row> */}
        </Column>

        <Text fontWeight="bold" fontSize="bodyLarge" my="10px" pl="10px">
          Tasks
        </Text>

        <Row>
          <Input
            flex={1}
            value={taskname}
            placeholder="Enter a Task here ..."
            onChange={(e) => setTaskName(e.target.value)}
          />

          <Button onClick={handleOkButton}>Ok</Button>
        </Row>

        <List items={tasks} selectedIndex={taskIndex} onClick={setTaskIndex} />
      </Column>
    </div>
  );
};
