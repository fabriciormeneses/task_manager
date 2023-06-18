import styled from 'styled-components';
import {BorderProps, BorderRadiusProps, ColorProps, LayoutProps, SpaceProps, border, borderRadius, color, layout, space, } from 'styled-system'

type ColumnProps = LayoutProps & SpaceProps & ColorProps & BorderRadiusProps & BorderProps;

export const Column = styled.div<ColumnProps>`
  display: flex;
  flex-direction: column;
  ${layout}
  ${space}
  ${color}
  ${borderRadius}
  ${border}
`;