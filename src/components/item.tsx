import * as React from "react";
import { Text, ListItem, Left, Body, Thumbnail } from "native-base";

import { Character } from "../store/character/types";
import { NavigationScreenProp } from 'react-navigation';

export interface ItemComponentProps {
  character: Character;
  navigation: NavigationScreenProp<any,any>;
}

export class ItemComponent extends React.PureComponent<ItemComponentProps> {
  constructor(props: ItemComponentProps) {
    super(props);
  }

  public render() {
    const { character } = this.props;
    const { navigate } = this.props.navigation;
    return (
      <ListItem thumbnail onPress={() => navigate("Detail", { character })}>
        <Left>
          <Thumbnail source={{ uri: character.image }} />
        </Left>
        <Body>
          <Text>{character.name}</Text>
          <Text note>{character.species}</Text>
          <Text note>{character.gender}</Text>
        </Body>
      </ListItem>
    );
  }
}


