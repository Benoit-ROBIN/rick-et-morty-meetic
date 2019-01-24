import * as React from 'react';
import { Container } from 'native-base';

import { Character } from '../store/character/types';

export interface DetailComponentProps {
    character: Character
}

export class DetailComponent extends React.Component<DetailComponentProps, any> {
  public render() {
    return (
      <Container>

      </Container>
    );
  }
}
