import * as React from 'react';
import { Container, List, Item, Text } from 'native-base';

import { ItemComponent } from '../components/item' 
import { Character } from '../store/character/types';

export interface ListComponentProps {
}

export interface ListComponentState {
    charactersList: Character[]
}

export class ListComponent extends React.Component<ListComponentProps, ListComponentState> {

    constructor(props: ListComponentProps){
        super(props)
        this.state = {
            charactersList: []
        }
    }

    renderCharacterItem = (item: Character) => {
        return <ItemComponent character={item} />
    }

  public render() {
    return (
        <Container>
            <List>
               
                <Item>
                    <Text>test</Text>
                </Item>
            </List>
        </Container>
    );
  }
}
