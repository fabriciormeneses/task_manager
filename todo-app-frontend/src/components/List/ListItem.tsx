import { Column, Text } from 'components';

export type ListItemProps = {
  label: string;
};

export const ListItem: React.FC<ListItemProps> = ({ label }) => {
  return (
    <Column width="100%" bg="rgba(0,0,0, 0.2)" p="20px" borderRadius="4px;" mb="10px" borderLeft="5px solid #fff">
      <Text>{label}</Text>
    </Column>
  );
};
