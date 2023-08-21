import { Column, Icon, Row, Text } from 'components';

export type ListItemProps = {
  index: number;
  id: string;
  task: string;
  onClick: (index: number) => void;
  isActive: boolean;
  isDone: number;
};

// eslint-disable-next-line react/prop-types
export const ListItem: React.FC<ListItemProps> = ({ index, task, isDone, isActive, onClick }) => {
  return (
    <Column
      width="100%"
      bg="rgba(0,0,0, 0.2)"
      p="20px"
      borderRadius="4px;"
      mb="10px"
      cursor="pointer"
      borderLeftWidth="5px"
      borderLeftStyle="solid"
      borderLeftColor={isActive ? '#fff' : 'transparent'}
      onClick={() => onClick(index)}
    >
      <Row>
        <Text flex={1}>{task}</Text>
        {isDone === 1 && <Icon variant="done-white" />}
      </Row>
    </Column>
  );
};
