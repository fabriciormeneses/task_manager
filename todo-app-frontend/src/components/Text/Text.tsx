import styled from 'styled-components';
import { ColorProps, FlexProps, SpaceProps, TypographyProps, color, flex, space, typography } from 'styled-system';

type TextProps = TypographyProps & SpaceProps & ColorProps & FlexProps;

export const Text = styled.p<TextProps>`
  font-family: 14px;
  color: #fff;
  ${flex}
  ${color}
  ${typography}
  ${space}
`;
