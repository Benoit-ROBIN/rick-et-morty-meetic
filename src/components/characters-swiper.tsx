import * as React from "react";
import { Image } from "react-native";
import {
  Container,
  Spinner,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Icon
} from "native-base";
import { ConnectedReduxProps, ApplicationState } from "../store";
import { fetchAllCharacters } from "../store/character/actions";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Character, Info } from "../store/character/types";
import { NavigationScreenProp } from "react-navigation";

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  info: Info;
  loading: boolean;
  results: Character[];
  errors?: string;
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchAllCharacters: typeof fetchAllCharacters;
}

interface OwnProps {
  navigation: NavigationScreenProp<any, any>;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState &
  PropsFromDispatch &
  ConnectedReduxProps &
  OwnProps;

export class CharactersSwiperComponent extends React.PureComponent<AllProps> {
  constructor(props: AllProps) {
    super(props);
  }

  componentDidMount() {
    const { results } = this.props;
    if (!results || results.length === 0) {
      this.props.fetchAllCharacters();
    }
  }

  renderDeckSwiper = () => {
    const { results } = this.props
    return (
      <DeckSwiper
        dataSource={results}
        onSwipeRight={this.itemSwipeRight}
        renderItem={this.renderItem}
        looping={false}
      />
    );
  };

  renderItem = (item: Character) => {
    return (
      <Card style={{ elevation: 3 }}>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: item.image }} />
            <Body>
              <Text>{item.name}</Text>
              <Text note>NativeBase</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image
            style={{ height: 300, flex: 1 }}
            source={{ uri: item.image }}
          />
        </CardItem>
        <CardItem>
          <Icon name="heart" style={{ color: "#ED4A6A" }} />
          <Text>{item.name}</Text>
        </CardItem>
      </Card>
    );
  };

  itemSwipeRight = (item: Character) => {
    const { results } = this.props;
    if (item.id === results.length) {
      this.fetchNextCharacters();
    }
  };

  fetchNextCharacters = () => {
    const END_POINT: string | undefined = this.props.info.next;
    if (END_POINT !== "" && !this.props.loading) {
      this.props.fetchAllCharacters(END_POINT);
    }
  };

  render() {
    const { loading } = this.props;
    return (
      <Container>
        <View>
        {loading && <Spinner />}
        {!loading && this.renderDeckSwiper()}
        </View>
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
  fetchAllCharacters: (page?: string | undefined) =>
    dispatch(fetchAllCharacters(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharactersSwiperComponent);
