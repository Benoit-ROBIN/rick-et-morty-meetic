import { createStackNavigator } from 'react-navigation';
import { ListComponent } from '../components/list';
import { DetailComponent } from '../components/details'

export const CharactersStack = createStackNavigator({
    List: ListComponent,
    Detail: DetailComponent
  });