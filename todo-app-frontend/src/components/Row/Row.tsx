import styled from 'styled-components';
import { LayoutProps, SpaceProps, layout, space } from 'styled-system';

type RowProps = LayoutProps & SpaceProps;

export const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: row;
  ${layout}
  ${space}
`;
