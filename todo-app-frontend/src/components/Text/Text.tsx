import styled from 'styled-components';
import { SpaceProps, TypographyProps, space, typography } from 'styled-system';

type TextProps = TypographyProps & SpaceProps;

export const Text = styled.p<TextProps>`
  font-family: 14px;
  color: #fff;
  ${typography}
  ${space}
`;
