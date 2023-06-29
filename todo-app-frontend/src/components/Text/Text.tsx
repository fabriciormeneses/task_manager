import styled from 'styled-components';
import { ColorProps, SpaceProps, TypographyProps, color, space, typography } from 'styled-system';

type TextProps = TypographyProps & SpaceProps & ColorProps;

export const Text = styled.p<TextProps>`
  font-family: 14px;
  color: #fff;
  ${color}
  ${typography}
  ${space}
`;
