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
import { NavigationScreenProp } from "react-navigation";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { Character, Info } from "../store/character/types";
import { ApplicationState, ConnectedReduxProps } from "../store";
import { fetchOneCharacter } from "../store/character/actions";

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  info: Info;
  loading: boolean;
  results: Character[];
  errors?: string;
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchOneCharacter: typeof fetchOneCharacter;
}

interface OwnProps {
  navigation: NavigationScreenProp<any, any>;
}

interface OwnState {
  id: number;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState &
  PropsFromDispatch &
  ConnectedReduxProps &
  OwnProps;

class DetailComponent extends React.PureComponent<AllProps, OwnState> {
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
              </Body>
            </Right>
          </CardItem>

          <CardItem style={styles.statusContainer}>
            <Text>{character.status}</Text>
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
  results: character.results,
  info: character.info
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
  },
  statusContainer: {
    justifyContent: "center"
  }
})