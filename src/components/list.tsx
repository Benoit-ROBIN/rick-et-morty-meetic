import * as React from "react";
import { NavigationScreenProp } from "react-navigation";
import { Spinner } from "native-base";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { View, FlatList } from "react-native";

import { ItemComponent } from "../components/item";
import { Character, Info } from "../store/character/types";
import { ConnectedReduxProps, ApplicationState } from "../store/index";
import { fetchAllCharacters } from "../store/character/actions";

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

class ListComponent extends React.PureComponent<AllProps> {
  constructor(props: AllProps) {
    super(props);
  }

  componentDidMount() {
    const { results } = this.props;
    if (!results || results.length === 0) {
      this.props.fetchAllCharacters();
    }
  }

  fetchNextCharacters = () => {
    const END_POINT: string | undefined = this.props.info.next;
    if (END_POINT !== "" && !this.props.loading) {
      this.props.fetchAllCharacters(END_POINT);
    }
  };

  renderCharacterItem = (item: Character) => {
    const { navigation } = this.props;
    return (
      <ItemComponent character={item} navigation={navigation} />
    );
  };

  public render() {
    const { results, loading } = this.props;
    return (
      <View>
        <FlatList
          data={results}
          renderItem={({ item }) => this.renderCharacterItem(item)}
          onEndReachedThreshold={0.6}
          onEndReached={this.fetchNextCharacters}
          keyExtractor={(item) => item.id.toString()}
        />

        {loading && <Spinner />}
      </View>
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
)(ListComponent);
