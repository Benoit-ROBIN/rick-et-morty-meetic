import * as React from "react";
import {
  Container,
  Content,
  Spinner,
  Card,
  CardItem,
  Body,
  Text,
  Left,
  Right
} from "native-base";
import { Image, View, StyleSheet } from "react-native";
import { NavigationScreenProp, NavigationScreenConfig } from "react-navigation";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { Character } from "../store/character/types";
import { ApplicationState, ConnectedReduxProps } from "../store";
import { fetchOneCharacter } from "../store/character/actions";

interface PropsFromState {
  loading: boolean;
  results: Character[];
  errors?: string;
}

interface PropsFromDispatch {
  fetchOneCharacter: typeof fetchOneCharacter;
}

interface OwnProps {
  navigation: NavigationScreenProp<any, any>;
}

interface OwnState {
  id: number;
}

type AllProps = PropsFromState &
  PropsFromDispatch &
  ConnectedReduxProps &
  OwnProps;

class DetailComponent extends React.PureComponent<AllProps, OwnState> {

  static navigationOptions = ({ navigation }: NavigationScreenConfig<any>) => {
    const { name } = navigation.getParam("character", {})
    return {
      headerTitle: name,
    };
  };

  constructor(props: AllProps) {
    super(props);
    const { id } = this.props.navigation.getParam("character", {});
    this.state = {
      id
    };
  }

  componentDidMount() {
    const { id } = this.state;
    this.props.fetchOneCharacter(id);
  }

  renderCharacterCard = () => {
    const { results } = this.props;
    const { id } = this.state;
    const character = results.find(item => item.id === id);

    if (character === undefined) {
      <Content>
        <Text>Oups ça n'a pas fonctionné</Text>
      </Content>;
    } else {
      return (
        <Card>
          <View style={styles.imageView}>
            <Image
              source={{
                uri: character.image
              }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <CardItem>
            <Left>
              <Body>
                <Text>{character.name}</Text>
                <Text note>{character.origin.name}</Text>
              </Body>
            </Left>

            <Right>
              <Body>
                <Text note>
                  {character.species} / {character.gender}
                </Text>
                <Text note>{character.status}</Text>
              </Body>
            </Right>
          </CardItem>
        </Card>
      );
    }
  };

  public render() {
    const { loading } = this.props;
    return (
      <Container>
        <Content>
          {loading && <Spinner />}
          {!loading && this.renderCharacterCard()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ character }: ApplicationState) => ({
  loading: character.loading,
  errors: character.errors,
  results: character.results
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchOneCharacter: (id: number) => dispatch(fetchOneCharacter(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailComponent);

const styles = StyleSheet.create({
  imageView: {
    height: 300
  },
  image: {
    flex: 1, 
    height: undefined, 
    width: undefined
  }
})