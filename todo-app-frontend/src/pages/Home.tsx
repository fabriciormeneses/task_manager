import { Input, Text, Button, Column, List, Row } from 'components';
import { useState } from 'react';

export const Home = () => {
  const [taskname, setTaskName] = useState('');
  const [tasks, setTasks] = useState<{ label: string }[]>([]);

  const handleOkButton = () => {
    if (!taskname) return;
    setTasks((previous) => {
      const copy = [...previous];
      copy.push({ label: taskname });
      return copy;
    });
    setTaskName('');
  };
  return (
    <div>
      <Column width="600px" margin="0 auto">
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
        <List items={tasks} />
      </Column>
    </div>
  );
};
