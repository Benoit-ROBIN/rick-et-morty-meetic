import { createStackNavigator } from 'react-navigation';
import ListComponent from '../components/list';
import DetailComponent from '../components/details';
import CharactersSwiperComponent from '../components/characters-swiper';

export const CharactersStack = createStackNavigator({
    List: CharactersSwiperComponent,
    Detail: DetailComponent
  });